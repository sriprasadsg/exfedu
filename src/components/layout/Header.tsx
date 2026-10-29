import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/exfedu-logo-darker.png.asset.json";
import { Menu, X, Search, Plus, Minus } from "lucide-react";
import { menuCategories, navPages, primaryNavigation, learningEcosystemPages, sidebarPages, organisations, programmes, type Organisation } from "@/data/site";
import { organisationPath, programmePath } from "@/lib/programmeNavigation";
import { Building2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); setQuery(""); setExpanded(null); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, [open]);
  const q = query.trim().toLowerCase();
  const searchResults = q ? [
    ...(Object.keys(organisations) as Organisation[]).map((o) => ({ path: organisationPath(o), title: `${organisations[o].name} — Our Collaboration Network`, icon: Building2, searchKeywords: o })),
    ...programmes.map((p) => ({ path: programmePath(p), title: `${p.title} (${organisations[p.organisation].name})`, icon: BookOpen })),
    ...menuCategories.flatMap((c) => navPages(c.slug)),
  ].filter((s) => `${s.title} ${"searchKeywords" in s ? s.searchKeywords : ""}`.toLowerCase().includes(q)) : [];
  return (
    <header className="site-header sticky top-0 z-50 border-b">
      <div className="container flex h-20 items-center justify-between gap-2">
        <Link to="/" className="flex min-w-0 items-center" aria-label="Exafluence Education home">
          <img src={logo.url} alt="Exafluence Education — An EdTech unit of Exafluence Inc., USA" className="h-12 w-auto max-w-[150px] lg:max-w-[220px] object-contain" />

        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-0 min-[900px]:flex">
          {primaryNavigation.map((item) => (
            <Button key={item.path} asChild variant={item.path.includes("#") ? "default" : "ghost"} size={item.path.includes("#") ? "sm" : "default"} className={item.path.includes("#") ? "ml-2 nav-cta gap-1.5" : "nav-on-navy gap-1.5 px-2 lg:px-3"}>
              <Link to={item.path} aria-current={!item.path.includes("#") && pathname.startsWith(item.path) ? "page" : undefined}><item.icon aria-hidden="true" />{item.title}</Link>
            </Button>
          ))}
        </nav>
        <Button variant="ghost" size="icon" className="nav-on-navy nav-icon-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">

          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50">
          <Button type="button" variant="ghost" aria-label="Dismiss menu" className="absolute inset-0 h-full w-full rounded-none bg-foreground/50 hover:bg-foreground/50" onClick={() => setOpen(false)} />
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="site-header-panel relative flex h-full w-[min(92vw,420px)] flex-col overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-300 motion-reduce:animate-none border-b-4 border-primary">
            <Button type="button" onClick={() => setOpen(false)} className="flex h-24 w-28 shrink-0 rounded-none items-center justify-center bg-primary text-primary-foreground font-medium underline underline-offset-4">Close</Button>
            <div className="px-8 py-8">
              <form role="search" onSubmit={(e) => e.preventDefault()} className="mb-4 flex items-center bg-muted p-1.5">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search collaborators, programmes, pages" aria-label="Search the site" className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-sm italic outline-none" />
                <span className="flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground"><Search className="h-5 w-5" aria-hidden="true" /></span>
              </form>
              {query.trim() ? (
                <ul className="divide-y border-b">
                  {searchResults.length ? searchResults.map((s) => <li key={s.path}><Link to={s.path} onClick={() => setOpen(false)} className="flex min-h-12 items-center gap-3 py-2 text-primary"><s.icon className="h-4 w-4 shrink-0" />{s.title}</Link></li>) : <li className="py-4 text-sm text-muted-foreground">No matching pages.</li>}
                </ul>
              ) : (
                <ul className="border-b">
                  {primaryNavigation.filter(item => !item.path.includes("#")).map(item => (
                    <li key={item.path} className="border-t first:border-t-0"><Link to={item.path} onClick={() => setOpen(false)} className="flex min-h-12 items-center gap-3 text-base font-medium text-primary"><item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />{item.title}</Link></li>
                  ))}
                  <li className="border-t">
                    <Button variant="ghost" onClick={() => setExpanded(expanded ? null : "learning")} aria-expanded={expanded === "learning"} aria-controls="sidebar-learning" className="h-auto min-h-12 w-full justify-between gap-4 rounded-none px-0 text-left text-base font-medium text-primary whitespace-normal">
                      Learning Ecosystem{expanded ? <Minus aria-hidden="true" /> : <Plus aria-hidden="true" />}
                    </Button>
                    {expanded && <div id="sidebar-learning" className="pb-3">{learningEcosystemPages.map(page => <Link key={page.path} to={page.path} onClick={() => setOpen(false)} className="flex min-h-10 items-center gap-3 py-1 text-sm text-foreground hover:text-primary"><page.icon className="h-4 w-4 shrink-0" aria-hidden="true" />{page.title}</Link>)}</div>}
                  </li>
                  {sidebarPages.map(page => (
                    <li key={page.path} className="border-t"><Link to={page.path} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 py-2 text-sm font-medium text-primary"><page.icon className="h-4 w-4 shrink-0" aria-hidden="true" />{page.title}</Link></li>
                  ))}
                </ul>
              )}
              <div className="mt-6 flex flex-col gap-4 text-sm font-medium text-foreground">
                <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                <Link to="/programmes" onClick={() => setOpen(false)}>Programmes</Link>
                <Link to="/#partner-enquiry" onClick={() => setOpen(false)}>Enquire Now</Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
export default Header;
