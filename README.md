# Van Dijk Rijschool — production website

Production-ready Next.js-website voor Van Dijk Rijschool, gericht op Den Haag en omgeving. De site vertaalt de zwart-wit-gele huisstijl naar een premium automotive interface en combineert marketingpagina’s met een pakketconfigurator, NXTDRIVE-proeflesplanner, veilige democontactflow en interactieve leerlingomgeving.

## Wat is inbegrepen

- 18 gevulde inhoudelijke routes, inclusief vier lokale regiopagina’s, een aparte Den Haag-pagina en twee complete juridische demopagina’s
- vierstaps lespakketconfigurator met sessieherstel, berekeningen en deelbare pakketlink
- proeflesflow: voorkeursdag → dagdelen → drie dynamische demomomenten → bevestiging
- contact- en proeflesformulieren met validatie, laad-, fout- en successtatus
- interactieve NXTDRIVE-demo met overzicht, agenda, voortgang en lesverslagen
- zes duidelijk gelabelde fictieve reviewkaarten
- centraal beheerde demo-data in `app/lib/demo.ts`
- responsive ontwerp voor desktop, tablet en mobiel
- subtiele motion met volledige `prefers-reduced-motion`-fallback
- metadata, canonicals, Open Graph, JSON-LD, robots, sitemap en manifest
- Haagse beeldbibliotheek in WebP, inclusief responsive varianten
- 404-, route-loading- en foutstatus
- Nederlands overdrachtspakket in `docs/`

## Publieke demogrens

De website is production-ready als applicatie en deployment, maar de bestaande formulieren en NXTDRIVE-schermen blijven bewust als demo functioneren. Formulieren bewaren of verzenden niets; momenten, contactreacties en de leerlingomgeving worden lokaal gesimuleerd en zijn als zodanig gelabeld.

Contactgegevens, prijzen, voorwaarden, reviews, team- en leerlinggegevens zijn consistente mockdata. Er zijn geen database-, mail-, externe API- of SaaS-integraties toegevoegd. [`docs/PRODUCTION_CHECKLIST.md`](docs/PRODUCTION_CHECKLIST.md) legt vast welke uitbreidingen pas relevant worden als de demofunctionaliteit later echte persoonsgegevens moet verwerken.

## Snel starten

Vereisten:

- Node.js 24
- npm met de meegeleverde `package-lock.json`
- Linux voor de meegeleverde gecontroleerde scripts

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open tijdens lokale ontwikkeling `http://localhost:3000`.

## Commando’s

```bash
npm run dev          # lokale Next.js-ontwikkelomgeving
npm run lint         # ESLint
npm run typecheck    # TypeScript zonder output
npm test             # broncontract, routes, assets en interactielogica
npm run test:browser # headless responsive- en interactiecontrole; vereist Chromium of BROWSER_BIN
npm run build        # Next.js standalone productie-artifact bouwen
npm run test:smoke   # standalone health-, route-, SEO- en 404-smoketest
npm run check        # volledige lokale qualityflow
npm run start        # standalone runtime op 127.0.0.1:3108
```

## Omgevingsvariabelen

Zie `.env.example`. De applicatie gebruikt alleen niet-geheime publieke en runtimeconfiguratie.

| Variabele | Doel |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonieke publieke URL |
| `APP_ENVIRONMENT` | Runtimeomgeving, in productie `production` |
| `APP_REVISION` | Volledige Git SHA van de actieve release |

## Architectuur

- `app/` — routes, metadata, layouts en fout-/loadingstates
- `app/components/` — herbruikbare marketing- en interactieve componenten
- `app/lib/site.ts` — merkconfiguratie, navigatie en metadatahelpers
- `app/lib/packages.js` — centraal, met JSDoc literal-types beheerd pakket- en prijsregister
- `app/lib/demo.ts` — alle fictieve reviews, contact-, team- en leerlingdata
- `app/lib/configurator.ts` — defensief stateherstel, advies- en prijsberekeningen
- `app/lib/nxtdrive.ts` / `app/lib/leads.ts` — lokale demosimulaties met optionele adaptergrenzen
- `public/images/` — logo’s, fotoserie en responsive locatievarianten
- `docs/` — overdracht, routekaart, demo-inventaris, assets en integratiecontract
- `tests/` — bron- en gerenderde outputcontracten

De site gebruikt Next.js App Router, React 19, TypeScript en Tailwind CSS 4. `next build` produceert standalone output voor de bestaande Sites VPS-runtime.

## Productiedeployment

Alleen een push naar `production` start `.github/workflows/deploy-production.yml`. De repository-scoped runner bouwt en valideert exact die commit en publiceert daarna uitsluitend via `/usr/local/bin/dg-site-deploy`. `main` deployt nooit automatisch. Promotion naar `production` is altijd een fast-forward van een goedgekeurde `main`-commit.

De publieke healthcheck staat op `/api/health` en rapporteert service, omgeving en actieve Git-revisie.

## Overdrachtsdocumenten

- [`docs/HANDOVER_NL.md`](docs/HANDOVER_NL.md) — functionele en technische overdracht
- [`docs/ROUTES_AND_CONTENT.md`](docs/ROUTES_AND_CONTENT.md) — alle routes en inhoud
- [`docs/DEMO_DATA.md`](docs/DEMO_DATA.md) — wat fictief of voorlopig is
- [`docs/ASSET_MANIFEST.md`](docs/ASSET_MANIFEST.md) — afbeeldingen, herkomst en gebruik
- [`docs/NXTDRIVE_INTEGRATION.md`](docs/NXTDRIVE_INTEGRATION.md) — optionele toekomstige uitbreidingsroute
- [`docs/PRODUCTION_CHECKLIST.md`](docs/PRODUCTION_CHECKLIST.md) — demo-releasechecklist
- [`docs/QA_REPORT.md`](docs/QA_REPORT.md) — uitgevoerde controles en bewuste demogrenzen

## Ontwerpprincipes

- matzwart en gelaagd grafiet als basis
- verkeersgeel als actie-, focus- en statuskleur
- korte, krachtige Nederlandse koppen
- grote Haagse fotografie met rustige gradients
- afgeronde cockpitpanelen, dunne contrastlijnen en duidelijke focusstates
- motion ondersteunt hiërarchie en feedback, nooit de leesbaarheid

## Demogrens

Betalingen, live NXTDRIVE API-calls, accounts, e-mail/SMS, CRM-opslag, analytics en echte persoonsgegevens zijn bewust gesimuleerd of weggelaten. Dat zijn geen deploymentvereisten voor deze publieke demoversie.
