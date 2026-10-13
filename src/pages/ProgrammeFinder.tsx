import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Sparkles, ArrowUpRight, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { recommendLocal, recommendWithAI, type Recommendation } from "@/lib/recommend";

const MIN = 20;

const ProgrammeFinder = () => {
  const [interests, setInterests] = useState("");
  const [goals, setGoals] = useState("");
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  useEffect(() => {
    document.title = "Find Your Programme | Exafluence Education";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Describe your interests and goals to find relevant Exafluence Education programmes and ecosystem areas.");
  }, []);

  const ready = interests.trim().length + goals.trim().length >= MIN;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!ready) {
      setError("Please tell us a little more about your interests or goals first.");
      return;
    }

    // Show instant rule-based matches while the AI pass is still running.
    const local = recommendLocal(interests, goals);
    setResults(local.length ? local : null);

    setPending(true);
    try {
      const ai = await recommendWithAI(interests, goals);
      if (ai.length) {
        setResults(ai);
        setError("");
      } else if (!local.length) {
        setError("We couldn't match that yet — try mentioning topics like data, AI, cloud, design, research or careers.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "AI recommendations are unavailable right now.");
      if (!local.length) setResults(null);
    } finally {
      setPending(false);
    }
  };

  const fromAI = results?.some((r) => r.source === "ai");

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">For prospective students</p>
        <h1 className="mt-2 text-3xl font-medium tracking-tight text-foreground sm:text-4xl">Find your programme</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Tell us what you enjoy and where you want to go. We'll suggest Exafluence Education programmes and
          ecosystem areas that fit. Recommendations are guidance only — speak with our team before deciding.
        </p>

        <form onSubmit={submit} className="mt-8 grid gap-5 rounded-2xl border border-border bg-card p-5 sm:p-8">
          <div>
            <label htmlFor="interests" className="block text-sm font-medium text-foreground">Your interests</label>
            <textarea
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              rows={3}
              maxLength={600}
              placeholder="e.g. I enjoy working with data, solving problems, and I'm curious about artificial intelligence…"
              className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="goals" className="block text-sm font-medium text-foreground">Your goals</label>
            <textarea
              id="goals"
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
              rows={3}
              maxLength={600}
              placeholder="e.g. I want a career in analytics, hands-on projects, and an internship before I graduate…"
              className="mt-2 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={pending}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-wait disabled:opacity-70"
            >
              {pending ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Compass className="h-4 w-4" aria-hidden />}
              {pending ? "Thinking…" : "Suggest programmes"}
            </button>
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              AI-powered, based on what you tell us
            </span>
          </div>
        </form>

        {results && (
          <div className="mt-8">
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              {pending ? "Refining your matches…" : fromAI ? "Recommended for you" : "Closest matches"}
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((r) => (
                <Link
                  key={r.path + r.title}
                  to={r.path}
                  className="card-premium group rounded-2xl border border-border bg-card p-5"
                >
                  <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                    {r.kind === "programme" ? "Programme" : "Ecosystem area"}
                  </p>
                  <h2 className="mt-1.5 flex items-center gap-1.5 text-lg font-medium text-foreground">
                    {r.title}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-foreground" aria-hidden />
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.why}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProgrammeFinder;
