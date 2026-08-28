import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const routeFiles = [
  "app/page.tsx",
  "app/rijlessen/page.tsx",
  "app/lespakketten/page.tsx",
  "app/configurator/page.tsx",
  "app/proefles/page.tsx",
  "app/werkwijze/page.tsx",
  "app/over-ons/page.tsx",
  "app/reviews/page.tsx",
  "app/leerlingomgeving/page.tsx",
  "app/contact/page.tsx",
  "app/faq/page.tsx",
  "app/rijschool-den-haag/page.tsx",
  "app/regio/[slug]/page.tsx",
  "app/privacy/page.tsx",
  "app/voorwaarden/page.tsx",
];

const requiredAssets = [
  "public/images/hero-car.webp",
  "public/images/rijles-interieur.webp",
  "public/images/intake-instructor.webp",
  "public/images/locatie-hofvijver.webp",
  "public/images/locatie-scheveningen.webp",
  "public/images/locatie-vredespaleis.webp",
  "public/images/locatie-tablet.webp",
  "public/images/logo-stacked.jpg",
  "public/images/vd-mark.jpg",
  "public/og.png",
];

test("all agreed prototype routes have a filled source page", async () => {
  for (const file of routeFiles) {
    const source = await readFile(file, "utf8");
    assert.ok(source.length > 350, `${file} should contain a filled page`);
    assert.doesNotMatch(source, /lorem ipsum/i, `${file} contains placeholder copy`);
  }
});

test("all required brand and location imagery is packaged", async () => {
  await Promise.all(requiredAssets.map((file) => access(file)));
});

test("demo-only claims are explicitly labelled", async () => {
  const demoData = await readFile("app/lib/demo.ts", "utf8");
  const reviews = await readFile("app/reviews/page.tsx", "utf8");
  const contact = await readFile("app/contact/page.tsx", "utf8");
  const portal = await readFile("app/components/StudentPortalDemo.tsx", "utf8");
  assert.match(demoData, /demoReviews/);
  assert.match(reviews, /fictieve reviews/i);
  assert.match(contact, /voorbeeldgegevens/i);
  assert.match(portal, /fictief/i);
});

test("core interactive flows remain present", async () => {
  const configurator = await readFile("app/components/Configurator.tsx", "utf8");
  const booking = await readFile("app/components/TrialBookingWidget.tsx", "utf8");
  const form = await readFile("app/components/LeadForm.tsx", "utf8");
  const leadAdapter = await readFile("app/lib/leads.ts", "utf8");
  assert.match(configurator, /Lespakket configurator/);
  assert.match(configurator, /Math\.min\(4/);
  assert.match(booking, /Toon 3 momenten/);
  assert.match(form, /Demo-aanvraag controleren/);
  assert.match(leadAdapter, /DEMO-NXT-2048/);
  assert.match(booking, /slot-conflict/);
  assert.match(booking, /provider-error/);
  assert.match(booking, /timeout/);
});

test("all 18 content routes and system states are documented", async () => {
  const routes = await readFile("docs/ROUTES_AND_CONTENT.md", "utf8");
  const readme = await readFile("README.md", "utf8");
  assert.equal((routes.match(/^\| `\//gm) ?? []).length, 18);
  assert.match(readme, /18 gevulde (?:inhoudelijke )?routes/);
  assert.doesNotMatch(`${readme}\n${routes}`, /16 (?:gevulde|inhoudelijke|routes)/i);
  await Promise.all(["app/not-found.tsx", "app/loading.tsx", "app/error.tsx"].map((file) => access(file)));
});

test("public demo gates commercial schema and includes all routes in sitemap", async () => {
  const site = await readFile("app/lib/site.ts", "utf8");
  const sitemap = await readFile("app/sitemap.ts", "utf8");
  const pages = await Promise.all([
    "app/page.tsx",
    "app/lespakketten/page.tsx",
    "app/rijlessen/page.tsx",
    "app/rijschool-den-haag/page.tsx",
    "app/regio/[slug]/page.tsx",
  ].map((file) => readFile(file, "utf8")));
  assert.match(site, /COMMERCIAL_DATA_CONFIRMED/);
  pages.forEach((source) => assert.match(source, /isCommercialStructuredDataEnabled/));
  assert.match(sitemap, /leerlingomgeving/);
  assert.match(sitemap, /privacy/);
  assert.match(sitemap, /voorwaarden/);
});

test("compound controls include roving focus, Escape menu close and fixed-size checkboxes", async () => {
  const configurator = await readFile("app/components/Configurator.tsx", "utf8");
  const booking = await readFile("app/components/TrialBookingWidget.tsx", "utf8");
  const portal = await readFile("app/components/StudentPortalDemo.tsx", "utf8");
  const mobile = await readFile("app/components/MobileNav.tsx", "utf8");
  const css = await readFile("app/globals.css", "utf8");
  [configurator, booking, portal].forEach((source) => assert.match(source, /ArrowRight/));
  assert.match(mobile, /event\.key === "Escape"/);
  assert.match(mobile, /document\.body\.style\.overflow = "hidden"/);
  assert.match(css, /width: 20px; height: 20px; min-width: 20px; min-height: 20px/);
});

test("responsive and reduced-motion contracts are included", async () => {
  const css = await readFile("app/globals.css", "utf8");
  assert.match(css, /@media \(max-width: 1060px\)/);
  assert.match(css, /@media \(max-width: 820px\)/);
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.match(css, /@media \(max-width: 380px\)/);
  assert.match(css, /prefers-reduced-motion: reduce/);
});

test("public demo is indexable and exposes a sitemap", async () => {
  const layout = await readFile("app/layout.tsx", "utf8");
  const robots = await readFile("app/robots.ts", "utf8");
  assert.match(layout, /index: true/);
  assert.doesNotMatch(layout, /index: false/);
  assert.match(robots, /sitemap/);
});
