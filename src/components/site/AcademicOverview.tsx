import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, GraduationCap, MessageCircle, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export type AcademicOverviewData = {
  title: string; subtitle: string; description: string;
  partnersTitle: string; introduction: string;
  partners: { name: string; label: string; description: string; linkLabel: string; to: string; logo?: { src: string; alt: string }; skills: { label: string; icon: LucideIcon }[] }[];
  invitation: { title: string; description: string; label: string; to: string };
};

export default function AcademicOverview({ data }: { data: AcademicOverviewData }) {
  return <main className="academic-overview">
    <header className="academic-banner border-b">
      <div className="container">
        <nav aria-label="Breadcrumb" className="academic-breadcrumb"><Link to="/">Exafluence Education</Link><span aria-hidden="true"> / </span><span>{data.title}</span></nav>
        <div className="academic-banner-copy">
          <p className="academic-eyebrow">Academic Partnerships</p>
          <h1>{data.title}</h1>
          <p className="academic-subtitle">{data.subtitle}</p>
          <p className="academic-banner-description">{data.description}</p>
        </div>
      </div>
    </header>
    <div className="container academic-body">
      <nav className="academic-local-nav" aria-label="Academic collaboration pages">
        <Link to="/academic-collaborations/svu">SVU Collaboration</Link>
        <Link to="/academic-collaborations/xime">XIME Collaboration</Link>
      </nav>
      <section aria-labelledby="academic-partners-title" className="academic-partners">
        <h2 id="academic-partners-title">{data.partnersTitle}</h2>
        <p className="academic-introduction">{data.introduction}</p>
        <div className="academic-partner-grid">
          {data.partners.map(partner => <article className="academic-partner-card" key={partner.to}>
            {partner.logo && <div className="academic-logo"><img src={partner.logo.src} alt={partner.logo.alt} loading="lazy" /></div>}
            <p className="academic-partner-label">{partner.label}</p>
            <h3>{partner.name}</h3>
            <p className="academic-partner-description">{partner.description}</p>
            <ul className="academic-skills">{partner.skills.map(({ label, icon: Icon }, i) => <li key={label} style={{ animationDelay: `${i * 40}ms` }}><Icon size={14} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></li>)}</ul>
            <Button asChild variant="link" className="academic-partner-link"><Link to={partner.to}>{partner.linkLabel}<ArrowRight size={16} aria-hidden="true" /></Link></Button>
          </article>)}
        </div>
      </section>
      <section className="academic-invitation" aria-labelledby="academic-invitation-title">
        <span className="academic-invitation-icons" aria-hidden="true">
          <span className="academic-invitation-chip is-blue"><GraduationCap size={20} strokeWidth={1.6} /></span>
          <span className="academic-invitation-chip is-teal"><FlaskConical size={20} strokeWidth={1.6} /></span>
          <span className="academic-invitation-chip is-amber"><MessageCircle size={20} strokeWidth={1.6} /></span>
        </span>
        <div><h2 id="academic-invitation-title">{data.invitation.title}</h2><p>{data.invitation.description}</p></div>
        <Button asChild className="academic-invitation-button"><Link to={data.invitation.to}>{data.invitation.label}<ArrowRight size={16} aria-hidden="true" /></Link></Button>
      </section>
    </div>
  </main>;
}
