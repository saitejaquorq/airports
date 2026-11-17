<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-11-17

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because The product is one interactive screen - search box, results list, and a Leaflet map drawing a route - which React's component and state model handles cleanly, and it pairs directly with Leaflet and MapTiler tiles for the great-circle line and markers.

## Consequences

Delivered as a Vite static SPA on a CloudFront origin separate from the API; the MapTiler key is exposed to the browser because tiles are fetched client-side, which is expected for a free public map tool.
<!-- sdlc:auto:end adr -->