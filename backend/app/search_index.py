"""Meilisearch index for the `airports` table.

PostgreSQL stays the source of truth; nothing here ever writes to the
database. The index can always be rebuilt from scratch by reading every row
back out of `airports` -- there is no other path that populates it.

Run `python -m app.search_index rebuild` to do that by hand (also what the
import job calls after a successful (re-)import, and what startup calls when
the index is empty but the table is not).
"""

import logging
import os
import sys

import meilisearch
from sqlalchemy import func, select
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import Airport

logger = logging.getLogger(__name__)

INDEX_NAME = "airports"
BATCH_SIZE = 1000

SEARCHABLE_ATTRIBUTES = [
    "name",
    "municipality",
    "country_name",
    "icao_code",
    "iata_code",
    "ident",
    "iso_country",
]

DISPLAYED_ATTRIBUTES = [
    "id",
    "ident",
    "icao_code",
    "iata_code",
    "name",
    "municipality",
    "iso_country",
    "country_name",
    "airport_type",
    "latitude_deg",
    "longitude_deg",
    "imported_at",
]

INDEX_SETTINGS = {
    "searchableAttributes": SEARCHABLE_ATTRIBUTES,
    "displayedAttributes": DISPLAYED_ATTRIBUTES,
    "typoTolerance": {"enabled": True},
}


def get_client() -> meilisearch.Client:
    url = os.environ["MEILI_URL"]
    key = os.environ["MEILI_MASTER_KEY"]
    return meilisearch.Client(url, key)


def _wait(client: meilisearch.Client, task) -> None:
    task_uid = getattr(task, "task_uid", None)
    if task_uid is None:
        task_uid = task["taskUid"] if isinstance(task, dict) else task.uid
    client.wait_for_task(task_uid)


def ensure_index(client: meilisearch.Client | None = None) -> None:
    """Create the `airports` index (primary key `id`) and apply its settings.

    Safe to call repeatedly: creating an index that already exists is a
    no-op, and updating settings to the same values is idempotent.
    """
    client = client or get_client()
    try:
        client.get_index(INDEX_NAME)
    except meilisearch.errors.MeilisearchApiError:
        task = client.create_index(INDEX_NAME, {"primaryKey": "id"})
        _wait(client, task)
    index = client.index(INDEX_NAME)
    task = index.update_settings(INDEX_SETTINGS)
    _wait(client, task)


def _document(airport: Airport) -> dict:
    return {
        "id": airport.id,
        "ident": airport.ident,
        "icao_code": airport.icao_code,
        "iata_code": airport.iata_code,
        "name": airport.name,
        "municipality": airport.municipality,
        "iso_country": airport.iso_country,
        "country_name": airport.country_name,
        "airport_type": airport.airport_type,
        "latitude_deg": airport.latitude_deg,
        "longitude_deg": airport.longitude_deg,
        "imported_at": airport.imported_at.isoformat() if airport.imported_at else None,
    }


def rebuild_index(session: Session | None = None, client: meilisearch.Client | None = None) -> int:
    """Repopulate the `airports` index from PostgreSQL, from scratch.

    Clears the index first so a row removed from the database never stays
    behind as a stale document, then reads and uploads every current row in
    batches. Returns the number of documents indexed.
    """
    client = client or get_client()
    ensure_index(client)
    index = client.index(INDEX_NAME)

    _wait(client, index.delete_all_documents())

    own_session = session is None
    db = session or SessionLocal()
    try:
        total = 0
        batch: list[dict] = []
        for airport in db.execute(select(Airport)).scalars():
            batch.append(_document(airport))
            if len(batch) >= BATCH_SIZE:
                _wait(client, index.add_documents(batch))
                total += len(batch)
                batch = []
        if batch:
            _wait(client, index.add_documents(batch))
            total += len(batch)
        return total
    finally:
        if own_session:
            db.close()


def index_if_needed() -> None:
    """Called at application startup.

    Creates the index and applies its settings idempotently. Populates it
    only when the index is empty while the `airports` table is not -- a
    normal startup against an already-built index does nothing. A
    Meilisearch outage is logged as a warning and never blocks startup.
    """
    try:
        client = get_client()
        ensure_index(client)
        index = client.index(INDEX_NAME)
        index_count = index.get_stats().number_of_documents
        if index_count:
            return
        db = SessionLocal()
        try:
            table_count = db.scalar(select(func.count()).select_from(Airport))
        finally:
            db.close()
        if table_count:
            rebuild_index(client=client)
    except Exception:  # noqa: BLE001 -- never let a search outage block startup
        logger.warning("Meilisearch is unavailable; skipping index setup at startup", exc_info=True)


def main() -> None:
    if len(sys.argv) < 2 or sys.argv[1] != "rebuild":
        print("usage: python -m app.search_index rebuild")
        sys.exit(1)
    count = rebuild_index()
    print(f"indexed {count} airports")


if __name__ == "__main__":
    main()
