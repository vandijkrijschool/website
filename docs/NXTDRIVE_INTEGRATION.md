# Optionele NXTDRIVE-uitbreiding

De huidige demo is compleet zonder externe integraties. Dit document beschrijft uitsluitend een mogelijke adapterroute als later een afzonderlijk project voor een echte dienst wordt gestart. Endpointnamen zijn illustratief.

## Huidige demosimulatie

`app/lib/nxtdrive.ts` bevat een `AvailabilityAdapter` met vijf lokale scenario’s: `happy`, `empty`, `provider-error`, `timeout` en `slot-conflict`. Alleen de normale flow levert exact drie slots. `app/lib/leads.ts` simuleert daarnaast succes, providerfout en timeout. Geen adapter doet een netwerkcall, boekt een afspraak of bewaart persoonsgegevens.

De widget gebruikt locale `nl-NL`, tijdzone `Europe/Amsterdam`, een gekozen weekdag en één of meer dagdelen. De demodatums worden telkens lokaal opnieuw opgebouwd.

## Mogelijk beschikbaarheidscontract

Een toekomstige serveradapter kan bijvoorbeeld dit request vormen:

```json
{
  "tenant_id": "<server-configured>",
  "appointment_type": "trial_lesson",
  "preferred_weekday": 2,
  "day_parts": ["afternoon", "evening"],
  "timezone": "Europe/Amsterdam",
  "limit": 3
}
```

Minimale slotresponse:

```json
{
  "slot_id": "opaque-id",
  "starts_at": "2026-09-08T14:30:00+02:00",
  "duration_minutes": 90,
  "expires_at": "2026-08-28T05:10:00Z"
}
```

De bestaande UI ondersteunt loading, geen beschikbaarheid, timeout, providerfout en een contactfallback al volledig.

## Mogelijke proeflesaanvraag

Een toekomstige serveractie kan een geselecteerd slot samen met genormaliseerde contact- en voorkeursgegevens ontvangen. Clientprijzen en client-side tenant-ID’s horen daarbij niet als gezaghebbende bron te gelden.

```json
{
  "slot_id": "opaque-id",
  "name": "Voorbeeldnaam",
  "email": "leerling@example.com",
  "phone": "+31612345678",
  "postal_code": "2583AB",
  "package_interest": "meest-gekozen",
  "preferred_channels": ["whatsapp", "email"]
}
```

Bij een echte implementatie zijn servervalidatie, atomische slotreservering, idempotency, foutvertaling, veilige credentials en PII-arme logging logische productiekeuzes. Ze zijn niet nodig voor de huidige demo.

## Mogelijke leerlingomgeving en webhooks

De demotabs tonen de gewenste informatiearchitectuur: overzicht, agenda, voortgang en lesverslagen. Een echte tenantlogin, autorisatie, logout, webhooks en e-mail- of sms-bevestigingen kunnen later achter dezelfde UI worden geplaatst. Dat toekomstige project bepaalt dan zelf tenant, API-versie, bewaartermijnen, beveiligingsbeleid en notificatiekanalen.
