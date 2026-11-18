# Runbook

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start health -->
_Not deployed yet._
<!-- sdlc:auto:end health -->

<!-- sdlc:auto:start deploy -->
Push to `main` to run `.github/workflows/deploy.yml`, or start a deployment from the platform's Deployment tab.
<!-- sdlc:auto:end deploy -->

<!-- sdlc:auto:start rollback -->
Redeploy the last good version from the platform's Deployment tab, or revert the offending commit on `main` — the workflow redeploys.
<!-- sdlc:auto:end rollback -->

<!-- sdlc:auto:start recent-failures -->
| Date | Version | Summary |
|---|---|---|
| 2026-11-18 | c263d74164d2 | The container could not be started: `docker exec ai-sdlc-caddy-1 caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile` failed (1): Error response from daemon: No such container: ai-sdlc-caddy-1 |
<!-- sdlc:auto:end recent-failures -->

## Contacts and escalation

_Add on-call contacts here — this section is never overwritten._
