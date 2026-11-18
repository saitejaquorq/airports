"""Idempotent OurAirports CSV import job.

Run as `python -m app.importer [path]`, or call `import_airports()` from code.
With no argument it reads `AIRPORTS_DATASET_PATH` if set, else the bundled
snapshot under `backend/data/`. Streams the file row by row and inserts in
batches, so memory use stays bounded no matter how large the file is -- the full
~80,000-row OurAirports export is expected to fit this.

Re-running the import, against the same file or a newer one, replaces the whole
table's contents inside one transaction: a bad file never leaves it half
updated, and a good one never leaves duplicate idents behind.
"""

import csv
import logging
import os
import sys
from collections.abc import Iterable, Iterator
from pathlib import Path

from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Airport

logger = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DEFAULT_DATASET_PATH = DATA_DIR / "airports.csv"
BATCH_SIZE = 1000

# OurAirports does not ship country names in airports.csv; this covers the
# countries in the bundled snapshot. An iso_country outside this map is kept,
# its country_name left NULL, which the schema allows.
COUNTRY_NAMES: dict[str, str] = {
    "US": "United States",
    "CA": "Canada",
    "MX": "Mexico",
    "BR": "Brazil",
    "AR": "Argentina",
    "CL": "Chile",
    "CO": "Colombia",
    "PE": "Peru",
    "GB": "United Kingdom",
    "FR": "France",
    "DE": "Germany",
    "NL": "Netherlands",
    "ES": "Spain",
    "IT": "Italy",
    "CH": "Switzerland",
    "AT": "Austria",
    "BE": "Belgium",
    "DK": "Denmark",
    "NO": "Norway",
    "SE": "Sweden",
    "FI": "Finland",
    "RU": "Russia",
    "TR": "Turkey",
    "AE": "United Arab Emirates",
    "QA": "Qatar",
    "SA": "Saudi Arabia",
    "JO": "Jordan",
    "EG": "Egypt",
    "ZA": "South Africa",
    "KE": "Kenya",
    "NG": "Nigeria",
    "MA": "Morocco",
    "IN": "India",
    "PK": "Pakistan",
    "TH": "Thailand",
    "SG": "Singapore",
    "MY": "Malaysia",
    "ID": "Indonesia",
    "PH": "Philippines",
    "VN": "Vietnam",
    "CN": "China",
    "HK": "Hong Kong",
    "TW": "Taiwan",
    "KR": "South Korea",
    "JP": "Japan",
    "AU": "Australia",
    "NZ": "New Zealand",
}


def _default_dataset() -> str | None:
    return str(DEFAULT_DATASET_PATH) if DEFAULT_DATASET_PATH.exists() else None


def _open_source(source: str) -> Iterator[str]:
    """Yield decoded text lines from a local CSV path."""
    with open(source, encoding="utf-8") as handle:
        yield from handle


def parse_row(row: dict) -> dict | None:
    """Map one OurAirports CSV row to `Airport` column values, or None to skip it.

    Skips rows with no (or non-numeric) coordinates, or no ident/name. Maps an
    empty IATA code or municipality to NULL rather than an empty string.
    """
    lat_raw = (row.get("latitude_deg") or "").strip()
    lon_raw = (row.get("longitude_deg") or "").strip()
    if not lat_raw or not lon_raw:
        return None
    try:
        latitude = float(lat_raw)
        longitude = float(lon_raw)
    except ValueError:
        return None

    ident = (row.get("ident") or "").strip()
    name = (row.get("name") or "").strip()
    if not ident or not name:
        return None

    iso_country = (row.get("iso_country") or "").strip() or None
    return {
        "ident": ident,
        "icao_code": (row.get("gps_code") or "").strip() or None,
        "iata_code": (row.get("iata_code") or "").strip() or None,
        "name": name,
        "municipality": (row.get("municipality") or "").strip() or None,
        "iso_country": iso_country,
        "country_name": COUNTRY_NAMES.get(iso_country) if iso_country else None,
        "airport_type": (row.get("type") or "").strip() or None,
        "latitude_deg": latitude,
        "longitude_deg": longitude,
    }


def _mapped_rows(source: str) -> Iterator[dict]:
    reader = csv.DictReader(_open_source(source))
    for raw in reader:
        mapped = parse_row(raw)
        if mapped is not None:
            yield mapped


def _insert_batches(db: Session, rows: Iterable[dict]) -> int:
    loaded = 0
    batch: list[dict] = []
    for mapped in rows:
        batch.append(mapped)
        if len(batch) >= BATCH_SIZE:
            db.bulk_insert_mappings(Airport, batch)
            loaded += len(batch)
            batch = []
    if batch:
        db.bulk_insert_mappings(Airport, batch)
        loaded += len(batch)
    return loaded


def import_airports(source: str | None = None, session: Session | None = None) -> int:
    """Replace the `airports` table's contents with `source`'s rows.

    `source` is a local CSV path; it defaults to `AIRPORTS_DATASET_PATH` or the
    bundled snapshot. Returns the number of rows
    loaded. Runs as one transaction, so a file that fails partway through never
    leaves the table half replaced.

    On success, triggers a full Meilisearch index rebuild from the now-updated
    table so a re-import leaves PostgreSQL and the index consistent. A search
    outage during this step is logged and never fails the import itself.
    """
    resolved = source or os.getenv("AIRPORTS_DATASET_PATH") or _default_dataset()
    if resolved is None:
        raise FileNotFoundError("no airports dataset file found (and none was given)")

    own_session = session is None
    db = session or SessionLocal()
    try:
        db.query(Airport).delete()
        loaded = _insert_batches(db, _mapped_rows(resolved))
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        if own_session:
            db.close()

    try:
        from app.search_index import rebuild_index

        rebuild_index()
    except Exception:
        logger.exception("search index rebuild failed after import")

    return loaded


def import_if_empty() -> None:
    """Run the import once, only when the table is empty, never raising.

    Called at application startup. A database whose migrations have not run
    yet, or a dataset file that is missing or unreadable, is logged and
    skipped rather than allowed to block or crash startup.
    """
    db = SessionLocal()
    try:
        try:
            count = db.scalar(select(func.count()).select_from(Airport))
        except Exception:
            logger.exception("could not check the airports table at startup")
            return
    finally:
        db.close()
    if count:
        return
    try:
        import_airports()
    except Exception:
        logger.exception("airport import failed at startup")


def main() -> None:
    source = sys.argv[1] if len(sys.argv) > 1 else None
    count = import_airports(source)
    print(f"imported {count} airports")


if __name__ == "__main__":
    main()
