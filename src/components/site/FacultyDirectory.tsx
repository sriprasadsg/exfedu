import { useId } from "react";

export type FacultyPerson = { name: string; role?: string; expertise: string };

/** Text-only profile cards; names lead directly without photos or initial tiles.
 * `page` lifts the headings one level for the dedicated faculty page. */
export const initialsOf = (name: string) => {
  const [first = "", second = ""] = name.split(" ");
  return (first.slice(0, 1) + (second.slice(0, 1) || first.slice(1, 2))).toUpperCase();
};

export const FacultyDirectory = ({ title, people, intro, page = false }: { title: string; people: FacultyPerson[]; intro?: string; page?: boolean }) => {
  const uid = useId();
  const Title = page ? "h2" : "h4";
  const Name = page ? "h3" : "h5";

  return <section className={`fd${page ? " fd-page" : ""}`} aria-labelledby={`${uid}-h`}>
    <Title id={`${uid}-h`} className="fd-title">{title}</Title>
    {intro && <p className="fd-intro">{intro}</p>}
    <ul className="fd-grid">
      {people.map(p => <li key={p.name} className="fd-cell">
        <Name className="fd-name">{p.name}</Name>
        {p.role && <p className="fd-role">{p.role}</p>}
        <p className="fd-desc">{p.expertise}</p>
      </li>)}
    </ul>
  </section>;
};
