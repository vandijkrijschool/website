import {
  guaranteeFundFee,
  installmentAdministrationFee,
  packageById,
  packages,
  registrationFee,
  type StarterPackageId,
} from "./content.ts";

export type Experience = "none" | "some" | "experienced" | "transfer" | "exam";
export type Confidence = "uncertain" | "neutral" | "confident";
export type PaymentInstallments = 1 | 2 | 3 | 4;
export type PackageId = StarterPackageId;

export const CONFIGURATOR_STORAGE_KEY = "van-dijk-configurator-v2";

export const experienceValues: readonly Experience[] = [
  "none",
  "some",
  "experienced",
  "transfer",
  "exam",
];

export const confidenceValues: readonly Confidence[] = [
  "uncertain",
  "neutral",
  "confident",
];

export const availabilityValues = [
  "Overdag",
  "Na school of werk",
  "Avond",
  "Zaterdag",
  "Flexibel",
] as const;

export const desiredStartValues = [
  "Zo snel mogelijk",
  "Binnen een maand",
  "Over 1 tot 3 maanden",
  "Ik weet het nog niet",
] as const;

export type ConfiguratorState = {
  step: 1 | 2 | 3 | 4;
  experience: Experience | null;
  confidence: Confidence | null;
  sessionsPerWeek: 1 | 2 | 3;
  desiredStart: (typeof desiredStartValues)[number];
  availability: string[];
  selectedId: PackageId;
  manualSelection: boolean;
  paymentInstallments: PaymentInstallments;
};

export const defaultConfiguratorState: ConfiguratorState = {
  step: 1,
  experience: null,
  confidence: null,
  sessionsPerWeek: 2,
  desiredStart: "Zo snel mogelijk",
  availability: ["Na school of werk", "Flexibel"],
  selectedId: "starter-40",
  manualSelection: false,
  paymentInstallments: 1,
};

function isOneOf<T extends string | number>(value: unknown, values: readonly T[]): value is T {
  return values.includes(value as T);
}

function normaliseState(value: Record<string, unknown>): ConfiguratorState {
  const availability = Array.isArray(value.availability)
    ? value.availability.filter((item): item is string =>
        typeof item === "string" && isOneOf(item, availabilityValues),
      )
    : defaultConfiguratorState.availability;
  return {
    step: isOneOf(value.step, [1, 2, 3, 4] as const) ? value.step : 1,
    experience: isOneOf(value.experience, experienceValues) ? value.experience : null,
    confidence: isOneOf(value.confidence, confidenceValues) ? value.confidence : null,
    sessionsPerWeek: isOneOf(value.sessionsPerWeek, [1, 2, 3] as const)
      ? value.sessionsPerWeek
      : defaultConfiguratorState.sessionsPerWeek,
    desiredStart: isOneOf(value.desiredStart, desiredStartValues)
      ? value.desiredStart
      : defaultConfiguratorState.desiredStart,
    availability,
    selectedId: isOneOf(value.selectedId, packages.map((item) => item.id))
      ? value.selectedId
      : defaultConfiguratorState.selectedId,
    manualSelection: typeof value.manualSelection === "boolean" ? value.manualSelection : false,
    paymentInstallments: isOneOf(value.paymentInstallments, [1, 2, 3, 4] as const)
      ? value.paymentInstallments
      : 1,
  };
}

/** Defensieve grens voor onbetrouwbare sessionStorage-inhoud. */
export function restoreConfiguratorState(raw: string | null): ConfiguratorState | null {
  if (!raw) return null;
  try {
    const value = JSON.parse(raw) as Record<string, unknown>;
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    return normaliseState(value);
  } catch {
    return null;
  }
}

export function restoreConfiguratorSearch(search: string): Partial<ConfiguratorState> {
  const params = new URLSearchParams(search);
  const availability = (params.get("beschikbaar") ?? "").split("|").filter(Boolean);
  const raw: Record<string, unknown> = {
    step: Number(params.get("stap")),
    experience: params.get("ervaring"),
    confidence: params.get("vertrouwen"),
    sessionsPerWeek: Number(params.get("ritme")),
    desiredStart: params.get("start"),
    availability,
    selectedId: params.get("pakket"),
    manualSelection: params.has("pakket"),
    paymentInstallments: Number(params.get("termijnen")),
  };
  const normalised = normaliseState(raw);
  return {
    ...normalised,
    ...(params.has("stap") ? {} : { step: undefined }),
    ...(params.has("ervaring") ? {} : { experience: undefined }),
    ...(params.has("vertrouwen") ? {} : { confidence: undefined }),
    ...(params.has("ritme") ? {} : { sessionsPerWeek: undefined }),
    ...(params.has("start") ? {} : { desiredStart: undefined }),
    ...(params.has("beschikbaar") ? {} : { availability: undefined }),
    ...(params.has("pakket") ? {} : { selectedId: undefined, manualSelection: undefined }),
    ...(params.has("termijnen") ? {} : { paymentInstallments: undefined }),
  };
}

export function serializeConfiguratorState(state: ConfiguratorState) {
  const params = new URLSearchParams({
    stap: String(state.step),
    ervaring: state.experience ?? "",
    vertrouwen: state.confidence ?? "",
    ritme: String(state.sessionsPerWeek),
    start: state.desiredStart,
    beschikbaar: state.availability.join("|"),
    pakket: state.selectedId,
    termijnen: String(state.paymentInstallments),
  });
  return params.toString();
}

export function recommendationFor(
  experience: Experience | null,
  confidence: Confidence | null,
): PackageId {
  const experienceScore = experience === "none" ? 3 : experience === "some" ? 2 : 1;
  const confidenceScore = confidence === "uncertain" ? 2 : confidence === "neutral" ? 1 : 0;
  const score = experienceScore + confidenceScore;
  if (score >= 5) return "starter-50";
  if (score >= 4) return "starter-40";
  if (score >= 3) return "starter-30";
  return "starter-20";
}

export function calculateConfigurator(
  packageId: PackageId,
  paymentInstallments: PaymentInstallments,
) {
  const selectedPackage = packageById.get(packageId) ?? packages[2];
  const administrationFeeCents = paymentInstallments > 1
    ? installmentAdministrationFee.amount
    : 0;
  const oneTimeCosts = [
    { id: registrationFee.id, name: registrationFee.name, amountCents: registrationFee.amount },
    { id: guaranteeFundFee.id, name: guaranteeFundFee.name, amountCents: guaranteeFundFee.amount },
  ];
  const oneTimeCostCents = oneTimeCosts.reduce((total, item) => total + item.amountCents, 0);
  return {
    selectedPackage,
    packagePriceCents: selectedPackage.amountCents,
    administrationFeeCents,
    oneTimeCosts,
    oneTimeCostCents,
    chosenTotalCents: selectedPackage.amountCents + administrationFeeCents + oneTimeCostCents,
  };
}
