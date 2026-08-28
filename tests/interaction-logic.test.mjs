import assert from "node:assert/strict";
import test from "node:test";

import {
  calculateConfigurator,
  restoreConfiguratorState,
} from "../app/lib/configurator.ts";
import {
  AMSTERDAM_TIME_ZONE,
  buildDemoSlots,
  demoAvailabilityAdapter,
} from "../app/lib/nxtdrive.ts";
import { demoLeadAdapter } from "../app/lib/leads.ts";

test("configurator restores every persisted field", () => {
  const stored = {
    step: 3,
    experience: "transfer",
    confidence: "neutral",
    sessionsPerWeek: 3,
    sessionMinutes: 120,
    desiredStart: "Over 1 tot 3 maanden",
    availability: ["Overdag", "Zaterdag"],
    selectedId: "instap",
    manualSelection: true,
    extraLessons: 7,
  };
  assert.deepEqual(restoreConfiguratorState(JSON.stringify(stored)), stored);
  assert.equal(restoreConfiguratorState("{corrupt"), null);
  assert.equal(restoreConfiguratorState(JSON.stringify([])), null);
});

test("configurator clamps untrusted state and calculates appointments, weeks and price", () => {
  const restored = restoreConfiguratorState(JSON.stringify({
    step: 99,
    selectedId: "zeker-slagen",
    extraLessons: 900,
    availability: ["Flexibel", "onbekend"],
  }));
  assert.equal(restored?.step, 1);
  assert.equal(restored?.extraLessons, 20);
  assert.deepEqual(restored?.availability, ["Flexibel"]);

  assert.deepEqual(
    calculateConfigurator("meest-gekozen", 6, 90, 2),
    {
      selectedPackage: {
        id: "meest-gekozen",
        name: "Meest gekozen",
        lessons: 30,
        price: 1950,
        description: "De uitgebalanceerde opleiding met extra voorbereiding richting het examen.",
        featured: true,
        features: ["30 rijlessen", "Praktijkexamen", "Tussentijdse toets", "Persoonlijk lesplan", "NXTDRIVE-inzicht"],
      },
      extraLessons: 6,
      totalLessons: 36,
      totalPrice: 2310,
      appointments: 24,
      weeks: 12,
    },
  );
});

test("planner happy flow returns exactly three Amsterdam-time slots", async () => {
  const request = { preferredWeekday: 6, dayParts: ["morning", "evening"], timeZone: AMSTERDAM_TIME_ZONE, limit: 3 };
  const slots = buildDemoSlots(request);
  assert.equal(slots.length, 3);
  assert.equal(new Set(slots.map((slot) => slot.id)).size, 3);
  assert.deepEqual(slots.map((slot) => slot.partLabel), ["Ochtend", "Avond", "Ochtend"]);
  for (const slot of slots) {
    assert.equal(new Date(`${slot.id.slice(0, 10)}T12:00:00Z`).getUTCDay(), 6);
  }
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
  assert.deepEqual(provider, { status: "error", code: "provider", message: "De demo-agenda is tijdelijk niet bereikbaar." });
  assert.deepEqual(timeout, { status: "error", code: "timeout", message: "Het ophalen duurde te lang en is veilig afgebroken." });
});

test("lead adapter covers success, provider error and timeout without persistence", async () => {
  const payload = { kind: "contact", name: "Demo", contactChannels: ["email"], email: "demo@example.test" };
  const [success, provider, timeout] = await Promise.all([
    demoLeadAdapter.submit(payload, "success"),
    demoLeadAdapter.submit(payload, "provider-error"),
    demoLeadAdapter.submit(payload, "timeout"),
  ]);
  assert.deepEqual(success, { status: "accepted", reference: "DEMO-NXT-2048" });
  assert.equal(provider.status, "error");
  assert.equal(timeout.status, "error");
});
