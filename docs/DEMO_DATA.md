# Data- en demogrens

## Bevestigde brondata

De prijstabellen in [`data/pricing.json`](../data/pricing.json), de 17 werkgebieden in [`data/regions.json`](../data/regions.json), het beoogde routecontract in [`data/sitemap.json`](../data/sitemap.json) en de statussen in [`data/site-facts.json`](../data/site-facts.json) zijn de centrale bron. De website voegt geen oude mockpakketten of afgeronde centbedragen toe.

De vijf startpakketten zijn Pakket 20, 30, 40, 50 en Alles-in-1. Losse tarieven, vervolgpakketten en herexamenpakketten worden uit dezelfde prijsbron getoond. De toeslag voor betaling in 2, 3 of 4 termijnen is eenmalig € 39.

## Niet als bevestigd publiceren

- duur van één rijles, btw-status, prijspeildatum en pakketgeldigheid;
- annulerings-, no-show- en restitutievoorwaarden;
- exacte exameninclusies en voorwaarden van de gratis proefles;
- verplichte toepasselijkheid van € 39,50 inschrijfkosten en € 41,50 garantiefonds;
- juridische handelsnaam, NAP, KVK, e-mail, openingstijden en privacyverantwoordelijke;
- actuele beschikbaarheid, geen wachtlijst en gemiddeld 45 lessen;
- exacte DriveYOU-relatie en een echte NXTDRIVE-endpoint/widget.

## Bewuste demo-inhoud

- de proeflesplanner genereert lokaal exact drie momenten en kan loading, leeg, providerfout, timeout en conflict tonen;
- formulierinzendingen worden lokaal gevalideerd maar niet verzonden of opgeslagen;
- de leerlingomgeving en reviews zijn duidelijk gelabelde demonstraties en staan op `noindex`;
- gegenereerde voertuig- en locatiescènes zijn sfeerimpressies.

Geen UI-successtatus betekent dat een afspraak, betaling, bericht of account extern is verwerkt.
