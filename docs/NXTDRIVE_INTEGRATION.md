# NXTDRIVE-integratiegrens

Er is geen bevestigd NXTDRIVE-endpoint, widgetcontract, tenant-ID, authenticatiemethode of slotduur aangeleverd. De huidige implementatie doet daarom geen netwerkcall en claimt nooit een boeking.

## Huidige demo

`app/lib/nxtdrive.ts` biedt lokale scenario’s voor `happy`, `empty`, `provider-error`, `timeout` en `slot-conflict`. Alleen `happy` levert exact drie momenten. De widget verzamelt:

- één voorkeursdag;
- één of meer dagdelen;
- één gekozen moment;
- een aparte expliciete bevestiging.

`app/lib/leads.ts` bouwt daarna een volledige demopayload met contactvelden, startmoment en configuratorcontext. De teruggegeven status is uitsluitend lokaal gevalideerd.

## Contract vóór echte aansluiting

Laat NXTDRIVE of DriveYOU eerst schriftelijk bevestigen:

- API-/widget-URL, versie en toegestane client/serverarchitectuur;
- authenticatie, tenant, rate limits en sandbox;
- afspraaktype, tijdzone, slotduur, expiratie en conflictgedrag;
- verplichte velden, toestemming, bewaartermijn en verwerkersrol;
- atomische reservering, idempotency en bevestigingsstatussen;
- foutcodes, retrybeleid, webhooks en notificaties.

Een echte implementatie moet server-side validatie, veilige credentials, PII-arme logging en een providerbevestiging gebruiken. Clientprijzen en client-side tenantwaarden mogen geen gezaghebbende bron zijn.
