import ResearchThemeIcon from "./ResearchThemeIcon";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, ArrowUpRight, BookOpen, Code2, Presentation, Search, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { organisations, programmes } from "@/data/site";
import { svuOverview, svuProjectAreas, svuOverviewAchievements } from "@/data/svuOverview";
import SvuTechTicker from "./SvuTechTicker";
import { svuAchievements, svuConferencePapers, svuProjects, svuPublications } from "@/data/svuReviewed";
import { programmePath, svuPagePath, svuSectionPath, type SvuPageId } from "@/lib/programmeNavigation";
import { SvuFacultyPage } from "./SvuReviewedContent";
import { useProgrammeSeo } from "./ProgrammeDirectory";
import SvuCareerRecords from "./SvuCareerRecords";
import NetworkBackButton from "./NetworkBackButton";

const tabs: { id: SvuPageId; label: string }[] = [
  { id: "overview", label: "Overview & Programmes" },
  { id: "outcomes", label: "Research & Careers" },
  { id: "faculty", label: "Faculty & Mentors" },
];

const seo: Record<SvuPageId, [string, string]> = {
  overview: [svuOverview.seoTitle, svuOverview.seoDescription],
  outcomes: ["SVU Research & Careers | Exafluence Education", "Student projects, research papers, achievements, internships and placements of SVU–Exafluence data science students."],
  faculty: ["SVU Faculty & Mentors | Exafluence Education", "SVU faculty, Exafluence industry mentors and technical lab faculty guiding the SVU–Exafluence programmes."],
};

export const PROJECTS_PER_PAGE = 6;

const svuTeachingSteps = [
  { title: "Understand", text: "Core concepts in data, methods and results, guided by faculty and industry professionals.", icon: BookOpen, tone: "blue" },
  { title: "Apply", text: "Programming exercises, case studies and technical discussions.", icon: Code2, tone: "teal" },
  { title: "Present", text: "Explain how a solution works and why the approach was chosen.", icon: Presentation, tone: "violet" },
];

const SvuOverview = () => {
  const org = organisations.SVU;
  return <div className="svu-flow">
    <section className="svu-block svu-intro">
      <img className={`programme-detail-logo ${org.logoClass}`} src={org.logo} alt={`${org.name} logo`} />
      <h1>{svuOverview.title}</h1>
      <p className="svu-lead">{svuOverview.introduction}</p>
      <Button variant="link" asChild><a href="#programmes">Explore Programmes<ArrowRight size={16} /></a></Button>
    </section>

    <section className="svu-block">
      <h2>Industry-Integrated Teaching Approach</h2>
      <p className="svu-reading">Faculty and industry professionals connect core concepts with their practical applications, so learners can explain both how a solution works and why a particular approach was chosen.</p>
      <ol className="svu-steps">
        {svuTeachingSteps.map((step, index) => <li key={step.title} className={`svu-step svu-step--${step.tone}`} style={{ "--step-delay": `${index * 0.12}s` } as CSSProperties}>
          <span className="svu-step-topline" aria-hidden="true" />
          <span className="svu-step-head">
            <span className="svu-step-icon"><step.icon size={23} strokeWidth={1.5} aria-hidden="true" /></span>
          </span>
          <strong>{step.title}</strong>
          <span className="svu-step-text">{step.text}</span>
        </li>)}
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

    <SvuProgrammes embedded />

    <SvuTechTicker />

    <section className="svu-block svu-split">
      <div className="svu-split-lead"><h2>Research and Technical Exploration</h2></div>
      <div className="svu-split-body">
      <p className="svu-reading">Students investigate technical questions and communicate their findings through papers and conference presentations, on topics including explainable AI, retrieval-based systems, multimodal applications, reinforcement learning and quantum machine learning.</p>
      <Button variant="link" asChild><Link to={svuSectionPath("projects-research")}>Explore Projects &amp; Research<ArrowRight size={16} /></Link></Button>
      </div>
    </section>

    <section className="svu-block">
      <h2>Industry Exposure and Career Development</h2>
      <p className="svu-reading">Industry case studies, mentor guidance and internship exposure connect technical study with professional practice.</p>
      <div className="svu-actions"><Button variant="outline" asChild><Link to={svuSectionPath("internships")}>Explore Internships<ArrowRight size={16} /></Link></Button><Button variant="outline" asChild><Link to={svuSectionPath("placements")}>View Placements<ArrowRight size={16} /></Link></Button><Button asChild className="cta-enquire"><Link to="/contact">Enquire Now<ArrowRight size={16} /></Link></Button></div>
    </section>
  </div>;
};

