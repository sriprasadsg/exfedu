import { Cpu, FlaskConical } from "lucide-react";
export const B = ({ sub, note }: { sub?: { label: string; items: string[] }; note?: string }) =>
  <section>{sub && <div className="s"><h3><Cpu size={17} aria-hidden="true" />{sub.label}</h3><ul>{sub.items.map(i => <li key={i}>{i}</li>)}</ul></div>}{note && <p className="n"><FlaskConical size={17} aria-hidden="true" />{note}</p>}</section>;
