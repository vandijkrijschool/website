# Van Dijk Rijschool — premium prototype

Volledig klikbaar websiteprototype voor Van Dijk Rijschool, gericht op Den Haag en omgeving. Het prototype vertaalt de zwart-wit-gele huisstijl naar een premium automotive interface en combineert marketingpagina’s met een werkende pakketconfigurator, NXTDRIVE-proeflesplanner, democontactflow en interactieve leerlingomgeving.

## Wat is inbegrepen

- 16 gevulde routes, inclusief vier lokale regiopagina’s en een aparte Den Haag-pagina
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

## Belangrijk: prototype versus productie

Het project staat standaard in `prototype`-modus. Daardoor krijgt iedere pagina `noindex,follow` en wordt geen productiesitemap gevuld. Formulieren bewaren of verzenden niets; NXTDRIVE-momenten worden lokaal gesimuleerd.

Zet de website pas op productie nadat alle punten in [`docs/PRODUCTION_CHECKLIST.md`](docs/PRODUCTION_CHECKLIST.md) zijn bevestigd. Daarna kan `NEXT_PUBLIC_SITE_MODE=production` worden ingesteld.

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
npm run check        # lint + typecheck + broncontract
npm run build        # productie-artifact bouwen
npm test             # productiebuild + gerenderde HTML-test
npm run start        # gebouwd artifact starten
```

## Omgevingsvariabelen

Zie `.env.example`. Geen enkele sleutel is nodig voor de lokale demo.

| Variabele | Doel |
| --- | --- |
| `NEXT_PUBLIC_SITE_MODE` | `prototype` voor noindex/demo of expliciet `production` na livegangcontrole |
| `NEXT_PUBLIC_SITE_URL` | Definitieve canonieke domeinnaam |
| `NXTDRIVE_API_BASE_URL` | Toekomstige server-side API-basis |
| `NXTDRIVE_TENANT_ID` | Van Dijk-tenant binnen NXTDRIVE |
| `NXTDRIVE_API_KEY` | Private servercredential; nooit in clientcode |
| `NXTDRIVE_WEBHOOK_SECRET` | Verificatie van callbacks en webhooks |
| `LEAD_NOTIFICATION_FROM/TO` | Toekomstige transactionele leadmeldingen |

## Architectuur

- `app/` — routes, metadata, layouts en fout-/loadingstates
- `app/components/` — herbruikbare marketing- en interactieve componenten
- `app/lib/site.ts` — merkconfiguratie, navigatie, pakketten en metadatahelpers
- `app/lib/demo.ts` — alle fictieve reviews, contact-, team- en leerlingdata
- `public/images/` — logo’s, fotoserie en responsive locatievarianten
- `docs/` — overdracht, routekaart, demo-inventaris, assets en integratiecontract
- `tests/` — bron- en gerenderde outputcontracten

De site gebruikt Next.js-compatible routing via Vinext, React 19, Tailwind CSS 4 en Cloudflare-compatible output. De bestaande Sites-hostingidentiteit en buildscripts moeten behouden blijven.

## Overdrachtsdocumenten

- [`docs/HANDOVER_NL.md`](docs/HANDOVER_NL.md) — functionele en technische overdracht
- [`docs/ROUTES_AND_CONTENT.md`](docs/ROUTES_AND_CONTENT.md) — alle routes en inhoud
- [`docs/DEMO_DATA.md`](docs/DEMO_DATA.md) — wat fictief of voorlopig is
- [`docs/ASSET_MANIFEST.md`](docs/ASSET_MANIFEST.md) — afbeeldingen, herkomst en gebruik
- [`docs/NXTDRIVE_INTEGRATION.md`](docs/NXTDRIVE_INTEGRATION.md) — voorgesteld productiecontract
- [`docs/PRODUCTION_CHECKLIST.md`](docs/PRODUCTION_CHECKLIST.md) — livegangpoort
- [`docs/QA_REPORT.md`](docs/QA_REPORT.md) — uitgevoerde en nog handmatige controles

## Ontwerpprincipes

- matzwart en gelaagd grafiet als basis
- verkeersgeel als actie-, focus- en statuskleur
- korte, krachtige Nederlandse koppen
- grote Haagse fotografie met rustige gradients
- afgeronde cockpitpanelen, dunne contrastlijnen en duidelijke focusstates
- motion ondersteunt hiërarchie en feedback, nooit de leesbaarheid

## Productiegrens

Niet inbegrepen als echte productiefunctionaliteit: betalingen, live NXTDRIVE API-calls, accounts, e-mail/SMS, CRM-opslag, analytics, cookietoestemming en juridisch definitieve teksten. De interfaces en integratiepunten zijn wel voorbereid en gedocumenteerd.

