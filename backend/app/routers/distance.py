"""Great-circle (haversine) distance between two airports -- the Airports
API component's third read endpoint.

Returns `StubResponse` until the development sprint implements the haversine
calculation over two airports looked up by code (US-006). `from` is a Python
keyword, so the query parameter is bound to `from_code` and aliased back to
"from" for the OpenAPI document and the wire.
"""

from fastapi import APIRouter, Query

from app.schemas import StubResponse

router = APIRouter(tags=["routes"])


@router.get("/routes/distance", response_model=StubResponse)
async def route_distance(
    from_code: str = Query(..., alias="from", description="Origin airport ICAO or IATA code"),
    to_code: str = Query(..., alias="to", description="Destination airport ICAO or IATA code"),
) -> StubResponse:
    return StubResponse(endpoint="GET /routes/distance")
