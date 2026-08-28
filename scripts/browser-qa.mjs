import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const baseUrl = process.env.BROWSER_QA_URL ?? "http://localhost:3000";

function findBrowser() {
  const candidates = [process.env.BROWSER_BIN, "/usr/bin/chromium", "/usr/bin/google-chrome"];
  const cache = "/home/codex/.cache/ms-playwright";
  if (existsSync(cache)) {
    for (const entry of readdirSync(cache).sort().reverse()) {
      candidates.push(join(cache, entry, "chrome-linux64", "chrome"), join(cache, entry, "chrome-linux", "chrome"));
    }
  }
  return candidates.find((candidate) => candidate && existsSync(candidate));
}

const browser = findBrowser();
if (!browser) throw new Error("Geen headless Chromium gevonden; stel BROWSER_BIN in.");

const profile = mkdtempSync(join(tmpdir(), "vandijk-browser-qa-"));
const chrome = spawn(browser, [
  "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
  "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank",
], { stdio: "ignore" });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function devtoolsPort() {
  const file = join(profile, "DevToolsActivePort");
  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (existsSync(file)) return Number(readFileSync(file, "utf8").split("\n")[0]);
    await delay(50);
  }
  throw new Error("Chromium DevTools-start duurde te lang.");
}

const port = await devtoolsPort();
const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const target = targets.find((item) => item.type === "page");
if (!target) throw new Error("Geen Chromium-paginatarget gevonden.");

const socket = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let commandId = 0;
const pending = new Map();
const listeners = new Map();
const consoleProblems = [];

socket.addEventListener("message", (event) => {
  const message = JSON.parse(String(event.data));
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
    return;
  }
  if (message.method === "Runtime.exceptionThrown" || message.method === "Log.entryAdded") consoleProblems.push(message);
  for (const listener of listeners.get(message.method) ?? []) listener(message.params);
});

function send(method, params = {}) {
  const id = ++commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

function once(method, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const handler = (params) => {
      clearTimeout(timer);
      listeners.set(method, (listeners.get(method) ?? []).filter((item) => item !== handler));
      resolve(params);
    };
    const timer = setTimeout(() => reject(new Error(`${method} timeout`)), timeoutMs);
    listeners.set(method, [...(listeners.get(method) ?? []), handler]);
  });
}

async function evaluate(expression) {
  const result = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function navigate(path, viewport) {
  consoleProblems.length = 0;
  await send("Emulation.setDeviceMetricsOverride", { width: viewport.width, height: viewport.height, deviceScaleFactor: 1, mobile: false });
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url: `${baseUrl}${path}` });
  await loaded;
  let settled = false;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    settled = await evaluate("!document.querySelector('main.route-state') && document.querySelectorAll('main:not(.route-state) h1').length === 1");
    if (settled) break;
    await delay(50);
  }
  assert.equal(settled, true, `${path} bleef in de loading-state staan`);
  await delay(100);
}

await send("Page.enable");
await send("Runtime.enable");
await send("Log.enable");

const viewports = [
  { width: 360, height: 800 }, { width: 390, height: 844 }, { width: 768, height: 1024 },
  { width: 820, height: 1180 }, { width: 1024, height: 768 }, { width: 1280, height: 800 },
  { width: 1440, height: 900 }, { width: 720, height: 450, label: "1440×900 bij 200% zoom" },
];
const publicRoutes = [
  "/", "/configurator", "/proefles", "/contact", "/leerlingomgeving", "/rijlessen",
  "/lespakketten", "/werkwijze", "/over-ons", "/reviews", "/faq", "/rijschool-den-haag",
  "/regio/scheveningen", "/regio/rijswijk", "/regio/voorburg", "/regio/leidschendam",
  "/privacy", "/voorwaarden",
];

