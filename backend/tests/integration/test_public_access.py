"""US-011 / AC-028 -- the API never gates a feature behind payment, a
subscription, sign-up, or billing.

The architecture notes for this ticket are explicit: every airport/route
endpoint is intentionally public with no authentication (NFR-009). These
tests assert that contract at the HTTP layer so that if anyone later bolts
an auth or paywall check onto a router, the regression is caught here
rather than discovered by a visitor hitting a 401/402/403.

`/airports/search`, `/airports/{code}` and `/routes/distance` are declared
in the approved api_spec but have no handler behind them yet (only
`/health` does, see app/main.py and app/routers/__init__.py) -- so they
currently answer 404 "not found" rather than 200. That is a true gap, not
a payment gate, so these tests accept "not implemented yet" (404) and
"implemented and public" (200) alike; the one outcome they refuse is any
status that signals a billing/subscription/sign-up barrier.
"""

import pytest
from fastapi.testclient import TestClient

# Status codes a free, public tool must never answer with for a plain,
# unauthenticated GET: 401 (sign-in required), 402 (payment required), 403
# (forbidden -- the usual shape of "upgrade your plan").
PAYWALL_STATUSES = {401, 402, 403}


def test_health_check_needs_no_authorization_header(client: TestClient) -> None:
    """The one endpoint fully implemented today must be reachable with
    nothing but a bare GET -- no bearer token, no API key, no billing."""
    response = client.get("/health")

    assert response.status_code == 200
    assert response.status_code not in PAYWALL_STATUSES


@pytest.mark.parametrize(
    ("method", "path"),
    [
        ("GET", "/airports/search?q=nairobi"),
        ("GET", "/airports/EGLL"),
        ("GET", "/routes/distance?from=EGLL&to=KJFK"),
    ],
)
def test_airport_and_route_endpoints_never_require_payment_or_signup(
    client: TestClient, method: str, path: str
) -> None:
    """Search, airport lookup, and the route/distance endpoint are the three
    features AC-028 names (search airports, view details, plot a route).
    None of them may answer with a sign-in, payment, or subscription gate --
    whether or not the handler itself has been built yet."""
    response = client.request(method, path)

    assert response.status_code not in PAYWALL_STATUSES, (
        f"{method} {path} answered {response.status_code}, which looks like a "
        "payment/sign-in gate; this endpoint must stay free and public"
    )


def test_unauthenticated_request_is_never_redirected_to_a_payment_flow(
    client: TestClient,
) -> None:
    """A free tool must not bounce an anonymous caller toward checkout or
    sign-up. Redirects (3xx) would be exactly that kind of bounce, so a
    plain GET must resolve directly rather than redirect anywhere."""
    response = client.get("/health", follow_redirects=False)

    assert response.status_code == 200
    assert not (300 <= response.status_code < 400)
