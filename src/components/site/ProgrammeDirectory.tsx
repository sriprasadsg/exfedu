import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Search, RotateCcw, BookOpen, Clock, Monitor, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { programmes, organisations, filterProgrammes } from "@/data/site";
import { programmePath } from "@/lib/programmeNavigation";

export const useProgrammeSeo = (title: string, description: string) => {
  useEffect(() => {
    const oldTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const oldDescription = meta?.getAttribute("content") ?? "";
    document.title = title; meta?.setAttribute("content", description);
    return () => { document.title = oldTitle; meta?.setAttribute("content", oldDescription); };
  }, [title, description]);
};

const ProgrammeDirectory = () => {
  const [params, setParams] = useSearchParams();
  useProgrammeSeo("Industry-Integrated Programmes | Exafluence Education", "Compare AI, Generative AI, Data Science, Cloud Technologies and Quantum Computing programmes from SVU, IBM and XIME Chennai.");
  const filters = Object.fromEntries(params.entries());
  const shown = filterProgrammes(filters);
  const update = (key: string, value: string) => { const next = new URLSearchParams(params); if (!value || value === "all") next.delete(key); else next.set(key, value); setParams(next, { replace: true }); };
  const choices = [
    { key: "organisation", label: "Organisation", values: Object.entries(organisations).map(([value, item]) => ({ value, label: item.name })) },
    { key: "subject", label: "Subject", values: [...new Set(programmes.flatMap(p => p.subjects))].map(value => ({ value, label: value })) },
    { key: "type", label: "Programme Type", values: [...new Set(programmes.map(p => p.level))].map(value => ({ value, label: value })) },
  ];
  return <main className="programme-experience">
    <header className="programme-intro"><div className="container"><nav aria-label="Breadcrumb"><Link to="/">Exafluence Education</Link><span>/</span>Programmes</nav>
      <span className="programme-eyebrow"><BookOpen size={18} /> Programmes</span><h1>Industry-Integrated Programmes</h1><p className="programme-subtitle">Academic Learning Connected with Industry Practice</p>
      <p>Explore learning pathways in AI, Gen AI, Data Science, Cloud Technologies and Quantum Computing. Compare programmes by organisation, duration and delivery mode, then review the features, technologies and certification for your chosen course.</p></div></header>
    <section className="container programme-list" aria-label="Programme directory">
      <div className="programme-filters"><label className="programme-search"><span>Search programmes</span><div><Search size={18} aria-hidden="true" /><Input aria-label="Search programmes" value={params.get("q") ?? ""} onChange={e => update("q", e.target.value)} placeholder="Programme or subject" /></div></label>
        {choices.map(choice => <label key={choice.key}><span>{choice.label}</span><Select value={params.get(choice.key) || "all"} onValueChange={value => update(choice.key, value)}><SelectTrigger aria-label={choice.label}><SelectValue /></SelectTrigger><SelectContent><SelectItem value="all">All {choice.label === "Programme Type" ? "types" : choice.label.toLowerCase() + "s"}</SelectItem>{choice.values.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent></Select></label>)}
        <Button variant="ghost" onClick={() => setParams({})}><RotateCcw size={16} />Reset filters</Button></div>
      <div className="programme-table"><div className="programme-table-head" aria-hidden="true"><span className="programme-head-cell programme-head-1"><i><BookOpen size={15} /></i><span>Programme</span></span><span className="programme-head-cell programme-head-2"><i><Clock size={15} /></i><span>Duration</span></span><span className="programme-head-cell programme-head-3"><i><Monitor size={15} /></i><span>Delivery Mode</span></span><span className="programme-head-cell programme-head-4"><i><CalendarDays size={15} /></i><span>Intake</span></span><span className="programme-head-cell programme-head-5"><i><ArrowRight size={15} /></i><span>View Details</span></span></div>
        {shown.map(p => <article key={p.slug} className="programme-row"><div><span className={`programme-org programme-org-${p.organisation.toLowerCase()}`}>{organisations[p.organisation].name}</span><h2><Link to={programmePath(p)}>{p.title}</Link></h2></div><p><span className="programme-mobile-label">Duration</span>{p.duration}</p><p><span className="programme-mobile-label">Delivery Mode</span>{p.delivery}</p><p><span className="programme-mobile-label">Intake</span>{p.intake}</p><Button variant="ghost" size="icon" asChild><Link aria-label={`View ${p.title}`} to={programmePath(p)}><ArrowRight /></Link></Button></article>)}
      </div>
      {!shown.length && <div className="programme-empty"><BookOpen size={30} /><h2>{params.get("organisation") === "XIME" ? "XIME Chennai programme details await review" : "No matching programmes"}</h2><p>{params.get("organisation") === "XIME" ? "Connecting financial knowledge with data analytics and AI applications. Programme title, eligibility, duration, curriculum and certification require approved source materials." : "Try another subject or reset your filters."}</p><Button variant="outline" onClick={() => setParams({})}><RotateCcw size={16} />Reset filters</Button></div>}
      <p className="programme-review-note">Dates appear only after approved university or institution notifications. Programme-specific details awaiting approval are identified on each page.</p>
    </section>
  </main>;
};
export default ProgrammeDirectory;