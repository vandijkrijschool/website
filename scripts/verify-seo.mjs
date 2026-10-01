import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const definition = JSON.parse(await readFile(new URL("../data/sitemap.json", import.meta.url), "utf8"));
const prices = JSON.parse(await readFile(new URL("../data/pricing.json", import.meta.url), "utf8"));
const decode = (value) => value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const attributes = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)=["']([^"']*)["']/g)].map((match) => [match[1].toLowerCase(), decode(match[2])]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((match) => attributes(match[0]));
const meta = (html, name) => tags(html, "meta").filter((tag) => tag.name === name || tag.property === name).map((tag) => tag.content);
const canonicalFor = (path) => path === "/" ? definition.intendedOrigin : new URL(path, definition.intendedOrigin).href;

export async function verifySeo({ baseUrl, indexing = true, redirects = false }) {
  const origin = new URL(baseUrl).origin;
  const canonicalOrigin = definition.intendedOrigin;
  const paths = [...definition.routes, ...definition.excludedRoutes].map((route) => route.path);
  const excluded = new Set(definition.excludedRoutes.map((route) => route.path));
  const titles = new Set();
  const descriptions = new Set();
  const links = new Set();
  const images = new Set();
  const googlebot = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";

  async function request(path, userAgent = googlebot) {
    return fetch(new URL(path, origin), { redirect: "manual", headers: { "user-agent": userAgent }, signal: AbortSignal.timeout(15_000) });
  }

  function checkPage(html, response, path) {
    assert.equal(response.status, 200, `${path}: expected HTTP 200`);
    assert.match(response.headers.get("content-type") ?? "", /text\/html/i);
    assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /noindex|none/i, `${path}: HTTP header blocks indexing`);
    const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] ?? "";
    assert.match(head, /<title>/, `${path}: crawler receives no title in the HTML head`);
    const title = decode(head.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
    const description = meta(head, "description");
    assert.ok(title.length > 8 && title.length < 100, `${path}: missing or excessive title`);
    assert.equal(description.length, 1, `${path}: must have one description`);
    assert.ok(description[0].length >= 60 && description[0].length <= 200, `${path}: unusable description`);
    const canonicals = tags(head, "link").filter((tag) => tag.rel === "canonical");
    assert.deepEqual(canonicals.map((tag) => tag.href), [canonicalFor(path)], `${path}: incorrect or duplicate canonical`);
    assert.deepEqual(meta(head, "og:url"), [canonicalFor(path)], `${path}: incorrect Open Graph URL`);
    assert.equal(meta(head, "twitter:card")[0], "summary_large_image");
    const directives = [...meta(html, "robots"), ...meta(html, "googlebot")].join(", ");
    if (!indexing || excluded.has(path)) {
      assert.match(directives, /\bnoindex\b/, `${path}: should not be indexed`);
      if (indexing) assert.match(directives, /\bfollow\b/, `${path}: support-page links should remain followable`);
    } else {
      assert.match(directives, /\bindex\b/);
      assert.match(directives, /\bfollow\b/);
      assert.doesNotMatch(directives, /noindex|nofollow|none/, `${path}: crawler blocked`);
      assert.match(directives, /max-image-preview:\s*large/);
    }
    assert.doesNotMatch(head, /voorbeeld\.vandijkrijschool\.nl/, `${path}: stale metadata domain`);
    assert.match(html, /<html[^>]+lang="nl-NL"/);
    const body = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
    assert.equal((body.match(/<h1\b/g) ?? []).length, 1, `${path}: expected one H1`);
    assert.doesNotMatch(body, /NXTDRIVE|Needs verification|nog te bevestigen|veilige contactdemo|releasegate|schijnverzending|websiteprototype|demo-data/i, `${path}: internal or outdated copy`);
    const structured = [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].flatMap((match) => {
      const parsed = JSON.parse(match[1]);
      return Array.isArray(parsed) ? parsed : [parsed];
    });
    assert.ok(structured.some((entry) => entry["@type"] === "Organization" && entry["@id"] === `${canonicalOrigin}/#organization`), `${path}: missing organization identity`);
    assert.ok(structured.some((entry) => entry["@type"] === "WebSite" && entry.url === canonicalOrigin));
    assert.doesNotMatch(JSON.stringify(structured), /voorbeeld\.vandijkrijschool\.nl|AggregateRating|PostalAddress/, `${path}: stale or unsupported business claims`);
    if (path !== "/") assert.ok(structured.some((entry) => entry["@type"] === "BreadcrumbList" && entry.itemListElement.at(-1).item === canonicalFor(path)), `${path}: invalid breadcrumbs`);
    if (path === "/lespakketten") {
      const service = structured.find((entry) => entry["@id"] === `${canonicalOrigin}/lespakketten#service`);
      assert.deepEqual(service.offers.map((offer) => Number(offer.price) * 100), prices.starterPackages.map((item) => item.amount), "Structured prices must match the approved packages");
    }
    for (const image of meta(head, "og:image")) {
      assert.equal(new URL(image).origin, canonicalOrigin);
      images.add(new URL(image).pathname);
    }
    for (const image of tags(body, "img")) assert.ok(Object.hasOwn(image, "alt"), `${path}: image has no alt attribute`);
    return { title, description: description[0] };
  }

  for (const path of paths) {
    const response = await request(path);
    const html = await response.text();
    const page = checkPage(html, response, path);
    assert.equal(titles.has(page.title), false, `${path}: duplicate title`);
    assert.equal(descriptions.has(page.description), false, `${path}: duplicate description`);
    titles.add(page.title);
    descriptions.add(page.description);
    for (const { href } of tags(html, "a")) {
      if (!href || !href.startsWith("/") || href.startsWith("//")) continue;
      links.add(new URL(href, origin).pathname);
    }
  }
  for (const { path } of definition.routes) assert.ok(links.has(path), `${path}: orphan page without internal HTML links`);
  for (const path of links) {
    const response = await request(path);
    assert.ok(response.status === 200 || [301, 308].includes(response.status), `${path}: broken internal link (${response.status})`);
  }

  const sitemapResponse = await request("/sitemap.xml");
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemapResponse.headers.get("content-type") ?? "", /xml/);
  const xml = await sitemapResponse.text();
  const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((match) => match[1]);
  const urls = entries.map((entry) => decode(entry.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? ""));
  const expectedUrls = indexing ? definition.routes.map((route) => new URL(route.path, canonicalOrigin).href) : [];
  assert.deepEqual(urls.sort(), expectedUrls.sort(), "Sitemap must contain exactly the canonical indexable pages");
  for (const entry of entries) {
    const date = entry.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
    assert.equal(date, definition.lastModified, "Sitemap dates must reflect reviewed content updates");
    for (const match of entry.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)) {
      const image = new URL(decode(match[1]));
      assert.equal(image.origin, canonicalOrigin);
      images.add(image.pathname);
    }
  }
  for (const path of images) {
    const response = await request(path);
    assert.equal(response.status, 200, `${path}: missing sitemap/social image`);
    assert.match(response.headers.get("content-type") ?? "", /^image\//);
    await response.body?.cancel();
  }

  const robotsResponse = await request("/robots.txt");
  assert.equal(robotsResponse.status, 200);
  const robots = await robotsResponse.text();
  assert.match(robots, /Allow:\s*\/\s/);
  assert.doesNotMatch(robots, /Disallow:\s*\/(?:_next\/?)?\s*(?:\n|$)/);
  assert.match(robots, /Disallow:\s*\/api\//);
  if (indexing) assert.match(robots, new RegExp(`Sitemap: ${canonicalOrigin.replaceAll(".", "\\.")}/sitemap\\.xml`));
  else assert.doesNotMatch(robots, /Sitemap:/);
  const health = await request("/api/health");
  assert.match(health.headers.get("x-robots-tag") ?? "", /noindex/);

  for (const path of ["/proefles?pakket=all-in-one&utm_source=seo-check", "/regio/delft?utm_source=seo-check"]) {
    const response = await request(path);
    checkPage(await response.text(), response, path.split("?")[0]);
  }
  const bingResponse = await request("/", "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)");
  checkPage(await bingResponse.text(), bingResponse, "/");
  for (const path of ["/deze-route-bestaat-niet", "/regio/den-haag", "/regio/onbekend", "/configurator", "/reviews"]) {
    const response = await request(path);
    assert.equal(response.status, 404, `${path}: must not be a soft 404`);
    const html = await response.text();
    assert.match(meta(html, "robots").join(","), /noindex/, `${path}: 404 must not be indexed`);
    assert.equal(tags(html, "link").filter((tag) => tag.rel === "canonical").length, 0, `${path}: 404 must not canonicalize to the homepage`);
  }
  const slash = await request("/lespakketten/?utm_source=seo-check");
  assert.equal(slash.status, 308);
  assert.equal(new URL(slash.headers.get("location"), origin).pathname, "/lespakketten");
  if (redirects) {
    for (const oldOrigin of ["https://www.vandijkrijschool.nl", "https://voorbeeld.vandijkrijschool.nl", "http://vandijkrijschool.nl"]) {
      const path = "/regio/delft?utm_source=seo-check";
      const response = await fetch(oldOrigin + path, { redirect: "manual", signal: AbortSignal.timeout(15_000) });
      assert.ok([301, 308].includes(response.status));
      assert.equal(response.headers.get("location"), canonicalOrigin + path, "Domain redirect must preserve path and query");
    }
  }
  return `PASS SEO: ${paths.length} pages, ${urls.length} sitemap URLs, ${images.size} images, unique metadata, canonicals, robots, structured data, internal links, query URLs, Googlebot/Bingbot and 404s${redirects ? ", public domain redirects" : ""}.`;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  console.log(await verifySeo({
    baseUrl: process.env.SEO_CHECK_URL ?? definition.intendedOrigin,
    indexing: process.env.SEO_EXPECT_INDEXING !== "false",
    redirects: process.env.SEO_CHECK_REDIRECTS === "true",
  }));
}
