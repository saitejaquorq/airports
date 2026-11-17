# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-STACK · approved · source: requirements:technology-stack

Product owner approved a fixed, lightweight technology stack sized to a read-only reference tool with no accounts.

Backend: FastAPI 0.115 - lean Python service to serve search/lookup and compute great-circle distance, and to import/refresh the OurAirports dataset on a schedule; no accounts/payments/writes to manage. Cloud: AWS - hosts the web app, FastAPI service, and database; scales down cheaply for unpredictable, low-revenue public traffic. Database: PostgreSQL 16 - stores ~80,000 read-only airport records (codes, names, cities, countries, coordinates), supports clean re-import and location/lookup queries without extra moving parts. Frontend: React 19 - drives the single interactive screen (search box, results list, map) and pairs with Leaflet to render the great-circle line on an OpenStreetMap-style map; works on desktop and mobile browsers.

### REQ-SERVICES · approved · source: requirements:services

Two external services approved for runtime: a search engine and a map tile provider, with one required API key.

Search: Meilisearch (container getmeili/meilisearch:v1.10.3) - provides fast, typo-tolerant, type-as-you-go search across ICAO code, IATA code, name, city, and country, which plain DB queries would struggle to match. Map tiles: MapTiler (custom, env MAPTILER_API_KEY) - supplies production-grade map background imagery for the route map, since OSM's own public tiles are not meant for production traffic; has a free tier suited to a low-cost public tool. Required API key: MAPTILER_API_KEY.

### REQ-SCOPE · approved · source: requirements:scope

Scope covers worldwide airport search, detail view, great-circle route plotting with distance, public API, and documentation; explicitly excludes real airway routing and user accounts.

In scope: airport search by ICAO/IATA/name/city/country; airport detail view (codes, name, city, country, coordinates); origin/destination selection for a route; great-circle route drawn on an interactive map; route distance in nautical miles and kilometres; worldwide airport directory loaded from a bundled read-only open dataset; public search and lookup endpoints; getting-started documentation; OurAirports as data source; MapTiler tiles; haversine distance calculation; free to use with no payments/billing. Out of scope - do not design or build: real airways/waypoint routing (flight-planner-grade routing through published airways); user accounts, saved favourites, and saved routes.

### REQ-FEAT-USING-APP · approved · source: requirements:feature:Using the app

The app is delivered as a single responsive screen, free for anyone to use with no sign-up.

Single-screen responsive app: one interactive web screen with a search box, results list, and route map; layout adapts so search, airport details, and the route map stay usable on desktop and mobile browsers. Free public access, no sign-up: every feature usable without an account, sign-up, subscription, payment, or billing at any point; nothing is saved per user.

### REQ-FEAT-SEARCH · approved · source: requirements:feature:Searching airports

Users can search the worldwide directory by multiple fields and review identifying details in results.

Search airports by code, name, city or country: search the worldwide directory by ICAO code, IATA code, airport name, city, or country and get a list of matches; when nothing matches, an empty-results message is shown and no entries are listed. Review and select a result: each result shows at least airport name, ICAO code, IATA code (where available), city, and country; from a result the user can open the detail view or set the airport as an origin or destination for a route.

### REQ-FEAT-DETAILS · approved · source: requirements:feature:Airport details

A read-only detail view shows full identifying and location information for a selected airport.

View airport details: shows name, ICAO code, IATA code, city, country, and latitude/longitude coordinates for a selected airport. When an airport has no IATA code the field is shown as empty/not available rather than an incorrect value; no controls to edit, add, or delete airport data are offered.

### REQ-FEAT-ROUTE · approved · source: requirements:feature:Plotting a route

Users select an origin and destination, see a great-circle route drawn on an interactive map, and view the distance in two units.

Select origin and destination: search for and select one airport as origin and a different one as destination. Change or clear a selection: clear or replace either airport and re-plot the route. Draw the great-circle route on a map: once both are set, a great-circle line connects them with both airports marked; map stays interactive on pan/zoom with correct positioning; base map renders with appropriate attribution for tile and data providers. Show route distance: great-circle (haversine) distance shown in both nautical miles and kilometres; if origin and destination are the same airport, distance shows as zero with a point or no line rather than an error.

### REQ-FEAT-DIRECTORY · approved · source: requirements:feature:Airport directory data

The app is populated worldwide from the bundled OurAirports dataset, which is read-only and refreshed only by re-import.

Worldwide airport directory from an open dataset: populated with worldwide airports from the bundled OurAirports open dataset, each with ICAO code, IATA code where present, name, city, country, and coordinates. Read-only directory refreshed by re-import: data cannot be changed through the app; an operator refreshes it by re-importing an updated dataset, and the directory then reflects the re-imported data without manual in-app editing.

