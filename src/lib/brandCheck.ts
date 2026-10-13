/**
 * Brand-wording checker.
 * Local rules run in the browser now. The AI review is intentionally NOT
 * connected: when Exafluence AWS Cloud hosts the AI endpoint, set
 * brandCheckConfig.endpoint (e.g. import.meta.env.VITE_BRAND_CHECK_API_URL).
 * The AWS endpoint should accept { text, rules } and return { issues: BrandIssue[] }.
 * The AI key must live on the AWS server, never in this website.
 */
export const brandCheckConfig = {
  mode: "test" as "test" | "production",
  endpoint: "",
};

export type BrandIssue = {
  found: string;
  suggestion: string;
  reason: string;
  index: number;
  source: "rule" | "ai";
};

export type BrandRule = { pattern: RegExp; suggestion: string; reason: string };

// Approved forms: "Exafluence", "Exafluence Education", "Exafluence Inc., USA",
// "SkillShone", "An Edtech Division of Exafluence Inc., USA".
export const brandRules: BrandRule[] = [
  { pattern: /\bExfluence\b|\bExaflunce\b|\bExafluance\b|\bExaflence\b/gi, suggestion: "Exafluence", reason: "Misspelled company name" },
  { pattern: /\b(?!Exafluence\b)exafluence\b|\bEXAFLUENCE\b|\bExaFluence\b/g, suggestion: "Exafluence", reason: "Incorrect capitalisation" },
  { pattern: /\bExa[\s-]fluence\b/gi, suggestion: "Exafluence", reason: "Company name is one word" },
  { pattern: /\bExf\s?Edu\b|\bExfedu\b|\bExafluence Edu\b/gi, suggestion: "Exafluence Education", reason: "Use the full brand name" },
  { pattern: /\bSkill\s?Shine\b|\bSkillshone\b|\bSkill[\s-]Shone\b|\bSKILLSHONE\b/g, suggestion: "SkillShone", reason: "Use the approved product spelling" },
  { pattern: /\bA\s+(?:Edtech\s+)?Division of Exafluence\b/g, suggestion: "An Edtech Division of Exafluence", reason: "Approved division wording" },
  { pattern: /\bExafluence Inc\.?\s*USA\b|\bExafluence Inc(?![.,])\b/g, suggestion: "Exafluence Inc., USA", reason: "Approved parent-company form" },
];

export function checkBrandWording(text: string, rules: BrandRule[] = brandRules): BrandIssue[] {
  const issues: BrandIssue[] = [];
  for (const r of rules) {
    for (const m of text.matchAll(new RegExp(r.pattern.source, r.pattern.flags))) {
      if (m[0] === r.suggestion) continue;
      issues.push({ found: m[0], suggestion: r.suggestion, reason: r.reason, index: m.index ?? 0, source: "rule" });
    }
  }
  return issues.sort((a, b) => a.index - b.index);
}

export const aiReviewAvailable = () => brandCheckConfig.mode === "production" && !!brandCheckConfig.endpoint;

export async function requestAiReview(text: string): Promise<BrandIssue[]> {
  if (!aiReviewAvailable()) throw new Error("AI review is not connected yet. It will run through Exafluence AWS Cloud.");
  const res = await fetch(brandCheckConfig.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, rules: brandRules.map((r) => ({ suggestion: r.suggestion, reason: r.reason })) }),
  });
  if (!res.ok) throw new Error((await res.json().catch(() => null))?.message ?? `AI review failed (${res.status})`);
  const data = await res.json();
  return (data.issues ?? []).map((i: BrandIssue) => ({ ...i, source: "ai" as const }));
}
