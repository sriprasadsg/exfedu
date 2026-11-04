import { BarChart3, BrainCircuit, Database, ScanEye } from "lucide-react";
import innovation from "@/assets/svu-innovation-hub.png";
import summitGroup from "@/assets/svu-paniit-delegation.jpg";


export const svuOverview = {
  title: "Industry-Integrated Data Science, AI & Gen AI Education",
  subtitle: "Exafluence Inc., USA, in collaboration with Sri Venkateswara University.",
  introduction: "Exafluence Inc., USA, in collaboration with Sri Venkateswara University (SVU), connects academic study with practical applications in data science, artificial intelligence, machine learning and generative AI. Supported by Exafluence Education, students develop technical knowledge through guided practice, industry use cases and project-based exploration.",
  seoTitle: "SVU Data Science, AI & Gen AI | Exafluence Education",
  seoDescription: "Explore industry-integrated data science education through Exafluence and SVU, with applied AI, Gen AI projects, research and student innovation.",
};

export const svuProjectAreas = [
  { title: "Data Engineering", text: "Data pipelines, ETL automation, lineage tracking and data quality.", icon: Database, tone: "blue", projectIndex: 1 },
  { title: "AI & Generative AI", text: "Conversational assistants, document processing and research tools.", icon: BrainCircuit, tone: "violet", projectIndex: 4 },
  { title: "Predictive Analytics", text: "Demand forecasting, retail analysis and predictive maintenance.", icon: BarChart3, tone: "teal", projectIndex: 25 },
  { title: "Computer Vision", text: "Gesture recognition, parking detection and deepfake analysis.", icon: ScanEye, tone: "blue", projectIndex: 27 },
] as const;

// The wide PanIIT group photograph appears once, inside its card, with nobody stretched or cropped.
// Approved narrative copy, client, 4 November 2026: each card carries its own paragraphs, no photo caption.
export const svuOverviewAchievements = [
  {
    title: "Student Participation at PanIIT Andhra Pradesh Summit",
    photo: summitGroup,
    alt: "SVU–Exafluence students with faculty at the PanIIT Andhra Pradesh Summit 2026",
    paragraphs: [
      "MS Data Science students M Jayalakshmi and Telapalli Sai Sukrutha represented the SVU–Exafluence programme at the PanIIT Andhra Pradesh Summit 2026 in Vijayawada, gaining exposure to advanced technologies and industry perspectives.",
      "SVU Vice-Chancellor Prof. Tata Narasinga Rao and Prof. G. Anjan Babu, Chairman, Board of Studies in Computer Science, appreciated their participation and encouraged them to pursue further learning and networking opportunities.",
    ],
  },
  {
    title: "Student Innovation at Ratan Tata Innovation Hub",
    photo: innovation,
    alt: "Exafluence Education students presenting their product at the Ratan Tata Innovation Hub, Tirupati",
    paragraphs: [
      "Exafluence Education students showcased their product at the Ratan Tata Innovation Hub, Tirupati. SVU Vice-Chancellor Prof. Appa Rao, along with SVU officials, appreciated the students’ innovation and practical application of technology.",
    ],
  },
];

