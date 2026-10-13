import {
  Building2, Landmark, Users, BookOpen, Laptop, Briefcase, TrendingUp,
  UsersRound, PlayCircle, Image, Lightbulb, Mountain, type LucideIcon,
} from "lucide-react";

export type Offering = { title: string; points: string[]; benefits: string };
export type SubPage = { slug: string; title: string; summary: string; intro?: string; offerings?: Offering[] };
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
    subPages: [{
      slug: "ibm", title: "Exafluence Education × IBM Career Education",
      summary: "Empowering future-ready talent through industry-aligned education.",
      intro: "Exafluence Education, the EdTech division of Exafluence Inc., USA, collaborates with IBM Career Education to bridge the gap between academic learning and industry expectations. This collaboration focuses on equipping students with emerging technology skills, practical learning experiences, and industry-relevant knowledge to prepare them for future career opportunities.",
      offerings: [
        { title: "Co-Branded Program", points: ["Complete offline delivery by Exafluence Education with technical support of IBM", "Course plugged into the credit structure"], benefits: "Gain industry-relevant skills through semester-wise learning, hands-on training, and exposure to emerging technologies. Earn semester-wise certificates from IBM and co-branded certifications from IBM & the institution that strengthen your academic profile and career readiness." },
        { title: "Value-Added Program", points: ["Complete offline delivery by Exafluence Education with technical support of IBM", "Course plugged into the credit structure"], benefits: "Enhance your academic qualifications with industry-focused technical skills beyond the regular curriculum. Gain practical exposure to emerging technologies and earn IBM certification to strengthen your employability and professional profile." },
        { title: "Project-Based Experiential Learning (PBEL)", points: ["Complete online mentorship by Exafluence Education with technical support of IBM"], benefits: "Work on real-world industry challenges through hands-on projects, expert mentorship, and collaborative learning. Build problem-solving skills, gain practical project experience, and earn an IBM Digital Badge and Certificate of Completion." },
        { title: "Certificate in Quantum Computing", points: ["Complete offline delivery by Exafluence Education with technical support of IBM"], benefits: "Explore the fundamentals of Quantum Computing through an IBM-aligned curriculum and hands-on learning with Qiskit. Develop foundational quantum technology skills and earn an IBM certificate to prepare for emerging opportunities in quantum computing and research." },
      ],
    }],
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
    slug: "skillshone", title: "SkillShone", tagline: "Solve Industry-Grade Problems Using AI", icon: PlayCircle, category: "programmes",
    intro: "SkillShone — a product of Exafluence Education (a division of Exafluence Inc. USA) — is our platform for solving industry-grade problems using AI: self-paced courses, hands-on practice and certification.",
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
