// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

const { Label, Select } = UI;

const { Search } = Icons;

const PRODUCT = "airports";
const SCREEN = "Airport Search";
const DATASET_NOTE = "OurAirports bundled dataset · imported 02 Nov 2026 · free to use, no account";
const mix = (colour, percent) => `color-mix(in srgb, ${colour} ${percent}%, transparent)`;

const AIRPORTS = [
  {
    id: 2434,
    ident: "HKJK",
    icao_code: "HKJK",
    iata_code: "NBO",
    name: "Jomo Kenyatta International Airport",
    municipality: "Nairobi",
    iso_country: "KE",
    country_name: "Kenya",
    airport_type: "large_airport",
    latitude_deg: -1.319167,
    longitude_deg: 36.927502,
  },
  {
    id: 2440,
    ident: "HKNW",
    icao_code: "HKNW",
    iata_code: "WIL",
    name: "Nairobi Wilson Airport",
    municipality: "Nairobi",
    iso_country: "KE",
    country_name: "Kenya",
    airport_type: "medium_airport",
    latitude_deg: -1.32172,
    longitude_deg: 36.8148,
  },
  {
    id: 2447,
    ident: "HKRE",
    icao_code: "HKRE",
    iata_code: "",
    name: "Moi Air Base",
    municipality: "Nairobi",
    iso_country: "KE",
    country_name: "Kenya",
    airport_type: "medium_airport",
    latitude_deg: -1.32389,
    longitude_deg: 36.862202,
  },
  {
    id: 2437,
    ident: "HKMO",
    icao_code: "HKMO",
    iata_code: "MBA",
    name: "Moi International Airport",
    municipality: "Mombasa",
    iso_country: "KE",
    country_name: "Kenya",
    airport_type: "large_airport",
    latitude_deg: -4.03483,
    longitude_deg: 39.5942,
  },
  {
    id: 2428,
    ident: "HKEL",
    icao_code: "HKEL",
    iata_code: "EDL",
    name: "Eldoret International Airport",
    municipality: "Eldoret",
    iso_country: "KE",
    country_name: "Kenya",
    airport_type: "medium_airport",
    latitude_deg: 0.404458,
    longitude_deg: 35.238899,
  },
  {
    id: 2435,
    ident: "HKKI",
    icao_code: "HKKI",
    iata_code: "KIS",
    name: "Kisumu Airport",
    municipality: "Kisumu",
    iso_country: "KE",
    country_name: "Kenya",
    airport_type: "medium_airport",
    latitude_deg: -0.086139,
    longitude_deg: 34.728901,
  },
  {
    id: 2611,
    ident: "HTDA",
    icao_code: "HTDA",
    iata_code: "DAR",
    name: "Julius Nyerere International Airport",
    municipality: "Dar es Salaam",
    iso_country: "TZ",
    country_name: "Tanzania",
    airport_type: "large_airport",
    latitude_deg: -6.87811,
    longitude_deg: 39.202599,
  },
  {
    id: 2654,
    ident: "HUEN",
    icao_code: "HUEN",
    iata_code: "EBB",
    name: "Entebbe International Airport",
    municipality: "Entebbe",
    iso_country: "UG",
    country_name: "Uganda",
    airport_type: "large_airport",
    latitude_deg: 0.042386,
    longitude_deg: 32.443501,
  },
  {
    id: 2322,
    ident: "HAAB",
    icao_code: "HAAB",
    iata_code: "ADD",
    name: "Addis Ababa Bole International Airport",
    municipality: "Addis Ababa",
    iso_country: "ET",
    country_name: "Ethiopia",
    airport_type: "large_airport",
    latitude_deg: 8.97789,
    longitude_deg: 38.799301,
  },
  {
    id: 2177,
    ident: "FACT",
    icao_code: "FACT",
    iata_code: "CPT",
    name: "Cape Town International Airport",
    municipality: "Cape Town",
    iso_country: "ZA",
    country_name: "South Africa",
    airport_type: "large_airport",
    latitude_deg: -33.964802,
    longitude_deg: 18.6017,
  },
  {
    id: 2434,
    ident: "EGLL",
    icao_code: "EGLL",
    iata_code: "LHR",
    name: "London Heathrow Airport",
    municipality: "London",
    iso_country: "GB",
    country_name: "United Kingdom",
    airport_type: "large_airport",
    latitude_deg: 51.4706,
    longitude_deg: -0.461941,
  },
  {
    id: 3697,
    ident: "KJFK",
    icao_code: "KJFK",
    iata_code: "JFK",
    name: "John F Kennedy International Airport",
    municipality: "New York",
    iso_country: "US",
    country_name: "United States",
    airport_type: "large_airport",
    latitude_deg: 40.639801,
    longitude_deg: -73.7789,
  },
  {
    id: 2188,
    ident: "OMDB",
    icao_code: "OMDB",
    iata_code: "DXB",
    name: "Dubai International Airport",
    municipality: "Dubai",
    iso_country: "AE",
    country_name: "United Arab Emirates",
    airport_type: "large_airport",
    latitude_deg: 25.2528,
    longitude_deg: 55.364399,
  },
  {
    id: 1382,
    ident: "LFPG",
    icao_code: "LFPG",
    iata_code: "CDG",
    name: "Charles de Gaulle International Airport",
    municipality: "Paris",
    iso_country: "FR",
    country_name: "France",
    airport_type: "large_airport",
    latitude_deg: 49.012798,
    longitude_deg: 2.55,
  },
  {
    id: 2513,
    ident: "EHAM",
    icao_code: "EHAM",
    iata_code: "AMS",
    name: "Amsterdam Airport Schiphol",
    municipality: "Amsterdam",
    iso_country: "NL",
    country_name: "Netherlands",
    airport_type: "large_airport",
    latitude_deg: 52.308601,
    longitude_deg: 4.76389,
  },
  {
    id: 3098,
    ident: "RJTT",
    icao_code: "RJTT",
    iata_code: "HND",
    name: "Tokyo Haneda International Airport",
    municipality: "Tokyo",
    iso_country: "JP",
    country_name: "Japan",
    airport_type: "large_airport",
    latitude_deg: 35.552299,
    longitude_deg: 139.779999,
  },
  {
    id: 3361,
    ident: "VIDP",
    icao_code: "VIDP",
    iata_code: "DEL",
    name: "Indira Gandhi International Airport",
    municipality: "New Delhi",
    iso_country: "IN",
    country_name: "India",
    airport_type: "large_airport",
    latitude_deg: 28.5665,
    longitude_deg: 77.103104,
  },
  {
    id: 2593,
    ident: "YSSY",
    icao_code: "YSSY",
    iata_code: "SYD",
    name: "Sydney Kingsford Smith International Airport",
    municipality: "Sydney",
    iso_country: "AU",
    country_name: "Australia",
    airport_type: "large_airport",
    latitude_deg: -33.946098,
    longitude_deg: 151.177002,
  },
  {
    id: 2560,
    ident: "SBGR",
    icao_code: "SBGR",
    iata_code: "GRU",
    name: "Guarulhos Governador André Franco Montoro International Airport",
    municipality: "São Paulo",
    iso_country: "BR",
    country_name: "Brazil",
    airport_type: "large_airport",
    latitude_deg: -23.435556,
    longitude_deg: -46.473056,
  },
  {
    id: 1091,
    ident: "CYYZ",
    icao_code: "CYYZ",
    iata_code: "YYZ",
    name: "Toronto Lester B. Pearson International Airport",
    municipality: "Toronto",
    iso_country: "CA",
    country_name: "Canada",
    airport_type: "large_airport",
    latitude_deg: 43.6772,
    longitude_deg: -79.6306,
  },
];

