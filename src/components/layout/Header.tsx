import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/exfedu-logo-nibless.png";
import logoNib from "@/assets/exfedu-logo-nib.png";

import { Menu, X, Search, Plus, Minus, Network, ChevronDown } from "lucide-react";
import { svuSectionPath, type SvuSectionId } from "@/lib/programmeNavigation";
import { menuCategories, navPages, organisationSections, primaryNavigation, organisations, programmes, type Organisation } from "@/data/site";
import { organisationPath, programmePath } from "@/lib/programmeNavigation";
import { Building2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const collaborationOrder: Organisation[] = ["SVU", "IBM"];

/** Menu colour (client, 2 November 2026): each primary destination carries its own classic
 *  tone across both label and icon. SkillShone keeps its own navy-to-red brand. */
const navTone: Record<string, string> = {
  "/about": "nav-tone-about",
  "/collaboration-network": "nav-tone-network",
  "/skillshone": "nav-tone-skillshone",
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [networkOpen, setNetworkOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); setQuery(""); setExpanded(null); setNetworkOpen(false); }, [pathname]);
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
  const svuSections = organisationSections.SVU ?? [];
  const openGroup = expanded === "collaboration";

  return (
    <header className="site-header sticky top-0 z-50 border-b">
      <div className="container flex h-20 items-center justify-between gap-2">
        <Link to="/" className="flex min-w-0 items-center" aria-label="Exafluence Education home">
          <span className="relative inline-block h-12 w-auto" style={{ aspectRatio: "1068 / 416" }}>
            <img src={logo} alt="Exafluence Education — An EdTech unit of Exafluence Inc., USA" className="absolute inset-0 h-full w-full object-contain" />
            {/* The pen nib is lifted out of the mark so it can drift on its own (client, 2 Nov 2026). */}
            <img src={logoNib} alt="" aria-hidden="true" className="site-logo-nib absolute" style={{ left: "63.015%", top: "27.644%", width: "8.333%", height: "24.279%" }} />
          </span>



        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-0 min-[900px]:flex">
          {primaryNavigation.map((item) => {
            const btn = <Button key={item.path} asChild variant={item.path.includes("#") ? "default" : "ghost"} size={item.path.includes("#") ? "sm" : "default"} className={`${item.path.includes("#") ? "ml-2 nav-cta gap-1.5" : "nav-on-navy gap-1.5 px-2 lg:px-3"} ${navTone[item.path] ?? ""}`}>
              <Link to={item.path} aria-current={!item.path.includes("#") && pathname.startsWith(item.path) ? "page" : undefined}><item.icon aria-hidden="true" />{item.title}</Link>
            </Button>;
            if (item.path !== "/collaboration-network") return btn;
            return <div key={item.path} className="group relative" onKeyDown={(event) => { if (event.key === "Escape") { setNetworkOpen(false); event.currentTarget.querySelector("button")?.focus(); } }}>
              <Button type="button" variant="ghost" className="nav-on-navy nav-tone-network gap-1.5 px-2 lg:px-3" aria-expanded={networkOpen} aria-controls="desktop-collaboration" onClick={() => setNetworkOpen(!networkOpen)}><item.icon aria-hidden="true" />{item.title}<ChevronDown className="h-3.5 w-3.5" aria-hidden="true" /></Button>
              <ul id="desktop-collaboration" className={`${networkOpen ? "visible opacity-100" : "invisible opacity-0"} absolute left-0 top-full z-50 min-w-[260px] rounded-lg border border-border bg-background p-1.5 shadow-lg transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100`}>
                {collaborationOrder.map((o) => <li key={o}>
                  {/* Hover swaps front and back: the block takes the label's navy, the label takes the panel's white. */}
                  <Link to={organisationPath(o)} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground focus-visible:outline-none">
                    {o === "SVU" ? "Sri Venkateswara University" : "IBM"}
                  </Link>
                </li>)}
              </ul>
            </div>;
          })}
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
                  {primaryNavigation.filter(item => !item.path.includes("#") && item.path !== "/collaboration-network").map(item => (
                    <li key={item.path} className="border-t first:border-t-0"><Link to={item.path} onClick={() => setOpen(false)} className={`flex min-h-12 items-center gap-3 text-base font-medium text-primary ${navTone[item.path] ?? ""}`}><item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />{item.title}</Link></li>
                  ))}
                  <li className="border-t">
                    <div className="flex min-h-12 items-center gap-2">
                      <Button type="button" variant="ghost" onClick={() => setExpanded(openGroup ? null : "collaboration")} aria-expanded={openGroup} aria-controls="sidebar-collaboration" className="nav-tone-network h-auto min-w-0 flex-1 justify-start gap-3 px-0 text-base font-medium text-primary"><Network className="h-4 w-4 shrink-0" aria-hidden="true" />Our Collaboration Network</Button>
                      <Button type="button" variant="ghost" size="icon" aria-label={openGroup ? "Hide collaboration sections" : "Show collaboration sections"} aria-expanded={openGroup} aria-controls="sidebar-collaboration" onClick={() => setExpanded(openGroup ? null : "collaboration")} className="h-9 w-9 shrink-0 text-primary">{openGroup ? <Minus className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}</Button>
                    </div>
                    {openGroup && (
                      <div id="sidebar-collaboration" className="pb-3">
                        {collaborationOrder.map((organisation) => (
                          <div key={organisation} className="pt-1">
                            <Link to={organisationPath(organisation)} onClick={() => setOpen(false)} className="flex min-h-10 items-center gap-3 text-sm font-medium text-primary">{organisations[organisation].name}</Link>
                            {organisation === "SVU" && (
                              <ul className="ml-2 border-l pl-4">
                                {svuSections.map(section => (
                                  <li key={section.id}><Link to={svuSectionPath(section.id as SvuSectionId)} onClick={() => setOpen(false)} className="flex min-h-9 items-center gap-2.5 py-0.5 text-sm text-foreground hover:text-primary"><section.icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />{section.title}</Link></li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
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
