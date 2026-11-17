# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `02d8609` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
airports is a generated prototype with two parts in one repo: a Vite + React 19 single-page frontend containing the fully approved, reviewed UI (currently running on seeded sample data, not live API calls), and a FastAPI backend that was generated from no approved architecture yet, so it only exposes a health check plus scaffolding (SQLAlchemy models/schemas/services wiring) ready for real endpoints to be added. The backend defaults to a local SQLite database so it runs with no external services, though docker-compose.yml also provisions Postgres 16 and Meilisearch for when the real architecture is implemented.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for npm, Vite, Playwright) and npm
- Python 3.12
- pip
- Docker and Docker Compose (optional, for Postgres and Meilisearch services in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd frontend && npm install
3. cd backend && pip install -r requirements.txt
4. (Optional) From the repo root, run docker compose up -d to start the Postgres and Meilisearch services defined in docker-compose.yml if the backend is configured to use them
5. Copy .env.example to .env and fill in any values it defines before running services that read environment variables (e.g. DATABASE_URL, ALLOWED_ORIGINS, VITE_API_BASE_URL)
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the React SPA (run from frontend/) |
| frontend build | `npm run build` | Bundles the frontend app with Vite; does not typecheck |
| frontend preview | `npm run preview` | Serves the production build locally |
| frontend typecheck | `npm run typecheck` | Runs tsc --noEmit over the frontend source |
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI backend with autoreload (run from backend/); creates SQLite tables from models on startup |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `frontend/` | Vite + React 19 SPA with the approved, reviewed app screens, running on seeded sample data |
| `frontend/src` | Application source: main.tsx entrypoint, lib/api.ts API client, lib/ui.tsx and lib/icons.tsx shared component/icon vocabulary, index.css brand styling |
| `frontend/e2e` | Playwright end-to-end acceptance specs and support fixtures |
| `backend/` | FastAPI service, currently a scaffold with only a health check route implemented |
| `backend/app` | Application code: main.py (entrypoint/CORS/lifespan), database.py (engine/session), models.py (SQLAlchemy models, currently empty), schemas.py (Pydantic schemas, incl. StubResponse), services.py, routers/ (generated routers) |
| `backend/tests` | Pytest test suite, split into unit/ and integration/ (e.g. test_health.py) |
| `.devcontainer` | VS Code devcontainer configuration |
| `.quorq` | Quorq platform metadata (handoff.json) for the generating platform, not application code |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend routers are generated one per architecture component that owns endpoints, with one route per spec'd endpoint; unimplemented routes return the typed StubResponse placeholder from schemas.py
- All SQLAlchemy models inherit from the shared Base declared in app/database.py, imported in main.py before Base.metadata.create_all runs on startup
- Backend config is environment-driven (DATABASE_URL for the database, ALLOWED_ORIGINS for CORS), defaulting to safe local values (SQLite, localhost:5173) when unset
- Frontend screens are organized one module per approved screen and are written against the shared component/icon vocabulary in src/lib/ui.tsx and src/lib/icons.tsx
- The frontend API client (src/lib/api.ts) centralizes base URL resolution and bearer-token auth (session token first, falling back to a shared API secret) for when screens are wired to the real backend
- Playwright specs live in e2e/ and are excluded from Vitest's include pattern (src/**/*.{test,spec}.{ts,tsx}) to avoid collection conflicts
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm test` | Runs Vitest component tests under src/ (vitest run --passWithNoTests) |
| frontend lint | `npm run lint` | Runs ESLint over the frontend app; this is the gate the platform runs during development |
| frontend format check | `npm run format:check` | Checks formatting with Prettier without writing changes |
| frontend e2e install | `npm run test:e2e:install` | Installs the Chromium browser Playwright needs |
| frontend e2e tests | `npm run test:e2e` | Runs Playwright acceptance specs from e2e/; without E2E_BASE_URL it boots the backend (from backend/.venv) and a production frontend build locally |
| backend tests | `pytest` | Runs the backend pytest suite (tests/unit and tests/integration), using pythonpath=. from pytest.ini |
| backend lint | `ruff check .` | Lints the backend Python code |
| backend format | `ruff format .` | Formats the backend Python code |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend requests to the backend are blocked by the browser with a CORS error | Set the ALLOWED_ORIGINS environment variable (comma-separated) on the backend to include the frontend's origin; it defaults to http://localhost:5173 and http://127.0.0.1:5173 for local dev |
| `pytest` run from backend/ fails with `ModuleNotFoundError: No module named 'app'` | Run pytest from the backend/ directory so pytest.ini's `pythonpath = .` setting takes effect |
| `npm run build` succeeds but deployment or CI fails on type errors | vite build does not typecheck; run `npm run typecheck` (tsc --noEmit) separately and fix errors before relying on a clean build |
| Playwright e2e tests fail to start the backend | Ensure the backend's dependencies are installed into backend/.venv (as playwright.config.ts's webServer command expects) before running `npm run test:e2e`, or set E2E_BASE_URL to point at an already-running deployment instead |
| Backend has no data to serve beyond /health | This is expected: no architecture/data model had been approved yet, so models.py, schemas.py, and routers are scaffolding; implement models and routes there as the architecture is approved |
<!-- sdlc:auto:end troubleshooting -->
