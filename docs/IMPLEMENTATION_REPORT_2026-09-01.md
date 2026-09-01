# Implementatierapport — 1 september 2026

## Scope en uitgangspunt

- bronrevision: `fea1503fac1d5f4ca9cb7847f762e4a7920d0cae`;
- werkbranch: `codex/implement-handoff-2026-09-01`;
- opdrachtbron: het complete overdrachtspakket van 31 augustus 2026;
- intended origin: `https://vandijkrijschool.nl`;
- veilige releasestand: `NEXT_PUBLIC_INDEXING_ENABLED=false`.

De repository, `origin/main` en `origin/production` stonden vóór implementatie op dezelfde bronrevision. De productionbranch was bij controle op GitHub niet beschermd (API: `Branch not protected`). Advies: vereis minimaal de workflowcheck, restrict force-pushes en laat alleen gereviewde fast-forwards naar `production` toe.

## Bestand-voor-bestand wijzigingsoverzicht

### Configuratie en release

- `.env.example` — expliciete indexeringsgate toegevoegd.
- `.github/workflows/deploy-production.yml` — echte origin, veilige noindexstand, productievalidatie, pinned Chromium-installatie, smoke/routecrawl en browser-QA vóór deployment.
- `next.config.ts` — AVIF/WebP geconfigureerd.
- `package.json`, `package-lock.json` — browser-QA opgenomen in `npm run check` en Playwright 1.62.1 exact vastgezet voor reproduceerbare runner-Chromium.
- `tsconfig.json` — directe getypeerde TS-module-import voor contracttests toegestaan.
- `README.md` — architectuur, routes, launch gate, commando’s en deployprocedure geactualiseerd.

### Centrale data en bibliotheken

- `data/assets.json` — responsive beeldcontract en goedkeuringsregels.
- `data/pricing.json` — alle bronprijzen in eurocenten, pakketten en onzekerheden.
- `data/regions.json` — exact 17 plaatsen met canonical, nabije plaatsen en beeldbasis.
- `data/site-facts.json` — merk-, web-, contact-, operatie- en integratiestatussen zonder oude voorbeeldhost.
- `data/sitemap.json` — exact 29 beoogde indexroutes en 4 ondersteunende routes.
- `app/lib/content.ts` — getypeerde imports, prijsformattering, regio-editorial en fail-fast datavalidatie.
- `app/lib/site.ts` — strikte productie-origin, metadata, navigatie en fail-closed indexeringsgate.
- `app/lib/configurator.ts` — volledige vierstapsstate, query-/sessieherstel en centberekeningen.
- `app/lib/leads.ts` — volledige payload met `startmoment`, planner- en configuratorcontext.
- `app/lib/demo.ts` — oude pakketten/persoonsclaims verwijderd en demo-inhoud begrensd.
- `app/lib/packages.js` — verwijderd; vervangen door de getypeerde centrale bron.

### Gedeelde UI

- `app/components/Configurator.tsx` — ervaring, planning, alle vijf pakketten, handmatige keuze en betaaltermijnen.
- `app/components/LeadForm.tsx` — volledige querycontext, startmoment en veilige lokale submitstatus.
- `app/components/Marketing.tsx` — brongetrouwe pakketkaarten zonder gefingeerde aanbeveling.
- `app/components/PageSections.tsx` — werkgebiedlinks en consistente CTA’s.
- `app/components/RegionPage.tsx` — nieuwe gedeelde lokale paginaopbouw, breadcrumb en Service-schema.
- `app/components/ResponsiveImage.tsx` — nieuwe `next/image`-wrapper voor vier responsive varianten.
- `app/components/SiteChrome.tsx` — navigatie/footer/breadcrumbs zonder onbevestigde NAP-feiten.
- `app/components/StudentPortalDemo.tsx` — oude pakketdata verwijderd.
- `app/components/TrialBookingWidget.tsx` — draftselectie en aparte expliciete slotbevestiging.

### Routes en globale SEO/UI

