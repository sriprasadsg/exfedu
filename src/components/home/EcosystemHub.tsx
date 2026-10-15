import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { homepageCapabilities } from "@/data/site";
import penMark from "@/assets/pen-mark.png";
import academic from "@/assets/capability-academic.webp";
import technology from "@/assets/capability-technology.webp";
import programmes from "@/assets/capability-programmes.webp";
import research from "@/assets/capability-research.webp";
import digital from "@/assets/capability-digital.webp";
import practical from "@/assets/capability-practical.webp";
import career from "@/assets/capability-career.webp";
import industry from "@/assets/capability-industry.webp";

const art: Record<string, string> = { academic, technology, programmes, research, digital, practical, career, industry };

type Line = { x1: number; y1: number; x2: number; y2: number };

const EcosystemHub = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState<number | null>(null);

  // Connectors are measured from the real layout: card's inner edge -> circle edge.
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const root = el.getBoundingClientRect();
      const circle = el.querySelector(".cap-circle") as HTMLElement | null;
      if (!circle || getComputedStyle(el).getPropertyValue("--cap-connect").trim() !== "1") { setLines([]); return; }
      const c = circle.getBoundingClientRect();
      const cx = c.left + c.width / 2, cy = c.top + c.height / 2, r = c.width / 2;
      const next: Line[] = [];
      el.querySelectorAll<HTMLElement>(".cap-card").forEach((card) => {
        const b = card.getBoundingClientRect();
        let x: number, y: number;
        if (b.bottom < c.top + 10) { x = b.left + b.width / 2 + (cx - (b.left + b.width / 2)) * 0.45; y = b.bottom; }
        else if (b.top > c.bottom - 10) { x = b.left + b.width / 2 + (cx - (b.left + b.width / 2)) * 0.45; y = b.top; }
        else { x = b.right < cx ? b.right : b.left; y = b.top + b.height / 2; }
        const a = Math.atan2(y - cy, x - cx);
        next.push({ x1: x - root.left, y1: y - root.top, x2: cx + r * Math.cos(a) - root.left, y2: cy + r * Math.sin(a) - root.top });
      });
      setBox({ w: root.width, h: root.height });
      setLines(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <section aria-label="Education ecosystem" className="cap-section">
      <div ref={wrap} className="cap-diagram">
        {lines.length > 0 && (
          <svg className="cap-lines" width={box.w} height={box.h} aria-hidden="true" focusable="false">
            {lines.map((l, i) => (
              <g key={i} className={active === i ? "is-active" : undefined}>
                <line {...l} />
                <circle cx={l.x1} cy={l.y1} r="5" />
                <circle cx={l.x2} cy={l.y2} r="5" />
              </g>
            ))}
          </svg>
        )}
        <div className="cap-centre">
          <div className="cap-circle">
            <p className="cap-company">Exafluence Inc.USA</p>
            <img src={penMark} alt="" width={84} height={84} className="cap-pen" />
            <p className="cap-name">Exafluence Education</p>
          </div>
        </div>
        {homepageCapabilities.map((cap, i) => (
          <Link key={cap.id} to={cap.path} className={`cap-card cap-card--${cap.id}`} style={{ ["--i" as string]: i }}
            onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
            <img src={art[cap.id]} alt="" className="cap-art" loading="lazy" />
            <h3 className="cap-title">{cap.title}</h3>
            <ul className="cap-points">{cap.capabilities.map((p) => <li key={p}>{p}</li>)}</ul>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default EcosystemHub;
