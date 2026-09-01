# Routes en inhoud

[`data/sitemap.json`](../data/sitemap.json) is het routecontract: 29 beoogde indexroutes en 4 ondersteunende noindexroutes. Zolang de launch gate uit staat, zijn sitewide `noindex,nofollow` en een lege runtime-sitemap bewust van kracht.

## Kernroutes

| Route | Hoofdfunctie |
| --- | --- |
| `/` | merkintro, pakketten, aanpak en werkgebied |
| `/rijlessen` | lesopbouw en bronbegrenzing |
| `/lespakketten` | vijf startpakketten vergelijken |
| `/tarieven` | alle losse, vervolg-, herexamen- en starttarieven |
| `/configurator` | ervaring, planning, pakket en betaalvoorkeur |
| `/proefles` | veilige proefles- en slotdemo |
| `/theorie` | iTheorie-inhoud en bronprijzen |
| `/werkwijze` | opleiding en NXTDRIVE-prototype |
| `/over-ons` | merk- en organisatiegrens |
| `/faq` | bronvragen met verificatiestatus |
| `/contact` | lokale contactvalidatie zonder verzending |
| `/werkgebied` | HTML-hub naar alle 17 plaatsen |

## Regioroutes

Den Haag heeft uitsluitend `/rijschool-den-haag`. De overige canonieke routes zijn:

`/regio/den-hoorn`, `/regio/de-lier`, `/regio/delft`, `/regio/honselersdijk`, `/regio/kwintsheul`, `/regio/leidschendam`, `/regio/monster`, `/regio/naaldwijk`, `/regio/nootdorp`, `/regio/pijnacker`, `/regio/poeldijk`, `/regio/rijswijk`, `/regio/scheveningen`, `/regio/s-gravenzande`, `/regio/voorburg` en `/regio/wateringen`.

Iedere pagina heeft eigen titel, beschrijving, H1, lokale tekst, sfeerbeeld, situaties, nabije plaatsen, breadcrumb en canonical. `/regio/den-haag` en onbekende slugs geven 404.

## Ondersteunende routes

| Route | Robots | Reden |
| --- | --- | --- |
| `/reviews` | `noindex,follow` | gelabelde demoreviews |
| `/leerlingomgeving` | `noindex,follow` | interactieve portaldemo |
| `/privacy` | `noindex,follow` | nog geen definitieve juridische tekst |
| `/voorwaarden` | `noindex,follow` | nog geen definitieve juridische tekst |

Systeemroutes: `/api/health`, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest` en de standaard 404-/error-/loadingstates.
