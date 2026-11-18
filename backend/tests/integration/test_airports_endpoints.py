"""Integration tests for GET /airports/search and GET /airports/{code}.

Run against the real PostgreSQL named by DATABASE_URL and the real
Meilisearch named by MEILI_URL/MEILI_MASTER_KEY -- per this ticket's
constraints, neither is mocked.
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


def _add_airport(session, **overrides) -> Airport:
    base = {
        "ident": "HKJK",
        "icao_code": "HKJK",
        "iata_code": "NBO",
        "name": "Jomo Kenyatta International Airport",
        "municipality": "Nairobi",
        "iso_country": "KE",
        "country_name": "Kenya",
        "airport_type": "large_airport",
        "latitude_deg": -1.3192,
        "longitude_deg": 36.9278,
    }
    base.update(overrides)
    airport = Airport(**base)
    session.add(airport)
    session.commit()
    session.refresh(airport)
    return airport


def test_ac021_search_returns_matching_airports_with_expected_fields(
    db_session, meili_client, api_client
) -> None:
    _add_airport(db_session)
    rebuild_index(session=db_session, client=meili_client)

    response = api_client.get("/airports/search", params={"q": "nairobi"})

    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 1
    hit = body["results"][0]
    for field in (
        "icao_code",
        "iata_code",
        "name",
        "municipality",
        "iso_country",
        "country_name",
        "airport_type",
        "latitude_deg",
        "longitude_deg",
    ):
        assert field in hit
    assert hit["icao_code"] == "HKJK"
    assert hit["iata_code"] == "NBO"


def test_ac022_search_with_no_match_and_with_empty_q_returns_empty_results(
    db_session, meili_client, api_client
) -> None:
    _add_airport(db_session)
    rebuild_index(session=db_session, client=meili_client)

    no_match = api_client.get("/airports/search", params={"q": "zzzznotanairport"})
    assert no_match.status_code == 200
    assert no_match.json() == {
        "query": "zzzznotanairport",
        "total": 0,
        "limit": 20,
        "offset": 0,
        "results": [],
    }

    missing_q = api_client.get("/airports/search")
    assert missing_q.status_code == 200
    assert missing_q.json()["results"] == []
    assert missing_q.json()["total"] == 0


def test_ac023_search_and_lookup_need_no_credentials_and_openapi_has_no_security(
    db_session, meili_client, api_client
) -> None:
    _add_airport(db_session)
    rebuild_index(session=db_session, client=meili_client)

    search_response = api_client.get("/airports/search", params={"q": "nairobi"})
    assert search_response.status_code == 200

    lookup_response = api_client.get("/airports/HKJK")
    assert lookup_response.status_code == 200

    openapi = api_client.get("/openapi.json").json()
    assert "securitySchemes" not in openapi.get("components", {})
    for path in ("/airports/search", "/airports/{code}"):
        for method in openapi["paths"][path].values():
            assert "security" not in method


def test_ac024_lookup_succeeds_case_insensitively_by_icao_iata_or_ident(
    db_session, meili_client, api_client
) -> None:
    _add_airport(db_session)

    for code in ("HKJK", "hkjk", "NBO", "nbo"):
        response = api_client.get(f"/airports/{code}")
        assert response.status_code == 200, code
        body = response.json()
        assert body["icao_code"] == "HKJK"
        assert body["iata_code"] == "NBO"


def test_ac025_lookup_returns_404_with_detail_for_unknown_code(
    db_session, meili_client, api_client
) -> None:
    response = api_client.get("/airports/ZZZZ")

    assert response.status_code == 404
    assert response.json() == {"detail": "Airport not found"}


def test_nfr002_limit_outside_range_returns_422(api_client) -> None:
    too_big = api_client.get("/airports/search", params={"q": "a", "limit": 51})
    assert too_big.status_code == 422

    too_small = api_client.get("/airports/search", params={"q": "a", "limit": 0})
    assert too_small.status_code == 422


def test_nfr002_search_respects_limit_and_offset(db_session, meili_client, api_client) -> None:
    for i in range(5):
        _add_airport(
            db_session,
            ident=f"KAAA{i}",
            icao_code=f"KAA{i}",
            iata_code=None,
            name=f"Alpha Airport {i}",
        )
    rebuild_index(session=db_session, client=meili_client)

    response = api_client.get("/airports/search", params={"q": "alpha", "limit": 2, "offset": 1})

    assert response.status_code == 200
    body = response.json()
    assert body["limit"] == 2
    assert body["offset"] == 1
    assert len(body["results"]) == 2
    assert body["total"] == 5


def test_nfr008_no_write_routes_exist_for_airport_data(api_client) -> None:
    openapi = api_client.get("/openapi.json").json()

    for path, methods in openapi["paths"].items():
        if "airport" not in path.lower():
            continue
        for method in methods:
            assert method.lower() not in {"post", "put", "patch", "delete"}, (
                f"{method.upper()} {path} is a write route on airport data"
            )
