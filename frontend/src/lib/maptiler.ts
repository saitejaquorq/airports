/// <reference types="vite/client" />
// Without the reference above, `import.meta.env` is not typed and `tsc --noEmit` fails.
//
// MapTiler is the `maptiler` architecture component: the external tile provider the
// route planner's Leaflet map draws its background, the great-circle line and the
// origin/destination markers over (see SCR-003, US-005).
//
// Read at build time, the same way `API_BASE_URL` and `API_SECRET_KEY` are in
// `./api.ts`: the platform bakes the deployed key into the built bundle. The key is
// not a secret -- MapTiler scopes it by the requesting domain, not by keeping it out
// of the bundle -- so it is fine to read with a plain (empty) local default.
//
// No screen uses this yet: the route planner currently renders a static SVG
// world map with seeded sample data (see `src/screens/Route.tsx`). This is the seam
// the ticket that wires up `react-leaflet` reads from, so the tile URL and
// attribution string live in one place rather than being re-derived per component.
export const MAPTILER_KEY: string = import.meta.env.VITE_MAPTILER_KEY ?? "";

// MapTiler's own hosted style; swap the style name here if the approved design
// calls for a different one. `{key}` is substituted by the caller, not baked in
// here, so a component can decide what to render while the key is missing.
export const MAPTILER_STYLE_URL = (key: string = MAPTILER_KEY): string =>
  `https://api.maptiler.com/maps/streets-v2/style.json?key=${key}`;

// Required wherever the map is shown (NFR: map/data attribution), regardless of
// which MapTiler style is used.
export const MAP_ATTRIBUTION =
  '© <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> ' +
  '© <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap contributors</a>';
