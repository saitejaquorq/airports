"""Acceptance tests for AC-020 and NFR-007.

Re-importing an updated dataset (a changed airport name plus a new row)
makes the directory and the search index reflect the new data, with no
duplicates and no manual in-app editing. The index can also be rebuilt from
the database alone, from scratch.

Runs against the real PostgreSQL (DATABASE_URL) and the real Meilisearch
(MEILI_URL/MEILI_MASTER_KEY) this sandbox provides; neither is mocked.
"""

import os
from pathlib import Path

import pytest
from alembic.config import Config
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

from alembic import command
from app.database import get_db
from app.importer import import_airports
from app.main import app
from app.search_index import INDEX_NAME, get_client, rebuild_index

BACKEND_DIR = Path(__file__).resolve().parents[2]

# fmt: off
_CSV_HEADER = (
    "id,ident,type,name,latitude_deg,longitude_deg,elevation_ft,continent,"
    "iso_country,iso_region,municipality,scheduled_service,gps_code,iata_code,"
    "local_code,home_link,wikipedia_link,keywords\n"
)

ORIGINAL_CSV = _CSV_HEADER + (
    "1,KQAC1,large_airport,QA Acceptance Test Airport,40.0,-73.0,10,NA,US,US-NY,"
    "Testville,yes,KQAC1,QA1,,,,\n"
)

UPDATED_CSV = _CSV_HEADER + (
    "1,KQAC1,large_airport,QA Acceptance Test Airport (Renamed),40.0,-73.0,10,NA,"
    "US,US-NY,Testville,yes,KQAC1,QA1,,,,\n"
    "2,KQAC2,small_airport,QA Acceptance Second Airport,41.0,-74.0,20,NA,US,"
    "US-NJ,Secondville,yes,KQAC2,QA2,,,,\n"
)
# fmt: on


def _alembic_config() -> Config:
    config = Config(str(BACKEND_DIR / "alembic.ini"))
    config.set_main_option("script_location", str(BACKEND_DIR / "alembic"))
    return config


@pytest.fixture(scope="module")
def migrated_db():
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


@pytest.fixture
def db_session(pg_engine):
    session = sessionmaker(bind=pg_engine, autoflush=False, expire_on_commit=False)()
    try:
        yield session
    finally:
        session.close()


@pytest.fixture
def meili_client():
    client = get_client()
    yield client
    client.index(INDEX_NAME).delete_all_documents()


@pytest.fixture
def api_client(db_session):
    def _get_db():
        yield db_session

    app.dependency_overrides[get_db] = _get_db
    try:
        yield TestClient(app)
    finally:
        app.dependency_overrides.clear()


def test_ac020_reimport_refreshes_directory_and_index_without_duplicates(
    pg_engine, meili_client, api_client, tmp_path
) -> None:
    first = tmp_path / "first.csv"
    first.write_text(ORIGINAL_CSV)
    import_airports(str(first))
    rebuild_index(client=meili_client)

    before = api_client.get("/airports/KQAC1")
    assert before.status_code == 200
    assert before.json()["name"] == "QA Acceptance Test Airport"

    second = tmp_path / "second.csv"
    second.write_text(UPDATED_CSV)
    import_airports(str(second))
    rebuild_index(client=meili_client)

    # Directory: the renamed row replaces the old one, the new row is
    # present, and there is exactly one row per ident -- no duplicates.
    with pg_engine.begin() as conn:
        idents = conn.execute(text("SELECT ident FROM airports ORDER BY ident")).scalars().all()
    assert idents == ["KQAC1", "KQAC2"]
    assert len(idents) == len(set(idents))

    renamed = api_client.get("/airports/KQAC1")
    assert renamed.status_code == 200
    assert renamed.json()["name"] == "QA Acceptance Test Airport (Renamed)"

    new_row = api_client.get("/airports/KQAC2")
    assert new_row.status_code == 200
    assert new_row.json()["name"] == "QA Acceptance Second Airport"

    # Search index: reflects the rename and the new row, no stale duplicate
    # documents left over from the first import.
    search = api_client.get("/airports/search", params={"q": "QA Acceptance"})
    assert search.status_code == 200
    names = {hit["name"] for hit in search.json()["results"]}
    assert names == {
        "QA Acceptance Test Airport (Renamed)",
        "QA Acceptance Second Airport",
    }
    assert search.json()["total"] == 2


def test_nfr007_index_can_be_rebuilt_from_the_database_from_scratch(
    pg_engine, meili_client, api_client, tmp_path
) -> None:
    csv_path = tmp_path / "dataset.csv"
    csv_path.write_text(UPDATED_CSV)
    import_airports(str(csv_path))

    # Wipe the index completely and rebuild it purely from what is now in
    # PostgreSQL -- no in-app edit of any kind is involved.
    meili_client.index(INDEX_NAME).delete_all_documents()
    indexed = rebuild_index(client=meili_client)

    assert indexed == 2
    search = api_client.get("/airports/search", params={"q": "KQAC"})
    assert search.json()["total"] == 2
