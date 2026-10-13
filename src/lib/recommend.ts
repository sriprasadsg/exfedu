/**
 * Student programme recommender.
 * Local keyword matching runs in the browser now. The AI recommendation is
 * intentionally NOT connected: when Exafluence AWS Cloud hosts the AI endpoint,
 * set recommendConfig.endpoint (e.g. import.meta.env.VITE_RECOMMEND_API_URL).
 * The AWS endpoint should accept { interests, goals, catalog } and return
 * { recommendations: Recommendation[] }. The AI key must live on the AWS
 * server, never in this website.
 */
import { programmes, arms } from "@/data/site";

export const recommendConfig = {
  mode: "test" as "test" | "production",
  endpoint: "",
};

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
  "/academic-collaborations": ["university", "degree", "college", "academic", "svu", "xime", "campus"],
  "/industry-collaborations": ["industry", "ibm", "company", "corporate", "technology partner"],
  "/student-success": ["achievement", "success", "placement", "growth", "alumni"],
};

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

/** AI recommendation via the Exafluence AWS endpoint. Not connected yet. */
export async function recommendWithAI(interests: string, goals: string): Promise<Recommendation[]> {
  if (!recommendConfig.endpoint) {
    throw new Error("AI recommendations are not connected yet. The Exafluence AWS endpoint is pending.");
  }
  const res = await fetch(recommendConfig.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interests, goals, catalog }),
  });
  if (!res.ok) throw new Error(`Recommendation request failed (${res.status})`);
  const data = (await res.json()) as { recommendations: Recommendation[] };
  return data.recommendations.map((r) => ({ ...r, source: "ai" as const }));
}
