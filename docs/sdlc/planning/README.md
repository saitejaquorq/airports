# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Lets users search the worldwide airport directory by ICAO code, IATA code, name, city, or country and select a result.

Primary entry point to the directory and route tool. Assumption stated: search covers ICAO, IATA, name, city, and country against the bundled open dataset; no user accounts are involved.

**Related:** US-001, US-002

### EPIC-002 · approved · source: planning:EPIC-002

Lets users view the full read-only detail record for a single selected airport.

Shows ICAO code, IATA code, name, city, country, and coordinates. Data is read-only and drawn from the bundled dataset.

**Related:** US-003

### EPIC-003 · approved · source: planning:EPIC-003

Lets users pick an origin and destination airport and see the great-circle route plotted on an interactive map with distance.

Assumption stated: distance is the great-circle (haversine) distance; the map uses MapTiler tiles with a web mapping library. No published-airways or waypoint routing is provided.

**Related:** US-004, US-005, US-006

### EPIC-004 · approved · source: planning:EPIC-004

Populates the app with a worldwide airport directory from the bundled OurAirports open dataset.

Data is read-only in the app and refreshed only by re-importing the dataset, not by in-app editing. Assumption stated: dataset provides ICAO code, IATA code, name, city, country, and latitude/longitude per airport.

**Related:** US-007

### EPIC-005 · approved · source: planning:EPIC-005

Provides public, no-authentication endpoints to search airports and look up a single airport.

Serves the web app and any public consumers. No accounts or saved data are involved.

**Related:** US-008, US-009

### EPIC-006 · approved · source: planning:EPIC-006

Delivers the product as a responsive, free-to-use web application for desktop and mobile browsers.

Assumption stated: no native mobile or desktop app; no accounts. All features are usable with no payment, subscription, sign-up, or billing.

**Related:** US-010, US-011

### EPIC-007 · approved · source: planning:EPIC-007

Provides getting-started documentation for new users and operators of the directory and route tool.

Covers how to search airports, view details, and plot a route, plus how the bundled dataset and map tiles are configured.

**Related:** US-012

### SPRINT-1 · approved · source: planning:Sprint 1

Sprint 1 goal: import the OurAirports dataset into Postgres/Meilisearch and stand up the public search and lookup endpoints. Capacity: 20 points.

Item-to-sprint assignment is inferred from this sprint's stated goal (not explicitly tagged in the input): EPIC-004 (Worldwide Airport Directory Data) with US-007 and its tasks (schema migration, CSV import job, Meilisearch indexing, re-import refresh documentation by backend-agent/devops-agent), and EPIC-005 (Public Search and Lookup API) with US-008 and US-009 (backend-agent).

**Related:** EPIC-004, US-007, EPIC-005, US-008, US-009

### SPRINT-2 · approved · source: planning:Sprint 2

Sprint 2 goal: deliver airport search, result selection, detail view, and origin/destination selection in the web app. Capacity: 20 points.

Item-to-sprint assignment is inferred from this sprint's stated goal (not explicitly tagged in the input): EPIC-001 (Airport Search) with US-001 and US-002, EPIC-002 (Airport Detail View) with US-003, and EPIC-003 (Route Plotting) with US-004 (origin/destination selection), all assigned to frontend-agent.

**Related:** EPIC-001, US-001, US-002, EPIC-002, US-003, EPIC-003, US-004

### SPRINT-3 · approved · source: planning:Sprint 3

Sprint 3 goal: deliver the great-circle route map with distance, responsive polish, and getting-started documentation. Capacity: 20 points.

Item-to-sprint assignment is inferred from this sprint's stated goal (not explicitly tagged in the input): US-005 (great-circle map, with tasks for the distance endpoint, Leaflet/MapTiler integration, great-circle line and markers rendering, and attribution -- backend-agent/frontend-agent), US-006 (distance in nautical miles and kilometres, frontend-agent), EPIC-006 items US-010 (responsive layout, frontend-agent) and US-011 (free-to-use verification, qa-agent), and EPIC-007's US-012 (getting-started guide, devops-agent).

**Related:** US-005, US-006, US-010, US-011, US-012
<!-- sdlc:auto:end narrative -->
