import {
  Building, Building2, Landmark, Network, BookOpen, FlaskConical, Briefcase, Compass, Lightbulb, Award,
  LayoutGrid, MonitorPlay, Images, Newspaper, Mail, GraduationCap, Users,
  Code2, BarChart3, Cloud, Sparkles, Database, Terminal, Presentation, Rocket, Cpu, Layers, PieChart, type LucideIcon,
} from "lucide-react";
import type { AboutStoryData } from "@/components/site/AboutStory";
import type { AboutOverviewData } from "@/components/site/AboutOverview";
import type { EnquiryIntro } from "@/components/home/PartnerEnquiry";
import svuLogo from "@/assets/svu-logo.png";
import ibmSemesterBrochure from "@/assets/brochures/ibm-semester.pdf";
import ibmValueAddedBrochure from "@/assets/brochures/ibm-value-added.pdf";
import ibmQuantumBrochure from "@/assets/brochures/ibm-quantum.pdf";
import ibmPbelBrochure from "@/assets/brochures/ibm-pbel.pdf";
import svuMsBrochure from "@/assets/brochures/svu-ms-data-science.pdf.asset.json";
import svuPgBrochure from "@/assets/brochures/svu-pg-diploma-data-science.pdf.asset.json";
import svuDiplomaBrochure from "@/assets/brochures/svu-diploma-courses.pdf.asset.json";
import ibmLogo from "@/assets/ibm-partner-badge.png";
import svuIllustration from "@/assets/svu-partner-illustration.png";
import ibmIllustration from "@/assets/ibm-partner-illustration.png";
import { svuReviewedCurricula } from "./svuReviewed";

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
  | { type: "faq"; title: string; items?: { q: string; a?: string; groups?: { label: string; points: string[] }[] }[] }
  | { type: "team"; title: string; groups: string[] }
  | { type: "gallery"; filters: string[] }
  | { type: "children"; title: string }
  | { type: "enquiry-form"; title: string; intro?: EnquiryIntro }
  | { type: "about-story"; data: AboutStoryData }
  | { type: "about-overview"; data: AboutOverviewData }
  | { type: "collaboration-network" }
  | { type: "logo"; src: string; alt: string }
  | { type: "cta"; title: string; text: string; label: string; to?: string; appearance?: "academic-partner" | "skillshone" };

export type Page = {
  path: string; title: string; category: CategorySlug; icon: LucideIcon;
  summary: string; eyebrow?: string; tagline?: string; hideIcon?: boolean; hideSummary?: boolean; parent?: string; blocks: Block[]; hideInNav?: boolean;
};

export const categories = [
  { slug: "core", title: "Core", short: "Contact", accent: "cat-core" },
  { slug: "academic", title: "Our Collaboration Network", short: "Our Collaboration Network", accent: "cat-academic" },
  { slug: "industry", title: "Industry & Technology Collaborations", short: "Industry", accent: "cat-industry" },
  { slug: "learning", title: "Learning Ecosystem", short: "Learning Ecosystem", accent: "cat-learning" },
] as const;
export type CategorySlug = (typeof categories)[number]["slug"];

/** Categories shown in the site menus. Core is not a menu: its Contact page is
 * reached from the calls to action on the pages instead. */
export const menuCategories = categories.filter((c) => c.slug !== "core" && c.slug !== "industry");

export const PENDING = "Approved Content Required";

