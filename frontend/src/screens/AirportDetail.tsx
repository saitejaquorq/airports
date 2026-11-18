// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Badge, Table, THead, TBody, TR, TH, TD } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Check, ArrowLeft } = Icons;

const AIRPORT = {
  id: 26451,
  ident: "HKJK",
  icao_code: "HKJK",
  iata_code: "NBO",
  name: "Jomo Kenyatta International Airport",
  municipality: "Nairobi",
  iso_country: "KE",
  country_name: "Kenya",
  airport_type: "large_airport",
  latitude_deg: -1.31924,
  longitude_deg: 36.9278,
  imported_at: "12 Nov 2026",
};

const RECORD_ROWS = [
  { wf: "i-2-0-0", label: "ICAO code", value: AIRPORT.icao_code, code: true },
  { wf: "i-2-0-1", label: "IATA code", value: AIRPORT.iata_code, code: true },
  { wf: "i-2-0-2", label: "Ident", value: AIRPORT.ident, code: true, note: "Primary key in the dataset" },
  { wf: "i-2-0-3", label: "City", value: AIRPORT.municipality },
  { wf: "i-2-0-4", label: "Country", value: AIRPORT.country_name + " (" + AIRPORT.iso_country + ")" },
  { wf: "i-2-0-5", label: "Type", value: AIRPORT.airport_type, token: true },
  { wf: "i-2-0-6", label: "Latitude", value: AIRPORT.latitude_deg.toFixed(6), code: true, note: "WGS 84 decimal degrees" },
  { wf: "i-2-0-7", label: "Longitude", value: AIRPORT.longitude_deg.toFixed(6), code: true, note: "WGS 84 decimal degrees" },
  { wf: "i-2-0-8", label: "Imported", value: AIRPORT.imported_at, note: "Snapshot 2026.11" },
];

const PLOT_SPAN = 20; // degrees across the chart plate
const GRID_FRACTIONS = [0.2, 0.4, 0.6, 0.8];

