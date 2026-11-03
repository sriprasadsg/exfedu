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
export const svuOverviewAchievements = [
  { title: "Innovation Showcase", text: "Students demonstrated their product at the Ratan Tata Innovation Hub in Tirupati.", photo: innovation, alt: "Student innovation presentation, Tirupati", caption: "" },
  { title: "Technology Community Participation", text: "MS Data Science students participated in the PanIIT Andhra Pradesh Summit 2026, gaining exposure to emerging technologies and industry discussions.", photo: summitGroup, alt: "SVU\u2013Exafluence student participation at the PanIIT Andhra Pradesh Summit 2026", caption: "SVU\u2013Exafluence student participation at the PanIIT Andhra Pradesh Summit 2026." },
];