### REQ-FEAT-API · approved · source: requirements:feature:Public API

Two public, credential-free endpoints support searching airports and looking up a single airport by code.

Public airport search endpoint: no-authentication endpoint searches by ICAO, IATA, name, city, or country and returns matching airports with ICAO code, IATA code, name, city, country, and coordinates; a query matching nothing returns an empty result set with a success response; requests succeed without credentials. Public airport lookup endpoint: no-authentication endpoint looks up a single airport by valid ICAO or IATA code and returns full details; a nonexistent code returns a not-found response.

### REQ-FEAT-DOCS · approved · source: requirements:feature:Help & documentation

Getting-started documentation explains how to use the app and how to configure the dataset and map tiles.

Published documentation explains how to search airports, view airport details, and plot a great-circle route with distance. The setup section explains that airport data comes from the bundled OurAirports dataset and how to configure MapTiler map tiles, using placeholders such as <your-maptiler-api-key> rather than a real key.

### NFR-001 · approved · source: requirements:NFR-001

Performance: search must return results instantly as the user types, with typo tolerance.

Airport search returns matching results quickly as the user types, with typo tolerance, across ICAO code, IATA code, name, city, and country, so people can find the right airport instantly.

### NFR-002 · approved · source: requirements:NFR-002

Scalability: the app must serve the full ~80,000-airport directory and stay responsive under unpredictable public traffic while scaling down cheaply.

The app serves search and lookups over the full worldwide directory of roughly eighty thousand airports and stays responsive under unpredictable public visitor numbers, while scaling down cheaply when traffic is low. Target: roughly 80,000 airports in the directory.

### NFR-003 · approved · source: requirements:NFR-003

Availability: the free public tool must remain available and usable without manual intervention.

As a free public reference tool, the app remains available and usable under unpredictable visitor numbers without requiring manual intervention.

### NFR-004 · approved · source: requirements:NFR-004

Privacy: no accounts exist and nothing is stored per user.

The app has no user accounts and does not collect or save anything per user; searches, airport views, and routes are not tied to an individual or retained.

### NFR-005 · approved · source: requirements:NFR-005

Compatibility: the responsive app must work in current desktop and mobile browsers with no native app required.

The responsive web app works in current desktop and mobile browsers, keeping search, airport details, and the route map usable with a layout appropriate to the screen size, with no native app required.

### NFR-006 · approved · source: requirements:NFR-006

Compliance: the map must display attribution for MapTiler tiles and underlying map data providers.

When the interactive map loads, it displays appropriate attribution for the MapTiler map tiles and the underlying map data providers.

### NFR-007 · approved · source: requirements:NFR-007

Maintainability: the directory must be refreshable by clean re-import rather than manual editing.

The airport directory can be refreshed by cleanly re-importing an updated OurAirports dataset, replacing the data without manual in-app editing.

### NFR-008 · approved · source: requirements:NFR-008

Security: airport data is read-only everywhere, including via the public endpoints.

Airport data is read-only: the app and its public endpoints offer no way to add, edit, or delete airport records, so the directory can only change by re-importing the dataset.

### NFR-009 · approved · source: requirements:NFR-009

Security (accepted risk): public search/lookup endpoints intentionally require no authentication.

The search and lookup endpoints are intentionally public and require no credentials or authentication, because the directory is open reference data with no accounts or private information. Accepted risk per requirements input.

### NFR-010 · approved · source: requirements:NFR-010

Compliance (accepted risk): the tool is informational only, not for operational flight planning, so no aviation certification or regulatory routing constraints apply.

The tool provides great-circle distances and routes for reference only and is not intended for operational flight planning, so no aviation certification or regulatory routing constraints are applied and real airways or waypoint routing is not provided. Accepted risk per requirements input.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-11-17

**Capabilities in scope:** Airport search by ICAO code, IATA code, name, city, and country, Airport detail view with codes, name, city, country, and coordinates, Origin and destination selection for a route, Great-circle route drawn on an interactive map, Route distance shown in nautical miles and kilometres, Worldwide airport directory loaded from a bundled open dataset (read-only), Public search and airport-lookup endpoints, Getting-started documentation, OurAirports public open dataset as the airport source, MapTiler map tiles for the interactive map, Great-circle (haversine) distance calculation, Free to use, with no payments or billing

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | The server's job here is small and well-defined: serve airport search results and compute the great-circle distance between two points. FastAPI is a lean Python service that does this quickly, and Python is the natural place to import and refresh the OurAirports open dataset on a schedule. There are no accounts, payments, or writes to manage, so a heavyweight framework would be wasted. |
| cloud | AWS | A free public tool needs hosting that stays up under unpredictable visitor numbers and costs little when traffic is low. AWS covers everything this product needs — serving the web app, running the small FastAPI service, and hosting the database — and scales down cheaply, which matters for a tool with no revenue behind it. |
| database | PostgreSQL | The whole dataset is roughly eighty thousand airports with codes, names, cities, countries, and coordinates — read-only and refreshed by re-import. PostgreSQL stores this comfortably, lets you re-import cleanly on each refresh, and can answer location and lookup queries without any extra moving parts. It's the right size of tool for a reference list that is read far more than it is changed. |
| frontend | React | Your product is one interactive screen: a search box, a results list, and a map that draws a route between two airports and shows the distance. React handles exactly this kind of live, click-and-update interface, and it pairs cleanly with Leaflet (the open map library your assumption names) to render the great-circle line on an OpenStreetMap-style map. It works the same on desktop and mobile browsers, which is your stated delivery target. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Airport Search

