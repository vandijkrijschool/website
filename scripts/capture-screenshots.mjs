import { spawn } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { homedir, tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

function findBrowser() {
  const candidates = [process.env.BROWSER_BIN, "/usr/bin/chromium", "/usr/bin/google-chrome"];
  const caches = [process.env.PLAYWRIGHT_BROWSERS_PATH, join(homedir(), ".cache", "ms-playwright"), "/home/codex/.cache/ms-playwright"];
  for (const cache of caches.filter(Boolean)) {
    if (!existsSync(cache)) continue;
    for (const entry of readdirSync(cache).sort().reverse()) {
      candidates.push(join(cache, entry, "chrome-linux64", "chrome"), join(cache, entry, "chrome-linux", "chrome"));
    }
  }
  return candidates.find((candidate) => candidate && existsSync(candidate));
}

const browser = findBrowser();
if (!browser) throw new Error("Geen headless Chromium gevonden; stel BROWSER_BIN in.");

const port = 43110;
const origin = `http://127.0.0.1:${port}`;
const outputDirectory = resolve("docs/screenshots");
const profile = mkdtempSync(join(tmpdir(), "vandijk-screenshots-"));
mkdirSync(outputDirectory, { recursive: true });

const pages = [
  ["homepage", "/"], ["tarieven", "/tarieven"], ["proefles", "/proefles"], ["configurator", "/configurator"],
  ["werkgebied", "/werkgebied"], ["regio-den-haag", "/rijschool-den-haag"], ["regio-delft", "/regio/delft"], ["regio-naaldwijk", "/regio/naaldwijk"],
];
const viewports = [["desktop", 1440, 900], ["mobile", 390, 844]];

const server = spawn(process.execPath, [".next/standalone/server.js"], {
  cwd: resolve("."),
  env: { ...process.env, APP_ENVIRONMENT: "production", APP_REVISION: "fedcba9876543210fedcba9876543210fedcba98", HOSTNAME: "127.0.0.1", NEXT_PUBLIC_SITE_URL: "https://voorbeeld.vandijkrijschool.nl", NEXT_PUBLIC_INDEXING_ENABLED: "false", PORT: String(port) },
  stdio: "ignore",
});
const chrome = spawn(browser, ["--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"], { stdio: "ignore" });

let socket;
try {
  let healthy = false;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      healthy = (await fetch(`${origin}/api/health`, { signal: AbortSignal.timeout(1_000) })).ok;
      if (healthy) break;
    } catch {}
    await delay(200);
  }
  if (!healthy) throw new Error("Standalone server werd niet op tijd gezond.");

  const portFile = join(profile, "DevToolsActivePort");
  for (let attempt = 0; attempt < 100 && !existsSync(portFile); attempt += 1) await delay(50);
  if (!existsSync(portFile)) throw new Error("Chromium DevTools-start duurde te lang.");
  const devtoolsPort = Number(readFileSync(portFile, "utf8").split("\n")[0]);
  const targets = await (await fetch(`http://127.0.0.1:${devtoolsPort}/json/list`)).json();
  const target = targets.find((item) => item.type === "page");
  if (!target) throw new Error("Geen Chromium-paginatarget gevonden.");

  socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolveOpen, rejectOpen) => {
    socket.addEventListener("open", resolveOpen, { once: true });
    socket.addEventListener("error", rejectOpen, { once: true });
  });

  let commandId = 0;
  const pending = new Map();
  const listeners = new Map();
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(String(event.data));
    if (message.id && pending.has(message.id)) {
      const { resolveResult, rejectResult } = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) rejectResult(new Error(message.error.message));
      else resolveResult(message.result);
      return;
    }
    for (const listener of listeners.get(message.method) ?? []) listener(message.params);
  });
  const send = (method, params = {}) => {
    const id = ++commandId;
    socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolveResult, rejectResult) => pending.set(id, { resolveResult, rejectResult }));
  };
  const once = (method, timeoutMs = 12_000) => new Promise((resolveEvent, rejectEvent) => {
    const handler = (params) => {
      clearTimeout(timer);
      listeners.set(method, (listeners.get(method) ?? []).filter((item) => item !== handler));
      resolveEvent(params);
    };
    const timer = setTimeout(() => rejectEvent(new Error(`${method} timeout`)), timeoutMs);
    listeners.set(method, [...(listeners.get(method) ?? []), handler]);
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  for (const [viewportName, width, height] of viewports) {
    await send("Emulation.clearDeviceMetricsOverride");
    for (const [pageName, route] of pages) {
      await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: viewportName === "mobile" });
      const loaded = once("Page.loadEventFired");
      await send("Page.navigate", { url: `${origin}${route}` });
      await loaded;
      await send("Runtime.evaluate", { expression: "window.scrollTo(0, 0)" });
      await delay(500);
      const { data } = await send("Page.captureScreenshot", { format: "png", fromSurface: true, captureBeyondViewport: false });
      writeFileSync(join(outputDirectory, `${pageName}-${viewportName}.png`), Buffer.from(data, "base64"));
    }
  }

  process.stdout.write(`PASS screenshots: ${pages.length * viewports.length} bestanden in docs/screenshots.\n`);
} finally {
  socket?.close();
  chrome.kill("SIGTERM");
  server.kill("SIGTERM");
  await Promise.all([
    Promise.race([new Promise((resolveExit) => chrome.once("exit", resolveExit)), delay(5_000).then(() => chrome.kill("SIGKILL"))]),
    Promise.race([new Promise((resolveExit) => server.once("exit", resolveExit)), delay(5_000).then(() => server.kill("SIGKILL"))]),
  ]);
  rmSync(profile, { recursive: true, force: true });
}
