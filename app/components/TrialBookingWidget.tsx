"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Check, Clock, Sparkles } from "./Icons";
import { isProductionSite } from "../lib/site";
import {
  AMSTERDAM_TIME_ZONE,
  demoAvailabilityAdapter,
  type AvailabilitySlot,
  type DayPart,
  type DemoAvailabilityScenario,
} from "../lib/nxtdrive";

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

const scenarios: { value: DemoAvailabilityScenario; label: string; help: string }[] = [
  { value: "happy", label: "Normale flow", help: "Precies drie passende momenten" },
  { value: "empty", label: "Lege agenda", help: "Geen passend moment gevonden" },
  { value: "provider-error", label: "Providerfout", help: "Agenda tijdelijk niet bereikbaar" },
  { value: "timeout", label: "Timeout", help: "Aanvraag veilig afgebroken" },
  { value: "slot-conflict", label: "Slotconflict", help: "Eerste moment raakt net bezet" },
];

function moveRadioFocus(event: KeyboardEvent<HTMLButtonElement>) {
  if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
  const group = event.currentTarget.closest<HTMLElement>("[role='radiogroup']");
  const buttons = Array.from(group?.querySelectorAll<HTMLButtonElement>("[role='radio']:not(:disabled)") ?? []);
  const currentIndex = buttons.indexOf(event.currentTarget);
  if (currentIndex < 0 || buttons.length === 0) return;
  event.preventDefault();
  const nextIndex = event.key === "Home"
    ? 0
    : event.key === "End"
      ? buttons.length - 1
      : (currentIndex + (event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
  buttons[nextIndex].focus();
  buttons[nextIndex].click();
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
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [preferenceError, setPreferenceError] = useState("");
  const [scenario, setScenario] = useState<DemoAvailabilityScenario>("happy");
  const [resultState, setResultState] = useState<"idle" | "empty" | "provider" | "timeout" | "conflict">("idle");
  const requestVersion = useRef(0);
  const statusRef = useRef<HTMLDivElement>(null);
  const slotsRef = useRef<HTMLFieldSetElement>(null);

  const selectedSlot = useMemo(() => slots.find((slot) => slot.id === value), [slots, value]);

  useEffect(() => () => {
    requestVersion.current += 1;
  }, []);

  function resetResults() {
    requestVersion.current += 1;
    setLoading(false);
    setSlots([]);
    setResultState("idle");
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

  async function requestAvailability() {
    if (!preferredDay || selectedParts.length === 0) {
      setPreferenceError("Kies eerst een voorkeursdag en minimaal één dagdeel.");
      return;
    }

    setPreferenceError("");
    setResultState("idle");
    setLoading(true);
    setSlots([]);
    onChange("");
    const version = ++requestVersion.current;
    const result = await demoAvailabilityAdapter.findSlots(
      { preferredWeekday: preferredDay, dayParts: selectedParts, timeZone: AMSTERDAM_TIME_ZONE, limit: 3 },
      scenario,
    );
    if (version !== requestVersion.current) return;
    setLoading(false);
    if (result.status === "success") {
      setSlots(result.slots.slice(0, 3));
      window.setTimeout(() => slotsRef.current?.focus(), 0);
    } else if (result.status === "empty") {
      setResultState("empty");
      window.setTimeout(() => statusRef.current?.focus(), 0);
    } else {
      setResultState(result.code === "timeout" ? "timeout" : "provider");
      window.setTimeout(() => statusRef.current?.focus(), 0);
    }
  }

  function selectSlot(slot: AvailabilitySlot, index: number) {
    if (scenario === "slot-conflict" && index === 0 && resultState !== "conflict") {
      setSlots((current) => current.filter((item) => item.id !== slot.id));
      setResultState("conflict");
      onChange("");
      return;
    }
    setResultState("idle");
    onChange(slot.id);
  }

  const resultCopy = {
    empty: ["Geen passend demomoment gevonden.", "Probeer een ander dagdeel of neem contact op, dan zoeken we persoonlijk mee."],
    provider: ["De demo-agenda is tijdelijk niet bereikbaar.", "Je voorkeuren zijn niet verzonden. Probeer opnieuw of gebruik de contactfallback."],
    timeout: ["Het ophalen duurde te lang.", "De demo-aanvraag is veilig afgebroken; er is niets gereserveerd of opgeslagen."],
    conflict: ["Dat moment is zojuist ingenomen.", "Er is niets gereserveerd. Kies één van de resterende momenten of laat ons persoonlijk meekijken."],
  } as const;

  return (
    <section aria-busy={loading} className={`booking-widget ${invalid && !value ? "has-error" : ""}`} id="proeflesplanner" aria-labelledby="booking-widget-title">
      <div className="booking-widget__glow" aria-hidden="true" />
      <header className="booking-widget__header">
        <div className="booking-widget__brand"><span><Calendar width="21" /></span><div><small>Planning via</small><strong>NXTDRIVE</strong></div></div>
        <span className="availability-status"><i aria-hidden="true" /> Demo-agenda actief</span>
      </header>

      {!isProductionSite ? (
        <details className="demo-scenario">
          <summary>Prototype-scenario testen</summary>
          <label><span>Agenda-uitkomst</span><select value={scenario} onChange={(event) => { setScenario(event.target.value as DemoAvailabilityScenario); resetResults(); }}>{scenarios.map((item) => <option key={item.value} value={item.value}>{item.label} — {item.help}</option>)}</select></label>
        </details>
      ) : null}

      <div className="booking-widget__intro"><span className="eyebrow">Plan direct jouw proefles</span><h3 id="booking-widget-title">Wanneer kun jij het beste?</h3><p>Kies je voorkeuren. NXTDRIVE toont daarna drie passende openstaande demomogelijkheden.</p></div>

      <fieldset className="booking-step">
        <legend><span>01</span><strong>Voorkeursdag</strong><small>Kies één dag</small></legend>
        <div className="weekday-grid" role="radiogroup" aria-label="Voorkeursdag">
          {weekdays.map((day) => (
            <button aria-checked={preferredDay === day.value} aria-label={day.label} className={preferredDay === day.value ? "is-selected" : ""} disabled={loading} key={day.value} onClick={() => chooseDay(day.value)} onKeyDown={moveRadioFocus} role="radio" tabIndex={preferredDay === day.value || (!preferredDay && day.value === 1) ? 0 : -1} type="button">
              <span>{day.short}</span><small>{day.label}</small><i>{preferredDay === day.value ? <Check width="13" /> : null}</i>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="booking-step">
        <legend><span>02</span><strong>Voorkeursdagdelen</strong><small>Meerdere mogelijk</small></legend>
        <div className="daypart-grid" role="group" aria-label="Voorkeursdagdelen">
          {dayParts.map((part) => {
            const selected = selectedParts.includes(part.value);
            return <button aria-pressed={selected} className={selected ? "is-selected" : ""} disabled={loading} key={part.value} onClick={() => togglePart(part.value)} type="button"><i>{selected ? <Check width="14" /> : null}</i><span><strong>{part.label}</strong><small>{part.range}</small></span></button>;
          })}
        </div>
      </fieldset>

      <div className="booking-search-row"><p><Sparkles width="16" /> We tonen alleen momenten die aansluiten op jouw selectie.</p><button className="button button--availability" disabled={loading} onClick={requestAvailability} type="button">{loading ? "Momenten zoeken…" : slots.length ? "Vernieuw momenten" : "Toon 3 momenten"}{!loading ? <ArrowRight width="17" /> : <span className="button-spinner" aria-hidden="true" />}</button></div>
      {preferenceError ? <p className="booking-alert" role="alert">{preferenceError}</p> : null}

      <div aria-live="polite">
        {loading ? <div className="booking-loading" role="status">{[0, 1, 2].map((item) => <span key={item} />)}<p>NXTDRIVE controleert de demo-agenda…</p></div> : null}
        {resultState !== "idle" ? <div className="booking-result-state" ref={statusRef} role="status" tabIndex={-1}><strong>{resultCopy[resultState][0]}</strong><p>{resultCopy[resultState][1]}</p><div className="button-row"><button className="button button--ghost" onClick={requestAvailability} type="button">Opnieuw proberen</button><Link className="text-link" href="/contact">Neem contact op</Link></div></div> : null}
        {slots.length ? (
          <fieldset className="booking-step booking-step--slots" ref={slotsRef} tabIndex={-1}>
            <legend><span>03</span><strong>Kies jouw moment</strong><small>{slots.length} {slots.length === 1 ? "mogelijkheid" : "mogelijkheden"}</small></legend>
            <div className="booking-slots" role="radiogroup" aria-label="Beschikbare proeflesmomenten">
              {slots.map((slot, index) => <button aria-checked={value === slot.id} className={value === slot.id ? "is-selected" : ""} key={slot.id} onClick={() => selectSlot(slot, index)} onKeyDown={moveRadioFocus} role="radio" style={{ "--slot-index": index } as CSSProperties} tabIndex={value === slot.id || (!value && index === 0) ? 0 : -1} type="button"><span className="slot-number">0{index + 1}</span><Calendar width="18" /><span><small>{slot.partLabel}</small><strong>{slot.dateLabel}</strong></span><em><Clock width="15" /> {slot.time}</em><i>{value === slot.id ? <Check width="16" /> : null}</i></button>)}
            </div>
          </fieldset>
        ) : null}
      </div>

      {selectedSlot ? <div className="booking-confirmation" role="status"><span><Check width="19" /></span><div><small>Geselecteerd proeflesmoment</small><strong>{selectedSlot.dateLabel} · {selectedSlot.time}</strong></div><em>Wordt alleen als voorkeur aangevraagd</em></div> : null}
      {invalid && !value ? <p className="booking-alert" role="alert">Kies één van de beschikbare momenten om je demo-aanvraag af te ronden.</p> : null}
      <input name="proeflesmoment" type="hidden" value={value} />
      <input name="voorkeursdag" type="hidden" value={weekdays.find((day) => day.value === preferredDay)?.label ?? ""} />
      <input name="voorkeursdagdelen" type="hidden" value={selectedParts.map((part) => dayParts.find((item) => item.value === part)?.label).filter(Boolean).join(", ")} />
      <p className="booking-widget__note">Demo-prototype: momenten en reserveringsstatus worden volledig lokaal gesimuleerd. Er ontstaat geen echte boeking.</p>
    </section>
  );
}
