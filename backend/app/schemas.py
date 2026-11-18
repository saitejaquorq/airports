"""Pydantic request and response models.

One pair per entity in the approved data model.
"""

from pydantic import BaseModel, ConfigDict


class Airport(BaseModel):
    """One airport as returned by search and single-code lookup."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    ident: str
    icao_code: str | None
    iata_code: str | None
    name: str
    municipality: str | None
    iso_country: str
    country_name: str | None
    airport_type: str
    latitude_deg: float
    longitude_deg: float


class AirportSearchResponse(BaseModel):
    """The shape of GET /airports/search."""

    query: str
    total: int
    limit: int
    offset: int
    results: list[Airport]
