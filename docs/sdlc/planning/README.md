# Planning

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### EPIC-001 · approved · source: planning:EPIC-001

Airport Search: users can search the worldwide directory by code, name, city, or country and select a result.

Primary entry point to the directory and the route tool. Assumption: search covers ICAO, IATA, name, city, and country against the bundled open dataset; no user accounts are involved.

**Related:** US-001, US-002

### EPIC-002 · approved · source: planning:EPIC-002

Airport Detail View: users can view full read-only details of a single airport.

Shows ICAO code, IATA code, name, city, country, and coordinates. Data is read-only and drawn from the bundled dataset.

**Related:** US-003

### EPIC-003 · approved · source: planning:EPIC-003

Route Plotting: users pick an origin and destination and see the great-circle route and distance.

Assumption: distance is the great-circle (haversine) distance; the map uses MapTiler tiles with a web mapping library. No published-airways or waypoint routing is provided.

**Related:** US-004, US-005, US-006

### EPIC-004 · approved · source: planning:EPIC-004

Worldwide Airport Directory Data: the app is loaded from the bundled OurAirports dataset, read-only and refreshed by re-import.

Assumption: dataset provides ICAO code, IATA code, name, city, country, and latitude/longitude per airport.

**Related:** US-007

### EPIC-005 · approved · source: planning:EPIC-005

Public Search and Lookup API: no-authentication endpoints serve the web app and any public consumers.

No accounts or saved data are involved.

**Related:** US-008, US-009

### EPIC-006 · approved · source: planning:EPIC-006

Responsive Free-to-Use Web App: the product works on desktop and mobile browsers with no payments or billing.

Assumption: no native mobile or desktop app; no accounts.

**Related:** US-010, US-011

### EPIC-007 · approved · source: planning:EPIC-007

Getting-Started Documentation: helps new users and operators understand how to use and set up the app.

Covers how to search airports, view details, plot a route, and how the bundled dataset and map tiles are configured.

**Related:** US-012
<!-- sdlc:auto:end narrative -->