function fmtLat(v) {
  const r = Math.round(v);
  return Math.abs(r) + "°" + (r >= 0 ? "N" : "S");
}
function fmtLon(v) {
  const r = Math.round(v);
  return Math.abs(r) + "°" + (r >= 0 ? "E" : "W");
}
function toDegMin(value, posSuffix, negSuffix, pad) {
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const min = (abs - deg) * 60;
  const degStr = String(deg).padStart(pad, "0");
  const minStr = (min < 10 ? "0" : "") + min.toFixed(1);
  return degStr + "°" + minStr + "′" + (value >= 0 ? posSuffix : negSuffix);
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const muted = brand.neutralColor;
  const accent = brand.accentColor;
  const hair = "rgba(17,17,17,0.14)";

  const [pending, setPending] = React.useState(null);
  const [confirmed, setConfirmed] = React.useState(null);

  React.useEffect(() => {
    if (!pending) return undefined;
    const timer = setTimeout(() => {
      setConfirmed(pending);
      setPending(null);
      navigate("route");
    }, 700);
    return () => clearTimeout(timer);
  }, [pending]);

  const busy = pending !== null;

  const labelCls = "text-[11px] uppercase tracking-[0.16em] font-bold";
  const plateStyle = { border: "2px solid " + ink, borderRadius: brand.radius };

  const W = 400;
  const H = 318;
  const cx = W / 2;
  const cy = H / 2;

  const statusLine = (role) => {
    if (pending === role) {
      return "Setting " + AIRPORT.icao_code + " as " + role + "…";
    }
    if (confirmed === role) {
      return AIRPORT.icao_code + " set as " + role + ". Opening the route planner.";
    }
    return null;
  };

  const roleButton = (role, wf, primary) => {
    const line = statusLine(role);
    const isPending = pending === role;
    const isDone = confirmed === role;
    return (
      <div data-wf={wf} className="col-span-12 md:col-span-4">
        <Button
          type="button"
          onClick={() => {
            setConfirmed(null);
            setPending(role);
          }}
          disabled={busy}
          aria-busy={isPending ? "true" : "false"}
          className="ap-btn w-full justify-center text-[13px] font-bold uppercase tracking-[0.14em] px-4 min-h-[48px] inline-flex items-center gap-2 transition-colors duration-150"
          style={{
            border: "2px solid " + ink,
            borderRadius: brand.radius,
            backgroundColor: primary ? (busy && !isPending ? "rgba(17,17,17,0.45)" : ink) : "transparent",
            color: primary ? brand.backgroundColor : busy && !isPending ? "rgba(17,17,17,0.45)" : ink,
            borderColor: primary ? ink : busy && !isPending ? "rgba(17,17,17,0.45)" : ink,
            opacity: busy && !isPending ? 0.65 : 1,
            fontFamily: brand.fontBody,
          }}
        >
          {isDone ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : isPending ? (
            <span className="ap-spin h-3.5 w-3.5 rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
          ) : null}
          <span>Set as route {role}</span>
        </Button>
        <p
          className="mt-2 text-[12px] leading-[1.5] min-h-[18px]"
          style={{ color: line ? (isDone ? accent : ink) : muted }}
        >
          {line || "Opens the route planner with " + AIRPORT.icao_code + " pre-filled as " + role + "."}
        </p>
      </div>
    );
  };

  return (
    <div
      className="w-full"
      style={{ backgroundColor: brand.backgroundColor, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{`
        .ap-scope *:focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
        .ap-btn:hover:not(:disabled) { filter: brightness(1.08); }
        .ap-link:hover { color: ${accent}; }
        @keyframes ap-spin { to { transform: rotate(360deg); } }
        .ap-spin { animation: ap-spin 0.7s linear infinite; }
        @keyframes ap-ping { 0% { r: 7; opacity: 0.9; } 70% { r: 19; opacity: 0; } 100% { r: 19; opacity: 0; } }
        .ap-ping { animation: ap-ping 2.6s ease-out infinite; }
        @keyframes ap-rise { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
        .ap-rise { animation: ap-rise 0.26s ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .ap-spin, .ap-ping, .ap-rise { animation: none !important; }
        }
      `}</style>

      <div className="ap-scope mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Row 1 */}
        <div className="grid grid-cols-12 gap-4">
          <div data-wf="b-0-0" className="col-span-12 sm:col-span-6 lg:col-span-3">
            <button
              type="button"
              onClick={() => navigate("search")}
              className="ap-link inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em] min-h-[44px] transition-colors duration-150"
              style={{ color: ink }}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              <span>Back to search</span>
            </button>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-12 gap-4 mt-1">
          <header data-wf="b-1-0" className="col-span-12 ap-rise">
            <p className={labelCls} style={{ color: muted }}>
              Airport directory / {AIRPORT.icao_code}
            </p>
            <h1
              className="mt-2 text-[30px] sm:text-[36px] leading-[1.08] font-bold tracking-[-0.025em]"
              style={{ fontFamily: brand.fontHeading, color: ink }}
            >
              {AIRPORT.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]" style={{ color: muted }}>
              <span
                className="inline-flex items-center px-2 py-[3px] text-[12px] font-bold tracking-[0.18em]"
                style={{ border: "2px solid " + ink, borderRadius: brand.radius, color: ink, fontVariantNumeric: "tabular-nums" }}
              >
                {AIRPORT.icao_code}
              </span>
              <span
                className="inline-flex items-center px-2 py-[3px] text-[12px] font-bold tracking-[0.18em]"
                style={{ border: "2px solid " + hair, borderRadius: brand.radius, color: ink }}
              >
                {AIRPORT.iata_code}
              </span>
              <span aria-hidden="true" style={{ color: hair }}>|</span>
              <span>
                {AIRPORT.municipality}, {AIRPORT.country_name}
              </span>
            </div>
          </header>
        </div>

        <div className="mt-6" style={{ borderTop: "2px solid " + ink }} />

        {/* Row 3 */}
        <div className="grid grid-cols-12 gap-6 mt-6 items-start">
          {/* b-2-0 Airport record */}
          <section data-wf="b-2-0" className="col-span-12 lg:col-span-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className={labelCls} style={{ color: ink, fontFamily: brand.fontHeading }}>
                Airport record
              </h2>
              <p className="text-[12px]" style={{ color: muted, fontVariantNumeric: "tabular-nums" }}>
                Source: OurAirports &middot; read-only
              </p>
            </div>

            <div className="mt-3" style={plateStyle}>
              <Table className="w-full text-left" style={{ fontVariantNumeric: "tabular-nums", borderCollapse: "collapse" }}>
                <THead>
                  <TR style={{ borderBottom: "2px solid " + ink }}>
                    <TH
                      scope="col"
                      className="px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-bold w-[40%]"
                      style={{ color: ink }}
                    >
                      Field
                    </TH>
                    <TH
                      scope="col"
                      className="px-4 py-2 text-[11px] uppercase tracking-[0.16em] font-bold"
                      style={{ color: ink }}
                    >
                      Value
                    </TH>
                  </TR>
                </THead>
                <TBody>
                  {RECORD_ROWS.map((row, i) => {
                    const missing = row.value === null || row.value === undefined || row.value === "";
                    return (
                      <TR
                        key={row.wf}
                        data-wf={row.wf}
                        style={{ borderTop: i === 0 ? "none" : "1px solid " + hair }}
                      >
                        <TH
                          scope="row"
                          className="px-4 py-[9px] align-top text-[13px] font-normal"
                          style={{ color: muted }}
                        >
                          {row.label}
                        </TH>
                        <TD className="px-4 py-[9px] align-top">
                          {missing ? (
                            <span className="text-[14px] italic" style={{ color: muted }}>
                              Not available
                            </span>
                          ) : row.token ? (
                            <Badge
                              className="inline-flex items-center px-2 py-[2px] text-[12px] font-bold tracking-[0.06em]"
                              style={{
                                border: "2px solid " + ink,
                                borderRadius: brand.radius,
                                backgroundColor: "transparent",
                                color: ink,
                              }}
                            >
                              {row.value}
                            </Badge>
                          ) : (
                            <span
                              className={
                                "text-[14px] " + (row.code ? "font-bold tracking-[0.08em]" : "font-medium")
                              }
                              style={{ color: ink }}
                            >
                              {row.value}
                            </span>
                          )}
                          {row.note ? (
                            <span className="block mt-[2px] text-[11px]" style={{ color: muted }}>
                              {row.note}
                            </span>
                          ) : null}
                        </TD>
                      </TR>
                    );
                  })}
                </TBody>
              </Table>
            </div>
          </section>

          {/* b-2-1 Location map */}
          <section data-wf="b-2-1" className="col-span-12 lg:col-span-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className={labelCls} style={{ color: ink, fontFamily: brand.fontHeading }}>
                Location map
              </h2>
              <p className="text-[12px]" style={{ color: muted }}>
                Static plot
              </p>
            </div>

            <figure className="mt-3" style={plateStyle}>
              <div
                className="flex items-center justify-between px-3 py-2"
                style={{ borderBottom: "2px solid " + ink }}
              >
                <span className="text-[12px] font-bold tracking-[0.18em]" style={{ color: ink }}>
                  {AIRPORT.ident}
                </span>
                <span className="text-[12px]" style={{ color: ink, fontVariantNumeric: "tabular-nums" }}>
                  {toDegMin(AIRPORT.latitude_deg, "N", "S", 2)} {toDegMin(AIRPORT.longitude_deg, "E", "W", 3)}
                </span>
              </div>

              <svg
                viewBox={"0 0 " + W + " " + H}
                className="block w-full h-auto"
                role="img"
                aria-label={
                  "Coordinate plot of " +
                  AIRPORT.name +
                  " at latitude " +
                  AIRPORT.latitude_deg.toFixed(6) +
                  ", longitude " +
                  AIRPORT.longitude_deg.toFixed(6) +
                  ", shown on a graticule spanning ten degrees in each direction."
                }
              >
                <rect x="0" y="0" width={W} height={H} fill={brand.backgroundColor} />
                {GRID_FRACTIONS.map((f) => (
                  <line key={"v" + f} x1={f * W} y1="0" x2={f * W} y2={H} stroke={hair} strokeWidth="1" />
                ))}
                {GRID_FRACTIONS.map((f) => (
                  <line key={"h" + f} x1="0" y1={f * H} x2={W} y2={f * H} stroke={hair} strokeWidth="1" />
                ))}
                {GRID_FRACTIONS.map((f) => (
                  <text
                    key={"vl" + f}
                    x={f * W + 4}
                    y={H - 8}
                    fontSize="9"
                    fill={muted}
                    fontFamily={brand.fontBody}
                    letterSpacing="0.06em"
                  >
                    {fmtLon(AIRPORT.longitude_deg + (f - 0.5) * PLOT_SPAN)}
                  </text>
                ))}
                {GRID_FRACTIONS.map((f) => (
                  <text
                    key={"hl" + f}
                    x="7"
                    y={f * H - 5}
                    fontSize="9"
                    fill={muted}
                    fontFamily={brand.fontBody}
                    letterSpacing="0.06em"
                  >
                    {fmtLat(AIRPORT.latitude_deg - (f - 0.5) * PLOT_SPAN)}
                  </text>
                ))}

                {/* crosshair */}
                <line x1="0" y1={cy} x2={W} y2={cy} stroke={accent} strokeWidth="1" strokeDasharray="5 4" opacity="0.55" />
                <line x1={cx} y1="0" x2={cx} y2={H} stroke={accent} strokeWidth="1" strokeDasharray="5 4" opacity="0.55" />
                <circle className="ap-ping" cx={cx} cy={cy} r="7" fill="none" stroke={accent} strokeWidth="2" />
                <circle cx={cx} cy={cy} r="7" fill="none" stroke={accent} strokeWidth="2" />
                <circle cx={cx} cy={cy} r="2.5" fill={accent} />
                <text
                  x={cx + 13}
                  y={cy - 10}
                  fontSize="12"
                  fontWeight="700"
                  fill={ink}
                  fontFamily={brand.fontHeading}
                  letterSpacing="0.1em"
                >
                  {AIRPORT.icao_code}
                </text>
                <text x={cx + 13} y={cy + 4} fontSize="9" fill={muted} fontFamily={brand.fontBody}>
                  {AIRPORT.municipality}
                </text>

                {/* corner ticks */}
                <path d={"M0 18 L0 0 L18 0"} fill="none" stroke={ink} strokeWidth="2" />
                <path d={"M" + (W - 18) + " 0 L" + W + " 0 L" + W + " 18"} fill="none" stroke={ink} strokeWidth="2" />
                <path d={"M0 " + (H - 18) + " L0 " + H + " L18 " + H} fill="none" stroke={ink} strokeWidth="2" />
                <path
                  d={"M" + (W - 18) + " " + H + " L" + W + " " + H + " L" + W + " " + (H - 18)}
                  fill="none"
                  stroke={ink}
                  strokeWidth="2"
                />
              </svg>

              <figcaption
                className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-[11px] uppercase tracking-[0.14em]"
                style={{ borderTop: "2px solid " + ink, color: muted }}
              >
                <span style={{ fontVariantNumeric: "tabular-nums" }}>Span &plusmn;10&deg; &middot; equirectangular</span>
                <span>Positions: OurAirports</span>
              </figcaption>
            </figure>
            <p className="mt-2 text-[12px] leading-[1.5]" style={{ color: muted }}>
              Pannable tiles and the great-circle line live on the route planner.
            </p>
          </section>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-12 gap-4 mt-8">
          <p
            data-wf="b-3-0"
            className="col-span-12 text-[13px] leading-[1.6] max-w-[72ch] pl-4"
            style={{ color: muted, borderLeft: "2px solid " + accent }}
          >
            Read-only entry from the bundled OurAirports dataset; no edit, add or delete controls. Airports with no IATA
            code show &ldquo;Not available&rdquo;.
          </p>
        </div>

        <div className="mt-8" style={{ borderTop: "2px solid " + ink }} />

        {/* Row 5 */}
        <div className="grid grid-cols-12 gap-4 mt-6">
          {roleButton("origin", "b-4-0", true)}
          {roleButton("destination", "b-4-1", false)}
        </div>

        <p aria-live="polite" className="sr-only">
          {statusLine("origin") || statusLine("destination") || ""}
        </p>
      </div>
    </div>
  );
}
