/// <reference types="vite/client" />
// Where the map tiles come from (architecture: maptiler -- external SaaS tiles).
//
// Baked at build time, same pattern as API_BASE_URL/API_SECRET_KEY in `lib/api.ts`: the
// platform injects the real key for the deployed app, and a bare `npm run dev` falls back
// to an empty string so the toolchain still starts without one configured locally.
//
// The screens that render the Leaflet map (route planner, airport detail) are the
// development sprint's work; this module only owns reading the key and the attribution
// MapTiler and OpenStreetMap require on every view of the map.
export const MAPTILER_KEY: string = import.meta.env.VITE_MAPTILER_KEY ?? "";

export const MAPTILER_TILE_URL =
  "https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=" + MAPTILER_KEY;

export const MAP_ATTRIBUTION =
  '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> ' +
  '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors';