- `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` — Organization/WebSite-schema, sitewide launch gate en lege sitemap zolang indexering uit staat.
- `app/globals.css` — responsive grids, prijstabellen, werkgebied, verificatiepanelen, focus/touch targets en echte overflowdetectie zonder bodymasker.
- `app/page.tsx` — homepage volledig gevoed uit centrale bron en nieuwe beeldset.
- `app/rijlessen/page.tsx`, `app/lespakketten/page.tsx`, `app/configurator/page.tsx`, `app/proefles/page.tsx`, `app/werkwijze/page.tsx`, `app/over-ons/page.tsx`, `app/faq/page.tsx`, `app/contact/page.tsx` — broncopy, veilige claims en vernieuwde flows.
- `app/tarieven/page.tsx` — nieuwe complete tarievenpagina.
- `app/theorie/page.tsx` — nieuwe iTheoriepagina.
- `app/werkgebied/page.tsx` — nieuwe HTML-hub naar alle 17 plaatsen.
- `app/rijschool-den-haag/page.tsx`, `app/regio/[slug]/page.tsx` — één Den Haag-canonical en exact 16 dynamische regiopaden.
- `app/reviews/page.tsx`, `app/leerlingomgeving/page.tsx`, `app/privacy/page.tsx`, `app/voorwaarden/page.tsx` — expliciet noindex en inhoudelijk als demo/voorlopig begrensd.

### Tests, scripts en documentatie

- `scripts/browser-qa.mjs` — 10 viewports, 33 routes, overflow, koppen, beelden, console, touch, menu, tabs, configurator, planner en reduced motion.
- `scripts/run-browser-qa.mjs` — zelfstandige productieruntime voor de browsergate.
- `scripts/smoke-standalone.mjs` — 33 routes, interne links, metadata, canonicals, launch gate, robots en 404s.
- `scripts/validate-production-env.mjs` — exacte HTTPS-origin, omgeving, revision en indexeringsboolean.
- `scripts/capture-screenshots.mjs` — reproduceerbare desktop-/mobiele bewijsopnamen.
- `tests/interaction-logic.test.mjs`, `tests/prototype-contract.test.mjs` — 17 contracttests voor data, routes, assets, berekeningen, payload, schema en QA-wiring.
- `docs/ASSET_MANIFEST.md`, `docs/DEMO_DATA.md`, `docs/HANDOVER_NL.md`, `docs/NXTDRIVE_INTEGRATION.md`, `docs/PRODUCTION_CHECKLIST.md`, `docs/QA_REPORT.md`, `docs/ROUTES_AND_CONTENT.md` — volledig bijgewerkt naar de nieuwe waarheid.

### Beeldbestanden

Toegevoegd onder `public/images/`: voor elk van de volgende 23 beeldbasissen exact `-640.webp`, `-960.webp`, `-1280.webp` en `-1600.webp`:

`de-lier-lesauto`, `delft-oostpoort-lesauto`, `den-haag-hofvijver-binnenhof`, `den-haag-vredespaleis`, `den-hoorn-lesauto`, `hero-den-haag-blue-hour`, `honselersdijk-lesauto`, `intake-bij-lesauto`, `kwintsheul-lesauto`, `leidschendam-sluis`, `monster-lesauto`, `naaldwijk-lesauto`, `nootdorp-woon-polderroute`, `nxtdrive-tablet-met-lesauto`, `pijnacker-polderroute`, `poeldijk-lesauto`, `rijles-interieur-den-haag`, `rijswijk-oud-rijswijk`, `s-gravenzande-lesauto`, `scheveningen-kurhaus-boulevard`, `theorie-itheorie-met-lesauto`, `voorburg-herenstraat-oude-kerk` en `wateringen-centrum-lesauto`.

Toegevoegd onder `public/images/og/`: locatie-OG-bestanden voor de 17 regiobasissen, `den-haag-vredespaleis-og-1200x630.jpg` en `van-dijk-rijschool-og-1200x630.jpg`.

Verwijderd: `public/og.png`, `public/images/hero-car.webp`, `den-haag-drive.webp`, `scheveningen-drive.webp`, `intake-instructor.webp`, `rijles-interieur.webp` en alle oude `locatie-hofvijver*`, `locatie-scheveningen*`, `locatie-vredespaleis*` en `locatie-tablet*` varianten. Deze verwijderingen blijven via Git-historie herstelbaar.

### Screenshots

Onder `docs/screenshots/` zijn `homepage`, `tarieven`, `proefles`, `configurator`, `werkgebied`, `regio-den-haag`, `regio-delft` en `regio-naaldwijk` elk als `-desktop.png` (1440×900) en `-mobile.png` (390×844) toegevoegd: 16 bestanden totaal.

## Uiteindelijke route- en sitemaplijst

De 29 beoogde sitemaproutes zijn:

