"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail, Message, Phone } from "./Icons";
import { packageById, type StarterPackageId } from "../lib/content";
import { desiredStartValues, restoreConfiguratorSearch } from "../lib/configurator";
import TrialBookingWidget from "./TrialBookingWidget";
import {
  buildLeadPayload,
  demoLeadAdapter,
  type ConfiguratorLeadContext,
  type LeadPayload,
} from "../lib/leads";

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
  const [startmoment, setStartmoment] = useState<(typeof desiredStartValues)[number]>("Zo snel mogelijk");
  const [configurator, setConfigurator] = useState<ConfiguratorLeadContext | undefined>();
  const [bookingInvalid, setBookingInvalid] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [reference, setReference] = useState("");
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("pakket") ?? "";
      const restored = restoreConfiguratorSearch(window.location.search);
      setPackageName(packageById.get(id as StarterPackageId)?.name ?? "");
      if (restored.desiredStart) setStartmoment(restored.desiredStart);
      if (id || restored.experience || restored.confidence || restored.availability) {
        setConfigurator({
          packageId: id || undefined,
          experience: restored.experience ?? undefined,
          confidence: restored.confidence ?? undefined,
          sessionsPerWeek: restored.sessionsPerWeek,
          availability: restored.availability,
          paymentInstallments: restored.paymentInstallments,
        });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    const data = new FormData(event.currentTarget);
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
    const payload: LeadPayload = buildLeadPayload({
      kind,
      name,
      email: email || undefined,
      phone: phone || undefined,
      postalCode: postcode || undefined,
      message: String(data.get("bericht") ?? "").trim() || undefined,
      contactChannels: channels,
      startmoment,
      packageInterest: packageName || undefined,
      preferredDay: String(data.get("voorkeursdag") ?? "") || undefined,
      preferredDayParts: String(data.get("voorkeursdagdelen") ?? "").split(",").map((item) => item.trim()).filter(Boolean),
      selectedSlot: appointment || undefined,
      configurator,
    });
    const result = await demoLeadAdapter.submit(payload);
    setSubmitting(false);
    if (result.status === "demo-validated") {
      setReference(result.reference);
      setSubmitted(true);
    } else {
      setError(`${result.message} Probeer opnieuw of neem telefonisch contact met ons op.`);
      window.setTimeout(() => errorSummaryRef.current?.focus(), 0);
    }
  }

  if (submitted) {
    return <div className="form-success" role="status">
      <span><Check width="30" /></span><small>Aanvraag ontvangen</small>
      <h2>{kind === "proefles" ? "Bedankt voor je proeflesaanvraag." : "Bedankt voor je bericht."}</h2>
      {kind === "proefles" && appointment ? <p className="form-success__booking"><Check width="16" /> Gekozen moment: <strong>{formatAppointment(appointment)}</strong></p> : null}
      <p>We nemen binnen één werkdag contact met je op via jouw voorkeurskanaal.</p>
      <span className="demo-confirmation">Referentie · {reference}</span>
      <button className="button" type="button" onClick={() => setSubmitted(false)}>Nog een aanvraag doen</button>
    </div>;
  }

  return (
    <form aria-busy={submitting} className="lead-form" onSubmit={submit} noValidate>
      <div className="lead-form__heading"><span className="eyebrow">{kind === "proefles" ? "Jouw aanvraag" : "Contact"}</span><h2>{kind === "proefles" ? "Leg je voorkeur vast." : "Waar kunnen we je mee helpen?"}</h2><p>Vul je gegevens in. We reageren binnen één werkdag via jouw voorkeurskanaal.</p></div>
      {packageName ? <div className="selected-package"><Check width="17" /><span>Gekozen pakket: <strong>{packageName}</strong></span></div> : null}
      <div className="form-grid">
        <label htmlFor={`${kind}-naam`}><span>Voor- en achternaam *</span><input aria-describedby={fieldErrors.naam ? `${kind}-naam-error` : undefined} aria-invalid={Boolean(fieldErrors.naam)} id={`${kind}-naam`} name="naam" autoComplete="name" placeholder="Jouw naam" required />{fieldErrors.naam ? <small className="field-error" id={`${kind}-naam-error`}>{fieldErrors.naam}</small> : null}</label>
        <label htmlFor={`${kind}-postcode`}><span>Postcode</span><input aria-describedby={fieldErrors.postcode ? `${kind}-postcode-error` : undefined} aria-invalid={Boolean(fieldErrors.postcode)} id={`${kind}-postcode`} name="postcode" autoComplete="postal-code" placeholder="2583 AB" />{fieldErrors.postcode ? <small className="field-error" id={`${kind}-postcode-error`}>{fieldErrors.postcode}</small> : null}</label>
        <label htmlFor={`${kind}-email`}><span>E-mailadres</span><input aria-describedby={fieldErrors.email ? `${kind}-email-error` : undefined} aria-invalid={Boolean(fieldErrors.email)} id={`${kind}-email`} name="email" type="email" autoComplete="email" placeholder="naam@voorbeeld.nl" />{fieldErrors.email ? <small className="field-error" id={`${kind}-email-error`}>{fieldErrors.email}</small> : null}</label>
        <label htmlFor={`${kind}-telefoon`}><span>Telefoonnummer</span><input aria-describedby={fieldErrors.telefoon ? `${kind}-telefoon-error` : undefined} aria-invalid={Boolean(fieldErrors.telefoon)} id={`${kind}-telefoon`} name="telefoon" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" />{fieldErrors.telefoon ? <small className="field-error" id={`${kind}-telefoon-error`}>{fieldErrors.telefoon}</small> : null}</label>
        <label className="form-grid__full" htmlFor={`${kind}-startmoment`}><span>Gewenst startmoment</span><select id={`${kind}-startmoment`} name="startmoment" value={startmoment} onChange={(event) => setStartmoment(event.target.value as (typeof desiredStartValues)[number])}>{desiredStartValues.map((value) => <option key={value}>{value}</option>)}</select></label>
      </div>
      {kind === "proefles" ? <TrialBookingWidget value={appointment} invalid={bookingInvalid} onChange={(nextValue) => { setAppointment(nextValue); setBookingInvalid(false); if (nextValue) setError(""); }} /> : null}
      <label className="form-message"><span>Waar kunnen we rekening mee houden?</span><textarea name="bericht" rows={5} placeholder="Vertel kort over je rijervaring, beschikbaarheid of vraag." /></label>
      <fieldset aria-describedby={fieldErrors.contactkanalen ? `${kind}-channels-error` : undefined} className="contact-preference"><legend>Je mag later contact opnemen via</legend><label><input type="checkbox" defaultChecked name="contactkanalen" value="phone" /> <Phone width="17" /> Bellen</label><label><input type="checkbox" defaultChecked name="contactkanalen" value="whatsapp" /> <Message width="17" /> WhatsApp</label><label><input type="checkbox" name="contactkanalen" value="email" /> <Mail width="17" /> E-mail</label>{fieldErrors.contactkanalen ? <small className="field-error form-grid__full" id={`${kind}-channels-error`}>{fieldErrors.contactkanalen}</small> : null}</fieldset>
      <label className="consent"><input aria-describedby={fieldErrors.toestemming ? `${kind}-consent-error` : undefined} aria-invalid={Boolean(fieldErrors.toestemming)} type="checkbox" name="toestemming" required /><span>Ik ga akkoord met de verwerking van mijn gegevens voor deze aanvraag. Bekijk de <Link href="/privacy">privacyverklaring</Link>.{fieldErrors.toestemming ? <small className="field-error" id={`${kind}-consent-error`}>{fieldErrors.toestemming}</small> : null}</span></label>
      {error ? <div className="form-error" ref={errorSummaryRef} role="alert" tabIndex={-1}><strong>Controleer je gegevens.</strong><p>{error}</p></div> : null}
      <button className="button lead-form__submit" disabled={submitting} type="submit">{submitting ? "Aanvraag versturen…" : kind === "proefles" ? "Vraag proefles aan" : "Verstuur bericht"}{submitting ? <span className="button-spinner" aria-hidden="true" /> : <ArrowRight width="17" />}</button>
      <p className="form-note">Reactie binnen één werkdag · jouw gegevens worden vertrouwelijk behandeld.</p>
    </form>
  );
}
