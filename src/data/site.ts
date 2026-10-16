import {
  Building2, Landmark, Network, BookOpen, FlaskConical, Briefcase, Compass, Lightbulb, Award,
  LayoutGrid, MonitorPlay, Images, Newspaper, Info, Mail, GraduationCap,
  Code2, BarChart3, Cloud, Sparkles, Database, Terminal, Presentation, Rocket, Cpu, type LucideIcon,
} from "lucide-react";
import type { AboutStoryData } from "@/components/site/AboutStory";
import type { AcademicOverviewData } from "@/components/site/AcademicOverview";
import type { EnquiryIntro } from "@/components/home/PartnerEnquiry";
import skillshoneLogo from "@/assets/skillshone-logo.png.asset.json";

/** Content is data-only: add approved pages, partners or programmes here without touching layouts. */
export type Offering = { name: string; significance: string[]; benefits: string };
export type Block =
  | { type: "text"; title?: string; text: string }
  | { type: "features"; title: string; items: string[]; note?: string }
  | { type: "pending"; title: string; items: string[] }
  | { type: "pathway"; title: string; steps: string[] }
  | { type: "offerings"; title: string; rows: Offering[] }
  | { type: "programmes"; title: string }
  | { type: "areas"; title: string }
  | { type: "faq"; title: string }
  | { type: "team"; title: string; groups: string[] }
  | { type: "gallery"; filters: string[] }
  | { type: "children"; title: string }
  | { type: "enquiry-form"; title: string; intro?: EnquiryIntro }
  | { type: "about-story"; data: AboutStoryData }
  | { type: "academic-overview"; data: AcademicOverviewData }
  | { type: "logo"; src: string; alt: string }
  | { type: "cta"; title: string; text: string; label: string; to?: string; appearance?: "academic-partner" };

export type Page = {
  path: string; title: string; category: CategorySlug; icon: LucideIcon;
  summary: string; eyebrow?: string; parent?: string; blocks: Block[]; hideInNav?: boolean;
};

export const categories = [
  { slug: "core", title: "Core", short: "Contact", accent: "cat-core" },
  { slug: "academic", title: "Academic Collaborations", short: "Academic", accent: "cat-academic" },
  { slug: "industry", title: "Industry & Technology Collaborations", short: "Industry", accent: "cat-industry" },
  { slug: "learning", title: "Learning & Student Ecosystem", short: "Learning & Students", accent: "cat-learning" },
] as const;
export type CategorySlug = (typeof categories)[number]["slug"];

/** Categories shown in the site menus. Core is not a menu: its Contact page is
 * reached from the calls to action on the pages instead. */
export const menuCategories = categories.filter((c) => c.slug !== "core");

export const PENDING = "Approved Content Required";

/** Approved homepage capabilities; independent of the wider site navigation. */
export const homepageCapabilities = [
  { id: "academic", title: "Academic Collaborations", capabilities: ["Programme Development", "Curriculum Alignment", "Academic Engagement"], path: "/academic-collaborations" },
  { id: "technology", title: "Technology Capabilities", capabilities: ["AI & Gen AI", "Data & Analytics", "Cloud Solutions"], path: "/industry-collaborations" },
  { id: "programmes", title: "Industry-Aligned Programmes", capabilities: ["Emerging Technologies", "Professional Skills", "Applied Knowledge"], path: "/programmes" },
  { id: "research", title: "Research & Innovation", capabilities: ["Applied Research", "Innovation Projects", "Hackathons"], path: "/research-innovation" },
  { id: "digital", title: "Digital Learning & Assessments", capabilities: ["Courses", "Assessments", "Certificates"], path: "/skillshone" },
  { id: "practical", title: "Practical Learning", capabilities: ["Hands-on Labs", "Real-world Projects", "Capstones"], path: "/practical-learning" },
  { id: "career", title: "Career Development", capabilities: ["Mentoring", "Career Readiness", "Placement Support"], path: "/career-development" },
  { id: "industry", title: "Industry Exposure", capabilities: ["Internships", "Industry Interactions", "Professional Practice"], path: "/internships" },
] as const;

const enquire = (label = "Enquire Now"): Block => ({ type: "cta", title: "Have a question?", text: "Speak with the Exafluence Education team.", label, to: "/contact" });

export type Tone = "blue" | "teal" | "amber" | "violet";

