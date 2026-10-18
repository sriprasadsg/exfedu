import { Link } from "react-router-dom";
import { ArrowRight, Banknote, HeartPulse, ShoppingBag, Factory, Database, Code2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import sculpture from "@/assets/about-icon-sculpture.png.asset.json";

export type AboutOverviewData = {
  title: string;
  subtitle: string;
  introduction: string;
  purpose: { title: string; text: string };
  foundation: { title: string; paragraphs: string[]; industries: string[]; founded: number };
  approach: { title: string; paragraphs: string[] };
  innovation: { title: string; introduction: string; solutions: { name: string; text: string }[]; closing: string };
  milestones: { title: string; company: string; introduction: string; recognitions: { year: number; title: string; company: string }[] };
  explore: { title: string; text: string; actions: { label: string; to: string }[] };
};

const industryIcons = [Banknote, HeartPulse, ShoppingBag, Factory];
const industryTones = ["blue", "teal", "amber", "red"];
const solutionIcons = [Database, Code2, FileText];

export default function AboutOverview({ data }: { data: AboutOverviewData }) {
  return <article className="about-editorial">
    <header className="container about-editorial-opening">
      <nav aria-label="Breadcrumb" className="about-editorial-breadcrumb"><Link to="/">Exafluence Education</Link><span aria-hidden="true">/</span><span>About Us</span></nav>
      <div className="about-editorial-intro">
        <div>
          <h1>{data.title}</h1>
          <p className="about-editorial-subtitle">{data.subtitle}</p>
          <p>{data.introduction}</p>
        </div>
        <figure><img src={sculpture.url} width={761} height={1301} alt="Tall stack of sky-blue spheres and pebbles carrying silver icons of a factory and gear, a rising chart, a processor, a cloud, a starred document and people reading, linked by a glowing blue thread" /></figure>
      </div>
    </header>

    <section className="about-editorial-purpose" aria-labelledby="about-purpose">
      <div className="container about-editorial-split"><h2 id="about-purpose">{data.purpose.title}</h2><p>{data.purpose.text}</p></div>
    </section>

    <section className="container about-editorial-section" aria-labelledby="about-foundation">
      <div className="about-editorial-split"><h2 id="about-foundation">{data.foundation.title}</h2><div>{data.foundation.paragraphs.map((text) => <p key={text}>{text}</p>)}</div></div>
      <ul className="about-editorial-industries">{data.foundation.industries.map((industry, i) => {
        const Icon = industryIcons[i] ?? Factory;
        return <li key={industry}><span className={`about-editorial-industry-icon tone-${industryTones[i % industryTones.length]}`} aria-hidden="true"><Icon size={21} strokeWidth={1.6} /></span><span>{industry}</span></li>;
      })}</ul>
    </section>

    <section className="container about-editorial-section about-editorial-approach" aria-labelledby="about-approach">
      <h2 id="about-approach">{data.approach.title}</h2>
      <div className="about-editorial-columns">{data.approach.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
    </section>

    <section className="container about-editorial-section" aria-labelledby="about-innovation">
      <h2 id="about-innovation">{data.innovation.title}</h2>
      <p className="about-editorial-lead">{data.innovation.introduction}</p>
      <dl className="about-editorial-solutions">{data.innovation.solutions.map((solution, i) => {
        const Icon = solutionIcons[i] ?? Database;
        return <div key={solution.name}><dt><Icon size={23} strokeWidth={1.5} aria-hidden="true" />{solution.name}</dt><dd>{solution.text}</dd></div>;
      })}</dl>
      <p className="about-editorial-closing">{data.innovation.closing}</p>
    </section>

    <section className="container about-editorial-section" aria-labelledby="about-milestones">
      <div className="about-editorial-split"><h2 id="about-milestones">{data.milestones.title}</h2><p>{data.milestones.introduction}</p></div>
      <ul className="about-editorial-milestones">{data.milestones.recognitions.map((recognition, i) => {
        return <li key={recognition.year}>
          <span className="about-editorial-year">{recognition.year}</span>
          <div><span className="about-editorial-company">{recognition.company}</span>
            <h3><span className={`about-editorial-badge ${i % 2 === 0 ? "is-maroon" : "is-gold"}`}>{recognition.title}</span></h3>
          </div>
        </li>;
      })}</ul>
    </section>

    <section className="about-editorial-explore" aria-labelledby="about-explore">
      <div className="container"><h2 id="about-explore">{data.explore.title}</h2><p>{data.explore.text}</p>
        <div className="about-editorial-actions">{data.explore.actions.map((action, i) => <Button asChild key={action.to} variant={i === 0 ? "default" : "outline"}><Link to={action.to}>{action.label}<ArrowRight size={16} aria-hidden="true" /></Link></Button>)}</div>
      </div>
    </section>
  </article>;
}