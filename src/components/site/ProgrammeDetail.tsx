import { SvuTabBar } from "./SvuPages";
import { svuSectionPath } from "@/lib/programmeNavigation";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock3, Monitor, Download, Cpu, FlaskConical, Library, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { academicResources, organisations, PENDING, type Programme } from "@/data/site";
import { useProgrammeSeo } from "./ProgrammeDirectory";
import { organisationPath } from "@/lib/programmeNavigation";
import InstitutionBrochureForm from "@/components/site/InstitutionBrochureForm";
import { programmeDetailSections, ibmProgrammeSections, svuProgrammeUsp } from "@/lib/programmeSections";
import { SvuAcademicResources } from "./SvuReviewedContent";

const ProgrammeDetail = ({ programme: p, organisationOverview = false }: { programme: Programme; organisationOverview?: boolean }) => {
  const org = organisations[p.organisation];
  const backUrl = organisationOverview ? "/collaboration-network" : p.organisation === "SVU" ? svuSectionPath("programmes") : organisationPath(p.organisation);
  const backLabel = organisationOverview ? "Back to Our Collaboration Network" : `Back to ${org.name} Programmes`;
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const readingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = readingRef.current?.querySelectorAll(".programme-reveal");
    if (!targets) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: .08 });
    targets.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, [p.slug]);

  useProgrammeSeo(`${p.title} | ${org.name} | Exafluence Education`, `${p.overview} Duration: ${p.duration}. Review features, technologies and certification.`);

  // IBM offerings are institutional; every other programme takes a student enquiry.
  const enquiryUrl = `/contact?${p.organisation === "IBM" ? "type=institution&" : ""}programme=${encodeURIComponent(p.slug)}`;
  const sections = p.organisation === "IBM" ? ibmProgrammeSections(p) : programmeDetailSections(p);
  // SVU programme pages carry no brochure at all (client brief, 2 November 2026);
  // the programme enquiry stays available on its own.
  const offersBrochure = p.organisation !== "SVU" || !!p.brochure;
  const openBrochure = () => {
    setBrochureOpen(true);
    setFormComplete(false);
  };

  const isSvu = p.organisation === "SVU";
  const breadcrumb = (
    <nav aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span aria-hidden="true">/</span>
      {organisationOverview ? (
        <span aria-current="page">{org.name}</span>
      ) : (
        <>
          <Link to={organisationPath(p.organisation)}>{org.name}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{p.title}</span>
        </>
      )}
    </nav>
  );

  return (
    <main className="programme-experience programme-enfold">
      {/* SVU programme pages (2 Nov 2026 brief): breadcrumb, then the section tabs,
          then the programme title and introduction. */}
      {isSvu && <div className="programme-crumb-band"><div className="container">{breadcrumb}</div></div>}
      {isSvu && <SvuTabBar active="overview" detail />}
      <header className={`programme-intro${isSvu ? " programme-intro-after-tabs" : ""}`}>
        <div className="container">
          {!isSvu && breadcrumb}
          <img className={`programme-detail-logo ${org.logoClass}`} src={org.logo} alt={`${org.name} logo`} />
          <h1>{(() => { const w = p.title.split(" "); const last = w.pop(); return <>{w.join(" ")}{w.length ? " " : ""}<em>{last}</em></>; })()}</h1>
          <p>{p.overview}</p>
          <dl className="programme-facts">
            <div>
              <Clock3 aria-hidden="true" size={22} />
              <dt>Duration</dt>
              <dd>{p.duration}</dd>
            </div>
            <div>
              <Monitor aria-hidden="true" size={22} />
              <dt>Delivery</dt>
              <dd>{p.delivery}</dd>
            </div>
          </dl>
        </div>
      </header>
      <div className="container programme-detail-body">
        <div className="programme-reading" ref={readingRef}>
          {/* USP presentation (client brief, 2 November 2026): the programme's strengths
              read directly below the introduction, before the detailed information. */}
          {isSvu && <section className="programme-detail-section programme-usp programme-reveal" aria-labelledby="svu-usp-heading">
            <h2 id="svu-usp-heading">
              <span className="programme-section-icon tone-blue">
                <Sparkles size={22} aria-hidden="true" />
              </span>
              Built Around Practical Learning
            </h2>
            <ul className="programme-usp-list">
              {svuProgrammeUsp(p).map(point => <li key={point.label} className={point.wide ? "is-wide" : undefined}>
                <span className={`programme-section-icon tone-${point.tone}`}>
                  <point.icon size={20} aria-hidden="true" />
                </span>
                <span>{point.label}</span>
              </li>)}
            </ul>
            <Button variant="link" className="programme-usp-link" asChild>
              <Link to={svuSectionPath("projects-research")}>
                Explore Student Projects
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </Button>
          </section>}
          {sections.map(({ title, icon: Icon, tone, content, items, sub, note }) => (
            <section className="programme-detail-section programme-reveal" key={title}>
              <h2>
                <span className={`programme-section-icon tone-${tone}`}>
                  <Icon size={22} aria-hidden="true" />
                </span>
                {title}
              </h2>
              <div className="programme-section-body">
                {items?.length ? <ul>{items.map(item => <li key={item}>{item}</li>)}</ul> : <p className={content ? "" : "text-muted-foreground"}>{content || PENDING}</p>}
              </div>
              {sub && (
                <div className="programme-section-sub">
                  <h3>
                    <Cpu size={17} aria-hidden="true" />
                    {sub.label}
                  </h3>
                  <ul>{sub.items.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
              )}
              {note && (
                <p className="programme-section-note">
                  <FlaskConical size={17} aria-hidden="true" />
                  {note}
                </p>
              )}
            </section>
          ))}


          <section className="programme-detail-section programme-reveal" id={offersBrochure ? "brochure-enquiry" : "programme-enquiry"}>
            <h2>
              <span className="programme-section-icon tone-blue">
                <Library size={22} aria-hidden="true" />
              </span>
              {offersBrochure && p.organisation !== "IBM" ? "Brochure & Enquiry" : "Enquiry"}
            </h2>
            <div className="programme-enquiry-row">
              {offersBrochure && (
                <Button variant="outline" onClick={openBrochure}>
                  <Download />
                  Request Brochure
                </Button>
              )}
              <Button asChild className="cta-enquire">
                <Link to={enquiryUrl}>
                  Enquire Now
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          </section>
        </div>

        <aside className="programme-actions">
          <span className="programme-org">{org.name}</span>
          <h2>Programme Enquiry</h2>
          <Button asChild className="cta-enquire">
            <Link to={enquiryUrl}>
              Enquire Now
              <ArrowRight />
            </Link>
          </Button>
          {offersBrochure && (
            <>
              <Button variant="outline" onClick={openBrochure}>
                <Download />
                Download Brochure
              </Button>
              {!p.brochure && <p>Approved brochure required. No download is available yet.</p>}
            </>
          )}
          <Link to={backUrl}>
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
        </aside>
      </div>

      {offersBrochure && <Dialog open={brochureOpen} onOpenChange={setBrochureOpen}>
        <DialogContent className="programme-brochure-dialog">
          <DialogTitle>{p.brochure ? "Brochure Request" : "Request an Approved Brochure"}</DialogTitle>
          <p className="text-sm text-muted-foreground">{p.title}</p>
          {formComplete ? (
            <div role="status">
              <p>
                {p.brochure
                  ? "Your test enquiry is complete. The brochure is ready below."
                  : "Test enquiry completed. The approved brochure is not available yet; no details have been sent."}
              </p>
              {p.brochure && (
                <Button asChild>
                  <a href={p.brochure} download>
                    <Download />
                    Download Brochure
                  </a>
                </Button>
              )}
            </div>
          ) : (
            <InstitutionBrochureForm programme={p.title} onSuccess={() => setFormComplete(true)} />
          )}
        </DialogContent>
      </Dialog>}
    </main>
  );
};

export default ProgrammeDetail;
