"""Engine, session factory and the request-scoped session dependency.

The approved architecture names PostgreSQL as the airport directory's source
of truth (see ENVIRONMENT.md), queried directly for lookups and populated
wholesale by the import job. There is deliberately no SQLite stand-in here:
`DATABASE_URL` defaults to the Postgres docker-compose brings up locally, and
every other environment (tests included) always has the real one set.
"""

import os
from collections.abc import Iterator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://app:app@localhost:5432/app")

engine = create_engine(DATABASE_URL, pool_pre_ping=True, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


class Base(DeclarativeBase):
    """Declarative base that every generated model inherits."""


def get_db() -> Iterator[Session]:
    """One session per request, closed even when the handler raises."""
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
