import { Link } from "react-router-dom";
import { ArrowRight, Landmark, Network, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import illustration from "@/assets/academic-technical-learning.png";

export type AcademicOverviewData = {
  title: string; subtitle: string; description: string;
  partnersTitle: string; introduction: string;
  partners: { name: string; label: string; description: string; linkLabel: string; to: string; logo?: { src: string; alt: string }; skills: { label: string; icon: LucideIcon }[] }[];
  invitation: { title: string; description: string; label: string; to: string };
};

export default function AcademicOverview({ data }: { data: AcademicOverviewData }) {
  return <main className="academic-overview">
    <header className="academic-banner border-b">
      <div className="container academic-banner-inner">
        <div className="academic-banner-copy">
          <nav aria-label="Breadcrumb" className="academic-breadcrumb"><Link to="/">Exafluence Education</Link><span aria-hidden="true"> / </span><span>{data.title}</span></nav>
          <div className="academic-title-row"><span className="academic-title-icon" aria-hidden="true"><Landmark strokeWidth={1.4} /><Network className="academic-title-nodes" strokeWidth={1.5} /></span><h1>{data.title}</h1></div>
          <p className="academic-subtitle">{data.subtitle}</p>
          <p className="academic-banner-description">{data.description}</p>
        </div>
        <div className="academic-illustration" role="img" aria-label="Academic institution connected to an AI processor and analytical dashboard">
          <img src={illustration} alt="" width={1536} height={1024} />
          <svg viewBox="0 0 600 400" className="academic-illustration-path" aria-hidden="true"><path className="academic-data-path" d="M210 222 H253 L273 240 H386 L410 225 H461" /><circle className="academic-node academic-node-one" cx="235" cy="222" r="3" /><circle className="academic-node academic-node-two" cx="425" cy="225" r="3" /></svg>
        </div>
      </div>
    </header>
    <div className="container academic-body">
      <section aria-labelledby="academic-partners-title" className="academic-partners">
        <h2 id="academic-partners-title">{data.partnersTitle}</h2>
        <p className="academic-introduction">{data.introduction}</p>
        <div className="academic-partner-grid">
          {data.partners.map(partner => <article className="academic-partner-card" key={partner.to}>
            {partner.logo && <div className="academic-logo"><img src={partner.logo.src} alt={partner.logo.alt} loading="lazy" /></div>}
            <h3>{partner.name}</h3>
            <p className="academic-partner-label">{partner.label}</p>
            <p className="academic-partner-description">{partner.description}</p>
            <ul className="academic-skills">{partner.skills.map(({ label, icon: Icon }) => <li key={label}><Icon size={17} strokeWidth={1.5} aria-hidden="true" /><span>{label}</span></li>)}</ul>
            <Button asChild variant="link" className="academic-partner-link"><Link to={partner.to}>{partner.linkLabel}<ArrowRight size={17} aria-hidden="true" /></Link></Button>
          </article>)}
        </div>
      </section>
      <nav className="academic-local-nav" aria-label="Academic collaboration pages"><p>On This Page</p><Link to="/academic-collaborations" aria-current="page">Academic Collaborations</Link><Link to="/academic-collaborations/svu">SVU Collaboration</Link><Link to="/academic-collaborations/xime">XIME Collaboration</Link></nav>
      <section className="academic-invitation" aria-labelledby="academic-invitation-title">
        <Network size={28} strokeWidth={1.4} aria-hidden="true" />
        <div><h2 id="academic-invitation-title">{data.invitation.title}</h2><p>{data.invitation.description}</p></div>
        <Button asChild className="academic-invitation-button"><Link to={data.invitation.to}>{data.invitation.label}<ArrowRight size={17} aria-hidden="true" /></Link></Button>
      </section>
    </div>
  </main>;
}