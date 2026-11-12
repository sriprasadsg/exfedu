import { useId } from "react";
import { svuFacultyPhotos } from "@/data/svuFacultyPhotos";

export type FacultyPerson = { name: string; role?: string; expertise: string };

/** Filename-matched portraits; missing photos remain explicit, never substituted.
 * `page` lifts the headings one level for the dedicated faculty page. */
export const initialsOf = (name: string) => {
  const [first = "", second = ""] = name.split(" ");
  return (first.slice(0, 1) + (second.slice(0, 1) || first.slice(1, 2))).toUpperCase();
};

export const FacultyDirectory = ({ title, people, intro, page = false, technical = false }: { title: string; people: FacultyPerson[]; intro?: string; page?: boolean; technical?: boolean }) => {
  const uid = useId();
  const Title = page ? "h2" : "h4";
  const Name = page ? "h3" : "h5";

  return <section className={`fd${page ? " fd-page" : ""}${technical ? " fd-technical" : " fd-faculty"}`} aria-labelledby={`${uid}-h`}>
    <Title id={`${uid}-h`} className="fd-title">{title}</Title>
    {intro && <p className="fd-intro">{intro}</p>}
    <ul className="fd-grid">
      {people.map(p => <li key={p.name} className="fd-cell">
        <div className="fd-portrait">
          {svuFacultyPhotos[p.name]
            ? <img src={svuFacultyPhotos[p.name]} alt={`Portrait of ${p.name}`} width={600} height={540} loading="lazy" />
            : <span className="fd-photo-missing">Photo not supplied</span>}
        </div>
        <div className="fd-copy">
        <Name className="fd-name">{p.name}</Name>
        {p.role && <p className="fd-role">{p.role}</p>}
        {p.expertise && <p className="fd-desc">{p.expertise}</p>}
        </div>
      </li>)}
    </ul>
  </section>;
};
