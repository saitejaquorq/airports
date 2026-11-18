# API Reference

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start endpoints -->
| Method | Path | Handler | Source | Summary |
|---|---|---|---|---|
| GET | /airports/search | search_airports | `backend/app/routers/airports.py:24` | — |
| GET | /airports/{code} | get_airport | `backend/app/routers/airports.py:53` | Look up a single airport by ICAO, IATA, or ident code, case-insensitively. |
| GET | /health | health | `backend/app/main.py:68` | Liveness probe, and the only route here that is not a stub. |
<!-- sdlc:auto:end endpoints -->

<!-- sdlc:auto:start drift -->
**Designed but missing:**

- GET /routes/distance
<!-- sdlc:auto:end drift -->

<!-- sdlc:auto:start source -->
Generated from commit `c263d74`
<!-- sdlc:auto:end source -->
