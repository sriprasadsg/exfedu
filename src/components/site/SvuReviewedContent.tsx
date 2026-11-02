import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { svuAchievements, svuEvents, svuGallery, svuProjects, svuPublications, svuResearchMetrics, svuConferencePapers, svuFaculty, svuSupport, svuBrochureReview } from "@/data/svuReviewed";

export const SvuOverviewContent = () => <>
  <section className="organisation-subsection" id="achievements"><h3>Student Achievements</h3><div className="svu-content-grid">{svuAchievements.map(item => <article className="svu-content-card" key={item.title}><h4>{item.title}</h4><p>{item.text}</p>{item.href && <a href={item.href} target="_blank" rel="noopener noreferrer">{item.label}<ArrowUpRight size={15} /></a>}</article>)}</div></section>
  <section className="organisation-subsection" id="events"><h3>Events</h3><div className="svu-content-grid">{svuEvents.map(item => <article className="svu-content-card" key={item.title}><h4>{item.title}</h4><p>{item.text}</p></article>)}</div></section>
  <section className="organisation-subsection" id="gallery"><h3>Gallery</h3><div className="svu-gallery">{svuGallery.map(item => <figure key={item.src}><img src={item.src} alt={item.caption} loading="lazy" /><figcaption>{item.caption}</figcaption></figure>)}</div></section>
</>;

export const SvuResearchContent = () => {
  const [query, setQuery] = useState("");
  const shown = svuProjects.filter(p => `${p.student} ${p.title}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <div className="svu-research">
    <dl className="svu-research-metrics">{svuResearchMetrics.map(item => <div key={item.label}><dd>{item.value}</dd><dt>{item.label}<span>{item.context}</span></dt></div>)}</dl>
    <section className="organisation-subsection"><h3>Student Projects</h3><label className="svu-project-search"><Search size={18} aria-hidden="true" /><Input aria-label="Search student projects" placeholder="Search projects or student names" value={query} onChange={e => setQuery(e.target.value)} /></label><p className="svu-result-count">{shown.length} of {svuProjects.length} projects</p><div className="svu-project-list">{shown.map((item, i) => <article key={`${item.student}-${item.title}`}><span className="svu-project-number">{String(i + 1).padStart(2, "0")}</span><div><h4>{item.title}</h4><p>{item.student}</p></div></article>)}</div>{shown.length === 0 && <p role="status">No matching projects.</p>}</section>
    <section className="organisation-subsection"><h3>International Conference Presentations</h3><div className="svu-project-list">{svuConferencePapers.map(item => <article key={item.student}><div><span className="programme-org">{item.conference}</span><h4>{item.title}</h4><p>{item.student}</p></div></article>)}</div></section>
    <section className="organisation-subsection"><h3>Accepted Research Papers</h3><p className="svu-result-count">MSDS students · Batch 2023–2025</p><div className="svu-publications">{svuPublications.map(item => <a href={item.href} key={item.href} target="_blank" rel="noopener noreferrer"><span>{item.title}</span><ArrowUpRight size={17} aria-hidden="true" /></a>)}</div></section>
  </div>;
};

export const SvuAcademicResources = () => <div className="svu-academic-resources">
  <h3>Academic Resources</h3><p>Industry-integrated teaching aligned with NEP 2020 connects AI, ML and Generative AI concepts with projects, case studies and real-world applications.</p>
  <h4>Faculty &amp; Industry Mentors</h4><div className="svu-faculty-grid">{svuFaculty.map(item => <article key={item.name}><h5>{item.name}</h5><span className="programme-org">{item.role}</span><p>{item.expertise}</p></article>)}</div>
  <h4>Programme Support · EdTech Division</h4><div className="svu-faculty-grid">{svuSupport.map(item => <article key={item.name}><h5>{item.name}</h5><p>{item.expertise}</p></article>)}</div>
  <p className="programme-review-note">The uploaded Academic Resources document contains faculty and support profiles, not a syllabus, scheme or academic calendar. Those programme-specific files remain required for review.</p>
  <p className="organisation-section-pending"><span>Brochure Review Required</span>{svuBrochureReview}</p>
</div>;