# Van Dijk Rijschool — premium prototype

Volledig klikbaar websiteprototype voor Van Dijk Rijschool, gericht op Den Haag en omgeving. Het prototype vertaalt de zwart-wit-gele huisstijl naar een premium automotive interface en combineert marketingpagina’s met een werkende pakketconfigurator, NXTDRIVE-proeflesplanner, democontactflow en interactieve leerlingomgeving.

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

## Productie-afgewerkt demo-prototype

Het project is bewust een productie-afgewerkt demo-prototype: visueel, inhoudelijk en interactief compleet, maar zonder echte dienstverlening. Het blijft in `prototype`-modus voor alle lokale simulaties, terwijl de gepubliceerde demo normaal indexeerbaar is en een volledige sitemap aanbiedt. Formulieren bewaren of verzenden niets; NXTDRIVE-momenten, contactreacties en de leerlingomgeving worden lokaal gesimuleerd.

Contactgegevens, prijzen, voorwaarden, reviews, team- en leerlinggegevens zijn consistente mockdata. Integraties, spambeveiliging, juridische goedkeuring en het uiteindelijke domein zijn voor deze demo niet vereist. [`docs/PRODUCTION_CHECKLIST.md`](docs/PRODUCTION_CHECKLIST.md) legt vast wat voor de demo gereed is en welke uitbreidingen pas relevant worden bij een eventueel toekomstig echt product.

## Snel starten

Vereisten:

- Node.js `>=22.13.0`
- npm met de meegeleverde `package-lock.json`
- Linux voor de meegeleverde gecontroleerde scripts

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open tijdens lokale ontwikkeling de URL die Vite in de terminal toont.

## Commando’s

```bash
npm run dev          # lokale ontwikkelomgeving
npm run lint         # ESLint
npm run typecheck    # TypeScript zonder output
npm run test:source  # prototypecontract, routes en assets
npm run test:browser # headless responsive- en interactiecontrole; vereist Chromium of BROWSER_BIN
npm run check        # lint + typecheck + broncontract
npm run build        # productie-artifact bouwen
npm test             # productiebuild + gerenderde HTML-test
npm run start        # gebouwd artifact starten
```

## Omgevingsvariabelen

Zie `.env.example`. Geen enkele sleutel is nodig voor de lokale demo.

| Variabele | Doel |
| --- | --- |
| `NEXT_PUBLIC_SITE_MODE` | `prototype` houdt alle interactieve demosimulaties zichtbaar |
| `NEXT_PUBLIC_SITE_URL` | Canonieke publieke demo-URL |
| `COMMERCIAL_DATA_CONFIRMED` | Blijft `false`, zodat mockprijzen geen commercieel schema worden |
| `NXTDRIVE_*` | Alleen gereserveerd voor een optionele toekomstige koppeling |
| `LEAD_NOTIFICATION_FROM/TO` | Alleen gereserveerd voor optionele toekomstige meldingen |

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

De site gebruikt Next.js-compatible routing via Vinext, React 19, Tailwind CSS 4 en Cloudflare-compatible output. De bestaande Sites-hostingidentiteit en buildscripts moeten behouden blijven.

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

Betalingen, live NXTDRIVE API-calls, accounts, e-mail/SMS, CRM-opslag, analytics en echte persoonsgegevens zijn bewust gesimuleerd of weggelaten. Dat zijn geen openstaande vereisten: de publiek gepubliceerde demo is compleet binnen deze afbakening en gebruikt een tijdelijke Sites-URL.
