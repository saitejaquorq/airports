"""Application entrypoint.

Generated from the approved architecture: one router per component that owns
endpoints, one route per endpoint the API spec declares. Every generated route
is a stub that returns a typed placeholder, so the service starts, serves its
OpenAPI document and passes its tests before a single handler is implemented.
"""

import os
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.importer import import_if_empty
from app.routers.airports import router as airports_router
from app.search_index import index_if_needed
from app.services import configured_services


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    """Schema changes happen only through the Alembic migrations in
    `backend/alembic/versions/`; this no longer creates tables itself.

    On startup, load the bundled airport dataset once, but only when the
    `airports` table is empty, and never let a missing dataset file or a
    database whose migrations have not run yet block or crash startup.

    Then create/configure the Meilisearch index and populate it only when
    it is empty while the table is not; a Meilisearch outage logs a warning
    and never blocks startup.
    """
    import_if_empty()
    index_if_needed()
    yield


app = FastAPI(
    title="airports",
    description=(
        "A list of all the airports and their icao codes, searchable and can "
        "plot the flight paths between two destinations"
    ),
    version="0.1.0",
    lifespan=lifespan,
)

# The SPA runs on a different origin than the API, so the browser refuses its calls
# unless that origin is allowed here. In development that is the Vite dev server; when
# deployed, the platform injects the frontend's real URL as ALLOWED_ORIGINS (comma
# separated). Point ALLOWED_ORIGINS at the real thing and nothing else has to change.
_dev_origins = ["http://localhost:5173", "http://127.0.0.1:5173"]
_allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins or _dev_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(airports_router)


@app.get("/health")
async def health() -> dict[str, object]:
    """Liveness probe, and the only route here that is not a stub."""
    return {"status": "ok", "services": configured_services()}
