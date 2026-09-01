"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, Check, RouteIcon, Share, Sparkles } from "./Icons";
import { formatPrice, packages } from "../lib/site";
import {
  CONFIGURATOR_STORAGE_KEY,
  availabilityValues,
  calculateConfigurator,
  defaultConfiguratorState,
  desiredStartValues,
  recommendationFor,
  restoreConfiguratorSearch,
  restoreConfiguratorState,
  serializeConfiguratorState,
  type Confidence,
  type ConfiguratorState,
  type Experience,
  type PaymentInstallments,
} from "../lib/configurator";

const experienceOptions: { value: Experience; title: string; text: string }[] = [
  { value: "none", title: "Nog niet gereden", text: "Ik begin helemaal vanaf het begin." },
  { value: "some", title: "Een beetje ervaring", text: "Ik heb al enkele rijlessen gevolgd." },
  { value: "experienced", title: "Ruime ervaring", text: "Ik heb al langere tijd rijles gevolgd." },
  { value: "transfer", title: "Ik wil overstappen", text: "Ik vervolg mijn opleiding bij Van Dijk." },
  { value: "exam", title: "Ik heb examen gedaan", text: "Ik zoek een vervolgstap na een examenpoging." },
];

const confidenceOptions: { value: Confidence; title: string }[] = [
  { value: "uncertain", title: "Nog onzeker" },
  { value: "neutral", title: "Redelijk op mijn gemak" },
  { value: "confident", title: "Zelfverzekerd" },
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

function definedSearchState(search: string) {
  return Object.fromEntries(
    Object.entries(restoreConfiguratorSearch(search)).filter(([, value]) => value !== undefined),
  ) as Partial<ConfiguratorState>;
}

export default function Configurator() {
  const [state, setState] = useState<ConfiguratorState>(defaultConfiguratorState);
  const [error, setError] = useState("");
  const [shared, setShared] = useState(false);
  const [shareFallback, setShareFallback] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const recommendedId = useMemo(
    () => recommendationFor(state.experience, state.confidence),
    [state.experience, state.confidence],
  );
  const activeId = state.manualSelection ? state.selectedId : recommendedId;
  const calculation = calculateConfigurator(activeId, state.paymentInstallments);
  const personalIntake = state.experience === "transfer" || state.experience === "exam";
  const shareState = { ...state, selectedId: activeId };
  const query = serializeConfiguratorState(shareState);
  const trialHref = `/proefles?${query}`;

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const stored = restoreConfiguratorState(window.sessionStorage.getItem(CONFIGURATOR_STORAGE_KEY));
        const fromSearch = definedSearchState(window.location.search);
        setState({ ...(stored ?? defaultConfiguratorState), ...fromSearch });
      } catch {
        window.sessionStorage.removeItem(CONFIGURATOR_STORAGE_KEY);
      } finally {
        setHydrated(true);
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.sessionStorage.setItem(CONFIGURATOR_STORAGE_KEY, JSON.stringify({ ...state, selectedId: activeId }));
    } catch {
      // De configurator blijft bruikbaar wanneer browseropslag niet beschikbaar is.
    }
  }, [activeId, hydrated, state]);

  useEffect(() => {
    if (hydrated) stepHeadingRef.current?.focus({ preventScroll: true });
  }, [state.step, hydrated]);

  function update(patch: Partial<ConfiguratorState>) {
    setState((current) => ({ ...current, ...patch }));
  }

  function showError(message: string) {
    setError(message);
    window.setTimeout(() => errorRef.current?.focus(), 0);
  }

  function goNext() {
    if (state.step === 1 && (!state.experience || !state.confidence)) {
      showError("Kies je rijervaring én hoe zeker je je achter het stuur voelt.");
      return;
    }
    if (state.step === 2 && state.availability.length === 0) {
      showError("Kies minimaal één moment waarop je meestal beschikbaar bent.");
      return;
    }
    setError("");
    update({ step: Math.min(4, state.step + 1) as ConfiguratorState["step"] });
  }

  function toggleAvailability(value: string) {
    update({
      availability: state.availability.includes(value)
        ? state.availability.filter((item) => item !== value)
        : [...state.availability, value],
    });
  }

  async function shareRoute() {
    const url = `${window.location.origin}/configurator?${query}`;
    setShareFallback("");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard API niet beschikbaar");
      await navigator.clipboard.writeText(url);
      setShared(true);
      window.setTimeout(() => setShared(false), 2200);
    } catch {
      setShared(false);
      setShareFallback(url);
    }
  }

  return (
    <div className="configurator" aria-label="Lespakket configurator">
      <div className="configurator__top">
        <div><span className="eyebrow">Lespakket cockpit</span><h2>Bouw jouw persoonlijke route.</h2></div>
        <div className="configurator__progress" aria-label={`Stap ${state.step} van 4`}>
          {["Ervaring", "Planning", "Pakket", "Advies"].map((label, index) => (
            <button
              aria-current={state.step === index + 1 ? "step" : undefined}
              className={state.step === index + 1 ? "is-active" : state.step > index + 1 ? "is-complete" : ""}
              disabled={index + 1 >= state.step}
              key={label}
              onClick={() => index + 1 < state.step && update({ step: (index + 1) as ConfiguratorState["step"] })}
              type="button"
            ><span>{state.step > index + 1 ? <Check width="14" /> : index + 1}</span><b>{label}</b></button>
          ))}
        </div>
      </div>

      <div className="configurator__body">
        <div className="configurator__stage">
          {state.step === 1 ? <div className="config-step">
            <div className="config-step__heading"><span>01</span><div><small>Jouw startpunt</small><h3 ref={stepHeadingRef} tabIndex={-1}>Hoeveel rijervaring heb je?</h3><p>De uitkomst blijft een indicatie; een proefles geeft persoonlijker advies.</p></div></div>
            <div className="option-grid option-grid--wide" role="radiogroup" aria-label="Rijervaring">
              {experienceOptions.map((item) => <button aria-checked={state.experience === item.value} className={`option-card ${state.experience === item.value ? "is-selected" : ""}`} key={item.value} onClick={() => update({ experience: item.value })} onKeyDown={moveRadioFocus} role="radio" tabIndex={state.experience === item.value || (!state.experience && item.value === experienceOptions[0].value) ? 0 : -1} type="button"><span><strong>{item.title}</strong><small>{item.text}</small></span><i>{state.experience === item.value ? <Check width="16" /> : null}</i></button>)}
            </div>
            <fieldset className="config-fieldset"><legend>Hoe zeker voel je je achter het stuur?</legend><div className="segmented-control" role="radiogroup" aria-label="Zelfvertrouwen">{confidenceOptions.map((item) => <button aria-checked={state.confidence === item.value} className={state.confidence === item.value ? "is-selected" : ""} key={item.value} onClick={() => update({ confidence: item.value })} onKeyDown={moveRadioFocus} role="radio" tabIndex={state.confidence === item.value || (!state.confidence && item.value === confidenceOptions[0].value) ? 0 : -1} type="button">{item.title}</button>)}</div></fieldset>
          </div> : null}

          {state.step === 2 ? <div className="config-step">
            <div className="config-step__heading"><span>02</span><div><small>Jouw voorkeuren</small><h3 ref={stepHeadingRef} tabIndex={-1}>Hoe wil je jouw rijopleiding plannen?</h3><p>Dit zijn voorkeuren voor het gesprek; beschikbaarheid wordt nog niet beloofd.</p></div></div>
            <fieldset className="config-fieldset"><legend>Hoe vaak wil je bij voorkeur rijden?</legend><div className="option-grid option-grid--three" role="radiogroup" aria-label="Gewenst ritme">{([1, 2, 3] as const).map((value) => <button aria-checked={state.sessionsPerWeek === value} className={`option-card ${state.sessionsPerWeek === value ? "is-selected" : ""}`} key={value} onClick={() => update({ sessionsPerWeek: value })} onKeyDown={moveRadioFocus} role="radio" tabIndex={state.sessionsPerWeek === value ? 0 : -1} type="button"><span><strong>{value}× per week</strong><small>Gewenste regelmaat</small></span></button>)}</div></fieldset>
            <div className="config-two-columns">
              <label className="select-field"><span>Wanneer wil je beginnen?</span><select value={state.desiredStart} onChange={(event) => update({ desiredStart: event.target.value as ConfiguratorState["desiredStart"] })}>{desiredStartValues.map((value) => <option key={value}>{value}</option>)}</select></label>
              <fieldset className="config-fieldset config-fieldset--flush"><legend>Wanneer ben je meestal beschikbaar?</legend><div className="chip-group">{availabilityValues.map((item) => <button aria-pressed={state.availability.includes(item)} className={state.availability.includes(item) ? "is-selected" : ""} key={item} onClick={() => toggleAvailability(item)} type="button">{item}</button>)}</div></fieldset>
            </div>
          </div> : null}

          {state.step === 3 ? <div className="config-step">
            <div className="config-step__heading"><span>03</span><div><small>Actuele bronpakketten</small><h3 ref={stepHeadingRef} tabIndex={-1}>Kies een pakket en betaalvoorkeur.</h3><p>Alle bedragen worden in eurocenten berekend. Onbevestigde mogelijke kosten staan los van het gekozen totaal.</p></div></div>
            <div className="preset-grid" role="radiogroup" aria-label="Rijlespakket">{packages.map((item) => <button aria-checked={activeId === item.id} className={`preset-card ${activeId === item.id ? "is-selected" : ""}`} key={item.id} onClick={() => update({ selectedId: item.id, manualSelection: true })} onKeyDown={moveRadioFocus} role="radio" tabIndex={activeId === item.id ? 0 : -1} type="button"><small>{item.lessonCount} rijlessen</small><strong>{item.name}</strong><span>{formatPrice(item.amountCents)}</span><i>{activeId === item.id ? <Check width="15" /> : null}</i></button>)}</div>
            {state.manualSelection && state.selectedId !== recommendedId ? <div className="recommendation-note"><Sparkles width="18" /><p>De configurator zou <strong>{packages.find((item) => item.id === recommendedId)?.name}</strong> voorstellen. Jouw keuze blijft leidend.</p><button type="button" onClick={() => update({ manualSelection: false })}>Advies overnemen</button></div> : null}
            <fieldset className="config-fieldset"><legend>Betalen in hoeveel termijnen?</legend><div className="segmented-control segmented-control--four" role="radiogroup" aria-label="Betaaltermijnen">{([1, 2, 3, 4] as const).map((value) => <button aria-checked={state.paymentInstallments === value} className={state.paymentInstallments === value ? "is-selected" : ""} key={value} onClick={() => update({ paymentInstallments: value as PaymentInstallments })} onKeyDown={moveRadioFocus} role="radio" tabIndex={state.paymentInstallments === value ? 0 : -1} type="button">{value === 1 ? "In één keer" : `${value} termijnen`}</button>)}</div><p className="field-help">Bij 2, 3 of 4 termijnen vermeldt de bron eenmalig € 39 administratiekosten.</p></fieldset>
            <div className="module-list">
              <article><div><span>{calculation.selectedPackage.name}</span><small>{calculation.selectedPackage.lessonCount} rijlessen en de vermelde pakketonderdelen</small></div><span className="included">{formatPrice(calculation.packagePriceCents)}</span></article>
              <article><div><span>Administratiekosten termijnen</span><small>Alleen gekozen bij betaling in 2, 3 of 4 termijnen</small></div><span className={calculation.administrationFeeCents ? "included" : "not-included"}>{calculation.administrationFeeCents ? formatPrice(calculation.administrationFeeCents) : "Niet gekozen"}</span></article>
              {calculation.possibleAdditionalCosts.map((cost) => <article key={cost.id}><div><span>{cost.name}</span><small>Toepasselijkheid en verplicht karakter nog te bevestigen</small></div><span className="not-included">mogelijk {formatPrice(cost.amountCents)}</span></article>)}
            </div>
          </div> : null}

          {state.step === 4 ? <div className="config-step config-result">
            <div className="config-result__check"><Check width="36" /></div><span className="eyebrow">Jouw reproduceerbare configuratie</span>
            <h3 ref={stepHeadingRef} tabIndex={-1}>{personalIntake ? "Begin met een persoonlijke niveau-inschatting." : `${calculation.selectedPackage.name} is een mogelijk startpunt.`}</h3>
            <p>{personalIntake ? "Omdat je al rijervaring of een examenpoging hebt, is persoonlijk advies eerlijker dan een automatisch standaardpakket." : "Dit voorstel gebruikt uitsluitend jouw antwoorden en de actuele bronpakketten. Het is geen garantie voor het benodigde aantal lessen."}</p>
            <div className="result-route">
              <div><small>Pakket</small><strong>{calculation.selectedPackage.name}</strong></div>
              <div><small>Rijlessen</small><strong>{calculation.selectedPackage.lessonCount}</strong></div>
              <div><small>Gewenst ritme</small><strong>{state.sessionsPerWeek}× per week</strong></div>
              <div><small>Betaling</small><strong>{state.paymentInstallments === 1 ? "in één keer" : `${state.paymentInstallments} termijnen`}</strong></div>
              <div><small>Gekozen onderdelen</small><strong>{formatPrice(calculation.chosenTotalCents)}</strong></div>
            </div>
            <div className="verification-panel"><strong>Mogelijk bijkomend, niet opgeteld</strong><p>{calculation.possibleAdditionalCosts.map((cost) => `${cost.name} ${formatPrice(cost.amountCents)}`).join(" · ")}. De verplichting is nog niet bevestigd.</p></div>
            <div className="result-actions"><Link className="button" href={trialHref}>Bespreek mijn route <ArrowRight width="17" /></Link><button className="button button--ghost" onClick={shareRoute} type="button"><Share width="17" /> {shared ? "Link gekopieerd" : "Deel alle keuzes"}</button><button className="text-button" onClick={() => update({ step: 3 })} type="button">Pas mijn samenstelling aan</button></div>
            <div aria-live="polite">{shared ? <p className="share-feedback">De volledige configuratielink staat op je klembord.</p> : null}{shareFallback ? <label className="share-fallback"><span>Kopieer deze link:</span><input onFocus={(event) => event.currentTarget.select()} readOnly value={shareFallback} /></label> : null}</div>
            <p className="config-disclaimer">Geen lesduur, doorlooptijd of verplichte totaalprijs wordt berekend zolang die zakelijke gegevens niet bevestigd zijn.</p>
          </div> : null}

          {error ? <p className="config-error" ref={errorRef} role="alert" tabIndex={-1}>{error}</p> : null}
        </div>

        <aside className="live-summary" aria-live="polite">
          <div className="live-summary__label"><RouteIcon width="20" /><span>Jouw route</span></div><small>{state.manualSelection ? "Door jou gekozen" : "Voorlopig geadviseerd"}</small><h3>{calculation.selectedPackage.name}</h3>
          <ul><li><span>Rijlessen</span><strong>{calculation.selectedPackage.lessonCount}</strong></li><li><span>Gewenst ritme</span><strong>{state.sessionsPerWeek}× per week</strong></li><li><span>Startvoorkeur</span><strong>{state.desiredStart}</strong></li><li><span>Termijnen</span><strong>{state.paymentInstallments}</strong></li></ul>
          <div className="live-summary__price"><span>Gekozen onderdelen</span><strong>{formatPrice(calculation.chosenTotalCents)}</strong></div><p>Mogelijke inschrijf- en fondskosten zijn niet opgeteld zolang de toepasselijkheid onbevestigd is.</p>
        </aside>
      </div>

      <div className="configurator__bottom">
        <button className="button button--ghost" disabled={state.step === 1} onClick={() => { setError(""); update({ step: Math.max(1, state.step - 1) as ConfiguratorState["step"] }); }} type="button">Vorige stap</button>
        <div><span>Stap {state.step} van 4</span><b>{calculation.selectedPackage.lessonCount} rijlessen · {formatPrice(calculation.chosenTotalCents)}</b></div>
        {state.step < 4 ? <button className="button" onClick={goNext} type="button">{state.step === 3 ? "Bekijk mijn advies" : "Volgende stap"} <ArrowRight width="17" /></button> : <Link className="button" href={trialHref}>Vraag proefles aan <ArrowRight width="17" /></Link>}
      </div>
    </div>
  );
}
