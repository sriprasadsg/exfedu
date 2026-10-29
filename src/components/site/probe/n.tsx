import { Cpu } from "lucide-react";
export const N = ({ items, content, sub, note }: { items?: string[]; content?: string; sub?: { label: string; items: string[] }; note?: string }) => (
  <section>
    <div>{items?.length ? <ul>{items.map(item => <li key={item}>{item}</li>)}</ul> : <p>{content || "x"}</p>}</div>
    {sub && <div className="programme-section-sub"><h3><Cpu size={17} aria-hidden="true" />{sub.label}</h3></div>}
    {note && <p className="programme-section-note">{note}</p>}
  </section>
);
