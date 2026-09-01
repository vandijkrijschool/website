# Van Dijk Rijschool — website

Next.js-website voor Van Dijk Rijschool met een centrale feiten-, prijs-, regio-, sitemap- en assetlaag. De site bevat 29 beoogde indexroutes, vier ondersteunende noindexroutes, een configurator, een veilige proeflesdemo en een gelabelde leerlingomgevingsdemo.

## Releasestatus

De applicatie kan productioneel worden gebouwd en gedeployed. Publieke indexering blijft standaard uit (`NEXT_PUBLIC_INDEXING_ENABLED=false`) totdat de open bedrijfs-, juridische en commerciële feiten in [`docs/PRODUCTION_CHECKLIST.md`](docs/PRODUCTION_CHECKLIST.md) primair zijn bevestigd. In die veilige stand:

- krijgen alle pagina’s `noindex,nofollow`;
- publiceert `/sitemap.xml` geen URL’s;
- blijft crawling toegestaan voor technische controle;
- worden onbevestigde NAP-, KVK- en privacygegevens niet als feit of structured data gepubliceerd.

Formulieren en NXTDRIVE-schermen verzenden, reserveren of bewaren niets. Gegenereerde locatiescènes zijn als sfeerimpressie gelabeld en vereisen menselijke merk-/liverygoedkeuring.

## Functionaliteit

- 12 kernroutes, Den Haag plus 16 unieke regiopagina’s en 4 ondersteunende routes;
- vijf brongetrouwe startpakketten, losse tarieven, vervolg- en herexamenpakketten;
- bedragen in gehele eurocenten, inclusief € 39,50 en € 41,50;
- vierstapsconfigurator met volledig stateherstel en een deelbare query;
- proeflesflow met dag, meerdere dagdelen, exact drie demomomenten en expliciete bevestiging;
- centrale data in `data/*.json`, gevalideerd tijdens import en tests;
- responsive WebP-beelden op 640, 960, 1280 en 1600 px plus routegerichte Open Graph-beelden;
- canonicals, Open Graph, JSON-LD, robots, launch-gated sitemap en manifest;
- browser-QA op 10 viewportscenario’s, inclusief 200% zoom en reduced motion.

## Snel starten

Vereisten: Node.js 24, npm en de gepinde Playwright-Chromium (`npx playwright install chromium`) voor `test:browser`.

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Commando’s

```bash
npm run dev          # lokale Next.js-ontwikkelomgeving
npm run lint         # ESLint
npm run typecheck    # TypeScript zonder output
npm test             # data-, route-, schema- en interactiecontracten
npm run build        # standalone productie-artifact
npm run test:smoke   # 33 routes, links, metadata, launch gate, robots en 404s
npm run test:browser # responsive en interactieve browser-QA
npm run check        # volledige lokale qualityflow
npm run start        # standalone runtime op 127.0.0.1:3108
```

## Omgevingsvariabelen

| Variabele | Doel |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Exacte canonieke oorsprong; productie vereist `https://vandijkrijschool.nl` |
| `NEXT_PUBLIC_INDEXING_ENABLED` | Alleen `true` na afronding van alle releasegates |
| `APP_ENVIRONMENT` | In productie exact `production` |
| `APP_REVISION` | Volledige Git SHA van de actieve release |

## Architectuur

- `data/` — centrale prijs-, regio-, sitefeit-, sitemap- en assetdata;
- `app/lib/content.ts` — getypeerde import, normalisatie en fail-fast validatie;
- `app/lib/site.ts` — oorsprong, indexeringsgate, navigatie en metadata;
- `app/lib/configurator.ts` — state, advies, queryherstel en berekeningen;
- `app/lib/leads.ts` en `app/lib/nxtdrive.ts` — lokale demo-adaptergrenzen;
- `app/components/RegionPage.tsx` — gedeelde opbouw voor alle regiopagina’s;
- `public/images/` — responsive beelden en Open Graph-assets;
- `scripts/` en `tests/` — productie-, smoke- en browserchecks;
- `docs/` — overdracht, routekaart, datagrens, integratienotitie en releasechecklist.

## Deployment

Alleen een push naar `production` start [`.github/workflows/deploy-production.yml`](.github/workflows/deploy-production.yml). De repository-scoped runner bouwt en valideert exact die commit, voert de volledige browser-QA uit en publiceert via `/usr/local/bin/dg-site-deploy`. `main` deployt niet automatisch. De healthcheck staat op `/api/health`.

Zie [`docs/IMPLEMENTATION_REPORT_2026-09-01.md`](docs/IMPLEMENTATION_REPORT_2026-09-01.md) voor de implementatie- en QA-overdracht.
