"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, Calendar, Check, Clock, Sparkles } from "./Icons";

type DayPart = "morning" | "afternoon" | "evening";

type Slot = {
  id: string;
  dateLabel: string;
  time: string;
  partLabel: string;
};

const weekdays = [
  { value: 1, short: "Ma", label: "Maandag" },
  { value: 2, short: "Di", label: "Dinsdag" },
  { value: 3, short: "Wo", label: "Woensdag" },
  { value: 4, short: "Do", label: "Donderdag" },
  { value: 5, short: "Vr", label: "Vrijdag" },
  { value: 6, short: "Za", label: "Zaterdag" },
] as const;

const dayParts: { value: DayPart; label: string; range: string }[] = [
  { value: "morning", label: "Ochtend", range: "08:00–12:00" },
  { value: "afternoon", label: "Middag", range: "12:00–17:00" },
  { value: "evening", label: "Avond", range: "17:00–20:30" },
];

const times: Record<DayPart, string[]> = {
  morning: ["09:00", "10:30", "11:15"],
  afternoon: ["13:00", "14:30", "16:00"],
  evening: ["17:30", "18:30", "19:15"],
};

function nextDateForWeekday(targetDay: number, weekOffset: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  const daysAhead = ((targetDay - date.getDay() + 7) % 7) || 7;
  date.setDate(date.getDate() + daysAhead + weekOffset * 7);
  return date;
}

function buildSlots(day: number, selectedParts: DayPart[]): Slot[] {
  const formatter = new Intl.DateTimeFormat("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return Array.from({ length: 3 }, (_, index) => {
    const part = selectedParts[index % selectedParts.length];
    const date = nextDateForWeekday(day, index);
    const time = times[part][index % times[part].length];
    const partLabel = dayParts.find((item) => item.value === part)?.label ?? "";
    return {
      id: `${date.toISOString().slice(0, 10)}-${time}`,
      dateLabel: formatter.format(date),
      time,
      partLabel,
    };
  });
}

