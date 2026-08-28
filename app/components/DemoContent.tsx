import { Sparkles } from "./Icons";

export function DemoNotice({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <aside className="demo-notice" aria-label="Demonstratie-inhoud">
      <span><Sparkles width="19" /></span>
      <div>
        <small>Premium prototype · demo-data</small>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </aside>
  );
}

