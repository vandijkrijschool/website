export default function Loading() {
  return (
    <main className="route-state" id="main-content" aria-live="polite" aria-busy="true">
      <div>
        <span className="route-state__mark" aria-hidden="true" />
        <small>Van Dijk Rijschool</small>
        <p className="route-state__title">Route wordt klaargezet.</p>
        <p>Een ogenblik, de volgende pagina wordt geladen.</p>
      </div>
    </main>
  );
}
