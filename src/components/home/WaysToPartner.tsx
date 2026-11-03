import { useState } from "react";
import { ChevronRight, CircleDashed } from "lucide-react";
import { PENDING } from "@/data/site";
import exiArt from "@/assets/exi-ceramic-tiles.png";
import stillTiles from "@/assets/exi-tiles-still.png";
import magnifyingGlass from "@/assets/exi-magnifying-glass.png";
const exiIllustration = exiArt;

const Illustration = () => (
  <div className="exi-illus" aria-hidden="true">
    <span className="exi-illus-glow" />
    <div className="exi-tile-art">
      <img src={stillTiles} alt="" width={1283} height={875} loading="lazy" />
      <svg className="exi-glass-layer" viewBox="0 0 1283 875" focusable="false">
        <image className="exi-glass-symbol" href={magnifyingGlass} x="529" y="385" width="116" height="98" />
      </svg>
    </div>
  </div>
);

/** Very faint 3D illustration kept behind an opened box's content. */
const Watermark = () => (
  <img className="exi-wm" src={exiIllustration} alt="" width={1283} height={875} aria-hidden="true" />
);

/** Splits the brand word so "Exa" renders red and "fluence" blue. */
const brandWord = (text: string) =>
  text.split(/(Exafluence)/g).map((part, i) =>
    part === "Exafluence" ? (
      <span key={i}>
        <span className="brand-exa">Exa</span>
        <span className="brand-fluence">fluence</span>
      </span>
    ) : (
      part
    )
  );

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
  ] },
  { title: "Tools & Technologies", sub: "Practical Skills Across Modern Technologies", points: [
    "Python and data science libraries.",
    "SQL, PostgreSQL and MongoDB.",
    "Tableau and Power BI.",
    "Generative AI and language models.",
    "Vector databases and agent frameworks.",
  ] },
];

const WaysToPartner = () => {
  const [open, setOpen] = useState<number | null>(null);
  const active = open !== null ? items[open] : null;

  return (
    <section aria-labelledby="exi-heading" className="exi-section">
      <div className="exi-layout">
        {/* Left: pale intro panel with illustration, heading and lead */}
        <div className="exi-intro">
          <Illustration />
          <h2 id="exi-heading" className="exi-heading">Connecting Technology Expertise with Educational Purpose</h2>
          <p className="exi-lead">Discover our company, purpose and approach to connecting academia, industry and technology.</p>
        </div>

        {/* Right: white card floating over the panel, six boxes in two columns */}
        <div className="exi-card">
          <div className="exi-grid" onMouseLeave={() => setOpen(null)}>
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <div key={it.title} className={`exi-item${isOpen ? " exi-item--open" : ""}`}>
                  <button type="button" className="exi-box" aria-expanded={isOpen}
                    aria-controls="exi-substitute"
                    onMouseEnter={() => setOpen(i)}
                    onFocus={() => setOpen(i)}
                    onClick={() => setOpen(i)}>
                    <span className="exi-box-title">{brandWord(it.title)}</span>
                    <span className="exi-box-subrow">
                      <span className="exi-box-sub">{it.sub}</span>
                      <ChevronRight className="exi-box-chev h-3.5 w-3.5" aria-hidden />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Shared substitute box: hovered box's content appears here, section stays put */}
          <div id="exi-substitute" className={`exi-substitute${active ? " exi-substitute--on" : ""}`}
            aria-live="polite">
            {active ? (
              <div className="exi-fade" key={active.title}>
                <Watermark />
                <p className="exi-substitute-title">{brandWord(active.title)}</p>
                {active.points?.length ? (
                  <ul className="exi-list">{active.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                ) : (
                  <span className="exi-pending inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CircleDashed className="h-3 w-3" /> {PENDING}
                  </span>
                )}
              </div>
            ) : (
              <div className="exi-substitute-idle">
                <Watermark />
                <p className="exi-substitute-title">{brandWord("Discover the Exafluence Approach")}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaysToPartner;
