import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { homepageCapabilities } from "@/data/site";
import penMark from "@/assets/pen-mark.png";

type Line = { x1: number; y1: number; x2: number; y2: number };

// Data order alternates left/right, so even indexes go left and odd go right.
const left = homepageCapabilities.filter((_, i) => i % 2 === 0);
const right = homepageCapabilities.filter((_, i) => i % 2 === 1);

const EcosystemHub = () => {
  const wrap = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });

  // Measure real positions so every connector starts on the circle edge and ends at its dot.
  useLayoutEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const measure = () => {
      const root = el.getBoundingClientRect();
      const circle = el.querySelector(".cap-circle") as HTMLElement | null;
      if (!circle || getComputedStyle(el).getPropertyValue("--cap-connect").trim() !== "1") { setLines([]); return; }
      const c = circle.getBoundingClientRect();
      const cx = c.left + c.width / 2 - root.left, cy = c.top + c.height / 2 - root.top, r = c.width / 2;
      const next: Line[] = [];
      el.querySelectorAll<HTMLElement>(".cap-dot").forEach((d) => {
        const b = d.getBoundingClientRect();
        const x2 = b.left + b.width / 2 - root.left, y2 = b.top + b.height / 2 - root.top;
        const a = Math.atan2(y2 - cy, x2 - cx);
        next.push({ x1: cx + r * Math.cos(a), y1: cy + r * Math.sin(a), x2, y2 });
      });
      setBox({ w: root.width, h: root.height });
      setLines(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const renderCol = (items: typeof homepageCapabilities, side: "left" | "right") => (
    <ul className={`cap-col cap-col--${side}`}>
      {items.map((arm) => (
        <li key={arm.id}>
          <Link to={arm.path} className="cap-link">
            <span className="cap-title">{arm.title}</span>
            <span className="cap-dot" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-label="Education ecosystem" className="cap-section">
      <div ref={wrap} className="cap-diagram">
        {lines.length > 0 && (
          <svg className="cap-lines" width={box.w} height={box.h} aria-hidden="true" focusable="false">
            {lines.map((l, i) => <line key={i} {...l} />)}
          </svg>
        )}
        <div className="cap-centre">
          <div className="cap-circle">
            <p className="cap-company">Exafluence Inc.USA</p>
            <img src={penMark} alt="" width={84} height={84} className="cap-pen" />
            <p className="cap-name">Exafluence Education</p>
          </div>
        </div>
        {renderCol(left, "left")}
        {renderCol(right, "right")}
      </div>
    </section>
  );
};
export default EcosystemHub;
