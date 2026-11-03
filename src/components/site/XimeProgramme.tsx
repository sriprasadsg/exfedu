import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, BookOpen, Clock3, GraduationCap, Award, Cpu, FlaskConical, CalendarDays, MessageCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";
import { organisations, type Tone } from "@/data/site";
import { ximeProgrammeContent as content } from "@/data/xime";
import { useProgrammeSeo } from "./ProgrammeDirectory";
import NetworkBackButton from "./NetworkBackButton";

type Section = { title: string; icon: LucideIcon; tone: Tone; text?: string; items?: string[]; missing: string };
const XimeProgramme = () => {
  const [requestOpen, setRequestOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const reading = useRef<HTMLDivElement>(null);
  useProgrammeSeo("XIME Chennai Programmes | Exafluence Education", "Review XIME Chennai programme information, curriculum, technologies and certification within Exafluence Education. Unverified details are flagged for review.");
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
    { title: "Programme Title & Features", icon: Award, tone: "amber", items: content.features, missing: "Programme features require source confirmation." },
    { title: "Duration and Delivery Mode", icon: Clock3, tone: "teal", missing: "Programme duration and delivery mode require source confirmation." },
    { title: "Industry-Integrated Programme", icon: BookOpen, tone: "violet", text: content.overview, missing: "Programme overview requires source confirmation." },
    { title: "Curriculum and Learning Outcomes", icon: GraduationCap, tone: "blue", missing: "Curriculum modules and learning outcomes require source confirmation." },
    { title: "Technology Specification", icon: Cpu, tone: "blue", items: content.tools, missing: "Programme-specific tools and technologies require source confirmation." },
    { title: "Practical & Theory", icon: FlaskConical, tone: "teal", text: content.practical, missing: "The practical and theory split requires source confirmation." },
    { title: "Joint Certification on Completion", icon: Award, tone: "amber", text: content.certification, missing: "Awarding body and certificate title require source confirmation." },
  ];
  const openRequest = () => { setComplete(false); setRequestOpen(true); };
  const pending = (text: string) => <div className="xime-review"><span className="programme-org">Details under review</span><p>{text}</p></div>;
  const list = (items: string[]) => <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>;
  return <main className="programme-experience">
    <header className="programme-intro programme-intro--split"><div className="container">
      <NetworkBackButton />
      <nav aria-label="Breadcrumb"><Link to="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">XIME Chennai</span></nav>
      <div className="programme-intro-grid">
        <div className="programme-intro-copy">
          <img className="programme-detail-logo" src={organisations.XIME.logo} alt="XIME Chennai logo" />
          <h1>{content.title ?? "XIME Chennai Programme"}</h1>
          {!content.overview && <p className="programme-review-note">Programme information is awaiting verification from the XIME Chennai source.</p>}
        </div>
        <figure className="programme-intro-art"><img src={ximeBanner.url} alt="Illustration: a central fintech platform connected to four services for data, networks, payments and analytics" loading="lazy" /></figure>
      </div>
    </div></header>
    <div className="container programme-detail-body"><div className="programme-reading" ref={reading}>
      {sections.map(section => <section className="programme-detail-section programme-reveal" key={section.title}>
        <h2><span className={`programme-section-icon tone-${section.tone}`}><section.icon size={22} aria-hidden="true" /></span>{section.title}</h2>
        {section.title === "Duration and Delivery Mode" ? <dl className="xime-duration"><div><dt>Duration</dt><dd>{content.duration ?? "Under review"}</dd></div><div><dt>Delivery mode</dt><dd>{content.delivery ?? "Under review"}</dd></div></dl>
          : section.title === "Curriculum and Learning Outcomes" ? <>{content.curriculum?.length ? <><h3 className="font-medium mb-3">Curriculum</h3>{list(content.curriculum)}</> : pending("Curriculum modules require source confirmation.")}{content.outcomes?.length ? <><h3 className="font-medium mt-5 mb-3">Learning Outcomes</h3>{list(content.outcomes)}</> : pending("Learning outcomes require source confirmation.")}</>
          : section.text ? <p>{section.text}</p> : section.items?.length ? list(section.items) : pending(section.missing)}
      </section>)}
      <section className="programme-detail-section programme-reveal"><h2><span className="programme-section-icon tone-teal"><MessageCircle size={22} aria-hidden="true" /></span>Programme Enquiry</h2>
        <Button className="cta-enquire" onClick={openRequest}>Enquire Now<ArrowRight /></Button>
      </section>
    </div><aside className="programme-actions"><span className="programme-org">XIME Chennai</span><h2>Programme Enquiry</h2>
      <Button className="cta-enquire" onClick={openRequest}>Enquire Now<ArrowRight /></Button>
      <Link to="/collaboration-network"><ArrowLeft size={16} />Back to Our Collaboration Network</Link>
    </aside></div>
    <Dialog open={requestOpen} onOpenChange={setRequestOpen}><DialogContent className="programme-brochure-dialog"><DialogTitle>XIME Chennai Programme Enquiry</DialogTitle>
      {complete ? <div role="status"><p>Test enquiry completed. No details have been sent.</p></div>
        : <PartnerEnquiry programme={content.title ?? "XIME Chennai Programme"} onSuccess={() => setComplete(true)} intro={{ title: "Contact details", description: "Programme enquiries are currently in test mode; no details will be sent." }} />}
    </DialogContent></Dialog>
  </main>;
};
export default XimeProgramme;