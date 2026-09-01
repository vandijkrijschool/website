# QA-rapport — 1 september 2026

## Geautomatiseerde dekking

| Controle | Bereik |
| --- | --- |
| `npm run lint` | ESLint op applicatie, scripts en tests |
| `npm run typecheck` | TypeScript zonder output |
| `npm test` | 17 data-, interactie-, route-, asset-, schema- en workflowtests |
| `npm run build` | Next.js-productiebuild met 38 gegenereerde pagina’s |
| `npm run test:smoke` | 33 inhoudsroutes, interne links, canonicals, metadata, noindexgate, lege sitemap, robots en 404s |
| `npm run test:browser` | alle 33 routes op 390 en 1280 px, 12 representatieve routes op 10 viewportscenario’s |

De browsermatrix omvat 320, 360, 390, 430, 768, 820, 1024, 1280 en 1440 px, plus 720 CSS-px als effectieve 200%-zoomcontrole. Zij controleert horizontale overflow zonder `body`-maskering, woordbreuken in H1/H2, ontbrekende beelden, consolefouten, 44×44-bedieningsvlakken, mobiel menu met Escape/focus, portaltabs, configurator, expliciete slotbevestiging en reduced motion.

## Bewuste releasegrenzen

- productie blijft sitewide `noindex,nofollow` totdat alle releasegates zijn bevestigd;
- de runtime-sitemap blijft tot die tijd leeg;
- proefles- en contactstatussen zijn lokale validatie, geen verzending of reservering;
- reviews, portal, privacy en voorwaarden zijn ondersteunende noindexroutes;
- onbevestigde contact-/bedrijfsgegevens staan niet in Organization/Service-schema;
- generated-location fotografie blijft een te beoordelen sfeerimpressie.

Definitieve uitvoer en commit-/deploygegevens staan in [`IMPLEMENTATION_REPORT_2026-09-01.md`](IMPLEMENTATION_REPORT_2026-09-01.md).
