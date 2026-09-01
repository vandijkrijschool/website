import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const baseUrl = process.env.BROWSER_QA_URL ?? "http://localhost:3000";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const browser = await chromium.launch({ headless: true, args: ["--hide-scrollbars"] });
const context = await browser.newContext();
const page = await context.newPage();
const session = await context.newCDPSession(page);
const consoleProblems = [];

session.on("Runtime.exceptionThrown", (params) => consoleProblems.push({ method: "Runtime.exceptionThrown", params }));
session.on("Log.entryAdded", (params) => consoleProblems.push({ method: "Log.entryAdded", params }));

const send = (method, params = {}) => session.send(method, params);

function once(method, timeoutMs = 12000) {
  return new Promise((resolve, reject) => {
    const handler = (params) => {
      clearTimeout(timer);
      session.off(method, handler);
      resolve(params);
    };
    const timer = setTimeout(() => {
      session.off(method, handler);
      reject(new Error(`${method} timeout`));
    }, timeoutMs);
    session.on(method, handler);
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
  { width: 320, height: 720 }, { width: 360, height: 800 }, { width: 390, height: 844 }, { width: 430, height: 900 }, { width: 768, height: 1024 },
  { width: 820, height: 1180 }, { width: 1024, height: 768 }, { width: 1280, height: 800 },
  { width: 1440, height: 900 }, { width: 720, height: 450, label: "1440×900 bij 200% zoom" },
];
const sitemapDefinition = JSON.parse(readFileSync(new URL("../data/sitemap.json", import.meta.url), "utf8"));
const publicRoutes = [...sitemapDefinition.routes, ...sitemapDefinition.excludedRoutes].map((route) => route.path);
const representativeRoutes = ["/", "/rijlessen", "/lespakketten", "/tarieven", "/configurator", "/proefles", "/theorie", "/werkgebied", "/rijschool-den-haag", "/regio/delft", "/regio/naaldwijk", "/leerlingomgeving"];

try {
  for (const viewport of viewports) {
    const routesForViewport = viewport.width === 390 || viewport.width === 1280 ? publicRoutes : representativeRoutes;
    for (const route of routesForViewport) {
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
          overflowers: [...document.querySelectorAll('body *')].map((element) => ({ element, rect: element.getBoundingClientRect() })).filter(({ element, rect }) => {
            if (rect.width <= 0 || (rect.right <= document.documentElement.clientWidth + 1 && rect.left >= -1)) return false;
            let parent = element.parentElement;
            while (parent && parent !== document.body) {
              const overflowX = getComputedStyle(parent).overflowX;
              if ((overflowX === 'auto' || overflowX === 'scroll') && parent.scrollWidth > parent.clientWidth) return false;
              if (overflowX === 'hidden' || overflowX === 'clip') {
                const parentRect = parent.getBoundingClientRect();
                if (parentRect.left >= -1 && parentRect.right <= document.documentElement.clientWidth + 1) return false;
              }
              parent = parent.parentElement;
            }
            return true;
          }).slice(0, 12).map(({ element, rect }) => ({ tag: element.tagName, className: String(element.className), left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) })),
          bodyOverflowMasked: getComputedStyle(document.body).overflowX === 'hidden' || getComputedStyle(document.documentElement).overflowX === 'hidden',
          undersizedControls: [...document.querySelectorAll('.contact-preference label,.consent,.weekday-grid button,.daypart-grid button,.booking-slots button,.option-card,.segmented-control button,.chip-group button,.preset-card')].map((element) => ({ element, rect: element.getBoundingClientRect() })).filter(({ rect }) => rect.width > 0 && (rect.width < 44 || rect.height < 44)).slice(0, 12).map(({ element, rect }) => ({ tag: element.tagName, className: String(element.className), width: Math.round(rect.width), height: Math.round(rect.height) })),
          hero: (() => {
            const element = document.querySelector('.home-hero, .page-hero');
            if (!element) return null;
            const rect = element.getBoundingClientRect();
            return { top: Math.round(rect.top), bottom: Math.round(rect.bottom), height: Math.round(rect.height) };
          })(),
          homeRail: (() => {
            const rail = document.querySelector('.home-hero .trust-rail');
            const copy = document.querySelector('.home-hero__copy');
            if (!rail || !copy) return null;
            const railRect = rail.getBoundingClientRect();
            const copyRect = copy.getBoundingClientRect();
            return { top: Math.round(railRect.top), bottom: Math.round(railRect.bottom), copyTop: Math.round(copyRect.top), copyBottom: Math.round(copyRect.bottom), copyHeight: Math.round(copyRect.height) };
          })(),
        };
      })()`);
      const viewportLabel = viewport.label ?? `${viewport.width}px`;
      assert.ok(state.horizontalTravel <= 1, `${route} overflowt op ${viewportLabel}: ${JSON.stringify(state)}`);
      assert.equal(state.bodyOverflowMasked, false, `${route} maskeert horizontale overflow op ${viewportLabel}`);
      assert.deepEqual(state.overflowers, [], `${route} heeft elementen buiten de viewport op ${viewportLabel}: ${JSON.stringify(state.overflowers)}`);
      assert.deepEqual(state.undersizedControls, [], `${route} heeft bedieningsvlakken kleiner dan 44×44 op ${viewportLabel}: ${JSON.stringify(state.undersizedControls)}`);
      assert.deepEqual(state.overflowingHeadings, [], `${route} heeft een te brede headline op ${viewportLabel}: ${JSON.stringify(state.overflowingHeadings)}`);
      assert.deepEqual(state.splitHeadingWords, [], `${route} breekt woorden middenin af op ${viewportLabel}: ${JSON.stringify(state.splitHeadingWords)}`);
      if (viewport.height >= 700 && route === "/") {
        assert.ok(state.hero.bottom >= viewport.height - 1, `${route} vult de viewport niet op ${viewportLabel}: ${JSON.stringify(state.hero)}`);
        if (state.homeRail) {
          assert.ok(state.homeRail.top >= state.homeRail.copyBottom + 8, `Homepage-inhoud overlapt de voordelen op ${viewportLabel}: ${JSON.stringify(state.homeRail)}`);
        }
      }
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
    [...document.querySelectorAll('button')].find((button) => button.textContent.includes('Kies dit moment'))?.click();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    return { count: slots.length, selected: Boolean(document.querySelector('input[name="proeflesmoment"]').value) };
  })()`);
  assert.deepEqual(planner, { count: 3, selected: true });

  await send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await navigate("/", { width: 390, height: 844 });
  const runningAnimations = await evaluate("document.getAnimations().filter((animation) => animation.playState === 'running' && Number(animation.effect?.getTiming().duration) > 1).length");
  assert.equal(runningAnimations, 0, "prefers-reduced-motion laat nog niet-essentiële animaties lopen");

  console.log(`PASS browser QA: ${viewports.length} viewports, alle ${publicRoutes.length} routes op mobiel en desktop, representatieve matrix, menu, tabs, configurator, planner en reduced motion.`);
} finally {
  await browser.close();
}
