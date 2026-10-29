import { Cpu } from "lucide-react";
const PENDING = "x";
export const I = ({ items, content, sub }: { items?: string[]; content?: string; sub?: { label: string; items: string[] } }) =>
  <section>{items?.length ? <ul>{items.map(item => <li key={item}>{item}</li>)}</ul> : <p>{content || PENDING}</p>{sub && <div className="programme-section-sub"><h3><Cpu size={17} aria-hidden="true" />{sub.label}</h3></div>}</section>;
