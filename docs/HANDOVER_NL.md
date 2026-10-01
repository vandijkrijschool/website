# Overdracht Van Dijk Rijschool

Actuele situatie vanaf 1 oktober 2026: de website is live op `https://vandijkrijschool.nl`. Op verzoek van de opdrachtgever is indexering ingeschakeld. Oudere prototypeverslagen beschrijven niet meer de actuele productieconfiguratie.

## Productie

- 28 indexeerbare inhoudspagina’s, inclusief 17 werkgebiedpagina’s;
- `/leerlingomgeving`, `/privacy` en `/voorwaarden` blijven `noindex,follow` en staan niet in de sitemap;
- `www`, het oude `voorbeeld`-subdomein en HTTP verwijzen permanent naar HTTPS op het hoofddomein;
- bedrijfsgegevens, 50 minuten lesduur, pakketprijzen en de vrijwillige DriveYOU-garantiefondsdeelname volgen de aangeleverde bedrijfsinformatie;
- de instructeur is Eric van Dijk; de digitale leerlingomgeving heet PlanGo;
- proefles- en contactaanvragen worden via SMTP naar `info@vandijkrijschool.nl` verzonden;
- de generator en fictieve reviews zijn verwijderd;
- de zwarte footer en het proeflesformulier bovenaan de proeflespagina blijven behouden.

## Bronnen en beheer

| Onderwerp | Centrale bron |
| --- | --- |
| prijzen en pakketinhoud | `data/pricing.json` |
| plaatsen, canonicals en beelden | `data/regions.json` |
| bedrijfsgegevens en hoofddomein | `data/site-facts.json` |
| indexeerbare routes en wijzigingsdatum | `data/sitemap.json` |
| paginatitels en omschrijvingen | `app/lib/content.ts` |
| productieconfiguratie en releasecontroles | `.github/workflows/deploy-production.yml` |

`npm run check` controleert de productiebuild, alle routes en de browsermatrix. Een push naar `production` start de releaseworkflow; `main` alleen publiceert niets. De workflow controleert na publicatie opnieuw de live HTML, sitemap, robots, interne links en redirects. SMTP-credentials blijven uitsluitend in de productiegeheimen.

Zie [SEO-beheer](SEO_RELEASE_2026-10-01.md) en [productiechecklist](PRODUCTION_CHECKLIST.md) voor indexering en verdere opvolging.
