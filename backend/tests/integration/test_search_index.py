"""Integration tests for the Meilisearch airports index.

Run against the real PostgreSQL named by `DATABASE_URL` and the real
Meilisearch named by `MEILI_URL`/`MEILI_MASTER_KEY` -- the project's
constraints say not to mock either for this ticket.
"""

from pathlib import Path

import pytest
from alembic.config import Config
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from alembic import command
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
    import os

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


def _add_airport(session: Session, **overrides) -> Airport:
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


def test_ac018_typo_query_and_code_query_return_the_expected_airport(
    db_session, meili_client
) -> None:
    _add_airport(db_session)

    rebuild_index(session=db_session, client=meili_client)

    index = meili_client.index(INDEX_NAME)

    typo_results = index.search("nairobe")["hits"]
    assert len(typo_results) == 1
    hit = typo_results[0]
    assert hit["icao_code"] == "HKJK"
    assert hit["iata_code"] == "NBO"
    assert hit["name"] == "Jomo Kenyatta International Airport"
    assert hit["municipality"] == "Nairobi"
    assert hit["country_name"] == "Kenya"
    assert hit["latitude_deg"] == pytest.approx(-1.3192)
    assert hit["longitude_deg"] == pytest.approx(36.9278)

    code_results = index.search("HKJK")["hits"]
    assert len(code_results) == 1
    assert code_results[0]["iata_code"] == "NBO"


def test_rebuild_on_populated_index_replaces_documents_without_stale_rows(
    db_session, meili_client
) -> None:
    first = _add_airport(db_session, ident="HKJK", icao_code="HKJK")
    second = _add_airport(
        db_session,
        ident="KJFK",
        icao_code="KJFK",
        iata_code="JFK",
        name="John F Kennedy International Airport",
        municipality="New York",
        iso_country="US",
        country_name="United States",
        latitude_deg=40.6398,
        longitude_deg=-73.7789,
    )

    rebuild_index(session=db_session, client=meili_client)
    index = meili_client.index(INDEX_NAME)
    assert index.get_stats().number_of_documents == 2

    # Re-run the rebuild against the same (still populated) index: no duplicates.
    rebuild_index(session=db_session, client=meili_client)
    assert index.get_stats().number_of_documents == 2

    # Remove one row from the database, rebuild again: its document disappears.
    db_session.delete(second)
    db_session.commit()
    rebuild_index(session=db_session, client=meili_client)

    assert index.get_stats().number_of_documents == 1
    remaining = index.get_documents().results
    assert {doc.id for doc in remaining} == {first.id}
