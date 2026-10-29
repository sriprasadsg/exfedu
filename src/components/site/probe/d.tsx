import { Cpu } from "lucide-react";
export const D = ({ items, sub }: { items?: string[]; sub?: { label: string; items: string[] } }) =>
  <div>{items && <ul>{items.map(i => <li key={i}>{i}</li>)}</ul>}{sub && <div className="s"><h3><Cpu size={17} aria-hidden="true" />{sub.label}</h3></div>}</div>;
