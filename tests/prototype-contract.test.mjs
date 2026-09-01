import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const json = async (file) => JSON.parse(await readFile(file, "utf8"));
const sitemap = await json("data/sitemap.json");
const regions = await json("data/regions.json");
const pricing = await json("data/pricing.json");
const assets = await json("data/assets.json");

const contentRouteFiles = [
  "app/page.tsx", "app/rijlessen/page.tsx", "app/lespakketten/page.tsx", "app/tarieven/page.tsx",
  "app/configurator/page.tsx", "app/proefles/page.tsx", "app/theorie/page.tsx", "app/werkwijze/page.tsx",
  "app/over-ons/page.tsx", "app/faq/page.tsx", "app/contact/page.tsx", "app/werkgebied/page.tsx",
  "app/rijschool-den-haag/page.tsx", "app/regio/[slug]/page.tsx", "app/reviews/page.tsx",
  "app/leerlingomgeving/page.tsx", "app/privacy/page.tsx", "app/voorwaarden/page.tsx",
];

test("central data defines exactly 17 regions and 29 indexable routes", () => {
  assert.equal(regions.count, 17);
  assert.equal(regions.regions.length, 17);
  assert.equal(new Set(regions.regions.map((region) => region.slug)).size, 17);
  assert.equal(new Set(regions.regions.map((region) => region.canonicalPath)).size, 17);
  assert.equal(sitemap.expectedIndexableCount, 29);
  assert.equal(sitemap.routes.length, 29);
  assert.equal(new Set(sitemap.routes.map((route) => route.path)).size, 29);
  assert.equal(sitemap.routes.filter((route) => route.path.startsWith("/regio/")).length, 16);
  assert.ok(sitemap.routes.some((route) => route.path === "/rijschool-den-haag"));
  assert.ok(!sitemap.routes.some((route) => route.path === "/regio/den-haag"));
});

test("sitemap excludes every noindex support route and unsafe URL shape", () => {
  const paths = sitemap.routes.map((route) => route.path);
  for (const route of sitemap.excludedRoutes) {
    assert.equal(route.robots, "noindex,follow");
    assert.ok(!paths.includes(route.path));
  }
  for (const path of paths) {
    assert.ok(path.startsWith("/"));
    assert.ok(!path.includes("?"));
  }
});

test("all 33 content routes are represented by filled route sources", async () => {
  assert.equal(sitemap.routes.length + sitemap.excludedRoutes.length, 33);
  for (const file of contentRouteFiles) {
    const source = await readFile(file, "utf8");
    assert.ok(source.length > 300, `${file} should contain a filled page`);
    assert.doesNotMatch(source, /lorem ipsum/i);
  }
});

test("all five starter packages contain required cent fields and exact source prices", () => {
  assert.deepEqual(pricing.starterPackages.map((item) => item.amount), [143100, 197600, 251100, 303600, 253300]);
  for (const item of pricing.starterPackages) {
    assert.ok(item.id && item.name);
    assert.ok(Number.isInteger(item.amount));
    assert.ok(Number.isInteger(item.lessonCount));
    assert.ok(item.includes.length >= 4);
  }
  assert.equal(pricing.singleRates.find((rate) => rate.id === "registration-fee").amount, 3950);
  assert.equal(pricing.singleRates.find((rate) => rate.id === "driveyou-guarantee-fund").amount, 4150);
});

test("every manifested region image has four web variants and an OG crop", async () => {
  const imageBases = new Set([
    ...assets.general.map((item) => item.imageBase),
    ...regions.regions.map((item) => item.imageBase),
    ...assets.extraLocationImages.map((item) => item.imageBase),
  ]);
  assert.equal(imageBases.size, 23);
  for (const imageBase of imageBases) {
    for (const width of assets.responsiveWidths) {
      const file = `public/images/${imageBase}-${width}.webp`;
      await access(file);
      assert.ok((await stat(file)).size > 0, `${file} is empty`);
    }
  }
  for (const region of regions.regions) {
    const file = `public/images/og/${region.imageBase}-og-1200x630.jpg`;
    await access(file);
    assert.ok((await stat(file)).size > 0, `${file} is empty`);
  }
  await access("public/images/og/van-dijk-rijschool-og-1200x630.jpg");
});

