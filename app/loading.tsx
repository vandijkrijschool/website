export default function Loading() {
  return (
    <main className="route-state" aria-live="polite" aria-busy="true">
      <div>
        <span className="route-state__mark" aria-hidden="true" />
        <small>Van Dijk Rijschool</small>
        <h1>Route wordt klaargezet.</h1>
        <p>Een ogenblik, de volgende pagina wordt geladen.</p>
      </div>
    </main>
  );
}

