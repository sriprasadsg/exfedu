import { useState } from "react";
import { ArrowDown, Building2, CalendarRange, UserRound } from "lucide-react";
import { filterSvuCareerRecords, svuInternshipIntroduction, svuInternshipUpdate, svuInternships, svuPlacements } from "@/data/svuCareer";

/** Approved text-only internship update (client, 3 November 2026): the panel sits between the
 * introduction and the records table, so existing records stay untouched and no student is
 * listed twice. The name list opens beneath its own control, one at a time. */
const SvuInternshipUpdate = () => {
  const [open, setOpen] = useState(false);
  return <section className="svu-internship-update" aria-labelledby="svu-internship-update-heading">
    <header className="svu-internship-update-head">
      <h2 id="svu-internship-update-heading">{svuInternshipUpdate.heading}</h2>
      <p className="svu-internship-update-meta">
        <span className="svu-internship-update-status">{svuInternshipUpdate.status}</span>
        <span className="svu-internship-update-record">Supporting record: {svuInternshipUpdate.recordNote}</span>
      </p>
    </header>
    <p className="svu-internship-update-summary">{svuInternshipUpdate.summary}</p>
    <ul className="svu-internship-update-highlights" aria-label="Internship highlights">
      {svuInternshipUpdate.highlights.map(item => <li key={item}>{item}</li>)}
    </ul>
    <div className="svu-internship-update-students">
      <button type="button" className="svu-internship-update-toggle" aria-expanded={open} aria-controls="svu-internship-update-list" onClick={() => setOpen(!open)}>
        <span className="svu-internship-update-disc" aria-hidden="true"><ArrowDown size={15} /></span>
        <span>{open ? "Hide Participating Students" : "View Participating Students"}</span>
      </button>
      <ol id="svu-internship-update-list" className="svu-internship-update-names" hidden={!open}>
        {svuInternshipUpdate.students.map(name => <li key={name}>{name}</li>)}
      </ol>
    </div>
  </section>;
};

export default function SvuCareerRecords({ kind, embedded = false }: { kind: "placements" | "internships"; embedded?: boolean }) {
  const placements = kind === "placements";
  const records = placements ? svuPlacements : svuInternships;
  // Search and batch filter removed (client, 2 November 2026); records show in full.
  const shown = filterSvuCareerRecords(records, "", "all");
  const title = placements ? "Student Placements" : "Student Internships";
  const Title = embedded ? "h2" : "h1";
  const Sub = embedded ? "h3" : "h2";
  return <div className="svu-career-records">
    <div className="svu-career-title-card">
      <Title>{title}</Title>
      <p className="svu-career-subtitle">{placements ? "Career outcomes in data science, artificial intelligence and technology." : svuInternshipIntroduction.subtitle}</p>
      <dl className="svu-career-figures">
        <div><dt>{placements ? "Students placed" : "Interns recorded"}</dt><dd>{shown.length}</dd></div>
        <div><dt>Organisations</dt><dd>{new Set(shown.map(r => r.organisation)).size}</dd></div>
        <div><dt>Batches</dt><dd>{new Set(shown.map(r => r.batch)).size}</dd></div>
      </dl>
    </div>
    <div className="svu-career-content-card">
    {placements
      ? <p>Students from the SVU–Exafluence MS Data Science programme have secured roles in data science and AI engineering, alongside trainee positions. The following records show their organisations, designations and academic batches.</p>
      : svuInternshipIntroduction.paragraphs.map(text => <p key={text}>{text}</p>)}
    {!placements && <SvuInternshipUpdate />}
    <Sub className="svu-career-records-heading">{placements ? "Placement Records" : "Internship Records"}</Sub>
    {placements ? <ul className="svu-outcomes" aria-label={title}>{shown.map(record => <li key={record.student} className="svu-outcome">
      <span className="svu-outcome-batch">Batch {record.batch}</span>
      <h3>{record.student}</h3>
      <p className="svu-outcome-role">{record.designation}</p>
      <p className="svu-outcome-org"><Building2 size={14} aria-hidden="true" />{record.organisation}</p>
    </li>)}</ul> : <div className="svu-career-table-wrap"><table className="svu-career-table" aria-label={title}><thead><tr>
      <th scope="col"><i className="svu-career-head-icon svu-career-head-2"><UserRound size={14} aria-hidden="true" /></i><span>Student Name</span></th>
      <th scope="col"><i className="svu-career-head-icon svu-career-head-3"><CalendarRange size={14} aria-hidden="true" /></i><span>Batch</span></th>
      <th scope="col"><i className="svu-career-head-icon svu-career-head-4"><Building2 size={14} aria-hidden="true" /></i><span>{placements ? "Organisation" : "Internship Organisation"}</span></th>
    </tr></thead><tbody>{shown.map(record => <tr key={record.student}><th scope="row" data-label="Student Name">{record.student}</th><td data-label="Batch">{record.batch}</td><td data-label={placements ? "Organisation" : "Internship Organisation"}>{record.organisation}</td></tr>)}</tbody></table></div>}
    </div>
  </div>;
}