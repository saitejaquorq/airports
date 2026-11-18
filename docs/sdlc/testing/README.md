# Testing

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### TEST-RUN-CHECKS · failed · source: testing:run_checks

A general checks run failed, with 7 of 8 checks passing.

7/8 checks passed. No ticket was associated and the input does not identify which check failed.

### TEST-WRITE-1351965d · succeeded · source: testing:write_tests:1351965d-a2cf-4d57-bbdb-572b99223d6b

Tests added for free, no-paywall access (AC-028) across the backend API and the live browser UI.

Added a backend pytest module asserting /health, /airports/search, /airports/{code}, and /routes/distance never respond with a sign-in/payment/forbidden status for an unauthenticated caller; a Playwright spec driving search, airport detail, and route-plotting in a real browser checking for no sign-up/payment UI or wording; and a request-based check against the live API with no Authorization header.

**Related:** AC-028, US-011

### TEST-WRITE-4f4397e9 · succeeded · source: testing:write_tests:4f4397e9-f6e0-46d8-8610-856c6e2a98d0

A further test-writing run succeeded, adding 8 test files.

8 test file(s) added. The input does not specify which features or acceptance criteria these cover.
<!-- sdlc:auto:end narrative -->
