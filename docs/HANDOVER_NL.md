# Prototype-overdracht — Van Dijk Rijschool

## 1. Doel en status

Dit pakket is een volledig gevuld, klikbaar en productie-afgewerkt demo-prototype voor Van Dijk Rijschool in regio Den Haag. Het kan direct worden gebruikt voor presentatie, stakeholderreview en demonstratie. Alle mockdata is bewust onderdeel van het eindresultaat.

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
- vierstaps pakketconfigurator met volledig defensief sessieherstel, live berekeningen en clipboardfallback
- proefleswidget met Amsterdamse tijdzone, dynamische datumlabels, meerdere dagdelen, drie slots en vijf testbare agendasituaties
- twee formuliertypes met veldvalidatie, laad-, fout-, timeout- en bevestigingsstatus
- interactieve leerlingomgeving met vier tabs
- gevulde review-, team-, contact-, FAQ-, regionale en juridische demopagina’s
- technische SEO-laag, structured data zonder fictieve reviewratings, 404 en route states

## 4. Data-eigenaarschap

| Onderdeel | Bron in prototype | Eventuele latere echte bron |
| --- | --- | --- |
| merk, navigatie en plaatsen | `app/lib/site.ts` | Van Dijk / contentbeheer |
| pakketten en prijzen | `app/lib/packages.js` | Van Dijk / administratie |
| reviews, profiel, contact en portal | `app/lib/demo.ts` | officiële bron / NXTDRIVE |
| beschikbaarheid | `TrialBookingWidget.tsx` | NXTDRIVE agenda |
| intake- en contactleads | `LeadForm.tsx` | NXTDRIVE/CRM/e-mail |
| beelden | `public/images/` | zie assetmanifest |

De integratiegrenzen staan los van de UI in `app/lib/nxtdrive.ts` en `app/lib/leads.ts`. De configuratorlogica staat in `app/lib/configurator.ts`, zodat herstel en berekeningen zonder browser-UI testbaar blijven.

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

## 6. Bewuste demogrenzen

De prototypeweergave is volledig. De volgende functies worden bewust gesimuleerd of niet uitgevoerd en zijn geen voorwaarden voor demo-oplevering:

- echte NXTDRIVE-beschikbaarheid en atomische reservering;
- beveiligde leerlinglogin en tenantdoorverwijzing;
- server-side formulierverwerking, spambeveiliging en rate limiting;
- transactionele bevestigingen via e-mail/SMS;
- echte bedrijfs-, team-, voertuig-, prijs- en reviewgegevens;
- juridisch bindende privacyverklaring, voorwaarden en cookieconfiguratie;
- analytics en consentmanagement.

## 7. Acceptatiecriteria

De overdracht is technisch gereed wanneer:

- `npm run check` en `npm run build` slagen;
- alle routes direct openen en alle interne CTA’s bestaan;
- configurator, proefleswidget, formulieren en portaltabs bruikbaar zijn met toetsenbord en touch;
- geen horizontale overflow optreedt op 360–1440 px;
- demo-data zichtbaar gelabeld blijft zolang echte data ontbreekt;
- alle routes publiek indexeerbaar zijn en mockclaims in de zichtbare inhoud herkenbaar als demo blijven gelabeld.

Zie `PRODUCTION_CHECKLIST.md` voor de afgeronde demo-releasechecklist en optionele toekomstige uitbreidingen.
