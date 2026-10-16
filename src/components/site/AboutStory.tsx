import { Link } from "react-router-dom";
import {
  ArrowRight, Users, Building2, Eye, Target, Wrench, Handshake, TrendingUp, Lightbulb, Rocket,
  Landmark, HeartPulse, ShoppingBag, Zap, RadioTower, Factory, Globe2, Sparkles, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Tone } from "@/data/site";

export type AboutStoryData = {
  intro: { title: string; text: string };
  who: { title: string; text: string };
  foundation: { title: string; text: string };
  vision: string; mission: string;
  values: { title: string; text: string }[];
  sectorsNote: string;
  sectors: { title: string; text: string }[];
  global: { title: string; text: string };
  next: { title: string; text: string };
};

const valueIcons: LucideIcon[] = [Wrench, Handshake, TrendingUp, Lightbulb, Rocket];
const sectorIcons: LucideIcon[] = [Landmark, HeartPulse, ShoppingBag, Zap, RadioTower, Factory];
const tones: Tone[] = ["blue", "teal", "amber", "violet"];

const Icon3D = ({ icon: I, tone, i = 0, size = "md" }: { icon: LucideIcon; tone: Tone; i?: number; size?: "md" | "lg" }) => (
  <span className={`icon3d icon3d--${tone} icon3d--${size}`} style={{ animationDelay: `${-i * 0.7}s` }} aria-hidden>
    <I strokeWidth={1.8} />
  </span>
);

export default function AboutStory({ data }: { data: AboutStoryData }) {
  return (
    <div className="about-story">
      {/* Intro: feature panel + who/foundation cards */}
      <section className="about-intro">
        <div className="about-intro-feature">
          <Icon3D icon={Sparkles} tone="blue" size="lg" />
          <p className="about-kicker">Exafluence Education</p>
          <h2 className="about-feature-title">{data.intro.title}</h2>
          <p className="about-feature-text">{data.intro.text}</p>
        </div>
        <div className="about-intro-cards">
          {[{ ...data.who, icon: Users, tone: "teal" as Tone }, { ...data.foundation, icon: Building2, tone: "violet" as Tone }].map((c, i) => (
            <article key={c.title} className="about-card about-rise" style={{ animationDelay: `${i * 0.12}s` }}>
              <Icon3D icon={c.icon} tone={c.tone} i={i + 1} />
              <p className="about-kicker">0{i + 1}</p>
              <h3 className="about-card-title">{c.title}</h3>
              <p className="about-card-text">{c.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Vision & mission */}
      <section className="about-vm">
        <article className="about-vm-card about-vm-card--vision">
          <Icon3D icon={Eye} tone="amber" />
          <div><h3>Our Vision</h3><p>{data.vision}</p></div>
        </article>
        <article className="about-vm-card about-vm-card--mission">
          <Icon3D icon={Target} tone="teal" i={2} />
          <div><h3>Our Mission</h3><p>{data.mission}</p></div>
        </article>
      </section>

      {/* Values */}
      <section>
        <h2 className="site-section-title font-display font-normal">How We Create Value</h2>
        <div className="about-values">
          {data.values.map((v, i) => (
            <article key={v.title} className={`about-value about-rise tone-edge--${tones[i % 4]}`} style={{ animationDelay: `${i * 0.08}s` }}>
              <Icon3D icon={valueIcons[i] ?? Sparkles} tone={tones[i % 4]} i={i} />
              <h3 className="about-card-title">{v.title}</h3>
              <p className="about-card-text">{v.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Sectors */}
      <section>
        <h2 className="site-section-title font-display font-normal">Industry Perspectives Across Sectors</h2>
        <p className="mt-2 max-w-3xl text-muted-foreground">{data.sectorsNote}</p>
        <div className="about-sectors">
          {data.sectors.map((s, i) => (
            <article key={s.title} className="about-sector">
              <Icon3D icon={sectorIcons[i] ?? Globe2} tone={tones[i % 4]} i={i} />
              <div><h3 className="about-card-title">{s.title}</h3><p className="about-card-text">{s.text}</p></div>
            </article>
          ))}
        </div>
      </section>

      {/* Global + next */}
      <section className="about-duo">
        <article className="about-card">
          <Icon3D icon={Globe2} tone="blue" />
          <h3 className="about-card-title">{data.global.title}</h3>
          <p className="about-card-text">{data.global.text}</p>
        </article>
        <article className="about-card">
          <Icon3D icon={Rocket} tone="violet" i={3} />
          <h3 className="about-card-title">{data.next.title}</h3>
          <p className="about-card-text">{data.next.text}</p>
        </article>
      </section>

      <section className="about-cta">
        <div>
          <h2 className="about-feature-title">Let’s Build What Comes Next</h2>
          <p className="about-feature-text">Explore opportunities in academic collaboration, institutional training, workforce development and applied technology learning.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild className="about-cta-primary"><Link to="/programmes">Explore Programmes <ArrowRight className="h-4 w-4" /></Link></Button>
          <Button asChild variant="outline" className="about-cta-ghost"><a href="#partner-enquiry-form">Discuss a Partnership</a></Button>
        </div>
      </section>
    </div>
  );
}
