"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail, Message, Phone } from "./Icons";
import { packageById, type StarterPackageId } from "../lib/content";

type FieldName = "naam" | "email" | "telefoon" | "postcode" | "contactkanalen" | "toestemming";
type FieldErrors = Partial<Record<FieldName, string>>;

const preferredDays = ["Geen voorkeur", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"] as const;
const startOptions = ["Zo snel mogelijk", "Binnen 1 maand", "Binnen 2–3 maanden", "Later / in overleg"] as const;

export default function LeadForm({ kind = "proefles" }: { kind?: "proefles" | "contact" }) {
  const [submitted, setSubmitted] = useState(false);
  const [packageName, setPackageName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [handoffUrl, setHandoffUrl] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get("pakket") ?? "";
      setPackageName(packageById.get(id as StarterPackageId)?.name ?? "");
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("naam") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("telefoon") ?? "").trim();
    const postcode = String(data.get("postcode") ?? "").trim();
    const channels = data.getAll("contactkanalen").map(String);
    const nextErrors: FieldErrors = {};

    if (name.length < 2) nextErrors.naam = "Vul minimaal twee tekens in.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Vul een geldig e-mailadres in.";
    if (phone && phone.replace(/\D/g, "").length < 8) nextErrors.telefoon = "Vul een geldig telefoonnummer in.";
    if (!email && !phone) nextErrors.email = "Vul een e-mailadres of telefoonnummer in.";
    if (postcode && !/^[1-9][0-9]{3}\s?[A-Za-z]{2}$/.test(postcode)) nextErrors.postcode = "Controleer de postcode, bijvoorbeeld 2583 AB.";
    if (!channels.length) nextErrors.contactkanalen = "Kies minimaal één voorkeurskanaal.";
    if (!data.get("toestemming")) nextErrors.toestemming = "Geef toestemming voordat je verdergaat.";

    if (Object.keys(nextErrors).length) {
      setFieldErrors(nextErrors);
      return;
    }

    const dayParts = data.getAll("dagdelen").map(String);
    const lines = [
      kind === "proefles" ? "Intake- en proeflesaanvraag" : "Contactaanvraag",
      `Naam: ${name}`,
      email ? `E-mail: ${email}` : "",
      phone ? `Telefoon: ${phone}` : "",
      postcode ? `Postcode: ${postcode.toUpperCase()}` : "",
      packageName ? `Pakketvoorkeur: ${packageName}` : "",
      kind === "proefles" ? `Gewenste start: ${String(data.get("startmoment") ?? "In overleg")}` : "",
      kind === "proefles" ? `Voorkeursdag: ${String(data.get("voorkeursdag") ?? "Geen voorkeur")}` : "",
      kind === "proefles" && dayParts.length ? `Voorkeursdagdelen: ${dayParts.join(", ")}` : "",
      `Voorkeurscontact: ${channels.join(", ")}`,
      String(data.get("bericht") ?? "").trim() ? `Toelichting: ${String(data.get("bericht")).trim()}` : "",
    ].filter(Boolean);
    const body = lines.join("\n");
    const prefersEmail = channels.includes("email") && !channels.includes("whatsapp");
    const url = prefersEmail
      ? `mailto:info@vandijkrijschool.nl?subject=${encodeURIComponent(lines[0])}&body=${encodeURIComponent(body)}`
      : `https://wa.me/31618240496?text=${encodeURIComponent(body)}`;

    setFieldErrors({});
    setHandoffUrl(url);
    setSubmitted(true);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span><Check width="30" /></span><small>Aanvraag klaargezet</small>
        <h2>{kind === "proefles" ? "Je intake staat klaar." : "Je bericht staat klaar."}</h2>
        <p>Verstuur het bericht in WhatsApp of je e-mailapp om je aanvraag definitief te verzenden.</p>
        <a className="button" href={handoffUrl} rel="noreferrer" target="_blank">Open bericht opnieuw <ArrowRight width="17" /></a>
        <button className="text-button" type="button" onClick={() => setSubmitted(false)}>Gegevens aanpassen</button>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate>
      <div className="lead-form__heading"><span className="eyebrow">{kind === "proefles" ? "Jouw intake" : "Contact"}</span><h2>{kind === "proefles" ? "Geef je voorkeuren door." : "Waar kunnen we je mee helpen?"}</h2><p>Na het invullen wordt je aanvraag klaargezet in WhatsApp of je e-mailapp.</p></div>
      {packageName ? <div className="selected-package"><Check width="17" /><span>Pakketvoorkeur: <strong>{packageName}</strong></span></div> : null}
      <div className="form-grid">
        <label htmlFor={`${kind}-naam`}><span>Voor- en achternaam *</span><input aria-invalid={Boolean(fieldErrors.naam)} id={`${kind}-naam`} name="naam" autoComplete="name" placeholder="Jouw naam" required />{fieldErrors.naam ? <small className="field-error">{fieldErrors.naam}</small> : null}</label>
        <label htmlFor={`${kind}-postcode`}><span>Postcode</span><input aria-invalid={Boolean(fieldErrors.postcode)} id={`${kind}-postcode`} name="postcode" autoComplete="postal-code" placeholder="2583 AB" />{fieldErrors.postcode ? <small className="field-error">{fieldErrors.postcode}</small> : null}</label>
        <label htmlFor={`${kind}-email`}><span>E-mailadres</span><input aria-invalid={Boolean(fieldErrors.email)} id={`${kind}-email`} name="email" type="email" autoComplete="email" placeholder="naam@voorbeeld.nl" />{fieldErrors.email ? <small className="field-error">{fieldErrors.email}</small> : null}</label>
        <label htmlFor={`${kind}-telefoon`}><span>Telefoonnummer</span><input aria-invalid={Boolean(fieldErrors.telefoon)} id={`${kind}-telefoon`} name="telefoon" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" />{fieldErrors.telefoon ? <small className="field-error">{fieldErrors.telefoon}</small> : null}</label>
        {kind === "proefles" ? <><label htmlFor={`${kind}-startmoment`}><span>Gewenst startmoment</span><select id={`${kind}-startmoment`} name="startmoment">{startOptions.map((value) => <option key={value}>{value}</option>)}</select></label><label htmlFor={`${kind}-voorkeursdag`}><span>Voorkeursdag</span><select id={`${kind}-voorkeursdag`} name="voorkeursdag">{preferredDays.map((value) => <option key={value}>{value}</option>)}</select></label></> : null}
      </div>
      {kind === "proefles" ? <fieldset className="contact-preference"><legend>Voorkeursdagdelen</legend><label><input type="checkbox" name="dagdelen" value="ochtend" /> Ochtend</label><label><input type="checkbox" name="dagdelen" value="middag" /> Middag</label><label><input type="checkbox" name="dagdelen" value="avond" /> Avond</label></fieldset> : null}
      <label className="form-message"><span>Waar kunnen we rekening mee houden?</span><textarea name="bericht" rows={5} placeholder="Vertel kort over je rijervaring, beschikbaarheid of vraag." /></label>
      <fieldset className="contact-preference"><legend>Voorkeurscontact</legend><label><input type="checkbox" defaultChecked name="contactkanalen" value="bellen" /> <Phone width="17" /> Bellen</label><label><input type="checkbox" defaultChecked name="contactkanalen" value="whatsapp" /> <Message width="17" /> WhatsApp</label><label><input type="checkbox" name="contactkanalen" value="email" /> <Mail width="17" /> E-mail</label>{fieldErrors.contactkanalen ? <small className="field-error form-grid__full">{fieldErrors.contactkanalen}</small> : null}</fieldset>
      <label className="consent"><input aria-invalid={Boolean(fieldErrors.toestemming)} type="checkbox" name="toestemming" required /><span>Ik ga akkoord met de verwerking van mijn gegevens voor deze aanvraag. Bekijk de <Link href="/privacy">privacyverklaring</Link>.{fieldErrors.toestemming ? <small className="field-error">{fieldErrors.toestemming}</small> : null}</span></label>
      <button className="button lead-form__submit" type="submit">{kind === "proefles" ? "Open intakeaanvraag" : "Open contactbericht"}<ArrowRight width="17" /></button>
      <p className="form-note">Je gegevens worden pas verzonden nadat je het klaargezette bericht zelf verstuurt.</p>
    </form>
  );
}
