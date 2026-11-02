import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { organisations, programmes } from "@/data/site";
import { svuOverview, svuProjectAreas, svuOverviewAchievements } from "@/data/svuOverview";
import { svuAchievements, svuConferencePapers, svuProjects, svuPublications } from "@/data/svuReviewed";
import { programmePath, svuSectionPath, type SvuSectionId } from "@/lib/programmeNavigation";
import { useProgrammeSeo } from "./ProgrammeDirectory";
import SvuCareerRecords from "./SvuCareerRecords";

const tabs: { id: SvuSectionId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "programmes", label: "Programmes" },
  { id: "projects-research", label: "Projects & Research" },
  { id: "internships", label: "Internships" },
  { id: "placements", label: "Placements" },
];

const seo: Record<SvuSectionId, [string, string]> = {
  overview: [svuOverview.seoTitle, svuOverview.seoDescription],
  programmes: ["SVU Programmes | Exafluence Education", "Data science, AI and Gen AI programmes offered through Sri Venkateswara University and Exafluence."],
  "projects-research": ["SVU Projects & Research | Exafluence Education", "Student projects, conference presentations and research papers from SVU–Exafluence data science students."],
  internships: ["SVU Student Internships | Exafluence Education", "Documented internship records of SVU–Exafluence MS Data Science students."],
  placements: ["SVU Student Placements | Exafluence Education", "Documented placement records of SVU–Exafluence MS Data Science students."],
};

export const PROJECTS_PER_PAGE = 6;

const SvuOverview = () => {
  const org = organisations.SVU;
  const hackathon = svuAchievements[0];
  return <div className="svu-flow">
    <section className="svu-block svu-intro">
      <img className={`programme-detail-logo ${org.logoClass}`} src={org.logo} alt={`${org.name} logo`} />
      <h1>{svuOverview.title}</h1>
      <p className="svu-lead">{svuOverview.introduction}</p>
      <Button variant="link" asChild><Link to={svuSectionPath("programmes")}>Explore Programmes<ArrowRight size={16} /></Link></Button>
    </section>

    <section className="svu-block">
      <h2>Industry-Integrated Teaching Approach</h2>
      <p className="svu-reading">Faculty and industry professionals connect core concepts with their practical applications, so learners can explain both how a solution works and why a particular approach was chosen.</p>
      <ol className="svu-steps">
        <li><strong>Understand</strong><span>Core concepts in data, methods and results, guided by faculty and industry professionals.</span></li>
        <li><strong>Apply</strong><span>Programming exercises, case studies and technical discussions.</span></li>
        <li><strong>Present</strong><span>Explain how a solution works and why the approach was chosen.</span></li>
      </ol>
    </section>

    <section className="svu-block svu-split">
      <div className="svu-split-lead">
        <h2>Applied AI and Data Science</h2>
        <p className="svu-reading">Student projects explore challenges across data engineering, business analytics and intelligent application development.</p>
        <Button variant="link" asChild><Link to={svuSectionPath("projects-research")}>Explore Student Projects<ArrowRight size={16} /></Link></Button>
      </div>
      <div className="svu-areas">{svuProjectAreas.map(area => <Link key={area.title} to={`${svuSectionPath("projects-research")}#svu-project-${area.projectIndex + 1}`} className="svu-area">
        <span className={`programme-section-icon tone-${area.tone}`}><area.icon size={22} strokeWidth={1.4} aria-hidden="true" /></span>
        <span><strong>{area.title}</strong><span>{area.text}</span></span>
      </Link>)}</div>
    </section>

    <section className="svu-block svu-split">
      <div className="svu-split-lead"><h2>Research and Technical Exploration</h2></div>
      <div className="svu-split-body">
      <p className="svu-reading">Students investigate technical questions and communicate their findings through papers and conference presentations, on topics including explainable AI, retrieval-based systems, multimodal applications, reinforcement learning and quantum machine learning.</p>
      <Button variant="link" asChild><Link to={svuSectionPath("projects-research")}>Explore Projects &amp; Research<ArrowRight size={16} /></Link></Button>
      </div>
    </section>

    <section className="svu-block" id="achievements">
      <h2>Student Innovation and Achievements</h2>
      <div className="svu-stories">{svuOverviewAchievements.map(item => <article className="svu-story" key={item.title}>
        <figure><img src={item.photo} alt={item.alt} loading="lazy" />{item.caption && <figcaption>{item.caption}</figcaption>}</figure>
        <div><h3>{item.title}</h3><p>{item.text}</p></div>
      </article>)}</div>
      <p className="svu-highlight"><Trophy size={18} aria-hidden="true" /><span><strong>{hackathon.title}</strong> — {hackathon.text} <a href={hackathon.href} target="_blank" rel="noopener noreferrer">{hackathon.label}<ArrowUpRight size={14} aria-hidden="true" /></a></span></p>
    </section>

    <section className="svu-block">
      <h2>Industry Exposure and Career Development</h2>
      <p className="svu-reading">Industry case studies, mentor guidance and internship exposure connect technical study with professional practice.</p>
      <div className="svu-actions"><Button variant="outline" asChild><Link to={svuSectionPath("internships")}>Explore Internships<ArrowRight size={16} /></Link></Button><Button variant="outline" asChild><Link to={svuSectionPath("placements")}>View Placements<ArrowRight size={16} /></Link></Button><Button asChild><Link to="/contact">Enquire Now<ArrowRight size={16} /></Link></Button></div>
    </section>
  </div>;
};

