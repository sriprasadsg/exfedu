import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Search, Database, Code2, GitPullRequest, FileText, MessageSquareText, Sparkles, Factory, Bot, UserCheck, Award, type LucideIcon } from "lucide-react";
import type { Page, Tone } from "@/data/site";
import { BlockView } from "@/components/site/Blocks";
import skillshoneLogo from "@/assets/skillshone-original.png.asset.json";

/** Arcado-style editorial layout for SkillShone: minimal hero with stats,
 *  step row, rotating badge, stats strip and split "who it is for" section. Facts come from the approved brief. */

const steps = [
  { icon: Search, t: "Choose a Problem", d: "Pick from industry-grade problem statements." },
  { icon: Database, t: "Explore the Data", d: "Work with realistic project datasets." },
  { icon: Code2, t: "Develop Your Solution", d: "Build with project-aware AI assistance." },
  { icon: GitPullRequest, t: "Review and Refine", d: "Improve through code reviews and feedback." },
  { icon: FileText, t: "Document and Present", d: "Generate a structured project report." },
  { icon: MessageSquareText, t: "Expert Feedback", d: "Practise with mentors and mock interviews." },
];
const stats = [
  { v: "1,200+", l: "Problem statements" },
  { v: "1,200+", l: "Curated datasets" },
  { v: "48", l: "Industry domains" },
  { v: "11", l: "Business functions" },
];
const features: { icon: LucideIcon; t: string; d: string; tone: Tone }[] = [
  { icon: Factory, t: "Industry Problem Statements", d: "Curated real-world challenges, complete with datasets and context.", tone: "blue" },
  { icon: Database, t: "Curated Datasets", d: "1,200+ realistic datasets across 48 domains and 11 business functions.", tone: "teal" },
  { icon: Bot, t: "Free LLM Access", d: "A free LLM API key in your programme, with a project-aware chat assistant.", tone: "violet" },
  { icon: UserCheck, t: "Expert Mentor Guidance", d: "A mentor reviews your work, gives feedback and guides you to completion.", tone: "amber" },
  { icon: GitPullRequest, t: "Code Reviews & Mock Interviews", d: "Industry experts review your code and run mock interviews with feedback.", tone: "teal" },
  { icon: Award, t: "Verifiable Certificate", d: "A certificate issued by Exafluence on successful project completion.", tone: "blue" },
];
const audiences = ["Undergraduate & postgraduate students", "Final-year project teams", "Graduates & job aspirants", "Professionals & career switchers"];
const tools = ["Generative AI", "AI & Machine Learning", "Open-source LLMs", "Python", "Databases", "Data Science"];

const Eyebrow = ({ children }: { children: string }) => (
  <p className="ss-eyebrow"><span aria-hidden="true" />{children}</p>
);