try {
  for (const viewport of viewports) {
    for (const route of publicRoutes) {
      await navigate(route, viewport);
      const state = await evaluate(`(() => {
        const previousBehavior = document.documentElement.style.scrollBehavior;
        document.documentElement.style.scrollBehavior = "auto";
        window.scrollTo(document.documentElement.scrollWidth, window.scrollY);
        const horizontalTravel = window.scrollX;
        window.scrollTo(0, window.scrollY);
        document.documentElement.style.scrollBehavior = previousBehavior;
        const splitHeadingWords = [...document.querySelectorAll("h1,h2")].flatMap((heading) => {
          const splitWords = [];
          const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
          let node = walker.nextNode();
          while (node) {
            for (const match of node.data.matchAll(/[\\p{L}\\p{N}]+/gu)) {
              const range = document.createRange();
              range.setStart(node, match.index);
              range.setEnd(node, match.index + match[0].length);
              const lineTops = new Set([...range.getClientRects()].filter((rect) => rect.width > 0).map((rect) => Math.round(rect.top)));
              if (lineTops.size > 1) splitWords.push({ word: match[0], heading: heading.textContent.trim() });
            }
            node = walker.nextNode();
          }
          return splitWords;
        });
        return {
          width: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
          bodyScrollWidth: document.body.scrollWidth,
          innerWidth: window.innerWidth,
          horizontalTravel,
          splitHeadingWords,
          overflowingHeadings: [...document.querySelectorAll("h1,h2")].filter((heading) => heading.scrollWidth > heading.clientWidth + 1).map((heading) => heading.textContent.trim()),
          h1: document.querySelectorAll('main h1').length,
          brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src),
          overflowers: [...document.querySelectorAll('body *')].map((element) => ({ element, rect: element.getBoundingClientRect() })).filter(({ rect }) => rect.width > 0 && (rect.right > document.documentElement.clientWidth + 1 || rect.left < -1)).slice(0, 12).map(({ element, rect }) => ({ tag: element.tagName, className: String(element.className), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) })),
          overflowingBoxes: [...document.querySelectorAll('body *')].filter((element) => element.scrollWidth > element.clientWidth + 1).slice(0, 12).map((element) => ({ tag: element.tagName, className: String(element.className), clientWidth: element.clientWidth, scrollWidth: element.scrollWidth, overflowX: getComputedStyle(element).overflowX })),
        };
      })()`);
      const viewportLabel = viewport.label ?? `${viewport.width}px`;
      assert.ok(state.horizontalTravel <= 1, `${route} overflowt op ${viewportLabel}: ${JSON.stringify(state)}`);
      assert.deepEqual(state.overflowingHeadings, [], `${route} heeft een te brede headline op ${viewportLabel}: ${JSON.stringify(state.overflowingHeadings)}`);
      assert.deepEqual(state.splitHeadingWords, [], `${route} breekt woorden middenin af op ${viewportLabel}: ${JSON.stringify(state.splitHeadingWords)}`);
      assert.equal(state.h1, 1, `${route} heeft niet precies één H1 in de uiteindelijke DOM`);
      assert.deepEqual(state.brokenImages, [], `${route} heeft ontbrekende beelden`);
      assert.equal(consoleProblems.length, 0, `${route} geeft browser-/consolefouten op ${viewportLabel}: ${JSON.stringify(consoleProblems)}`);
    }
  }

  await navigate("/", { width: 390, height: 844 });
  const menu = await evaluate(`(async () => {
    const toggle = document.querySelector('.mobile-nav__toggle');
    toggle.click(); await new Promise((resolve) => setTimeout(resolve, 150));
    const opened = toggle.getAttribute('aria-expanded') === 'true' && document.body.style.overflow === 'hidden';
    document.querySelector('.mobile-nav__panel').dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 30));
    return { opened, closed: toggle.getAttribute('aria-expanded') === 'false' && document.body.style.overflow !== 'hidden' };
  })()`);
  assert.deepEqual(menu, { opened: true, closed: true });

  await navigate("/leerlingomgeving", { width: 390, height: 844 });
  const tabs = await evaluate(`(async () => {
    const agenda = document.querySelector('#portal-tab-agenda'); agenda.click();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    agenda.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    return document.querySelector('#portal-tab-voortgang').getAttribute('aria-selected');
  })()`);
  assert.equal(tabs, "true");

  await evaluate("sessionStorage.clear()");
  await navigate("/configurator", { width: 390, height: 844 });
  const configurator = await evaluate(`(async () => {
    document.querySelector('[aria-label="Rijervaring"] [role="radio"]').click();
    document.querySelector('[aria-label="Zelfvertrouwen"] [role="radio"]').click();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    [...document.querySelectorAll('button')].find((button) => button.textContent.includes('Volgende stap')).click();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    return document.body.textContent.includes('Hoe wil je jouw rijopleiding plannen?');
  })()`);
  assert.equal(configurator, true);

  await navigate("/proefles", { width: 390, height: 844 });
  const planner = await evaluate(`(async () => {
    document.querySelector('[aria-label="Voorkeursdag"] [role="radio"]').click();
    document.querySelector('[aria-label="Voorkeursdagdelen"] button').click();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    [...document.querySelectorAll('button')].find((button) => button.textContent.includes('Toon 3 momenten')).click();
    await new Promise((resolve) => setTimeout(resolve, 650));
    const slots = document.querySelectorAll('[aria-label="Beschikbare proeflesmomenten"] [role="radio"]');
    slots[0]?.click();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    return { count: slots.length, selected: Boolean(document.querySelector('input[name="proeflesmoment"]').value) };
  })()`);
  assert.deepEqual(planner, { count: 3, selected: true });

  console.log(`PASS browser QA: ${viewports.length} viewports × ${publicRoutes.length} publieke routes + menu, tabs, configurator en planner.`);
} finally {
  socket.close();
  chrome.kill("SIGTERM");
  await Promise.race([new Promise((resolve) => chrome.once("exit", resolve)), delay(750)]);
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
}
