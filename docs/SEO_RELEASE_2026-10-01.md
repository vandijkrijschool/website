# SEO-release — 1 oktober 2026

## Aanleiding

Het hoofddomein was live, maar de applicatie gebruikte nog de oude preview-origin, sitewide `noindex,nofollow` en een lege sitemap. De infrastructuur verwees `www`, HTTP en het preview-subdomein al permanent naar het hoofddomein.

## Wijzigingen

- De live productiebuild is expliciet indexeerbaar en gebruikt overal het HTTPS-hoofddomein.
- `/sitemap.xml` bevat de 28 canonieke inhoudspagina’s en relevante bestaande afbeeldingen; `/robots.txt` verwijst naar de sitemap.
- Titels en omschrijvingen zijn uniek, beschrijvend en afgestemd op de werkelijke diensten en regio’s. De homepage benoemt Den Haag ook in de H1.
- Canonicals verwijderen trackingparameters; dubbele domeinen en trailing slashes worden permanent omgeleid. Niet-bestaande pagina’s geven 404 plus noindex, zonder homepage-canonical.
- Organization, WebSite, WebPage, BreadcrumbList, Person en Service/Offer-data sluiten aan op de zichtbare inhoud. Prijzen komen uit de centrale prijslijst. KVK is een bedrijfsidentifier, niet een btw-nummer. Er is geen verzonnen vestigingsadres of reviewscore toegevoegd.
- Extra HTML-links in de zwarte footer en regiopagina’s versterken navigatie en vindbaarheid. De menuweergave op tablet is hersteld.
- Social metadata en afbeeldingen verwijzen naar het live domein. Zoekmachines mogen grote afbeeldingsvoorbeelden tonen.
- De tijdelijke laadmelding gebruikt geen extra H1 meer; ook in de aangeleverde HTML staat maar één inhoudelijke H1 per pagina.
- Een herbruikbare crawlercontrole test alle 31 pagina’s, Googlebot/Bingbot, sitemap, robots, structured data, interne links, afbeeldingen, tracking-URL’s en 404’s. Dezelfde controle draait vóór en na deployment.

## Lokale verificatie

- `npm run check`: lint, TypeScript, 26 regressietests, productiebuild, SEO-smoke en browsermatrix geslaagd.
- Productie: 31 pagina’s, 28 sitemap-URL’s en 38 sitemap-/socialafbeeldingen gecontroleerd.
- Afzonderlijke previewbuild: alle pagina’s noindex en sitemap leeg; dezelfde crawlercontrole geslaagd.
- Browsermatrix: 150 route/viewportcombinaties op tien schermformaten, plus menu-interactie op 390/820/1024 px, intakeformulier bovenaan en reduced motion.
- Visueel gecontroleerd: homepage mobiel/tablet, zwarte footer desktop en uitgebreide regiokaarten mobiel.
- Productie-dependencyaudit: geen bekende kwetsbaarheden gemeld.

## Beheer

`npm run build:production` maakt expliciet een indexeerbare live build. `npm run build` respecteert de meegegeven omgeving en blijft zonder productie-instellingen veilig noindex. Een preview-test kan met `APP_ENVIRONMENT=preview NEXT_PUBLIC_SITE_URL=https://vandijkrijschool.nl NEXT_PUBLIC_INDEXING_ENABLED=false npm run build`, gevolgd door `SEO_EXPECT_INDEXING=false npm run test:smoke`.

De datum in `data/sitemap.json` is de datum van deze sitebrede inhoudelijke SEO-wijziging. Niet bij iedere technische deploy verversen. Gebruik per-route datums wanneer pagina’s later afzonderlijk worden bijgewerkt.

De drie ondersteunende pagina’s blijven bereikbaar voor bezoekers en crawlers, maar worden bewust niet geïndexeerd. API’s hebben bovendien een `X-Robots-Tag: noindex, nofollow` header.

## Externe opvolging

Google Search Console is niet vanuit deze repository geverifieerd. De eigenaar kan de domeinproperty verifiëren en de sitemap indienen, daarna URL-inspectie en indexeringsrapporten volgen. Er worden geen gegarandeerde posities, rich results of onmiddellijke indexering geclaimd. Structured data beschrijft de site, maar maakt niet automatisch aanspraak op uitgebreide zoekresultaten.

Bronnen: [Google sitemaprichtlijnen](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [robots-metatags](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization) en [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business).
