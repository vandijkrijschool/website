"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, MenuIcon } from "./Icons";
import { footerNavigation, primaryNavigation } from "../lib/site";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("a")?.focus());
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close({ restoreFocus = false } = {}) {
    setOpen(false);
    if (restoreFocus) window.setTimeout(() => toggleRef.current?.focus(), 0);
  }

  function handlePanelKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      close({ restoreFocus: true });
      return;
    }
    if (event.key !== "Tab") return;
    const focusable = Array.from(panelRef.current?.querySelectorAll<HTMLElement>("a, button:not(:disabled)") ?? []);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="mobile-nav">
      <button aria-controls="mobile-navigation-panel" aria-expanded={open} aria-label={open ? "Menu sluiten" : "Menu openen"} className="mobile-nav__toggle" onClick={() => setOpen((value) => !value)} ref={toggleRef} type="button">
        {open ? <ChevronDown width="22" /> : <MenuIcon width="23" />}
      </button>
      {open ? (
        <>
          <button aria-label="Menu sluiten" className="mobile-nav__backdrop" onClick={() => close()} type="button" />
          <div className="mobile-nav__panel" id="mobile-navigation-panel" onKeyDown={handlePanelKeyDown} ref={panelRef}>
            <div className="mobile-nav__top"><span>Menu</span><button aria-label="Menu sluiten" onClick={() => close({ restoreFocus: true })} type="button"><ChevronDown width="20" /></button></div>
            {[...primaryNavigation, ...footerNavigation].map((item) => <Link href={item.href} key={item.href} onClick={() => close()}>{item.label}<ArrowRight width="17" /></Link>)}
            <Link className="button" href="/proefles" onClick={() => close()}>Plan intake</Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
