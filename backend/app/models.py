"""SQLAlchemy models.

`airports` is read-only from the application's point of view: no route, service
or admin path writes to it. Its rows come only from the import job in
`app.importer`, which the Alembic migration in `alembic/versions/` makes room
for. See `docs/sdlc/architecture/data-model.md` for the approved shape.
"""

from datetime import datetime

from sqlalchemy import Float, String
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.database import Base

__all__ = ["Base", "Airport"]


class Airport(Base):
    """One row of the OurAirports directory."""

    __tablename__ = "airports"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    ident: Mapped[str | None] = mapped_column(String(16), unique=True, index=True)
    icao_code: Mapped[str | None] = mapped_column(String(8), index=True)
    iata_code: Mapped[str | None] = mapped_column(String(8), index=True)
    name: Mapped[str] = mapped_column(String(256), nullable=False)
    municipality: Mapped[str | None] = mapped_column(String(256))
    iso_country: Mapped[str | None] = mapped_column(String(8))
    country_name: Mapped[str | None] = mapped_column(String(128))
    airport_type: Mapped[str | None] = mapped_column(String(32))
    latitude_deg: Mapped[float] = mapped_column(Float, nullable=False)
    longitude_deg: Mapped[float] = mapped_column(Float, nullable=False)
    imported_at: Mapped[datetime] = mapped_column(server_default=func.now(), nullable=False)
