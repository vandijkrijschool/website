# QA-rapport prototype

## Geautomatiseerde controles

| Controle | Commando | Status bij overdracht |
| --- | --- | --- |
| ESLint | `npm run lint` | PASS — 0 fouten, 0 waarschuwingen |
| TypeScript | `npm run typecheck` | PASS — applicatielaag |
| broncontract | `npm run test:source` | PASS — 6/6 tests |
| productiebuild | `npm run build` | onderdeel van finale checkpoint |
| gerenderde HTML | `npm test` | optionele uitgebreide integratietest |

Het broncontract controleert de afgesproken routes, beeldbestanden, centrale demo-labels, kerninteracties, responsive breakpoints en noindex-veiligheid.

## Statisch gecontroleerd

- 16 inhoudelijke routes plus juridische conceptpagina’s aanwezig;
- 404-, loading- en foutstatus aanwezig;
- alle belangrijke CTA-bestemmingen bestaan;
- formulieren versturen of bewaren geen persoonsgegevens;
- reviews zijn fictief gelabeld en niet in ratingschema opgenomen;
- NXTDRIVE-demomomenten zijn herkenbaar als simulatie;
- vaste afbeeldingsafmetingen, lazy loading onder de vouw en responsive locatievarianten;
- `prefers-reduced-motion`-fallback aanwezig;
- prototype standaard `noindex,follow` en sitemap leeg.

## Handmatige productiecontroles

Deze controles vereisen echte apparaten, aangesloten productie-integraties of definitieve content en blijven daarom onderdeel van de livegang:

- visuele check op 360/390/768/820/1024/1280/1440 px;
- toetsenbord- en screenreadertest;
- iOS Safari en Android Chrome;
- echte NXTDRIVE-loading, leeg, conflict, timeout en foutscenario’s;
- server-side formulier- en spambeveiliging;
- Lighthouse/Core Web Vitals op productiehost;
- juridische, commerciële en beeldrechtenreview;
- schema-validatie met echte contact-, bedrijfs- en reviewgegevens.

## Bekende, bewuste prototypegrenzen

- geen checkout of betaling;
- geen live API, CRM, e-mail, SMS, analytics of cookieplatform;
- geen echte accountlogin;
- prijzen en voorwaarden voorlopig;
- contact-, review-, profiel- en leerlingdata fictief;
- AI-gegenereerde fotografie moet vóór livegang worden goedgekeurd.
