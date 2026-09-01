# Overdracht Van Dijk Rijschool

De aangeleverde implementatieopdracht en het overdrachtspakket zijn verwerkt bovenop bronrevision `fea1503fac1d5f4ca9cb7847f762e4a7920d0cae`. De repository gebruikt nu de centrale JSON-bronnen uit het pakket, de complete responsive beeldset en het contract van 29 beoogde indexroutes.

## Belangrijkste keuzes

- ontbrekende bedrijfs-, juridische en commerciële feiten zijn niet ingevuld met aannames;
- de bedoelde canonical origin is `https://vandijkrijschool.nl`;
- de release wordt veilig gedeployed met sitewide noindex en een lege sitemap;
- Den Haag bestaat alleen op `/rijschool-den-haag`; 16 andere plaatsen gebruiken `/regio/[slug]`;
- generated-location beelden zijn zichtbare sfeerimpressies;
- formulieren en NXTDRIVE blijven transparante prototypes zonder externe verwerking.

## Bronnen en eigenaarschap

| Onderwerp | Centrale bron | Eigenaar voor bevestiging |
| --- | --- | --- |
| prijzen en pakketinhoud | `data/pricing.json` | Van Dijk / administratie |
| plaatsen, canonicals en beelden | `data/regions.json` | Van Dijk / operatie |
| bedrijfs- en releasefeiten | `data/site-facts.json` | Van Dijk / juridisch |
| routecontract | `data/sitemap.json` | websitebeheer / SEO |
| beeldgebruik | `data/assets.json` | merk-/beeldreview |
| indexeringsgate | `.github/workflows/deploy-production.yml` | releaseverantwoordelijke |

## Volgende beheerhandeling

Werk eerst alle open punten in [`PRODUCTION_CHECKLIST.md`](PRODUCTION_CHECKLIST.md) af. Pas daarna mogen juridische teksten, NAP/schema, echte formulieren en `NEXT_PUBLIC_INDEXING_ENABLED=true` in één gereviewde release worden doorgevoerd. Het aanzetten van indexering zonder deze bevestigingen is bewust geen configuratiedefault.

Voor routes, assets, demo-afbakening, NXTDRIVE en QA gelden respectievelijk [`ROUTES_AND_CONTENT.md`](ROUTES_AND_CONTENT.md), [`ASSET_MANIFEST.md`](ASSET_MANIFEST.md), [`DEMO_DATA.md`](DEMO_DATA.md), [`NXTDRIVE_INTEGRATION.md`](NXTDRIVE_INTEGRATION.md) en [`QA_REPORT.md`](QA_REPORT.md).
