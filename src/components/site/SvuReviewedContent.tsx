import { FacultyDirectory } from "./FacultyDirectory";
import ResearchThemeIcon from "./ResearchThemeIcon";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, BrainCircuit, BriefcaseBusiness, FlaskConical, Search, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { svuProjects, svuPublications, svuResearchMetrics, svuConferencePapers, svuFaculty, svuSupport, svuBrochureReview } from "@/data/svuReviewed";
import { svuProjectAreas, svuOverviewAchievements } from "@/data/svuOverview";
import { svuSectionPath } from "@/lib/programmeNavigation";

export const SvuOverviewContent = () => <div className="svu-overview-content">
  <section className="svu-overview-band"><h2><BookOpen size={23} strokeWidth={1.4} aria-hidden="true" />Industry-Integrated Teaching Approach</h2>
    <p>Faculty and industry professionals connect core concepts with their practical applications. Programming exercises, case studies and technical discussions help students understand how to work with data, select suitable methods and interpret results.</p>
    <p>The approach encourages structured problem-solving, helping learners explain both how a solution works and why a particular approach was chosen.</p>
  </section>
  <section className="svu-overview-band"><h2><BrainCircuit size={23} strokeWidth={1.4} aria-hidden="true" />AI, Gen AI &amp; <span className="svu-nowrap">Data Science</span></h2>
    <p>Student projects explore challenges across data engineering, business analytics and intelligent application development.</p>
    <div className="svu-overview-areas">{svuProjectAreas.map(area => <Button variant="ghost" asChild key={area.title}><Link to={`#svu-project-${area.projectIndex + 1}`} className="svu-overview-area"><span className={`programme-section-icon tone-${area.tone}`}><area.icon size={23} strokeWidth={1.4} aria-hidden="true" /></span><span><strong>{area.title}</strong><span>{area.text}</span></span><ArrowRight size={17} aria-hidden="true" /></Link></Button>)}</div>
    <Button variant="link" asChild><Link to="#svu-student-projects">Explore Student Projects<ArrowRight size={16} /></Link></Button>
  </section>
  <section className="svu-overview-band"><h2><FlaskConical size={23} strokeWidth={1.4} aria-hidden="true" />Research and Technical Exploration</h2>
    <p>Research activities give students opportunities to investigate technical questions, review existing approaches and communicate their findings through papers and conference presentations.</p>
    <p>Topics represented in student work include explainable AI, retrieval-based systems, multimodal applications, reinforcement learning and quantum machine learning.</p>
    <Button variant="link" asChild><Link to="#projects-research">Explore Projects &amp; Research<ArrowRight size={16} /></Link></Button>
  </section>
  <section className="svu-overview-band" id="achievements"><h2><Trophy size={23} strokeWidth={1.4} aria-hidden="true" />Student Innovation and Achievements</h2>
    <p>Innovation showcases, hackathons and technology events provide opportunities for students to present their work and engage with wider academic and industry communities.</p>
    <div className="svu-overview-achievements">{svuOverviewAchievements.map(item => <article className="svu-overview-story" key={item.title}>
      <figure className="svu-overview-story-media"><img src={item.photo} alt={item.alt} loading="lazy" /></figure>
      <div className="svu-overview-story-text"><h3>{item.title}</h3>{item.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
    </article>)}</div>
  </section>

  <section className="svu-overview-band"><h2><BriefcaseBusiness size={23} strokeWidth={1.4} aria-hidden="true" />Industry Exposure and Career Development</h2>
    <p>Industry case studies, mentor guidance and internship exposure connect technical study with professional practice. Project work and presentations help students build portfolios and communicate their skills.</p>
    <p>Explore the dedicated sections for internship information, placement support and documented student selections.</p>
    <div className="svu-overview-links"><Button variant="outline" asChild><Link to="#internships">Explore Internships<ArrowRight size={16} /></Link></Button><Button variant="outline" asChild><Link to="#placements">View Placements<ArrowRight size={16} /></Link></Button></div>
  </section>
</div>;

export const SvuResearchContent = () => {
  const [query, setQuery] = useState("");
  const shown = svuProjects.filter(p => `${p.student} ${p.title}`.toLowerCase().includes(query.toLowerCase().trim()));
  return <div className="svu-research">
    <dl className="svu-research-metrics">{svuResearchMetrics.map(item => <div key={item.label}><dd>{item.value}</dd><dt>{item.label}<span>{item.context}</span></dt></div>)}</dl>
    <section className="organisation-subsection" id="svu-student-projects"><h3>Student Projects</h3><label className="svu-project-search"><span className="svu-search-tile" aria-hidden="true"><Search size={16} /></span><Input aria-label="Search student projects" placeholder="Search projects or student names" value={query} onChange={e => setQuery(e.target.value)} /></label><p className="svu-result-count">{shown.length} of {svuProjects.length} projects</p><div className="svu-project-list">{shown.map((item) => <article id={`svu-project-${svuProjects.indexOf(item) + 1}`} key={`${item.student}-${item.title}`}><ResearchThemeIcon title={item.title} /><div><h4>{item.title}</h4><p>{item.student}</p></div></article>)}</div>{shown.length === 0 && <p role="status">No matching projects.</p>}</section>
    <section className="organisation-subsection"><h3>International Conference Presentations</h3><div className="svu-project-list">{svuConferencePapers.map(item => <article key={item.student}><ResearchThemeIcon title={item.title} /><div><span className="programme-org">{item.conference}</span><h4>{item.title}</h4><p>{item.student}</p></div></article>)}</div></section>
    <section className="organisation-subsection"><h3>Accepted Research Papers</h3><p className="svu-result-count">MSDS students · Batch 2023–2025</p><div className="svu-publications">{svuPublications.map(item => <a href={item.href} key={item.href} target="_blank" rel="noopener noreferrer"><ResearchThemeIcon title={item.title} /><span>{item.title}</span><ArrowUpRight size={17} aria-hidden="true" /></a>)}</div></section>
  </div>;
};

export const SvuAcademicResources = () => <div className="svu-academic-resources">
  <p>Industry-integrated teaching aligned with NEP 2020 connects AI, ML and Generative AI concepts with projects, case studies and real-world applications.</p>
  <div className="svu-faculty-callout">
    <p>Meet the {svuFaculty.length} faculty and industry mentors and {svuSupport.length} technical mentors who guide this programme.</p>
    <Link className="svu-directory-link" to={svuSectionPath("faculty")}>View Faculty &amp; Mentors<ArrowRight size={15} aria-hidden="true" /></Link>
  </div>
</div>;

export const SvuFacultyPage = () => <>
  <FacultyDirectory page cols={4} title="Faculty & Industry Mentors" intro="Faculty and Exafluence industry professionals who teach and mentor across AI, machine learning, data engineering and cloud." people={svuFaculty} />
  <FacultyDirectory page cols={3} title="Technical Mentors & Lab Faculty" intro="Mentors who guide lab exercises, student projects and hands-on implementation." people={svuSupport} />
</>;