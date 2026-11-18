"""Acceptance tests for AC-021 through AC-025: the public airport API
contract -- GET /airports/search and GET /airports/{code} -- called with no
credentials.

Runs against the real PostgreSQL (DATABASE_URL) and the real Meilisearch
(MEILI_URL/MEILI_MASTER_KEY) this sandbox provides; neither is mocked.
"""

import os
from pathlib import Path

import pytest
from alembic.config import Config
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from alembic import command
from app.database import get_db
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


def _seed(session: Session) -> Airport:
    airport = Airport(
        ident="EGLL",
        icao_code="EGLL",
        iata_code="LHR",
        name="London Heathrow Airport",
        municipality="London",
        iso_country="GB",
        country_name="United Kingdom",
        airport_type="large_airport",
        latitude_deg=51.4706,
        longitude_deg=-0.4619,
    )
    session.add(airport)
    session.commit()
    session.refresh(airport)
    return airport


def test_ac021_search_match_returns_all_six_field_groups(
    db_session, meili_client, api_client
) -> None:
    _seed(db_session)
    rebuild_index(session=db_session, client=meili_client)

    response = api_client.get("/airports/search", params={"q": "heathrow"})

    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 1
    hit = body["results"][0]
    assert hit["icao_code"] == "EGLL"
    assert hit["iata_code"] == "LHR"
    assert hit["name"] == "London Heathrow Airport"
    assert hit["municipality"] == "London"
    assert hit["iso_country"] == "GB"
    assert hit["latitude_deg"] == pytest.approx(51.4706)
    assert hit["longitude_deg"] == pytest.approx(-0.4619)


def test_ac022_search_with_no_matching_query_returns_200_empty(
    db_session, meili_client, api_client
) -> None:
    _seed(db_session)
    rebuild_index(session=db_session, client=meili_client)

    response = api_client.get("/airports/search", params={"q": "nosuchplaceatall"})

    assert response.status_code == 200
    assert response.json()["results"] == []
    assert response.json()["total"] == 0


def test_ac023_search_succeeds_with_no_credentials(db_session, meili_client, api_client) -> None:
    _seed(db_session)
    rebuild_index(session=db_session, client=meili_client)

    response = api_client.get("/airports/search", params={"q": "heathrow"}, headers={})

    assert response.status_code == 200
    assert "authorization" not in response.request.headers


def test_ac024_lookup_by_icao_and_by_iata_both_return_full_details(db_session, api_client) -> None:
    _seed(db_session)

    by_icao = api_client.get("/airports/EGLL", headers={})
    by_iata = api_client.get("/airports/LHR", headers={})

    for response in (by_icao, by_iata):
        assert response.status_code == 200
        body = response.json()
        assert body["icao_code"] == "EGLL"
        assert body["iata_code"] == "LHR"
        assert body["name"] == "London Heathrow Airport"
        assert body["municipality"] == "London"
        assert body["iso_country"] == "GB"
        assert body["latitude_deg"] == pytest.approx(51.4706)
        assert body["longitude_deg"] == pytest.approx(-0.4619)


def test_ac025_lookup_with_unknown_code_returns_404(db_session, api_client) -> None:
    response = api_client.get("/airports/ZZZZZZ")

    assert response.status_code == 404
    assert response.json() == {"detail": "Airport not found"}
