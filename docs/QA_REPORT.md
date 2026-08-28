# QA-rapport prototype

## Geautomatiseerde controles

Uitgevoerd op 28 augustus 2026 in prototype-modus.

| Controle | Commando | Resultaat |
| --- | --- | --- |
| schone lockfile-installatie | `npm ci` | PASS — 503 packages; alleen upstream deprecation-/allow-scriptsmeldingen |
| ESLint | `npm run lint` | PASS — 0 fouten |
| TypeScript | `npm run typecheck` | PASS |
| bron- en logica-tests | `npm run test:source` | PASS — 14/14 |
| samengestelde controle | `npm run check` | PASS |
| Vinext productiebuild | `npm run build` | PASS — alle routes gebundeld |
| gerenderde HTML-integratie | `npm test` | PASS — 5/5 na geslaagde build |
| headless browser-QA | `npm run test:browser` | PASS — 8 viewports × 5 kernroutes plus interacties |

De bron- en logica-tests controleren onder meer volledig configuratorherstel, corrupte storage, berekeningen, pakketgrenzen, Amsterdamse datumlogica, exact drie slots, leeg/providerfout/timeout, formulieradapterstatussen, 18 routes, demo-labels, assets, schema-gates, privésitemap en toetsenbordcontracten.

De HTML-tests openen alle 18 routes in het gebouwde workerartifact en controleren unieke titel, description en canonical, één uiteindelijke H1, publieke indexering, interne links, afwezigheid van commerciële prototype-schema’s en de 404-status.

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
- `Product`, `Offer` en `Service` JSON-LD vereist zowel productiemodus als `COMMERCIAL_DATA_CONFIRMED=true`;
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
- monitoring, rollback, DNS en TLS.

## Bewuste prototypegrenzen

Geen live API, boeking, betaling, accountlogin, CRM-opslag, e-mail, SMS, analytics of persoonsgegevensopslag. Prijzen, voorwaarden, contactgegevens, reviews, profiel- en leerlinggegevens zijn zichtbaar gelabelde mockdata en gelden als complete demo-inhoud. De opdrachtgever heeft de beeldrechten bevestigd. De demo wordt publiek gepubliceerd op de tijdelijke Sites-URL.
