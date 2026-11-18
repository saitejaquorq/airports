"""Test fixtures: one Postgres transaction per test, never the application's own.

ENVIRONMENT.md is explicit for this project: tests use the real PostgreSQL the
sandbox runs (the same `DATABASE_URL` the app reads) -- no SQLite stand-in, no
mock. The tables are created once per test session (idempotent against a
database that already has them), and each test runs inside its own
transaction that is rolled back afterwards, so no test's rows outlive it and
no test depends on another having run first.
"""

import os
from collections.abc import Iterator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker

from app import models  # noqa: F401 -- imported so the tables register before create_all
from app.database import Base, get_db
from app.main import app

_engine = create_engine(os.environ["DATABASE_URL"], pool_pre_ping=True, future=True)
Base.metadata.create_all(bind=_engine)


@pytest.fixture
def db_session() -> Iterator[Session]:
    """A connection with an open transaction, rolled back when the test ends."""
    connection = _engine.connect()
    transaction = connection.begin()
    session = sessionmaker(bind=connection, autoflush=False, expire_on_commit=False)()
    try:
        yield session
    finally:
        session.close()
        transaction.rollback()
        connection.close()


@pytest.fixture
def client(db_session: Session) -> Iterator[TestClient]:
    """The application, talking to this test's transaction and nothing else."""

    def _get_db() -> Iterator[Session]:
        yield db_session

    app.dependency_overrides[get_db] = _get_db
    try:
        yield TestClient(app)
    finally:
        app.dependency_overrides.clear()
