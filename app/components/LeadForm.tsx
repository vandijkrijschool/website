"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail, Message, Phone } from "./Icons";
import { packages } from "../lib/site";
import TrialBookingWidget from "./TrialBookingWidget";
import { isProductionSite } from "../lib/site";
import { demoLeadAdapter, type DemoLeadScenario, type LeadPayload } from "../lib/leads";

type FieldName = "naam" | "email" | "telefoon" | "postcode" | "contactkanalen" | "toestemming" | "proeflesmoment";
type FieldErrors = Partial<Record<FieldName, string>>;

function formatAppointment(value: string) {
  const match = value.match(/^(\d{4}-\d{2}-\d{2})-(\d{2}:\d{2})$/);
  if (!match) return value;
  const date = new Date(`${match[1]}T12:00:00`);
  return `${new Intl.DateTimeFormat("nl-NL", { weekday: "long", day: "numeric", month: "long" }).format(date)} · ${match[2]}`;
}

export default function LeadForm({ kind = "proefles" }: { kind?: "proefles" | "contact" }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [packageName, setPackageName] = useState("");
  const [appointment, setAppointment] = useState("");
  const [bookingInvalid, setBookingInvalid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submissionScenario, setSubmissionScenario] = useState<DemoLeadScenario>("success");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [reference, setReference] = useState("");
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const id = new URLSearchParams(window.location.search).get("pakket");
      setPackageName(packages.find((item) => item.id === id)?.name ?? "");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("naam") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("telefoon") ?? "").trim();
    const postcode = String(data.get("postcode") ?? "").trim();
    const consent = data.get("toestemming");
    const channels = data.getAll("contactkanalen").map(String);
    const nextErrors: FieldErrors = {};
    if (name.length < 2) nextErrors.naam = "Vul minimaal twee tekens in.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Vul een geldig e-mailadres in.";
    if (phone && phone.replace(/\D/g, "").length < 8) nextErrors.telefoon = "Vul een geldig telefoonnummer in.";
    if (!email && !phone) nextErrors.email = "Vul een e-mailadres of telefoonnummer in.";
    if (!consent) nextErrors.toestemming = "Geef toestemming voordat je verdergaat.";
    const hasReachableChannel = channels.some((channel) => channel === "email" ? Boolean(email) : Boolean(phone));
    if (!hasReachableChannel) nextErrors.contactkanalen = "Kies een kanaal waarvoor je ook contactgegevens hebt ingevuld.";
    if (kind === "proefles" && !appointment) {
      setBookingInvalid(true);
      nextErrors.proeflesmoment = "Kies eerst één van de beschikbare proeflesmomenten.";
    }
    if (postcode && !/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/.test(postcode)) nextErrors.postcode = "Controleer de postcode, bijvoorbeeld 2583 AB.";
    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      setError("Controleer de gemarkeerde velden en probeer opnieuw.");
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0);
      return;
    }
    setFieldErrors({});
    setError("");
    setBookingInvalid(false);
    setSubmitting(true);
    const payload: LeadPayload = {
      kind,
      name,
      email: email || undefined,
      phone: phone || undefined,
      postalCode: postcode || undefined,
      message: String(data.get("bericht") ?? "").trim() || undefined,
      contactChannels: channels,
      packageInterest: packageName || undefined,
      preferredDay: String(data.get("voorkeursdag") ?? "") || undefined,
      preferredDayParts: String(data.get("voorkeursdagdelen") ?? "").split(",").map((item) => item.trim()).filter(Boolean),
      selectedSlot: appointment || undefined,
    };
    const result = await demoLeadAdapter.submit(payload, submissionScenario);
    setSubmitting(false);
    if (result.status === "accepted") {
      setReference(result.reference);
      setSubmitted(true);
    } else {
      setError(`${result.message} Er is niets verzonden of opgeslagen; probeer opnieuw of neem contact op.`);
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0);
    }
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span><Check width="30" /></span>
        <small>Formulier succesvol gecontroleerd</small>
        <h2>{kind === "proefles" ? "Jouw proeflesaanvraag is gecontroleerd." : "Jouw aanvraag is gecontroleerd."}</h2>
        {kind === "proefles" && appointment ? <p className="form-success__booking"><Check width="16" /> Gekozen NXTDRIVE-moment: <strong>{formatAppointment(appointment)}</strong></p> : null}
        <p>De volledige demoflow is geslaagd. Er is bewust niets verzonden of opgeslagen; de bevestiging en referentie zijn lokaal gesimuleerd.</p>
        <span className="demo-confirmation">Referentie · {reference}</span>
        <button className="button" type="button" onClick={() => setSubmitted(false)}>Formulier opnieuw bekijken</button>
      </div>
    );
  }

  return (
    <form aria-busy={submitting} className="lead-form" onSubmit={submit} noValidate>
      <div className="lead-form__heading">
        <span className="eyebrow">{kind === "proefles" ? "Jouw aanvraag" : "Contactformulier"}</span>
        <h2>{kind === "proefles" ? "Plan jouw proefles in drie stappen." : "Waar kunnen we je mee helpen?"}</h2>
        <p>{kind === "proefles" ? "Kies je voorkeuren en selecteer daarna direct één van drie beschikbare NXTDRIVE-momenten." : "Een aanvraag is nog geen definitieve boeking. We nemen persoonlijk contact op om de mogelijkheden te bespreken."}</p>
      </div>
      {packageName ? <div className="selected-package"><Check width="17" /><span>Gekozen route: <strong>{packageName}</strong></span></div> : null}
      {!isProductionSite ? <label className="form-scenario"><span>Prototype-submitstatus testen</span><select value={submissionScenario} onChange={(event) => setSubmissionScenario(event.target.value as DemoLeadScenario)}><option value="success">Succes</option><option value="provider-error">Koppelfout</option><option value="timeout">Timeout</option></select></label> : null}
      <div className="form-grid">
        <label htmlFor={`${kind}-naam`}><span>Voor- en achternaam *</span><input aria-describedby={fieldErrors.naam ? `${kind}-naam-error` : undefined} aria-invalid={Boolean(fieldErrors.naam)} id={`${kind}-naam`} name="naam" autoComplete="name" placeholder="Jouw naam" required />{fieldErrors.naam ? <small className="field-error" id={`${kind}-naam-error`}>{fieldErrors.naam}</small> : null}</label>
        <label htmlFor={`${kind}-postcode`}><span>Postcode</span><input aria-describedby={fieldErrors.postcode ? `${kind}-postcode-error` : undefined} aria-invalid={Boolean(fieldErrors.postcode)} id={`${kind}-postcode`} name="postcode" autoComplete="postal-code" inputMode="text" placeholder="2583 AB" />{fieldErrors.postcode ? <small className="field-error" id={`${kind}-postcode-error`}>{fieldErrors.postcode}</small> : null}</label>
        <label htmlFor={`${kind}-email`}><span>E-mailadres</span><input aria-describedby={fieldErrors.email ? `${kind}-email-error` : undefined} aria-invalid={Boolean(fieldErrors.email)} id={`${kind}-email`} name="email" type="email" autoComplete="email" placeholder="naam@voorbeeld.nl" />{fieldErrors.email ? <small className="field-error" id={`${kind}-email-error`}>{fieldErrors.email}</small> : null}</label>
        <label htmlFor={`${kind}-telefoon`}><span>Telefoonnummer</span><input aria-describedby={fieldErrors.telefoon ? `${kind}-telefoon-error` : undefined} aria-invalid={Boolean(fieldErrors.telefoon)} id={`${kind}-telefoon`} name="telefoon" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" />{fieldErrors.telefoon ? <small className="field-error" id={`${kind}-telefoon-error`}>{fieldErrors.telefoon}</small> : null}</label>
        {kind === "contact" ? <label><span>Gewenst startmoment</span><select name="startmoment" defaultValue="Zo snel mogelijk"><option>Zo snel mogelijk</option><option>Binnen een maand</option><option>Over 1 tot 3 maanden</option><option>Ik weet het nog niet</option></select></label> : <div className="form-mini-assurance"><Check width="16" /><span>Geen betaling nodig om aan te vragen</span></div>}
      </div>
      {kind === "proefles" ? <TrialBookingWidget value={appointment} invalid={bookingInvalid} onChange={(nextValue) => { setAppointment(nextValue); setBookingInvalid(false); if (nextValue) setError(""); }} /> : null}
      <label className="form-message"><span>Waar kunnen we rekening mee houden?</span><textarea name="bericht" rows={5} placeholder="Vertel kort over je rijervaring, beschikbaarheid of vraag." /></label>
      <fieldset aria-describedby={fieldErrors.contactkanalen ? `${kind}-channels-error` : undefined} className="contact-preference"><legend>Je mag contact opnemen via</legend><label><input type="checkbox" defaultChecked name="contactkanalen" value="phone" /> <Phone width="17" /> Bellen</label><label><input type="checkbox" defaultChecked name="contactkanalen" value="whatsapp" /> <Message width="17" /> WhatsApp</label><label><input type="checkbox" name="contactkanalen" value="email" /> <Mail width="17" /> E-mail</label>{fieldErrors.contactkanalen ? <small className="field-error form-grid__full" id={`${kind}-channels-error`}>{fieldErrors.contactkanalen}</small> : null}</fieldset>
      <label className="consent"><input aria-describedby={fieldErrors.toestemming ? `${kind}-consent-error` : undefined} aria-invalid={Boolean(fieldErrors.toestemming)} type="checkbox" name="toestemming" required /><span>Ik ga ermee akkoord dat Van Dijk Rijschool contact met mij opneemt over deze aanvraag. Bekijk de <Link href="/privacy">privacyverklaring</Link>.{fieldErrors.toestemming ? <small className="field-error" id={`${kind}-consent-error`}>{fieldErrors.toestemming}</small> : null}</span></label>
      {error ? <div className="form-error" ref={errorSummaryRef} role="alert" tabIndex={-1}><strong>De demo-aanvraag is nog niet verwerkt.</strong><p>{error}</p></div> : null}
      <button className="button lead-form__submit" disabled={submitting} type="submit">
        {submitting ? "Demo-aanvraag controleren…" : kind === "proefles" ? "Plan mijn proefles" : "Verstuur mijn vraag"}
        {submitting ? <span className="button-spinner" aria-hidden="true" /> : <ArrowRight width="17" />}
      </button>
      <p className="form-note">Prototype: dit formulier verzendt nog geen gegevens en slaat geen persoonsgegevens op.</p>
    </form>
  );
}
