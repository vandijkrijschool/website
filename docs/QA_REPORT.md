# QA-rapport production website

## Geautomatiseerde controles

Uitgevoerd op 28 augustus 2026 met Node.js 24 en de productionconfiguratie.

| Controle | Commando | Resultaat |
| --- | --- | --- |
| schone lockfile-installatie | `npm ci` | PASS — 354 packages uit één npm-lockfile |
| production dependency-audit | `npm audit --omit=dev --audit-level=high` | PASS — 0 kwetsbaarheden |
| ESLint | `npm run lint` | PASS — 0 fouten |
| TypeScript | `npm run typecheck` | PASS |
| bron-, contract- en logica-tests | `npm test` | PASS — 17/17 |
| Next.js standalone productiebuild | `npm run build` | PASS — 23 routes en systeemroutes gebundeld |
| standalone runtime-smoke | `npm run test:smoke` | PASS — health, 18 routes, metadata, sitemap, robots en 404 |
| headless browser-QA | `npm run test:browser` | PASS — 8 viewports × 5 kernroutes plus interacties |

De bron- en logica-tests controleren onder meer volledig configuratorherstel, corrupte storage, berekeningen, pakketgrenzen, Amsterdamse datumlogica, exact drie slots, foutafhandeling, formulieradapterstatussen, 18 routes, demo-labels, assets, schema-gates, publieke sitemap, production workflow en toetsenbordcontracten.

De standalone smoketest start het echte VPS-artifact en controleert de healthpayload, alle 18 routes, canonicals, één uiteindelijke H1, publieke indexering, sitemap, robots en de 404-status.

## Responsive en interactief gecontroleerd

Headless Chromium controleerde homepage, configurator, proeflesplanner, contact en leerlingomgeving op:

- 360×800, 390×844, 768×1024, 820×1180, 1024×768, 1280×800 en 1440×900;
- effectieve 1440×900-reflow bij 200% zoom (720×450 CSS-pixels);
- geen horizontale overflow, ontbrekende beelden, console-exceptions of kapotte requests;
- precies één H1 in de uiteindelijke DOM;
- mobiel menu openen, scroll-lock en sluiten met Escape;
- portaltabs met pijltoetsnavigatie;
- configuratorselectie en overgang naar stap 2;
- planner happy flow met exact drie slots en één geselecteerd moment.

Daarnaast zijn screenshots visueel bekeken op 390, 820 en 1440 px, plus de 200%-zoomreflow. Een gevonden 1024px-overflow door de aspect-ratio van het homepagebeeld is gecorrigeerd en daarna opnieuw groen getest.

## SEO, veiligheid en toegankelijkheid

- alle demoroutes zijn `index,follow` en staan in de publieke sitemap;
- `Product`, `Offer` en `Service` JSON-LD blijft uitgeschakeld zolang prijzen mockdata zijn;
- breadcrumbs, DrivingSchool/Organization, WebSite en zichtbare FAQ-schema’s zijn aanwezig zonder demo-rating;
- Open Graph-afbeelding is 1200×630 en teruggebracht tot circa 254 kB;
- skiplinkdoel bestaat ook in loading-, error- en 404-states;
- checkboxes zijn vast 20×20 px met een groter labeltarget; samengestelde radio’s en tabs gebruiken roving focus;
- reduced-motion schakelt animaties en smooth scrolling uit.

## Optioneel bij een toekomstige echte dienst

Deze punten zijn geen blokkades voor de demo. Ze worden pas relevant wanneer afzonderlijk wordt besloten een echte publieke dienst te bouwen:

- aanvullende screenreader- en fysieke-apparaattests;
- Lighthouse/Core Web Vitals op het uiteindelijke domein;
- echte NXTDRIVE-reservering, webhooks en server-side leadverwerking;
- spambeveiliging, rate limiting, logging, analytics en consent;
- vervanging van mockdata en juridische toetsing voor de echte onderneming;
- functionele monitoring naast de deployment-healthcheck.

## Bewuste prototypegrenzen

Geen live API, boeking, betaling, accountlogin, CRM-opslag, e-mail, SMS, analytics of persoonsgegevensopslag. Prijzen, voorwaarden, contactgegevens, reviews, profiel- en leerlinggegevens zijn zichtbaar gelabelde mockdata en gelden als complete demo-inhoud. De production runtime wordt uitsluitend via de repository-scoped runner en `dg-site-deploy` gepubliceerd.
