import { useRef, useState, type KeyboardEvent } from "react";
import { Building2, Cpu, Globe2, Layers3, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import aiBook from "@/assets/about-ai-book.png";

export type AboutStoryData = {
  title: string;
  description: string;
  topics: { title: string; lines: string[] }[];
};

const icons = [Building2, Cpu, Globe2, Layers3, GraduationCap];

export default function AboutStory({ data }: { data: AboutStoryData }) {
  const [selected, setSelected] = useState<number | null>(null);
  const controls = useRef<(HTMLButtonElement | null)[]>([]);
  const topic = selected === null ? undefined : data.topics[selected];
  const paragraphs = topic?.lines.join(" ").split(/Our (mission|vision):\s*/i);

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
      <figure className="about-explorer-art">
        <img src={aiBook} alt="Silver and blue AI processor connected to an open book" width={1024} height={1024} />
      </figure>
      <div className="about-explorer-main">
        <div className="about-explorer-stage" aria-live="polite" aria-atomic="true">
          <div className="about-explorer-copy" key={selected ?? "intro"}>
            <h2>{topic?.title ?? data.title}</h2>
            {paragraphs ? <div className="about-explorer-lines">
              <p>{paragraphs[0]}</p>
              {paragraphs.length > 1 && paragraphs.slice(1).map((text, i) => i % 2 === 0 ? (
                <p key={text}><span className="about-explorer-label">Our {text === "mission" ? "Mission" : "Vision"}</span>{" "}{paragraphs[i + 2]}</p>
              ) : null)}
            </div>
              : <p className="about-explorer-description">{data.description}</p>}
          </div>
        </div>
        <div className="about-explorer-topics" role="group" aria-label="About Us topics">
          {data.topics.map((item, i) => {
            const Icon = icons[i] ?? Cpu;
            return (
              <Button key={item.title} ref={(element) => { controls.current[i] = element; }}
                variant="outline" aria-pressed={selected === i} onClick={() => setSelected(i)} onKeyDown={(event) => navigate(event, i)}
                className={`about-topic${i === data.topics.length - 1 ? " about-topic--education" : ""}`}>
                <span className="about-topic-number">{String(i + 1).padStart(2, "0")}</span>
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
