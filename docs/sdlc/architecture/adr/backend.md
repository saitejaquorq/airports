<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-11-17

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Flask
- Django REST Framework

## Decision Outcome

Chosen option: FastAPI 0.115, because The server's job is small - serve search results from Meilisearch, look up an airport, and compute a haversine distance - and FastAPI is a lean, fast Python service that also hosts the OurAirports import job naturally.

## Consequences

No auth layer is needed since all endpoints are intentionally public; the import job runs from the same codebase as a separate task to keep the running service read-only.
<!-- sdlc:auto:end adr -->