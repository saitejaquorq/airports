import { expect, test } from "@playwright/test";

// US-011-1 / AC-028, NFR-004 -- a visitor searches airports, opens an
// airport's details, and opens the route planner with no sign-up, sign-in,
// paywall, subscription, pricing, trial or payment step anywhere in that
// journey, and the browser is left holding no per-visitor identity
// afterwards (no cookie, no session/token/user key in storage).

// Words that would mark an actual gate in front of a feature -- not the
// app's own "Free to use — no sign-up, no billing." reassurance text, which
// legitimately uses "sign-up" and "billing" to state the app is free, not to
// gate a feature behind them. This mirrors the carve-out in the sibling
// free-to-use.spec.ts's PAYWALL_WORDING pattern.
const GATE_WORDING =
  /sign up to continue|sign in to continue|log in to continue|subscribe now|pricing plan|enter your card|payment required|payment method|upgrade to (continue|unlock|pro)|start your free trial|card number/i;

// Keys that would reveal a per-visitor session, token or user identity
// stored in the browser (NFR-004: nothing stored per user).
const IDENTITY_KEY = /session|token|user/i;

test.describe("[AC-028][NFR-004] the app is free and accountless end to end", () => {
  test("[AC-028] a visitor searches, opens an airport, and opens the route planner with no sign-up, paywall or billing step", async ({
    page,
  }) => {
    const searchResponse = await page.goto("/search");
    expect(searchResponse?.ok()).toBeTruthy();
    expect(searchResponse?.status()).toBeLessThan(400);
    await expect(page.locator("body")).not.toContainText(GATE_WORDING);
    expect(page.url()).not.toMatch(GATE_WORDING);

    const detailResponse = await page.goto("/airport-detail");
    expect(detailResponse?.ok()).toBeTruthy();
    await expect(page.locator("body")).not.toContainText(GATE_WORDING);
    expect(page.url()).not.toMatch(GATE_WORDING);

    const routeResponse = await page.goto("/route");
    expect(routeResponse?.ok()).toBeTruthy();
    await expect(page.locator("body")).not.toContainText(GATE_WORDING);
    expect(page.url()).not.toMatch(GATE_WORDING);
  });

  test("[NFR-004] no per-visitor identity is held in the browser after the journey", async ({
    page,
    context,
  }) => {
    await page.goto("/search");
    await page.goto("/airport-detail");
    await page.goto("/route");

    // The app sets no cookie of its own: no session identifies this visitor.
    const cookies = await context.cookies();
    expect(cookies).toHaveLength(0);

    const storageKeys = await page.evaluate(() => ({
      local: Object.keys(window.localStorage),
      session: Object.keys(window.sessionStorage),
    }));

    for (const key of [...storageKeys.local, ...storageKeys.session]) {
      expect(key).not.toMatch(IDENTITY_KEY);
    }
  });
});
