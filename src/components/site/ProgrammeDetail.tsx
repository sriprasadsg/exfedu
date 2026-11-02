import { SvuTabBar } from "./SvuPages";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Clock3, Monitor, Download, Cpu, FlaskConical, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";
import { academicResources, organisations, PENDING, type Programme } from "@/data/site";
import { useProgrammeSeo } from "./ProgrammeDirectory";
import { organisationPath } from "@/lib/programmeNavigation";
import { programmeDetailSections } from "@/lib/programmeSections";
import { SvuAcademicResources } from "./SvuReviewedContent";

const ProgrammeDetail = ({ programme: p, organisationOverview = false }: { programme: Programme; organisationOverview?: boolean }) => {
  const org = organisations[p.organisation];
  const backUrl = organisationOverview ? "/collaboration-network" : organisationPath(p.organisation);
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

  const enquiryUrl = `/contact?programme=${encodeURIComponent(p.slug)}`;
  const sections = programmeDetailSections(p);
  const openBrochure = () => {
    setBrochureOpen(true);
    setFormComplete(false);
  };

  return (
    <main className="programme-experience">
      <header className="programme-intro">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/collaboration-network">Our Collaboration Network</Link>
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
          <img className={`programme-detail-logo ${org.logoClass}`} src={org.logo} alt={`${org.name} logo`} />
          <h1>{p.title}</h1>
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

      {p.organisation === "SVU" && <SvuTabBar active="programmes" />}
      <div className="container programme-detail-body">
        <div className="programme-reading" ref={readingRef}>
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

          <section className="programme-detail-section programme-reveal" id="brochure-enquiry">
            <h2>
              <span className="programme-section-icon tone-blue">
                <Library size={22} aria-hidden="true" />
              </span>
              Brochure &amp; Enquiry
            </h2>
            {p.organisation === "SVU" ? <SvuAcademicResources /> : <div className="programme-resource-box">
              <h3>Academic Resources</h3>
              <ul>{academicResources.items.map(item => <li key={item}>{item}</li>)}</ul>
              <p>{academicResources.note}</p>
              <Button variant="outline" size="sm" asChild>
                <Link to={academicResources.link.path}>
                  {academicResources.link.label}
                  <ArrowRight size={15} />
                </Link>
              </Button>
            </div>}
            <div className="programme-enquiry-row">
              {p.organisation !== "XIME" && (
                <Button variant="outline" onClick={openBrochure}>
                  <Download />
                  Request Brochure
                </Button>
              )}
              <Button asChild>
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
          <Button asChild>
            <Link to={enquiryUrl}>
              Enquire Now
              <ArrowRight />
            </Link>
          </Button>
          {p.organisation !== "XIME" && (
            <>
              <Button variant="outline" onClick={openBrochure}>
                <Download />
                Download Brochure
              </Button>
              {!p.brochure && <p>Approved brochure required. No download is available yet.</p>}
            </>
          )}
          {p.organisation === "IBM" && (
            <p>Programme facts follow the supplied brief; original leaflet wording requires confirmation before publication.</p>
          )}
          {p.source && (
            <a href={p.source} target="_blank" rel="noopener noreferrer">
              Programme source
              <ArrowRight size={14} />
            </a>
          )}
          <Link to={backUrl}>
            <ArrowLeft size={16} />
            {backLabel}
          </Link>
        </aside>
      </div>

      <Dialog open={brochureOpen} onOpenChange={setBrochureOpen}>
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
            <PartnerEnquiry
              programme={p.title}
              onSuccess={() => setFormComplete(true)}
              intro={{
                title: "Contact details",
                description: p.brochure
                  ? "Complete your enquiry before downloading the approved brochure."
                  : "The brochure awaits approval. You can test your programme enquiry below.",
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default ProgrammeDetail;