export const programmes: { slug: string; title: string; level: string; icon: LucideIcon; tone: Tone }[] = [
  { slug: "masters-data-science", title: "Master's in Data Science", level: "Master's & PG", icon: GraduationCap, tone: "blue" },
  { slug: "pg-diploma-data-science", title: "PG Diploma in Data Science", level: "Master's & PG", icon: Award, tone: "teal" },
  { slug: "python-ai-ml-genai", title: "Python for AI, ML & Generative AI", level: "Diplomas & Certifications", icon: Code2, tone: "violet" },
  { slug: "data-visualization", title: "Data Visualization", level: "Diplomas & Certifications", icon: BarChart3, tone: "amber" },
  { slug: "cloud-technologies", title: "Cloud Technologies", level: "Diplomas & Certifications", icon: Cloud, tone: "blue" },
];

/** Study areas the programme range covers. Neutral wording only — no unapproved claims. */
export const programmeAreas: { title: string; text: string; icon: LucideIcon; tone: Tone }[] = [
  { title: "AI & Gen AI", text: "Applied artificial intelligence and generative AI systems.", icon: Sparkles, tone: "blue" },
  { title: "Data Science", text: "Working with data through to insight and visualisation.", icon: Database, tone: "teal" },
  { title: "Cloud Technologies", text: "Modern platforms, deployment and cloud operations.", icon: Cloud, tone: "violet" },
  { title: "Python", text: "Programming foundations through to advanced practice.", icon: Terminal, tone: "amber" },
  { title: "Realtime Case Studies", text: "Live industry problems worked through end to end.", icon: Presentation, tone: "blue" },
  { title: "More Emerging Technologies", text: "New and advancing fields added as programmes are approved.", icon: Rocket, tone: "teal" },
];

const programmeSections = [
  "Programme Overview", "Programme Significance", "Who Should Join", "Student Benefits", "Curriculum / Modules",
  "Practical Learning", "Tools & Technologies", "Projects / Capstone", "Duration", "Delivery Mode", "Eligibility",
  "Career Opportunities", "Certification", "Brochure",
];

const ibmOfferings: Offering[] = [
  { name: "Co-Branded Program", significance: ["Complete offline delivery by Exafluence Education with technical support of IBM", "Course plugged into the credit structure"], benefits: "Gain industry-relevant skills through semester-wise learning, hands-on training, and exposure to emerging technologies. Earn semester-wise certificates from IBM and co-branded certifications from IBM & the institution that strengthen your academic profile and career readiness." },
  { name: "Value-Added Program", significance: ["Complete offline delivery by Exafluence Education with technical support of IBM", "Course plugged into the credit structure"], benefits: "Enhance your academic qualifications with industry-focused technical skills beyond the regular curriculum. Gain practical exposure to emerging technologies and earn IBM certification to strengthen your employability and professional profile." },
  { name: "Project-Based Experiential Learning (PBEL)", significance: ["Complete online mentorship by Exafluence Education with technical support of IBM"], benefits: "Work on real-world industry challenges through hands-on projects, expert mentorship, and collaborative learning. Build problem-solving skills, gain practical project experience, and earn an IBM Digital Badge and Certificate of Completion." },
  { name: "Certificate in Quantum Computing", significance: ["Complete offline delivery by Exafluence Education with technical support of IBM"], benefits: "Explore the fundamentals of Quantum Computing through an IBM-aligned curriculum and hands-on learning with Qiskit. Develop foundational quantum technology skills and earn an IBM certificate to prepare for emerging opportunities in quantum computing and research." },
];

