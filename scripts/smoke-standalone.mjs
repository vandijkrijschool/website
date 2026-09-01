import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { setTimeout as delay } from "node:timers/promises";

const port = 43108;
const origin = `http://127.0.0.1:${port}`;
const publicOrigin = "https://voorbeeld.vandijkrijschool.nl";
const revision = "0123456789abcdef0123456789abcdef01234567";
const output = [];
const sitemapDefinition = JSON.parse(await readFile(new URL("../data/sitemap.json", import.meta.url), "utf8"));
const routes = [
  ...sitemapDefinition.routes.map((route) => route.path),
  ...sitemapDefinition.excludedRoutes.map((route) => route.path),
];

assert.equal(routes.length, 33, "the full content route set must contain 33 routes");

const server = spawn(process.execPath, [".next/standalone/server.js"], {
  cwd: new URL("..", import.meta.url),
  env: {
    ...process.env,
    APP_ENVIRONMENT: "production",
    APP_REVISION: revision,
    HOSTNAME: "127.0.0.1",
    NEXT_PUBLIC_SITE_URL: publicOrigin,
    NEXT_PUBLIC_INDEXING_ENABLED: "false",
    PORT: String(port),
  },
  stdio: ["ignore", "pipe", "pipe"],
});

for (const stream of [server.stdout, server.stderr]) {
  stream.on("data", (chunk) => {
    if (output.join("").length < 12_000) output.push(String(chunk));
  });
}

function htmlAttribute(html, pattern) {
  return html.match(pattern)?.[1]?.trim() ?? "";
}

function internalPaths(html) {
  return [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((href) => href.startsWith("/"))
    .map((href) => new URL(href, origin).pathname);
}

try {
  let health;
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (server.exitCode !== null) throw new Error("Standalone server exited before it became healthy.");
    try {
      health = await fetch(`${origin}/api/health`, { signal: AbortSignal.timeout(1_500) });
      if (health.ok) break;
    } catch {}
    await delay(250);
  }

  assert.equal(health?.status, 200, "health endpoint did not become ready");
  assert.deepEqual(await health.json(), { status: "ok", service: "vandijkrijschool", environment: "production", revision });

  const titles = new Set();
  const descriptions = new Set();
  const crawledLinks = new Set();
  for (const path of routes) {
    const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(8_000) });
    assert.equal(response.status, 200, `${path} returned ${response.status}`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html/i, `${path} did not return HTML`);
    const html = await response.text();
    const settledHtml = html.includes('<div hidden id="S:0">') ? html.slice(html.indexOf('<div hidden id="S:0">')) : html;
    assert.match(settledHtml, /Van Dijk Rijschool/i, `${path} did not render the brand`);
    assert.equal((settledHtml.match(/<h1\b/gi) ?? []).length, 1, `${path} should render one resolved-page H1`);
    const canonical = htmlAttribute(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
      || htmlAttribute(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
    const expectedCanonical = path === "/" ? publicOrigin : new URL(path, publicOrigin).toString();
    assert.equal(canonical, expectedCanonical, `${path} has the wrong canonical`);
    const title = htmlAttribute(html, /<title>([^<]+)<\/title>/i);
    const description = htmlAttribute(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)
      || htmlAttribute(html, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i);
    assert.ok(title, `${path} has no title`);
    assert.ok(description, `${path} has no description`);
    assert.equal(titles.has(title), false, `${path} duplicates title: ${title}`);
    assert.equal(descriptions.has(description), false, `${path} duplicates description`);
    titles.add(title);
    descriptions.add(description);
    assert.match(html, /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i, `${path} must fail closed while indexing is disabled`);
    for (const link of internalPaths(html)) crawledLinks.add(link);
  }

  for (const path of crawledLinks) {
    const response = await fetch(`${origin}${path}`, { redirect: "manual", signal: AbortSignal.timeout(8_000) });
    assert.ok(response.status === 200 || [301, 302, 307, 308].includes(response.status), `internal link ${path} returned ${response.status}`);
  }

  const sitemap = await fetch(`${origin}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  const sitemapBody = await sitemap.text();
  assert.equal((sitemapBody.match(/<url>/g) ?? []).length, 0, "launch-gated build must not expose indexable sitemap URLs");

  const robots = await fetch(`${origin}/robots.txt`);
  assert.equal(robots.status, 200);
  const robotsBody = await robots.text();
  assert.doesNotMatch(robotsBody, /Disallow:\s*\/(?:_next)?/i);
  assert.doesNotMatch(robotsBody, /Sitemap:/i, "launch-gated build must not advertise a production sitemap");

  for (const path of ["/deze-route-bestaat-niet", "/regio/den-haag", "/regio/onbekend"]) {
    const missing = await fetch(`${origin}${path}`);
    assert.equal(missing.status, 404, `${path} should return 404`);
  }

  process.stdout.write(`PASS standalone: ${routes.length} routes, ${crawledLinks.size} internal links, metadata, noindex gate, empty launch sitemap, robots and 404s.\n`);
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n`);
  process.stderr.write(output.join("").slice(0, 12_000));
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    delay(5_000).then(() => server.kill("SIGKILL")),
  ]);
}