export default function TrialBookingWidget({
  value,
  onChange,
  invalid = false,
}: {
  value: string;
  onChange: (value: string) => void;
  invalid?: boolean;
}) {
  const [preferredDay, setPreferredDay] = useState<number | null>(null);
  const [selectedParts, setSelectedParts] = useState<DayPart[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);
  const [preferenceError, setPreferenceError] = useState("");
  const requestVersion = useRef(0);

  const selectedSlot = useMemo(() => slots.find((slot) => slot.id === value), [slots, value]);

  useEffect(() => () => {
    requestVersion.current += 1;
  }, []);

  function resetResults() {
    requestVersion.current += 1;
    setLoading(false);
    setSlots([]);
    onChange("");
    setPreferenceError("");
  }

  function chooseDay(day: number) {
    setPreferredDay(day);
    resetResults();
  }

  function togglePart(part: DayPart) {
    setSelectedParts((current) => current.includes(part) ? current.filter((item) => item !== part) : [...current, part]);
    resetResults();
  }

  function requestAvailability() {
    if (!preferredDay || selectedParts.length === 0) {
      setPreferenceError("Kies eerst een voorkeursdag en minimaal één dagdeel.");
      return;
    }

    setPreferenceError("");
    setLoading(true);
    setSlots([]);
    onChange("");
    const version = ++requestVersion.current;
    window.setTimeout(() => {
      if (version !== requestVersion.current) return;
      setSlots(buildSlots(preferredDay, selectedParts));
      setLoading(false);
    }, 520);
  }

  return (
    <section aria-busy={loading} className={`booking-widget ${invalid && !value ? "has-error" : ""}`} id="proeflesplanner" aria-labelledby="booking-widget-title">
      <div className="booking-widget__glow" aria-hidden="true" />
      <header className="booking-widget__header">
        <div className="booking-widget__brand">
          <span><Calendar width="21" /></span>
          <div>
            <small>Planning via</small>
            <strong>NXTDRIVE</strong>
          </div>
        </div>
        <span className="availability-status"><i aria-hidden="true" /> Beschikbaarheid actief</span>
      </header>

      <div className="booking-widget__intro">
        <span className="eyebrow">Plan direct jouw proefles</span>
        <h3 id="booking-widget-title">Wanneer kun jij het beste?</h3>
        <p>Kies je voorkeuren. NXTDRIVE toont daarna drie passende openstaande mogelijkheden.</p>
      </div>

      <fieldset className="booking-step">
        <legend><span>01</span><strong>Voorkeursdag</strong><small>Kies één dag</small></legend>
        <div className="weekday-grid" role="radiogroup" aria-label="Voorkeursdag">
          {weekdays.map((day) => (
            <button
              aria-checked={preferredDay === day.value}
              aria-label={day.label}
              className={preferredDay === day.value ? "is-selected" : ""}
              disabled={loading}
              key={day.value}
              onClick={() => chooseDay(day.value)}
              role="radio"
              type="button"
            >
              <span>{day.short}</span>
              <small>{day.label}</small>
              <i>{preferredDay === day.value ? <Check width="13" /> : null}</i>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="booking-step">
        <legend><span>02</span><strong>Voorkeursdagdelen</strong><small>Meerdere mogelijk</small></legend>
        <div className="daypart-grid" role="group" aria-label="Voorkeursdagdelen">
          {dayParts.map((part) => {
            const selected = selectedParts.includes(part.value);
            return (
              <button
                aria-pressed={selected}
                className={selected ? "is-selected" : ""}
                disabled={loading}
                key={part.value}
                onClick={() => togglePart(part.value)}
                type="button"
              >
                <i>{selected ? <Check width="14" /> : null}</i>
                <span><strong>{part.label}</strong><small>{part.range}</small></span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="booking-search-row">
        <p><Sparkles width="16" /> We tonen alleen momenten die aansluiten op jouw selectie.</p>
        <button className="button button--availability" disabled={loading} onClick={requestAvailability} type="button">
          {loading ? "Momenten zoeken…" : slots.length ? "Vernieuw momenten" : "Toon 3 momenten"}
          {!loading ? <ArrowRight width="17" /> : <span className="button-spinner" aria-hidden="true" />}
        </button>
      </div>

      {preferenceError ? <p className="booking-alert" role="alert">{preferenceError}</p> : null}

      <div aria-live="polite">
        {loading ? (
          <div className="booking-loading" role="status">
            {[0, 1, 2].map((item) => <span key={item} />)}
            <p>NXTDRIVE controleert de agenda…</p>
          </div>
        ) : null}

        {slots.length ? (
          <fieldset className="booking-step booking-step--slots">
            <legend><span>03</span><strong>Kies jouw moment</strong><small>3 mogelijkheden</small></legend>
            <div className="booking-slots" role="radiogroup" aria-label="Beschikbare proeflesmomenten">
              {slots.map((slot, index) => (
                <button
                  aria-checked={value === slot.id}
                  className={value === slot.id ? "is-selected" : ""}
                  key={slot.id}
                  onClick={() => onChange(slot.id)}
                  role="radio"
                  style={{ "--slot-index": index } as CSSProperties}
                  type="button"
                >
                  <span className="slot-number">0{index + 1}</span>
                  <Calendar width="18" />
                  <span><small>{slot.partLabel}</small><strong>{slot.dateLabel}</strong></span>
                  <em><Clock width="15" /> {slot.time}</em>
                  <i>{value === slot.id ? <Check width="16" /> : null}</i>
                </button>
              ))}
            </div>
          </fieldset>
        ) : null}
      </div>

      {selectedSlot ? (
        <div className="booking-confirmation" role="status">
          <span><Check width="19" /></span>
          <div><small>Geselecteerd proeflesmoment</small><strong>{selectedSlot.dateLabel} · {selectedSlot.time}</strong></div>
          <em>Wordt bij verzenden aangevraagd</em>
        </div>
      ) : null}

      {invalid && !value ? <p className="booking-alert" role="alert">Kies één van de drie beschikbare momenten om je aanvraag af te ronden.</p> : null}
      <input name="proeflesmoment" type="hidden" value={value} />
      <input name="voorkeursdag" type="hidden" value={weekdays.find((day) => day.value === preferredDay)?.label ?? ""} />
      <input name="voorkeursdagdelen" type="hidden" value={selectedParts.map((part) => dayParts.find((item) => item.value === part)?.label).filter(Boolean).join(", ")} />
      <p className="booking-widget__note">Prototypeweergave: in productie worden deze momenten live opgehaald en definitief vastgelegd via NXTDRIVE.</p>
    </section>
  );
}
