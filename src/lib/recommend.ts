/**
 * Student programme recommender.
 *
 * Local keyword matching runs in the browser for instant results. AI
 * recommendations run through a server-side function so the AI key never
 * reaches the website. `recommendConfig.endpoint` is the single wiring point:
 * leave it empty to use the built-in AI function, or set it to a full URL to
 * point the same request at an Exafluence-hosted endpoint.
 */
import { supabase } from "@/integrations/supabase/client";
import { programmes, arms } from "@/data/site";
import { programmePath } from "@/lib/programmeNavigation";

export const recommendConfig = {
  mode: "ai" as "ai" | "off",
  /** Empty = the project's own AI function. Set a full URL to override. */
  endpoint: "",
};

/** Below this the AI pass is skipped — the text is too thin to match honestly. */
export const MIN_COMBINED = 20;

export type Recommendation = {
  title: string;
  path: string;
  kind: "programme" | "ecosystem";
  why: string;
  score: number;
  source: "rule" | "ai";
};

type CatalogEntry = {
  title: string;
  path: string;
  kind: "programme" | "ecosystem";
  keywords: string[];
  why: string;
};

const programmeKeywords: Record<string, string[]> = {
  "masters-data-science": ["data", "science", "analytics", "master", "pg", "postgraduate", "statistics", "machine learning", "ml", "career", "degree"],
  "pg-diploma-data-science": ["data", "science", "diploma", "analytics", "pg", "postgraduate", "statistics", "short", "career switch"],
  "python-ai-ml-genai": ["python", "ai", "artificial intelligence", "ml", "machine learning", "genai", "generative", "coding", "programming", "chatgpt", "llm"],
  "data-visualization": ["visualization", "visualisation", "charts", "dashboard", "tableau", "power bi", "powerbi", "reporting", "design", "presentation"],
  "cloud-technologies": ["cloud", "aws", "azure", "devops", "infrastructure", "deployment", "servers", "kubernetes", "technology"],
};

const armKeywords: Record<string, string[]> = {
  "/practical-learning": ["hands-on", "practical", "labs", "projects", "capstone", "practice", "build"],
  "/internships": ["internship", "industry exposure", "visits", "experience", "odc", "work experience"],
  "/career-development": ["placement", "job", "career", "resume", "interview", "soft skills", "mentoring"],
  "/research-innovation": ["research", "publication", "paper", "conference", "hackathon", "innovation", "phd"],
  "/skillshone": ["courses", "assessment", "certificate", "certification", "skillshone", "online", "self-paced"],
  "/collaboration-network": ["university", "degree", "college", "academic", "svu", "xime", "campus"],
  "/industry-collaborations": ["industry", "ibm", "company", "corporate", "technology partner"],
  "/student-success": ["achievement", "success", "placement", "growth", "alumni"],
};

/** Keyword map over approved programmes and ecosystem arms. */
export const catalog: CatalogEntry[] = [
  ...programmes.map((p) => ({
    title: p.title,
    path: programmePath(p),
    kind: "programme" as const,
    keywords: programmeKeywords[p.slug] ?? [],
    why: `${p.level} programme`,
  })),
  ...arms.map((a) => ({
    title: a.title,
    path: a.path,
    kind: "ecosystem" as const,
    keywords: armKeywords[a.path] ?? [],
    why: a.subtitle,
  })),
];

const STOP = new Set(["the", "and", "for", "with", "want", "like", "from", "that", "this", "into", "are", "was", "have", "will"]);

function tokens(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2 && !STOP.has(t));
}

/** Local rule-based matching. Returns ranked recommendations, best first. */
export function recommendLocal(interests: string, goals: string): Recommendation[] {
  const query = `${interests} ${goals}`.toLowerCase();
  const words = new Set(tokens(query));
  const scored: Recommendation[] = [];

  for (const entry of catalog) {
    let score = 0;
    const matched: string[] = [];
    for (const kw of entry.keywords) {
      const hit = kw.includes(" ") ? query.includes(kw) : words.has(kw);
      if (hit) {
        score += kw.includes(" ") ? 2 : 1;
        matched.push(kw);
      }
    }
    if (score > 0) {
      scored.push({
        title: entry.title,
        path: entry.path,
        kind: entry.kind,
        why: `Matches your interest in ${matched.slice(0, 3).join(", ")} — ${entry.why}.`,
        score,
        source: "rule",
      });
    }
  }

  return scored.sort((a, b) => b.score - a.score).slice(0, 6);
}

/**
 * AI recommendation. Runs through the project's server-side AI function, so the
 * AI key stays off the website. Point recommendConfig.endpoint at an
 * Exafluence-hosted URL to send the identical request there instead.
 */
export async function recommendWithAI(interests: string, goals: string): Promise<Recommendation[]> {
  if (interests.trim().length + goals.trim().length < MIN_COMBINED) {
    throw new Error("Please tell us a little more about your interests or goals first.");
  }

  const aiCatalog = catalog.map(({ title, path, kind, why }) => ({ title, path, kind, why }));

  const { data, error } = await supabase.functions.invoke(
    recommendConfig.endpoint || "programme-recommend",
    { body: { interests, goals, catalog: aiCatalog } },
  );

  if (error) {
    const context = (error as { context?: unknown }).context;
    if (context instanceof Response) {
      const payload = (await context.json().catch(() => null)) as { error?: string } | null;
      throw new Error(payload?.error || "AI recommendations are unavailable right now.");
    }
    throw new Error(error.message || "AI recommendations are unavailable right now.");
  }

  const payload = data as { recommendations?: Recommendation[] } | null;
  return (payload?.recommendations ?? []).map((r) => ({ ...r, source: "ai" as const }));
}