const SvuProgrammes = () => {
  const shown = programmes.filter(p => p.organisation === "SVU");
  return <div className="svu-flow">
    <section className="svu-block svu-intro">
      <h1>SVU Programmes</h1>
      <p className="svu-lead">Programmes offered through Sri Venkateswara University in collaboration with Exafluence Education. Each programme opens its own detail page.</p>
    </section>
    <div className="svu-directory" role="table" aria-label="SVU programmes">
      <div role="row" className="svu-directory-head"><span role="columnheader">Programme</span><span role="columnheader">Duration</span><span role="columnheader">Delivery</span><span role="columnheader"><span className="sr-only">Link</span></span></div>
      {shown.map(p => <div role="row" key={p.slug} className="svu-directory-row">
        <span role="cell" className="svu-directory-name"><Link to={programmePath(p)}>{p.title}</Link><small>{p.level}</small></span>
        <span role="cell" data-label="Duration">{p.duration}</span>
        <span role="cell" data-label="Delivery">{p.delivery}</span>
        <span role="cell"><Link className="svu-directory-link" to={programmePath(p)}>View Programme<ArrowRight size={15} aria-hidden="true" /></Link></span>
      </div>)}
    </div>
  </div>;
};

const SvuResearch = () => {
  const { hash } = useLocation();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState("projects");
  const shown = useMemo(() => svuProjects.filter(p => `${p.student} ${p.title}`.toLowerCase().includes(query.toLowerCase().trim())), [query]);
  const pages = Math.max(1, Math.ceil(shown.length / PROJECTS_PER_PAGE));
  const current = Math.min(page, pages);
  const visible = shown.slice((current - 1) * PROJECTS_PER_PAGE, current * PROJECTS_PER_PAGE);

  // Overview links target a specific project: open the page that holds it.
  useEffect(() => {
    const match = hash.match(/^#svu-project-(\d+)$/);
    if (!match) return;
    const index = Number(match[1]) - 1;
    setTab("projects"); setQuery("");
    setPage(Math.floor(index / PROJECTS_PER_PAGE) + 1);
    window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: "center" }), 60);
  }, [hash]);

  return <div className="svu-flow">
    <section className="svu-block svu-intro">
      <h1>Projects &amp; Research</h1>
      <p className="svu-lead">Real-time projects, industry mentoring, case studies and a final-semester capstone connect learning with business challenges. Student work is also presented at conferences and in research papers.</p>
    </section>
    <Tabs value={tab} onValueChange={setTab} className="svu-research-tabs">
      <TabsList><TabsTrigger value="projects">Student Projects</TabsTrigger><TabsTrigger value="conferences">Conference Presentations</TabsTrigger><TabsTrigger value="papers">Research Papers</TabsTrigger></TabsList>
      <TabsContent value="projects">
        <label className="svu-project-search"><Search size={18} aria-hidden="true" /><Input aria-label="Search student projects" placeholder="Search projects or student names" value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} /></label>
        <p className="svu-result-count" role="status">{shown.length} of {svuProjects.length} projects</p>
        <div className="svu-project-list">{visible.map(item => { const n = svuProjects.indexOf(item) + 1; return <article id={`svu-project-${n}`} key={`${item.student}-${item.title}`} className={hash === `#svu-project-${n}` ? "is-target" : undefined}><span className="svu-project-number">{String(n).padStart(2, "0")}</span><div><h3>{item.title}</h3><p>{item.student}</p></div></article>; })}</div>
        {shown.length === 0 && <p role="status">No matching projects.</p>}
        {pages > 1 && <nav className="svu-pagination" aria-label="Project pages">
          <Button variant="outline" size="sm" disabled={current === 1} onClick={() => setPage(current - 1)}>Previous</Button>
          <span>Page {current} of {pages}</span>
          <Button variant="outline" size="sm" disabled={current === pages} onClick={() => setPage(current + 1)}>Next</Button>
        </nav>}
      </TabsContent>
      <TabsContent value="conferences"><div className="svu-project-list">{svuConferencePapers.map(item => <article key={item.student}><div><span className="programme-org">{item.conference}</span><h3>{item.title}</h3><p>{item.student}</p></div></article>)}</div></TabsContent>
      <TabsContent value="papers"><p className="svu-result-count">MSDS students · Batch 2023–2025</p><div className="svu-publications">{svuPublications.map(item => <a href={item.href} key={item.href} target="_blank" rel="noopener noreferrer"><span>{item.title}</span><ArrowUpRight size={17} aria-hidden="true" /></a>)}</div></TabsContent>
    </Tabs>
  </div>;
};

const SvuPages = ({ section }: { section: SvuSectionId }) => {
  useProgrammeSeo(...seo[section]);
  const { hash } = useLocation();
  useEffect(() => { if (!hash) window.scrollTo(0, 0); }, [section, hash]);
  return <main className="programme-experience svu-pages">
    <div className="svu-container">
      <nav aria-label="Breadcrumb" className="svu-breadcrumb"><Link to="/collaboration-network"><ArrowLeft size={15} aria-hidden="true" />Back to Our Collaboration Network</Link></nav>
    </div>
    <nav aria-label="Sri Venkateswara University sections" className="svu-tabbar"><div className="svu-container svu-tabbar-inner">
      {tabs.map(t => <NavLink key={t.id} end to={svuSectionPath(t.id)} className={({ isActive }) => isActive ? "is-active" : undefined}>{t.label}</NavLink>)}
    </div></nav>
    <div className="svu-container svu-body">
      {section === "overview" && <SvuOverview />}
      {section === "programmes" && <SvuProgrammes />}
      {section === "projects-research" && <SvuResearch />}
      {(section === "internships" || section === "placements") && <SvuCareerRecords kind={section} />}
    </div>
  </main>;
};
export default SvuPages;
