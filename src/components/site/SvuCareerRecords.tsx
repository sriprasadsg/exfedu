import { useState } from "react";
import { ArrowDown, ArrowRight, Building2, CalendarRange } from "lucide-react";
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
  // Sleek monochrome brief (client, 4 November 2026): the closing word of the headline
  // carries the template's italic serif emphasis, so the split happens here only.
  const [headLead, ...headTail] = title.split(" ");
  return <div className={placements ? "svu-career-records svu-career-records--mono" : "svu-career-records svu-career-records--upskill"}>
    <div className="svu-career-title-card">
      <Title>{placements ? <>{headLead} <em>{headTail.join(" ")}</em></> : title}</Title>
      <p className="svu-career-subtitle">{placements ? "Career outcomes in data science, artificial intelligence and technology." : svuInternshipIntroduction.subtitle}</p>
    </div>
    <div className="svu-career-content-card">
    {placements
      ? <p>Students from the SVU–Exafluence MS Data Science programme have secured roles in data science and AI engineering, alongside trainee positions. The following records show their organisations, designations and academic batches.</p>
      : svuInternshipIntroduction.paragraphs.map(text => <p key={text}>{text}</p>)}
    {!placements && <SvuInternshipUpdate />}
    {placements
      ? <Sub className="svu-career-records-heading">Placement Records</Sub>
      : <Sub id="internship-records" className="svu-career-records-heading">Internship Records</Sub>}
    {placements ? <ul className="svu-mono-ledger" aria-label={title}>{shown.map(record => <li key={record.student} className="svu-outcome svu-mono-row">
      <div className="svu-mono-row-head">
        <p className="svu-outcome-org">{record.organisation}</p>
        <ArrowRight className="svu-mono-row-arrow" size={18} aria-hidden="true" />
      </div>
      <dl className="svu-mono-row-fields">
        <div><dt>Student</dt><dd><h3>{record.student}</h3></dd></div>
        <div><dt>Profile</dt><dd className="svu-outcome-role">{record.designation}</dd></div>
        <div><dt>Batch</dt><dd><span className="svu-outcome-batch"><span className="sr-only">Batch </span>{record.batch}</span></dd></div>
      </dl>
    </li>)}</ul> : <ul className="svu-intern-cards" aria-label={title}>{shown.map(record => <li key={record.student} className="svu-intern-card">
      <span className="svu-intern-org"><Building2 size={13} aria-hidden="true" />{record.organisation}</span>
      <h4>{record.student}</h4>
      <p className="svu-intern-meta" data-label="Batch"><CalendarRange size={14} aria-hidden="true" /><span className="sr-only">Batch </span>{record.batch}</p>
    </li>)}</ul>}
    </div>
  </div>;
}