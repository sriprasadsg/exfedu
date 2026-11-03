import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import type { Organisation } from "@/data/site";
import svuLaptopDashboard from "@/assets/svu-laptop-dashboard.png";

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

/* XIME carries an original AI–FinTech layers composition (client brief, 3 November 2026):
   four thin isometric platforms stacked upward — financial data supports AI and machine
   learning, then FinTech applications, then business insights. One small icon per platform
   with its label beside it, subtle vertical supports in the gaps, white and light-grey
   surfaces, dark navy labels and restrained XIME-red accents on two selected edges.
   Conceptual illustration only: it is not a software platform and implies no outcomes. */
const XL = { cx: 112, cy0: 66, step: 60, w: 90, h: 38, t: 7 };
const xlCy = (i: number) => XL.cy0 + i * XL.step;
const xlTop = (cy: number) => `M${XL.cx} ${cy - XL.h}L${XL.cx + XL.w} ${cy}L${XL.cx} ${cy + XL.h}L${XL.cx - XL.w} ${cy}Z`;
const xlLeft = (cy: number) => `M${XL.cx - XL.w} ${cy}L${XL.cx} ${cy + XL.h}L${XL.cx} ${cy + XL.h + XL.t}L${XL.cx - XL.w} ${cy + XL.t}Z`;
const xlRight = (cy: number) => `M${XL.cx + XL.w} ${cy}L${XL.cx} ${cy + XL.h}L${XL.cx} ${cy + XL.h + XL.t}L${XL.cx + XL.w} ${cy + XL.t}Z`;

/* One small icon per layer, drawn upright on the front of its platform. */
const DataIcon = () => <g className="xl-icon"><rect x={-9} y={-7} width={18} height={14} rx={2} /><path d="M-9 -1.5h18M-1.5 -1.5V7" /></g>;
const ModelIcon = () => <g className="xl-icon"><path d="M-6 5.5L0 -6L6 5.5M-6 5.5h12" /><circle cx={0} cy={-6} r={2.4} /><circle cx={-6} cy={5.5} r={2.4} /><circle cx={6} cy={5.5} r={2.4} /></g>;
const PayIcon = () => <g className="xl-icon"><rect x={-9} y={-6.5} width={18} height={13} rx={2.5} /><path d="M-9 -2h18M-5 3h6" /></g>;
const InsightIcon = () => <g className="xl-icon"><path d="M-9 7.5h18" /><rect x={-8} y={1} width={4} height={6.5} /><rect x={-2} y={-3} width={4} height={10.5} /><rect x={4} y={-7} width={4} height={14.5} /></g>;

const XLAYERS = [
  { title: "Business Insights", sub: "Dashboard and decision indicators", Icon: InsightIcon },
  { title: "FinTech Applications", sub: "Payments, risk and financial analytics", Icon: PayIcon },
  { title: "AI & Machine Learning", sub: "Connected nodes and predictive models", Icon: ModelIcon },
  { title: "Financial Data", sub: "Transactions, tables and data streams", Icon: DataIcon },
];

const XL_LABEL = "Illustration: four stacked platforms. Financial data supports AI and machine learning, which supports FinTech applications, which supports business insights.";

const XimeLayersView = ({ compact }: { compact?: boolean }) => (
  <svg className={`bs-svg xl-svg ${compact ? "xl-compact" : "xl-full"}`} viewBox={`0 0 ${compact ? 380 : 450} 320`} role="img" aria-label={XL_LABEL}>
    <ellipse className="xl-shadow" cx={XL.cx} cy={304} rx={77} ry={11} />
    {/* Supports run beneath each platform, so only the stretch between platforms shows. */}
    {[0, 1, 2].map((j) => [XL.cx - 55, XL.cx + 55].map((x) => (
      <g key={`${j}-${x}`}>
        <path className="xl-link" d={`M${x} ${xlCy(j) + 12}V${xlCy(j + 1) - 12}`} />
        <path className="xl-chev" d={`M${x - 3.5} ${xlCy(j) + 35}l3.5 -3.5 3.5 3.5`} />
      </g>
    )))}
    {[3, 2, 1, 0].map((i) => {
      const cy = xlCy(i);
      const { Icon } = XLAYERS[i];
      return (
        <g key={XLAYERS[i].title}>
          <path className="xl-fl" d={xlLeft(cy)} />
          <path className="xl-fr" d={xlRight(cy)} />
          <path className="xl-top" d={xlTop(cy)} />
          <g transform={`translate(${XL.cx} ${cy + 19})`}><Icon /></g>
        </g>
      );
    })}
    {/* Restrained XIME-red accents along two selected edges. */}
    <path className="xl-edge" d={`M${XL.cx - XL.w} ${xlCy(0)}L${XL.cx} ${xlCy(0) + XL.h}`} />
    <path className="xl-edge" d={`M${XL.cx + XL.w} ${xlCy(3)}L${XL.cx} ${xlCy(3) + XL.h}`} />
    {XLAYERS.map(({ title, sub }, i) => {
      const cy = xlCy(i);
      return (
        <g key={title}>
          <path className="xl-leader" d={`M${XL.cx + XL.w + 4} ${cy}H${XL.cx + XL.w + 18}`} />
          <text className="xl-title" x={226} y={compact ? cy + 4 : cy - 3}>{title}</text>
          {!compact && <text className="xl-sub" x={226} y={cy + 12}>{sub}</text>}
        </g>
      );
    })}
  </svg>
);

const XimeLayers = () => (
  <figure className="banner-story">
    <XimeLayersView />
    <XimeLayersView compact />
  </figure>
);

const art: Record<string, () => JSX.Element> = { SVU: SvuArt, IBM: IbmArt };

const BannerStory = ({ organisation, active }: { organisation: Organisation; active: boolean }) => {
  const [run, setRun] = useState(0);
  useEffect(() => { if (active) setRun(r => r + 1); }, [active]);
  /* SVU carries a static 3D laptop-and-dashboard mockup (client brief, 3 Nov 2026):
     a conceptual Data Science learning illustration, not a real platform. */
  if (organisation === "SVU") {
    return (
      <figure className="banner-story">
        <img className="bs-static" src={svuLaptopDashboard} alt="Illustration: a laptop with a Python analysis workspace and a floating data dashboard showing a dataset, a chart and insights" loading="lazy" />
      </figure>
    );
  }
  if (organisation === "XIME") return <XimeLayers />;
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
