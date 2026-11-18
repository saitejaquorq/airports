"""Acceptance tests for AC-018 and AC-019.

AC-018: once the bundled OurAirports snapshot (backend/data/airports.csv) is
imported, searching the directory returns worldwide airports -- at least one
from each of three different continents -- each carrying its ICAO code, IATA
code where present, name, city, country and coordinates.

AC-019: the running API exposes no route that creates, updates or deletes
airport data.

Runs against the real PostgreSQL (DATABASE_URL) and the real Meilisearch
(MEILI_URL/MEILI_MASTER_KEY) this sandbox provides; neither is mocked.
"""

import os
from pathlib import Path

import pytest
from alembic.config import Config
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from alembic import command
from app.database import get_db
from app.importer import import_airports
from app.main import app
from app.models import Airport
from app.search_index import INDEX_NAME, get_client, rebuild_index

BACKEND_DIR = Path(__file__).resolve().parents[2]


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
def db_session(migrated_db):
    engine = create_engine(os.environ["DATABASE_URL"], future=True)
    session = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)()
    session.query(Airport).delete()
    session.commit()
    try:
        yield session
    finally:
        session.rollback()
        session.query(Airport).delete()
        session.commit()
        session.close()
        engine.dispose()


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


@pytest.fixture
def bundled_dataset(db_session, meili_client):
    """Import the real bundled dataset into this test's database, then
    rebuild the search index from it -- the same path a deployment runs."""
    loaded = import_airports(session=db_session)
    rebuild_index(session=db_session, client=meili_client)
    return loaded


def test_ac018_bundled_dataset_covers_worldwide_airports_with_full_fields(
    bundled_dataset, api_client
) -> None:
    assert bundled_dataset > 0

    # HKJK (Africa), EGLL (Europe), KJFK (North America) -- three continents.
    for code in ("HKJK", "EGLL", "KJFK"):
        response = api_client.get("/airports/search", params={"q": code})
        assert response.status_code == 200, code
        body = response.json()
        assert body["total"] >= 1, f"{code} not found by search"
        hit = next(h for h in body["results"] if h["icao_code"] == code or h["iata_code"] == code)
        assert hit["icao_code"] == code
        assert hit["name"]
        assert hit["municipality"]
        assert hit["iso_country"]
        assert hit["latitude_deg"] is not None
        assert hit["longitude_deg"] is not None

    jfk_hit = api_client.get("/airports/search", params={"q": "KJFK"}).json()["results"][0]
    assert jfk_hit["iata_code"] == "JFK"


def test_ac019_no_write_route_exists_for_airport_data(api_client) -> None:
    openapi = api_client.get("/openapi.json").json()

    airport_paths = {p: m for p, m in openapi["paths"].items() if "airport" in p.lower()}
    assert airport_paths, "expected at least one /airports path in the OpenAPI document"
    for path, methods in airport_paths.items():
        for method in methods:
            assert method.lower() not in {"post", "put", "patch", "delete"}, (
                f"{method.upper()} {path} is a write route on airport data"
            )

    for method_name, path in (
        ("post", "/airports"),
        ("put", "/airports/KJFK"),
        ("patch", "/airports/KJFK"),
        ("delete", "/airports/KJFK"),
    ):
        response = getattr(api_client, method_name)(path, json={})
        assert response.status_code in (404, 405), (
            f"{method_name.upper()} {path} -> {response.status_code}"
        )
