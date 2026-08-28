# Prototype-overdracht — Van Dijk Rijschool

## 1. Doel en status

Dit pakket is een volledig gevuld, klikbaar premium prototype voor Van Dijk Rijschool in regio Den Haag. Het kan worden gebruikt voor presentatie, stakeholderreview, contentbevestiging en technische doorontwikkeling.

De primaire bezoekersreis is:

1. kennismaken met merk, aanpak en lesgebied;
2. pakketten vergelijken of de configurator doorlopen;
3. voorkeursdag en dagdelen selecteren;
4. uit drie NXTDRIVE-demomomenten kiezen;
5. de formulierflow tot en met demobevestiging afronden.

Het prototype verricht geen echte boeking, betaling, accountlogin of gegevensopslag.

## 2. Visueel systeem

De gekozen richting is “Blackline Velocity”: matzwart, grafiet, wit en verkeersgeel. De homepage gebruikt een filmische lesauto-hero, een zwevende voordelenkaart op de sectiegrens, cockpitachtige configuratorpanelen en een Haagse fotogalerij.

Belangrijkste tokens staan in `app/globals.css`:

- `--ink`, `--panel`, `--panel-raised` — donkere oppervlakken
- `--text`, `--muted` — teksthiërarchie
- `--yellow`, `--yellow-deep`, `--yellow-soft` — merk- en actiekleur
- `--radius-*`, `--shadow` — componentvorm en diepte
- `--ease-premium`, `--motion-*` — motionritme

Breakpoints: 1060, 900, 820, 560 en 380 px. Motion wordt uitgeschakeld bij `prefers-reduced-motion: reduce`.

## 3. Gebouwde onderdelen

- gedeelde sticky header, mobiele navigatie en uitgebreide footer
- homepage met hero, USP-rail, over-sectie, configuratorpreview, pakketten, werkwijze, NXTDRIVE, regio, Haagse fotogalerij en FAQ
- vierstaps pakketconfigurator met sessieopslag en live berekeningen
- proefleswidget met dynamische datumlabels, meerdere dagdelen en drie slots
- twee formuliertypes met validatie en gesimuleerde verwerking
- interactieve leerlingomgeving met vier tabs
- gevulde review-, team-, contact-, FAQ-, regionale en juridische conceptpagina’s
- technische SEO-laag, structured data zonder fictieve reviewratings, 404 en route states

## 4. Data-eigenaarschap

| Onderdeel | Bron in prototype | Productie-eigenaar |
| --- | --- | --- |
| merk, navigatie en plaatsen | `app/lib/site.ts` | Van Dijk / contentbeheer |
| pakketten en prijzen | `app/lib/site.ts` | Van Dijk / administratie |
| reviews, profiel, contact en portal | `app/lib/demo.ts` | officiële bron / NXTDRIVE |
| beschikbaarheid | `TrialBookingWidget.tsx` | NXTDRIVE agenda |
| intake- en contactleads | `LeadForm.tsx` | NXTDRIVE/CRM/e-mail |
| beelden | `public/images/` | zie assetmanifest |

## 5. Belangrijkste componenten

| Component | Verantwoordelijkheid |
| --- | --- |
| `SiteChrome.tsx` | header, footer, breadcrumbs, page hero en JSON-LD |
| `Marketing.tsx` | sectiekoppen, pakketten, USP’s en zekerheden |
| `Configurator.tsx` | pakketkeuze, berekening, sessie en resultaat |
| `TrialBookingWidget.tsx` | voorkeuren, slotgeneratie en slotselectie |
| `LeadForm.tsx` | validatie, verwerking en bevestiging |
| `StudentPortalDemo.tsx` | agenda, voortgang en lesverslagen |
| `DemoContent.tsx` | herkenbare demo-disclaimer |

## 6. Releasegrenzen

De prototypeweergave is volledig; de volgende functies vereisen productie-integratie:

- echte NXTDRIVE-beschikbaarheid en atomische reservering;
- beveiligde leerlinglogin en tenantdoorverwijzing;
- server-side formulierverwerking, spambeveiliging en rate limiting;
- transactionele bevestigingen via e-mail/SMS;
- echte bedrijfs-, team-, voertuig-, prijs- en reviewgegevens;
- definitieve privacyverklaring, voorwaarden en cookieconfiguratie;
- analytics en consentmanagement.

## 7. Acceptatiecriteria

De overdracht is technisch gereed wanneer:

- `npm run check` en `npm run build` slagen;
- alle routes direct openen en alle interne CTA’s bestaan;
- configurator, proefleswidget, formulieren en portaltabs bruikbaar zijn met toetsenbord en touch;
- geen horizontale overflow optreedt op 360–1440 px;
- demo-data zichtbaar gelabeld blijft zolang echte data ontbreekt;
- de site `noindex` blijft totdat productiegegevens en juridische teksten zijn goedgekeurd.

Zie `PRODUCTION_CHECKLIST.md` voor de definitieve livegangpoort.

