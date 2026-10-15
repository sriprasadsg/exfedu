import { useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, CircleDashed } from "lucide-react";
import hub from "@/assets/university-industry-hub.png.asset.json";
import { PENDING } from "@/data/site";

type Item = { title: string; sub: string; points: string[] };

/** Detail bullets render only once approved; until then the approval placeholder shows. */
const slides: Item[][] = [
  [
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
  ],
  [
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
  ],
];

const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches;

const Expandable = ({ item, id, active, clicked, hovered, setClicked, setHovered }: {
  item: Item; id: string; active: boolean; clicked: boolean; hovered: boolean;
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
        tabIndex={active ? 0 : -1}
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
        {item.detail ? <p className="whitespace-pre-line">{item.detail}</p> : (
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
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = (n: number) => { setSlide((n + slides.length) % slides.length); setClicked({}); setHovered({}); };

  return (
    <section aria-labelledby="exi-heading" className="exi-section">
      <div className="exi-wrap">
        <div className="exi-intro">
          <img src={hub.url} alt="" aria-hidden className="exi-art" loading="lazy" />
          <p className="exi-eyebrow">Exafluence Inc.</p>
          <h2 id="exi-heading" className="exi-heading">Connecting Technology Expertise with Educational Purpose</h2>
          <p className="exi-lead">Discover our company, purpose and approach to connecting academia, industry and technology.</p>
        </div>

        <div
          className="exi-panel"
          role="region"
          aria-roledescription="carousel"
          aria-label="About Exafluence Inc."
          onTouchStart={(e) => { touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
          onTouchEnd={(e) => {
            if (!touch.current) return;
            const dx = e.changedTouches[0].clientX - touch.current.x;
            const dy = e.changedTouches[0].clientY - touch.current.y;
            touch.current = null;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(slide + (dx < 0 ? 1 : -1));
          }}
        >
          <button type="button" className="exi-nav exi-prev" aria-label="Previous slide" onClick={() => go(slide - 1)}><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" className="exi-nav exi-next" aria-label="Next slide" onClick={() => go(slide + 1)}><ChevronRight className="h-5 w-5" /></button>

          {slides.map((items, s) => (
            <div key={s} className="exi-slide" hidden={s !== slide} role="group" aria-roledescription="slide" aria-label={`Slide ${s + 1} of ${slides.length}`}>
              {items.map((it, i) => {
                const k = `${s}-${i}`;
                return (
                  <Expandable key={k} item={it} id={`exi-d-${k}`} active={s === slide}
                    clicked={!!clicked[k]} hovered={!!hovered[k]}
                    setClicked={(v) => setClicked((c) => ({ ...c, [k]: v }))}
                    setHovered={(v) => setHovered((h) => ({ ...h, [k]: v }))} />
                );
              })}
            </div>
          ))}

          <div className="exi-dots">
            {slides.map((_, s) => (
              <button key={s} type="button" className={`exi-dot${s === slide ? " is-active" : ""}`}
                aria-label={`Go to slide ${s + 1}`} aria-current={s === slide} onClick={() => go(s)}><span /></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaysToPartner;
