import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { aiReviewAvailable, checkBrandWording, requestAiReview, type BrandIssue } from "@/lib/brandCheck";

const MAX = 20000;

export default function BrandCheck() {
  const [text, setText] = useState("");
  const [issues, setIssues] = useState<BrandIssue[] | null>(null);
  const [aiState, setAiState] = useState<"idle" | "loading" | "error">("idle");
  const [aiMsg, setAiMsg] = useState("");

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    document.title = "Brand wording check · Exafluence Education admin";
    return () => meta.remove();
  }, []);

  const runRules = () => { setIssues(checkBrandWording(text)); setAiState("idle"); setAiMsg(""); };

  const runAi = async () => {
    setAiState("loading");
    try {
      const ai = await requestAiReview(text);
      setIssues([...(issues ?? checkBrandWording(text)), ...ai]);
      setAiState("idle");
    } catch (e) {
      setAiState("error");
      setAiMsg(e instanceof Error ? e.message : "AI review failed");
    }
  };

  const connected = aiReviewAvailable();

  return (
    <Layout>
      <section className="container max-w-4xl py-12 md:py-16">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Admin · Test mode</p>
        <h1 className="mt-2 font-display text-3xl font-medium md:text-4xl">Brand wording check</h1>
        <p className="mt-3 text-muted-foreground">
          Paste website copy to find inconsistent Exafluence brand wording. Rule checks run now; the AI review
          connects later through Exafluence AWS Cloud.
        </p>

        <label htmlFor="copy" className="mt-8 block text-sm font-medium">Website copy</label>
        <Textarea id="copy" value={text} maxLength={MAX} rows={10} className="mt-2"
          onChange={(e) => { setText(e.target.value); setIssues(null); }} placeholder="Paste page text here…" />
        <p className="mt-1 text-xs text-muted-foreground">{text.length.toLocaleString()} / {MAX.toLocaleString()}</p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button onClick={runRules} disabled={!text.trim()}>Check wording</Button>
          <Button variant="outline" onClick={runAi} disabled={!text.trim() || !connected || aiState === "loading"}>
            <Sparkles className="mr-2 h-4 w-4" />
            {connected ? (aiState === "loading" ? "Reviewing…" : "AI review") : "AI review (awaiting AWS)"}
          </Button>
        </div>
        {aiState === "error" && <p role="alert" className="mt-3 text-sm text-destructive">{aiMsg}</p>}

        {issues && (
          <div className="mt-8" aria-live="polite">
            {issues.length === 0 ? (
              <p className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-4 w-4 text-primary" /> No inconsistent brand wording found.</p>
            ) : (
              <>
                <p className="flex items-center gap-2 text-sm font-medium"><AlertCircle className="h-4 w-4 text-destructive" /> {issues.length} issue{issues.length > 1 ? "s" : ""} found</p>
                <ul className="mt-4 divide-y rounded-lg border">
                  {issues.map((i, n) => (
                    <li key={n} className="grid gap-1 p-4 text-sm sm:grid-cols-[1fr_1fr_1.2fr] sm:gap-4">
                      <span className="break-words"><span className="text-muted-foreground">Found: </span><s>{i.found}</s></span>
                      <span className="break-words"><span className="text-muted-foreground">Use: </span>{i.suggestion}</span>
                      <span className="text-muted-foreground">{i.reason}{i.source === "ai" ? " · AI" : ""}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </section>
    </Layout>
  );
}