test("demo identities and legal support pages stay noindex and out of schema", async () => {
  for (const file of ["app/reviews/page.tsx", "app/leerlingomgeving/page.tsx", "app/privacy/page.tsx", "app/voorwaarden/page.tsx"]) {
    assert.match(await readFile(file, "utf8"), /noIndex: true/);
  }
  const layout = await readFile("app/layout.tsx", "utf8");
  const reviews = await readFile("app/reviews/page.tsx", "utf8");
  assert.doesNotMatch(`${layout}\n${reviews}`, /"@type":\s*"(?:Review|AggregateRating)"/);
  assert.doesNotMatch(layout, /PostalAddress|telephone|sameAs/);
});

test("metadata, sitemap and launch gate are centralized and fail closed", async () => {
  const site = await readFile("app/lib/site.ts", "utf8");
  const layout = await readFile("app/layout.tsx", "utf8");
  const sitemapSource = await readFile("app/sitemap.ts", "utf8");
  assert.match(site, /validateProductionOrigin/);
  assert.match(site, /isIndexingEnabled/);
  assert.match(layout, /index: false, follow: false/);
  assert.match(sitemapSource, /sitemapDefinition\.routes/);
  assert.doesNotMatch(sitemapSource, /new Date/);
  assert.doesNotMatch(layout, /keywords:/);
});

test("interactive flows preserve full state, cent costs and startmoment", async () => {
  const configurator = await readFile("app/components/Configurator.tsx", "utf8");
  const booking = await readFile("app/components/TrialBookingWidget.tsx", "utf8");
  const form = await readFile("app/components/LeadForm.tsx", "utf8");
  assert.match(configurator, /serializeConfiguratorState/);
  assert.match(configurator, /possibleAdditionalCosts/);
  assert.doesNotMatch(configurator, /sessionMinutes|appointments|weeks/);
  assert.match(booking, /Bevestig dit demomoment/);
  assert.match(booking, /slot-conflict/);
  assert.match(form, /startmoment/);
  assert.match(form, /preferredDayParts/);
  assert.match(form, /selectedSlot/);
  assert.match(form, /configurator/);
});

test("source and runtime code contain no placeholder host, old packages or wrong image references", async () => {
  const files = [
    ...contentRouteFiles,
    "app/layout.tsx", "app/lib/site.ts", "app/lib/content.ts", "app/lib/configurator.ts",
    "app/components/Marketing.tsx", "app/components/Configurator.tsx", "app/components/SiteChrome.tsx",
    "scripts/smoke-standalone.mjs", "scripts/validate-production-env.mjs", ".github/workflows/deploy-production.yml",
  ];
  const source = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");
  assert.doesNotMatch(source, /voorbeeld\.vandijkrijschool\.nl/);
  assert.doesNotMatch(source, /Instappakket|Meest gekozen|Zeker Slagen|Gratis herexamen/);
  assert.doesNotMatch(source, /hero-car\.webp|den-haag-drive\.webp|scheveningen-drive\.webp|intake-instructor\.webp|\/og\.png/);
});

test("responsive, keyboard and reduced-motion quality gates are wired into check and deploy", async () => {
  const css = await readFile("app/globals.css", "utf8");
  const mobile = await readFile("app/components/MobileNav.tsx", "utf8");
  const packageJson = JSON.parse(await readFile("package.json", "utf8"));
  const workflow = await readFile(".github/workflows/deploy-production.yml", "utf8");
  assert.match(css, /overflow-x: visible/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /width: 20px; height: 20px; min-width: 20px; min-height: 20px/);
  assert.match(mobile, /event\.key === "Escape"/);
  assert.match(packageJson.scripts.check, /test:browser/);
  assert.match(workflow, /npm run test:browser/);
  assert.match(workflow, /NEXT_PUBLIC_INDEXING_ENABLED: "false"/);
  assert.match(workflow, /https:\/\/vandijkrijschool\.nl/);
});
