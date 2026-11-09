import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight, BadgeCheck, BrainCircuit, Briefcase, Building2, CalendarRange, Cpu, GraduationCap, UserRound, UsersRound, CalendarDays, Layers, Monitor } from "lucide-react";
import { svuPagePath } from "@/lib/programmeNavigation";
import { filterSvuCareerRecords, svuInternshipIntroduction, svuInternshipUpdate, svuInternships, svuPlacements, type SvuCareerRecord } from "@/data/svuCareer";
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

/** Placement cards carry an icon matched to the role itself (client, 4 November 2026): research
 * and analytics roles read as a neural circuit, engineering roles as a processor, plain trainee
 * roles as a graduation cap, and anything else as a case. Checked in this order so a compound
 * title such as "Data Scientist – Trainee" keeps the icon of the role it is trained for. */
const designationIcon = (designation = "") => {
  const role = designation.toLowerCase();
  if (role.includes("data scientist")) return <BrainCircuit size={16} aria-hidden="true" />;
  if (role.includes("engineer")) return <Cpu size={16} aria-hidden="true" />;
  if (role.includes("trainee")) return <GraduationCap size={16} aria-hidden="true" />;
  return <Briefcase size={16} aria-hidden="true" />;
};

/** Each designation family carries its own colour (client, 4 November 2026): analytics roles in
 * violet, engineering roles in teal, plain trainee roles in amber and anything else in the
 * site's connection blue. Checked in the same order as the icons above. */
const designationTone = (designation = "") => {
  const role = designation.toLowerCase();
  if (role.includes("data scientist")) return "data";
  if (role.includes("engineer")) return "engineer";
  if (role.includes("trainee")) return "trainee";
  return "other";
};

/** Jobaaj Hall of Fame reference, adapted 9 November 2026 with original Exafluence wording.
 * The portrait display and organisation strip use only the approved records and supplied portraits;
 * no numerical student total, testimonials, salary figures, hiring totals or podcast links are added. */
const SvuPlacementHero = ({ records, Title }: { records: SvuCareerRecord[]; Title: "h1" | "h2" }) => {
  const organisations = [...new Set(records.map(record => record.organisation))];
  return <>
    <section className="svu-hof-hero" aria-labelledby="svu-hof-title">
      <div className="svu-hof-copy">
        <p className="svu-hof-kicker"><span>SVU Hall of Fame</span><span>Real roles. Documented outcomes.</span></p>
        <Title id="svu-hof-title"><span>From learning to</span><span className="svu-hof-accent">career momentum.</span></Title>
        <p className="svu-hof-lead">Meet students from the SVU–Exafluence MS Data Science programme who have moved into data science, AI engineering and trainee roles. Every profile brings together their designation, organisation and academic batch.</p>
        <div className="svu-hof-actions">
          <Link to={`${svuPagePath("overview")}#programmes`} className="svu-hof-primary">Explore Programmes <ArrowRight size={16} aria-hidden="true" /></Link>
          <Link to={`${svuPagePath("innovations")}#internships`} className="svu-hof-secondary">View Internships</Link>
        </div>
        <dl className="svu-hof-facts">
          <div><dt>Programme</dt><dd>MS Data Science</dd></div>
          <div><dt>Role families</dt><dd>Data Science &amp; AI</dd></div>
          <div><dt>Academic batches</dt><dd>2023–2026</dd></div>
        </dl>
      </div>
      <div className="svu-hof-collage" role="group" aria-label="Placed students">
        <p className="svu-hof-status"><BadgeCheck size={22} aria-hidden="true" /><span><strong>Placed</strong><small>SVU–Exafluence outcomes</small></span></p>
        {records.map(record => {
          const photo = svuPlacementPhotos[record.student];
          return <article className="svu-hof-mini" key={record.student}>
            {photo
              ? <img src={photo} alt="" loading="eager" decoding="async" />
              : <span className="svu-hof-mini-fallback" role="img" aria-label={`Photograph not supplied for ${record.student}`}><UserRound size={30} aria-hidden="true" /></span>}
            <div><strong>{record.student}</strong><span>{record.designation}</span></div>
          </article>;
        })}
      </div>
    </section>
    <section className="svu-hof-organisations" aria-label="Organisations in the placement records">
      <p>Organisations connected to these outcomes</p>
      <ul>{organisations.map(organisation => <li key={organisation}><Building2 size={19} aria-hidden="true" /><span>{organisation}</span></li>)}</ul>
    </section>
  </>;
};

export default function SvuCareerRecords({ kind, embedded = false }: { kind: "placements" | "internships"; embedded?: boolean }) {
  const [studentsOpen, setStudentsOpen] = useState(false);
  const placements = kind === "placements";
  const records = placements ? svuPlacements : svuInternships;
  // Records remain directly visible in their approved batch-wise, alphabetical order.
  const shown = filterSvuCareerRecords(records, "", "all");
  const Title = embedded ? "h2" : "h1";
  const Sub = embedded ? "h3" : "h2";

  if (placements) return <div className="svu-career-records svu-career-records--hof">
    <SvuPlacementHero records={shown} Title={Title} />
    <section className="svu-hof-wall" aria-labelledby="svu-hof-wall-title">
      <p className="svu-hof-wall-eyebrow">The wall</p>
      <Sub id="svu-hof-wall-title" className="svu-career-records-heading">Meet the SVU achievers</Sub>
      <p className="svu-hof-wall-intro">Explore the documented placement records, with each student’s role, organisation and academic batch presented in one compact profile.</p>
      <ul className="svu-pl-cards" aria-label="Student Placements">{shown.map(record => {
        const photo = svuPlacementPhotos[record.student];
        return <li key={record.student} className="svu-outcome svu-pl-card">
          <div className="svu-pl-head">
            <div className="svu-pl-portrait">
              {photo
                ? <img src={photo} alt={`Portrait of ${record.student}`} loading="lazy" decoding="async" />
                : <span className="svu-pl-avatar" role="img" aria-label={`Photograph not supplied for ${record.student}`}><UserRound size={32} aria-hidden="true" /></span>}
            </div>
            <div className="svu-pl-profile">
              <div className="svu-pl-person"><h3>{record.student}</h3></div>
              <p className="svu-outcome-role" data-tone={designationTone(record.designation)}>{designationIcon(record.designation)}<span>{record.designation}</span></p>
            </div>
          </div>
          <p className="svu-outcome-org"><Building2 size={17} aria-hidden="true" /><span>{record.organisation}</span></p>
          <div className="svu-pl-foot">
            <p className="svu-outcome-batch"><span className="sr-only">Batch </span>{record.batch}</p>
          </div>
        </li>;
      })}</ul>
    </section>
  </div>;

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