/** Approved homepage capabilities; independent of the wider site navigation. */
export const homepageCapabilities = [
  { id: "academic", title: "Academic Collaborations", capabilities: ["Programme Development", "Curriculum Alignment", "Academic Engagement"], path: "/collaboration-network" },
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

export const organisations = {
  SVU: { name: "Sri Venkateswara University", logo: svuLogo, logoClass: "logo-wide" },
  IBM: { name: "IBM", logo: ibmLogo, logoClass: "" },
};
export type Organisation = keyof typeof organisations;
export type Programme = {
  slug: string; title: string; level: string; organisation: Organisation; subjects: string[]; icon: LucideIcon; tone: Tone;
  duration: string; delivery: string; intake: string; overview: string; eligibility?: string; features: string[];
  curriculum?: string[]; tools?: string[]; practical?: string; recognition?: string; admissions?: string; source?: string; brochure?: string;
};
const svuIntake = "January and July";
const svuAdmissions = "January and July intakes. Application windows and entrance-test dates await approved university notifications.";
export const programmes: Programme[] = [
  { slug: "masters-data-science", brochure: svuMsBrochure.url, title: "M.S. Data Science", level: "Master's", organisation: "SVU", subjects: ["Data Science"], icon: GraduationCap, tone: "blue", duration: "2 years", delivery: "Regular, full-time hybrid", intake: "University admission cycle", overview: "Study Data Science through academic learning and practical application at Sri Venkateswara University in collaboration with Exafluence Education.", features: ["Two-year programme", "Regular, full-time hybrid learning"], admissions: "M.S. admissions are separate from diploma intakes. Review APPGCET and the university Directorate of Admissions entrance route against the official requirements and current notification.", source: "https://www.svudatascience.in" },
  { slug: "pg-diploma-data-science", brochure: svuPgBrochure.url, title: "PG Diploma in Data Science", level: "PG Diploma", organisation: "SVU", subjects: ["Data Science"], icon: Award, tone: "teal", duration: "1 year", delivery: "Part-time hybrid", intake: svuIntake, overview: "Explore Data Science through a one-year part-time hybrid learning pathway.", features: ["One-year programme", "Part-time hybrid learning"], admissions: svuAdmissions, source: "https://www.svudatascience.in" },
  { slug: "python-ai-ml-genai", brochure: svuDiplomaBrochure.url, title: "Diploma in Python for AI, ML & Generative AI", level: "Diploma", organisation: "SVU", subjects: ["AI & Gen AI", "Python"], icon: Code2, tone: "violet", duration: "6 months", delivery: "Part-time hybrid", intake: svuIntake, overview: "Develop knowledge in Python for Artificial Intelligence, Machine Learning and Generative AI.", features: ["Six-month programme", "Part-time hybrid learning"], admissions: svuAdmissions, source: "https://www.svudatascience.in" },
  { slug: "data-visualization", brochure: svuDiplomaBrochure.url, title: "Diploma in Data Visualisation — Power BI, Tableau & SQL", level: "Diploma", organisation: "SVU", subjects: ["Data Visualisation"], icon: BarChart3, tone: "amber", duration: "6 months", delivery: "Part-time hybrid", intake: svuIntake, overview: "Explore data visualisation using Power BI, Tableau and SQL.", features: ["Six-month programme", "Part-time hybrid learning"], admissions: svuAdmissions, source: "https://www.svudatascience.in" },
  { slug: "cloud-technologies", brochure: svuDiplomaBrochure.url, title: "Diploma in Cloud Technologies", level: "Diploma", organisation: "SVU", subjects: ["Cloud Technologies"], icon: Cloud, tone: "blue", duration: "6 months", delivery: "Part-time hybrid", intake: svuIntake, overview: "Develop knowledge in Cloud Technologies through academic learning and practical application.", features: ["Six-month programme", "Part-time hybrid learning"], admissions: svuAdmissions, source: "https://www.svudatascience.in" },
  { slug: "ibm-semester-industry-learning", brochure: ibmSemesterBrochure, title: "Semester-Based Industry Learning", level: "Semester course", organisation: "IBM", subjects: ["Emerging Technologies"], icon: Cpu, tone: "blue", duration: "45 hours", delivery: "On-campus", intake: "Institution-selected", overview: "Industry-integrated semester learning with institution-aligned course selection.", features: ["One course per semester", "Institution-aligned course selection", "60% practical learning and 40% theory"], practical: "60% practical learning and 40% theory.", recognition: "3 academic credits, as stated in the supplied brief. Course-specific certification wording awaits leaflet confirmation." },
  { slug: "ibm-value-added-courses", brochure: ibmValueAddedBrochure, title: "Value-Added Courses", level: "Value-added course", organisation: "IBM", subjects: ["Emerging Technologies"], icon: Layers, tone: "teal", duration: "45 hours", delivery: "On-campus", intake: "Institution-selected", overview: "Institution-selected courses connecting practical exercises with relevant technology exposure.", eligibility: "Undergraduate and postgraduate learners across disciplines.", features: ["Institution-selected courses", "Practical exercises and relevant technology exposure"], curriculum: ["Curriculum based on the selected course and institutional requirements."], practical: "Practical exercises tailored to the selected course." },
  { slug: "ibm-quantum-computing", brochure: ibmQuantumBrochure, title: "Certificate Programme in Quantum Computing", level: "Certificate programme", organisation: "IBM", subjects: ["Quantum Computing"], icon: Sparkles, tone: "violet", duration: "60 hours", delivery: "On-campus", intake: "Institution-selected", overview: "Explore Quantum Computing concepts and applications using IBM-provided curriculum and learning content.", eligibility: "B.Tech third- and fourth-year students, and degree second- and third-year students, across streams.", features: ["IBM-provided curriculum and learning content", "60 hours, including 33 practical hours", "Quantum Computing concepts and applications"], curriculum: ["Quantum Computing concepts and applications", "Qiskit and technologies specified in the curriculum"], tools: ["Qiskit"], practical: "33 practical hours within the 60-hour programme." },
  { slug: "ibm-pbel", brochure: ibmPbelBrochure, title: "Project-Based Experiential Learning — PBEL", level: "Experiential learning", organisation: "IBM", subjects: ["Emerging Technologies"], icon: Presentation, tone: "amber", duration: "90 hours", delivery: PENDING, intake: "Institution-selected", overview: "Instructor-led technical training, hands-on labs and team-based projects using industry problem statements and datasets.", eligibility: "Graduates from technical and non-technical disciplines.", features: ["Instructor-led technical training", "Hands-on labs", "Team-based project development", "Industry problem statements and datasets", "Industry mentorship", "Project presentation and evaluation"], curriculum: ["Orientation", "Training and Labs", "Project Development", "Presentation and Evaluation", "Certification"], practical: "Team-based project development, industry mentorship, presentation and evaluation." },
];

export const collaborationSlides = [
  { organisation: "SVU" as Organisation, heading: "Industry-Integrated University Programmes", text: "Explore programmes offered through the collaboration between Sri Venkateswara University and Exafluence Education. Develop knowledge in Data Science, Python for AI, ML and Gen AI, Data Visualisation and Cloud Technologies through academic learning and practical application.", label: "Explore Programmes & Admissions", image: svuIllustration, alt: "University campus connected to data and AI systems" },
  { organisation: "IBM" as Organisation, heading: "Industry-Integrated Learning in Emerging Technologies", text: "Explore IBM programmes offered in collaboration with Exafluence Education, including semester-based courses, value-added learning, Quantum Computing and Project-Based Experiential Learning. Review practical learning opportunities tailored to the selected course and institutional requirements.", label: "Explore IBM Programmes", image: ibmIllustration, alt: "AI coding and quantum assembly" },
];

// Source-specific enrichment; intake labels above come from the approved brief,
// while eligibility and curriculum below are verified on svudatascience.in.
const diplomaEligibility = "All graduates, irrespective of discipline. Final-year Engineering and Honours students from SVU and affiliated colleges are included. Final-year students outside SVU’s jurisdiction require a principal’s No Objection Certificate, subject to the university’s requirements.";
const diplomaEntrance = "Qualify in the entrance examination under the Directorate of Admissions norms, followed by verification of valid educational documents. January and July intakes follow the supplied brief; application windows and entrance-test dates await approved university notifications.";
const svuVerified: Record<string, Partial<Programme>> = {
  "masters-data-science": { eligibility: "B.Tech in CSE, IT, ETC, ECE or EEE; B.Sc with Mathematics as the main subject plus any two of Physics, Chemistry, Statistics, Electronics or Computer Science; or BCA.", features: ["Core and elective courses", "Industry mentoring and case studies", "Real-time projects", "LMS learning materials and recordings", "80% practical and 20% theoretical learning"], curriculum: ["Data analysis", "Machine learning and Artificial Intelligence", "Core and elective courses", "Final-semester capstone addressing business challenges"], practical: "80% practical and 20% theoretical learning. Industry mentoring, case studies and real-time projects culminate in a final-semester capstone addressing business challenges.", admissions: "Two entrance routes are listed: a common online entrance test through APPGCET, with dates according to its schedule; and a common online proctored entrance test conducted by SVU’s Directorate of Admissions. Review the official requirements and current notification. M.S. admissions remain separate from diploma intake spells." },
  "pg-diploma-data-science": { eligibility: "All engineering graduates. Other graduates require at least one year of IT-domain experience, supported by an experience or appointment letter dated at least 12 months before application.", features: ["12-month part-time hybrid programme", "Work, Learn, Implement, Practice (WLIP) learning model", "Hands-on experience and industry exposure"], practical: "Hands-on experience and industry exposure through the Work, Learn, Implement, Practice (WLIP) learning model.", admissions: diplomaEntrance },
  "python-ai-ml-genai": { eligibility: diplomaEligibility, features: ["Six-month part-time hybrid programme", "Internship and project, as listed on the programme registration form"], curriculum: ["Python programming applied to Artificial Intelligence", "Machine Learning", "Generative AI"], tools: ["Python"], practical: "Internship and project are included in the programme registration listing.", admissions: diplomaEntrance },
  "data-visualization": { eligibility: diplomaEligibility, features: ["Six-month part-time hybrid programme", "Internship and project"], curriculum: ["Power BI", "Tableau", "SQL", "MongoDB", "Turning complex datasets into actionable business insights"], tools: ["Power BI", "Tableau", "SQL", "MongoDB"], practical: "Internship and project are included in the programme registration listing.", admissions: diplomaEntrance },
  "cloud-technologies": { eligibility: diplomaEligibility, features: ["Six-month part-time hybrid programme", "Multi-cloud environments and hybrid-cloud strategies", "Hands-on practice"], curriculum: ["AWS", "Microsoft Azure", "Google Cloud Platform", "Multi-cloud environments", "Hybrid-cloud strategies"], tools: ["AWS", "Microsoft Azure", "Google Cloud Platform"], practical: "Hands-on practice, with internship and project included in the programme registration listing.", admissions: diplomaEntrance },
  "ibm-pbel": { delivery: "Online mentorship" },
};
programmes.forEach(programme => {
  Object.assign(programme, svuVerified[programme.slug] ?? {});
  if (svuReviewedCurricula[programme.slug]) programme.curriculum = svuReviewedCurricula[programme.slug];
});

export const filterProgrammes = (filters: { organisation?: string; subject?: string; type?: string; q?: string }) => programmes.filter((p) =>
  (!filters.organisation || p.organisation === filters.organisation) && (!filters.subject || p.subjects.includes(filters.subject)) &&
  (!filters.type || p.level === filters.type) && (!filters.q || `${p.title} ${organisations[p.organisation].name} ${p.subjects.join(" ")}`.toLowerCase().includes(filters.q.trim().toLowerCase())));

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


export const pages: Page[] = [
  // Core
  { path: "/about", title: "About Us", category: "core", icon: Building, eyebrow: "A Division of Exafluence Inc., USA", hideInNav: true,
    summary: "Technology education informed by industry experience",
    blocks: [{ type: "about-overview", data: {
      title: "About Exafluence Education",
      subtitle: "Industry-Aligned Education in AI, Gen AI, Data Science, Cloud Technologies and Quantum Computing",
      introduction: [
        "Exafluence Education (Exfedu) is the education division of Exafluence Inc., helping students and professionals develop knowledge and practical skills in Artificial Intelligence (AI), Generative AI (Gen AI), Data Science and Cloud Technologies.",
        "Our educational direction draws on Exafluence’s enterprise delivery experience, industry expertise and development of working technology solutions, connecting technical foundations with business applications.",
      ],
      foundation: {
        title: "Our Industry Foundation",
        heading: "Exafluence Inc. USA",
        headingNote: "Enterprise Expertise in AI, Gen AI, Data Engineering and Digital Transformation",
        paragraphs: [
          "Founded in 2015, Exafluence provides software services and enterprise technology solutions, with a presence across the United States, Canada, Europe, Dubai and India.",
          "The company combines data engineering, analytics and application development with expertise across four industry areas:",
        ],
        industries: [
          { name: "Financial Services", text: "Investment data management, financial analytics and reporting." },
          { name: "Healthcare & Pharmaceuticals", text: "Healthcare data interoperability, document intelligence and information management." },
          { name: "Consumer Goods & Retail", text: "Consumer insights, marketing analytics and digital commerce applications." },
          { name: "Manufacturing & IoT", text: "Connected systems, equipment monitoring and operational analytics." },
        ],
        closing: "This experience provides industry context for understanding how technologies address different organisational needs.",
      },
      approach: {
        title: "Our Purpose and Learning Approach",
        tagline: "Strong Foundations. Practical Understanding. Responsible Application.",
        paragraphs: [
          "We aim to make technology education clear, accessible and relevant. Our approach helps learners understand core principles, explore technical tools through practical workflows and develop structured problem-solving skills.",
          "Learning connects concepts with their applications while encouraging careful evaluation of results, attention to data quality and privacy, and informed human judgement.",
        ],
      },
      innovation: {
        title: "Applied AI and Gen AI Innovation",
        subtitle: "Exafluence’s Applied Technology Capabilities",
        introduction: "ExfDigital Studio brings together modular applications designed for enterprise requirements. Its capabilities demonstrate practical uses of conversational AI, data quality automation and intelligent document processing.",
        solutions: [
          { name: "ResearchAI", subtitle: "Conversational Analytics", text: "Enables natural-language queries to retrieve and visualise information from structured business databases." },
          { name: "ExfAutoDQ", subtitle: "Automated Data Quality Testing", text: "Generates SQL test cases and descriptions to support data validation." },
          { name: "ExfParse", subtitle: "Intelligent Document Processing", text: "Extracts and transforms information from documents and scanned files into structured formats." },
        ],
      },
      collaborations: {
        title: "Technology Collaboration and Recognition",
        paragraphs: [
          "Exafluence’s collaborations include FIS Global on an Investment Data Platform and participation as a Snowflake Native Apps launch partner.",
          "MongoDB has recognised Exafluence as ISV Partner of the Year for Healthcare and Solutions Partner of the Year, acknowledging its work across enterprise data and application ecosystems.",
        ],
      },
    } }],
  },
  { path: "/contact", title: "Contact / Enquiry", category: "core", icon: Mail, summary: "Ask about programmes, collaborations or admissions.", blocks: [] },

  // Replaces the retired Academic overview and partner subpages.
  { path: "/collaboration-network", title: "Our Collaboration Network", category: "academic", icon: Landmark,
    summary: "Explore programmes with Sri Venkateswara University and IBM.", blocks: [{ type: "collaboration-network" }] },

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
  { path: "/skillshone", title: "SkillShone", eyebrow: "AI-Powered Industry Project Learning Platform", tagline: "Solve Industry-Grade Problems\nUsing AI & Gen AI", hideIcon: true, hideSummary: true, category: "learning", icon: MonitorPlay,
    summary: "Build practical AI skills through industry projects — industry-grade problem statements, realistic datasets and guided project development, with project-aware AI assistance, mentor guidance and code reviews.",
    blocks: [
      { type: "text", title: "From Learning to Practical Application", text: "Developing a solution involves understanding a problem, exploring data, writing code and explaining results. SkillShone brings these activities into a guided learning journey, helping learners understand professional workflows and strengthen their technical problem-solving skills." },
      { type: "features", title: "Who SkillShone Is For", items: [
        "Undergraduate and postgraduate students applying classroom knowledge through practical projects",
        "Final-year students and project teams developing solutions for academic submissions",
        "Graduates and job aspirants building technical portfolios and preparing for interviews",
        "Working professionals and career switchers developing applied AI and Generative AI skills",
      ] },
      { type: "pathway", title: "Your Project Learning Journey", steps: ["Choose a Problem", "Explore the Data", "Develop Your Solution", "Review and Refine", "Document and Present", "Receive Expert Feedback"] },
      { type: "features", title: "Platform Highlights", items: [
        "Industry Problem Statements — a catalogue of 1,000+ problem statements across 48 industry verticals",
        "Realistic Project Datasets for practical exploration, analysis and solution development",
        "Project-Aware AI Chatbot — assistance related to your selected project as you work",
        "Mentor Guidance and Learning Pathways aligned with your project and development needs",
        "Code Reviews and Feedback to refine your implementation and approach",
        "Project Report Generation — structured documentation you can adapt to your institution's submission requirements",
      ] },
      { type: "features", title: "Tools and Technologies", note: "Explore these technologies through project work, with the tools selected according to each problem's requirements.", items: ["Generative AI", "Artificial Intelligence & Machine Learning", "Open-source LLMs", "Python", "Databases", "Data Science"] },
      { type: "features", title: "Build Your Portfolio and Career Confidence", note: "SkillShone combines practical development with presentation opportunities, expert feedback and mock interviews to support technical interview preparation.", items: [
        "Build a portfolio of AI and Generative AI projects",
        "Strengthen coding, analytical and problem-solving skills",
        "Practise explaining technical decisions and project outcomes",
        "Develop confidence for project presentations and interviews",
      ] },
      { type: "features", title: "For Colleges and Universities", note: "SkillShone helps institutions introduce structured, application-based learning through industry problems, AI tools and guided project development.", items: [
        "Coursework Integration — industry problem statements in assignments and student projects",
        "Independent Evaluation — student assessment through third-party evaluation and feedback",
        "Guided Development — AI assistance, mentor guidance and code reviews for project teams",
        "Project Documentation — report preparation using institutional templates",
        "Student Portfolios — evidence of learners' technical work",
        "Academic–Industry Engagement — ongoing connections between academic learning and professional practice",
      ] },
      { type: "faq", title: "Frequently Asked Questions", items: [
        { q: "What is SkillShone?", a: "SkillShone is an AI-powered industry project learning platform that supports practical learning through problem statements, datasets, AI assistance and expert guidance." },
        { q: "What types of projects can learners explore?", a: "The platform focuses on applied AI, Generative AI and Data Science projects across multiple industry verticals." },
        { q: "How are learners supported during a project?", a: "Support includes a project-aware AI chatbot, mentor guidance, code reviews and feedback from industry experts." },
        { q: "Can SkillShone support final-year academic projects?", a: "SkillShone supports project selection, development and documentation. Learners should confirm that their selected project meets their institution's academic requirements." },
        { q: "Does SkillShone provide project reports?", a: "The platform supports project report generation and customisation to college templates. Learners should review the report for accuracy and compliance with submission requirements." },
        { q: "How does SkillShone support interview preparation?", a: "Project discussions, technical presentations and mock interviews help learners practise explaining their work and answering questions about their solutions." },
        { q: "How do these programmes benefit freshers, mid-career professionals and experienced specialists?", groups: [
          { label: "Freshers and Early-Career Learners", points: [
            "Build technical foundations through practical exercises and projects.",
            "Develop a portfolio and strengthen problem-solving and communication skills.",
          ] },
          { label: "Mid-Career Professionals", points: [
            "Update technical skills and apply new approaches to workplace challenges.",
            "Build specialised knowledge to support career progression or a role transition.",
          ] },
          { label: "Experienced Professionals and Domain Experts", points: [
            "Explore emerging technologies and their applications within your domain.",
            "Strengthen your ability to evaluate solutions and guide technology initiatives.",
          ] },
        ] },
      ] },
      { type: "cta", title: "Start Building with SkillShone", text: "Explore practical AI project learning for your own development, or discuss how SkillShone can support your institution — contact@skillshone.com.", label: "Visit SkillShone" },
    ] },
  { path: "/gallery", title: "Gallery & Highlights", category: "learning", icon: Images,
    summary: "Moments from events, visits and achievements.",
    blocks: [{ type: "gallery", filters: ["All", "Academic Events", "Industry Visits", "Internships", "Research", "Hackathons", "Placements", "Student Activities", "Awards & Recognition"] }] },
  { path: "/events-news", title: "Events & News", category: "learning", icon: Newspaper,
    summary: "Announcements and upcoming events.",
    blocks: [{ type: "pending", title: "Latest", items: ["Upcoming Events", "News & Announcements"] }] },
];

export const findPage = (path: string) => pages.find((p) => p.path === path.replace(/\/$/, "") );
export const retiredPageDestinations: Record<string, string> = {
  "/academic-collaborations": "/collaboration-network",
  "/academic-collaborations/svu": "/collaboration-network/svu",
  // XIME is removed from the network (client, 3 November 2026); its old URLs land on the network page.
  "/academic-collaborations/xime": "/collaboration-network",
  "/collaboration-network/xime": "/collaboration-network",
  // IBM keeps one home under Our Collaboration Network (client brief, 2 November 2026).
  "/industry-collaborations/ibm": "/collaboration-network/ibm",
};
export const navPages = (cat: CategorySlug) => pages.filter((p) => p.category === cat && !p.hideInNav);

/** Primary and sidebar destinations are separate from the page categories. */
export const primaryNavigation = [
  { path: "/about", title: "About Us", icon: Building },
  { path: "/collaboration-network", title: "Our Collaboration Network", icon: Network },
  { path: "/skillshone", title: "SkillShone", icon: MonitorPlay },
  { path: "/#partner-enquiry", title: "Enquire Now", icon: Mail },
] as const;
/** Approved section menu for an organisation page. Sections without verified
 * university facts stay flagged for review rather than invented (client, 29 Oct 2026). */
export type OrganisationSection = {
  id: string; title: string; icon: LucideIcon; tone: Tone;
  text?: string; pending?: string; link?: { label: string; path: string };
};
const svuSlide = collaborationSlides.find(s => s.organisation === "SVU");
export const organisationSections: Partial<Record<Organisation, OrganisationSection[]>> = {
  SVU: [
    { id: "overview", title: "Overview", icon: Building2, tone: "blue", text: svuSlide?.text },
    { id: "programmes", title: "Programmes", icon: GraduationCap, tone: "teal" },
    { id: "projects-research", title: "Projects & Research", icon: Lightbulb, tone: "violet",
      text: "Programme learning includes real-time projects, industry mentoring, case studies and a final-semester capstone addressing business challenges.",
      pending: "TIBS 2026 lists three papers but names four presentations in the supplied record. The total requires confirmation." },
    { id: "internships", title: "Internships", icon: Briefcase, tone: "amber",
      text: "Students from the 2023–2025 batch secured internships at NARL, Gadanki; SHAR, Sriharikota; and Vikram Sarabhai Space Centre, Thiruvananthapuram." },
    { id: "placements", title: "Placements", icon: Compass, tone: "blue",
      text: "Students from the SVU–Exafluence MS Data Science programme have secured roles in data science and AI engineering, alongside trainee positions." },
    { id: "faculty", title: "Faculty & Mentors", icon: Users, tone: "teal" },
  ],
};

/** Achievements, events and gallery now sit on the SVU overview page (client, 29 Oct 2026). */
export const svuOverviewBlocks: { id: string; title: string; icon: LucideIcon; tone: Tone; pending: string; link: { label: string; path: string } }[] = [
  { id: "achievements", title: "Student Achievements", icon: Award, tone: "amber", pending: "Student achievements, competition results and recognised outcomes await approved university records.", link: { label: "Student Success", path: "/student-success" } },
  { id: "events", title: "Events", icon: Newspaper, tone: "violet", pending: "SVU event listings and announcements await approved content.", link: { label: "Events & News", path: "/events-news" } },
  { id: "gallery", title: "Gallery", icon: Images, tone: "teal", pending: "Photographs from SVU events, visits and campus life await approved images.", link: { label: "Gallery & Highlights", path: "/gallery" } },
];

/** Academic resources now appear on the programme pages themselves. */
export const academicResources = {
  items: ["Academic Resources", "Projects & Capstones", "Downloads", "Support"],
  note: "Programme-specific files await approval. Published resources appear in Student’s Corner.",
  link: { label: "Student’s Corner", path: "/students-corner" },
};

/** Hub arms: every arm is subordinate to the central Exafluence Education brand. */
export const arms: { title: string; path: string; icon: LucideIcon; subtitle: string; priority: "institutional" | "learning" | "student" }[] = [
  { title: "Our Collaboration Network", path: "/collaboration-network", icon: Landmark, subtitle: "SVU · IBM", priority: "institutional" },
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