const svuCategories = [
  { title: "Master’s Programme", levels: ["Master's"] },
  { title: "Postgraduate Diploma", levels: ["PG Diploma"] },
  { title: "Short-Term Diplomas", levels: ["Diploma"] },
];

const SvuProgrammes = ({ embedded = false }: { embedded?: boolean }) => {
  const shown = programmes.filter(p => p.organisation === "SVU");
  const Title = embedded ? "h2" : "h1";
  const Group = embedded ? "h3" : "h2";
  return <div className="svu-flow" id={embedded ? "programmes" : undefined}>
    <section className="svu-block svu-intro">
      <Title>Industry-Integrated Programmes</Title>
      <p className="svu-lead">Explore programmes offered through the collaboration between Exafluence Inc., USA, and Sri Venkateswara University. Compare study duration and delivery options, then view each programme’s eligibility, curriculum and admission process.</p>
    </section>
    <div className="svu-directory-groups">{svuCategories.map(cat => {
      const rows = shown.filter(p => cat.levels.includes(p.level));
      if (!rows.length) return null;
      return <section key={cat.title} className="svu-directory-group" aria-label={cat.title}>
        <Group>{cat.title}</Group>
        <div className="svu-directory" role="table" aria-label={cat.title}>
          <div role="row" className="svu-directory-head"><span role="columnheader">Programme Name</span><span role="columnheader">Duration</span><span role="columnheader">Delivery</span><span role="columnheader"><span className="sr-only">View Programme</span></span></div>
          {rows.map(p => <div role="row" key={p.slug} className="svu-directory-row">
            <span role="cell" className="svu-directory-name"><Link to={programmePath(p)}>{p.title}</Link></span>
            <span role="cell" data-label="Duration">{p.duration}</span>
            <span role="cell" data-label="Delivery">{p.delivery}</span>
            <span role="cell"><Link className="svu-directory-link" to={programmePath(p)} aria-label={`View Programme: ${p.title}`}>View Programme<ArrowRight size={15} aria-hidden="true" /></Link></span>
          </div>)}
        </div>
      </section>;
    })}</div>
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

  return <div className="svu-flow" id="projects">
    <section className="svu-block svu-intro">
      <h1>Projects &amp; Research</h1>
      <p className="svu-lead">Real-time projects, industry mentoring, case studies and a final-semester capstone connect learning with business challenges. Student work is also presented at conferences and in research papers.</p>
    </section>
    <Tabs value={tab} onValueChange={setTab} className="svu-research-tabs">
      <TabsList><TabsTrigger value="projects">Student Projects</TabsTrigger><TabsTrigger value="conferences">Conference Presentations</TabsTrigger><TabsTrigger value="papers">Research Papers</TabsTrigger></TabsList>
      <TabsContent value="projects">
        <label className="svu-project-search"><span className="svu-search-tile" aria-hidden="true"><Search size={16} /></span><Input aria-label="Search student projects" placeholder="Search projects or student names" value={query} onChange={e => { setQuery(e.target.value); setPage(1); }} /></label>
        <p className="svu-result-count" role="status">{shown.length} of {svuProjects.length} projects</p>
        <div className="svu-project-list">{visible.map(item => { const n = svuProjects.indexOf(item) + 1; return <article id={`svu-project-${n}`} key={`${item.student}-${item.title}`} className={hash === `#svu-project-${n}` ? "is-target" : undefined}><span className="svu-project-number">{String(n).padStart(2, "0")}</span><ResearchThemeIcon title={item.title} /><div><h3>{item.title}</h3><p>{item.student}</p></div></article>; })}</div>
        {shown.length === 0 && <p role="status">No matching projects.</p>}
        {pages > 1 && <nav className="svu-pagination" aria-label="Project pages">
          <Button variant="outline" size="sm" disabled={current === 1} onClick={() => setPage(current - 1)}>Previous</Button>
          <span>Page {current} of {pages}</span>
          <Button variant="outline" size="sm" disabled={current === pages} onClick={() => setPage(current + 1)}>Next</Button>
        </nav>}
      </TabsContent>
      <TabsContent value="conferences"><div className="svu-project-list">{svuConferencePapers.map(item => <article key={item.student}><ResearchThemeIcon title={item.title} /><div><span className="programme-org">{item.conference}</span><h3>{item.title}</h3><p>{item.student}</p></div></article>)}</div></TabsContent>
      <TabsContent value="papers"><p className="svu-result-count">MSDS students · Batch 2023–2025</p><div className="svu-publications">{svuPublications.map(item => <a href={item.href} key={item.href} target="_blank" rel="noopener noreferrer"><ResearchThemeIcon title={item.title} /><span>{item.title}</span><ArrowUpRight size={17} aria-hidden="true" /></a>)}</div></TabsContent>
    </Tabs>
  </div>;
};

