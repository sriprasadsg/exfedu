import { useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterSvuCareerRecords, svuBatchRank, svuInternshipIntroduction, svuInternships, svuPlacements } from "@/data/svuCareer";

export default function SvuCareerRecords({ kind }: { kind: "placements" | "internships" }) {
  const [query, setQuery] = useState("");
  const [batch, setBatch] = useState("all");
  const placements = kind === "placements";
  const records = placements ? svuPlacements : svuInternships;
  const shown = filterSvuCareerRecords(records, query, batch);
  const title = placements ? "Student Placements" : "Student Internships";
  return <div className="svu-career-records">
    <h1>{title}</h1>
    <p className="svu-career-subtitle">{placements ? "Career outcomes in data science, artificial intelligence and technology." : svuInternshipIntroduction.subtitle}</p>
    {placements
      ? <p>Students from the SVU–Exafluence MS Data Science programme have secured roles in data science and AI engineering, alongside trainee positions. The following records show their organisations, designations and academic batches.</p>
      : svuInternshipIntroduction.paragraphs.map(text => <p key={text}>{text}</p>)}
    <div className="svu-career-filters">
      <label><span>Search {kind}</span><div className="svu-career-search"><Search size={17} aria-hidden="true" /><Input aria-label={`Search ${kind}`} placeholder="Student, organisation or role" value={query} onChange={event => setQuery(event.target.value)} /></div></label>
      <label><span>Batch</span><Select value={batch} onValueChange={setBatch}><SelectTrigger aria-label={`${title} batch`}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All batches</SelectItem>{[...new Set(records.map(record => record.batch))].map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}</SelectContent></Select></label>
      <Button variant="ghost" size="icon" aria-label={`Reset ${kind} filters`} title="Reset filters" onClick={() => { setQuery(""); setBatch("all"); }}><RotateCcw size={17} /></Button>
    </div>
    <p className="svu-career-count" role="status">{shown.length} of {records.length} records</p>
    {placements ? <ul className="svu-outcomes" aria-label={title}>{shown.map(record => <li key={record.student} className="svu-outcome">
      <span className="svu-outcome-batch">Batch {record.batch}</span>
      <h2>{record.student}</h2>
      <p className="svu-outcome-role">{record.designation}</p>
      <p className="svu-outcome-org">{record.organisation}</p>
    </li>)}</ul> :     <table className="svu-career-table" aria-label={title}><thead><tr><th scope="col">No.</th><th scope="col">Student Name</th><th scope="col">Batch</th><th scope="col">{placements ? "Organisation" : "Internship Organisation"}</th></tr></thead><tbody>{shown.map(record => <tr key={record.student}><td data-label="No.">{records.indexOf(record) + 1}</td><th scope="row" data-label="Student Name">{record.student}</th><td data-label="Batch">{record.batch}</td><td data-label={placements ? "Organisation" : "Internship Organisation"}>{record.organisation}</td></tr>)}</tbody></table>}
    {shown.length === 0 && <div className="svu-career-empty"><p>No matching records.</p><Button variant="link" onClick={() => { setQuery(""); setBatch("all"); }}>Reset filters</Button></div>}
  </div>;
}