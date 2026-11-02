import { Activity, BarChart3, Bot, Brain, Camera, Cloud, Database, Droplets, Eye, FileText, GitBranch, Leaf, Lock, MessageSquare, Network, ShieldCheck, ShoppingCart, Stethoscope, TrendingUp, Wallet, type LucideIcon } from "lucide-react";

/** Theme icon for a project / paper title (client, 2 November 2026): colourful,
 * static (no animation), chosen from keywords in the title. */
const themes: { test: RegExp; icon: LucideIcon; hue: number }[] = [
  { test: /heart|health|medical|disease|patient|clinic|cancer|diagnos|transplant/i, icon: Stethoscope, hue: 350 },
  { test: /facial|face|image|vision|camera|video|detect/i, icon: Camera, hue: 265 },
  { test: /chatbot|assistant|conversation|nlp|language|text|sentiment|llm|gen ?ai/i, icon: MessageSquare, hue: 200 },
  { test: /fraud|security|secure|cyber|attack|intrusion|privacy/i, icon: ShieldCheck, hue: 12 },
  { test: /encrypt|blockchain|authent/i, icon: Lock, hue: 30 },
  { test: /lineage|pipeline|etl|mapping|workflow/i, icon: GitBranch, hue: 170 },
  { test: /water|rain|flood|irrigat/i, icon: Droplets, hue: 195 },
  { test: /crop|agri|plant|farm|soil|environment|climate|air|pollut/i, icon: Leaf, hue: 130 },
  { test: /stock|price|forecast|predict|trend/i, icon: TrendingUp, hue: 145 },
  { test: /finan|bank|loan|credit|payment|fintech/i, icon: Wallet, hue: 40 },
  { test: /retail|customer|sales|e-?commerce|recommend|market/i, icon: ShoppingCart, hue: 290 },
  { test: /cloud|aws|azure|deploy/i, icon: Cloud, hue: 210 },
  { test: /database|sql|data quality|warehouse|big data/i, icon: Database, hue: 225 },
  { test: /network|graph|iot|sensor/i, icon: Network, hue: 185 },
  { test: /dashboard|analytic|visuali|report/i, icon: BarChart3, hue: 250 },
  { test: /monitor|real-time|signal/i, icon: Activity, hue: 0 },
  { test: /robot|automat|agent/i, icon: Bot, hue: 220 },
  { test: /attention|eye|gaze/i, icon: Eye, hue: 275 },
  { test: /machine learning|deep learning|neural|model|ai\b|artificial|intelligen/i, icon: Brain, hue: 320 },
];

export const researchTheme = (title: string) => themes.find(t => t.test.test(title)) ?? { icon: FileText, hue: 215 };

export default function ResearchThemeIcon({ title }: { title: string }) {
  const { icon: Icon, hue } = researchTheme(title);
  return (
    <span className="research-theme-icon" aria-hidden="true" style={{ "--theme-hue": hue } as React.CSSProperties}>
      <Icon size={18} strokeWidth={1.8} />
    </span>
  );
}
