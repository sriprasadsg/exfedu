import { Link } from "react-router-dom";
import { playCoinDrop } from "@/lib/coinDrop";
import {
  Landmark, Cpu, Lightbulb, Briefcase, Users, GraduationCap,
  type LucideIcon,
} from "lucide-react";

type Way = { title: string; line: string; body: string; path: string; icon: LucideIcon; color: string };

/** Edit partnership routes here — order is also the mobile order. */
const ways: Way[] = [
  {
    title: "Academic Collaborations",
    line: "Universities & institutions",
    body: "Co-develop curriculum, faculty enablement and programme delivery with Exafluence Education.",
    path: "/academic-collaborations",
    icon: Landmark,
    color: "214 88% 52%",
  },
  {
    title: "Industry & Technology",
    line: "Technology partners",
    body: "Bring industry platforms, tools and real projects into programmes and student work.",
    path: "/industry-collaborations",
    icon: Cpu,
    color: "258 78% 58%",
  },
  {
    title: "Research & Innovation",
    line: "Joint research",
    body: "Work together on publications, conferences, hackathons and applied innovation projects.",
    path: "/research-innovation",
    icon: Lightbulb,
    color: "32 95% 47%",
  },
  {
    title: "Internships & Exposure",
    line: "Host students",
    body: "Offer internships, industry visits and open-day experiences to build your future talent pool.",
    path: "/internships",
    icon: Briefcase,
    color: "172 62% 40%",
  },
  {
    title: "Career Development",
    line: "Mentoring & skills",
    body: "Mentor students, share industry skills sessions and take part in career guidance.",
    path: "/career-development",
    icon: Users,
    color: "342 80% 56%",
  },
  {
    title: "Programmes & Professional Learning",
    line: "Workforce learning",
    body: "Shape short courses and practitioner learning for your teams and for students.",
    path: "/programmes",
    icon: GraduationCap,
    color: "142 58% 40%",
  },
];

const WaysToPartner = () => (
  <section aria-labelledby="ways-heading" className="ways-section">
    <p className="ways-eyebrow">Collaborate with us</p>
    <h2 id="ways-heading" className="ways-heading">
      Academic Partnerships. Industry Expertise. Shared Progress.
    </h2>
    <p className="ways-intro">
      Connect with Exafluence to co-develop programmes, advance applied research and bring real-world
      experience into learning.
    </p>

    <ul className="ways-grid">
      {ways.map((w) => (
        <li key={w.path}>
          <Link to={w.path} className="ways-card" onMouseEnter={playCoinDrop}>
            <span
              className="ways-icon"
              aria-hidden
              style={{ "--icon-c": w.color } as React.CSSProperties}
            >
              <w.icon className="h-6 w-6" strokeWidth={1.8} />
            </span>
            <span className="min-w-0">
              <span className="ways-title">{w.title}</span>
              <span className="ways-line">{w.line}</span>
              <span className="ways-body">{w.body}</span>
              <span className="ways-cta">
                Explore <ArrowGlyph />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  </section>
);

const ArrowGlyph = () => (
  <svg viewBox="0 0 16 16" className="ways-arrow" aria-hidden>
    <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default WaysToPartner;
