# Data- en publicatiegrens

## Bevestigde brondata

De prijstabellen in [`data/pricing.json`](../data/pricing.json), de 17 werkgebieden in [`data/regions.json`](../data/regions.json), het beoogde routecontract in [`data/sitemap.json`](../data/sitemap.json) en de statussen in [`data/site-facts.json`](../data/site-facts.json) zijn de centrale bron. De website voegt geen oude mockpakketten of afgeronde centbedragen toe.

De vijf startpakketten zijn Pakket 20, 30, 40, 50 en Alles-in-1. Losse tarieven, vervolgpakketten en herexamenpakketten worden uit dezelfde prijsbron getoond. De toeslag voor betaling in 2, 3 of 4 termijnen is eenmalig € 39.

## Bevestigd in de laatste polijstronde

- één rijles duurt 50 minuten, bedragen zijn inclusief btw en pakketten blijven 12 maanden geldig;
- voor nieuwe leerlingen geldt € 39,50 inschrijfkosten;
- deelname aan het DriveYOU-garantiefonds is vrijwillig en kost eenmalig € 41,50;
- Van Dijk Rijschool is zelfstandig franchisenemer van DriveYOU;
- het landelijke gemiddelde bedraagt volgens het CBR ongeveer 43 lesuren;
- planning en voortgang verlopen via PlanGo.

## Niet als externe verwerking presenteren

- de leerlingomgeving verwijst naar de externe PlanGo-omgeving en blijft op `noindex`;
- een proeflesaanvraag is een aanvraag en geen automatisch bevestigde afspraak;
- gegenereerde voertuig- en locatiescènes zijn sfeerimpressies.

Alleen het mailformulier verwerkt een aanvraag extern via de geconfigureerde SMTP-route. Een succesmelding claimt geen definitieve afspraak.
