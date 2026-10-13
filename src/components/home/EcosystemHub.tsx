import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import {
  Landmark, Network, BookOpen, FlaskConical, Briefcase, Compass,
  Lightbulb, Award, LayoutGrid, MonitorPlay, Images, type LucideIcon,
} from "lucide-react";

type Weight = "strong" | "medium" | "light";
export type EcoNode = {
  title: string; line: string; path: string; icon: LucideIcon; weight: Weight;
  accent?: boolean; // subtle 3D icon accent
  x: number; y: number; // desktop position, % of stage
};

/** Edit nodes here — order is also the mobile journey order. */
export const ecosystemNodes: EcoNode[] = [
  { title: "Academic Collaborations", line: "SVU • XIME", path: "/academic-collaborations", icon: Landmark, weight: "strong", x: 12, y: 5 },
  { title: "Industry & Technology", line: "IBM • Exafluence Inc.", path: "/industry-collaborations", icon: Network, weight: "strong", x: 88, y: 5 },
  { title: "Programmes", line: "AI • Data • FinTech • Cloud • Quantum", path: "/programmes", icon: BookOpen, weight: "strong", accent: true, x: 11, y: 36 },
  { title: "Practical Learning", line: "Labs • Projects • Capstones", path: "/practical-learning", icon: FlaskConical, weight: "strong", x: 89, y: 36 },
  { title: "Internships & Exposure", line: "Internships • Industry Visits • ODC", path: "/internships", icon: Briefcase, weight: "medium", x: 11, y: 66 },
  { title: "Career Development", line: "Placements • Skills • Mentoring", path: "/career-development", icon: Compass, weight: "medium", x: 89, y: 66 },
  { title: "Research & Innovation", line: "Publications • Conferences • Hackathons", path: "/research-innovation", icon: Lightbulb, weight: "medium", accent: true, x: 37, y: 5 },
  { title: "Student Success", line: "Achievements • Placements • Career Growth", path: "/student-success", icon: Award, weight: "medium", accent: true, x: 63, y: 5 },
  { title: "Student’s Corner", line: "Resources • Updates • Downloads", path: "/students-corner", icon: LayoutGrid, weight: "light", x: 20, y: 96 },
  { title: "SkillShone", line: "Courses • Assessments • Certificates", path: "/skillshone", icon: MonitorPlay, weight: "light", accent: true, x: 80, y: 96 },
  { title: "Gallery & Highlights", line: "Events • Activities • Awards", path: "/gallery", icon: Images, weight: "light", x: 50, y: 96 },
];

const W = 1200, H = 780, CX = 600, CY = 380;

const Icon = ({ n }: { n: EcoNode }) => (
  <span className={`eco-icon ${n.accent ? "eco-icon-3d" : ""}`} aria-hidden>
    <n.icon className="h-4 w-4" strokeWidth={1.5} />
  </span>
);

const NodeBody = ({ n, i }: { n: EcoNode; i: number }) => (
  <>
    <Icon n={n} />
    <span className="min-w-0">
      <span className={`eco-title eco-${n.weight}`}>{n.title}</span>
      <span className="eco-line">{n.line}</span>
      <span className="eco-explore">Explore <ArrowRight className="h-3 w-3" /></span>
    </span>
    <span className="sr-only">{` (${i + 1} of ${ecosystemNodes.length})`}</span>
  </>
);

const Hub = ({ compact = false }: { compact?: boolean }) => (
  <div className={`eco-hub ${compact ? "eco-hub-compact" : ""}`}>
    <p className="eco-hub-name">Exafluence Education</p>
    <p className="eco-hub-tag">Where Academia, Industry &amp; Technology Converge</p>
  </div>
);

const EcosystemHub = () => {
  const [active, setActive] = useState<number | null>(null);
  // Connector path from hub to node: gentle curve
  const path = (n: EcoNode) => {
    const x = (n.x / 100) * W, y = (n.y / 100) * H;
    const mx = (CX + x) / 2, my = (CY + y) / 2;
    const bend = (x - CX) * 0.12;
    return `M${CX},${CY} Q${mx - bend},${my + Math.abs(bend) * 0.6} ${x},${y}`;
  };

  return (
    <section aria-labelledby="eco-heading" className="eco-section">
      <h1 id="eco-heading" className="sr-only">Exafluence Education — Where Academia, Industry &amp; Technology Converge</h1>

      {/* Desktop: open radial composition */}
      <div className={`eco-stage hidden lg:block ${active !== null ? "has-active" : ""}`}>
        <svg viewBox={`0 0 ${W} ${H}`} className="eco-svg" aria-hidden preserveAspectRatio="none">
          <defs>
            <pattern id="eco-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" className="eco-grid-line" />
            </pattern>
            <radialGradient id="eco-fade"><stop offset="0" stopColor="white" /><stop offset="1" stopColor="white" stopOpacity="0" /></radialGradient>
            <mask id="eco-mask"><circle cx={CX} cy={CY} r="420" fill="url(#eco-fade)" /></mask>
          </defs>
          <rect width={W} height={H} fill="url(#eco-grid)" mask="url(#eco-mask)" />
          {[180, 270, 370].map((r, i) => (
            <ellipse key={r} cx={CX} cy={CY} rx={r * 1.25} ry={r} className="eco-orbit" style={{ animationDelay: `${0.3 + i * 0.15}s` }} />
          ))}
          {ecosystemNodes.map((n, i) => (
            <g key={n.path} className={`eco-conn ${active === i ? "is-active" : ""}`} style={{ animationDelay: `${0.7 + i * 0.06}s` }}>
              <path d={path(n)} pathLength={1} />
              <circle cx={(n.x / 100) * W} cy={(n.y / 100) * H} r="3" />
            </g>
          ))}
        </svg>

        <div className="eco-center"><Hub /></div>

        {ecosystemNodes.map((n, i) => (
          <Link
            key={n.path}
            to={n.path}
            className={`eco-node eco-node-${n.weight} eco-edge-${i % 4} ${active === i ? "is-active" : ""}`}
            style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${1 + i * 0.07}s` }}
            onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)} onBlur={() => setActive(null)}
          >
            <NodeBody n={n} i={i} />
          </Link>
        ))}
      </div>

      {/* Tablet: hub + two-column ecosystem */}
      <div className="hidden md:block lg:hidden">
        <Hub />
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3">
          {ecosystemNodes.map((n, i) => (
            <li key={n.path}>
              <Link to={n.path} className={`eco-node eco-flow eco-node-${n.weight} eco-edge-${i % 4}`}><NodeBody n={n} i={i} /></Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile: vertical journey */}
      <div className="md:hidden">
        <Hub compact />
        <ol className="eco-journey">
          {ecosystemNodes.map((n, i) => (
            <li key={n.path}>
              <ArrowDown className="eco-journey-arrow" aria-hidden strokeWidth={1.25} />
              <Link to={n.path} className={`eco-node eco-flow eco-node-${n.weight} eco-edge-${i % 4}`}><NodeBody n={n} i={i} /></Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default EcosystemHub;
