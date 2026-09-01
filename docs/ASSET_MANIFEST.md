# Afbeeldingenmanifest

De machineleesbare bron staat in [`data/assets.json`](../data/assets.json). De website gebruikt 23 beeldbasissen met varianten van 640, 960, 1280 en 1600 px (92 WebP-bestanden) en 19 Open Graph-JPG’s van 1200×630.

## Algemeen beeld

| Basis | Belangrijkste route(s) |
| --- | --- |
| `hero-den-haag-blue-hour` | `/` |
| `intake-bij-lesauto` | `/proefles`, `/over-ons` |
| `rijles-interieur-den-haag` | `/rijlessen`, `/werkwijze` |
| `nxtdrive-tablet-met-lesauto` | `/leerlingomgeving`, `/werkwijze` |
| `theorie-itheorie-met-lesauto` | `/theorie` |
| `den-haag-vredespaleis` | `/`, `/rijschool-den-haag` |

De overige 17 beeldbasissen volgen exact de `imageBase`-velden in [`data/regions.json`](../data/regions.json). Merklogo’s, iconen en manifestbestanden blijven rechtstreeks onder `public/` en `public/images/` staan.

## Technisch gebruik

- `ResponsiveImage` gebruikt `next/image` met expliciete `sizes`;
- alleen het echte LCP-beeld krijgt `priority`;
- AVIF en WebP zijn in `next.config.ts` ingeschakeld;
- 8K-bronbestanden worden niet aan websitebezoekers geserveerd;
- alle gebruikte lokale beelden worden door tests op bestaan en decodeerbaarheid gecontroleerd.

## Goedkeuringsgrens

De locatiebeelden zijn gegenereerde sfeerimpressies. Ze bewijzen geen vaste lesroute, vestiging, ophaalpunt of echt lesmoment. Menselijke goedkeuring van voertuig, belettering en merknauwkeurigheid blijft verplicht vóór publieke merkgoedkeuring. De aangeleverde 8K-master is opgeschaald en niet native 8K; er is geen transparante cut-out.
