import { Building2, CalendarRange, Hash, UserRound } from "lucide-react";
import { filterSvuCareerRecords, svuInternshipIntroduction, svuInternships, svuPlacements } from "@/data/svuCareer";

export default function SvuCareerRecords({ kind }: { kind: "placements" | "internships" }) {
  const placements = kind === "placements";
  const records = placements ? svuPlacements : svuInternships;
  // Search and batch filter removed (client, 2 November 2026); records show in full.
  const shown = filterSvuCareerRecords(records, "", "all");
  const title = placements ? "Student Placements" : "Student Internships";
  return <div className="svu-career-records">
    <h1>{title}</h1>
    <p className="svu-career-subtitle">{placements ? "Career outcomes in data science, artificial intelligence and technology." : svuInternshipIntroduction.subtitle}</p>
    {placements
      ? <p>Students from the SVU–Exafluence MS Data Science programme have secured roles in data science and AI engineering, alongside trainee positions. The following records show their organisations, designations and academic batches.</p>
      : svuInternshipIntroduction.paragraphs.map(text => <p key={text}>{text}</p>)}
    {placements ? <ul className="svu-outcomes" aria-label={title}>{shown.map(record => <li key={record.student} className="svu-outcome">
      <span className="svu-outcome-batch">Batch {record.batch}</span>
      <h2>{record.student}</h2>
      <p className="svu-outcome-role">{record.designation}</p>
      <p className="svu-outcome-org">{record.organisation}</p>
    </li>)}</ul> : <div className="svu-career-table-wrap"><table className="svu-career-table" aria-label={title}><thead><tr>
      <th scope="col"><i className="svu-career-head-icon svu-career-head-1"><Hash size={14} aria-hidden="true" /></i><span>No.</span></th>
      <th scope="col"><i className="svu-career-head-icon svu-career-head-2"><UserRound size={14} aria-hidden="true" /></i><span>Student Name</span></th>
      <th scope="col"><i className="svu-career-head-icon svu-career-head-3"><CalendarRange size={14} aria-hidden="true" /></i><span>Batch</span></th>
      <th scope="col"><i className="svu-career-head-icon svu-career-head-4"><Building2 size={14} aria-hidden="true" /></i><span>{placements ? "Organisation" : "Internship Organisation"}</span></th>
    </tr></thead><tbody>{shown.map((record, index) => <tr key={record.student}><td data-label="No.">{index + 1}</td><th scope="row" data-label="Student Name">{record.student}</th><td data-label="Batch">{record.batch}</td><td data-label={placements ? "Organisation" : "Internship Organisation"}>{record.organisation}</td></tr>)}</tbody></table></div>}
  </div>;
}