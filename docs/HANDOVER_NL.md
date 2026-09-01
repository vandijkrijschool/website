# Overdracht Van Dijk Rijschool

De aangeleverde implementatieopdracht en het overdrachtspakket zijn verwerkt bovenop bronrevision `fea1503fac1d5f4ca9cb7847f762e4a7920d0cae`. De repository gebruikt nu de centrale JSON-bronnen uit het pakket, de complete responsive beeldset en het contract van 29 beoogde indexroutes.

## Belangrijkste keuzes

- op expliciet gebruikersverzoek van 1 september 2026 is bezoekersgerichte verificatietaal verwijderd en vervangen door één consistente tijdelijke mock-dataset;
- de actieve canonical origin blijft op expliciet gebruikersverzoek voorlopig `https://voorbeeld.vandijkrijschool.nl`; migratie naar de apex is uitgesteld;
- de release wordt veilig gedeployed met sitewide noindex en een lege sitemap;
- Den Haag bestaat alleen op `/rijschool-den-haag`; 16 andere plaatsen gebruiken `/regio/[slug]`;
- locatiebeelden worden klantgericht gebruikt zonder interne reviewlabels in de zichtbare pagina’s;
- formulieren, agenda en NXTDRIVE tonen een volledig gevulde mockervaring; de adapters verwerken nog niets extern.

## Tijdelijke mock-dataset

De zichtbare website gebruikt voorlopig onder meer: lessen van 60 minuten, starten binnen 7 dagen, 12 maanden pakketgeldigheid, 48 uur annulering, ophalen bij huis/school/werk/station, openingstijden maandag t/m zaterdag, instructeur Ruben van Dijk en voorbeeldcontactgegevens op het subdomein. `data/site-facts.json` en `data/pricing.json` markeren deze waarden intern als `temporaryMockData`.

De mock-data mag niet als feitelijke bedrijfsinformatie naar de apex, indexering of commerciële structured data worden gemigreerd. De technische noindexgate en uitgeschakelde Offer/Product-schema’s blijven daarom actief.

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

Vervang eerst alle `temporaryMockData` door door de ondernemer goedgekeurde feiten en werk daarna de open punten in [`PRODUCTION_CHECKLIST.md`](PRODUCTION_CHECKLIST.md) af. Pas vervolgens mogen NAP/schema, echte formulierverwerking en `NEXT_PUBLIC_INDEXING_ENABLED=true` in één gereviewde release worden doorgevoerd.

Voor routes, assets, demo-afbakening, NXTDRIVE en QA gelden respectievelijk [`ROUTES_AND_CONTENT.md`](ROUTES_AND_CONTENT.md), [`ASSET_MANIFEST.md`](ASSET_MANIFEST.md), [`DEMO_DATA.md`](DEMO_DATA.md), [`NXTDRIVE_INTEGRATION.md`](NXTDRIVE_INTEGRATION.md) en [`QA_REPORT.md`](QA_REPORT.md).
