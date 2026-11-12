import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, Building2, CalendarRange, GraduationCap, UsersRound, CalendarDays, Layers, Monitor } from "lucide-react";
import { svuPagePath } from "@/lib/programmeNavigation";
import { filterSvuCareerRecords, svuInternshipIntroduction, svuInternshipUpdate, svuInternships, svuPlacements } from "@/data/svuCareer";
import { svuPlacementPhotos } from "@/data/svuPlacementPhotos";

/** Approved text-only internship update (client, 3 November 2026): the panel sits between the
 * introduction and the records table, so existing records stay untouched and no student is
 * listed twice. The name list opens beneath its own control, one at a time. */
const SvuInternshipUpdate = ({ open, onToggle }: { open: boolean; onToggle: () => void }) => {
  const highlightIcons = [UsersRound, CalendarDays, Layers, Monitor];
  return <section className="svu-internship-update svu-internship-update--prantokon" aria-labelledby="svu-internship-update-heading">
    <header className="svu-internship-update-head">
      <h2 id="svu-internship-update-heading">{svuInternshipUpdate.heading}</h2>
      <p className="svu-internship-update-meta">
        <span className="svu-internship-update-status">{svuInternshipUpdate.status}</span>
        <span className="svu-internship-update-record">Supporting record: {svuInternshipUpdate.recordNote}</span>
      </p>
    </header>
    <p className="svu-internship-update-summary">{svuInternshipUpdate.summary}</p>
    <ul className="svu-internship-update-highlights" aria-label="Internship highlights">
      {svuInternshipUpdate.highlights.map((item, index) => {
        const Icon = highlightIcons[index] ?? GraduationCap;
        return <li key={item}><span className="svu-internship-feature-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.6} /></span><span>{item}</span></li>;
      })}
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
  // Records remain directly visible in their approved batch-wise, alphabetical order.
  const shown = filterSvuCareerRecords(records, "", "all");
  const Title = embedded ? "h2" : "h1";
  const Sub = embedded ? "h3" : "h2";

  if (placements) {
    const unique = shown.filter((record, index) => shown.findIndex(item => item.student === record.student) === index);
    const photographed = unique.filter(record => svuPlacementPhotos[record.student]);
    const additional = unique.filter(record => !svuPlacementPhotos[record.student]);
    return <div className="svu-career-records svu-career-records--portraits">
      <header className="svu-placement-intro">
        <Title>Placements</Title>
        <p>Meet students from the SVU–Exafluence MS Data Science programme and explore their documented career outcomes.</p>
        <div className="svu-placement-links">
          <Button variant="link" asChild><Link to={`${svuPagePath("overview")}#programmes`}>Explore Programmes <ArrowRight size={16} aria-hidden="true" /></Link></Button>
          <Button variant="link" asChild><Link to={`${svuPagePath("innovations")}#internships`}>View Internships <ArrowRight size={16} aria-hidden="true" /></Link></Button>
        </div>
      </header>
      <ul className="svu-placement-photo-grid" aria-label="Student Placements">
        {photographed.map(record => <li key={record.student} className="svu-outcome svu-placement-photo-card">
          <div className="svu-placement-photo">
            <img src={svuPlacementPhotos[record.student]} alt={`Portrait of ${record.student}`} width={600} height={660} loading="lazy" decoding="async" />
          </div>
          <div className="svu-placement-details">
            <h3>{record.student}</h3>
            {record.designation && <p className="svu-outcome-role">{record.designation}</p>}
            <p className="svu-outcome-org">{record.organisation}</p>
            <p className="svu-outcome-batch"><span className="sr-only">Batch </span>{record.batch}</p>
          </div>
        </li>)}
      </ul>
      {additional.length > 0 && <section className="svu-placement-additional" aria-labelledby="svu-placement-additional-title">
        <Sub id="svu-placement-additional-title">Additional placement records</Sub>
        <ul>{additional.map(record => <li className="svu-outcome svu-placement-text-record" key={record.student}>
          <h3>{record.student}</h3>
          {record.designation && <p className="svu-outcome-role">{record.designation}</p>}
          <p className="svu-outcome-org">{record.organisation}</p>
          <p className="svu-outcome-batch"><span className="sr-only">Batch </span>{record.batch}</p>
        </li>)}</ul>
      </section>}
    </div>;
  }

  return <div className="svu-career-records svu-career-records--upskill">
    <div className="svu-career-title-card">
      <Title>Student Internships</Title>
      <p className="svu-career-subtitle">{svuInternshipIntroduction.subtitle}</p>
      {svuInternshipIntroduction.paragraphs.map(text => <p className="svu-intern-introduction" key={text}>{text}</p>)}
    </div>
    <div className="svu-career-content-card">
      <SvuInternshipUpdate open={studentsOpen} onToggle={() => setStudentsOpen(open => !open)} />
      <ol id="svu-internship-update-list" className="svu-internship-update-names svu-internship-update-names--full" hidden={!studentsOpen}>
        {svuInternshipUpdate.students.map(name => <li key={name}>{name}</li>)}
      </ol>
      <Sub id="internship-records" className="svu-career-records-heading">Internship Records</Sub>
      <ul className="svu-intern-cards" aria-label="Student Internships">{shown.map(record => <li key={record.student} className="svu-intern-card">
        <span className="svu-intern-org"><Building2 size={13} aria-hidden="true" />{record.organisation}</span>
        <h4>{record.student}</h4>
        <p className="svu-intern-meta" data-label="Batch"><CalendarRange size={14} aria-hidden="true" /><span className="sr-only">Batch </span>{record.batch}</p>
      </li>)}</ul>
    </div>
  </div>;
}
