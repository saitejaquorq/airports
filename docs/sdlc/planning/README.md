# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Airport Search: let users search the worldwide directory by ICAO code, IATA code, name, city, or country and select a result.

This is the primary entry point to the directory and the route tool. Assumption: search covers ICAO, IATA, name, city, and country against the bundled open dataset; no user accounts are involved.

**Related:** US-001, US-002

### EPIC-002 · approved · source: planning:EPIC-002

Airport Detail View: let users view a single airport's ICAO code, IATA code, name, city, country, and coordinates, read-only.

Data is read-only and drawn from the bundled dataset.

**Related:** US-003

### EPIC-003 · approved · source: planning:EPIC-003

Route Plotting: let users select an origin and destination and see the great-circle route and distance (NM and km) on an interactive map.

Assumption: distance is the great-circle (haversine) distance; the map uses MapTiler tiles with a web mapping library. No published-airways or waypoint routing is provided.

**Related:** US-004, US-005, US-006

### EPIC-004 · approved · source: planning:EPIC-004

Worldwide Airport Directory Data: load the app with airports from the bundled OurAirports open dataset, read-only, refreshed by re-import.

Assumption: dataset provides ICAO code, IATA code, name, city, country, and latitude/longitude per airport.

**Related:** US-007

### EPIC-005 · approved · source: planning:EPIC-005

Public Search and Lookup API: public, no-authentication endpoints to search and look up airports.

Serves the web app and any public consumers. No accounts or saved data are involved.

**Related:** US-008, US-009

### EPIC-006 · approved · source: planning:EPIC-006

Responsive Free-to-Use Web App: works on desktop and mobile browsers, free with no payments or billing.

Assumption: no native mobile or desktop app; no accounts.

**Related:** US-010, US-011

### EPIC-007 · approved · source: planning:EPIC-007

Getting-Started Documentation: help a new user or operator understand how to search, view details, plot routes, and set up the dataset and map tiles.

**Related:** US-012

### PLAN-SPRINT-1 · approved · source: planning:Sprint 1

Sprint 1 (capacity 20): import the OurAirports dataset into Postgres/Meilisearch and stand up the public search and lookup endpoints.

Mapped by sprint goal to: EPIC-004 (US-007 and its tasks US-007-T1 schema migration, US-007-T2 CSV import job, US-007-T3 Meilisearch indexing, US-007-T4 re-import refresh documentation/scheduling) and EPIC-005 (US-008 public search endpoint, US-009 public lookup endpoint).

**Related:** EPIC-004, US-007, EPIC-005, US-008, US-009

### PLAN-SPRINT-2 · approved · source: planning:Sprint 2

Sprint 2 (capacity 20): deliver airport search, result selection, detail view, and origin/destination selection in the web app.

Mapped by sprint goal to: EPIC-001 (US-001 search, US-002 review/select result), EPIC-002 (US-003 airport detail view), and EPIC-003's origin/destination selection story (US-004).

**Related:** EPIC-001, US-001, US-002, EPIC-002, US-003, US-004

### PLAN-SPRINT-3 · approved · source: planning:Sprint 3

Sprint 3 (capacity 20): deliver the great-circle route map with distance, responsive polish, and getting-started documentation.

Mapped by sprint goal to: EPIC-003's remaining story (US-005 route map with tasks US-005-T1 distance endpoint, US-005-T2 Leaflet/MapTiler integration, US-005-T3 line/marker rendering, US-005-T4 attribution; and US-006 distance display), EPIC-006 (US-010 responsive layout, US-011 free to use), and EPIC-007 (US-012 getting-started guide).

**Related:** US-005, US-006, EPIC-006, US-010, US-011, EPIC-007, US-012
<!-- sdlc:auto:end narrative -->
