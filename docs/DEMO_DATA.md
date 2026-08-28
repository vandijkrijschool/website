# Demo-dataregister

Alle items in dit document zijn bewust fictieve, consistente mockdata voor een productie-afgewerkt demo-prototype. Ze maken de ervaring compleet zonder een echte onderneming, leerling of commerciële aanbieding voor te stellen.

## Pakketten en tarieven

De pakketdata staat centraal in `app/lib/packages.js`, met een her-export via `app/lib/site.ts`.

| ID | Naam | Lesuren | Mockprijs | Belangrijkste inclusies |
| --- | --- | ---: | ---: | --- |
| `instap` | Instappakket | 20 | € 1.250 | praktijkexamen, lesplan, NXTDRIVE |
| `meest-gekozen` | Meest gekozen | 30 | € 1.950 | praktijkexamen, tussentijdse toets, NXTDRIVE |
| `zeker-slagen` | Zeker Slagen | 40 | € 2.450 | praktijkexamen, tussentijdse toets, voorwaardelijke herexamenregeling |

Losse les: € 60 per lesuur. Demo-afspraken: één lesuur duurt 60 minuten, pakketten zijn twaalf maanden geldig, kosteloos annuleren kan tot 24 uur vooraf en betaling kan in drie gelijke mocktermijnen. Er vindt geen echte verkoop of betaling plaats.

## Fictieve persoonsgegevens

- instructeur: Robin van Dijk — demonstratieprofiel;
- reviews: Noor, Milan, Sara, Yassin, Lotte en Daan;
- leerlingomgeving: Noor, pakket “Meest gekozen”, 12 gevolgde lesuren en 68% voortgang;
- bevestigingsreferentie: `DEMO-NXT-2048`.

Geen van deze personen of gegevens vertegenwoordigt een echte leerling of medewerker.

## Contactvoorbeelden

- telefoon: `070 000 00 00`;
- e-mail: `demo@vandijkrijschool.example`;
- beschikbaarheid: ma–vr 08:00–20:30, zaterdag 08:00–16:00;
- locatie: Den Haag, bezoek op afspraak.

Deze gegevens zijn niet actief gekoppeld.

## Beschikbaarheid

De proefleswidget genereert lokaal drie toekomstige data op basis van de gekozen weekdag en dagdelen. De tijden zijn fixtures:

- ochtend: 09:00, 10:30, 11:15;
- middag: 13:00, 14:30, 16:00;
- avond: 17:30, 18:30, 19:15.

De scenariokiezer simuleert een normale flow, lege agenda, providerfout, timeout en een ingenomen eerste slot. De formulieradapter simuleert succes, koppelfout en timeout. Geen scenario doet een netwerkcall of bewaart formulierinvoer.

## Reviews en structured data

De reviewteksten zijn fictief en dragen ieder het label `Demo-review`. Er wordt geen `Review` of `AggregateRating` JSON-LD gepubliceerd. Mockprijzen worden evenmin als commerciële Product-, Offer- of Service-data aangeboden.

## Optionele vervanging bij een toekomstige echte site

Pas wanneer later expliciet een echte publieke dienst wordt gebouwd, kunnen bedrijfsgegevens, instructeurs, tarieven, reviews, lesgebied, juridische teksten en integraties door echte bronnen worden vervangen. Deze vervanging valt buiten de huidige demo en blokkeert de oplevering niet.
