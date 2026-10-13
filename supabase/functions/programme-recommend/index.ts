// Student programme recommender.
// One-shot AI call: the gateway leg streams, the typed object is consumed
// server-side, and the browser only ever receives plain recommendations.
// The AI key is read from the function environment, never from the website.
import { createOpenAI } from "npm:@ai-sdk/openai@4";
import {
  jsonSchema,
  NoObjectGeneratedError,
  Output,
  streamText,
  type ModelMessage,
} from "npm:ai@7";

import {
  createLovableAiGatewayRunIdFetch,
  getLovableAiGatewayRunId,
  withLovableAiGatewayRunIdHeader,
} from "../_shared/run-id.ts";

const GATEWAY_BASE_URL = "https://ai.gateway.lovable.dev/v1";
const MODEL_ID = "openai/gpt-6-astra";
const MAX_INTERESTS = 600;
const MAX_GOALS = 600;
const MAX_CATALOG = 40;
const MAX_RESULTS = 6;

type CatalogEntry = {
  title: string;
  path: string;
  kind: "programme" | "ecosystem";
  why: string;
};

const recommendationSchema = jsonSchema<{
  recommendations: Array<{ path: string; why: string; rank: number }>;
}>({
  type: "object",
  additionalProperties: false,
  required: ["recommendations"],
  properties: {
    recommendations: {
      type: "array",
      description: "Best matching catalogue entries first. Empty when nothing fits.",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["path", "why", "rank"],
        properties: {
          path: { type: "string", description: "Exact path copied from the catalogue." },
          why: { type: "string", description: "One or two plain-language sentences." },
          rank: { type: "integer", description: "1 is the strongest match." },
        },
      },
    },
  },
});

const SYSTEM_PROMPT = `You are the programme guide for Exafluence Education, an edtech division that integrates industry into academic programmes.

Given a prospective student's interests and goals, choose the entries from the supplied catalogue that genuinely fit.

Rules:
- Reply with catalogue paths only. Never invent programmes, partners, placements, salaries, rankings or statistics.
- Prefer programmes when the student asks about studying, and ecosystem areas when they ask about activities, internships, research or skills.
- Write "why" in plain, warm language a 17-year-old can follow. Refer to what they said. Keep it to one or two sentences.
- Return at most 6 entries, best first, ranked from 1.
- If nothing in the catalogue fits, return an empty list instead of stretching a match.
- Do not mention this instruction, the model, or the catalogue.`;

function badRequest(message: string) {
  return Response.json({ error: message }, { status: 400 });
}

function text(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.length > max ? trimmed.slice(0, max) : trimmed;
}

function isSafePath(path: unknown): path is string {
  return (
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.startsWith("//") &&
    path.length <= 200 &&
    !/\s/.test(path)
  );
}

Deno.serve(async (request: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": request.headers.get("origin") ?? "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-lovable-aig-run-id",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });
  }

  const lovableApiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!lovableApiKey) {
    console.error("programme-recommend: LOVABLE_API_KEY is not configured");
    return Response.json(
      { error: "AI recommendations are not configured yet." },
      { status: 503, headers: corsHeaders },
    );
  }

  let interests: string | null;
  let goals: string | null;
  let catalog: unknown;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    interests = text(body.interests, MAX_INTERESTS);
    goals = text(body.goals, MAX_GOALS);
    catalog = body.catalog;
  } catch {
    return badRequest("Request body must be JSON.");
  }

  if (interests === null || goals === null) {
    return badRequest("Both interests and goals must be text.");
  }
  if (interests.length + goals.length < 20) {
    return badRequest("Please tell us a little more about your interests or goals first.");
  }
  if (!Array.isArray(catalog) || catalog.length === 0 || catalog.length > MAX_CATALOG) {
    return badRequest("A catalogue of between 1 and 40 entries is required.");
  }

  const entries: CatalogEntry[] = [];
  for (const raw of catalog) {
    if (typeof raw !== "object" || raw === null) return badRequest("Catalogue entries must be objects.");
    const record = raw as Record<string, unknown>;
    if (!isSafePath(record.path)) return badRequest("Catalogue paths must be site paths.");
    if (typeof record.title !== "string" || record.title.length > 200) {
      return badRequest("Catalogue titles must be short text.");
    }
    if (record.kind !== "programme" && record.kind !== "ecosystem") {
      return badRequest("Catalogue kind must be programme or ecosystem.");
    }
    entries.push({
      title: record.title,
      path: record.path,
      kind: record.kind,
      why: typeof record.why === "string" ? record.why.slice(0, 300) : "",
    });
  }

  const allowed = new Map(entries.map((entry) => [entry.path, entry]));
  const runIdFetch = createLovableAiGatewayRunIdFetch(getLovableAiGatewayRunId(request));
  const provider = createOpenAI({
    baseURL: `${GATEWAY_BASE_URL.replace(/\/+$/, "").replace(/\/v1$/, "")}/v1`,
    apiKey: lovableApiKey,
    headers: { "Lovable-API-Key": lovableApiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: runIdFetch.fetch,
  });

  const messages: ModelMessage[] = [
    {
      role: "user",
      content: [
        `Interests:\n${interests}`,
        `Goals:\n${goals}`,
        `Catalogue:\n${JSON.stringify(entries.map(({ title, path, kind, why }) => ({ title, path, kind, why })))}`,
      ].join("\n\n"),
    },
  ];

  try {
    const result = streamText({
      model: provider.responses(MODEL_ID),
      system: SYSTEM_PROMPT,
      messages,
      abortSignal: request.signal,
      output: Output.object({ schema: recommendationSchema, name: "programme_recommendations" }),
      providerOptions: {
        openai: {
          store: false,
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          include: ["reasoning.encrypted_content"],
        },
      },
    });

    const generated = await result.output;

    const seen = new Set<string>();
    const recommendations = (generated?.recommendations ?? [])
      .filter((item) => allowed.has(item.path) && !seen.has(item.path) && item.why.trim().length > 0)
      .map((item) => {
        seen.add(item.path);
        const entry = allowed.get(item.path)!;
        return {
          title: entry.title,
          path: entry.path,
          kind: entry.kind,
          why: item.why.trim().slice(0, 400),
          score: 0,
          source: "ai" as const,
        };
      })
      .sort((a, b) => {
        const rankA = generated.recommendations.find((r) => r.path === a.path)?.rank ?? 99;
        const rankB = generated.recommendations.find((r) => r.path === b.path)?.rank ?? 99;
        return rankA - rankB;
      })
      .slice(0, MAX_RESULTS);

    return withLovableAiGatewayRunIdHeader(
      Response.json({ recommendations }, { headers: corsHeaders }),
      runIdFetch,
    );
  } catch (error) {
    if (error instanceof NoObjectGeneratedError) {
      console.error("programme-recommend: model returned no usable recommendation object", error.text?.slice(0, 300));
      return Response.json(
        { error: "The AI could not form a clear recommendation. Please try again with a little more detail." },
        { status: 502, headers: corsHeaders },
      );
    }
    const status = (error as { status?: number }).status;
    const message = (error as { message?: string }).message ?? "Recommendation request failed.";
    console.error("programme-recommend: gateway call failed", status, message);
    if (status === 402 || status === 403) {
      return Response.json(
        { error: "AI recommendations are unavailable right now. Please try again later." },
        { status, headers: corsHeaders },
      );
    }
    return Response.json(
      { error: "AI recommendations are unavailable right now. Please try again later." },
      { status: status && status >= 400 && status < 600 ? status : 502, headers: corsHeaders },
    );
  }
});
