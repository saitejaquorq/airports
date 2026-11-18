"""Search and single-airport lookup -- the Airports API component's two
read endpoints over the directory.

Each handler returns `StubResponse` until the development sprint implements
the Meilisearch-backed search and the Postgres-backed lookup the API spec
describes (US-001, US-002). Query and path parameters are already typed as
the spec commits to them, so the OpenAPI document -- and anything built
against it -- does not change shape once the real implementation lands.
"""

from fastapi import APIRouter, Query

from app.schemas import StubResponse

router = APIRouter(tags=["airports"])


@router.get("/airports/search", response_model=StubResponse)
async def search_airports(
    q: str = Query(..., description="ICAO code, IATA code, name, city or country"),
    limit: int = Query(20, ge=1, le=100),
) -> StubResponse:
    return StubResponse(endpoint="GET /airports/search")


@router.get("/airports/{code}", response_model=StubResponse)
async def get_airport(code: str) -> StubResponse:
    return StubResponse(endpoint="GET /airports/{code}")