Users can search the worldwide airport directory by ICAO code, IATA code, airport name, city, or country and get a list of matching airports they can select. This is the primary entry point to the directory and the route tool. Assumption: search covers ICAO, IATA, name, city, and country against the bundled open dataset; no user accounts are involved.

### US-001: Search airports by code, name, city, or country

**Priority:** critical

> As a member of the public using the airport directory, I want to search for airports by ICAO code, IATA code, name, city, or country, so that I can quickly find the airport I am interested in.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the search page | I enter a valid ICAO code such as a four-letter code into the search field | a list of matching airports is shown including the airport with that ICAO code |
| AC-002 | I am on the search page | I enter a valid IATA code such as a three-letter code | a list of matching airports is shown including the airport with that IATA code |
| AC-003 | I am on the search page | I enter an airport name, city, or country name | a list of airports whose name, city, or country matches the entered text is shown |
| AC-004 | the dataset contains no airport matching my search text | I submit the search | an empty-results message is shown and no airport entries are listed |

### US-002: Review and select a search result

**Priority:** high

> As a member of the public using the airport directory, I want each search result to show enough detail to identify the airport and let me select it, so that I can open its details or use it in a route.

| ID | Given | When | Then |
|---|---|---|---|
| AC-005 | my search returned one or more airports | the results list is displayed | each result shows at least the airport name, ICAO code, IATA code (where available), city, and country |
| AC-006 | a search result is displayed | I select that result | I can open the airport detail view or use the airport as an origin or destination for a route |

## EPIC-002: Airport Detail View

Users can view the details of a single airport, including its ICAO code, IATA code, name, city, country, and coordinates. Data is read-only and drawn from the bundled dataset.

### US-003: View airport details

**Priority:** high

> As a aviation enthusiast or member of the public, I want to view the full details of a selected airport, so that I can see its codes, location, and coordinates.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | I have selected an airport from search results | the airport detail view opens | it shows the airport name, ICAO code, IATA code (where available), city, country, and latitude/longitude coordinates |
| AC-008 | an airport in the dataset has no IATA code | I view its detail view | the IATA code field is shown as empty or not available rather than showing an incorrect value |
| AC-009 | I am viewing an airport's details | I look for editing controls | no option to edit, add, or delete airport data is available because the directory is read-only |

## EPIC-003: Route Plotting

Users can select an origin and a destination airport and see the great-circle route drawn as a line on an interactive map, together with the distance in nautical miles and kilometres. Assumption: distance is the great-circle (haversine) distance; the map uses MapTiler tiles with a web mapping library. No published-airways or waypoint routing is provided.

### US-004: Select origin and destination airports

**Priority:** critical

> As a member of the public plotting a route, I want to pick an origin airport and a destination airport from search, so that I can plot the route between them.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | I am using the route tool | I search for and select an airport as the origin | that airport is set as the origin for the route |
| AC-011 | I have set an origin airport | I search for and select a different airport as the destination | that airport is set as the destination for the route |
| AC-012 | I have set an origin and destination | I choose to clear or change a selection | I can replace either airport and re-plot the route |

### US-005: View the great-circle route on an interactive map

**Priority:** critical

> As a member of the public plotting a route, I want the great-circle route between my two selected airports drawn on an interactive map, so that I can visualise the flight path.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | I have selected an origin and a destination airport | the route is plotted | a great-circle line connecting the two airports is drawn on the interactive map and both airports are marked |
| AC-014 | a route is displayed on the map | I pan or zoom the map | the map remains interactive and the route line and airport markers stay correctly positioned |
| AC-015 | the map tiles are provided by MapTiler | the map loads | the base map renders with appropriate attribution for the tile and data providers |

### US-006: View route distance in nautical miles and kilometres

**Priority:** high