export const pages: Page[] = [
  // Core
  { path: "/about", title: "About Us", category: "core", icon: Info, eyebrow: "A Division of Exafluence Inc., USA", hideInNav: true,
    summary: "Discover the industry foundation behind Exafluence Education.",
    blocks: [{ type: "about-story", data: {
      title: "Industry Expertise. Strategic Partnerships. Applied Learning.",
      description: "Drawing on Exafluence Inc.’s technology expertise, we connect education with business applications in AI, Generative AI and Data Science.",
      mission: "Build practical capabilities through industry-aligned learning, expert mentorship and collaborative projects.",
      vision: "Create a connected ecosystem where academia and industry advance talent development, innovation and lifelong learning.",
      collaborate: "Explore academic partnerships, corporate upskilling and tailored technology training aligned with your organisation’s goals.",
      action: { label: "Discuss a Partnership", href: "#partner-enquiry-form" },
      topics: [
        { title: "Exafluence Inc.", lines: ["With 10+ years of technology experience,", "Exafluence Inc. helps organisations use", "data, analytics and Artificial Intelligence", "to address complex business challenges.", "Its industry expertise provides a practical", "foundation for technology-focused learning."] },
        { title: "Core Expertise", lines: ["Data Engineering and Advanced Analytics", "turn complex information into useful insights.", "AI and Generative AI support intelligent", "applications and business innovation.", "Digital Transformation connects these", "capabilities with evolving organisational needs."] },
        { title: "Global Presence", lines: ["USA: Frisco, Texas, and Princeton, New Jersey.", "India: Tirupati, Bengaluru and Chennai.", "Overseas development centres:", "Dubai, UAE, and Muscat, Oman.", "This international presence brings broader", "business perspectives to our industry foundation."] },
        { title: "Industry Domains", lines: ["Financial Services and Insurance.", "Healthcare and Pharmaceuticals.", "Consumer Goods and Retail.", "Energy and Utilities.", "Telecommunications.", "Manufacturing and Industrial IoT.", "These sectors provide context for applied learning."] },
        { title: "Exafluence Education", lines: ["Connecting industry insight with education", "in AI, Generative AI and Data Science.", "Our mission: build practical capabilities", "through projects and expert mentorship.", "Our vision: prepare learners for evolving", "careers through innovation, collaboration", "and continuous learning."] },
      ],
    } }, { type: "cta", title: "Have a question?", text: "Enquire to become our academic partner.", label: "Become an academic partner", to: "/contact", appearance: "academic-partner" }],
  },
  { path: "/contact", title: "Contact / Enquiry", category: "core", icon: Mail, summary: "Ask about programmes, collaborations or admissions.", blocks: [] },

  // Academic
  { path: "/academic-collaborations", title: "Academic Collaborations", category: "academic", icon: Landmark,
    summary: "Connecting academic foundations with applied AI, data and financial technologies.",
    blocks: [{ type: "academic-overview", data: {
      title: "Academic Collaborations",
      subtitle: "Academic depth. Applied technology. Shared opportunity.",
      description: "Connecting institutional learning with practical expertise in data, AI and financial technologies.",
      partnersTitle: "Our Academic Partners",
      introduction: "Explore how each collaboration connects academic knowledge with technical learning and professional applications.",
      partners: [
        { name: "Sri Venkateswara University", label: "Data Science & Computing", description: "Connecting statistics and computing with practical learning in data analysis, machine learning and visualisation, supported by project work.", skills: [{ label: "Programming", icon: Code2 }, { label: "Data Analysis", icon: Database }, { label: "Machine Learning", icon: Network }], linkLabel: "Explore SVU Collaboration", to: "/academic-collaborations/svu" },
        { name: "XIME, Chennai", label: "Finance & Technology", description: "Connecting financial knowledge with data analytics and AI applications to explore financial services, business insights and technology-led decision-making.", skills: [{ label: "Finance", icon: BarChart3 }, { label: "Analytics", icon: Presentation }, { label: "AI Applications", icon: Cpu }], linkLabel: "Explore XIME Collaboration", to: "/academic-collaborations/xime" },
      ],
      invitation: { title: "Build an Academic Partnership", description: "Discuss curriculum enrichment, technical workshops, faculty development and applied learning opportunities for your institution.", label: "Discuss a Partnership", to: "/contact" },
    } }] },
  { path: "/academic-collaborations/svu", parent: "/academic-collaborations", title: "SVU Collaboration", category: "academic", icon: GraduationCap,
    summary: "Exafluence Education × SVU.",
    blocks: [
      { type: "pending", title: "The collaboration", items: ["About the Collaboration", "Collaboration Significance", "Programmes Offered", "Programme Significance", "Student Benefits", "Eligibility"] },
      { type: "pending", title: "Learning & outcomes", items: ["Practical Learning", "Projects", "Internships", "Industry Exposure", "Career Development", "Research & Publications", "Innovation & Achievements", "Student Outcomes", "Gallery"] },
      enquire("Enquire about SVU programmes"),
    ] },
  { path: "/academic-collaborations/xime", parent: "/academic-collaborations", title: "XIME Collaboration", category: "academic", icon: GraduationCap,
    summary: "Exafluence Education × XIME.",
    blocks: [
      { type: "pending", title: "The collaboration", items: ["About the Collaboration", "Programmes Offered", "Student Benefits", "Eligibility"] },
      enquire("Enquire about XIME programmes"),
    ] },

  // Industry
  { path: "/industry-collaborations", title: "Industry & Technology Collaborations", category: "industry", icon: Network,
    summary: "Industry connections that keep every programme aligned with real-world practice.",
    blocks: [
      { type: "children", title: "Collaborations" },
      enquire("Become an industry partner"),
    ] },
  { path: "/industry-collaborations/exafluence-inc", parent: "/industry-collaborations", title: "Exafluence Inc. Industry Connection", category: "industry", icon: Building2,
    summary: "The industry backing behind Exafluence Education.",
    blocks: [{ type: "pending", title: "Industry connection", items: ["About Exafluence Inc.", "How industry expertise reaches learners", "Exafluence ODC Exposure"] }] },
  { path: "/industry-collaborations/ibm", parent: "/industry-collaborations", title: "IBM Collaboration", category: "industry", icon: Network,
    summary: "Exafluence Education × IBM Career Education.",
    blocks: [
      { type: "text", title: "About the Collaboration", text: "Exafluence Education, the EdTech division of Exafluence Inc., USA, collaborates with IBM Career Education to bridge the gap between academic learning and industry expectations. This collaboration focuses on equipping students with emerging technology skills, practical learning experiences, and industry-relevant knowledge to prepare them for future career opportunities." },
      { type: "offerings", title: "Programmes", rows: ibmOfferings },
      { type: "pending", title: "Programme details", items: ["Technologies & Tools", "Hands-on Learning & Labs", "Projects / Capstone", "Duration", "Delivery Mode", "Eligibility", "Certification"] },
      enquire("Enquire about IBM programmes"),
    ] },

  // Learning & Student Ecosystem
  { path: "/programmes", title: "Programmes", category: "learning", icon: BookOpen,
    summary: "Industry-integrated programmes across AI & Gen AI, Data Science, Cloud Technologies, Python, realtime case studies and more emerging technologies.",
    blocks: [
      { type: "areas", title: "Areas of study" },
      { type: "programmes", title: "Current programmes" },
      enquire("Explore with an advisor"),
    ] },
  ...programmes.map<Page>((p) => ({
    path: `/programmes/${p.slug}`, parent: "/programmes", title: p.title, category: "learning", icon: BookOpen, eyebrow: p.level, hideInNav: true,
    summary: "Programme details will be published once approved.",
    blocks: [{ type: "pending", title: "Programme details", items: programmeSections }, enquire()],
  })),
  { path: "/practical-learning", title: "Practical Learning", category: "learning", icon: FlaskConical,
    summary: "Learning by doing — from academic knowledge to real student outcomes.",
    blocks: [
      { type: "pathway", title: "The learning pathway", steps: ["Academic Knowledge", "Industry Challenge", "Hands-on Practice", "Real Project", "Mentor Feedback", "Student Outcome"] },
      { type: "features", title: "Formats", items: ["Hands-on Labs", "Industry Projects", "Case Studies", "Capstone Projects"] },
      { type: "pending", title: "Project examples", items: ["Project example 1", "Project example 2", "Project example 3"] },
    ] },
  { path: "/internships", title: "Internships & Industry Exposure", category: "learning", icon: Briefcase,
    summary: "Real-world experience inside working technology teams.",
    blocks: [{ type: "features", title: "Exposure", items: ["Student Internships", "Industry Visits", "Exafluence ODC Exposure", "Real-world Experience"] }] },
  { path: "/career-development", title: "Career Development", category: "learning", icon: Compass,
    summary: "Structured preparation from classroom to career.",
    blocks: [{ type: "features", title: "Support", items: ["Placement Training", "Soft Skills", "Resume Building", "Mock Interviews", "Coding Tests", "Group Discussions", "Career Guidance", "Industry Sessions"] }] },
  { path: "/research-innovation", title: "Research & Innovation", category: "learning", icon: Lightbulb,
    summary: "Publishing, presenting and building.",
    blocks: [{ type: "pending", title: "Research", items: ["Research Publications", "Accepted Papers", "International Conference Participation", "Student Research", "Hackathons", "Innovation Projects", "Awards and Recognition"] }] },
  { path: "/student-success", title: "Student Success", category: "learning", icon: Award,
    summary: "Outcomes reported only from verified records.",
    blocks: [{ type: "pending", title: "Outcomes", items: ["Placements", "Achievements", "Recognitions", "Career Growth"] }] },
  { path: "/students-corner", title: "Student's Corner", category: "learning", icon: LayoutGrid,
    summary: "One hub for resources, updates and support.",
    blocks: [{ type: "features", title: "Resources", note: "Links and updates will appear here as they are published.", items: ["Academic Resources", "Projects & Capstones", "Opportunities", "Announcements", "Internship Updates", "Placement Updates", "Research Opportunities", "Student Achievements", "Downloads", "Support"] }] },
  { path: "/skillshone", title: "SkillShone", eyebrow: "Digital Learning Platform", category: "learning", icon: MonitorPlay,
    summary: "Exafluence Education's learner-access gateway — Solve Industry-Grade Problems Using AI.",
    blocks: [
      { type: "logo", src: skillshoneLogo.url, alt: "SkillShone" },
      { type: "features", title: "On the platform", items: ["Online Learning", "Video Lessons", "Learning Modules", "Hands-on Practice", "Assessments", "Projects & Assignments", "Progress Tracking", "Certificates"] },
      { type: "cta", title: "Access SkillShone", text: "Solve Industry-Grade Problems Using AI.", label: "Go to SkillShone", to: "https://skillshone.com/" },
    ] },
  { path: "/gallery", title: "Gallery & Highlights", category: "learning", icon: Images,
    summary: "Moments from events, visits and achievements.",
    blocks: [{ type: "gallery", filters: ["All", "Academic Events", "Industry Visits", "Internships", "Research", "Hackathons", "Placements", "Student Activities", "Awards & Recognition"] }] },
  { path: "/events-news", title: "Events & News", category: "learning", icon: Newspaper,
    summary: "Announcements and upcoming events.",
    blocks: [{ type: "pending", title: "Latest", items: ["Upcoming Events", "News & Announcements"] }] },
];

