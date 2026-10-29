import { Cpu } from "lucide-react";
export const C = ({ tone, sub }: { tone: string; sub?: { label: string } }) =>
  <section><h2><span className={`icon tone-${tone}`}><Cpu size={17} aria-hidden="true" /></span>{sub?.label}</h2></section>;