> As a member of the public plotting a route, I want the distance of the plotted route shown in both nautical miles and kilometres, so that I know how far apart the two airports are.

| ID | Given | When | Then |
|---|---|---|---|
| AC-016 | I have plotted a route between two airports | the route is displayed | the great-circle (haversine) distance is shown in both nautical miles and kilometres |
| AC-017 | the origin and destination are the same airport | the route is plotted | the distance is shown as zero and no line or a point is shown rather than an error |

## EPIC-004: Worldwide Airport Directory Data

The app is loaded with a worldwide directory of airports from a bundled public open dataset (OurAirports). The data is read-only in the app and refreshed by re-importing the dataset rather than editing in-app. Assumption: dataset provides ICAO code, IATA code, name, city, country, and latitude/longitude per airport.

### US-007: Load the worldwide airport directory from a bundled open dataset

**Priority:** high

> As a operator of the directory, I want the app to be populated with worldwide airports from the bundled OurAirports open dataset, so that users can search and plot routes across airports worldwide.

| ID | Given | When | Then |
|---|---|---|---|
| AC-018 | the app has been set up with the bundled dataset | a user searches the directory | airports from the worldwide OurAirports dataset are available with ICAO code, IATA code (where present), name, city, country, and coordinates |
| AC-019 | the dataset is bundled and read-only | the app is running | the airport data cannot be changed through the app and is only updated by re-importing an updated dataset |
| AC-020 | a newer version of the open dataset is available | an operator re-imports the dataset | the directory reflects the re-imported data without requiring manual in-app editing |

## EPIC-005: Public Search and Lookup API

Public, no-authentication endpoints allow searching airports and looking up a single airport, serving the web app and any public consumers. No accounts or saved data are involved.

### US-008: Public airport search endpoint

**Priority:** medium

> As a consumer of the public API, I want a public endpoint to search airports by ICAO, IATA, name, city, or country, so that I can retrieve matching airports without an account.

| ID | Given | When | Then |
|---|---|---|---|
| AC-021 | the search endpoint is available | I request it with a query matching one or more airports | it returns the matching airports with their ICAO code, IATA code, name, city, country, and coordinates |
| AC-022 | the search endpoint is available | I request it with a query matching no airports | it returns an empty result set and a success response rather than an error |
| AC-023 | the endpoint is public | I call it without any credentials | the request succeeds because no authentication is required |

### US-009: Public airport lookup endpoint

**Priority:** medium

> As a consumer of the public API, I want a public endpoint to look up a single airport by its code, so that I can retrieve one airport's full details.

| ID | Given | When | Then |
|---|---|---|---|
| AC-024 | the lookup endpoint is available | I request an airport by a valid ICAO or IATA code that exists in the dataset | the airport's full details are returned |
| AC-025 | the lookup endpoint is available | I request a code that does not exist in the dataset | a not-found response is returned |

## EPIC-006: Responsive Free-to-Use Web App

The product is delivered as a responsive web application that works on desktop and mobile browsers and is free to use with no payments or billing. Assumption: no native mobile or desktop app; no accounts.

### US-010: Use the app on desktop and mobile browsers

**Priority:** high

> As a member of the public, I want the app to work in a responsive layout on desktop and mobile browsers, so that I can search airports and plot routes on any device.

| ID | Given | When | Then |
|---|---|---|---|
| AC-026 | I open the app in a desktop browser | the page loads | search, airport details, and the route map are usable with a desktop-appropriate layout |
| AC-027 | I open the app in a mobile browser | the page loads | the layout adapts to the smaller screen and search, details, and the route map remain usable |

### US-011: Use the app free of charge

**Priority:** medium

> As a member of the public, I want to use all features without any payment or billing, so that I can access the directory and route tool for free.

| ID | Given | When | Then |
|---|---|---|---|
| AC-028 | I am using any feature of the app | I search airports, view details, or plot a route | no payment, subscription, sign-up, or billing is required at any point |

## EPIC-007: Getting-Started Documentation

Documentation helps a new user or operator get started with the directory: how to search airports, view details, and plot a route, and how the bundled dataset and map tiles are configured.

### US-012: Getting-started guide for users and operators

**Priority:** low

> As a new user or operator, I want getting-started documentation, so that I understand how to use the directory and route tool and how the app is set up.

| ID | Given | When | Then |
|---|---|---|---|
| AC-029 | the getting-started documentation is published | I read it | it explains how to search airports, view airport details, and plot a great-circle route with distance |
| AC-030 | the getting-started documentation is published | an operator reads the setup section | it explains that airport data comes from the bundled OurAirports dataset and how to configure the MapTiler map tiles, using placeholders such as <your-maptiler-api-key> rather than a real key |
<!-- sdlc:auto:end epics -->
