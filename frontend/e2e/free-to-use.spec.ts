import { expect, test } from "@playwright/test";

// US-011 / AC-028 -- "Given I am using any feature of the app, when I search
// airports, view details, or plot a route, then no payment, subscription,
// sign-up, or billing is required at any point."
//
// The API lives somewhere other than the frontend's own origin; building its
// URL from a relative path would hit the frontend's static server instead.
const API = process.env.E2E_API_URL ?? "http://127.0.0.1:8000";

// Wording an actual paywall, sign-up gate or billing step would use -- not
// the app's own "free to use, no sign-up" reassurance text, which legitimately
// contains words like "sign-up" and "billing" and must not trip this check.
const PAYWALL_WORDING =
  /sign in to continue|log in to continue|sign up to continue|create an account to continue|verify your email to continue|enter your card|credit card number|card number|cvv|payment method|checkout|subscribe now|start your free trial|upgrade to (continue|unlock|pro)|payment required/i;

// A plain, unauthenticated GET must never come back looking like a sign-in
// or billing gate (401 sign-in, 402 payment, 403 forbidden/upgrade).
const PAYWALL_STATUSES = [401, 402, 403];

test.describe("[AC-028] the directory and route tool are free of charge", () => {
  test("[AC-028] a visitor searches, opens an airport, and plots a route with no payment, sign-up or billing prompt", async ({
    page,
  }) => {
    // Search: the first screen a member of the public reaches.
    const searchResponse = await page.goto("/search");
    expect(searchResponse?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "Airport Search" })).toBeVisible();
    await expect(page.locator("body")).not.toContainText(PAYWALL_WORDING);
    // Nothing on the page should ask the visitor to sign in or create an
    // account before they can use the search box.
    await expect(page.getByRole("link", { name: /sign up|log in|sign in/i })).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: /sign up|log in|sign in|subscribe|upgrade/i }),
    ).toHaveCount(0);

    // Airport details: reached either directly or from a search result --
    // either way it must render with no gate in front of it.
    const detailResponse = await page.goto("/airport-detail");
    expect(detailResponse?.ok()).toBeTruthy();
    await expect(page.locator("body")).not.toContainText(PAYWALL_WORDING);

    // Route planner: plotting a route between two destinations.
    const routeResponse = await page.goto("/route");
    expect(routeResponse?.ok()).toBeTruthy();
    await expect(page.getByRole("heading", { name: "Route Planner" })).toBeVisible();
    await expect(page.locator("body")).not.toContainText(PAYWALL_WORDING);

    // The plot-route action itself must not be disabled by, or lead to, a
    // payment step -- it stays a plain client-side action.
    const plotButton = page.getByRole("button", { name: /plot route/i });
    await expect(plotButton).toBeVisible();
    await expect(plotButton).toBeEnabled();
    await plotButton.click();
    await expect(page.locator("body")).not.toContainText(PAYWALL_WORDING);
    await expect(page).toHaveURL(/\/route$/);
  });

  test("[AC-028] GET /health, /airports/search, /airports/{code} and /routes/distance need no bearer, key or payment", async ({
    request,
  }) => {
    const health = await request.get(`${API}/health`);
    expect(health.status()).toBe(200);
    expect(PAYWALL_STATUSES).not.toContain(health.status());

    // These three are the endpoints AC-028 names: search, view details
    // (airport lookup), and plot a route (distance). Whether or not a
    // handler has been implemented behind each yet, none may answer with a
    // sign-in, payment or subscription gate for an anonymous caller.
    const search = await request.get(`${API}/airports/search`, { params: { q: "nairobi" } });
    expect(PAYWALL_STATUSES).not.toContain(search.status());

    const lookup = await request.get(`${API}/airports/EGLL`);
    expect(PAYWALL_STATUSES).not.toContain(lookup.status());

    const distance = await request.get(`${API}/routes/distance`, {
      params: { from: "EGLL", to: "KJFK" },
    });
    expect(PAYWALL_STATUSES).not.toContain(distance.status());

    // None of the calls above sent an Authorization header or any API key --
    // confirming that is itself the point of this spec.
  });
});
