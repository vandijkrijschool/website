# NXTDRIVE productie-integratie

Dit document beschrijft het voorgestelde contract achter de bestaande prototype-interfaces. Endpointnamen zijn illustratief en moeten worden afgestemd op de definitieve NXTDRIVE API.

## 1. Beschikbaarheid ophalen

De widget verzamelt:

- tenant-ID;
- gekozen weekdag;
- één of meer dagdelen;
- locale `nl-NL` en tijdzone `Europe/Amsterdam`;
- optioneel postcode, voertuigtype en pakketcontext.

Voorgestelde server-side request:

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

Minimale response per slot:

```json
{
  "slot_id": "opaque-id",
  "starts_at": "2026-09-08T14:30:00+02:00",
  "duration_minutes": 90,
  "expires_at": "2026-08-28T05:10:00Z"
}
```

Toon loading, geen beschikbaarheid, timeout en providerfout. Laat bij storing altijd contact als fallback beschikbaar.

## 2. Proefles aanvragen

De huidige submitflow wordt vervangen door een serveractie of API-route. Vertrouw nooit op clientprijzen of een client-side tenant-ID.

```json
{
  "slot_id": "opaque-id",
  "first_name": "Voornaam",
  "last_name": "Achternaam",
  "email": "leerling@example.com",
  "phone": "+31612345678",
  "postal_code": "2583AB",
  "package_interest": "meest-gekozen",
  "preferred_channels": ["whatsapp", "email"],
  "notes": "vrije tekst",
  "privacy_consent_at": "ISO-8601"
}
```

Productieregels:

- reserveer atomisch en controleer of het slot nog vrij is;
- gebruik een idempotency-key tegen dubbele submit;
- normaliseer telefoon en postcode server-side;
- valideer iedere waarde opnieuw;
- sla geen volledige payload op in analytics of foutlogs;
- retourneer een veilige bevestigingsreferentie, nooit interne database-ID’s.

## 3. Leerlingomgeving

De productielink verwijst naar de beveiligde tenantomgeving. Vereist:

- officiële tenant-login of SSO-route;
- veilige redirectallowlist;
- sessie- en logoutgedrag;
- autorisatie per leerling;
- geen leerlingdata in publiek gecachete HTML;
- `noindex` voor login en persoonlijke routes.

De huidige portaltabs tonen de gewenste informatiearchitectuur: overzicht, agenda, voortgang en lesverslagen.

## 4. Webhooks en bevestigingen

Verifieer webhooks met `NXTDRIVE_WEBHOOK_SECRET`, timestamp en replaybescherming. Relevante events:

- `trial_booking.created`;
- `trial_booking.confirmed`;
- `trial_booking.rescheduled`;
- `trial_booking.cancelled`;
- `lead.created`.

Transactionele e-mail/SMS wordt pas verstuurd nadat NXTDRIVE de definitieve status bevestigt.

## 5. Privacy en beveiliging

- private credentials uitsluitend server-side;
- rate limiting en bot-/spamdetectie op publieke formulieren;
- CSRF/origincontrole waar relevant;
- expliciete bewaartermijnen en verwijdering;
- PII-maskering in monitoring;
- CSP/connect-src alleen voor bevestigde NXTDRIVE-domeinen;
- consent vóór niet-noodzakelijke tracking.

