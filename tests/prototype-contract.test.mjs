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
  "app/proefles/page.tsx", "app/theorie/page.tsx", "app/werkwijze/page.tsx", "app/over-ons/page.tsx",
  "app/faq/page.tsx", "app/contact/page.tsx", "app/werkgebied/page.tsx", "app/rijschool-den-haag/page.tsx",
  "app/regio/[slug]/page.tsx", "app/leerlingomgeving/page.tsx", "app/privacy/page.tsx", "app/voorwaarden/page.tsx",
];

test("central data defines exactly 17 regions and 28 indexable routes", () => {
  assert.equal(regions.count, 17);
  assert.equal(regions.regions.length, 17);
  assert.equal(new Set(regions.regions.map((region) => region.slug)).size, 17);
  assert.equal(new Set(regions.regions.map((region) => region.canonicalPath)).size, 17);
  assert.equal(sitemap.expectedIndexableCount, 28);
  assert.equal(sitemap.routes.length, 28);
  assert.equal(new Set(sitemap.routes.map((route) => route.path)).size, 28);
  assert.equal(sitemap.routes.filter((route) => route.path.startsWith("/regio/")).length, 16);
  assert.ok(sitemap.routes.some((route) => route.path === "/rijschool-den-haag"));
  assert.ok(!sitemap.routes.some((route) => route.path === "/configurator"));
});

test("sitemap excludes noindex support routes and unsafe URL shapes", () => {
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

test("all public content routes contain real copy", async () => {
  assert.equal(sitemap.routes.length + sitemap.excludedRoutes.length, 31);
  for (const file of contentRouteFiles) {
    const source = await readFile(file, "utf8");
    assert.ok(source.length > 300, `${file} should contain a filled page`);
    assert.doesNotMatch(source, /lorem ipsum/i);
  }
});

test("removed generator and fictional review routes stay absent", async () => {
  await assert.rejects(access("app/configurator/page.tsx"));
  await assert.rejects(access("app/components/Configurator.tsx"));
  await assert.rejects(access("app/reviews/page.tsx"));
  await assert.rejects(access("app/components/StudentPortalDemo.tsx"));
});

test("all five starter packages retain the approved prices", () => {
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
});

test("support pages stay noindex and business schema uses confirmed details", async () => {
  for (const file of ["app/leerlingomgeving/page.tsx", "app/privacy/page.tsx", "app/voorwaarden/page.tsx"]) {
    assert.match(await readFile(file, "utf8"), /noIndex: true/);
  }
  const layout = await readFile("app/layout.tsx", "utf8");
  assert.match(layout, /telephone:/);
  assert.match(layout, /email:/);
  assert.match(layout, /taxID:/);
  assert.match(layout, /vatID:/);
  assert.doesNotMatch(layout, /Review|AggregateRating|PostalAddress/);
});

test("customer-facing copy is consistent with final client feedback", async () => {
  const files = [
    ...contentRouteFiles,
    "app/components/Marketing.tsx", "app/components/RegionPage.tsx", "app/components/SiteChrome.tsx",
    "app/components/LeadForm.tsx", "app/lib/content.ts", "data/assets.json", "data/pricing.json", "data/site-facts.json",
  ];
  const source = (await Promise.all(files.map((file) => readFile(file, "utf8")))).join("\n");
  assert.doesNotMatch(source, /NXTDRIVE|60 minuten|45 rijlessen|info@voorbeeld|Voorbeeldlaan|demo-validated|pakketconfigurator/i);
  for (const value of ["PlanGo", "50 minuten", "43 lesuren", "06 18 24 04 96", "info@vandijkrijschool.nl", "NL005520090B44"]) {
    assert.match(source, new RegExp(value, "i"));
  }
});

test("Alles-in-1 is visibly featured and package cards show only the package price", async () => {
  const home = await readFile("app/page.tsx", "utf8");
  const marketing = await readFile("app/components/Marketing.tsx", "utf8");
  assert.match(home, /section--all-in-one/);
  assert.match(home, /Compleet uitgelicht/);
  assert.match(marketing, /package-card--featured/);
  assert.doesNotMatch(marketing, /Pakketprijs|package-card__fee-note/);
});

test("metadata, responsive behavior and deployment gates remain wired", async () => {
  const site = await readFile("app/lib/site.ts", "utf8");
  const layout = await readFile("app/layout.tsx", "utf8");
  const css = await readFile("app/globals.css", "utf8");
  const mobile = await readFile("app/components/MobileNav.tsx", "utf8");
  const packageJson = JSON.parse(await readFile("package.json", "utf8"));
  const workflow = await readFile(".github/workflows/deploy-production.yml", "utf8");
  assert.match(site, /validateProductionOrigin/);
  assert.match(layout, /index: false, follow: false/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(mobile, /event\.key === "Escape"/);
  assert.match(packageJson.scripts.check, /test:browser/);
  assert.match(workflow, /npm run test:browser/);
  assert.match(workflow, /NEXT_PUBLIC_INDEXING_ENABLED: "false"/);
  assert.match(workflow, /LEAD_SMTP_HOSTS: mail\.mijndomein\.nl/);
  assert.match(workflow, /LEAD_SMTP_PORT: "587"/);
  assert.match(workflow, /LEAD_SMTP_USER: noreply@vandijkrijschool\.nl/);
  assert.match(workflow, /npm run verify:smtp/);
  assert.match(workflow, /https:\/\/voorbeeld\.vandijkrijschool\.nl/);
});
