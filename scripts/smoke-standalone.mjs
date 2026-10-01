import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";
import { verifySeo } from "./verify-seo.mjs";

const port = 43108;
const origin = `http://127.0.0.1:${port}`;
const revision = "0123456789abcdef0123456789abcdef01234567";
const indexing = process.env.SEO_EXPECT_INDEXING !== "false";
const output = [];
const server = spawn(process.execPath, [".next/standalone/server.js"], {
  cwd: new URL("..", import.meta.url),
  env: {
    ...process.env,
    APP_ENVIRONMENT: "production",
    APP_REVISION: revision,
    HOSTNAME: "127.0.0.1",
    NEXT_PUBLIC_SITE_URL: "https://vandijkrijschool.nl",
    NEXT_PUBLIC_INDEXING_ENABLED: String(indexing),
    PORT: String(port),
  },
  stdio: ["ignore", "pipe", "pipe"],
});
for (const stream of [server.stdout, server.stderr]) {
  stream.on("data", (chunk) => { if (output.join("").length < 12_000) output.push(String(chunk)); });
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
  console.log(await verifySeo({ baseUrl: origin, indexing }));
} catch (error) {
  console.error(error, output.join("").slice(0, 12_000));
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    delay(5_000).then(() => { if (server.exitCode === null) server.kill("SIGKILL"); }),
  ]);
}
