/* Original collaboration-network symbol (client brief, 3 November 2026): three equally
   sized segments in a continuous loop around an open centre — deep navy, medium blue and
   muted teal on white. Each label sits beside its own segment with the supporting line
   underneath, closed by the caption. The institution segment names no college or school,
   and official organisation logos stay outside this symbol. */

type Tone = "navy" | "blue" | "teal";

type Segment = {
  key: string;
  place: "top" | "left" | "right";
  tone: Tone;
  title: string;
  line: string;
};

const SEGMENTS: Segment[] = [
  { key: "institutions", place: "top", tone: "navy", title: "Collaborating Institutions", line: "Academic expertise & programme delivery" },
  { key: "ibm", place: "right", tone: "blue", title: "IBM", line: "Technology knowledge & skills" },
  { key: "exafluence", place: "left", tone: "teal", title: "Exafluence Education", line: "Applied learning & industry mentoring" },
];

/* Three 100-degree arcs on one circle (centre 130,130, radius 88) with a 20-degree gap
   between them; a small joint bridges each gap so the loop reads as connected. */
const LoopSymbol = () => (
  <svg className="loop-svg" viewBox="0 0 260 260" aria-hidden="true" focusable="false">
    <path className="loop-seg loop-seg-navy" strokeWidth="22" d="M 62.59 73.43 A 88 88 0 0 1 197.41 73.43" />
    <path className="loop-seg loop-seg-blue" strokeWidth="22" d="M 212.69 99.90 A 88 88 0 0 1 145.28 216.66" />
    <path className="loop-seg loop-seg-teal" strokeWidth="22" d="M 114.72 216.66 A 88 88 0 0 1 47.31 99.90" />
    <circle className="loop-joint loop-joint-navy" cx="53.79" cy="86" r="6.5" />
    <circle className="loop-joint loop-joint-blue" cx="206.21" cy="86" r="6.5" />
    <circle className="loop-joint loop-joint-teal" cx="130" cy="218" r="6.5" />
  </svg>
);

const LoopLabel = ({ segment }: { segment: Segment }) => (
  <div className={`loop-label loop-label-${segment.place}`} data-segment={segment.key}>
    <span className="loop-title">
      <span className={`loop-dot loop-dot-${segment.tone}`} aria-hidden="true" />
      {segment.title}
    </span>
    <span className="loop-line">{segment.line}</span>
  </div>
);

const CollaborationLoop = () => (
  <section className="network-loop" aria-labelledby="network-loop-title">
    <div className="container">
      <h2 id="network-loop-title" className="sr-only">Collaboration network overview</h2>
      <div className="loop-map">
        <div className="loop-symbol"><LoopSymbol /></div>
        {SEGMENTS.map((segment) => <LoopLabel key={segment.key} segment={segment} />)}
        <p className="loop-caption">Academia · Technology · Applied Learning.</p>
      </div>
    </div>
  </section>
);

export default CollaborationLoop;
