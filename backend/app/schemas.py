"""Pydantic request and response models.

One schema per shape the approved API spec commits to, plus `StubResponse`,
which the routes in `app/routers/` return until the search, lookup and
distance handlers are implemented. The real shapes are defined now so the
OpenAPI document matches the spec from day one and the frontend can be
written against a contract that will not change shape once the handler
behind it does.
"""

from pydantic import BaseModel, ConfigDict, Field


class StubResponse(BaseModel):
    """What a generated route returns until someone implements it.

    A stub that returns a typed body rather than raising keeps the service
    startable and its OpenAPI document complete, so the frontend can be built
    against the agreed shape while the handlers are still being written.
    """

    endpoint: str
    status: str = "not_implemented"
    detail: str = "Scaffolded from the approved API spec; no behaviour yet."


class AirportOut(BaseModel):
    """One airport, shaped exactly as /airports/search and /airports/{code} return it.

    `iata_code` is "" rather than null when the dataset has none -- the API
    spec says "empty when absent", not "omitted" or "null".
    """

    model_config = ConfigDict(from_attributes=True)

    id: int
    icao_code: str
    iata_code: str
    name: str
    municipality: str
    country_name: str
    latitude_deg: float
    longitude_deg: float


class SearchResponse(BaseModel):
    """GET /airports/search: ranked matches, or an empty list when nothing matches."""

    results: list[AirportOut]
    count: int


class RoutePoint(BaseModel):
    """One end of a great-circle route: the code it was looked up by and its position."""

    code: str
    lat: float
    lon: float


class DistanceResponse(BaseModel):
    """GET /routes/distance.

    `from` is a Python keyword, so the field is `from_` in code and aliased to
    "from" on the wire; `populate_by_name` lets handler code build one with
    the keyword argument `from_=...` and still serialise with `by_alias=True`.
    """

    model_config = ConfigDict(populate_by_name=True)

    from_: RoutePoint = Field(alias="from")
    to: RoutePoint
    distance_km: float
    distance_nm: float
