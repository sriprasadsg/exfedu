// ============= Full file contents =============

import { useId } from "react";

export type FacultyPerson = { name: string; role?: string; expertise: string };

/** Compact photo-free profile grid: every person shown directly, card height follows the copy. */
export const FacultyDirectory = ({ title, people }: { title: string; people: FacultyPerson[] }) => {
  const uid = useId();

  return <section className="fd" aria-labelledby={`${uid}-h`}>
    <h4 id={`${uid}-h`} className="fd-title">{title}</h4>
    <ul className="fd-grid">
      {people.map(p => <li key={p.name} className="fd-cell">
        <h5 className="fd-name">{p.name}</h5>
        {p.role && <p className="fd-role">{p.role}</p>}
        <p className="fd-desc">{p.expertise}</p>
      </li>)}
    </ul>
  </section>;
};
