export type LeadKind = "proefles" | "contact";
export type DemoLeadScenario = "success" | "provider-error" | "timeout";

export type ConfiguratorLeadContext = {
  packageId?: string;
  experience?: string;
  confidence?: string;
  sessionsPerWeek?: number;
  availability?: string[];
  paymentInstallments?: number;
};

export type LeadPayload = {
  kind: LeadKind;
  name: string;
  email?: string;
  phone?: string;
  postalCode?: string;
  message?: string;
  contactChannels: string[];
  startmoment: string;
  preferredDay?: string;
  preferredDayParts: string[];
  selectedSlot?: string;
  packageInterest?: string;
  configurator?: ConfiguratorLeadContext;
};

export type LeadResult =
  | { status: "demo-validated"; reference: string }
  | { status: "error"; code: "provider" | "timeout"; message: string };

/** Productie implementeert deze grens als serveractie met validatie, rate limiting en spambeveiliging. */
export interface LeadAdapter {
  submit(payload: LeadPayload, scenario?: DemoLeadScenario): Promise<LeadResult>;
}

export function buildLeadPayload(input: LeadPayload): LeadPayload {
  return {
    ...input,
    contactChannels: [...input.contactChannels],
    preferredDayParts: [...input.preferredDayParts],
    ...(input.configurator
      ? {
          configurator: {
            ...input.configurator,
            availability: input.configurator.availability
              ? [...input.configurator.availability]
              : undefined,
          },
        }
      : {}),
  };
}

export const demoLeadAdapter: LeadAdapter = {
  async submit(_payload, scenario = "success") {
    await new Promise((resolve) => globalThis.setTimeout(resolve, scenario === "timeout" ? 800 : 650));
    if (scenario === "provider-error") {
      return { status: "error", code: "provider", message: "De demo-koppeling gaf een gecontroleerde fout terug." };
    }
    if (scenario === "timeout") {
      return { status: "error", code: "timeout", message: "De demo-aanvraag duurde te lang en is veilig afgebroken." };
    }
    return { status: "demo-validated", reference: "DEMO-NXT-2048" };
  },
};
