# Demo-releasechecklist

Dit bestand bewaart zijn bestaande naam voor compatibiliteit met de overdracht. Het beschrijft de release van een productie-afgewerkt demo-prototype, niet de lancering van een echte rijschooldienst.

## Gereed voor demo

- [x] alle 18 inhoudelijke routes zijn gevuld;
- [x] contactgegevens, prijzen, voorwaarden, reviews, team- en leerlinggegevens zijn herkenbare mockdata;
- [x] configurator, proeflesplanner, contactflow en leerlingomgeving werken interactief;
- [x] formulieren verzenden of bewaren geen persoonsgegevens;
- [x] NXTDRIVE-scenario’s worden lokaal gesimuleerd, inclusief lege agenda, fout, timeout en slotconflict;
- [x] juridische demopagina’s zijn volledig ingevuld en duidelijk niet-bindend;
- [x] de opdrachtgever heeft bevestigd over de gebruikte beeldrechten te beschikken;
- [x] het demo-prototype is publiek indexeerbaar en publiceert alle 18 routes in de sitemap;
- [x] mockreviews worden niet als Review- of AggregateRating-schema gepubliceerd;
- [x] mockprijzen worden niet als Product-, Offer- of Service-schema gepubliceerd;
- [x] lint, typecheck, bron-, build-, HTML- en browsercontroles slagen;
- [x] toetsenbordbediening, foutstatussen, reduced motion en responsive reflow zijn ingericht;
- [x] er zijn geen secrets, echte accounts, echte betalingen of externe gegevensstromen;
- [x] Node.js 24 en Next.js standalone output zijn ingericht;
- [x] `/api/health` rapporteert omgeving en actieve Git-revisie;
- [x] production promotion gebruikt uitsluitend dezelfde fast-forward `main`-SHA;
- [x] deployment is beperkt tot de repository-scoped runner en `dg-site-deploy`.

## Bewuste demosimulaties

Voor dit prototype zijn de volgende onderdelen opzettelijk niet gekoppeld en dus geen ontbrekende vereisten:

- live NXTDRIVE-agenda en reserveringen;
- CRM, e-mail, sms of WhatsApp;
- betaling, facturatie of kredietcontrole;
- accountlogin en leerlingautorisatie;
- analytics en consentmanagement;
- spambeveiliging, rate limiting en productie-logging;
- definitieve bedrijfs-, commerciële of juridische gegevens;
- aanvullende functionele monitoring naast de publieke deployment-healthcheck.

## Optioneel bij een toekomstige echte dienst

Als dit prototype later de basis wordt van een echte publieke rijschoolsite, kunnen mockadapters en mockdata doelgericht worden vervangen. Dat is een nieuw projectbesluit en geen voorwaarde voor de huidige demo. Gebruik dan `docs/NXTDRIVE_INTEGRATION.md` als technische uitbreidingsnotitie en voer opnieuw juridische, privacy-, beveiligings-, toegankelijkheids- en browsercontroles uit op het uiteindelijke domein.

## Demo-releasegrens

De demo niet presenteren bij een mislukte build, onbereikbare kernflow, foutieve prijsberekening, echte persoonsgegevens in bron of logs, kritieke toetsenbordblokkade of ontbrekende demo-labels.