1. `/`
2. `/rijlessen`
3. `/lespakketten`
4. `/tarieven`
5. `/configurator`
6. `/proefles`
7. `/theorie`
8. `/werkwijze`
9. `/over-ons`
10. `/faq`
11. `/contact`
12. `/werkgebied`
13. `/rijschool-den-haag`
14. `/regio/den-hoorn`
15. `/regio/de-lier`
16. `/regio/delft`
17. `/regio/honselersdijk`
18. `/regio/kwintsheul`
19. `/regio/leidschendam`
20. `/regio/monster`
21. `/regio/naaldwijk`
22. `/regio/nootdorp`
23. `/regio/pijnacker`
24. `/regio/poeldijk`
25. `/regio/rijswijk`
26. `/regio/scheveningen`
27. `/regio/s-gravenzande`
28. `/regio/voorburg`
29. `/regio/wateringen`

`/reviews`, `/leerlingomgeving`, `/privacy` en `/voorwaarden` zijn ondersteunende noindexroutes en blijven buiten de sitemap. Tijdens de launch gate retourneert de runtime-sitemap bewust nul URL’s; de centrale lijst wordt pas gepubliceerd na expliciete indexeringsgoedkeuring.

## Resterende `needsVerification`

- juridische handelsnaam, eigenaar/organisatie en precieze DriveYOU-relatie;
- telefoon, e-mail, adres, plaatsweergave, KVK en openingstijden;
- DNS, TLS en apex/www-redirectkeuze;
- privacyverantwoordelijke, grondslagen, verwerkers, bewaartermijnen en rechtenroute;
- prijspeildatum, btw-status, duur van één rijles en pakketgeldigheid;
- annulering, no-show, restitutie en exacte exameninclusies;
- voorwaarden en duur van de gratis proefles;
- verplichte toepasselijkheid van € 39,50 inschrijving en € 41,50 garantiefonds;
- actualiteit van circa 45 lessen, directe start en geen wachtlijst;
- echt NXTDRIVE-endpoint/widgetcontract, tenant en providerbevestiging;
- menselijke goedkeuring van gegenereerde voertuig-, livery- en locatiescènes.

## Uitgevoerde commando’s en resultaten

- `npm ci` — PASS, lockfile-installatie voltooid.
- `npm run check` — PASS: lint, typecheck, 17/17 tests, Next.js-build, standalone smoke en volledige browser-QA.
- `npm run test:smoke` — PASS: 33 routes, 33 interne links, metadata, noindexgate, lege launch-sitemap, robots en 404s.
- `npm run test:browser` — PASS: 10 viewports, alle 33 routes mobiel/desktop en alle interactiechecks.
- `node scripts/capture-screenshots.mjs` — PASS: 16 screenshots.
- beelddecode via `sharp().metadata()` — PASS: 113 publieke beelden en 16 screenshots.
- `npm audit --omit=dev --audit-level=high` — PASS: 0 kwetsbaarheden.
- production-env-validatie met echte origin, productieomgeving, volledige SHA en indexering uit — PASS.
- `git diff --check` — PASS.

De eerste productionworkflow-run `33492823131` stopte veilig vóór deployment doordat de self-hosted runner nog geen Chromium had. Run `33493263491` bevestigde daarna dat de minimale VPS-runner de Chromium-systeemlibraries bewust niet bevat. De gepinde browsergate draait daarom in een afzonderlijke GitHub-hosted Linux-job met officiële systeemdependencies; de dedicated deploymentjob heeft die job als harde `needs`-voorwaarde. Geen van beide mislukte runs heeft een gedeeltelijke deployment uitgevoerd.

Een eerste push van die jobsplitsing werd door GitHub vóór workflowstart afgewezen omdat `runner.temp` niet in jobniveau-`env` beschikbaar is. De cache gebruikt nu een expliciete tijdelijke map op de geïsoleerde hosted VM.

Run `33493664097` installeerde Chromium en alle systeemdependencies correct, maar toonde dat de handmatige `DevToolsActivePort`-bootstrap runnerspecifiek was. `scripts/browser-qa.mjs` gebruikt nu Playwrights officiële `chromium.launch()` en behoudt alle bestaande CDP-asserties; deze bootstrap is lokaal opnieuw met de volledige browsermatrix gevalideerd.

Push- en deploymentresultaten worden na deze lokale, immutable QA-gate aan de uiteindelijke oplevering toegevoegd.
