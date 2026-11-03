import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { homepageCapabilities } from "@/data/site";
import penCap from "@/assets/pen-mark-cap.png";
import penNib from "@/assets/pen-mark-nib.png";
import { GraduationCap, Cpu, BookOpenCheck, FlaskConical, MonitorSmartphone, Wrench, BriefcaseBusiness, Factory, type LucideIcon } from "lucide-react";

const art: Record<string, LucideIcon> = { academic: GraduationCap, technology: Cpu, programmes: BookOpenCheck, research: FlaskConical, digital: MonitorSmartphone, practical: Wrench, career: BriefcaseBusiness, industry: Factory };

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
        const bx = b.left + b.width / 2, by = b.top + b.height / 2;
        const dx = cx - bx, dy = cy - by;
        const reach = Math.min(dx === 0 ? Infinity : b.width / 2 / Math.abs(dx), dy === 0 ? Infinity : b.height / 2 / Math.abs(dy));
        const x = bx + dx * reach, y = by + dy * reach;
        const a = Math.atan2(y - cy, x - cx);
        next.push({ x1: x - root.left, y1: y - root.top, x2: cx + r * Math.cos(a) - root.left, y2: cy + r * Math.sin(a) - root.top });
      });
      setBox({ w: root.width, h: root.height });
      setLines(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.querySelectorAll(".cap-card, .cap-circle").forEach((node) => ro.observe(node));
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
                <circle className="cap-connector-dot" cx={l.x1} cy={l.y1} r="5" style={{ animationDelay: `${-i * 0.27}s` }} />
                <circle className="cap-connector-dot" cx={l.x2} cy={l.y2} r="5" style={{ animationDelay: `${-i * 0.27 - 0.8}s` }} />
              </g>
            ))}
          </svg>
        )}
        <div className="cap-centre">
          <div className="cap-circle">
            <p className="cap-company"><span className="brand-exa">Exa</span><span className="brand-fluence">fluence</span> Inc.USA</p>
            <span className="cap-pen" aria-hidden="true">
              <img src={penCap} alt="" className="cap-pen-cap" />
              <img src={penNib} alt="" className="cap-pen-nib" />
            </span>
            <p className="cap-name">Exafluence Education</p>
          </div>
        </div>
        {homepageCapabilities.map((cap, i) => (
          <Link key={cap.id} to={cap.path} className={`cap-card cap-card--${cap.id}`} style={{ ["--i" as string]: i }}
            onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(i)} onBlur={() => setActive(null)}>
            {(() => { const Icon = art[cap.id] ?? GraduationCap; return <span className="cap-art" aria-hidden="true"><Icon strokeWidth={1.75} /></span>; })()}
            <h3 className="cap-title">{cap.title}</h3>
            <ul className="cap-points">{cap.capabilities.map((p) => <li key={p}>{p}</li>)}</ul>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default EcosystemHub;
