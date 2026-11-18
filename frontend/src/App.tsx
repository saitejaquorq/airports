import { NavLink, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { Icons } from "@/lib/icons";
import Search from "@/screens/Search";
import AirportDetail from "@/screens/AirportDetail";
import RouteScreen from "@/screens/RouteScreen";
import GettingStarted from "@/screens/GettingStarted";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-2 rounded-[var(--brand-radius)] px-3 py-2 text-sm font-medium transition-colors",
    isActive ? "bg-[var(--brand-hover)] text-[var(--brand-fg)]" : "text-[var(--brand-fg-muted)]",
  ].join(" ");

// The app's menu, drawn around every screen except the ones routed outside it below.
function AppShellLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header
        className="border-b"
        style={{
          backgroundColor: "var(--brand-surface)",
          borderColor: "var(--brand-border)",
        }}
      >
        <div className="flex items-center gap-6 px-6 py-2">
          <p
            className="shrink-0 text-sm font-semibold"
            style={{ fontFamily: "var(--brand-font-heading)" }}
          >
            {"Airport Directory"}
          </p>
          <nav aria-label="App menu" className="flex flex-wrap items-center gap-1">
            <NavLink to="/search" className={navLinkClass}>
              <Icons.Search size={16} />
              {"Search"}
            </NavLink>
            <NavLink to="/route" className={navLinkClass}>
              {"Route Planner"}
            </NavLink>
            <NavLink to="/getting-started" className={navLinkClass}>
              {"Getting Started"}
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<AppShellLayout />}>
        <Route path="/search" element={<Search />} />
        <Route path="/airport-detail" element={<AirportDetail />} />
        <Route path="/route" element={<RouteScreen />} />
        <Route path="/getting-started" element={<GettingStarted />} />
      </Route>
      <Route path="*" element={<Navigate to="/search" replace />} />
    </Routes>
  );
}
