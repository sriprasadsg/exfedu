import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, GraduationCap, Award, Cpu, FlaskConical, CalendarDays, Download, MessageCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";
import { organisations, type Tone } from "@/data/site";
import { ximeProgrammeContent as content } from "@/data/xime";
import { useProgrammeSeo } from "./ProgrammeDirectory";

type Section = { title: string; icon: LucideIcon; tone: Tone; text?: string; items?: string[]; missing: string };
const XimeProgramme = () => {
  const [request, setRequest] = useState<"brochure" | "enquiry" | null>(null);
  const [complete, setComplete] = useState(false);
  const reading = useRef<HTMLDivElement>(null);
  useProgrammeSeo("XIME Chennai Programme | Exafluence Education", "Review XIME Chennai programme information, eligibility, curriculum and admissions within Exafluence Education. Unverified details are flagged for review.");
  useEffect(() => {
    const sections = reading.current?.querySelectorAll(".programme-reveal");
    if (!sections) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: .08 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  const sections: Section[] = [
    { title: "Programme Overview", icon: BookOpen, tone: "blue", text: content.overview, missing: "Programme title and overview require verification from the XIME Chennai programme source." },
    { title: "Duration and Delivery Mode", icon: Clock3, tone: "teal", missing: "Programme duration and delivery mode require source confirmation." },
    { title: "Eligibility", icon: GraduationCap, tone: "blue", text: content.eligibility, missing: "Academic qualifications, experience requirements and other eligibility conditions require source confirmation." },
    { title: "Programme Features", icon: Award, tone: "amber", items: content.features, missing: "Programme features require source confirmation." },
    { title: "Curriculum and Learning Outcomes", icon: BookOpen, tone: "violet", missing: "Curriculum modules and learning outcomes require source confirmation." },
    { title: "Tools and Technologies", icon: Cpu, tone: "blue", items: content.tools, missing: "Programme-specific tools and technologies require source confirmation." },
    { title: "Practical Learning", icon: FlaskConical, tone: "teal", text: content.practical, missing: "Labs, projects, case studies and practical learning arrangements require source confirmation." },
    { title: "Certification", icon: Award, tone: "amber", text: content.certification, missing: "Awarding body, certificate title and completion requirements require source confirmation." },
    { title: "Admission Process", icon: CalendarDays, tone: "blue", text: content.admissions, missing: "Application steps, selection requirements and admission dates require source confirmation." },
  ];
  const openRequest = (value: "brochure" | "enquiry") => { setComplete(false); setRequest(value); };
  const pending = (text: string) => <div className="xime-review"><span className="programme-org">Details under review</span><p>{text}</p></div>;
  const list = (items: string[]) => <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>;
  return <main className="programme-experience">
    <header className="programme-intro"><div className="container">
      <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/collaboration-network">Our Collaboration Network</Link><span aria-hidden="true">/</span><span aria-current="page">XIME Chennai</span></nav>
      <img className="programme-detail-logo" src={organisations.XIME.logo} alt="XIME Chennai logo" />
      <h1>{content.title ?? "XIME Chennai Programme"}</h1>
      {!content.overview && <p className="programme-review-note">Programme information is awaiting verification from the XIME Chennai source.</p>}
    </div></header>
    <div className="container programme-detail-body"><div className="programme-reading" ref={reading}>
      {sections.map(section => <section className="programme-detail-section programme-reveal" key={section.title}>
        <h2><span className={`programme-section-icon tone-${section.tone}`}><section.icon size={22} aria-hidden="true" /></span>{section.title}</h2>
        {section.title === "Duration and Delivery Mode" ? <dl className="xime-duration"><div><dt>Duration</dt><dd>{content.duration ?? "Under review"}</dd></div><div><dt>Delivery mode</dt><dd>{content.delivery ?? "Under review"}</dd></div></dl>
          : section.title === "Curriculum and Learning Outcomes" ? <>{content.curriculum?.length ? <><h3 className="font-medium mb-3">Curriculum</h3>{list(content.curriculum)}</> : pending("Curriculum modules require source confirmation.")}{content.outcomes?.length ? <><h3 className="font-medium mt-5 mb-3">Learning Outcomes</h3>{list(content.outcomes)}</> : pending("Learning outcomes require source confirmation.")}</>
          : section.text ? <p>{section.text}</p> : section.items?.length ? list(section.items) : pending(section.missing)}
      </section>)}
      <section className="programme-detail-section programme-reveal"><h2><span className="programme-section-icon tone-teal"><MessageCircle size={22} aria-hidden="true" /></span>Brochure and Enquiry</h2>
        <p>{content.brochure ? "Request access to the approved programme brochure." : "The approved programme brochure is not yet available. No download is offered until an approved file is supplied."}</p>
        <div className="flex flex-wrap gap-3 mt-5"><Button variant="outline" onClick={() => openRequest("brochure")}><Download />{content.brochure ? "Download Brochure" : "Request Brochure"}</Button><Button onClick={() => openRequest("enquiry")}>Enquire Now<ArrowRight /></Button></div>
      </section>
    </div><aside className="programme-actions"><span className="programme-org">XIME Chennai</span><h2>Programme Enquiry</h2>
      <Button onClick={() => openRequest("enquiry")}>Enquire Now<ArrowRight /></Button><Button variant="outline" onClick={() => openRequest("brochure")}><Download />{content.brochure ? "Download Brochure" : "Request Brochure"}</Button>
      {!content.brochure && <p>Approved brochure pending review.</p>}
      <Link to="/collaboration-network"><ArrowLeft size={16} />Back to Our Collaboration Network</Link>
    </aside></div>
    <Dialog open={request !== null} onOpenChange={open => { if (!open) setRequest(null); }}><DialogContent className="programme-brochure-dialog"><DialogTitle>{request === "brochure" ? "XIME Chennai Brochure Request" : "XIME Chennai Programme Enquiry"}</DialogTitle>
      {complete ? <div role="status"><p>Test enquiry completed. No details have been sent.{request === "brochure" && !content.brochure ? " The approved brochure is not available yet." : ""}</p>{request === "brochure" && content.brochure && <Button asChild><a href={content.brochure} download><Download />Download Brochure</a></Button>}</div>
        : <PartnerEnquiry programme={content.title ?? "XIME Chennai Programme"} onSuccess={() => setComplete(true)} intro={{ title: "Contact details", description: request === "brochure" ? "Brochure requests are in test mode. Downloads require an approved brochure." : "Programme enquiries are currently in test mode; no details will be sent." }} />}
    </DialogContent></Dialog>
  </main>;
};
export default XimeProgramme;