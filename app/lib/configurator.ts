import { extraLessonPrice, packages } from "./packages.js";

export type Experience = "none" | "some" | "experienced" | "transfer" | "exam";
export type Confidence = "uncertain" | "neutral" | "confident";
export type PackageId = (typeof packages)[number]["id"];

export const CONFIGURATOR_STORAGE_KEY = "van-dijk-configurator-v1";

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

export type ConfiguratorState = {
  step: 1 | 2 | 3 | 4;
  experience: Experience | null;
  confidence: Confidence | null;
  sessionsPerWeek: 1 | 2 | 3;
  sessionMinutes: 60 | 90 | 120;
  desiredStart: string;
  availability: string[];
  selectedId: PackageId;
  manualSelection: boolean;
  extraLessons: number;
};

export const defaultConfiguratorState: ConfiguratorState = {
  step: 1,
  experience: null,
  confidence: null,
  sessionsPerWeek: 2,
  sessionMinutes: 90,
  desiredStart: "Zo snel mogelijk",
  availability: ["Na school of werk", "Flexibel"],
  selectedId: "meest-gekozen",
  manualSelection: false,
  extraLessons: 0,
};

const desiredStartValues = [
  "Zo snel mogelijk",
  "Binnen een maand",
  "Over 1 tot 3 maanden",
  "Ik weet het nog niet",
] as const;

function isOneOf<T extends string | number>(value: unknown, values: readonly T[]): value is T {
  return values.includes(value as T);
}

/** Defensieve grens voor onbetrouwbare sessionStorage-inhoud. */
export function restoreConfiguratorState(raw: string | null): ConfiguratorState | null {
  if (!raw) return null;

  try {
    const value = JSON.parse(raw) as Record<string, unknown>;
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;

    const selectedId = isOneOf(value.selectedId, packages.map((item) => item.id))
      ? value.selectedId
      : defaultConfiguratorState.selectedId;
    const selectedPackage = packages.find((item) => item.id === selectedId) ?? packages[1];
    const maxExtras = 60 - selectedPackage.lessons;
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
      sessionMinutes: isOneOf(value.sessionMinutes, [60, 90, 120] as const)
        ? value.sessionMinutes
        : defaultConfiguratorState.sessionMinutes,
      desiredStart: isOneOf(value.desiredStart, desiredStartValues)
        ? value.desiredStart
        : defaultConfiguratorState.desiredStart,
      availability,
      selectedId,
      manualSelection: typeof value.manualSelection === "boolean" ? value.manualSelection : false,
      extraLessons:
        typeof value.extraLessons === "number" && Number.isInteger(value.extraLessons)
          ? Math.min(maxExtras, Math.max(0, value.extraLessons))
          : 0,
    };
  } catch {
    return null;
  }
}

export function recommendationFor(
  experience: Experience | null,
  confidence: Confidence | null,
): PackageId {
  const experienceScore =
    experience === "none"
      ? 2
      : experience === "some" || experience === "transfer" || experience === "exam"
        ? 1
        : 0;
  const confidenceScore = confidence === "uncertain" ? 2 : confidence === "neutral" ? 1 : 0;
  const score = experienceScore + confidenceScore;
  if (score >= 4) return "zeker-slagen";
  if (score >= 2) return "meest-gekozen";
  return "instap";
}

export function calculateConfigurator(
  packageId: PackageId,
  extraLessons: number,
  sessionMinutes: 60 | 90 | 120,
  sessionsPerWeek: 1 | 2 | 3,
) {
  const selectedPackage = packages.find((item) => item.id === packageId) ?? packages[1];
  const boundedExtras = Math.min(60 - selectedPackage.lessons, Math.max(0, Math.trunc(extraLessons)));
  const totalLessons = selectedPackage.lessons + boundedExtras;

  return {
    selectedPackage,
    extraLessons: boundedExtras,
    totalLessons,
    totalPrice: selectedPackage.price + boundedExtras * extraLessonPrice,
    appointments: Math.ceil((totalLessons * 60) / sessionMinutes),
    weeks: Math.ceil((totalLessons * 60) / (sessionsPerWeek * sessionMinutes)),
  };
}
