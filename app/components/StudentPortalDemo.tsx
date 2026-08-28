"use client";

import { useState, type CSSProperties } from "react";
import { Calendar, Car, Check, Gauge, RouteIcon, Smartphone } from "./Icons";
import { demoStudent } from "../lib/demo";

type PortalTab = "overzicht" | "agenda" | "voortgang" | "verslagen";

const tabs: { id: PortalTab; label: string }[] = [
  { id: "overzicht", label: "Overzicht" },
  { id: "agenda", label: "Agenda" },
  { id: "voortgang", label: "Voortgang" },
  { id: "verslagen", label: "Lesverslagen" },
];

export default function StudentPortalDemo() {
  const [activeTab, setActiveTab] = useState<PortalTab>("overzicht");

  return (
    <section className="portal-demo" aria-label="Interactieve demonstratie van de NXTDRIVE leerlingomgeving">
      <header className="portal-demo__header">
        <div className="portal-demo__brand">
          <span><Smartphone width="20" /></span>
          <div><strong>NXTDRIVE</strong><small>Leerlingomgeving · demo</small></div>
        </div>
        <div className="portal-demo__student">
          <span>NO</span>
          <div><small>Fictieve leerling</small><strong>{demoStudent.name}</strong></div>
        </div>
      </header>

      <nav className="portal-tabs" aria-label="Leerlingomgeving onderdelen" role="tablist">
        {tabs.map((tab) => (
          <button
            aria-controls={`portal-panel-${tab.id}`}
            aria-selected={activeTab === tab.id}
            className={activeTab === tab.id ? "is-active" : ""}
            id={`portal-tab-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div
        aria-labelledby={`portal-tab-${activeTab}`}
        className="portal-demo__panel"
        id={`portal-panel-${activeTab}`}
        role="tabpanel"
        tabIndex={0}
      >
        {activeTab === "overzicht" ? (
          <div className="portal-overview">
            <div className="portal-welcome">
              <div><small>Welkom terug, {demoStudent.name}</small><h2>Goed op weg naar zelfstandig rijden.</h2><p>{demoStudent.package}</p></div>
              <div className="portal-progress-ring" style={{ "--portal-progress": `${demoStudent.progress * 3.6}deg` } as CSSProperties}>
                <strong>{demoStudent.progress}%</strong><span>RIS-voortgang</span>
              </div>
            </div>
            <div className="portal-stat-grid">
              <article><Calendar width="21" /><small>Volgende les</small><strong>Dinsdag · 14:30</strong><span>90 minuten</span></article>
              <article><Car width="21" /><small>Gevolgde lesuren</small><strong>{demoStudent.completedLessons} van 30</strong><span>Demotraject</span></article>
              <article><RouteIcon width="21" /><small>Volgend leerdoel</small><strong>Invoegen & uitvoegen</strong><span>Gericht oefenen</span></article>
              <article><Check width="21" /><small>Deze periode</small><strong>3 doelen afgerond</strong><span>Voortgang bijgewerkt</span></article>
            </div>
          </div>
        ) : null}

        {activeTab === "agenda" ? (
          <div className="portal-list-view">
            <div className="portal-panel-heading"><div><small>Jouw planning</small><h2>Aankomende rijlessen</h2></div><span><Calendar width="18" /> 3 afspraken</span></div>
            <div className="portal-agenda-list">
              {demoStudent.upcoming.map((lesson, index) => (
                <article key={`${lesson.day}-${lesson.time}`}>
                  <span className="portal-list-number">0{index + 1}</span>
                  <div><small>{lesson.day}</small><strong>{lesson.time} · {lesson.duration}</strong><p>{lesson.focus}</p></div>
                  <em><Check width="14" /> {lesson.status}</em>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "voortgang" ? (
          <div className="portal-list-view">
            <div className="portal-panel-heading"><div><small>Jouw ontwikkeling</small><h2>Vaardigheden en leerdoelen</h2></div><span><Gauge width="18" /> {demoStudent.progress}% totaal</span></div>
            <div className="portal-skill-list">
              {demoStudent.skills.map((skill) => (
                <article key={skill.name}>
                  <div><strong>{skill.name}</strong><small>{skill.status}</small></div>
                  <span><i style={{ width: `${skill.score}%` }} /></span>
                  <em>{skill.score}%</em>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === "verslagen" ? (
          <div className="portal-list-view">
            <div className="portal-panel-heading"><div><small>Terugkijken</small><h2>Recente lesverslagen</h2></div><span><RouteIcon width="18" /> 3 updates</span></div>
            <div className="portal-report-list">
              {demoStudent.reports.map((report) => (
                <article key={report.lesson}>
                  <span><Check width="17" /></span>
                  <div><small>{report.lesson} · {report.date}</small><strong>{report.subject}</strong><p>{report.note}</p></div>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <footer className="portal-demo__footer">
        <span><Check width="15" /> Interactieve demo zonder account</span>
        <p>Alle namen, afspraken, percentages en lesgegevens in dit dashboard zijn fictief.</p>
      </footer>
    </section>
  );
}
