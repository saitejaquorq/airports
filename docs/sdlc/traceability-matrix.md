# Traceability Matrix

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start legend -->
Built from recorded links, not written by a model: requirement key → plan item (`source_stable_key`) → development ticket (`stable_key`) → the ticket's test steps → the last live deployment that started after the work finished. **AC tests** counts the story's acceptance criteria that have a test case, and those whose test cases all passed in the latest finished E2E run.
<!-- sdlc:auto:end legend -->

<!-- sdlc:auto:start matrix -->
| Requirement | Epic | Title | Plan items | Sprint | Design | Code | Commits | Ticket | Tests | AC tests | Deployed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| US-001 | EPIC-001 | Search airports by code, name, city, or country | US-001 | 2 | GET /airports/search, airports, api, frontend | — | — | not started | not run | 0/4 tested · 0/4 passing | — |
| US-002 | EPIC-001 | Review and select a search result | US-002 | 2 | airports, frontend | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-003 | EPIC-002 | View airport details | US-003 | 2 | GET /airports/{code}, airports, api, frontend | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-004 | EPIC-003 | Select origin and destination airports | US-004 | 2 | airports, frontend | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-005 | EPIC-003 | View the great-circle route on an interactive map | US-005, US-005-T1, US-005-T2, US-005-T3, US-005-T4 | 3 | GET /routes/distance, airports, api, frontend, maptiler | — | — | not started | not run | 0/3 tested · 0/3 passing | — |
| US-006 | EPIC-003 | View route distance in nautical miles and kilometres | US-006 | 3 | GET /routes/distance, airports, api, frontend | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-007 | EPIC-004 | Load the worldwide airport directory from a bundled open dataset | US-007, US-007-T1, US-007-T2, US-007-T3, US-007-T4 | 1 | airports, database, importer, search | backend/alembic.ini, backend/alembic/env.py, backend/alembic/script.py.mako, backend/alembic/versions/0001_create_airports.py, backend/app/importer.py +15 more | 31619b2 | delivered | succeeded | 3/3 tested · 0/3 passing | — |
| US-008 | EPIC-005 | Public airport search endpoint | US-008 | 1 | GET /airports/search, airports, api, search | — | 31619b2 | delivered | not run | 3/3 tested · 0/3 passing | — |
| US-009 | EPIC-005 | Public airport lookup endpoint | US-009 | 1 | GET /airports/{code}, airports, api, database | — | 31619b2 | delivered | not run | 2/2 tested · 0/2 passing | — |
| US-010 | EPIC-006 | Use the app on desktop and mobile browsers | US-010 | 3 | frontend | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
| US-011 | EPIC-006 | Use the app free of charge | US-011 | 1 | — | backend/tests/integration/test_public_access.py, frontend/e2e/free-to-use.spec.ts | 31619b2 | delivered | succeeded | 1/1 tested · 1/1 passing | — |
| US-012 | EPIC-007 | Getting-started guide for users and operators | US-012 | 3 | — | — | — | not started | not run | 0/2 tested · 0/2 passing | — |
<!-- sdlc:auto:end matrix -->
