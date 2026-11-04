import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Building2, CalendarRange } from "lucide-react";
import svuLaptopDashboard from "@/assets/svu-laptop-dashboard-v2.png";
import { initialsOf } from "@/components/site/FacultyDirectory";
import { svuPagePath } from "@/lib/programmeNavigation";
import { filterSvuCareerRecords, svuInternshipIntroduction, svuInternshipUpdate, svuInternships, svuPlacements } from "@/data/svuCareer";

/** Approved text-only internship update (client, 3 November 2026): the panel sits between the
 * introduction and the records table, so existing records stay untouched and no student is
 * listed twice. The name list opens beneath its own control, one at a time. */
const SvuInternshipUpdate = ({ open, onToggle }: { open: boolean; onToggle: () => void }) => {
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
      <Button variant="ghost" type="button" className="svu-internship-update-toggle" aria-expanded={open} aria-controls="svu-internship-update-list" onClick={onToggle}>
        <span className="svu-internship-update-disc" aria-hidden="true"><ArrowDown size={15} /></span>
        <span>{open ? "Hide Participating Students" : "View Participating Students"}</span>
      </Button>
    </div>
  </section>;
};

export default function SvuCareerRecords({ kind, embedded = false }: { kind: "placements" | "internships"; embedded?: boolean }) {
  const [studentsOpen, setStudentsOpen] = useState(false);
  const placements = kind === "placements";
  const records = placements ? svuPlacements : svuInternships;
  // Search and batch filter removed (client, 2 November 2026); records show in full.
  const shown = filterSvuCareerRecords(records, "", "all");
  const title = placements ? "Student Placements" : "Student Internships";
  const Title = embedded ? "h2" : "h1";
  const Sub = embedded ? "h3" : "h2";
  return <div className={placements ? "svu-career-records svu-career-records--archbook svu-career-records--logistics" : "svu-career-records svu-career-records--upskill"}>
    <div className="svu-career-title-card">
      <Title>{title}</Title>
      <p className="svu-career-subtitle">{placements ? "Career outcomes in data science, artificial intelligence and technology." : svuInternshipIntroduction.subtitle}</p>
      {!placements && svuInternshipIntroduction.paragraphs.map(text => <p className="svu-intern-introduction" key={text}>{text}</p>)}
      {placements && <div className="svu-hero-actions">
        <Link to={`${svuPagePath("innovations")}#internships`} className="svu-hero-secondary">View Internships</Link>
      </div>}
    </div>
    <div className="svu-career-content-card">
    {placements ? <div className="svu-pl-split">
      <div className="svu-pl-copy">
        <p>Students from the SVU–Exafluence MS Data Science programme have secured roles in data science and AI engineering, alongside trainee positions. The following records show their organisations, designations and academic batches.</p>
        <Link to={`${svuPagePath("overview")}#programmes`} className="svu-pl-link">Explore Programmes <ArrowRight size={15} aria-hidden="true" /></Link>
      </div>
      <figure className="svu-pl-art"><img src={svuLaptopDashboard} alt="Laptop showing a data-analysis dashboard, the artwork used on the SVU collaboration banner" /></figure>
    </div>
      : null}
    {!placements && <>
      <SvuInternshipUpdate open={studentsOpen} onToggle={() => setStudentsOpen(open => !open)} />
      <ol id="svu-internship-update-list" className="svu-internship-update-names svu-internship-update-names--full" hidden={!studentsOpen}>
        {svuInternshipUpdate.students.map(name => <li key={name}>{name}</li>)}
      </ol>
    </>}
    {placements
      ? <Sub className="svu-career-records-heading">Placement Records</Sub>
      : <Sub id="internship-records" className="svu-career-records-heading">Internship Records</Sub>}
    {placements ? <ul className="svu-pl-cards" aria-label={title}>{shown.map(record => <li key={record.student} className="svu-outcome svu-pl-card">
      <span className="svu-pl-mark" aria-hidden="true">{initialsOf(record.student)}</span>
      <h3>{record.student}</h3>
      <p className="svu-outcome-role">{record.designation}</p>
      <p className="svu-outcome-org">{record.organisation}</p>
      <p className="svu-outcome-batch"><span className="sr-only">Batch </span>{record.batch}</p>
    </li>)}</ul> : <ul className="svu-intern-cards" aria-label={title}>{shown.map(record => <li key={record.student} className="svu-intern-card">
      <span className="svu-intern-org"><Building2 size={13} aria-hidden="true" />{record.organisation}</span>
      <h4>{record.student}</h4>
      <p className="svu-intern-meta" data-label="Batch"><CalendarRange size={14} aria-hidden="true" /><span className="sr-only">Batch </span>{record.batch}</p>
    </li>)}</ul>}
    </div>
  </div>;
}
