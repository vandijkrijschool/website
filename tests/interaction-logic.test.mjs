import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { formatPrice } from "../app/lib/content.ts";
import { leadDestination, parseLeadSubmission } from "../app/lib/lead-mail.ts";

const pricing = JSON.parse(await readFile("data/pricing.json", "utf8"));
const siteFacts = JSON.parse(await readFile("data/site-facts.json", "utf8"));

test("Dutch price formatting preserves half euros and thousands", () => {
  assert.equal(formatPrice(5900), "€ 59");
  assert.equal(formatPrice(3950), "€ 39,50");
  assert.equal(formatPrice(4150), "€ 41,50");
  assert.equal(formatPrice(110000), "€ 1.100");
});

test("confirmed lesson and company facts stay centralized", () => {
  assert.equal(pricing.commercialTerms.lessonDurationMinutes, 50);
  assert.equal(pricing.commercialTerms.trialLessonDurationMinutes, 50);
  assert.equal(siteFacts.operationalClaims.averageLessonCount.value, 43);
  assert.equal(siteFacts.contactFromRepository.telephone.displayValue, "06 18 24 04 96");
  assert.equal(siteFacts.contactFromRepository.email.value, "info@vandijkrijschool.nl");
  assert.equal(siteFacts.contactFromRepository.kvk.value, "42130985");
  assert.equal(siteFacts.contactFromRepository.vatId.value, "NL005520090B44");
  assert.equal(siteFacts.integration.studentPlatform.value, "PlanGo");
});

test("intake submissions target the confirmed mailbox", async () => {
  const form = await readFile("app/components/LeadForm.tsx", "utf8");
  const route = await readFile("app/api/aanvragen/route.ts", "utf8");
  assert.equal(leadDestination, "info@vandijkrijschool.nl");
  assert.match(form, /fetch\("\/api\/aanvragen"/);
  assert.match(route, /sendLeadEmail/);
  assert.match(form, /Voorkeursdagdelen/);
  assert.match(form, /Pakketvoorkeur/);
  assert.match(form, /mailto:info@vandijkrijschool\.nl/);
  assert.doesNotMatch(form, /wa\.me|demo|simulat|demo-validated|selectedSlot/i);
});

test("server-side lead validation accepts a complete proefles request", () => {
  const result = parseLeadSubmission({
    kind: "proefles",
    name: "Test Leerling",
    email: "leerling@example.com",
    phone: "06 12345678",
    postcode: "2511 AB",
    packageName: "Pakket 30",
    startMoment: "Binnen 1 maand",
    preferredDay: "Zaterdag",
    dayParts: ["ochtend"],
    channels: ["email"],
    message: "Graag meer informatie.",
    website: "",
    consent: true,
  });
  assert.equal(result.ok, true);
  assert.equal(result.ok && result.honeypot, false);
  assert.equal(result.ok && result.lead.email, "leerling@example.com");
});

test("package selection continues into the intake form", async () => {
  const marketing = await readFile("app/components/Marketing.tsx", "utf8");
  assert.match(marketing, /\/proefles\?pakket=\$\{item\.id\}/);
  assert.doesNotMatch(marketing, /package-card__fee-note|>Pakketprijs</);
});