const TYPE_LABEL = {
  large_airport: "Large airport",
  medium_airport: "Medium airport",
  small_airport: "Small airport",
  heliport: "Heliport",
};

const matches = (a, q) =>
  [a.icao_code, a.iata_code, a.name, a.municipality, a.country_name, a.iso_country]
    .join(" ")
    .toLowerCase()
    .includes(q.toLowerCase());

export default function Screen() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState("nairobi");
  const [submitted, setSubmitted] = React.useState("nairobi");
  const [status, setStatus] = React.useState("results"); // results | searching | error

  const rule = `2px solid ${brand.primaryColor}`;
  const hair = `1px solid ${mix(brand.primaryColor, 16)}`;

  React.useEffect(() => {
    if (status !== "searching") return undefined;
    const t = setTimeout(() => setStatus("results"), 420);
    return () => clearTimeout(t);
  }, [status, submitted]);

  const results = React.useMemo(
    () => (submitted ? AIRPORTS.filter((a) => matches(a, submitted)) : []),
    [submitted],
  );

  const runSearch = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) {
      setStatus("error");
      return;
    }
    setSubmitted(q);
    setStatus("searching");
  };

  const showResults = status === "results" && results.length > 0;
  const showEmpty = status === "results" && results.length === 0;

  return (
    <div className="bg-white" style={{ color: brand.primaryColor, fontFamily: brand.fontBody }}>
      <style>{`
        .obs-focus:focus-visible { outline: 2px solid ${brand.accentColor}; outline-offset: 2px; }
        @keyframes obsRowIn { from { opacity: 0; transform: translateY(-2px); } to { opacity: 1; transform: none; } }
        .obs-row { animation: obsRowIn 180ms ease-out both; }
        @keyframes obsPulse { 0%, 100% { opacity: 0.22; } 50% { opacity: 0.08; } }
        .obs-skeleton { animation: obsPulse 1.1s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .obs-row, .obs-skeleton { animation: none; }
        }
      `}</style>

      <div
        data-wf="b-0-0"
        className="flex flex-wrap items-end justify-between gap-3 pb-4"
        style={{ borderBottom: rule }}
      >
        <div>
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: brand.neutralColor }}
          >
            {PRODUCT}
          </p>
          <h1
            className="mt-1 text-3xl font-bold tracking-tight"
            style={{ fontFamily: brand.fontHeading }}
          >
            {SCREEN}
          </h1>
        </div>
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.12em] tabular-nums"
          style={{ color: brand.neutralColor }}
        >
          {DATASET_NOTE}
        </p>
      </div>

      <form onSubmit={runSearch} className="grid grid-cols-1 gap-4 py-4 md:grid-cols-12">
        <div className="md:col-span-9">
          <Label
            htmlFor="airport-query"
            className="mb-1 block text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ color: brand.neutralColor }}
          >
            Search the worldwide directory
          </Label>
          <div
            className="flex items-center gap-2 bg-white px-3"
            style={{ border: rule, borderRadius: brand.radius, height: 44 }}
          >
            <Icons.Search className="h-4 w-4 shrink-0" aria-hidden="true" />
            <input
              data-wf="b-1-0"
              id="airport-query"
              name="q"
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (status === "error") setStatus("results");
              }}
              placeholder="Search by ICAO, IATA, name, city or country"
              aria-invalid={status === "error"}
              aria-describedby={status === "error" ? "airport-query-error" : "airport-query-hint"}
              className="obs-focus h-full w-full bg-white text-sm outline-none"
            />
          </div>
          {status === "error" ? (
            <p
              id="airport-query-error"
              role="alert"
              className="mt-2 flex items-center gap-2 text-xs font-bold"
              style={{ color: brand.accentColor }}
            >
              <Icons.AlertCircle className="h-4 w-4" aria-hidden="true" />
              The search box is empty. Type an ICAO or IATA code, an airport name, a city or a
              country.
            </p>
          ) : (
            <p
              id="airport-query-hint"
              className="mt-2 text-xs"
              style={{ color: brand.neutralColor }}
            >
              Four letters match ICAO (HKJK), three letters match IATA (NBO). Everything else
              matches name, city and country.
            </p>
          )}
        </div>
        <div className="flex items-end md:col-span-3">
          <button
            data-wf="b-1-1"
            type="submit"
            disabled={status === "searching"}
            className="obs-focus w-full text-xs font-bold uppercase tracking-[0.14em] text-white transition-opacity disabled:opacity-40"
            style={{ backgroundColor: brand.primaryColor, borderRadius: brand.radius, height: 44 }}
          >
            {status === "searching" ? "Searching…" : "Search"}
          </button>
        </div>
      </form>

      <p data-wf="b-2-0" className="pb-4 text-sm tabular-nums" aria-live="polite">
        {status === "searching" ? (
          <span style={{ color: brand.neutralColor }}>
            Matching “{submitted}” against {AIRPORTS.length.toLocaleString()} bundled airports…
          </span>
        ) : showEmpty ? (
          <span style={{ color: brand.neutralColor }}>0 airports match “{submitted}”.</span>
        ) : (
          <span>
            <strong className="font-bold">{results.length}</strong> airport
            {results.length === 1 ? "" : "s"} match “{submitted}”. Select a result to open its
            details or send it to the route planner.
          </span>
        )}
      </p>

      <h2
        data-wf="b-3-0"
        className="pb-2 text-[11px] font-bold uppercase tracking-[0.18em]"
        style={{ color: brand.neutralColor }}
      >
        Matching airports
      </h2>
      <table
        className="w-full text-[13px]"
        style={{ borderTop: rule, fontVariantNumeric: "tabular-nums" }}
      >
        <caption className="sr-only">
          Matching airports from the bundled OurAirports dataset. Select a row to open its details.
        </caption>
        <thead>
          <tr
            className="text-left text-[11px] uppercase tracking-[0.14em]"
            style={{ borderBottom: rule, color: brand.neutralColor }}
          >
            <th data-wf="i-3-0-0" scope="col" className="py-2 font-bold">
              Name
            </th>
            <th data-wf="i-3-0-1" scope="col" className="py-2 font-bold">
              ICAO
            </th>
            <th data-wf="i-3-0-2" scope="col" className="py-2 font-bold">
              IATA
            </th>
            <th data-wf="i-3-0-3" scope="col" className="py-2 font-bold">
              City
            </th>
            <th data-wf="i-3-0-4" scope="col" className="py-2 font-bold">
              Country
            </th>
            <th data-wf="i-3-0-5" scope="col" className="py-2 font-bold">
              Type
            </th>
          </tr>
        </thead>
        <tbody>
          {status === "searching"
            ? [0, 1, 2, 3].map((i) => (
                <tr key={`sk-${i}`} style={{ borderBottom: hair }}>
                  <td colSpan={6} className="py-3">
                    <span
                      className="obs-skeleton block h-3 w-full"
                      style={{ backgroundColor: brand.primaryColor }}
                    />
                  </td>
                </tr>
              ))
            : showResults
              ? results.map((a) => (
                  <tr
                    key={a.ident}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open details for ${a.name}, ${a.icao_code}`}
                    className="obs-row obs-focus cursor-pointer hover:bg-black/[0.03]"
                    onClick={() => navigate("airport-detail")}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate("airport-detail");
                      }
                    }}
                    style={{ borderBottom: hair }}
                  >
                    <td className="py-2 font-semibold">{a.name}</td>
                    <td className="py-2 font-semibold tracking-wider tabular-nums">
                      {a.icao_code}
                    </td>
                    <td
                      className="py-2 tracking-wider tabular-nums"
                      style={{ color: a.iata_code ? undefined : brand.neutralColor }}
                    >
                      {a.iata_code || "—"}
                    </td>
                    <td className="py-2">{a.municipality}</td>
                    <td className="py-2">
                      {a.country_name}{" "}
                      <span className="tabular-nums" style={{ color: brand.neutralColor }}>
                        {a.iso_country}
                      </span>
                    </td>
                    <td className="py-2 text-[11px] font-bold uppercase tracking-wider">
                      {TYPE_LABEL[a.airport_type] || a.airport_type}
                    </td>
                  </tr>
                ))
              : null}
        </tbody>
      </table>

      {showResults ? (
        <div className="flex flex-col gap-3 pt-4 md:flex-row md:items-center">
          <button
            data-wf="b-4-0"
            type="button"
            onClick={() => navigate("route")}
            className="obs-focus flex items-center justify-center gap-2 px-4 text-xs font-bold uppercase tracking-[0.14em] text-white transition-opacity md:w-5/12"
            style={{ backgroundColor: brand.primaryColor, borderRadius: brand.radius, height: 44 }}
          >
            Use selected airport in route planner
            <Icons.ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <p className="text-xs tabular-nums" style={{ color: brand.neutralColor }}>
            Opens the route planner, where you set the origin and destination and plot the
            great-circle path.
          </p>
        </div>
      ) : null}

      {showEmpty ? (
        <div
          data-wf="b-5-0"
          className="mt-6 px-6 py-10 text-center"
          style={{ border: rule, borderRadius: brand.radius }}
        >
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em]"
            style={{ color: brand.accentColor }}
          >
            No match in the dataset
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm font-semibold">
            No airports match “{submitted}”. Try another code, airport name, city or country.
          </p>
          <p className="mx-auto mt-2 max-w-md text-xs" style={{ color: brand.neutralColor }}>
            Example searches: HKJK, NBO, Entebbe, Kenya.
          </p>
        </div>
      ) : null}
    </div>
  );
}
