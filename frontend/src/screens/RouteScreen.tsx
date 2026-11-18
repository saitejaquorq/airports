// @ts-nocheck -- generated from the approved design under its JS runtime contract; not hand-written TypeScript.
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import * as UI from "@/lib/ui";
import { Icons } from "@/lib/icons";
import { brand } from "@/lib/brand";
import { useNavigate } from "@/lib/navigate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Button, Input, Label, Badge, TR, TH } = UI;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { Search, X, Clock, ArrowLeft, ArrowRight, AlertCircle, CheckCircle } = Icons;

const AIRPORTS = [
  { id: 1, ident: 'HKJK', icao_code: 'HKJK', iata_code: 'NBO', name: 'Jomo Kenyatta International Airport', municipality: 'Nairobi', iso_country: 'KE', country_name: 'Kenya', airport_type: 'large_airport', latitude_deg: -1.3192, longitude_deg: 36.9278, imported_at: '2026-11-03' },
  { id: 2, ident: 'EGLL', icao_code: 'EGLL', iata_code: 'LHR', name: 'London Heathrow Airport', municipality: 'London', iso_country: 'GB', country_name: 'United Kingdom', airport_type: 'large_airport', latitude_deg: 51.4706, longitude_deg: -0.4619, imported_at: '2026-11-03' },
  { id: 3, ident: 'EGKK', icao_code: 'EGKK', iata_code: 'LGW', name: 'London Gatwick Airport', municipality: 'London', iso_country: 'GB', country_name: 'United Kingdom', airport_type: 'large_airport', latitude_deg: 51.1481, longitude_deg: -0.1903, imported_at: '2026-11-03' },
  { id: 4, ident: 'KJFK', icao_code: 'KJFK', iata_code: 'JFK', name: 'John F. Kennedy International Airport', municipality: 'New York', iso_country: 'US', country_name: 'United States', airport_type: 'large_airport', latitude_deg: 40.6398, longitude_deg: -73.7789, imported_at: '2026-11-03' },
  { id: 5, ident: 'KLAX', icao_code: 'KLAX', iata_code: 'LAX', name: 'Los Angeles International Airport', municipality: 'Los Angeles', iso_country: 'US', country_name: 'United States', airport_type: 'large_airport', latitude_deg: 33.9425, longitude_deg: -118.4081, imported_at: '2026-11-03' },
  { id: 6, ident: 'KORD', icao_code: 'KORD', iata_code: 'ORD', name: "Chicago O'Hare International Airport", municipality: 'Chicago', iso_country: 'US', country_name: 'United States', airport_type: 'large_airport', latitude_deg: 41.9786, longitude_deg: -87.9048, imported_at: '2026-11-03' },
  { id: 7, ident: 'LFPG', icao_code: 'LFPG', iata_code: 'CDG', name: 'Paris Charles de Gaulle Airport', municipality: 'Paris', iso_country: 'FR', country_name: 'France', airport_type: 'large_airport', latitude_deg: 49.0128, longitude_deg: 2.5500, imported_at: '2026-11-03' },
  { id: 8, ident: 'EDDF', icao_code: 'EDDF', iata_code: 'FRA', name: 'Frankfurt am Main Airport', municipality: 'Frankfurt', iso_country: 'DE', country_name: 'Germany', airport_type: 'large_airport', latitude_deg: 50.0333, longitude_deg: 8.5706, imported_at: '2026-11-03' },
  { id: 9, ident: 'EHAM', icao_code: 'EHAM', iata_code: 'AMS', name: 'Amsterdam Airport Schiphol', municipality: 'Amsterdam', iso_country: 'NL', country_name: 'Netherlands', airport_type: 'large_airport', latitude_deg: 52.3086, longitude_deg: 4.7639, imported_at: '2026-11-03' },
  { id: 10, ident: 'LEMD', icao_code: 'LEMD', iata_code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', municipality: 'Madrid', iso_country: 'ES', country_name: 'Spain', airport_type: 'large_airport', latitude_deg: 40.4719, longitude_deg: -3.5626, imported_at: '2026-11-03' },
  { id: 11, ident: 'LTFM', icao_code: 'LTFM', iata_code: 'IST', name: 'Istanbul Airport', municipality: 'Istanbul', iso_country: 'TR', country_name: 'Türkiye', airport_type: 'large_airport', latitude_deg: 41.2753, longitude_deg: 28.7519, imported_at: '2026-11-03' },
  { id: 12, ident: 'OMDB', icao_code: 'OMDB', iata_code: 'DXB', name: 'Dubai International Airport', municipality: 'Dubai', iso_country: 'AE', country_name: 'United Arab Emirates', airport_type: 'large_airport', latitude_deg: 25.2528, longitude_deg: 55.3644, imported_at: '2026-11-03' },
  { id: 13, ident: 'OTHH', icao_code: 'OTHH', iata_code: 'DOH', name: 'Hamad International Airport', municipality: 'Doha', iso_country: 'QA', country_name: 'Qatar', airport_type: 'large_airport', latitude_deg: 25.2731, longitude_deg: 51.6081, imported_at: '2026-11-03' },
  { id: 14, ident: 'VIDP', icao_code: 'VIDP', iata_code: 'DEL', name: 'Indira Gandhi International Airport', municipality: 'New Delhi', iso_country: 'IN', country_name: 'India', airport_type: 'large_airport', latitude_deg: 28.5665, longitude_deg: 77.1031, imported_at: '2026-11-03' },
  { id: 15, ident: 'VHHH', icao_code: 'VHHH', iata_code: 'HKG', name: 'Hong Kong International Airport', municipality: 'Hong Kong', iso_country: 'HK', country_name: 'Hong Kong', airport_type: 'large_airport', latitude_deg: 22.3089, longitude_deg: 113.9145, imported_at: '2026-11-03' },
  { id: 16, ident: 'RJTT', icao_code: 'RJTT', iata_code: 'HND', name: 'Tokyo Haneda Airport', municipality: 'Tokyo', iso_country: 'JP', country_name: 'Japan', airport_type: 'large_airport', latitude_deg: 35.5523, longitude_deg: 139.7798, imported_at: '2026-11-03' },
  { id: 17, ident: 'WSSS', icao_code: 'WSSS', iata_code: 'SIN', name: 'Singapore Changi Airport', municipality: 'Singapore', iso_country: 'SG', country_name: 'Singapore', airport_type: 'large_airport', latitude_deg: 1.3502, longitude_deg: 103.9944, imported_at: '2026-11-03' },
  { id: 18, ident: 'YSSY', icao_code: 'YSSY', iata_code: 'SYD', name: 'Sydney Kingsford Smith Airport', municipality: 'Sydney', iso_country: 'AU', country_name: 'Australia', airport_type: 'large_airport', latitude_deg: -33.9461, longitude_deg: 151.1772, imported_at: '2026-11-03' },
  { id: 19, ident: 'NZAA', icao_code: 'NZAA', iata_code: 'AKL', name: 'Auckland Airport', municipality: 'Auckland', iso_country: 'NZ', country_name: 'New Zealand', airport_type: 'large_airport', latitude_deg: -37.0081, longitude_deg: 174.7917, imported_at: '2026-11-03' },
  { id: 20, ident: 'FAOR', icao_code: 'FAOR', iata_code: 'JNB', name: 'O. R. Tambo International Airport', municipality: 'Johannesburg', iso_country: 'ZA', country_name: 'South Africa', airport_type: 'large_airport', latitude_deg: -26.1392, longitude_deg: 28.2460, imported_at: '2026-11-03' },
  { id: 21, ident: 'HECA', icao_code: 'HECA', iata_code: 'CAI', name: 'Cairo International Airport', municipality: 'Cairo', iso_country: 'EG', country_name: 'Egypt', airport_type: 'large_airport', latitude_deg: 30.1219, longitude_deg: 31.4056, imported_at: '2026-11-03' },
  { id: 22, ident: 'SBGR', icao_code: 'SBGR', iata_code: 'GRU', name: 'São Paulo/Guarulhos International Airport', municipality: 'São Paulo', iso_country: 'BR', country_name: 'Brazil', airport_type: 'large_airport', latitude_deg: -23.4356, longitude_deg: -46.4731, imported_at: '2026-11-03' },
  { id: 23, ident: 'SAEZ', icao_code: 'SAEZ', iata_code: 'EZE', name: 'Ministro Pistarini International Airport', municipality: 'Buenos Aires', iso_country: 'AR', country_name: 'Argentina', airport_type: 'large_airport', latitude_deg: -34.8222, longitude_deg: -58.5358, imported_at: '2026-11-03' },
  { id: 24, ident: 'CYYZ', icao_code: 'CYYZ', iata_code: 'YYZ', name: 'Toronto Pearson International Airport', municipality: 'Toronto', iso_country: 'CA', country_name: 'Canada', airport_type: 'large_airport', latitude_deg: 43.6772, longitude_deg: -79.6306, imported_at: '2026-11-03' },
  { id: 25, ident: 'UUEE', icao_code: 'UUEE', iata_code: 'SVO', name: 'Sheremetyevo International Airport', municipality: 'Moscow', iso_country: 'RU', country_name: 'Russia', airport_type: 'large_airport', latitude_deg: 55.9726, longitude_deg: 37.4146, imported_at: '2026-11-03' },
  { id: 26, ident: 'BIKF', icao_code: 'BIKF', iata_code: 'KEF', name: 'Keflavík International Airport', municipality: 'Reykjavík', iso_country: 'IS', country_name: 'Iceland', airport_type: 'large_airport', latitude_deg: 63.9850, longitude_deg: -22.6056, imported_at: '2026-11-03' },
  { id: 27, ident: 'PANC', icao_code: 'PANC', iata_code: 'ANC', name: 'Ted Stevens Anchorage International Airport', municipality: 'Anchorage', iso_country: 'US', country_name: 'United States', airport_type: 'large_airport', latitude_deg: 61.1744, longitude_deg: -149.9961, imported_at: '2026-11-03' },
  { id: 28, ident: 'MMMX', icao_code: 'MMMX', iata_code: 'MEX', name: 'Mexico City International Airport', municipality: 'Mexico City', iso_country: 'MX', country_name: 'Mexico', airport_type: 'large_airport', latitude_deg: 19.4363, longitude_deg: -99.0721, imported_at: '2026-11-03' },
  { id: 29, ident: 'VTBS', icao_code: 'VTBS', iata_code: 'BKK', name: 'Suvarnabhumi Airport', municipality: 'Bangkok', iso_country: 'TH', country_name: 'Thailand', airport_type: 'large_airport', latitude_deg: 13.6811, longitude_deg: 100.7470, imported_at: '2026-11-03' },
  { id: 30, ident: 'ZBAA', icao_code: 'ZBAA', iata_code: 'PEK', name: 'Beijing Capital International Airport', municipality: 'Beijing', iso_country: 'CN', country_name: 'China', airport_type: 'large_airport', latitude_deg: 40.0801, longitude_deg: 116.5846, imported_at: '2026-11-03' },
  { id: 31, ident: 'LSZG', icao_code: 'LSZG', iata_code: null, name: 'Grenchen Airport', municipality: 'Grenchen', iso_country: 'CH', country_name: 'Switzerland', airport_type: 'medium_airport', latitude_deg: 47.1816, longitude_deg: 7.4172, imported_at: '2026-11-03' },
  { id: 32, ident: 'HKNW', icao_code: 'HKNW', iata_code: 'WIL', name: 'Nairobi Wilson Airport', municipality: 'Nairobi', iso_country: 'KE', country_name: 'Kenya', airport_type: 'medium_airport', latitude_deg: -1.3217, longitude_deg: 36.8148, imported_at: '2026-11-03' }
];

const DATASET = { source: 'OurAirports', imported_label: '3 Nov 2026', records: '83,142' };

const LAND = [
  [[-168,65],[-160,71],[-140,70],[-128,70],[-110,68],[-95,72],[-85,70],[-80,63],[-64,60],[-55,52],[-66,45],[-70,43],[-75,35],[-81,25],[-97,26],[-105,20],[-115,30],[-125,40],[-124,48],[-135,57],[-150,59],[-165,55]],
  [[-45,60],[-50,70],[-45,80],[-25,82],[-20,75],[-25,68],[-40,60]],
  [[-92,15],[-83,9],[-77,8],[-72,12],[-61,10],[-50,0],[-44,-3],[-35,-5],[-38,-13],[-48,-25],[-54,-34],[-58,-39],[-62,-41],[-65,-45],[-69,-52],[-75,-50],[-73,-42],[-71,-30],[-75,-15],[-81,-5],[-79,2],[-83,8]],
  [[-10,37],[-9,44],[-1,46],[1,51],[8,54],[11,58],[15,66],[21,70],[30,70],[40,66],[40,55],[35,45],[28,41],[20,40],[15,38],[12,45],[5,43],[-2,43]],
  [[-17,15],[-16,21],[-10,28],[0,32],[10,34],[20,32],[32,31],[35,24],[39,15],[43,11],[51,12],[49,5],[41,-2],[40,-10],[35,-18],[33,-26],[27,-34],[20,-35],[15,-23],[12,-15],[9,-1],[4,4],[-6,4],[-13,8]],
  [[40,66],[60,70],[75,73],[100,77],[115,73],[130,72],[145,70],[160,68],[170,66],[178,65],[160,60],[155,52],[140,45],[130,42],[127,35],[120,30],[110,20],[100,10],[95,15],[90,22],[80,8],[70,20],[62,25],[57,25],[50,30],[45,40],[40,45],[40,55]],
  [[113,-22],[114,-34],[120,-34],[129,-32],[137,-35],[145,-38],[150,-37],[153,-28],[146,-19],[142,-11],[132,-12],[125,-14],[117,-20]],
  [[95,5],[105,0],[115,-3],[125,-5],[135,-3],[140,-6],[130,-8],[120,-9],[110,-7],[100,0]],
  [[172,-34],[178,-37],[175,-41],[170,-44],[166,-46],[167,-44],[171,-41]],
  [[-5,50],[-6,54],[-5,58],[-3,58],[-1,55],[1,53],[0,51]],
  [[129,33],[135,34],[140,36],[142,40],[145,43],[141,45],[138,37],[132,35]],
  [[43,-12],[50,-15],[48,-25],[44,-20]],
  [[-24,65],[-18,66],[-14,65],[-18,63],[-22,64]],
  [[-180,-70],[-150,-75],[-100,-73],[-60,-65],[-20,-70],[20,-70],[60,-67],[100,-66],[140,-66],[180,-70],[180,-85],[-180,-85]]
];

const EARTH_R_KM = 6371.0088;
const NM_PER_KM = 1 / 1.852;

const toRad = (d) => (d * Math.PI) / 180;
const toDeg = (r) => (r * 180) / Math.PI;

function haversineKm(a, b) {
  const dLat = toRad(b.latitude_deg - a.latitude_deg);
  const dLon = toRad(b.longitude_deg - a.longitude_deg);
  const la1 = toRad(a.latitude_deg);
  const la2 = toRad(b.latitude_deg);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_R_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

function initialBearing(a, b) {
  const la1 = toRad(a.latitude_deg);
  const la2 = toRad(b.latitude_deg);
  const dLon = toRad(b.longitude_deg - a.longitude_deg);
  const y = Math.sin(dLon) * Math.cos(la2);
  const x = Math.cos(la1) * Math.sin(la2) - Math.sin(la1) * Math.cos(la2) * Math.cos(dLon);
  return (toDeg(Math.atan2(y, x)) + 360) % 360;
}

function greatCirclePoints(a, b, n) {
  const p1 = { f: toRad(a.latitude_deg), l: toRad(a.longitude_deg) };
  const p2 = { f: toRad(b.latitude_deg), l: toRad(b.longitude_deg) };
  const d =
    2 *
    Math.asin(
      Math.min(
        1,
        Math.sqrt(
          Math.sin((p2.f - p1.f) / 2) ** 2 +
            Math.cos(p1.f) * Math.cos(p2.f) * Math.sin((p2.l - p1.l) / 2) ** 2
        )
      )
    );
  if (d === 0) return [{ lon: a.longitude_deg, lat: a.latitude_deg }];
  const out = [];
  for (let i = 0; i <= n; i++) {
    const f = i / n;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(p1.f) * Math.cos(p1.l) + B * Math.cos(p2.f) * Math.cos(p2.l);
    const y = A * Math.cos(p1.f) * Math.sin(p1.l) + B * Math.cos(p2.f) * Math.sin(p2.l);
    const z = A * Math.sin(p1.f) + B * Math.sin(p2.f);
    out.push({ lat: toDeg(Math.atan2(z, Math.hypot(x, y))), lon: toDeg(Math.atan2(y, x)) });
  }
  return out;
}

const mapX = (lon) => ((lon + 180) / 360) * 1000;
const mapY = (lat) => ((90 - lat) / 180) * 500;
const nf0 = (n) => n.toLocaleString('en-GB', { maximumFractionDigits: 0 });
const coord = (v, pos, neg) => `${Math.abs(v).toFixed(4)}° ${v >= 0 ? pos : neg}`;
const display = (a) => `${a.icao_code} — ${a.name.replace(/ Airport$/, '')}, ${a.municipality}`;

function matches(a, q) {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return (
    a.icao_code.toLowerCase().includes(s) ||
    (a.iata_code || '').toLowerCase().includes(s) ||
    a.name.toLowerCase().includes(s) ||
    a.municipality.toLowerCase().includes(s) ||
    a.country_name.toLowerCase().includes(s)
  );
}

export default function Screen() {
  const navigate = useNavigate();
  const ink = brand.primaryColor;
  const accent = brand.accentColor;
  const neutral = brand.neutralColor;
  const bg = brand.backgroundColor;
  const r = brand.radius;

  const defaultOrigin = AIRPORTS[0];
  const defaultDest = AIRPORTS[1];

  const [sel, setSel] = React.useState({ origin: defaultOrigin, dest: defaultDest });
  const [query, setQuery] = React.useState({ origin: display(defaultOrigin), dest: display(defaultDest) });
  const [open, setOpen] = React.useState(null);
  const [activeIdx, setActiveIdx] = React.useState(0);
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState('ready');
  const [plotted, setPlotted] = React.useState({ origin: defaultOrigin, dest: defaultDest });
  const [zoom, setZoom] = React.useState(1.9);
  const [pan, setPan] = React.useState({ x: 32, y: 96 });
  const [dragging, setDragging] = React.useState(false);

  const timerRef = React.useRef(null);
  const dragRef = React.useRef(null);
  React.useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const filtered = (side) => {
    const q = query[side];
    const chosen = sel[side];
    const list = chosen && q === display(chosen) ? AIRPORTS : AIRPORTS.filter((a) => matches(a, q));
    return list.slice(0, 7);
  };

  const clampPan = (p, z) => ({
    x: Math.max(-520 * z, Math.min(520 * z, p.x)),
    y: Math.max(-260 * z, Math.min(260 * z, p.y))
  });

  const fitTo = (o, d) => {
    const pts = greatCirclePoints(o, d, 64).map((p) => ({ x: mapX(p.lon), y: mapY(p.lat) }));
    const xs = pts.map((p) => p.x);
    const ys = pts.map((p) => p.y);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    const minY = Math.min(...ys), maxY = Math.max(...ys);
    const w = Math.max(maxX - minX, 60);
    const h = Math.max(maxY - minY, 30);
    const z = Math.max(1, Math.min(5, Math.min(820 / w, 400 / h)));
    const mx = (minX + maxX) / 2;
    const my = (minY + maxY) / 2;
    setZoom(z);
    setPan(clampPan({ x: -(mx - 500) * z, y: -(my - 250) * z }, z));
  };

  const choose = (side, airport) => {
    setSel((s) => ({ ...s, [side]: airport }));
    setQuery((q) => ({ ...q, [side]: display(airport) }));
    setErrors((e) => { const n = { ...e }; delete n[side]; return n; });
    setOpen(null);
    setActiveIdx(0);
  };

  const clearSide = (side) => {
    setSel((s) => ({ ...s, [side]: null }));
    setQuery((q) => ({ ...q, [side]: '' }));
    setErrors((e) => { const n = { ...e }; delete n[side]; return n; });
  };

  const handlePlot = (e) => {
    if (e) e.preventDefault();
    const next = {};
    if (!sel.origin)
      next.origin = query.origin.trim()
        ? `No airport matches “${query.origin.trim()}”. Pick one from the list below.`
        : 'Choose an origin airport to plot from.';
    if (!sel.dest)
      next.dest = query.dest.trim()
        ? `No airport matches “${query.dest.trim()}”. Pick one from the list below.`
        : 'Choose a destination airport to plot to.';
    if (Object.keys(next).length) {
      setErrors(next);
      setStatus('error');
      return;
    }
    setErrors({});
    setStatus('loading');
    const pair = { origin: sel.origin, dest: sel.dest };
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setPlotted(pair);
      setStatus('ready');
      fitTo(pair.origin, pair.dest);
    }, 620);
  };

  const handleSwap = () => {
    setSel((s) => ({ origin: s.dest, dest: s.origin }));
    setQuery((q) => ({ origin: q.dest, dest: q.origin }));
    setErrors({});
    if (plotted && sel.origin && sel.dest) {
      setPlotted({ origin: sel.dest, dest: sel.origin });
      setStatus('ready');
    }
  };

  const handleClearBoth = () => {
    setSel({ origin: null, dest: null });
    setQuery({ origin: '', dest: '' });
    setErrors({});
    setPlotted(null);
    setStatus('idle');
    setZoom(1);
    setPan({ x: 0, y: 0 });
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const km = plotted ? haversineKm(plotted.origin, plotted.dest) : null;
  const nm = km === null ? null : km * NM_PER_KM;
  const same = plotted ? plotted.origin.id === plotted.dest.id : false;
  const bearing = plotted && !same ? initialBearing(plotted.origin, plotted.dest) : null;
  const ready = status === 'ready' && !!plotted;

  const toScreen = (lon, lat) => ({
    x: pan.x + 500 + (mapX(lon) - 500) * zoom,
    y: pan.y + 250 + (mapY(lat) - 250) * zoom
  });

  const arcSegments = React.useMemo(() => {
    if (!plotted || same) return [];
    const pts = greatCirclePoints(plotted.origin, plotted.dest, 160).map((p) => ({
      mx: mapX(p.lon),
      my: mapY(p.lat)
    }));
    const segs = [];
    let cur = [pts[0]];
    for (let i = 1; i < pts.length; i++) {
      if (Math.abs(pts[i].mx - pts[i - 1].mx) > 500) {
        segs.push(cur);
        cur = [pts[i]];
      } else cur.push(pts[i]);
    }
    segs.push(cur);
    return segs.filter((s) => s.length > 1);
  }, [plotted, same]);

  const onPointerDown = (e) => {
    dragRef.current = { x: e.clientX, y: e.clientY, pan: { ...pan }, rect: e.currentTarget.getBoundingClientRect() };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const s = Math.max(d.rect.width / 1000, d.rect.height / 500);
    setPan(clampPan({ x: d.pan.x + (e.clientX - d.x) / s, y: d.pan.y + (e.clientY - d.y) / s }, zoom));
  };
  const endDrag = (e) => {
    dragRef.current = null;
    setDragging(false);
    if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId))
      e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const setZoomTo = (nz) => {
    const z = Math.max(1, Math.min(8, Number(nz.toFixed(3))));
    setPan((p) => clampPan({ x: (p.x * z) / zoom, y: (p.y * z) / zoom }, z));
    setZoom(z);
  };

  const onMapKey = (e) => {
    const step = 48;
    if (e.key === 'ArrowLeft') { e.preventDefault(); setPan((p) => clampPan({ x: p.x + step, y: p.y }, zoom)); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); setPan((p) => clampPan({ x: p.x - step, y: p.y }, zoom)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setPan((p) => clampPan({ x: p.x, y: p.y + step }, zoom)); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setPan((p) => clampPan({ x: p.x, y: p.y - step }, zoom)); }
    else if (e.key === '+' || e.key === '=') { e.preventDefault(); setZoomTo(zoom * 1.35); }
    else if (e.key === '-' || e.key === '_') { e.preventDefault(); setZoomTo(zoom / 1.35); }
  };

  const labelCls = 'block text-[11px] font-bold uppercase tracking-[0.16em]';
  const frame = { border: `2px solid ${ink}`, borderRadius: r, backgroundColor: bg };

  const fieldKeyDown = (side) => (e) => {
    const list = filtered(side);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpen(side);
      setActiveIdx((i) => (list.length ? (i + 1) % list.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpen(side);
      setActiveIdx((i) => (list.length ? (i - 1 + list.length) % list.length : 0));
    } else if (e.key === 'Enter' && open === side && list[activeIdx]) {
      e.preventDefault();
      choose(side, list[activeIdx]);
    } else if (e.key === 'Escape' && open === side) {
      e.preventDefault();
      setOpen(null);
    }
  };

  const renderField = (side, wf, labelText, placeholder) => {
    const list = filtered(side);
    const chosen = sel[side];
    const err = errors[side];
    const listId = `rp-${side}-listbox`;
    return (
      <div data-wf={wf} className="relative">
        <Label htmlFor={`rp-${side}`} className={labelCls} style={{ color: ink }}>
          {labelText}
        </Label>
        <div className="relative mt-2">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
            <Search aria-hidden="true" className="h-4 w-4" style={{ color: err ? accent : neutral }} />
          </span>
          <Input
            data-wf={wf === 'b-1-0' ? 'b-1-0' : 'b-1-1'}
            id={`rp-${side}`}
            type="text"
            role="combobox"
            autoComplete="off"
            aria-expanded={open === side}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-describedby={`rp-${side}-help`}
            aria-invalid={err ? true : undefined}
            aria-activedescendant={open === side && list[activeIdx] ? `rp-${side}-opt-${list[activeIdx].id}` : undefined}
            placeholder={placeholder}
            value={query[side]}
            onChange={(e) => {
              setQuery((q) => ({ ...q, [side]: e.target.value }));
              setSel((s) => ({ ...s, [side]: null }));
              setOpen(side);
              setActiveIdx(0);
              setErrors((x) => { const n = { ...x }; delete n[side]; return n; });
            }}
            onFocus={() => setOpen(side)}
            onBlur={() => setOpen((o) => (o === side ? null : o))}
            onKeyDown={fieldKeyDown(side)}
            className="h-12 w-full pl-9 pr-11 text-[14px]"
            style={{
              border: `2px solid ${err ? accent : ink}`,
              borderRadius: r,
              backgroundColor: bg,
              color: ink,
              boxShadow: 'none'
            }}
          />
          {query[side] ? (
            <button
              type="button"
              onClick={() => clearSide(side)}
              aria-label={`Clear ${labelText.toLowerCase()}`}
              className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center"
              style={{ color: ink, borderRadius: r }}
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          ) : null}
        </div>
        <p
          id={`rp-${side}-help`}
          role={err ? 'alert' : undefined}
          className="mt-2 min-h-[18px] text-[12px] leading-[18px]"
          style={{ color: err ? accent : neutral, fontVariantNumeric: 'tabular-nums' }}
        >
          {err ? (
            <span className="inline-flex items-start gap-1.5 font-semibold">
              <AlertCircle aria-hidden="true" className="mt-[2px] h-3.5 w-3.5 shrink-0" />
              {err}
            </span>
          ) : chosen ? (
            `IATA ${chosen.iata_code || 'not available'} · ${coord(chosen.latitude_deg, 'N', 'S')} ${coord(chosen.longitude_deg, 'E', 'W')} · ${chosen.country_name}`
          ) : (
            'Type an ICAO or IATA code, airport, city or country.'
          )}
        </p>

        {open === side ? (
          <div
            className="rp-panel absolute left-0 right-0 top-[76px] z-30"
            style={{ ...frame, borderColor: ink }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <ul id={listId} role="listbox" aria-label={`${labelText} results`} className="max-h-[272px] overflow-auto">
              {list.length === 0 ? (
                <li className="px-3 py-4 text-[12px]" style={{ color: neutral }}>
                  <span className="font-bold uppercase tracking-[0.14em]" style={{ color: ink }}>
                    No match in the dataset
                  </span>
                  <br />
                  Nothing in the OurAirports import matches “{query[side].trim()}”. Try a four-letter ICAO code such as EGLL.
                </li>
              ) : (
                list.map((a, i) => (
                  <li
                    key={a.id}
                    id={`rp-${side}-opt-${a.id}`}
                    role="option"
                    aria-selected={i === activeIdx}
                    data-active={i === activeIdx}
                    className="rp-opt cursor-pointer px-3 py-2"
                    style={{ borderTop: i === 0 ? 'none' : `1px solid ${neutral}33` }}
                    onMouseEnter={() => setActiveIdx(i)}
                    onClick={() => choose(side, a)}
                  >
                    <span className="flex items-baseline gap-2">
                      <span className="w-[46px] shrink-0 text-[13px] font-bold tracking-[0.06em]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                        {a.icao_code}
                      </span>
                      <span className="w-[34px] shrink-0 text-[12px]">{a.iata_code || '—'}</span>
                      <span className="truncate text-[13px]">{a.name}</span>
                    </span>
                    <span className="ml-[80px] block truncate text-[11px] uppercase tracking-[0.1em] opacity-70">
                      {a.municipality} · {a.country_name}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : null}
      </div>
    );
  };

  const metricCard = (wf, label, value, hint, big) => (
    <div data-wf={wf} style={frame} className="px-4 py-4 sm:px-5 sm:py-5">
      <p className={labelCls} style={{ color: neutral }}>{label}</p>
      <p
        className={`mt-3 font-bold tracking-[-0.02em] ${big ? 'text-[34px] leading-[36px] sm:text-[40px] sm:leading-[42px]' : 'text-[20px] leading-[24px]'}`}
        style={{ color: ink, fontVariantNumeric: 'tabular-nums' }}
      >
        {value}
      </p>
      <p className="mt-2 text-[12px] leading-[18px]" style={{ color: neutral, fontVariantNumeric: 'tabular-nums' }}>
        {hint}
      </p>
    </div>
  );

  const loadingBar = (
    <span className="mt-3 block h-[34px] w-full overflow-hidden" style={{ border: `2px solid ${ink}` }}>
      <span className="rp-scan block h-full w-1/3" style={{ backgroundColor: `${neutral}33` }} />
    </span>
  );

  return (
    <div
      className="rp-root mx-auto w-full max-w-[1180px] px-4 pb-16 pt-6 sm:px-6"
      style={{ backgroundColor: bg, color: ink, fontFamily: brand.fontBody }}
    >
      <style>{`
        .rp-root :focus-visible { outline: 2px solid ${accent}; outline-offset: 2px; }
        .rp-opt[data-active="true"] { background: ${ink}; color: ${bg}; }
        .rp-panel { animation: rp-in 120ms ease-out; }
        @keyframes rp-in { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: none; } }
        .rp-arc { animation: rp-draw 760ms ease-out both; }
        @keyframes rp-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
        .rp-scan { animation: rp-sweep 1.1s ease-in-out infinite; }
        @keyframes rp-sweep { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        .rp-link:hover { color: ${accent}; }
        .rp-btn:hover { background: ${ink}; color: ${bg}; }
        .rp-btn-primary:hover { background: ${bg}; color: ${ink}; }
        .rp-btn:disabled, .rp-btn-primary:disabled { opacity: .38; cursor: not-allowed; }
        .rp-btn:disabled:hover { background: ${bg}; color: ${ink}; }
        @media (prefers-reduced-motion: reduce) {
          .rp-root * { animation: none !important; transition: none !important; }
          .rp-arc { stroke-dashoffset: 0 !important; }
        }
      `}</style>

      {/* Row 1 */}
      <header data-wf="b-0-0" className="pb-6" style={{ borderBottom: `2px solid ${ink}` }}>
        <p className={labelCls} style={{ color: neutral }}>Great-circle tool</p>
        <h1
          className="mt-2 text-[32px] font-bold leading-[36px] tracking-[-0.03em] sm:text-[38px] sm:leading-[40px]"
          style={{ fontFamily: brand.fontHeading }}
        >
          Route Planner
        </h1>
        <p className="mt-2 max-w-[62ch] text-[14px] leading-[22px]" style={{ color: neutral }}>
          Pick two airports from the OurAirports directory. The great-circle line is drawn on the map and the
          haversine distance is reported in nautical miles and kilometres. Free to use — no sign-up, no billing.
        </p>
      </header>

      <form onSubmit={handlePlot}>
        {/* Row 2 */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-5">{renderField('origin', 'b-1-0', 'Origin airport', 'e.g. HKJK, Nairobi, Kenya')}</div>
          <div className="md:col-span-5">{renderField('dest', 'b-1-1', 'Destination airport', 'e.g. EGLL, London, United Kingdom')}</div>
          <div data-wf="b-1-2" className="md:col-span-2">
            <span className={`${labelCls} invisible`} aria-hidden="true">Clear</span>
            <Button
              data-wf="b-1-2"
              type="button"
              onClick={handleClearBoth}
              disabled={!sel.origin && !sel.dest && !query.origin && !query.dest}
              className="rp-btn mt-2 h-12 w-full text-[12px] font-bold uppercase tracking-[0.14em] transition-colors"
              style={{ backgroundColor: bg, color: ink, border: `2px solid ${ink}`, borderRadius: r }}
            >
              Clear both
            </Button>
          </div>
        </div>

        {/* Row 3 */}
        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-12">
          <div className="md:col-span-4">
            <Button
              data-wf="b-2-0"
              type="submit"
              disabled={status === 'loading'}
              className="rp-btn-primary h-14 w-full text-[14px] font-bold uppercase tracking-[0.18em] transition-colors"
              style={{ backgroundColor: ink, color: bg, border: `2px solid ${ink}`, borderRadius: r }}
            >
              {status === 'loading' ? 'Plotting…' : 'Plot route'}
            </Button>
          </div>
          <div className="md:col-span-4">
            <Button
              data-wf="b-2-1"
              type="button"
              onClick={handleSwap}
              disabled={!sel.origin && !sel.dest}
              className="rp-btn h-14 w-full text-[12px] font-bold uppercase tracking-[0.14em] transition-colors"
              style={{ backgroundColor: bg, color: ink, border: `2px solid ${ink}`, borderRadius: r }}
            >
              Swap origin and destination
            </Button>
          </div>
          <div className="flex items-center md:col-span-4">
            <button
              data-wf="b-2-2"
              type="button"
              onClick={() => navigate('search')}
              className="rp-link inline-flex h-14 items-center gap-2 text-[13px] font-semibold underline underline-offset-4 transition-colors"
              style={{ color: ink }}
            >
              Find an airport in search
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>

      {/* Row 4 */}
      <section data-wf="b-3-0" className="mt-8" style={frame} aria-labelledby="rp-map-heading">
        <div
          className="flex flex-wrap items-center justify-between gap-2 px-4 py-3"
          style={{ borderBottom: `2px solid ${ink}` }}
        >
          <h2 id="rp-map-heading" className={labelCls} style={{ color: ink }}>
            Interactive map — great-circle path
          </h2>
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em]" style={{ color: neutral }}>
            <Clock aria-hidden="true" className="h-3.5 w-3.5" />
            Dataset imported {DATASET.imported_label} · read-only
          </span>
        </div>

        <div
          tabIndex={0}
          role="group"
          aria-label="Interactive route map. Drag to pan; arrow keys pan, plus and minus zoom."
          onKeyDown={onMapKey}
          className="relative h-[260px] w-full sm:h-[360px] lg:h-[430px]"
          style={{ cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none' }}
        >
          <svg
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid slice"
            className="h-full w-full select-none"
            role="img"
            aria-label={
              ready && plotted
                ? same
                  ? `Origin and destination are both ${plotted.origin.icao_code}. A single point is marked; distance is zero.`
                  : `Great-circle line from ${plotted.origin.icao_code} ${plotted.origin.municipality} to ${plotted.dest.icao_code} ${plotted.dest.municipality}, ${nf0(nm)} nautical miles.`
                : 'World map with no route plotted.'
            }
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <rect x="0" y="0" width="1000" height="500" fill={bg} />
            <g transform={`translate(${pan.x} ${pan.y}) translate(500 250) scale(${zoom}) translate(-500 -250)`}>
              {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => (
                <line key={`m${lon}`} x1={mapX(lon)} y1={0} x2={mapX(lon)} y2={500} stroke={`${neutral}2e`} strokeWidth="1" vectorEffect="non-scaling-stroke" />
              ))}
              {[-60, -30, 0, 30, 60].map((lat) => (
                <line key={`p${lat}`} x1={0} y1={mapY(lat)} x2={1000} y2={mapY(lat)} stroke={lat === 0 ? `${neutral}5a` : `${neutral}2e`} strokeWidth="1" strokeDasharray={lat === 0 ? '6 4' : undefined} vectorEffect="non-scaling-stroke" />
              ))}
              {LAND.map((poly, i) => (
                <path
                  key={i}
                  d={`M ${poly.map((p) => `${mapX(p[0]).toFixed(1)} ${mapY(p[1]).toFixed(1)}`).join(' L ')} Z`}
                  fill={`${neutral}1f`}
                  stroke={`${ink}66`}
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </g>

            {ready && !same
              ? arcSegments.map((seg, i) => (
                  <polyline
                    key={`${plotted.origin.id}-${plotted.dest.id}-${i}`}
                    className="rp-arc"
                    pathLength="1"
                    strokeDasharray="1"
                    points={seg
                      .map((p) => {
                        const x = pan.x + 500 + (p.mx - 500) * zoom;
                        const y = pan.y + 250 + (p.my - 250) * zoom;
                        return `${x.toFixed(1)},${y.toFixed(1)}`;
                      })
                      .join(' ')}
                    fill="none"
                    stroke={accent}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                ))
              : null}

            {ready && plotted
              ? [
                  { a: plotted.origin, kind: 'origin' },
                  ...(same ? [] : [{ a: plotted.dest, kind: 'dest' }])
                ].map(({ a, kind }) => {
                  const p = toScreen(a.longitude_deg, a.latitude_deg);
                  return (
                    <g key={kind}>
                      <line x1={p.x} y1={p.y - 16} x2={p.x} y2={p.y + 16} stroke={ink} strokeWidth="1" />
                      <line x1={p.x - 16} y1={p.y} x2={p.x + 16} y2={p.y} stroke={ink} strokeWidth="1" />
                      {kind === 'origin' ? (
                        <circle cx={p.x} cy={p.y} r="6" fill={accent} stroke={ink} strokeWidth="2" />
                      ) : (
                        <rect x={p.x - 6} y={p.y - 6} width="12" height="12" fill={bg} stroke={ink} strokeWidth="2.5" />
                      )}
                      <rect x={p.x + 12} y={p.y - 28} width="74" height="20" fill={bg} stroke={ink} strokeWidth="2" />
                      <text
                        x={p.x + 18}
                        y={p.y - 14}
                        fontSize="12"
                        fontWeight="700"
                        fill={ink}
                        style={{ fontFamily: brand.fontBody, letterSpacing: '0.06em' }}
                      >
                        {a.icao_code} {kind === 'origin' ? 'ORG' : 'DST'}
                      </text>
                    </g>
                  );
                })
              : null}
          </svg>

          {status === 'loading' ? (
            <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: `${bg}cc` }}>
              <div className="px-5 py-4 text-center" style={frame}>
                <p className={labelCls} style={{ color: ink }}>Computing great circle</p>
                <p className="mt-1 text-[12px]" style={{ color: neutral }}>Haversine solve over the bundled dataset…</p>
                {loadingBar}
              </div>
            </div>
          ) : null}

          {!plotted && status !== 'loading' ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
              <div className="max-w-[360px] px-5 py-4 text-center" style={frame}>
                <p className={labelCls} style={{ color: ink }}>No route plotted</p>
                <p className="mt-2 text-[13px] leading-[20px]" style={{ color: neutral }}>
                  Choose an origin and a destination above, then select <strong style={{ color: ink }}>Plot route</strong> to
                  draw the great-circle line.
                </p>
              </div>
            </div>
          ) : null}

          {status === 'error' ? (
            <div className="absolute left-3 top-3 max-w-[340px] px-3 py-2" style={{ ...frame, borderColor: accent }}>
              <p className="inline-flex items-start gap-1.5 text-[12px] font-semibold leading-[18px]" style={{ color: accent }}>
                <AlertCircle aria-hidden="true" className="mt-[2px] h-3.5 w-3.5 shrink-0" />
                Route not plotted — both airports must be chosen from the directory. Your typing has been kept.
              </p>
            </div>
          ) : null}

          {ready && same ? (
            <div className="absolute left-3 top-3 px-3 py-2" style={{ ...frame, borderColor: accent }}>
              <p className="text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: accent }}>
                Same airport — a single point is marked
              </p>
            </div>
          ) : null}

          <p
            className="pointer-events-none absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.1em]"
            style={{ color: neutral }}
          >
            Map tiles © MapTiler · map data © OpenStreetMap contributors
          </p>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-3 px-4 py-3"
          style={{ borderTop: `2px solid ${ink}` }}
        >
          <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: neutral, fontVariantNumeric: 'tabular-nums' }}>
            Equirectangular · zoom ×{zoom.toFixed(1)} ·{' '}
            {ready && plotted && !same
              ? `initial bearing ${Math.round(bearing)}°`
              : 'drag to pan, arrow keys when focused'}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={() => setZoomTo(zoom / 1.35)}
              disabled={zoom <= 1.001}
              className="rp-btn h-10 px-3 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors"
              style={{ backgroundColor: bg, color: ink, border: `2px solid ${ink}`, borderRadius: r }}
            >
              Zoom out
            </Button>
            <Button
              type="button"
              onClick={() => setZoomTo(zoom * 1.35)}
              disabled={zoom >= 7.999}
              className="rp-btn h-10 px-3 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors"
              style={{ backgroundColor: bg, color: ink, border: `2px solid ${ink}`, borderRadius: r }}
            >
              Zoom in
            </Button>
            <Button
              type="button"
              onClick={() => (plotted ? fitTo(plotted.origin, plotted.dest) : (setZoom(1), setPan({ x: 0, y: 0 })))}
              className="rp-btn h-10 px-3 text-[11px] font-bold uppercase tracking-[0.12em] transition-colors"
              style={{ backgroundColor: bg, color: ink, border: `2px solid ${ink}`, borderRadius: r }}
            >
              {plotted ? 'Fit route' : 'Reset view'}
            </Button>
          </div>
        </div>
      </section>

      {/* Row 5 */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-4">
          {status === 'loading'
            ? (
              <div data-wf="b-4-0" style={frame} className="px-5 py-5">
                <p className={labelCls} style={{ color: neutral }}>Great-circle distance</p>
                {loadingBar}
                <p className="mt-2 text-[12px]" style={{ color: neutral }}>Solving nautical miles…</p>
              </div>
            )
            : metricCard(
                'b-4-0',
                'Great-circle distance',
                ready ? `${nf0(nm)} nm` : '—',
                ready
                  ? `${plotted.origin.icao_code} → ${plotted.dest.icao_code} · haversine, R = 6,371 km`
                  : 'Plot a route to read the distance in nautical miles.',
                true
              )}
        </div>
        <div className="md:col-span-4">
          {status === 'loading'
            ? (
              <div data-wf="b-4-1" style={frame} className="px-5 py-5">
                <p className={labelCls} style={{ color: neutral }}>Great-circle distance</p>
                {loadingBar}
                <p className="mt-2 text-[12px]" style={{ color: neutral }}>Solving kilometres…</p>
              </div>
            )
            : metricCard(
                'b-4-1',
                'Great-circle distance',
                ready ? `${nf0(km)} km` : '—',
                ready ? '1 nm = 1.852 km exactly' : 'Plot a route to read the distance in kilometres.',
                true
              )}
        </div>
        <div data-wf="b-4-2" style={{ ...frame, borderColor: ready && same ? accent : ink }} className="px-4 py-4 sm:px-5 sm:py-5">
          <p className={labelCls} style={{ color: neutral }}>Same origin and destination</p>
          <p
            className="mt-3 text-[20px] font-bold leading-[24px] tracking-[-0.01em]"
            style={{ color: ready && same ? accent : ink, fontVariantNumeric: 'tabular-nums' }}
          >
            {ready ? (same ? '0 nm / 0 km' : 'No — two distinct airports') : '—'}
          </p>
          {ready && same ? (
            <Badge
              className="mt-3 inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
              style={{ backgroundColor: bg, color: accent, border: `2px solid ${accent}`, borderRadius: r }}
            >
              <CheckCircle aria-hidden="true" className="h-3.5 w-3.5" />
              Point only, no line
            </Badge>
          ) : null}
          <p className="mt-2 text-[12px] leading-[18px]" style={{ color: neutral }}>
            {ready
              ? same
                ? `${plotted.origin.icao_code} is set as both origin and destination, so the distance is zero and a single point is marked.`
                : 'Origin and destination differ, so a full great-circle line is drawn.'
              : 'If the same airport is used twice, the distance is reported as zero.'}
          </p>
        </div>
      </div>

      {/* Row 6 */}
      <p
        data-wf="b-5-0"
        className="mt-6 pt-4 text-[12px] leading-[20px]"
        style={{ color: neutral, borderTop: `2px solid ${ink}` }}
      >
        Map tiles © MapTiler, map data © OpenStreetMap contributors. Airport data from the OurAirports open dataset
        ({DATASET.records} records, imported {DATASET.imported_label}).
      </p>
    </div>
  );
}
