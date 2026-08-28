import assert from "node:assert/strict";
import test from "node:test";

const routes = [
  "/", "/rijlessen", "/lespakketten", "/configurator", "/proefles", "/werkwijze",
  "/over-ons", "/reviews", "/leerlingomgeving", "/contact", "/faq", "/rijschool-den-haag",
  "/regio/scheveningen", "/regio/rijswijk", "/regio/voorburg", "/regio/leidschendam",
  "/privacy", "/voorwaarden",
];
const routablePaths = new Set(routes);

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

async function fetchPage(path) {
  return worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function firstMatch(html, expression) {
  return expression.exec(html)?.[1] ?? "";
}

test("renders the Vinext preview shell and resolved homepage", async () => {
  const response = await fetchPage("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /__VINEXT_RSC_NAV__/);
  assert.match(html, /De snelste weg naar/);
});

test("all 18 routes render one H1, unique metadata, canonical and public indexing", async () => {
  const pages = await Promise.all(routes.map(async (route) => {
    const response = await fetchPage(route);
    assert.equal(response.status, 200, `${route} should render`);
    return { route, html: await response.text() };
  }));
  const titles = new Set();
  const descriptions = new Set();
  const canonicals = new Set();
  for (const { route, html } of pages) {
    const settledHtml = html.includes('<div hidden id="S:0">') ? html.slice(html.indexOf('<div hidden id="S:0">')) : html;
    assert.equal((settledHtml.match(/<h1\b/gi) ?? []).length, 1, `${route} should contain exactly one resolved-page H1`);
    assert.match(html, /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*index[^"']*follow/i, `${route} should be index,follow`);
    assert.doesNotMatch(html, /noindex/i, `${route} should not contain noindex`);
    const title = firstMatch(html, /<title>([^<]+)<\/title>/i);
    const description = firstMatch(html, /<meta(?=[^>]*name=["']description["'])(?=[^>]*content=["']([^"']+)["'])[^>]*>/i);
    const canonical = firstMatch(html, /<link(?=[^>]*rel=["']canonical["'])(?=[^>]*href=["']([^"']+)["'])[^>]*>/i);
    assert.ok(title && description && canonical, `${route} metadata should be complete`);
    titles.add(title);
    descriptions.add(description);
    canonicals.add(canonical);
  }
  assert.equal(titles.size, routes.length);
  assert.equal(descriptions.size, routes.length);
  assert.equal(canonicals.size, routes.length);
});

test("rendered internal anchor links resolve to known content routes", async () => {
  const pages = await Promise.all(routes.map(async (route) => ({ route, html: await (await fetchPage(route)).text() })));
  for (const { route, html } of pages) {
    const anchors = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)].map((match) => match[1]);
    for (const href of anchors) {
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const path = href.split(/[?#]/)[0] || route;
      assert.ok(routablePaths.has(path), `${route} links to unknown route ${href}`);
    }
  }
});

test("prototype HTML omits commercial Product, Offer and Service schema", async () => {
  for (const route of ["/", "/lespakketten", "/rijlessen", "/rijschool-den-haag", "/regio/scheveningen"]) {
    const html = await (await fetchPage(route)).text();
    const jsonLd = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => match[1]).join("\n");
    assert.doesNotMatch(jsonLd, /"@type":"(?:Product|Offer|Service)"/, `${route} should gate commercial schema in prototype mode`);
  }
});

test("unknown routes return the branded 404", async () => {
  const response = await fetchPage("/deze-route-bestaat-niet");
  assert.equal(response.status, 404);
  assert.match(await response.text(), /Deze route bestaat niet/i);
});
