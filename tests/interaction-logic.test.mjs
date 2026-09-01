import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateConfigurator,
  restoreConfiguratorSearch,
  restoreConfiguratorState,
  serializeConfiguratorState,
} from "../app/lib/configurator.ts";
import { formatPrice } from "../app/lib/content.ts";
import { AMSTERDAM_TIME_ZONE, buildDemoSlots, demoAvailabilityAdapter } from "../app/lib/nxtdrive.ts";
import { buildLeadPayload, demoLeadAdapter } from "../app/lib/leads.ts";

const storedState = {
  step: 3,
  experience: "transfer",
  confidence: "neutral",
  sessionsPerWeek: 3,
  desiredStart: "Over 1 tot 3 maanden",
  availability: ["Overdag", "Zaterdag"],
  selectedId: "starter-30",
  manualSelection: true,
  paymentInstallments: 4,
};

test("configurator restores every persisted field and rejects corrupt input", () => {
  assert.deepEqual(restoreConfiguratorState(JSON.stringify(storedState)), storedState);
  assert.equal(restoreConfiguratorState("{corrupt"), null);
  assert.equal(restoreConfiguratorState(JSON.stringify([])), null);
});

test("full configurator state survives a shareable query", () => {
  const query = serializeConfiguratorState(storedState);
  const restored = restoreConfiguratorSearch(`?${query}`);
  assert.deepEqual(restored, storedState);
  assert.match(query, /ervaring=transfer/);
  assert.match(query, /beschikbaar=Overdag%7CZaterdag/);
  assert.match(query, /termijnen=4/);
});

test("configurator calculates only selected confirmed components in integer cents", () => {
  assert.deepEqual(calculateConfigurator("starter-30", 3), {
    selectedPackage: {
      id: "starter-30",
      name: "Pakket 30",
      amountCents: 197600,
      lessonCount: 30,
      registrationFeeIncluded: false,
      includes: ["100% gratis proefles", "30 rijlessen", "praktijkexamen", "digitale rijlesmap"],
      description: "Een startpakket met dertig rijlessen, proefles, praktijkexamen en digitale rijlesmap.",
      featured: false,
    },
    packagePriceCents: 197600,
    administrationFeeCents: 3900,
    chosenTotalCents: 201500,
    possibleAdditionalCosts: [
      { id: "registration-fee", name: "Eenmalige inschrijfkosten", amountCents: 3950 },
      { id: "driveyou-guarantee-fund", name: "DriveYOU-garantiefonds", amountCents: 4150 },
    ],
  });
  assert.equal(calculateConfigurator("starter-20", 1).administrationFeeCents, 0);
});

test("Dutch price formatting preserves half euros and thousands", () => {
  assert.equal(formatPrice(5900), "€ 59");
  assert.equal(formatPrice(3950), "€ 39,50");
  assert.equal(formatPrice(4150), "€ 41,50");
  assert.equal(formatPrice(110000), "€ 1.100");
});

test("planner happy flow returns exactly three Amsterdam-time slots", async () => {
  const request = { preferredWeekday: 6, dayParts: ["morning", "evening"], timeZone: AMSTERDAM_TIME_ZONE, limit: 3 };
  const slots = buildDemoSlots(request);
  assert.equal(slots.length, 3);
  assert.equal(new Set(slots.map((slot) => slot.id)).size, 3);
  assert.deepEqual(slots.map((slot) => slot.partLabel), ["Ochtend", "Avond", "Ochtend"]);
  for (const slot of slots) assert.equal(new Date(`${slot.id.slice(0, 10)}T12:00:00Z`).getUTCDay(), 6);
  const result = await demoAvailabilityAdapter.findSlots(request, "happy");
  assert.equal(result.status, "success");
  if (result.status === "success") assert.equal(result.slots.length, 3);
});

test("planner exposes empty, provider-error and timeout states", async () => {
  const request = { preferredWeekday: 2, dayParts: ["afternoon"], timeZone: AMSTERDAM_TIME_ZONE, limit: 3 };
  const [empty, provider, timeout] = await Promise.all([
    demoAvailabilityAdapter.findSlots(request, "empty"),
    demoAvailabilityAdapter.findSlots(request, "provider-error"),
    demoAvailabilityAdapter.findSlots(request, "timeout"),
  ]);
  assert.equal(empty.status, "empty");
  assert.equal(provider.status, "error");
  assert.equal(timeout.status, "error");
});

test("lead payload contains startmoment, planner and configurator context", async () => {
  const payload = buildLeadPayload({
    kind: "proefles",
    name: "Demo",
    email: "demo@example.test",
    contactChannels: ["email"],
    startmoment: "Binnen een maand",
    preferredDay: "Zaterdag",
    preferredDayParts: ["Ochtend", "Avond"],
    selectedSlot: "2026-09-05-09:00",
    packageInterest: "Pakket 30",
    configurator: {
      packageId: "starter-30",
      experience: "transfer",
      confidence: "neutral",
      sessionsPerWeek: 3,
      availability: ["Overdag", "Zaterdag"],
      paymentInstallments: 4,
    },
  });
  assert.equal(payload.startmoment, "Binnen een maand");
  assert.equal(payload.selectedSlot, "2026-09-05-09:00");
  assert.deepEqual(payload.preferredDayParts, ["Ochtend", "Avond"]);
  assert.equal(payload.configurator?.paymentInstallments, 4);
  const result = await demoLeadAdapter.submit(payload);
  assert.deepEqual(result, { status: "demo-validated", reference: "DEMO-NXT-2048" });
});
