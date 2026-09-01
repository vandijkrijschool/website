import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

const port = 43109;
const origin = `http://127.0.0.1:${port}`;
const revision = "fedcba9876543210fedcba9876543210fedcba98";
const output = [];

const server = spawn(process.execPath, [".next/standalone/server.js"], {
  cwd: new URL("..", import.meta.url),
  env: {
    ...process.env,
    APP_ENVIRONMENT: "production",
    APP_REVISION: revision,
    HOSTNAME: "127.0.0.1",
    NEXT_PUBLIC_SITE_URL: "https://voorbeeld.vandijkrijschool.nl",
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

try {
  let healthy = false;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    if (server.exitCode !== null) throw new Error("Standalone server stopte vóór browser-QA.");
    try {
      const response = await fetch(`${origin}/api/health`, { signal: AbortSignal.timeout(1_500) });
      healthy = response.ok;
      if (healthy) break;
    } catch {}
    await delay(200);
  }
  if (!healthy) throw new Error("Standalone server werd niet op tijd gezond voor browser-QA.");

  const qa = spawn(process.execPath, ["scripts/browser-qa.mjs"], {
    cwd: new URL("..", import.meta.url),
    env: { ...process.env, BROWSER_QA_URL: origin },
    stdio: "inherit",
  });
  const exitCode = await new Promise((resolve) => qa.once("exit", resolve));
  if (exitCode !== 0) process.exitCode = typeof exitCode === "number" ? exitCode : 1;
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.stack : String(error)}\n${output.join("")}\n`);
  process.exitCode = 1;
} finally {
  server.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => server.once("exit", resolve)),
    delay(5_000).then(() => server.kill("SIGKILL")),
  ]);
}
