import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";

const port = 43108;
const origin = `http://127.0.0.1:${port}`;
const revision = "0123456789abcdef0123456789abcdef01234567";
const output = [];
const routes = [
  "/", "/rijlessen", "/lespakketten", "/configurator", "/proefles", "/werkwijze",
  "/over-ons", "/reviews", "/leerlingomgeving", "/contact", "/faq", "/rijschool-den-haag",
  "/regio/scheveningen", "/regio/rijswijk", "/regio/voorburg", "/regio/leidschendam",
  "/privacy", "/voorwaarden",
];

const server = spawn(process.execPath, [".next/standalone/server.js"], {
  cwd: new URL("..", import.meta.url),
  env: {
    ...process.env,
    APP_ENVIRONMENT: "production",
    APP_REVISION: revision,
    HOSTNAME: "127.0.0.1",
    NEXT_PUBLIC_SITE_URL: "https://voorbeeld.vandijkrijschool.nl",
    PORT: String(port),
  },
  stdio: ["ignore", "pipe", "pipe"],
});

for (const stream of [server.stdout, server.stderr]) {
  stream.on("data", (chunk) => {
    if (output.join("").length < 12_000) output.push(String(chunk));
  });
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
  assert.deepEqual(await health.json(), {
    status: "ok",
    service: "vandijkrijschool",
    environment: "production",
    revision,
  });

  for (const path of routes) {
    const response = await fetch(`${origin}${path}`, { signal: AbortSignal.timeout(5_000) });
    assert.equal(response.status, 200, `${path} returned ${response.status}`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html/i, `${path} did not return HTML`);
    const html = await response.text();
    const settledHtml = html.includes('<div hidden id="S:0">')
      ? html.slice(html.indexOf('<div hidden id="S:0">'))
      : html;
    assert.match(settledHtml, /Van Dijk Rijschool/i, `${path} did not render the site`);
    assert.equal((settledHtml.match(/<h1\b/gi) ?? []).length, 1, `${path} should render one resolved-page H1`);
    assert.match(html, /<link[^>]+rel=["']canonical["']/i, `${path} has no canonical URL`);
  }

  const sitemap = await fetch(`${origin}/sitemap.xml`);
  assert.equal(sitemap.status, 200);
  const sitemapBody = await sitemap.text();
  for (const path of routes) {
    assert.match(sitemapBody, new RegExp(`<loc>https://voorbeeld\\.vandijkrijschool\\.nl${path === "/" ? "/" : path}</loc>`));
  }

  const robots = await fetch(`${origin}/robots.txt`);
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /Sitemap: https:\/\/voorbeeld\.vandijkrijschool\.nl\/sitemap\.xml/);

  const missing = await fetch(`${origin}/deze-route-bestaat-niet`);
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /Deze route bestaat niet/i);

  process.stdout.write("Standalone health, routes, metadata, sitemap, robots and 404 validation passed.\n");
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
