"""Pydantic request and response models.

One pair per entity in the approved data model, plus the placeholder every
generated route returns until it has been implemented.
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


class StubResponse(BaseModel):
    """What a generated route returns until someone implements it.

    A stub that returns a typed body rather than raising keeps the service
    startable and its OpenAPI document complete, so the frontend can be built
    against the agreed shape while the handlers are still being written.
    """

    endpoint: str
    status: str = "not_implemented"
    detail: str = "Scaffolded from the approved API spec; no behaviour yet."
