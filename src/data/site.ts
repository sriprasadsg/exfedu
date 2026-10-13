import {
  Building2, Landmark, Users, BookOpen, Laptop, Briefcase, TrendingUp,
  UsersRound, PlayCircle, Image, Lightbulb, Mountain, type LucideIcon,
} from "lucide-react";

export type SubPage = { slug: string; title: string; summary: string };
export type Section = {
  slug: string;
  title: string;
  tagline?: string;
  icon: LucideIcon;
  category: string;
  intro: string;
  items: string[];
  subPages?: SubPage[];
};

export const categories = [
  { slug: "about", title: "About" },
  { slug: "programmes", title: "Programmes" },
  { slug: "careers", title: "Careers" },
  { slug: "campus", title: "Research & Campus" },
] as const;

export const sections: Section[] = [
  {
    slug: "exafluence-inc", title: "Exafluence Inc.", tagline: "Parent Company", icon: Building2, category: "about",
    intro: "Exafluence Education is backed by Exafluence Inc., bringing real industry expertise and a global perspective into every classroom.",
    items: ["Industry Expertise", "Technology Solutions", "Global Perspective"],
  },
  {
    slug: "academic-collaborations", title: "Academic Collaborations", icon: Landmark, category: "about",
    intro: "We partner with respected universities to co-create degree and diploma programmes.",
    items: ["SVU", "XIME", "Future University Partners"],
    subPages: [
      { slug: "svu", title: "SVU Partnership", summary: "Jointly delivered postgraduate programmes with Sri Venkateswara University." },
      { slug: "xime", title: "XIME Partnership", summary: "Management and technology programmes delivered with XIME." },
    ],
  },
  {
    slug: "industry-collaborations", title: "Industry & Technology Collaborations", icon: Users, category: "about",
    intro: "Curriculum shaped with technology leaders so students learn what industry actually uses.",
    items: ["IBM", "Industry-aligned Programmes"],
    subPages: [{ slug: "ibm", title: "IBM Collaboration", summary: "IBM-aligned content, tools and certifications built into our programmes." }],
  },
  {
    slug: "programmes", title: "Programmes", icon: BookOpen, category: "programmes",
    intro: "Future-ready programmes across AI, Data, FinTech, Cloud, Quantum and more.",
    items: ["Masters & PG Diplomas", "Diplomas & Certifications", "AI, Data, FinTech, Cloud", "Quantum & More"],
    subPages: [
      { slug: "masters-pg-diplomas", title: "Masters & PG Diplomas", summary: "Long-form postgraduate programmes with university partners." },
      { slug: "diplomas-certifications", title: "Diplomas & Certifications", summary: "Short, focused credentials for working learners." },
      { slug: "ai-data", title: "AI & Data", summary: "Machine learning, analytics and data engineering tracks." },
      { slug: "fintech-cloud", title: "FinTech & Cloud", summary: "Digital finance and cloud platform tracks." },
      { slug: "quantum", title: "Quantum Computing", summary: "Foundations of quantum computing and its applications." },
    ],
  },
  {
    slug: "practical-learning", title: "Practical Learning", icon: Laptop, category: "programmes",
    intro: "Learning by doing — labs, live projects and real business cases.",
    items: ["Hands-on Labs", "Industry Projects", "Case Studies", "Capstone Projects"],
  },
  {
    slug: "skillshone", title: "SkillShone", tagline: "Digital Learning Platform", icon: PlayCircle, category: "programmes",
    intro: "Our online platform for self-paced courses, practice and certification.",
    items: ["Online Courses", "Video Lessons", "Hands-on Practice", "Assessments", "Certificates"],
  },
  {
    slug: "career-development", title: "Career Development", icon: Mountain, category: "careers",
    intro: "Structured support that takes students from classroom to career.",
    items: ["Placement Training", "Soft Skills", "Mock Interviews", "Resume Building", "Career Guidance"],
  },
  {
    slug: "internships", title: "Internships & Industry Exposure", icon: Briefcase, category: "careers",
    intro: "Real-world experience inside working technology teams.",
    items: ["Student Internships", "Industry Visits", "Exafluence ODC Exposure", "Real-world Experience"],
    subPages: [{ slug: "odc-exposure", title: "Exafluence ODC Exposure", summary: "Work alongside delivery teams at the Exafluence offshore development centre." }],
  },
  {
    slug: "student-success", title: "Student Success", icon: TrendingUp, category: "careers",
    intro: "Outcomes that speak for themselves.",
    items: ["Placements", "Achievements", "Alumni Stories", "Career Growth"],
    subPages: [{ slug: "alumni-stories", title: "Alumni Stories", summary: "Where our graduates are now and how they got there." }],
  },
  {
    slug: "research-innovation", title: "Research & Innovation", icon: Lightbulb, category: "campus",
    intro: "A culture of curiosity — publishing, presenting and building.",
    items: ["Research Publications", "Conference Participation", "Hackathons", "Innovation Projects"],
    subPages: [{ slug: "hackathons", title: "Hackathons", summary: "Team challenges solving real problems in limited time." }],
  },
  {
    slug: "gallery", title: "Gallery & Highlights", icon: Image, category: "campus",
    intro: "Moments from events, activities and visits.",
    items: ["Events", "Student Activities", "Awards & Recognitions", "Campus & Industry Visits"],
  },
  {
    slug: "students-corner", title: "Student's Corner", icon: UsersRound, category: "campus",
    intro: "Everything current students need in one place.",
    items: ["Academic Resources", "Projects & Capstones", "Opportunities & Announcements", "Student Achievements", "Downloads & Support"],
  },
];

export const findSection = (slug?: string) => sections.find((s) => s.slug === slug);
