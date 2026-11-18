// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Table, THead, TBody, TR, TH, TD } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Search, Check, ChevronRight, ChevronDown, AlertCircle } = Icons;

const DOC_META = {
  version: "v1.4",
  updated: "16 Nov 2026",
  dataset: "OurAirports",
  airports: 83412,
  importedAt: "2026-11-16T04:12:00Z",
};

const STEPS = [
  {
    id: "i-2-0-0",
    n: "1",
    text: "Search by ICAO code, IATA code, airport name, city or country",
    hint: "EGLL, LHR, “Heathrow”, “London” and “United Kingdom” all reach the same airport.",
    route: "search",
    cta: "Open airport search",
  },
  {
    id: "i-2-0-1",
    n: "2",
    text: "Open a result to see codes, city, country and latitude/longitude",
    hint: "Details are read-only. Airports with no IATA code show “Not available” rather than a guess.",
    route: null,
  },
  {
    id: "i-2-0-2",
    n: "3",
    text: "Set an origin and a destination, then plot the route on the map",
    hint: "Either end can be replaced at any time; the line and markers re-draw straight away.",
    route: "route",
    cta: "Open route planner",
  },
  {
    id: "i-2-0-3",
    n: "4",
    text: "Read the great-circle distance in nautical miles and kilometres",
    hint: "Both units are shown together. Origin and destination the same reads 0.0 nm / 0.0 km.",
    route: null,
  },
];

const ENDPOINTS = [
  {
    key: "search",
    method: "GET",
    path: "/airports/search",
    query: "?q=EGLL&limit=2",
    purpose:
      "Search the directory by ICAO code, IATA code, name, city or country. A query that matches nothing returns an empty list with 200 OK — never an error.",
    note: null,
    status: "200 OK",
    body: `{
  "query": "EGLL",
  "count": 1,
  "results": [
    {
      "id": 2434,
      "ident": "EGLL",
      "icao_code": "EGLL",
      "iata_code": "LHR",
      "name": "London Heathrow Airport",
      "municipality": "London",
      "iso_country": "GB",
      "country_name": "United Kingdom",
      "airport_type": "large_airport",
      "latitude_deg": 51.4706,
      "longitude_deg": -0.461941,
      "imported_at": "2026-11-16T04:12:00Z"
    }
  ]
}`,
  },
  {
    key: "lookup",
    method: "GET",
    path: "/airports/{code}",
    query: "/airports/KJFK",
    purpose:
      "Look up a single airport by its ICAO or IATA code and return the full record, coordinates included.",
    note: "A code that is not in the dataset returns 404 Not found — not an empty airport.",
    status: "200 OK",
    body: `{
  "id": 3622,
  "ident": "KJFK",
  "icao_code": "KJFK",
  "iata_code": "JFK",
  "name": "John F Kennedy International Airport",
  "municipality": "New York",
  "iso_country": "US",
  "country_name": "United States",
  "airport_type": "large_airport",
  "latitude_deg": 40.639801,
  "longitude_deg": -73.7789,
  "imported_at": "2026-11-16T04:12:00Z"
}`,
  },
  {
    key: "distance",
    method: "GET",
    path: "/routes/distance",
    query: "?from=EGLL&to=KJFK",
    purpose:
      "Great-circle (haversine) distance between two airports, returned in nautical miles and kilometres.",
    note: null,
    status: "200 OK",
    body: `{
  "from": { "icao_code": "EGLL", "iata_code": "LHR" },
  "to":   { "icao_code": "KJFK", "iata_code": "JFK" },
  "distance_nm": 2992.4,
  "distance_km": 5541.9,
  "method": "haversine"
}`,
  },
  {
    key: "health",
    method: "GET",
    path: "/health",
    query: "/health",
    purpose: "Service and dataset status, including when the bundled dataset was last imported.",
    note: null,
    status: "200 OK",
    body: `{
  "status": "ok",
  "dataset": "ourairports",
  "imported_at": "2026-11-16T04:12:00Z",
  "airports": 83412
}`,
  },
];

