# Productie- en indexeringschecklist

Bijgewerkt op 1 oktober 2026 naar aanleiding van de livegang en het verzoek om SEO-optimalisatie.

## Vastgelegde productie-instellingen

- Canonical origin: `https://vandijkrijschool.nl`.
- `APP_ENVIRONMENT=production` en `NEXT_PUBLIC_INDEXING_ENABLED=true` tijdens build én runtime.
- 28 inhoudsroutes in `/sitemap.xml`; drie ondersteunende routes met `noindex,follow` erbuiten.
- Publieke HTML, CSS, JavaScript en afbeeldingen zijn crawlbaar; `/api/` is uitgesloten.
- De sitemap gebruikt een echte inhoudelijke wijzigingsdatum, niet automatisch iedere deploydatum.
- Development en previews blijven standaard `noindex,nofollow`.
- Geen verzonnen straatadres, reviews, beoordelingen of lokale vestigingen in structured data.

## Automatische releasecontroles

De productie-workflow stopt bij een fout in:

- dependency-audit, lint, TypeScript, regressietests of build;
- SMTP-verbinding en authenticatie;
- browsertests voor responsive layout, menu’s, toegankelijkheidsinteracties en formulieren;
- HTTP-status, canonicals, unieke metadata, robots of structured data op alle 31 pagina’s;
- sitemapinhoud, afbeeldingen, interne links, query-URL’s en echte 404’s;
- publieke healthcheck/revisie of permanente domeinredirects na publicatie.

Lokaal: `npm run check`. Losse live SEO-controle: `SEO_CHECK_REDIRECTS=true npm run verify:seo`.

## Doorlopend beheer buiten de release

- Verifieer het domein in Google Search Console en dien `https://vandijkrijschool.nl/sitemap.xml` in.
- Volg daadwerkelijke indexering, zoekprestaties en Core Web Vitals in Search Console; technische indexeerbaarheid garandeert geen opname of positie.
- Houd bedrijfsprofiel, openingstijden, diensten, prijzen en juridische informatie actueel. Voeg alleen bevestigde gegevens aan de website en structured data toe.
- Werk de sitemapdatum bij na betekenisvolle inhoudswijzigingen; maak bij latere individuele pagina-updates een datum per route.
- Controleer formulieraflevering periodiek. SMTP-authenticatie alleen bewijst niet dat een bericht in de inbox belandt.
