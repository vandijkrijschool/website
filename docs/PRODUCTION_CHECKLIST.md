# Production- en indexeringschecklist

## Technisch gereed

- [x] 29 beoogde indexroutes en 4 ondersteunende routes zijn gevuld;
- [x] canonicals, metadata en één H1 per route zijn geautomatiseerd gecontroleerd;
- [x] werkgebied bevat echte HTML-links naar exact 17 canonieke regiopagina’s;
- [x] prijzen en pakketinhoud komen uit één centrale bron en bedragen blijven in centen;
- [x] configuratorstate en proeflespayload blijven volledig bij query- en sessieherstel;
- [x] planner selecteert én bevestigt een moment zonder een boeking te claimen;
- [x] beelden zijn responsive en lokale locaties zijn als sfeerimpressie gelabeld;
- [x] sitewide launch gate, lege sitemap en veilige structured data zijn actief;
- [x] lint, types, tests, build, standalone smoke en browsermatrix zijn groen.

## Vereist vóór `NEXT_PUBLIC_INDEXING_ENABLED=true`

- [ ] juridische handelsnaam en publieke merknaam primair bevestigen;
- [ ] telefoon, e-mail, adres, plaatsweergave, KVK en openingstijden bevestigen;
- [ ] apex/www-keuze, TLS, DNS en permanente redirectrichting bevestigen;
- [ ] privacyverantwoordelijke, doeleinden, grondslagen, verwerkers, bewaartermijnen en rechtenroute vastleggen;
- [ ] algemene voorwaarden, annulering, no-show en restitutie juridisch goedkeuren;
- [ ] prijspeildatum, btw-status, lesduur, pakketgeldigheid en exameninclusies bevestigen;
- [ ] proeflesvoorwaarden bevestigen;
- [ ] bevestigen of inschrijfkosten en DriveYOU-garantiefonds verplicht zijn;
- [ ] actualiteit van 45 lessen, directe start en geen wachtlijst bevestigen;
- [ ] juridische/commerciële DriveYOU-relatie en garantiefondsvoorwaarden bevestigen;
- [ ] gegenereerde auto, belettering en locaties visueel goedkeuren;
- [ ] definitieve review-/leerlingdata verwijderen of aantoonbaar rechtmatig maken;
- [ ] live formulieren uitsluitend na privacy-, beveiligings- en providerreview activeren;
- [ ] bij NXTDRIVE: echt endpoint, contract en providerbevestiging implementeren;
- [ ] eindcontrole op het publieke domein uitvoeren en pas daarna de gate op `true` zetten.

De productionworkflow staat bewust op `NEXT_PUBLIC_INDEXING_ENABLED=false`. Alleen een expliciete, gereviewde wijziging mag dit omzetten.
