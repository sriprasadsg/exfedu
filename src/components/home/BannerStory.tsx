import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Organisation } from "@/data/site";
import svuLaptopDashboard from "@/assets/svu-laptop-dashboard-v2.png";

/** Conceptual three-stage learning illustrations for the collaboration banners.
 * Stages reveal over ~6s, then hold; a replay control restarts the sequence.
 * Purely illustrative — no figures, no live tools. */
const labels: Record<string, [string, string, string]> = {
  SVU: ["Explore Data", "Analyse", "Discover Insights"],
  IBM: ["Explore", "Build", "Apply"],
};
const titles: Record<string, string> = {
  SVU: "Illustration: a dataset becomes a chart, then a highlighted pattern",
  IBM: "Illustration: a code panel connects to a computing diagram with a small quantum circuit, then an output",
};

const Frame = ({ x }: { x: number }) => <rect x={x} y={20} width={112} height={112} rx={12} className="bs-frame" />;
const Arrow = ({ x }: { x: number }) => <g className={`bs-arrow ${x < 200 ? "bs-a1" : "bs-a2"}`}><path d={`M${x} 76h22`} /><path d={`M${x + 16} 70l6 6-6 6`} /></g>;

const SvuArt = () => <>
  <g className="bs-stage bs-s1"><Frame x={4} />
    {[0, 1, 2, 3].map(r => <g key={r}>{[0, 1, 2].map(c => <rect key={c} x={18 + c * 30} y={38 + r * 22} width={24} height={12} rx={3} className={r === 0 ? "bs-fill-soft" : "bs-cell"} />)}</g>)}
  </g>
  <Arrow x={120} />
  <g className="bs-stage bs-s2"><Frame x={146} />
    <path d="M160 116h84M160 116V36" className="bs-axis" />
    {[[168, 96], [180, 88], [192, 98], [204, 70], [216, 62], [228, 50], [196, 80], [222, 74]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={3.5} className="bs-dot" />)}
  </g>
  <Arrow x={262} />
  <g className="bs-stage bs-s3"><Frame x={288} />
    {/* small network inspired by TensorFlow Playground */}
    {[[306, 50], [306, 76], [306, 102]].flatMap(a => [[344, 60], [344, 92]].map(b => <path key={`${a}${b}`} d={`M${a[0]} ${a[1]}L${b[0]} ${b[1]}`} className="bs-link" />))}
    {[[344, 60], [344, 92]].map(a => <path key={`o${a}`} d={`M${a[0]} ${a[1]}L380 76`} className="bs-link bs-link-hi" />)}
    {[[306, 50], [306, 76], [306, 102], [344, 60], [344, 92]].map(([cx, cy], i) => <circle key={i} cx={cx} cy={cy} r={6} className="bs-node" />)}
    <circle cx={380} cy={76} r={9} className="bs-node bs-node-hi" />
  </g>
</>;

const IbmArt = () => <>
  <g className="bs-stage bs-s1"><Frame x={4} />
    <rect x={4} y={20} width={112} height={18} rx={0} className="bs-fill-soft" style={{ clipPath: "inset(0 round 12px 12px 0 0)" }} />
    {[0, 1, 2].map(i => <circle key={i} cx={16 + i * 9} cy={29} r={2.5} className="bs-cell" />)}
    {[[18, 56, 50], [28, 72, 60], [28, 88, 44], [18, 104, 66], [18, 120, 34]].map(([x, y, w], i) => <rect key={i} x={x} y={y - 4} width={w} height={6} rx={3} className={i === 1 ? "bs-fill-accent" : "bs-cell"} />)}
  </g>
  <Arrow x={120} />
  <g className="bs-stage bs-s2"><Frame x={146} />
    {/* quantum-circuit styled after composer diagrams: two wires, H gate, CNOT */}
    {[56, 92].map(y => <path key={y} d={`M158 ${y}h76`} className="bs-axis" />)}
    <rect x={168} y={46} width={20} height={20} rx={3} className="bs-gate" /><text x={178} y={60} className="bs-gate-t">H</text>
    <path d="M208 56v36" className="bs-axis" /><circle cx={208} cy={56} r={4} className="bs-node-fill" />
    <circle cx={208} cy={92} r={8} className="bs-node" /><path d="M200 92h16M208 84v16" className="bs-axis" />
    <rect x={160} y={108} width={72} height={14} rx={7} className="bs-fill-soft" />
  </g>
  <Arrow x={262} />
  <g className="bs-stage bs-s3"><Frame x={288} />
    <path d="M304 116h80" className="bs-axis" />
    {[[312, 30], [330, 54], [348, 54], [366, 30]].map(([x, h], i) => <rect key={i} x={x} y={116 - h} width={12} height={h} rx={2} className={i === 1 || i === 2 ? "bs-fill-accent" : "bs-cell"} />)}
    <path d="M320 44l10 10 20-20" className="bs-check" />
  </g>
</>;

const art: Record<string, () => JSX.Element> = { SVU: SvuArt, IBM: IbmArt };

/* Which banners carry an illustration. XIME carries none (client brief, 3 November 2026),
   so its slide gives the text panel the full width instead of an empty artwork column. */
export const hasBannerStory = (organisation: Organisation) => organisation === "SVU" || organisation === "IBM";

const BannerStory = ({ organisation, active }: { organisation: Organisation; active: boolean }) => {
  const [run, setRun] = useState(0);
  useEffect(() => { if (active) setRun(r => r + 1); }, [active]);
  if (!hasBannerStory(organisation)) return null;

  /* SVU carries a static 3D laptop-and-dashboard mockup (client brief, 3 Nov 2026):
     a conceptual Data Science learning illustration, not a real platform. The client supplied a
     replacement render the same day, so this points at that artwork and the earlier one stays
     archived in the project as svu-laptop-dashboard-previous. */
  if (organisation === "SVU") {
    return (
      <figure className="banner-story">
        <img className="bs-static" src={svuLaptopDashboard} alt="Illustration: a laptop with a Python analysis workspace and a floating Data Science dashboard showing a dataset, a chart, an insight and the technologies used" loading="lazy" />
      </figure>
    );
  }
  const Art = art[organisation] ?? SvuArt;
  const [a, b, c] = labels[organisation] ?? labels.SVU;
  return (
    <figure className="banner-story">
      <svg key={run} className="bs-svg" viewBox="0 0 404 172" role="img" aria-label={titles[organisation]}>
        <Art />
        {[a, b, c].map((t, i) => <text key={t} x={60 + i * 142} y={160} textAnchor="middle" className={`bs-label bs-stage bs-s${i + 1}`}>{t}</text>)}
      </svg>
      <button type="button" className="bs-replay" aria-label="Replay illustration" tabIndex={active ? 0 : -1} onClick={() => setRun(r => r + 1)}>
        <RotateCcw size={13} aria-hidden="true" />
      </button>
    </figure>
  );
};
export default BannerStory;
