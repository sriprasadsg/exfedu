import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Banknote, HeartPulse, ShoppingBag, Factory, Database, MessagesSquare, FileText,
  Landmark, Compass, Sparkles, Handshake,
} from "lucide-react";
import sculpture from "@/assets/about-icon-relief.png";

export type AboutOverviewData = {
  title: string;
  subtitle: string;
  introduction: string[];
  foundation: {
    title: string;
    heading: string;
    headingNote: string;
    paragraphs: string[];
    industries: { name: string; text: string }[];
    closing: string;
  };
  approach: { title: string; tagline: string; paragraphs: string[] };
  innovation: { title: string; subtitle: string; introduction: string; solutions: { name: string; subtitle: string; text: string }[] };
  collaborations: { title: string; paragraphs: string[] };
};

// Each icon carries its own colour tint class so every block, industry and
// solution reads as a colourful, easily recognisable icon.
const sectionIcons = [
  { icon: Landmark, tint: "about-tint-sky" },
  { icon: Compass, tint: "about-tint-teal" },
  { icon: Sparkles, tint: "about-tint-violet" },
  { icon: Handshake, tint: "about-tint-amber" },
];
const industryIcons = [
  { icon: Banknote, tint: "about-tint-teal" },
  { icon: HeartPulse, tint: "about-tint-rose" },
  { icon: ShoppingBag, tint: "about-tint-amber" },
  { icon: Factory, tint: "about-tint-violet" },
];
const solutionIcons = [
  { icon: MessagesSquare, tint: "about-tint-sky" },
  { icon: Database, tint: "about-tint-teal" },
  { icon: FileText, tint: "about-tint-indigo" },
];

function SectionHeading({ id, title, icon }: { id: string; title: string; icon: (typeof sectionIcons)[number] }) {
  const Icon = icon.icon;
  return <div className="about-editorial-section-head">
    <span className={`about-editorial-section-icon ${icon.tint}`} aria-hidden="true"><Icon size={21} strokeWidth={1.7} /></span>
    <h2 id={id}>{title}</h2>
  </div>;
}

// Approved branding: "Exafluence Education" stays entirely blue; only inside
// "Exafluence Inc. USA" does "Exa" turn red and "fluence" turn medium blue.
const brandHeading = (text: string) => {
  if (text !== "Exafluence Inc. USA") return text;
  return <><span className="about-brand-exa">Exa</span><span className="about-brand-fluence">fluence</span> Inc. USA</>;
};

export default function AboutOverview({ data }: { data: AboutOverviewData }) {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousTitle = document.title;
    const previousDescription = meta?.getAttribute("content") ?? "";
    document.title = "About Exfedu | AI, Gen AI & Data Science Education";
    meta?.setAttribute("content", "Discover Exafluence Education, a division of Exafluence Inc., focused on industry-aligned learning in AI, Gen AI, data science and cloud technologies.");
    return () => {
      document.title = previousTitle;
      if (meta && previousDescription) meta.setAttribute("content", previousDescription);
    };
  }, []);

  return <article className="about-editorial">
    <header className="container about-editorial-opening">
      <nav aria-label="Breadcrumb" className="about-editorial-breadcrumb"><Link to="/">Exafluence Education</Link><span aria-hidden="true">/</span><span>About Us</span></nav>
      <div className="about-editorial-intro">
        <div>
          <h1>{data.title}</h1>
          <p className="about-editorial-subtitle">{data.subtitle}</p>
          {data.introduction.map((text) => <p key={text}>{text}</p>)}
        </div>
        <figure><img src={sculpture} width={878} height={1545} alt="Tall stack of matte sky-blue spheres and tilted discs carrying icons of a factory and gear, a rising chart, a processor, a cloud, a starred document and people reading a book, linked by a beaded thread" /></figure>
      </div>
    </header>

    <div className="about-editorial-main">
      <section className="container about-editorial-section" aria-labelledby="about-foundation">
        <SectionHeading id="about-foundation" title={data.foundation.title} icon={sectionIcons[0]} />

        <div className="about-editorial-foundation-head">
          <h3>{brandHeading(data.foundation.heading)}</h3>
          <p className="about-editorial-foundation-note">{data.foundation.headingNote}</p>
        </div>
        <div className="about-editorial-copy">{data.foundation.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
        <ul className="about-editorial-industries">{data.foundation.industries.map((industry, i) => {
          const Icon = (industryIcons[i] ?? industryIcons[0]).icon;
          return <li key={industry.name}>
            <span className={`about-editorial-industry-icon ${(industryIcons[i] ?? industryIcons[0]).tint}`} aria-hidden="true"><Icon size={22} strokeWidth={1.6} /></span>

            <span className="about-editorial-industry-name">{industry.name}</span>
            <p>{industry.text}</p>
          </li>;
        })}</ul>
        <p className="about-editorial-closing">{data.foundation.closing}</p>
      </section>

      <section className="container about-editorial-section" aria-labelledby="about-approach">
        <SectionHeading id="about-approach" title={data.approach.title} icon={sectionIcons[1]} />

        <p className="about-editorial-tagline">{data.approach.tagline}</p>
        <div className="about-editorial-copy">{data.approach.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
      </section>

      <section className="container about-editorial-section" aria-labelledby="about-innovation">
        <SectionHeading id="about-innovation" title={data.innovation.title} icon={sectionIcons[2]} />
        <p className="about-editorial-foundation-note">{data.innovation.subtitle}</p>

        <p className="about-editorial-lead">{data.innovation.introduction}</p>
        <dl className="about-editorial-solutions">{data.innovation.solutions.map((solution, i) => {
          const Icon = (solutionIcons[i] ?? solutionIcons[0]).icon;
          return <div key={solution.name}>
            <dt><span className={`about-editorial-solution-icon ${(solutionIcons[i] ?? solutionIcons[0]).tint}`} aria-hidden="true"><Icon size={20} strokeWidth={1.7} /></span>{solution.name}</dt>

            <dd className="about-editorial-solution-sub">{solution.subtitle}</dd>
            <dd>{solution.text}</dd>
          </div>;
        })}</dl>
      </section>

      <section className="container about-editorial-section" aria-labelledby="about-collaborations">
        <SectionHeading id="about-collaborations" title={data.collaborations.title} icon={sectionIcons[3]} />

        <div className="about-editorial-copy">{data.collaborations.paragraphs.map((text) => <p key={text}>{text}</p>)}</div>
      </section>
    </div>
  </article>;
}
