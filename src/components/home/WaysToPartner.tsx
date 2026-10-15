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
    body: "Collaborate on curriculum development, faculty development and programme delivery that connect academic foundations with industry practice.",
    path: "/academic-collaborations",
    icon: Landmark,
    color: "214 88% 52%",
  },
  {
    title: "Industry & Technology",
    line: "Technology partners",
    body: "Bring technology expertise, industry tools and practical business challenges into learning and project development.",
    path: "/industry-collaborations",
    icon: Cpu,
    color: "258 78% 58%",
  },
  {
    title: "Research & Innovation",
    line: "Joint research",
    body: "Explore collaborative research, knowledge exchange and applied projects that address challenges in education and industry.",
    path: "/research-innovation",
    icon: Lightbulb,
    color: "32 95% 47%",
  },
  {
    title: "Internships & Industry Engagement",
    line: "Workplace experience",
    body: "Connect learners with workplace experience through internships, industry interactions and mentored projects.",
    path: "/internships",
    icon: Briefcase,
    color: "172 62% 40%",
  },
  {
    title: "Mentoring & Career Development",
    line: "Mentoring & skills",
    body: "Strengthen professional skills and career readiness through mentoring, expert sessions and industry engagement.",
    path: "/career-development",
    icon: Users,
    color: "342 80% 56%",
  },
  {
    title: "Professional & Workforce Learning",
    line: "Workforce learning",
    body: "Develop focused learning programmes that address emerging technologies, professional development and organisational skill needs.",
    path: "/programmes",
    icon: GraduationCap,
    color: "142 58% 40%",
  },
];

const WaysToPartner = () => (
  <section aria-labelledby="ways-heading" className="ways-section">
    <p className="ways-eyebrow">Exafluence Inc.</p>
    <h2 id="ways-heading" className="ways-heading">
      Connecting Academic Learning with Industry Expertise
    </h2>
    <p className="ways-intro">
      Through Exafluence Education, the EdTech division of Exafluence Inc. USA, we connect academic
      collaboration, technology expertise and applied learning to support learners, institutions and
      organisations.
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
                Explore More <ArrowGlyph />
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
