"""Public, unauthenticated read endpoints for the airport directory.

Search goes through Meilisearch; the single-code lookup reads PostgreSQL
directly. Neither route requires or honours any credentials, and nothing
here stores or logs anything tied to a visitor.
"""

import logging

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Airport as AirportModel
from app.schemas import Airport, AirportSearchResponse
from app.search_index import INDEX_NAME, get_client

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/airports", tags=["airports"])


@router.get("/search", response_model=AirportSearchResponse)
async def search_airports(
    q: str = Query(default=""),
    limit: int = Query(default=20, ge=1, le=50),
    offset: int = Query(default=0, ge=0),
) -> AirportSearchResponse:
    """Search the airport directory via Meilisearch.

    An empty or missing `q` always returns an empty result set, without
    querying Meilisearch. A Meilisearch outage answers 503 rather than
    crashing the process.
    """
    query = q.strip()
    if not query:
        return AirportSearchResponse(query=q, total=0, limit=limit, offset=offset, results=[])

    try:
        client = get_client()
        index = client.index(INDEX_NAME)
        hits = index.search(query, {"limit": limit, "offset": offset})
    except Exception:
        logger.exception("Meilisearch search failed")
        raise HTTPException(status_code=503, detail="Search is temporarily unavailable") from None

    total = hits.get("estimatedTotalHits", hits.get("nbHits", len(hits.get("hits", []))))
    results = [Airport.model_validate(hit) for hit in hits.get("hits", [])]
    return AirportSearchResponse(query=q, total=total, limit=limit, offset=offset, results=results)


@router.get("/{code}", response_model=Airport)
async def get_airport(code: str, db: Session = Depends(get_db)) -> Airport:  # noqa: B008
    """Look up a single airport by ICAO, IATA, or ident code, case-insensitively."""
    normalized = code.strip().upper()
    airport = db.scalar(
        select(AirportModel).where(
            or_(
                func.upper(AirportModel.icao_code) == normalized,
                func.upper(AirportModel.iata_code) == normalized,
                func.upper(AirportModel.ident) == normalized,
            )
        )
    )
    if airport is None:
        raise HTTPException(status_code=404, detail="Airport not found")
    return Airport.model_validate(airport)
