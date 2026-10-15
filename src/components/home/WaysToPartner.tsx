import { useRef, useState } from "react";
import { ChevronDown, CircleDashed } from "lucide-react";
import { PENDING } from "@/data/site";

type Item = { title: string; sub: string; points: string[] };

/** Detail bullets render only once approved; until then the approval placeholder shows. */
const items: Item[] = [
  { title: "About Exafluence Inc.", sub: "Industry Expertise. Technology Innovation.", points: [
    "Data, analytics and AI solutions.",
    "Financial Services and Telecommunications.",
    "Healthcare, Pharma and Retail.",
    "Energy, Utilities and Industrial IoT.",
    "Education through Exafluence Education.",
  ] },
  { title: "Mission", sub: "Connecting Knowledge with Practice", points: [
    "Connect education with industry.",
    "Deliver relevant technology learning.",
    "Strengthen practical skills.",
    "Encourage academic collaboration.",
    "Support continuous professional growth.",
  ] },
  { title: "Vision", sub: "Advancing Learning for a Technology-Driven World", points: [
    "Connect academia, industry and technology.",
    "Make learning relevant to practice.",
    "Encourage responsible innovation.",
    "Develop confident, capable learners.",
    "Support lifelong skill development.",
  ] },
  { title: "How We Work", sub: "A Collaborative, Application-Focused Approach", points: [
    "Build strong conceptual foundations.",
    "Apply learning through projects.",
    "Explore real-world case studies.",
    "Connect with industry experts.",
    "Integrate practical industry exposure.",
  ] },
  { title: "Quality & Standards", sub: "Information Security. Responsible AI.", points: [
    "Certified entity: Exafluence Global Analytics Private Limited.",
    "ISO/IEC 27001:2022 — Information Security Management.",
    "ISO/IEC 42001:2023 — AI Management.",
    "Applicable to certified activities and scope.",
    "These are not educational accreditations.",
  ] },
  { title: "Tools & Technologies", sub: "Practical Skills Across Modern Technologies", points: [
    "Python and data science libraries.",
    "SQL, PostgreSQL and MongoDB.",
    "Tableau and Power BI.",
    "Generative AI and language models.",
    "Vector databases and agent frameworks.",
  ] },
];

const Content = ({ item, headingId }: { item: Item; headingId?: string }) => (
  <>
    <h3 id={headingId} className="exi-p-title">{item.title}</h3>
    <p className="exi-p-sub">{item.sub}</p>
    {item.points?.length ? (
      <ul className="exi-list">{item.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
    ) : (
      <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground"><CircleDashed className="h-3 w-3" /> {PENDING}</span>
    )}
  </>
);

const WaysToPartner = () => {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = items.length;
    let next = -1;
    if (e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowUp") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section aria-labelledby="exi-heading" className="exi-section">
      <div className="exi-head">
        <p className="exi-eyebrow">Exafluence Inc.</p>
        <h2 id="exi-heading" className="exi-heading">Connecting Technology Expertise with Educational Purpose</h2>
        <p className="exi-lead">Discover our company, purpose and approach to connecting academia, industry and technology.</p>
      </div>

      {/* Desktop / tablet: tabs left, panel right */}
      <div className="exi-desktop">
        <div className="exi-tabs" role="tablist" aria-orientation="vertical" aria-label="About Exafluence Inc.">
          {items.map((it, i) => (
            <button key={it.title} ref={(el) => (tabs.current[i] = el)} type="button" role="tab"
              id={`exi-tab-${i}`} aria-selected={active === i} aria-controls="exi-tabpanel"
              tabIndex={active === i ? 0 : -1} className="exi-tab"
              onClick={() => setActive(i)} onKeyDown={(e) => onKey(e, i)}>
              {it.title}
            </button>
          ))}
        </div>
        <div id="exi-tabpanel" role="tabpanel" aria-labelledby={`exi-tab-${active}`} className="exi-panel" tabIndex={0}>
          <Content item={items[active]} />
        </div>
      </div>

      {/* Mobile: accordion */}
      <div className="exi-mobile exi-tabs">
        {items.map((it, i) => {
          const open = openMobile === i;
          return (
            <div key={it.title}>
              <button type="button" className="exi-tab" aria-expanded={open} aria-controls={`exi-acc-${i}`}
                onClick={() => setOpenMobile(open ? null : i)}>
                <span>{it.title}</span>
                <ChevronDown className="exi-tab-icon h-4 w-4" aria-hidden />
              </button>
              <div id={`exi-acc-${i}`} role="region" aria-label={it.title} hidden={!open} className="exi-acc-panel">
                <Content item={it} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WaysToPartner;
