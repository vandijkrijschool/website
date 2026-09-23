# Van Dijk – Rijschool

Productiewebsite voor Van Dijk – Rijschool in Den Haag en omgeving. De Next.js-app bevat de volledige marketingwebsite, centrale prijs- en regiogegevens, een intakeformulier met overdracht naar WhatsApp of e-mail en een responsive beeldbibliotheek.

## Belangrijkste onderdelen

- 28 indexeerbare inhoudsroutes en drie ondersteunende noindexroutes;
- vijf actuele lespakketten, met het Alles-in-1 pakket prominent uitgelicht;
- intake- en contactformulieren die een bericht klaarzetten via de officiële contactkanalen;
- PlanGo als digitale leerlingomgeving;
- 17 lokale werkgebiedpagina’s;
- metadata, Open Graph, JSON-LD, robots, sitemap en manifest;
- responsive ontwerp, toetsenbordbediening en reduced-motion ondersteuning.

## Lokaal starten

Vereisten: Node.js 24 en npm.

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Kwaliteitscontrole

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:smoke
npm run test:browser
```

`npm run check` voert de volledige lokale controle uit.

## Structuur

- `app/` — routes, layout, componenten en centrale applicatielogica;
- `data/` — prijzen, bedrijfsgegevens, regio’s, assets en sitemapdefinitie;
- `public/images/` — responsive WebP- en Open Graph-afbeeldingen;
- `scripts/` — build-, smoke-, browser- en screenshotcontroles;
- `tests/` — inhouds- en regressiecontracten.

## Productiedeployment

Een push naar `production` start `.github/workflows/deploy-production.yml`. De workflow voert browser-QA, lint, typecheck, tests, build en smoketests uit en publiceert daarna via de bestaande Sites VPS-runner. `main` deployt niet automatisch.

De publieke healthcheck staat op `/api/health` en rapporteert de actieve revisie.