const SvuAchievements = () => {
  const hackathon = svuAchievements[0];
  const [hackBefore, hackAfter = ""] = hackathon.text.split(hackathon.highlight);
  return <div className="svu-flow">
    <section className="svu-block" id="achievements">
      <h2>Student Innovation and Achievements</h2>
      <div className="svu-stories">{svuOverviewAchievements.map(item => <article className="svu-story" key={item.title}>
        <figure><img src={item.photo} alt={item.alt} loading="lazy" /><span className="svu-story-badge"><Trophy size={13} aria-hidden="true" />Achievement</span></figure>
        <div className="svu-story-body"><div className="svu-story-head"><ResearchThemeIcon title={item.title} /><h3>{item.title}</h3></div><p>{item.text}</p>{item.caption && <p className="svu-story-caption">{item.caption}</p>}</div>
      </article>)}</div>
      <aside className="svu-champion">
        <span className="svu-champion-medal" aria-hidden="true"><Trophy size={26} strokeWidth={1.4} /></span>
        <div className="svu-champion-body">
          <span className="svu-champion-eyebrow">Featured Achievement</span>
          <h3 className="svu-champion-title">{hackathon.title}</h3>
          <p className="svu-champion-line">{hackBefore}<strong className="svu-champion-bold">{hackathon.highlight}</strong>{hackAfter.replace("FTSE 100", "FTSE\u00A0100")}</p>
          <a className="svu-champion-link" href={hackathon.href} target="_blank" rel="noopener noreferrer">{hackathon.label}<ArrowUpRight size={14} aria-hidden="true" /></a>
        </div>

      </aside>

    </section>

  </div>;
};

const SvuOutcomes = () => <>
  <SvuResearch />
  <SvuAchievements />
  <section id="internships" className="svu-outcome-part"><SvuCareerRecords kind="internships" embedded /></section>
  <section id="placements" className="svu-outcome-part"><SvuCareerRecords kind="placements" embedded /></section>
</>;

const SvuFaculty = () => <div className="svu-flow">
  <section className="svu-block svu-intro">
    <span className="svu-faculty-eyebrow">Academic &amp; Industry Guidance</span>
    <h1>A Community of Academic Scholars &amp; Industry Practitioners</h1>
    <p className="svu-lead">Senior Sri Venkateswara University faculty teach alongside Exafluence industry professionals, so learners study core concepts and their practical application with the people who use them.</p>
  </section>
  <SvuFacultyPage />
</div>;

// `detail` places the bar inside a programme page's opening band (2 Nov 2026 brief):
// it then shares the page's own content width so its left edge meets the programme title.
export const SvuTabBar = ({ active, detail = false }: { active: SvuPageId; detail?: boolean }) => <nav aria-label="Sri Venkateswara University sections" className={`svu-tabbar${detail ? " svu-tabbar-detail" : ""}`}><div className={`svu-tabbar-inner ${detail ? "container" : "svu-container"}`}>
  {tabs.map(t => <Link key={t.id} to={svuPagePath(t.id)} className={t.id === active ? "is-active" : undefined} aria-current={t.id === active ? "page" : undefined}>{t.label}</Link>)}
</div></nav>;

const SvuPages = ({ section }: { section: SvuPageId }) => {
  useProgrammeSeo(...seo[section]);
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) { window.scrollTo(0, 0); return; }
    if (hash.startsWith("#svu-project-")) return; // SvuResearch opens the right page first
    const t = window.setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ block: "start" }), 60);
    return () => window.clearTimeout(t);
  }, [section, hash]);
  return <main className="programme-experience svu-pages">
    <div className="svu-container">
      <nav aria-label="Our Collaboration Network" className="svu-breadcrumb"><NetworkBackButton /></nav>
    </div>
    <SvuTabBar active={section} />
    <div className="svu-container svu-body">
      {section === "overview" && <SvuOverview />}
      {section === "outcomes" && <SvuOutcomes />}
      {section === "faculty" && <SvuFaculty />}
    </div>
  </main>;
};
export default SvuPages;
