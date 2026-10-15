import { useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, CircleDashed } from "lucide-react";
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

const PER_SLIDE = 3;
const slides: Item[][] = [
  items.slice(0, PER_SLIDE),
  items.slice(PER_SLIDE, PER_SLIDE * 2),
];

const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const Expandable = ({ item, id, clicked, hovered, setClicked, setHovered }: {
  item: Item; id: string; clicked: boolean; hovered: boolean;
  setClicked: (v: boolean) => void; setHovered: (v: boolean) => void;
}) => {
  const open = clicked || hovered;
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`exi-item${open ? " is-open" : ""}`}
      onMouseEnter={() => canHover() && setHovered(true)}
      onMouseLeave={() => { if (!ref.current?.contains(document.activeElement)) setHovered(false); }}
      onBlur={(e) => { if (!ref.current?.contains(e.relatedTarget as Node) && !ref.current?.matches(":hover")) setHovered(false); }}
      onKeyDown={(e) => { if (e.key === "Escape" && open) { setClicked(false); setHovered(false); } }}
    >
      <button
        type="button"
        className="exi-trigger"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${item.title} — ${item.sub}. ${open ? "Hide" : "Show"} details`}
        onClick={() => { const next = !open; setClicked(next); if (!next) setHovered(false); }}
      >
        <span className="min-w-0">
          <span className="exi-title">{item.title}</span>
          <span className="exi-sub">{item.sub}</span>
        </span>
        <span className="exi-chev" aria-hidden><ChevronDown className="h-4 w-4" /></span>
      </button>
      <div id={id} className="exi-detail" hidden={!open}>
        {item.points?.length ? (
          <ul className="exi-list">
            {item.points.map((pt) => <li key={pt}>{pt}</li>)}
          </ul>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"><CircleDashed className="h-3 w-3" /> {PENDING}</span>
        )}
      </div>
    </div>
  );
};

const WaysToPartner = () => {
  const [slide, setSlide] = useState(0);
  const [clicked, setClicked] = useState<Record<string, boolean>>({});
  const [hovered, setHovered] = useState<Record<string, boolean>>({});
  const touchX = useRef<number | null>(null);

  const go = (dir: 1 | -1) => setSlide((s) => Math.min(slides.length - 1, Math.max(0, s + dir)));

  return (
    <section aria-labelledby="exi-heading" className="exi-section">
      <div className="exi-wrap">
        <div className="exi-intro">
          <p className="exi-eyebrow">Exafluence Inc.</p>
          <h2 id="exi-heading" className="exi-heading">Connecting Technology Expertise with Educational Purpose</h2>
          <p className="exi-lead">Discover our company, purpose and approach to connecting academia, industry and technology.</p>
        </div>

        <div
          className="exi-panel"
          role="region"
          aria-label="About Exafluence Inc."
          onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="exi-slide" key={slide}>
            {slides[slide].map((it, i) => {
              const idx = slide * PER_SLIDE + i;
              return (
                <Expandable key={it.title} item={it} id={`exi-d-${idx}`}
                  clicked={!!clicked[idx]} hovered={!!hovered[idx]}
                  setClicked={(v) => setClicked((c) => ({ ...c, [idx]: v }))}
                  setHovered={(v) => setHovered((h) => ({ ...h, [idx]: v }))} />
              );
            })}
          </div>

          {slide > 0 && (
            <button type="button" className="exi-arrow exi-prev" aria-label="Previous items" onClick={() => go(-1)}>
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {slide < slides.length - 1 && (
            <button type="button" className="exi-arrow exi-next" aria-label="Next items" onClick={() => go(1)}>
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          <div className="exi-dots" role="tablist" aria-label="Item pages">
            {slides.map((_, i) => (
              <button key={i} type="button" role="tab" aria-selected={slide === i}
                aria-label={`Show items ${i + 1}`} className={`exi-dot${slide === i ? " is-active" : ""}`}
                onClick={() => setSlide(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaysToPartner;