export const findPage = (path: string) => pages.find((p) => p.path === path.replace(/\/$/, "") );
export const navPages = (cat: CategorySlug) => pages.filter((p) => p.category === cat && !p.hideInNav);

/** Hub arms: every arm is subordinate to the central Exafluence Education brand. */
export const arms: { title: string; path: string; icon: LucideIcon; subtitle: string; priority: "institutional" | "learning" | "student" }[] = [
  { title: "Academic Collaborations", path: "/academic-collaborations", icon: Landmark, subtitle: "SVU · XIME", priority: "institutional" },
  { title: "Industry & Technology", path: "/industry-collaborations", icon: Network, subtitle: "IBM · Exafluence Inc.", priority: "institutional" },
  { title: "Programmes", path: "/programmes", icon: BookOpen, subtitle: "AI · Data · Cloud", priority: "learning" },
  { title: "Practical Learning", path: "/practical-learning", icon: FlaskConical, subtitle: "Labs · Projects · Capstones", priority: "learning" },
  { title: "Internships & Exposure", path: "/internships", icon: Briefcase, subtitle: "Internships · Industry visits", priority: "learning" },
  { title: "Career Development", path: "/career-development", icon: Compass, subtitle: "Skills · Career guidance", priority: "learning" },
  { title: "Research & Innovation", path: "/research-innovation", icon: Lightbulb, subtitle: "Research · Ideas · Innovation", priority: "student" },
  { title: "Student Success", path: "/student-success", icon: Award, subtitle: "Achievements · Career growth", priority: "student" },
  { title: "Student’s Corner", path: "/students-corner", icon: LayoutGrid, subtitle: "Resources · Updates · Downloads", priority: "student" },
  { title: "SkillShone", path: "/skillshone", icon: MonitorPlay, subtitle: "Digital learning platform", priority: "student" },
  { title: "Gallery & Highlights", path: "/gallery", icon: Images, subtitle: "Events · Activities", priority: "student" },
];

/** Add approved photos here: { src, alt, category } where category matches a gallery filter. */
export const galleryItems: { src: string; alt: string; category: string }[] = [];
