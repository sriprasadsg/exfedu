import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { collaborationSlides, organisations, organisationSections, programmes, svuOverviewBlocks, PENDING, type Organisation } from "@/data/site";
import { organisationPath, programmePath } from "@/lib/programmeNavigation";
import ProgrammeDetail from "./ProgrammeDetail";
import XimeProgramme from "./XimeProgramme";
import { useProgrammeSeo } from "./ProgrammeDirectory";

const OrganisationProgrammes = ({ organisation }: { organisation: Organisation }) => {
  const org = organisations[organisation];
  const shown = programmes.filter(p => p.organisation === organisation);
  const slide = collaborationSlides.find(s => s.organisation === organisation);
  const sections = organisationSections[organisation];
  useProgrammeSeo(`${org.name} Programmes | Exafluence Education`, slide?.text ?? `Explore ${org.name} programmes with Exafluence Education.`);
  if (organisation === "XIME" && shown.length === 1) return <ProgrammeDetail programme={shown[0]} organisationOverview />;
  if (organisation === "XIME" && shown.length === 0) return <XimeProgramme />;

  const programmeList = <div className="organisation-programme-list">{shown.map(p => <article key={p.slug} className="organisation-programme-item">
    <span className={`programme-section-icon tone-${p.tone}`}><p.icon size={23} aria-hidden="true" /></span>
    <div><span className="programme-org">{p.level}</span><h2><Link to={programmePath(p)}>{p.title}</Link></h2><p>{p.overview}</p>
      <dl className="organisation-course-facts"><div><dt><Clock3 size={15} aria-hidden="true" />Duration</dt><dd>{p.duration}</dd></div><div><dt><Monitor size={15} aria-hidden="true" />Delivery</dt><dd>{p.delivery}</dd></div></dl>
      <Button variant="link" asChild><Link to={programmePath(p)}>View Programme<ArrowRight size={16} /></Link></Button>
    </div>
  </article>)}</div>;

  const overviewFacts = <>
    <div><dt>Programmes</dt><dd>{shown.length}</dd></div>
    <div><dt>Delivery</dt><dd>{[...new Set(shown.map(p => p.delivery))].join(" · ")}</dd></div>
    <div><dt>Intakes</dt><dd>{[...new Set(shown.map(p => p.intake))].join(" · ")}</dd></div>
  </>;

  return <main className="programme-experience organisation-programmes">
    <header className="programme-intro"><div className="container">
      <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/collaboration-network">Our Collaboration Network</Link><span aria-hidden="true">/</span><span aria-current="page">{org.name}</span></nav>
      <img className="programme-detail-logo" src={org.logo} alt={`${org.name} logo`} />
      <h1>{org.name} {organisation === "XIME" ? "Programme" : "Programmes"}</h1><p>{slide?.text}</p>
    </div></header>
    {sections && <div className="container"><nav aria-label={`${org.name} sections`} className="organisation-section-nav">{sections.map(section => <a key={section.id} href={`#${section.id}`}><section.icon size={16} aria-hidden="true" />{section.title}</a>)}</nav></div>}
    <div className="container organisation-programme-body">
      <div className="organisation-sections">
        {sections ? sections.map(section => <section key={section.id} id={section.id} className="organisation-section" aria-labelledby={`${section.id}-heading`}>
          <h2 id={`${section.id}-heading`} className="organisation-section-heading"><span className={`programme-section-icon tone-${section.tone}`}><section.icon size={21} aria-hidden="true" /></span>{section.title}</h2>
          {section.text && <p className="organisation-section-text">{section.text}</p>}
          {section.id === "overview" && <dl className="organisation-overview-facts">{overviewFacts}</dl>}
          {section.id === "programmes" && (shown.length > 0 ? programmeList : <div className="programme-empty"><BookOpen size={30} aria-hidden="true" /><h2>{PENDING}</h2><p>Programme details await verified source content.</p></div>)}
          {section.pending && <p className="organisation-section-pending"><span>{PENDING}</span>{section.pending}</p>}
          {section.link && <Button variant="outline" asChild><Link to={section.link.path}>{section.link.label}<ArrowRight size={16} /></Link></Button>}
          {section.id === "overview" && svuOverviewBlocks.map(block => <div key={block.id} id={block.id} className="organisation-subsection">
            <h3><span className={`programme-section-icon tone-${block.tone}`}><block.icon size={19} aria-hidden="true" /></span>{block.title}</h3>
            <p className="organisation-section-pending"><span>{PENDING}</span>{block.pending}</p>
            <Button variant="outline" size="sm" asChild><Link to={block.link.path}>{block.link.label}<ArrowRight size={15} /></Link></Button>
          </div>)}
        </section>) : <section aria-label={`${org.name} programmes`}>
          {shown.length > 0 ? <><h2 className="organisation-list-heading">Programmes <span>{shown.length} programmes</span></h2>{programmeList}</> : <div className="programme-empty"><BookOpen size={30} aria-hidden="true" /><h2>{PENDING}</h2><p>XIME Chennai programme title, duration, delivery mode, eligibility, curriculum and certification information await verified source content.</p><a href="https://www.ximecexfedu.com" target="_blank" rel="noopener noreferrer">XIME Chennai programme source <ArrowRight size={15} className="inline" /></a></div>}
        </section>}
      </div>
      <aside className="programme-actions"><h2>Our Collaboration Network</h2><nav aria-label="Collaboration organisations" className="organisation-links">{(Object.keys(organisations) as Organisation[]).map(key => <Link key={key} to={organisationPath(key)} aria-current={key === organisation ? "page" : undefined}>{organisations[key].name}<ArrowRight size={15} /></Link>)}</nav><Button variant="outline" asChild><Link to="/collaboration-network"><ArrowLeft size={16} />Back to Our Collaboration Network</Link></Button></aside>
    </div>
  </main>;
};
export default OrganisationProgrammes;
