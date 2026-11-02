import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight, GraduationCap, Landmark, Search, Database, Code2, GitPullRequest, FileText, MessageSquareText, Sparkles, BrainCircuit, MessageSquare, Terminal, FlaskConical, type LucideIcon } from "lucide-react";
import type { Page, Tone } from "@/data/site";
import { BlockView } from "@/components/site/Blocks";
import skillshoneLogo from "@/assets/skillshone-original.png.asset.json";
import featProblems from "@/assets/ss-feat-problems.png";
import featDatasets from "@/assets/ss-feat-datasets.png";
import featLlm from "@/assets/ss-feat-llm.png";
import featMentor from "@/assets/ss-feat-mentor.png";
import featReview from "@/assets/ss-feat-review.png";
import featCertificate from "@/assets/ss-feat-certificate.png";


/** Arcado-style editorial layout for SkillShone: minimal hero with stats, step
 *  row, rotating badge and split "who it is for" section. Every detail — feature
 *  text, journey steps and FAQ answers — sits on the page itself, so nothing is
 *  hidden behind a click or a panel that covers the bottom of the screen. */

type Step = { icon: LucideIcon; t: string; d: string; tone: Tone };
type Feature = { img: string; t: string; d: string; tone: Tone };

const steps: Step[] = [
  { icon: Search, t: "Choose a Problem", d: "Pick an industry-grade problem statement.", tone: "blue" },
  { icon: Database, t: "Explore the Data", d: "Work with realistic project datasets.", tone: "teal" },
  { icon: Code2, t: "Develop Your Solution", d: "Build with project-aware AI assistance.", tone: "violet" },
  { icon: GitPullRequest, t: "Review and Refine", d: "Improve through code reviews and feedback.", tone: "amber" },
  { icon: FileText, t: "Document and Present", d: "Generate a structured project report.", tone: "blue" },
  { icon: MessageSquareText, t: "Expert Feedback", d: "Practise with mentors and mock interviews.", tone: "teal" },
];
const stats = [
  { v: "1,200+", l: "Problem statements" },
  { v: "1,200+", l: "Curated datasets" },
  { v: "48", l: "Industry domains" },
  { v: "11", l: "Business functions" },
];
const features: Feature[] = [
  { img: featProblems, t: "Industry Problem Statements", d: "Curated real-world challenges, complete with datasets and context.", tone: "blue" },
  { img: featDatasets, t: "Curated Datasets", d: "1,200+ realistic datasets across 48 domains and 11 business functions.", tone: "teal" },
  { img: featLlm, t: "Free LLM Access", d: "A free LLM API key in your programme, with a project-aware chat assistant.", tone: "violet" },
  { img: featMentor, t: "Expert Mentor Guidance", d: "A mentor reviews your work, gives feedback and guides you to completion.", tone: "amber" },
  { img: featReview, t: "Code Reviews & Mock Interviews", d: "Industry experts review your code and run mock interviews with feedback.", tone: "teal" },
  { img: featCertificate, t: "Verifiable Certificate", d: "A certificate issued by Exafluence on successful project completion.", tone: "blue" },
];

const audiences = ["Undergraduate & postgraduate students", "Final-year project teams", "Graduates & job aspirants", "Professionals & career switchers"];
const institutions = ["Coursework integration", "Independent evaluation", "Guided development", "Project documentation", "Student portfolios", "Academic–industry engagement"];
const tools: { icon: LucideIcon; t: string; tone: Tone }[] = [
  { icon: Sparkles, t: "Generative AI", tone: "amber" },
  { icon: BrainCircuit, t: "AI & Machine Learning", tone: "violet" },
  { icon: MessageSquare, t: "Open-source LLMs", tone: "blue" },
  { icon: Terminal, t: "Python", tone: "teal" },
  { icon: Database, t: "Databases", tone: "amber" },
  { icon: FlaskConical, t: "Data Science", tone: "violet" },
];

const Eyebrow = ({ children }: { children: string }) => (
  <p className="ss-eyebrow"><span aria-hidden="true" />{children}</p>
);

type TimelineItem = { t: string; d: string; tone: Tone; icon?: LucideIcon; img?: string };

/** Alternating centre-line timeline (client reference, 27 Oct 2026): a node sits on
 *  the spine, the wording card butts against it on one side and the icon or
 *  illustration faces it from the other, swapping sides row by row. */
const Timeline = ({ items }: { items: TimelineItem[] }) => (
  <ol className="ss-tl">
    {items.map(({ t, d, tone, icon: Icon, img }, i) => (
      <li key={t} className="ss-tl-row" style={{ animationDelay: `${i * 110}ms` }}>
        <span className={`ss-tl-node ss-tone-${tone}`} aria-hidden="true" />
        <div className="ss-tl-card">
          <h3>{t}</h3>
          <p>{d}</p>
        </div>
        <div className="ss-tl-art" aria-hidden="true">
          <span className={`ss-tl-tile ss-tone-${tone}`}>
            {Icon ? <Icon className="h-7 w-7" strokeWidth={1.5} /> : null}
            {img ? <img src={img} alt="" width={816} height={816} loading="lazy" /> : null}
          </span>
        </div>
      </li>
    ))}
  </ol>
);

/** Learning journey keeps the earlier square flash-card grid (client request,
 *  27 Oct 2026): six equal boxes with a tinted icon tile and glowing edges. */
