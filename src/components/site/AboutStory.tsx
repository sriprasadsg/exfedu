import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowUpRight, Building2, Cpu, Globe2, Layers3, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import enterprise from "@/assets/about-enterprise.png";
import expertise from "@/assets/about-expertise.png";
import industries from "@/assets/about-industries.png";
import education from "@/assets/about-education.png";
import RotatingGlobe from "@/components/site/RotatingGlobe";

export type AboutStoryData = {
  title: string;
  description: string;
  mission?: string;
  vision?: string;
  collaborate?: string;
  action?: { label: string; href: string };
  topics: { title: string; lines: string[] }[];
};

const icons = [Building2, Cpu, Globe2, Layers3, GraduationCap];

// One artwork per topic, in topic order. The four silver-and-sky-blue scenes are
// preloaded stills; Global Presence is the live rotating globe, so it has no src.
// base is where each artwork rests inside its square canvas, measured from the
// PNG alpha channel, so the shared soft shadow sits under the artwork's foot.
const illustrations = [
  { src: enterprise, alt: "Silver enterprise server connected to an established technology network", base: 0.857 },
  { src: expertise, alt: "AI processor connected to data pipelines, databases and analytics nodes", base: 0.818 },
  { src: "", alt: "Slowly rotating globe showing the Earth", base: 1 },
  { src: industries, alt: "Connected finance, healthcare, retail, energy, telecommunications and manufacturing symbols", base: 0.898 },
  { src: education, alt: "Open silver book connected to a navy AI processor for industry-informed learning", base: 0.825 },
];

function TopicCopy({ title, lines }: { title: string; lines: string[] }) {
  const paragraphs = lines.join(" ").split(/Our (mission|vision):\s*/i);
  return <>
    <h2>{title}</h2>
    <div className="about-explorer-lines">
      <p>{paragraphs[0]}</p>
      {paragraphs.slice(1).map((text, i) => i % 2 === 0 ? (
        <p key={text}><span className="about-explorer-label">Our {text === "mission" ? "Mission" : "Vision"}</span>{" "}{paragraphs[i + 2]}</p>
      ) : null)}
    </div>
  </>;
}

export default function AboutStory({ data }: { data: AboutStoryData }) {
  const [selected, setSelected] = useState<number | null>(null);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const artworkIndex = selected ?? illustrations.length - 1;

  const navigate = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = data.topics.length - 1;
    const next = event.key === "ArrowRight" ? (index + 1) % data.topics.length
      : event.key === "ArrowLeft" ? (index + last) % data.topics.length
      : event.key === "Home" ? 0 : event.key === "End" ? last : null;
    if (next === null) return;
    event.preventDefault();
    controls.current[next]?.focus();
    setSelected(next);
  };

  return (
    <section className="about-explorer" aria-label="About Exafluence Education">
      <figure className="about-explorer-art" style={{ "--art-base": illustrations[artworkIndex].base } as CSSProperties}>
        {illustrations.map((image, i) => {
          const active = i === artworkIndex;
          return (
            <span key={image.alt}
              className={`about-art-layer${active ? " about-art-layer--active" : ""}${image.src ? " about-art-layer--float" : ""}`}
              aria-hidden={!active}>
              {image.src
                ? <img src={image.src} alt={active ? image.alt : ""} width={1024} height={1024} />
                : active && <RotatingGlobe label={image.alt} />}
            </span>
          );
        })}
      </figure>
      <div className="about-explorer-main">
        <div className="about-explorer-stage" aria-live="polite" aria-atomic="true">
          <div className={`about-explorer-copy${selected === null ? " about-explorer-copy--active" : ""}`} aria-hidden={selected !== null}>
            <h2>{data.title}</h2>
            <div className="about-explorer-lines">
              <p className="about-explorer-description">{data.description}</p>
              {data.mission && <p><span className="about-explorer-label">Our Mission</span> {data.mission}</p>}
              {data.vision && <p><span className="about-explorer-label">Our Vision</span> {data.vision}</p>}
              {data.collaborate && <p><span className="about-explorer-label">Collaborate With Us</span> {data.collaborate}</p>}
            </div>
            {data.action && <Button asChild className="about-explorer-cta"><a href={data.action.href}>{data.action.label}<ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" /></a></Button>}
          </div>
          {data.topics.map((topic, i) => <div key={topic.title}
            className={`about-explorer-copy${selected === i ? " about-explorer-copy--active" : ""}`} aria-hidden={selected !== i}>
            <TopicCopy {...topic} />
          </div>)}
        </div>
        <div className="about-explorer-topics" role="group" aria-label="About Us topics">
          {data.topics.map((item, i) => {
            const Icon = icons[i] ?? Cpu;
            return (
              <Button key={item.title} ref={(element) => { controls.current[i] = element; }}
                variant="outline" aria-pressed={selected === i} onMouseEnter={() => setSelected(i)} onFocus={() => setSelected(i)}
                onClick={() => setSelected(i)} onKeyDown={(event) => navigate(event, i)}
                className={`about-topic${i === data.topics.length - 1 ? " about-topic--education" : ""}`}>
                <Icon size={15} strokeWidth={1.5} aria-hidden="true" />
                <span>{item.title}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