export default function Screen() {
  const navigate = useNavigate();
  const [openKey, setOpenKey] = React.useState("search");

  const ink = brand.primaryColor;
  const neutral = brand.neutralColor;
  const accent = brand.accentColor;
  const rule = "rgba(17,17,17,0.14)";
  const mono = "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

  const labelStyle = {
    fontSize: "11px",
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: neutral,
    fontWeight: 700,
  };

  const toggle = (key) => setOpenKey((k) => (k === key ? null : key));

  return (
    <div
      className="gs-root w-full bg-white"
      style={{
        "--gs-accent": accent,
        "--gs-ink": ink,
        "--gs-rule": rule,
        backgroundColor: brand.backgroundColor,
        color: ink,
        fontFamily: brand.fontBody,
      }}
    >
      <style>{`
        .gs-root :focus-visible {
          outline: 2px solid var(--gs-accent);
          outline-offset: 2px;
        }
        .gs-link { text-underline-offset: 3px; }
        .gs-link:hover { color: var(--gs-accent); }
        .gs-row-btn:hover { background-color: rgba(17,17,17,0.04); }
        .gs-reveal { animation: gs-reveal 160ms ease-out; }
        @keyframes gs-reveal {
          from { opacity: 0; transform: translateY(-3px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .gs-step:hover .gs-numeral { background-color: var(--gs-ink); color: #ffffff; }
        .gs-numeral { transition: background-color 120ms linear, color 120ms linear; }
        @media (prefers-reduced-motion: reduce) {
          .gs-reveal { animation: none; }
          .gs-numeral { transition: none; }
        }
        .gs-tabular { font-variant-numeric: tabular-nums; }
      `}</style>

      <div className="mx-auto w-full max-w-[1040px] px-4 py-8 sm:px-6 md:px-8 md:py-12">
        {/* Row 1 — page title */}
        <header data-wf="b-0-0" className="mb-6">
          <p style={labelStyle} className="gs-tabular mb-3">
            Documentation · {DOC_META.version} · Updated {DOC_META.updated}
          </p>
          <h1
            className="text-[32px] font-bold leading-[1.1] tracking-tight sm:text-[40px]"
            style={{ fontFamily: brand.fontHeading, color: ink }}
          >
            Getting Started
          </h1>
        </header>

        {/* Row 2 — intro */}
        <section data-wf="b-1-0" className="mb-10">
          <div className="border-l-2 pl-4" style={{ borderColor: ink }}>
            <p className="max-w-[68ch] text-[16px] leading-[1.6]" style={{ color: ink }}>
              How to search the directory, read an airport&rsquo;s details and plot a great-circle
              route with distance. Free to use on desktop and mobile &mdash; no account, sign-up or
              payment.
            </p>
            <p
              className="gs-tabular mt-3 max-w-[68ch] text-[13px] leading-[1.6]"
              style={{ color: neutral }}
            >
              {DOC_META.airports.toLocaleString("en-GB")} airports from the bundled{" "}
              {DOC_META.dataset} open dataset. The layout reflows to a single column on phones; the
              map, search and details stay usable at every width.
            </p>
          </div>
        </section>

        {/* Row 3 — using the directory */}
        <section data-wf="b-2-0" className="mb-12">
          <div
            className="flex items-baseline justify-between gap-4 border-b-2 pb-2"
            style={{ borderColor: ink }}
          >
            <h2
              className="text-[20px] font-bold tracking-tight"
              style={{ fontFamily: brand.fontHeading, color: ink }}
            >
              Using the directory
            </h2>
            <span style={labelStyle} className="hidden sm:inline">
              Four steps
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
            <ol className="m-0 list-none p-0">
              {STEPS.map((step, i) => (
                <li
                  key={step.id}
                  data-wf={step.route ? undefined : step.id}
                  className="gs-step flex gap-4 py-4"
                  style={{
                    borderTop: i === 0 ? "none" : `1px solid ${rule}`,
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="gs-numeral gs-tabular mt-[2px] flex h-7 w-7 shrink-0 items-center justify-center text-[13px] font-bold"
                    style={{
                      border: `2px solid ${ink}`,
                      borderRadius: brand.radius,
                      color: ink,
                    }}
                  >
                    {step.n}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold leading-[1.45]" style={{ color: ink }}>
                      <span className="sr-only">{`Step ${step.n}. `}</span>
                      {step.text}
                    </p>
                    <p
                      className="mt-1 max-w-[62ch] text-[13px] leading-[1.6]"
                      style={{ color: neutral }}
                    >
                      {step.hint}
                    </p>
                    {step.route ? (
                      <button
                        type="button"
                        data-wf={step.id}
                        onClick={() => navigate(step.route)}
                        className="gs-link mt-3 inline-flex min-h-[44px] items-center gap-1 text-[13px] font-bold underline"
                        style={{
                          color: ink,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {step.cta}
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <aside
              className="h-fit p-4"
              style={{ border: `2px solid ${ink}`, borderRadius: brand.radius }}
            >
              <p style={labelStyle}>Worked example</p>
              <svg
                viewBox="0 0 260 110"
                className="mt-4 w-full"
                role="img"
                aria-label="A great-circle arc drawn from London Heathrow to New York John F Kennedy."
              >
                <line x1="0" y1="100" x2="260" y2="100" stroke={rule} strokeWidth="1" />
                <path
                  d="M232 86 C 180 10, 90 6, 26 44"
                  fill="none"
                  stroke={ink}
                  strokeWidth="2"
                  strokeDasharray="5 4"
                />
                <rect x="228" y="82" width="8" height="8" fill={ink} />
                <rect x="22" y="40" width="8" height="8" fill={accent} />
              </svg>
              <dl className="mt-4 space-y-2 text-[13px]">
                <div className="flex items-baseline justify-between gap-3">
                  <dt style={{ color: neutral }}>Origin</dt>
                  <dd className="gs-tabular font-bold" style={{ fontFamily: mono }}>
                    EGLL / LHR
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt style={{ color: neutral }}>Destination</dt>
                  <dd className="gs-tabular font-bold" style={{ fontFamily: mono }}>
                    KJFK / JFK
                  </dd>
                </div>
                <div
                  className="flex items-baseline justify-between gap-3 pt-2"
                  style={{ borderTop: `1px solid ${rule}` }}
                >
                  <dt style={{ color: neutral }}>Distance</dt>
                  <dd className="gs-tabular font-bold" style={{ color: ink }}>
                    2,992.4 nm
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="sr-only">Distance in kilometres</dt>
                  <dd className="gs-tabular ml-auto font-bold" style={{ color: ink }}>
                    5,541.9 km
                  </dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        {/* Row 4 — public endpoints */}
        <section data-wf="b-3-0" className="mb-12">
          <div
            className="flex flex-wrap items-baseline justify-between gap-3 border-b-2 pb-2"
            style={{ borderColor: ink }}
          >
            <h2
              className="text-[20px] font-bold tracking-tight"
              style={{ fontFamily: brand.fontHeading, color: ink }}
            >
              Public endpoints (no authentication)
            </h2>
            <span
              className="inline-flex items-center gap-1 px-2 py-[3px] text-[11px] font-bold"
              style={{
                border: `2px solid ${accent}`,
                color: accent,
                borderRadius: brand.radius,
                letterSpacing: "0.12em",
              }}
            >
              <Check className="h-3 w-3" aria-hidden="true" />
              NO KEY REQUIRED
            </span>
          </div>

          <p className="mt-3 max-w-[72ch] text-[13px] leading-[1.6]" style={{ color: neutral }}>
            Call these from a browser, a script or your own app. No token, no account, no rate-limit
            sign-up. Base URL{" "}
            <code
              className="px-1 py-[1px] text-[12px]"
              style={{ fontFamily: mono, border: `1px solid ${rule}`, color: ink }}
            >
              https://api.airports.example/v1
            </code>
            .
          </p>

          <div className="mt-5 overflow-x-auto">
            <Table className="w-full min-w-[720px] border-collapse text-left">
              <THead>
                <TR style={{ borderBottom: `2px solid ${ink}` }}>
                  <TH
                    data-wf="i-3-0-0"
                    scope="col"
                    className="py-2 pr-4 align-bottom"
                    style={labelStyle}
                  >
                    Method
                  </TH>
                  <TH
                    data-wf="i-3-0-1"
                    scope="col"
                    className="py-2 pr-4 align-bottom"
                    style={labelStyle}
                  >
                    Path
                  </TH>
                  <TH
                    data-wf="i-3-0-2"
                    scope="col"
                    className="py-2 pr-4 align-bottom"
                    style={labelStyle}
                  >
                    Purpose
                  </TH>
                  <TH
                    data-wf="i-3-0-3"
                    scope="col"
                    className="py-2 align-bottom"
                    style={labelStyle}
                  >
                    Example response
                  </TH>
                </TR>
              </THead>
              <TBody>
                {ENDPOINTS.map((ep) => {
                  const isOpen = openKey === ep.key;
                  const panelId = `gs-example-${ep.key}`;
                  return (
                    <React.Fragment key={ep.key}>
                      <TR style={{ borderBottom: `1px solid ${rule}` }}>
                        <TD className="py-3 pr-4 align-top">
                          <span
                            className="inline-block px-[6px] py-[2px] text-[11px] font-bold"
                            style={{
                              border: `2px solid ${ink}`,
                              color: ink,
                              borderRadius: brand.radius,
                              letterSpacing: "0.08em",
                              fontFamily: mono,
                            }}
                          >
                            {ep.method}
                          </span>
                        </TD>
                        <TD className="py-3 pr-4 align-top">
                          <div
                            className="text-[13px] font-bold"
                            style={{ fontFamily: mono, color: ink }}
                          >
                            {ep.path}
                          </div>
                          <div
                            className="gs-tabular mt-1 text-[12px]"
                            style={{ fontFamily: mono, color: neutral }}
                          >
                            {ep.query}
                          </div>
                        </TD>
                        <TD className="py-3 pr-4 align-top">
                          <p
                            className="max-w-[46ch] text-[13px] leading-[1.55]"
                            style={{ color: ink }}
                          >
                            {ep.purpose}
                          </p>
                          {ep.note ? (
                            <p
                              className="mt-2 inline-flex max-w-[46ch] items-start gap-1 text-[12px] font-semibold leading-[1.5]"
                              style={{ color: accent }}
                            >
                              <AlertCircle
                                className="mt-[1px] h-3.5 w-3.5 shrink-0"
                                aria-hidden="true"
                              />
                              {ep.note}
                            </p>
                          ) : null}
                        </TD>
                        <TD className="py-3 align-top">
                          <button
                            type="button"
                            onClick={() => toggle(ep.key)}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            className="gs-row-btn inline-flex min-h-[36px] items-center gap-1.5 px-2 py-1 text-[12px] font-bold"
                            style={{
                              border: `2px solid ${ink}`,
                              borderRadius: brand.radius,
                              color: ink,
                              letterSpacing: "0.04em",
                            }}
                          >
                            {isOpen ? (
                              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : (
                              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                            {isOpen ? "Hide JSON" : "Show JSON"}
                            <span className="sr-only">
                              {" "}
                              for {ep.method} {ep.path}
                            </span>
                          </button>
                        </TD>
                      </TR>
                      {isOpen ? (
                        <TR style={{ borderBottom: `1px solid ${rule}` }}>
                          <TD colSpan={4} className="px-0 pb-5 pt-0">
                            <div id={panelId} className="gs-reveal">
                              <div
                                className="flex items-center justify-between gap-3 px-3 py-2"
                                style={{
                                  border: `1px solid ${rule}`,
                                  borderBottom: "none",
                                  borderRadius: `${brand.radius} ${brand.radius} 0 0`,
                                }}
                              >
                                <span style={labelStyle}>Response · {ep.status}</span>
                                <span
                                  className="text-[11px] font-semibold"
                                  style={{ color: neutral, fontFamily: mono }}
                                >
                                  content-type: application/json
                                </span>
                              </div>
                              <pre
                                className="gs-tabular overflow-x-auto px-3 py-3 text-[12px] leading-[1.6]"
                                style={{
                                  fontFamily: mono,
                                  color: ink,
                                  border: `1px solid ${rule}`,
                                  borderRadius: `0 0 ${brand.radius} ${brand.radius}`,
                                  margin: 0,
                                }}
                              >
                                {ep.body}
                              </pre>
                            </div>
                          </TD>
                        </TR>
                      ) : null}
                    </React.Fragment>
                  );
                })}
              </TBody>
            </Table>
          </div>

          {openKey === null ? (
            <p className="mt-4 text-[12px]" style={{ color: neutral }}>
              All four example responses are collapsed. Choose{" "}
              <strong style={{ color: ink }}>Show JSON</strong> on any row to read the payload.
            </p>
          ) : null}
        </section>

        {/* Row 5 — setup */}
        <section data-wf="b-4-0">
          <div className="border-b-2 pb-2" style={{ borderColor: ink }}>
            <h2
              className="text-[20px] font-bold tracking-tight"
              style={{ fontFamily: brand.fontHeading, color: ink }}
            >
              Setup
            </h2>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <p style={labelStyle}>Airport data</p>
              <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.6]" style={{ color: ink }}>
                Airport data comes from the bundled OurAirports dataset and is read-only &mdash;
                re-import the file to refresh it. Nothing in the app edits, adds or deletes an
                airport.
              </p>
              <p className="gs-tabular mt-2 text-[12px]" style={{ color: neutral }}>
                Current import: {DOC_META.importedAt} · {DOC_META.airports.toLocaleString("en-GB")}{" "}
                airports
              </p>
            </div>
            <div>
              <p style={labelStyle}>Map tiles</p>
              <p className="mt-2 max-w-[62ch] text-[14px] leading-[1.6]" style={{ color: ink }}>
                For the map set the key below in your environment file and keep attribution visible
                on every view of the map.
              </p>
              <pre
                className="mt-3 overflow-x-auto px-3 py-2 text-[12px] leading-[1.6]"
                style={{
                  fontFamily: mono,
                  color: ink,
                  border: `2px solid ${ink}`,
                  borderRadius: brand.radius,
                  margin: 0,
                }}
              >
                {`MAPTILER_KEY=<your-maptiler-api-key>`}
              </pre>
              <p className="mt-3 text-[12px] leading-[1.6]" style={{ color: neutral }}>
                Attribution string: &copy; MapTiler &copy; OpenStreetMap contributors · Airport
                data: OurAirports (public domain).
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
