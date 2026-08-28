# Productie-livegangchecklist

Status per regel: `PASS`, `VOORWAARDELIJK`, `FAIL` of `N.V.T.`. Een P0-fout blokkeert livegang.

## P0 — inhoud en juridische basis

- [ ] officiële handelsnaam, KvK, contactgegevens en verantwoordelijke bevestigd;
- [ ] echte instructeur(s), WRM-bevoegdheid, ervaring, voertuig en foto toestemming bevestigd;
- [ ] prijzen, btw, lesduur, inclusies, examenkosten en pakketgeldigheid bevestigd;
- [ ] “Zeker Slagen” en herexamenregeling juridisch en commercieel uitgewerkt;
- [ ] werkelijk lesgebied en ophaalbeleid bevestigd;
- [ ] alle demo-reviews verwijderd of door geverifieerde publiceerbare reviews vervangen;
- [ ] privacyverklaring, lesvoorwaarden, annuleringsregels en cookiebeleid juridisch gecontroleerd;
- [ ] beeldrechten en eventuele model-/locatiereleases vastgelegd.

## P0 — techniek en gegevens

- [ ] productiebuild, lint, typecheck en tests slagen;
- [ ] NXTDRIVE-slots komen uit de productieagenda en reservering is atomisch;
- [ ] server-side validatie, rate limiting, spambeveiliging en idempotency actief;
- [ ] formulieren hebben serverfout-, timeout- en offlinefallback;
- [ ] secrets staan alleen in secretbeheer en nooit in clientbundels;
- [ ] logs, analytics en foutmonitoring maskeren persoonsgegevens;
- [ ] beveiligde leerlinglogin en autorisatie zijn getest;
- [ ] geen echte persoonsgegevens of demogegevens lekken naar publieke HTML of caches.

## P1 — UX, responsive en toegankelijkheid

- [ ] toetsenbordtest op alle navigatie, formulieren, configurator, widget en portaltabs;
- [ ] screenreadertest op minimaal VoiceOver/Safari of NVDA/Chrome/Firefox;
- [ ] contrast, focus, labels, foutmeldingen en 200% zoom gecontroleerd;
- [ ] responsive controle op 360, 390, 768, 820, 1024, 1280 en 1440 px;
- [ ] iOS Safari, Android Chrome, Chrome, Edge, Firefox en Safari gecontroleerd;
- [ ] geen horizontale overflow, overlap, afgebroken tekst of onbedoelde layout shift;
- [ ] touchdoelen en mobiele toetsenborden gecontroleerd;
- [ ] `prefers-reduced-motion` gecontroleerd.

## P1 — SEO en performance

- [ ] definitieve productiedomeinvarianten en redirects gekozen;
- [ ] unieke titles, descriptions, H1’s en canonicals op alle indexeerbare routes;
- [ ] lokale pagina’s bevatten voldoende unieke, feitelijk juiste lokale informatie;
- [ ] Organization/DrivingSchool/Service/FAQ-schema gevalideerd tegen zichtbare data;
- [ ] demo-ratings nooit in Review/AggregateRating-schema;
- [ ] `NEXT_PUBLIC_SITE_MODE=production` pas na alle bovenstaande controles;
- [ ] sitemap en robots op definitieve host gecontroleerd;
- [ ] Search Console en analytics/consent ingericht;
- [ ] Core Web Vitals doel: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1;
- [ ] hero, responsive beelden, fonts en third-party scripts gemeten.

## P1 — operatie

- [ ] e-mail/SMS-afzenderdomein en templates getest;
- [ ] CRM-/leadroutering en eigenaar per leadstatus vastgelegd;
- [ ] monitoring, alerts en escalatiepad ingericht;
- [ ] back-up, rollback en vorige release getest;
- [ ] DNS, TLS, redirects en healthcheck gereed;
- [ ] productie- en testtenant strikt gescheiden.

## P2 — beheer

- [ ] contentbeheerder en reviewpublicatieproces aangewezen;
- [ ] prijs- en voorwaardenwijzigingen hebben een vierogencontrole;
- [ ] periodieke link-, formulier-, toegankelijkheids- en performancecontrole gepland;
- [ ] assetregister bijgehouden bij iedere beeldvervanging;
- [ ] NXTDRIVE API-versie en webhookwijzigingen worden gemonitord.

## Blokkerende situaties

Niet live zetten bij: mislukte build; onbereikbare kernflow; foutieve prijsberekening; echte PII in demo of logs; onbeveiligde formulieren; kritieke toetsenbordblokkade; onbruikbare boekingsflow zonder fallback; onbevestigde beeldrechten; secrets in code; of een publiek indexeerbaar prototype met fictieve claims.

