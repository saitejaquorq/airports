"""Integration tests for the airports schema and the OurAirports import job.

These run against the real PostgreSQL named by `DATABASE_URL` (the project's
constraints say not to mock it for this ticket): the migration is applied with
Alembic's own API, and the import job is exercised against that live table.
"""

import os
from pathlib import Path

import pytest
from alembic.config import Config
from sqlalchemy import create_engine, text

from alembic import command
from app.importer import import_airports

BACKEND_DIR = Path(__file__).resolve().parents[2]


def _alembic_config() -> Config:
    config = Config(str(BACKEND_DIR / "alembic.ini"))
    config.set_main_option("script_location", str(BACKEND_DIR / "alembic"))
    return config


@pytest.fixture(scope="module")
def migrated_db():
    """Apply the airports migration to the real database, then reverse it.

    This alone proves AC-: `alembic upgrade head` runs clean and `alembic
    downgrade` reverses it, against the sandbox's real DATABASE_URL.
    """
    config = _alembic_config()
    command.upgrade(config, "head")
    yield config
    command.downgrade(config, "base")


@pytest.fixture
def pg_engine(migrated_db):
    engine = create_engine(os.environ["DATABASE_URL"], future=True)
    with engine.begin() as conn:
        conn.execute(text("DELETE FROM airports"))
    try:
        yield engine
    finally:
        with engine.begin() as conn:
            conn.execute(text("DELETE FROM airports"))
        engine.dispose()


# fmt: off
_CSV_HEADER = (
    "id,ident,type,name,latitude_deg,longitude_deg,elevation_ft,continent,"
    "iso_country,iso_region,municipality,scheduled_service,gps_code,iata_code,"
    "local_code,home_link,wikipedia_link,keywords\n"
)

FRESH_CSV = _CSV_HEADER + (
    "1,KJFK,large_airport,John F Kennedy International Airport,40.6398,-73.7789,"
    "13,NA,US,US-NY,New York,yes,KJFK,JFK,JFK,,,\n"
    "2,ZZZZ,small_airport,No Coordinates Here,,,,,ZZ,,,,,,,,,\n"
)

UPDATED_CSV = _CSV_HEADER + (
    "1,KJFK,large_airport,John F Kennedy International Airport (Renamed),"
    "40.6398,-73.7789,13,NA,US,US-NY,New York,yes,KJFK,JFK,JFK,,,\n"
    "3,EGLL,large_airport,London Heathrow Airport,51.47,-0.4543,83,EU,GB,"
    "GB-ENG,London,yes,EGLL,LHR,,,,\n"
)
# fmt: on


def test_ac_migration_creates_airports_table_with_expected_columns(pg_engine) -> None:
    with pg_engine.connect() as conn:
        columns = {
            row[0]
            for row in conn.execute(
                text(
                    "SELECT column_name FROM information_schema.columns "
                    "WHERE table_name = 'airports'"
                )
            )
        }

    assert columns == {
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
    }


def test_ac_fresh_import_loads_icao_iata_name_city_country_coordinates(pg_engine, tmp_path) -> None:
    csv_path = tmp_path / "airports.csv"
    csv_path.write_text(FRESH_CSV)

    loaded = import_airports(str(csv_path))

    assert loaded == 1  # the row with no coordinates is skipped
    with pg_engine.begin() as conn:
        row = conn.execute(text("SELECT * FROM airports WHERE ident = 'KJFK'")).mappings().one()
    assert row["icao_code"] == "KJFK"
    assert row["iata_code"] == "JFK"
    assert row["name"] == "John F Kennedy International Airport"
    assert row["municipality"] == "New York"
    assert row["iso_country"] == "US"
    assert row["latitude_deg"] == pytest.approx(40.6398)
    assert row["longitude_deg"] == pytest.approx(-73.7789)


def test_ac_reimport_replaces_rows_without_duplicate_idents(pg_engine, tmp_path) -> None:
    first = tmp_path / "first.csv"
    first.write_text(FRESH_CSV)
    import_airports(str(first))

    second = tmp_path / "second.csv"
    second.write_text(UPDATED_CSV)
    loaded = import_airports(str(second))

    assert loaded == 2
    with pg_engine.begin() as conn:
        idents = conn.execute(text("SELECT ident FROM airports ORDER BY ident")).scalars().all()
        renamed = conn.execute(text("SELECT name FROM airports WHERE ident = 'KJFK'")).scalar_one()

    assert idents == ["EGLL", "KJFK"]
    assert len(idents) == len(set(idents))
    assert renamed == "John F Kennedy International Airport (Renamed)"
