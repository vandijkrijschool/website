# Route- en inhoudsinventaris

De applicatie bevat 18 inhoudelijke routes, aangevuld met 404-, loading- en errorstates.

| Route | Inhoud | Primaire actie |
| --- | --- | --- |
| `/` | premium homepage, configuratorpreview, pakketten, NXTDRIVE, regio en fotogalerij | pakket samenstellen / intake |
| `/rijlessen` | lesopbouw, curriculum, planning en digitale ondersteuning | intake / pakketten |
| `/lespakketten` | drie pakketkaarten, vergelijking en voorwaardenkader | pakket kiezen |
| `/configurator` | vierstaps interactieve pakketkeuze | route bespreken |
| `/proefles` | intake-uitleg, NXTDRIVE-slots en formulier | proeflesmoment aanvragen |
| `/werkwijze` | vijf fasen van kennismaking tot examenvoorbereiding | persoonlijk startplan |
| `/over-ons` | visie, fotografie, DriveYou/NXTDRIVE en demoprofiel | kennismaken |
| `/reviews` | zes fictieve, gelabelde voorbeeldreviews en beoordelingscriteria | intake |
| `/leerlingomgeving` | interactieve NXTDRIVE-demo met vier tabs | hulp bij toegang |
| `/contact` | demo-contactkanalen en werkend contactformulier | demo-vraag versturen |
| `/faq` | vier categorieën met achttien vragen | contact / intake |
| `/rijschool-den-haag` | lokale lescontext, foto, situaties en FAQ | intake Den Haag |
| `/regio/scheveningen` | kust-, tram- en verkeerscontext | intake Scheveningen |
| `/regio/rijswijk` | woonwijken, stedelijke routes en verbindingen | intake Rijswijk |
| `/regio/voorburg` | compacte straten, fietsers en verbindingswegen | intake Voorburg |
| `/regio/leidschendam` | woonwijken, winkelverkeer en N14-context | intake Leidschendam |
| `/privacy` | complete, indexeerbare demo-privacytekst | privacywerking bekijken |
| `/voorwaarden` | complete, indexeerbare mockvoorwaarden | demo-afspraken bekijken |

Aanvullende systeemroutes:

- `sitemap.xml` — bevat alle 18 publieke demoroutes
- `robots.txt` — staat crawling toe en verwijst naar de sitemap
- `manifest.webmanifest` — PWA-identiteit en iconen
- onbekende route — branded 404
- route-loading en algemene foutstatus — branded fallback

## Interne linklogica

- homepage linkt naar iedere belangrijke commerciële route;
- lespagina’s verwijzen naar pakketten, configurator en intake;
- lokale pagina’s verwijzen naar de regiohub en de andere gebieden;
- iedere conversieroute eindigt bij intake of contact, nooit bij checkout;
- juridische en secundaire routes zijn vanuit de footer bereikbaar.
