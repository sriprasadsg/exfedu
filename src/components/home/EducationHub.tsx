import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap } from "lucide-react";
import { arms } from "@/data/site";

// Fixed desktop positions and connector endpoints share the same canvas.
const W = 1280, H = 920, CX = 640, CY = 423, RING = 190;
const positions = [[400, 85], [880, 85], [140, 260], [140, 440], [140, 620], [1140, 260], [1140, 440], [1140, 620], [380, 800], [640, 850], [900, 800]];
const placed = arms.map((arm, i) => {
  const [x, y] = positions[i] ?? [CX, CY];
  return { ...arm, x, y, angle: Math.atan2(y - CY, x - CX) };
});

const EducationHub = () => {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section aria-label="Exafluence Education and its connected arms" className="education-diagram mx-auto" data-active={active !== null}>
      <svg className="education-connectors" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <circle cx={CX} cy={CY} r={RING + 26} className="hub-orbit" />
        <circle cx={CX} cy={CY} r={RING} className="hub-ring" />
        {placed.map((p) => {
          const x = CX + RING * Math.cos(p.angle), y = CY + RING * Math.sin(p.angle);
          return <g key={p.path} className={`hub-connector ${active === p.path ? "is-active" : ""}`}><line x1={x} y1={y} x2={p.x} y2={p.y} /><circle cx={x} cy={y} r="3" /></g>;
        })}
      </svg>
      <div className="education-centre">
        <GraduationCap aria-hidden="true" className="h-9 w-9 text-primary" strokeWidth={1.25} />
        <h1 className="font-display">Exafluence<br />Education</h1>
        <span aria-hidden="true" className="my-4 h-px w-12 bg-border" />
        <p className="text-muted-foreground">Where Academia, Industry<br />&amp; Technology Converge.</p>
      </div>
      <div className="education-arms">
        {placed.map((p) => (
          <Link key={p.path} to={p.path} className="education-arm" data-priority={p.priority}
            style={{ left: `${p.x / W * 100}%`, top: `${p.y / H * 100}%` }}
            onMouseEnter={() => setActive(p.path)} onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(p.path)} onBlur={() => setActive(null)}>
            <span className="education-icon"><p.icon aria-hidden="true" strokeWidth={1.4} /></span>
            <div className="education-arm-content">
              <h2>{p.title}</h2><p className="text-muted-foreground">{p.subtitle}</p>
              <span className="education-explore">Explore <ArrowRight className="h-3 w-3" aria-hidden="true" /></span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
export default EducationHub;