const JourneyGrid = () => (
  <ul className="ss-journey">
    {steps.map(({ icon: Icon, t, d, tone }, i) => (
      <li key={t} className="ss-journey-card ss-glow-card" style={{ animationDelay: `${i * 90}ms` }}>
        <span className={`ss-journey-tile ss-tone-${tone}`} aria-hidden="true">
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </span>
        <h3>{t}</h3>
        <p>{d}</p>
      </li>
    ))}
  </ul>
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
        <JourneyGrid />
      </section>


      {/* What you get — features sourced from skillshone.com */}
      <section className="container border-t py-14">
        <Eyebrow>What you get</Eyebrow>
        <h2 className="ss-h2">Everything You Need to <em>Become AI-Ready</em></h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">From real-world datasets to expert mentors, all in one place.</p>
        <Timeline items={features} />
      </section>


      {/* Badge */}
      <section className="container border-t py-14 text-center">
        <div className="ss-badge" aria-hidden="true">
          <svg viewBox="0 0 100 100"><defs><path id="ss-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" /></defs>
            <text><textPath href="#ss-circle">• LEARN • BUILD • REVIEW • PRESENT • LEARN • BUILD • REVIEW •</textPath></text></svg>
          <svg className="ss-badge-core" viewBox="0 0 24 24">
            <defs><linearGradient id="ss-star-navy-red" x1="0" y1="0" x2="1" y2="1"><stop offset="0" className="ss-star-navy" /><stop offset="1" className="ss-star-red" /></linearGradient></defs>
            <path d="M11 3 C11.7 8.2 14.3 10.8 19.5 11.5 C14.3 12.2 11.7 14.8 11 20 C10.3 14.8 7.7 12.2 2.5 11.5 C7.7 10.8 10.3 8.2 11 3 Z" fill="url(#ss-star-navy-red)" />
            <path className="ss-star-redfill" d="M18.6 3.2 L19.05 4.75 L20.6 5.2 L19.05 5.65 L18.6 7.2 L18.15 5.65 L16.6 5.2 L18.15 4.75 Z" />
          </svg>
        </div>
        <h2 className="ss-h2 mt-5">From Learning to <em>Practical Application</em></h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">Understand a problem, explore data, write code and explain results — one guided journey through professional workflows.</p>
        <ul className="ss-tools">
          {tools.map(({ icon: Icon, t, tone }, i) => (
            <li key={t} className={`ss-tone-${tone} ss-tool`} style={{ animationDelay: `${i * 80}ms` }}>
              <span className="ss-tool-icon"><Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" /></span>{t}
            </li>
          ))}
        </ul>
      </section>

      {/* Who it's for / institutions — two equal partitions on a writing pad */}
      <section className="container py-16">
        <div className="ss-capsule">
          <span className="ss-pad-clip" aria-hidden="true">
            <svg viewBox="0 0 120 70" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8 H30 L44 52 Q46 60 54 60 H66 Q74 60 76 52 L90 8 H112" fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <div className="ss-pad-sheet">
          <div className="ss-cap ss-cap--left">
            <span className="ss-cap-badge" aria-hidden="true"><GraduationCap className="h-6 w-6" strokeWidth={1.5} /></span>
            <span className="ss-cap-side" aria-hidden="true">Learners</span>
            <ul>{audiences.map((a, i) => <li key={a} style={{ animationDelay: `${i * 120}ms` }}><ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />{a}</li>)}</ul>
          </div>
          <div className="ss-cap ss-cap--right">
            <span className="ss-cap-badge" aria-hidden="true"><Landmark className="h-6 w-6" strokeWidth={1.5} /></span>
            <span className="ss-cap-side" aria-hidden="true">Institutions</span>
            <ul>{institutions.map((a, i) => <li key={a} style={{ animationDelay: `${i * 120}ms` }}><ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />{a}</li>)}</ul>
          </div>
          </div>
          <span className="ss-pad-pen" aria-hidden="true">
            <svg viewBox="0 0 46 330" xmlns="http://www.w3.org/2000/svg">
              <rect x="9" y="6" width="28" height="96" rx="14" fill="currentColor" />
              <rect className="ss-pad-pen-steel" x="30" y="16" width="6" height="56" rx="3" />
              <rect className="ss-pad-pen-steel" x="8" y="94" width="30" height="9" rx="4" />
              <rect x="11" y="103" width="24" height="140" rx="11" fill="currentColor" opacity=".9" />
              <rect className="ss-pad-pen-steel" x="10" y="240" width="26" height="9" rx="4" />
              <path className="ss-pad-pen-dark" d="M13 249 L33 249 L29 276 L17 276 Z" />
              <path className="ss-pad-pen-steel" d="M17 276 L29 276 L23 312 Z" />
              <path className="ss-pad-pen-dark" d="M22.4 284 L23.6 284 L23.6 306 L22.4 306 Z" />
            </svg>
          </span>
        </div>

      </section>


      <div className="container space-y-16 pb-16">
        {faq && (
          <section aria-label={faq.title}>
            <h2 className="ss-h2 text-center">{faq.title}</h2>
            <ul className="ss-faq-list">
              {faqItems.map(({ q, a, groups }, i) => {
                const open = openFaq === i;
                return (
                  <li key={q} className={open ? "is-open" : undefined}>
                    <button type="button" className="ss-faq-q" aria-expanded={open} aria-controls={`ss-faq-a-${i}`} onClick={() => setOpenFaq(open ? null : i)}>
                      <span className="ss-faq-sign" aria-hidden="true" />
                      <span>{q}</span>
                    </button>
                    {groups ? (
                      <div className="ss-faq-a" id={`ss-faq-a-${i}`} hidden={!open}>
                        {groups.map((g) => (
                          <div className="ss-faq-group" key={g.label}>
                            <h5>{g.label}</h5>
                            <ul>{g.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="ss-faq-a" id={`ss-faq-a-${i}`} hidden={!open}>{a}</p>
                    )}
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
