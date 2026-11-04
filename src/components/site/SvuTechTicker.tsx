import { useEffect, useState, type CSSProperties } from "react";
import { svuTechnologies } from "@/data/svuTools";
import { svuGrowth } from "@/data/svuOverview";

/* The "Tools & Technologies" part of the SVU Overview growth band (client, 3 and 4 November
   2026): logos only, each in its own cell, rising one after another in a narrow vertical strip
   in the section's right corner. The strip
   holds two copies of the list and slides by exactly one copy, so the loop is seamless; the
   second copy is hidden from assistive technology so every technology is announced once.
   Hover pauses the strip and a reduced-motion preference gets one still grid with every logo
   visible. No index numbers and no show-all control (client, 3 November 2026). */

const COLUMNS = 2; // 22 technologies → 11 full rows, so the loop never shows a half-empty row
const SECONDS_PER_ROW = 2.6;

const usePrefersReducedMotion = () => {
  const query = "(prefers-reduced-motion: reduce)";
  const [reduced, setReduced] = useState(() => typeof window !== "undefined" && !!window.matchMedia?.(query).matches);
  useEffect(() => {
    const media = window.matchMedia?.(query);
    if (!media) return;
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);
  return reduced;
};

const TechCells = ({ copy = false }: { copy?: boolean }) => (
  <ul
    className="svu-tech-grid"
    aria-hidden={copy || undefined}
    aria-label={copy ? undefined : "Technologies you work with"}
    data-copy={copy || undefined}
  >
    {svuTechnologies.map((item) => (
      <li className="svu-tech-cell" key={item.name} title={copy ? undefined : item.name}>
        {item.logo ? (
          <img
            className="svu-tech-logo"
            src={item.logo}
            alt={copy ? "" : item.name}
            draggable={false}
            decoding="async"
          />
        ) : item.icon ? (
          <span className="svu-tech-glyph">
            <item.icon size={26} strokeWidth={1.5} aria-hidden="true" />
            <span className="svu-tech-short" aria-hidden="true">{item.short}</span>
            {copy ? null : <span className="sr-only">{item.name}</span>}
          </span>
        ) : null}
      </li>
    ))}
  </ul>
);

const SvuTechTicker = () => {
  const reducedMotion = usePrefersReducedMotion();
  const rows = Math.ceil(svuTechnologies.length / COLUMNS);

  return (
    <section
      className={`svu-growth-part svu-tech${reducedMotion ? " is-expanded" : " is-scrolling"}`}
      aria-labelledby="svu-tech-title"
    >
      <div className="svu-tech-lead">
        <h3 id="svu-tech-title">{svuGrowth.tools.title}</h3>
        <p className="svu-reading">{svuGrowth.tools.text}</p>
      </div>
      <div className="svu-tech-window" id="svu-tech-window">
        <div
          className="svu-tech-track"
          style={{ "--tech-duration": `${(rows * SECONDS_PER_ROW).toFixed(1)}s` } as CSSProperties}
        >
          <TechCells />
          {reducedMotion ? null : <TechCells copy />}
        </div>
      </div>
    </section>
  );
};

export default SvuTechTicker;
