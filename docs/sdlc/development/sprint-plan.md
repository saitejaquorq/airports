# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Import the OurAirports dataset into Postgres/Meilisearch and stand up the public search and lookup endpoints

Capacity: 20 points · Committed: 17

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-007 | Story | Load the worldwide airport directory from a bundled open dataset | 8 | backend-agent | — |
| ↳ US-007-T1 | Task | Design and migrate airports schema in PostgreSQL | — | backend-agent | — |
| ↳ US-007-T2 | Task | Build OurAirports CSV import job | — | backend-agent | — |
| ↳ US-007-T3 | Task | Index imported airports into Meilisearch | — | backend-agent | — |
| ↳ US-007-T4 | Task | Document and schedule the re-import refresh process | — | devops-agent | — |
| US-008 | Story | Public airport search endpoint | 5 | backend-agent | US-007 |
| US-009 | Story | Public airport lookup endpoint | 3 | backend-agent | US-007 |
| US-011 | Story | Use the app free of charge | 1 | qa-agent | — |

## Sprint 2: Sprint 2

Deliver airport search, result selection, detail view, and origin/destination selection in the web app

Capacity: 20 points · Committed: 16

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Search airports by code, name, city, or country | 5 | frontend-agent | US-008 |
| US-002 | Story | Review and select a search result | 3 | frontend-agent | US-001 |
| US-003 | Story | View airport details | 3 | frontend-agent | US-009, US-002 |
| US-004 | Story | Select origin and destination airports | 5 | frontend-agent | US-002 |

## Sprint 3: Sprint 3

Deliver the great-circle route map with distance, responsive polish, and getting-started documentation

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-005 | Story | View the great-circle route on an interactive map | 8 | frontend-agent | US-004 |
| ↳ US-005-T1 | Task | Implement GET /routes/distance endpoint | — | backend-agent | — |
| ↳ US-005-T2 | Task | Integrate Leaflet map with MapTiler tiles | — | frontend-agent | — |
| ↳ US-005-T3 | Task | Render great-circle line and airport markers | — | frontend-agent | — |
| ↳ US-005-T4 | Task | Add map tile and data provider attribution | — | frontend-agent | — |
| US-006 | Story | View route distance in nautical miles and kilometres | 3 | frontend-agent | US-005 |
| US-010 | Story | Use the app on desktop and mobile browsers | 5 | frontend-agent | US-003, US-005, US-006 |
| US-012 | Story | Getting-started guide for users and operators | 3 | devops-agent | US-007, US-005, US-006 |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
