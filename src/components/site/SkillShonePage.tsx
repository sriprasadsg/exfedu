import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search, Database, Code2, GitPullRequest, FileText, MessageSquareText, Sparkles, Factory, Bot, UserCheck, Award, type LucideIcon } from "lucide-react";
import type { Page, Tone } from "@/data/site";
import { BlockView } from "@/components/site/Blocks";
import skillshoneLogo from "@/assets/skillshone-original.png.asset.json";

/** Arcado-style editorial layout for SkillShone: minimal hero with stats, step
 *  row, rotating badge and split "who it is for" section. Every detail — feature
 *  text, journey steps and FAQ answers — sits on the page itself, so nothing is
 *  hidden behind a click or a panel that covers the bottom of the screen. */

type Step = { icon: LucideIcon; t: string; d: string; more: string };
type Feature = { icon: LucideIcon; t: string; d: string; tone: Tone; more: string };

const steps: Step[] = [
  { icon: Search, t: "Choose a Problem", d: "Pick from industry-grade problem statements.", more: "Pick from 1,200+ industry-grade problem statements spread across 48 domains and 11 business functions. Credits unlock statements so you can start solving straight away." },
  { icon: Database, t: "Explore the Data", d: "Work with realistic project datasets.", more: "Work through exploratory analysis and feature engineering on realistic, messy project data — the same kind of data a company actually holds — to find the signals that matter." },
  { icon: Code2, t: "Develop Your Solution", d: "Build with project-aware AI assistance.", more: "Train and evaluate models inside a real project context, with an AI assistant trained on your own project available whenever you need a nudge, guiding you without giving away the solution." },
  { icon: GitPullRequest, t: "Review and Refine", d: "Improve through code reviews and feedback.", more: "Industry experts review your code and confirm the solution meets expected professional standards before you move on." },
  { icon: FileText, t: "Document and Present", d: "Generate a structured project report.", more: "Produce a structured project report. Every submission becomes a statement on your CV and part of a portfolio you can show to employers." },
  { icon: MessageSquareText, t: "Expert Feedback", d: "Practise with mentors and mock interviews.", more: "Practise with mentors and mock interviews, then use the feedback to sharpen how you present and defend your technical decisions." },
];
const stats = [
  { v: "1,200+", l: "Problem statements" },
  { v: "1,200+", l: "Curated datasets" },
  { v: "48", l: "Industry domains" },
  { v: "11", l: "Business functions" },
];
const features: Feature[] = [
  { icon: Factory, t: "Industry Problem Statements", d: "Curated real-world challenges, complete with datasets and context.", tone: "blue", more: "Challenges are drawn from real industry situations rather than toy tutorials — for example predicting marketing milestone attribution for automotive campaigns, identifying at-risk frontline staff in hospitality, or forecasting unscheduled equipment failure in smart plants. Each statement arrives with the data and background needed to begin." },
  { icon: Database, t: "Curated Datasets", d: "1,200+ realistic datasets across 48 domains and 11 business functions.", tone: "teal", more: "The datasets are complex and messy in the way real company data is, so exploration, insight-finding and model building all happen in a genuine project context instead of a cleaned teaching example." },
  { icon: Bot, t: "Free LLM Access", d: "A free LLM API key in your programme, with a project-aware chat assistant.", tone: "violet", more: "Use a free LLM API key in your programme and chat with an assistant trained on your own project. New registrations receive 200 bonus credits, worth 2,000 INR, which unlock problem statements so you can begin right away." },
  { icon: UserCheck, t: "Expert Mentor Guidance", d: "A mentor reviews your work, gives feedback and guides you to completion.", tone: "amber", more: "You are assigned a mentor who reviews your submissions, provides feedback and keeps the project moving until it is complete." },
  { icon: GitPullRequest, t: "Code Reviews & Mock Interviews", d: "Industry experts review your code and run mock interviews with feedback.", tone: "teal", more: "Experts check that your solution meets expected standards, then run mock interviews so you can practise explaining your decisions and improve from the feedback you receive." },
  { icon: Award, t: "Verifiable Certificate", d: "A certificate issued by Exafluence on successful project completion.", tone: "blue", more: "On successful completion of the project you receive a verifiable certificate issued by Exafluence, ready to add to a portfolio or CV." },
];
const audiences = ["Undergraduate & postgraduate students", "Final-year project teams", "Graduates & job aspirants", "Professionals & career switchers"];
const tools = ["Generative AI", "AI & Machine Learning", "Open-source LLMs", "Python", "Databases", "Data Science"];

const Eyebrow = ({ children }: { children: string }) => (
  <p className="ss-eyebrow"><span aria-hidden="true" />{children}</p>
);

export default function SkillShonePage({ page, breadcrumb }: { page: Page; breadcrumb: React.ReactNode }) {
  const faq = page.blocks.find((b): b is Extract<Page["blocks"][number], { type: "faq" }> => b.type === "faq");
  const cta = page.blocks.find((b) => b.type === "cta");
  const faqItems = faq?.items ?? [];
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
              <Link to="/contact" className="ss-btn">Enquire Now</Link>
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
          {steps.map(({ icon: Icon, t, d, more }) => (
            <li key={t} className="ss-step">
              <Icon className="h-6 w-6 text-primary" strokeWidth={1.25} aria-hidden="true" /><h3>{t}</h3><p>{d}</p><p className="ss-step-more">{more}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* What you get — features sourced from skillshone.com */}
      <section className="container border-t py-14">
        <Eyebrow>What you get</Eyebrow>
        <h2 className="ss-h2">Everything You Need to <em>Become AI-Ready</em></h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">From real-world datasets to expert mentors, all in one place.</p>
        <ul className="ss-features">
          {features.map(({ icon: Icon, t, d, tone, more }) => (
            <li key={t} className="ss-feature">
              <span className={`ss-feature-icon ss-tone-${tone}`} aria-hidden="true"><Icon className="h-5 w-5" strokeWidth={1.5} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
              <p className="ss-feature-more-text">{more}</p>
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
              {faqItems.map(({ q, a }, i) => {
                const open = openFaq === i;
                return (
                  <li key={q} className={open ? "is-open" : undefined}>
                    <button type="button" className="ss-faq-q" aria-expanded={open} aria-controls={`ss-faq-a-${i}`} onClick={() => setOpenFaq(open ? null : i)}>
                      <span className="ss-faq-sign" aria-hidden="true" />
                      <span>{q}</span>
                    </button>
                    <p className="ss-faq-a" id={`ss-faq-a-${i}`} hidden={!open}>{a}</p>
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
