export const AMSTERDAM_TIME_ZONE = "Europe/Amsterdam";

export type DayPart = "morning" | "afternoon" | "evening";
export type DemoAvailabilityScenario = "happy" | "empty" | "provider-error" | "timeout" | "slot-conflict";

export type AvailabilityRequest = {
  preferredWeekday: number;
  dayParts: DayPart[];
  timeZone: typeof AMSTERDAM_TIME_ZONE;
  limit: 3;
};

export type AvailabilitySlot = {
  id: string;
  dateLabel: string;
  time: string;
  partLabel: string;
};

export type AvailabilityResult =
  | { status: "success"; slots: AvailabilitySlot[] }
  | { status: "empty"; slots: [] }
  | { status: "error"; code: "provider" | "timeout"; message: string };

/** Productie implementeert dit contract uitsluitend server-side met private credentials. */
export interface AvailabilityAdapter {
  findSlots(request: AvailabilityRequest, scenario?: DemoAvailabilityScenario): Promise<AvailabilityResult>;
}

const dayPartLabels: Record<DayPart, string> = {
  morning: "Ochtend",
  afternoon: "Middag",
  evening: "Avond",
};

const times: Record<DayPart, string[]> = {
  morning: ["09:00", "10:30", "11:15"],
  afternoon: ["13:00", "14:30", "16:00"],
  evening: ["17:30", "18:30", "19:15"],
};

function amsterdamTodayAtNoonUtc() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: AMSTERDAM_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return new Date(Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day), 12));
}

function nextDateForWeekday(targetDay: number, weekOffset: number) {
  const date = amsterdamTodayAtNoonUtc();
  const daysAhead = ((targetDay - date.getUTCDay() + 7) % 7) || 7;
  date.setUTCDate(date.getUTCDate() + daysAhead + weekOffset * 7);
  return date;
}

export function buildDemoSlots(request: AvailabilityRequest): AvailabilitySlot[] {
  if (request.dayParts.length === 0 || request.preferredWeekday < 1 || request.preferredWeekday > 6) return [];
  const formatter = new Intl.DateTimeFormat("nl-NL", {
    timeZone: AMSTERDAM_TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return Array.from({ length: request.limit }, (_, index) => {
    const part = request.dayParts[index % request.dayParts.length];
    const date = nextDateForWeekday(request.preferredWeekday, index);
    const time = times[part][index % times[part].length];
    const isoDate = date.toISOString().slice(0, 10);
    return {
      id: `${isoDate}-${time}`,
      dateLabel: formatter.format(date),
      time,
      partLabel: dayPartLabels[part],
    };
  });
}

export const demoAvailabilityAdapter: AvailabilityAdapter = {
  async findSlots(request, scenario = "happy") {
    await new Promise((resolve) => globalThis.setTimeout(resolve, scenario === "timeout" ? 760 : 520));
    if (scenario === "empty") return { status: "empty", slots: [] };
    if (scenario === "provider-error") {
      return { status: "error", code: "provider", message: "De agenda is tijdelijk niet bereikbaar." };
    }
    if (scenario === "timeout") {
      return { status: "error", code: "timeout", message: "Het ophalen duurde te lang en is veilig afgebroken." };
    }
    return { status: "success", slots: buildDemoSlots(request) };
  },
};
