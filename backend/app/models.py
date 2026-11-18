"""SQLAlchemy models.

One table, matching the approved data model exactly: `airports`, the
read-only worldwide directory the architecture's database component stores.
Rows are replaced wholesale by the import job (US-007/US-008); nothing here
creates, updates or deletes a single airport in response to a request
(NFR-008). `icao_code` and `iata_code` are indexed because `/airports/{code}`
looks a row up by either one.
"""

from datetime import datetime

from sqlalchemy import DateTime, Float, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base

__all__ = ["Base", "Airport"]


class Airport(Base):
    __tablename__ = "airports"

    id: Mapped[int] = mapped_column(primary_key=True)
    ident: Mapped[str | None] = mapped_column(String(16), index=True)
    icao_code: Mapped[str | None] = mapped_column(String(8), index=True)
    iata_code: Mapped[str | None] = mapped_column(String(8), index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    municipality: Mapped[str | None] = mapped_column(String(255))
    iso_country: Mapped[str | None] = mapped_column(String(8))
    country_name: Mapped[str | None] = mapped_column(String(255))
    airport_type: Mapped[str | None] = mapped_column(String(32))
    latitude_deg: Mapped[float] = mapped_column(Float, nullable=False)
    longitude_deg: Mapped[float] = mapped_column(Float, nullable=False)
    imported_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, server_default=func.now()
    )
