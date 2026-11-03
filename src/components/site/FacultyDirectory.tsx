import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";

export type FacultyPerson = { name: string; role?: string; expertise: string };

/** Up to three tags taken verbatim from the person's own description. */
export const expertiseTags = (text: string): string[] => {
  const body = text.includes(";") ? text.slice(text.indexOf(";") + 1) : text;
  return body.replace(/\.$/, "").split(/,|\band\b/).map(s => s.trim()).filter(s => s && s.split(" ").length <= 4).slice(0, 3);
};

const Tags = ({ text }: { text: string }) => {
  const tags = expertiseTags(text);
  return tags.length ? <ul className="fd-tags" aria-label="Expertise">{tags.map(t => <li key={t}>{t}</li>)}</ul> : null;
};

export const FacultyDirectory = ({ title, people }: { title: string; people: FacultyPerson[] }) => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);
  const uid = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const person = people[active];

  const onKey = (e: KeyboardEvent, i: number) => {
    const next = e.key === "ArrowDown" ? i + 1 : e.key === "ArrowUp" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? people.length - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = (next + people.length) % people.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return <section className="fd" aria-labelledby={`${uid}-h`}>
    <h4 id={`${uid}-h`} className="fd-title">{title}</h4>
    <div className="fd-desktop">
      <div className="fd-list" role="tablist" aria-orientation="vertical" aria-label={title}>
        {people.map((p, i) => <button key={p.name} ref={el => (tabs.current[i] = el)} type="button" role="tab" id={`${uid}-t${i}`} aria-selected={i === active} aria-controls={`${uid}-p`} tabIndex={i === active ? 0 : -1} className="fd-item" onClick={() => setActive(i)} onKeyDown={e => onKey(e, i)}>
          <span className="fd-name">{p.name}</span>{p.role && <span className="fd-role">{p.role}</span>}
        </button>)}
      </div>
      <div className="fd-profile" role="tabpanel" id={`${uid}-p`} aria-labelledby={`${uid}-t${active}`} aria-live="polite">
        <h5>{person.name}</h5>{person.role && <p className="fd-role">{person.role}</p>}
        <p className="fd-desc">{person.expertise}</p><Tags text={person.expertise} />
      </div>
    </div>
    <div className="fd-mobile">
      {people.map((p, i) => <div key={p.name} className="fd-acc">
        <button type="button" className="fd-item" aria-expanded={open === i} aria-controls={`${uid}-m${i}`} onClick={() => setOpen(open === i ? -1 : i)}>
          <span><span className="fd-name">{p.name}</span>{p.role && <span className="fd-role">{p.role}</span>}</span>
          <ChevronDown size={16} aria-hidden="true" className="fd-chev" />
        </button>
        {open === i && <div id={`${uid}-m${i}`} className="fd-acc-body"><p className="fd-desc">{p.expertise}</p><Tags text={p.expertise} /></div>}
      </div>)}
    </div>
  </section>;
};
