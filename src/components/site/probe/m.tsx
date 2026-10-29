import { Cpu } from "lucide-react";
export const M = ({ items, content, sub, note }: { items?: string[]; content?: string; sub?: { label: string; items: string[] }; note?: string }) => {
  if (items?.length) return <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>;
  return <>
    <p>{content || "x"}</p>
    {sub && <div className="programme-section-sub"><h3><Cpu size={17} aria-hidden="true" />{sub.label}</h3></div>}
    {note && <p className="programme-section-note">{note}</p>}
  </>;
};
