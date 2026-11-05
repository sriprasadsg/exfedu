/**
 * IBM collaboration page content (client brief, 2 November 2026).
 *
 * The narration below is the approved website wording supplied for the dedicated
 * IBM page under Our Collaboration Network. Programme-level outcomes, delivery
 * responsibility and certificate wording are taken verbatim from the approved
 * IBM leaflet offerings in site.ts — nothing here is generated. Fields the
 * leaflets do not state stay absent rather than invented.
 */
import { programmes } from "./site";

export const ibmOverview = {
  seoTitle: "IBM Collaboration Programmes | Exafluence Education",
  seoDescription: "Explore programmes in Exafluence Education's IBM collaboration network. Review technical topics, practical learning, eligibility and certification details.",
  title: "Develop Technical Skills Through Applied Learning",
  subtitle: "Explore technology programmes within Exafluence Education’s IBM collaboration network.",
  introduction: "Build your understanding of technology through structured study and practical exploration. Review each programme’s technical focus, learning outcomes and delivery format to identify a pathway that supports your academic interests or professional development.",
  /** Approved description of the relationship, kept from the earlier IBM page. */
  relationship: "Exafluence Education, the EdTech division of Exafluence Inc., USA, collaborates with IBM Career Education to bridge the gap between academic learning and industry expectations. This collaboration focuses on equipping students with emerging technology skills, practical learning experiences, and industry-relevant knowledge to prepare them for future career opportunities.",
  directory: {
    title: "Explore the Programmes",
    text: "Discover the available programmes and understand what each covers before you enquire. Individual programme pages explain prerequisites, practical activities and completion requirements.",
  },
  applied: {
    title: "From Technical Concepts to Practical Application",
    text: "Understand the principles behind the technology, explore the tools specified in your programme and apply your knowledge through its practical activities.",
    note: "Each programme page sets out the capabilities participants are expected to develop, helping you connect the syllabus with your learning goals.",
  },
  choice: {
    title: "Make an Informed Programme Choice",
    intro: "Review the information that matters to your decision:",
    items: [
      { label: "Technical focus", text: "Subjects, concepts and applications covered." },
      { label: "Tools and platforms", text: "Technologies used during practical sessions." },
      { label: "Learning outcomes", text: "Skills and capabilities addressed by the programme." },
      { label: "Participation requirements", text: "Eligibility and prerequisite knowledge." },
      { label: "Delivery and duration", text: "Teaching format and scheduled learning hours." },
      { label: "Assessment and certification", text: "Completion requirements and the stated certificate issuer." },
    ],
  },
  institution: {
    title: "For Universities and Organisations",
    text: "Discuss programme suitability for student groups, faculty development or workforce learning. Share your audience, technical priorities, preferred schedule and expected participant numbers so the Exafluence Education team can advise on available options.",
  },
  /** Client-supplied collaboration announcement, 5 November 2026 — wording kept verbatim.
   * The card follows the SVU internship-update presentation (client, 5 November 2026):
   * the opening sentence stays visible and the closing sentence opens on click, so the
   * two together still read exactly as supplied. */
  partnership: {
    title: "Exafluence Education and IBM Join Hands with SVCET",
    status: "Value-Added Programme",
    record: "For all final-year B.Tech students",
    summary: "Exafluence Education, in collaboration with IBM, has introduced “Generative AI Using IBM watsonx” at Sri Venkateswara College of Engineering and Technology (Autonomous), Chittoor, as a value-added programme for all final-year B.Tech students, helping them gain practical knowledge and skills in Generative AI.",
    details: ["Generative AI", "IBM watsonx", "Chittoor", "Joint certificate"],
    more: "Students who successfully complete the programme will receive a joint certificate.",
  },
  learner: {
    title: "Discuss Your Learning Goals",
    text: "For questions about a programme’s suitability, entry requirements or delivery arrangements, contact the Exafluence Education team.",
  },
};

/** Leaflet-backed detail for one IBM programme. */
export type IbmProgrammeFacts = {
  /** Capabilities the leaflet states participants develop. */
  outcomes?: string[];
  /** Who delivers teaching, stated separately from who issues the certificate. */
  delivery?: string;
  /** Completion requirement and stated certificate issuer, verbatim from the leaflet. */
  certification?: string;
};

const leafletFacts: Record<string, IbmProgrammeFacts> = {
  "ibm-semester-industry-learning": {
    outcomes: [
      "Gain industry-relevant skills through semester-wise learning, hands-on training, and exposure to emerging technologies.",
      "Course plugged into the credit structure.",
    ],
    delivery: "Complete offline delivery by Exafluence Education with technical support of IBM.",
    certification: "Earn semester-wise certificates from IBM and co-branded certifications from IBM & the institution that strengthen your academic profile and career readiness.",
  },
  "ibm-value-added-courses": {
    outcomes: [
      "Enhance your academic qualifications with industry-focused technical skills beyond the regular curriculum.",
      "Gain practical exposure to emerging technologies.",
    ],
    delivery: "Complete offline delivery by Exafluence Education with technical support of IBM.",
    certification: "Earn IBM certification to strengthen your employability and professional profile.",
  },
  "ibm-pbel": {
    outcomes: [
      "Work on real-world industry challenges through hands-on projects, expert mentorship, and collaborative learning.",
      "Build problem-solving skills and gain practical project experience.",
    ],
    delivery: "Complete online mentorship by Exafluence Education with technical support of IBM.",
    certification: "Earn an IBM Digital Badge and Certificate of Completion.",
  },
  "ibm-quantum-computing": {
    outcomes: [
      "Explore the fundamentals of Quantum Computing through an IBM-aligned curriculum and hands-on learning with Qiskit.",
      "Develop foundational quantum technology skills and prepare for emerging opportunities in quantum computing and research.",
    ],
    delivery: "Complete offline delivery by Exafluence Education with technical support of IBM.",
    certification: "Earn an IBM certificate.",
  },
};

export const ibmProgrammes = programmes.filter(p => p.organisation === "IBM");
export const ibmFacts = (slug: string): IbmProgrammeFacts => leafletFacts[slug] ?? {};

/** Audience options for the institutional enquiry (from the approved narration:
 * student groups, faculty development and workforce learning). */
export const ibmAudiences = [
  "Undergraduate students",
  "Postgraduate students",
  "Faculty development",
  "Working professionals",
  "Mixed group",
  "Other",
] as const;