export default function SkillShonePage({ page, breadcrumb }: { page: Page; breadcrumb: React.ReactNode }) {
  const faq = page.blocks.find((b): b is Extract<Page["blocks"][number], { type: "faq" }> => b.type === "faq");
  const cta = page.blocks.find((b) => b.type === "cta");
  const [openFaq, setOpenFaq] = useState(-1);
  return (
    <main className="ss-page">
      {/* Hero */}
      <section className="container pt-6 pb-4">
        {breadcrumb}
        <div className="ss-hero">
          <div>
            <h1 className="sr-only">{page.title}</h1>
            <Eyebrow>{page.eyebrow ?? ""}</Eyebrow>
            <p className="ss-title">Solve Industry-Grade Problems <em>Using AI &amp; Gen AI</em></p>
            <dl className="ss-mini-stats">
              {stats.slice(0, 3).map((s) => <div key={s.l}><dt>{s.v}</dt><dd>{s.l}</dd></div>)}
            </dl>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://skillshone.com/" target="_blank" rel="noreferrer" className="ss-btn ss-btn--solid">Visit SkillShone</a>
              <Link to="/#partner-enquiry" className="ss-btn">Enquire Now</Link>
            </div>
          </div>
          <div className="ss-hero-art">
            <div className="ss-hero-card"><img src={skillshoneLogo.url} alt="SkillShone" width={392} height={48} /></div>
          </div>
        </div>
      </section>


      {/* How it works */}
      <section className="container py-14">
        <div className="flex items-start justify-between">
          <div><Eyebrow>How it works</Eyebrow><h2 className="ss-h2">Your Project <em>Learning Journey</em></h2></div>
          <ArrowUpRight className="h-7 w-7 text-muted-foreground" strokeWidth={1.25} aria-hidden="true" />
        </div>
        <ol className="ss-steps">
          {steps.map(({ icon: Icon, t, d }) => (
            <li key={t}><Icon className="h-6 w-6 text-primary" strokeWidth={1.25} aria-hidden="true" /><h3>{t}</h3><p>{d}</p></li>
          ))}
        </ol>
      </section>

      {/* What you get — features sourced from skillshone.com */}
      <section className="container border-t py-14">
        <Eyebrow>What you get</Eyebrow>
        <h2 className="ss-h2">Everything You Need to <em>Become AI-Ready</em></h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">From real-world datasets to expert mentors, all in one place.</p>
        <ul className="ss-features">
          {features.map(({ icon: Icon, t, d, tone }) => (
            <li key={t} className="ss-feature">
              <span className={`ss-feature-icon ss-tone-${tone}`} aria-hidden="true"><Icon className="h-5 w-5" strokeWidth={1.5} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Badge */}
      <section className="container border-t py-14 text-center">
        <div className="ss-badge" aria-hidden="true">
          <svg viewBox="0 0 100 100"><defs><path id="ss-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
            <text><textPath href="#ss-circle">• LEARN • BUILD • REVIEW • PRESENT • LEARN • BUILD • REVIEW •</textPath></text></svg>
          <Sparkles className="ss-badge-core" strokeWidth={1.25} />
        </div>
        <h2 className="ss-h2 mt-5">From Learning to <em>Practical Application</em></h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Understand a problem, explore data, write code and explain results — one guided journey through professional workflows.</p>
        <ul className="ss-tools">{tools.map((t) => <li key={t}>{t}</li>)}</ul>
      </section>


      {/* Who it's for / institutions */}
      <section className="container grid gap-10 py-16 md:grid-cols-2">
        <div>
          <Eyebrow>Who it is for</Eyebrow>
          <h2 className="ss-h2">Build a Portfolio, <em>Gain Confidence</em></h2>
          <p className="mt-3 text-muted-foreground">Strengthen coding, analytical and problem-solving skills, and practise explaining technical decisions for presentations and interviews.</p>
          <ul className="ss-list">{audiences.map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
        <div>
          <Eyebrow>For institutions</Eyebrow>
          <h2 className="ss-h2">Colleges <em>&amp; Universities</em></h2>
          <p className="mt-3 text-muted-foreground">Structured, application-based learning through industry problems, AI tools and guided project development.</p>
          <ul className="ss-list">{["Coursework integration", "Independent evaluation", "Guided development", "Project documentation", "Student portfolios", "Academic–industry engagement"].map((a) => <li key={a}>{a}</li>)}</ul>
        </div>
      </section>

      <div className="container space-y-16 pb-16">
        {faq && (
          <section aria-label={faq.title}>
            <h2 className="ss-h2 text-center">{faq.title}</h2>
            <ul className="ss-faq-list">
              {(faq.items ?? []).map(({ q, a }, i) => {
                const open = openFaq === i;
                return (
                  <li key={q} className={open ? "is-open" : undefined}>
                    <button type="button" className="ss-faq-q" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : i)}>
                      <span className="ss-faq-sign" aria-hidden="true" />
                      <span>{q}</span>
                    </button>
                    {open && <p className="ss-faq-a">{a}</p>}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
        {cta && <BlockView block={cta} page={page} />}
      </div>
    </main>
  );
}
