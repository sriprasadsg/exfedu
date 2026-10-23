import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/exfedu-logo-darker.png.asset.json";
import { Menu, X, ChevronDown, House, Info, MessageCircle, Search, Plus, Minus } from "lucide-react";
import { menuCategories, navPages } from "@/data/site";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import catCore from "@/assets/cat-core.png";
import catAcademic from "@/assets/cat-academic.png";
import catIndustry from "@/assets/cat-industry.png";
import catLearning from "@/assets/cat-learning.png";

const catIcons: Record<string, string> = { core: catCore, academic: catAcademic, industry: catIndustry, learning: catLearning };

const Header = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);
  const { pathname } = useLocation();
  useEffect(() => { setOpen(false); setQuery(""); }, [pathname]);
  const q = query.trim().toLowerCase();
  const searchResults = q ? menuCategories.flatMap((c) => navPages(c.slug)).filter((s) => s.title.toLowerCase().includes(q)) : [];
  return (
    <header className="site-header sticky top-0 z-50 border-b">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center" aria-label="Exafluence Education home">
          <img src={logo.url} alt="Exafluence Education — An EdTech unit of Exafluence Inc., USA" className="h-12 w-auto max-w-[150px] lg:max-w-[220px] object-contain" />

        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-0 min-[900px]:flex">
          <Button asChild variant="ghost" className="nav-on-navy gap-1.5 px-2 lg:px-4"><Link to="/" aria-current={pathname === "/" ? "page" : undefined}><House className="h-4 w-4 shrink-0" aria-hidden="true" />Home</Link></Button>
          <Button asChild variant="ghost" className="nav-on-navy gap-1.5 px-2 lg:px-4"><Link to="/about" aria-current={pathname === "/about" ? "page" : undefined}><Info className="h-4 w-4 shrink-0" aria-hidden="true" />About Us</Link></Button>
          {menuCategories.map((c) => (
            c.slug === "academic" ? <Button key={c.slug} asChild variant="ghost" className={`nav-on-navy gap-1.5 px-2 lg:px-4 ${c.accent}`}><Link to="/collaboration-network" aria-current={pathname.startsWith("/collaboration-network") ? "page" : undefined}><img src={catIcons.academic} alt="" aria-hidden="true" className="menu-cat-icon" />{c.title}</Link></Button> :
            <DropdownMenu key={c.slug}>
              <DropdownMenuTrigger asChild><Button variant="ghost" className={`nav-on-navy gap-1.5 px-2 lg:px-4 ${c.accent}`}><img src={catIcons[c.slug]} alt="" aria-hidden className="menu-cat-icon" loading="lazy" />{c.short}<ChevronDown className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={`nav-menu-panel ${c.slug === "learning" ? "grid w-[520px] grid-cols-2 p-2" : "w-72 p-2"}`}>
                <div className={c.slug === "learning" ? "col-span-2 mb-1 flex items-center gap-3 border-b px-2 pb-2" : "mb-1 flex items-center gap-3 border-b px-2 pb-2"}>
                  <img src={catIcons[c.slug]} alt="" aria-hidden className="menu-cat-hero" loading="lazy" />
                  <span className={`text-sm font-medium ${c.accent}`}>{c.title}</span>
                </div>
                {navPages(c.slug).map((s) => (
                  <DropdownMenuItem key={s.path} asChild className="nav-menu-item min-h-11 cursor-pointer gap-2.5">
                    <Link to={s.path} aria-current={pathname === s.path ? "page" : undefined}><s.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />{s.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          <Button asChild size="sm" className="ml-2 nav-cta gap-1.5"><Link to="/#partner-enquiry"><MessageCircle className="h-4 w-4" aria-hidden="true" />Partner enquiry</Link></Button>
        </nav>
        <Button variant="ghost" size="icon" className="nav-on-navy nav-icon-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">

          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-foreground/50" onClick={() => setOpen(false)} />
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="relative flex h-full w-[min(92vw,420px)] flex-col overflow-y-auto bg-background shadow-2xl animate-in slide-in-from-left duration-300 border-b-4 border-primary">
            <button type="button" onClick={() => setOpen(false)} className="flex h-24 w-28 shrink-0 items-center justify-center bg-primary text-primary-foreground font-medium underline underline-offset-4">Close</button>
            <div className="px-8 py-8">
              <form role="search" onSubmit={(e) => e.preventDefault()} className="mb-4 flex items-center bg-muted p-1.5">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Exafluence Education" aria-label="Search the site" className="min-w-0 flex-1 bg-transparent px-2.5 py-2 text-sm italic outline-none" />
                <span className="flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground"><Search className="h-5 w-5" aria-hidden="true" /></span>
              </form>
              {query.trim() ? (
                <ul className="divide-y border-b">
                  {searchResults.length ? searchResults.map((s) => <li key={s.path}><Link to={s.path} onClick={() => setOpen(false)} className="flex min-h-12 items-center gap-3 py-2 text-primary"><s.icon className="h-4 w-4 shrink-0" />{s.title}</Link></li>) : <li className="py-4 text-sm text-muted-foreground">No matching pages.</li>}
                </ul>
              ) : (
                <ul className="border-b">
                  <li className="border-t first:border-t-0"><Link to="/about" onClick={() => setOpen(false)} className="flex min-h-16 items-center text-2xl font-medium text-primary">About Us</Link></li>
                  <li className="border-t"><Link to="/collaboration-network" onClick={() => setOpen(false)} className="flex min-h-16 items-center text-2xl font-medium text-primary">Our Collaboration Network</Link></li>
                  {menuCategories.filter((c) => c.slug !== "academic").map((c) => {
                    const isOpen = expanded === c.slug;
                    return (
                      <li key={c.slug} className="border-t">
                        <button type="button" onClick={() => setExpanded(isOpen ? null : c.slug)} aria-expanded={isOpen} className="flex min-h-16 w-full items-center justify-between gap-4 text-left text-2xl font-medium text-primary">
                          {c.title}{isOpen ? <Minus className="h-6 w-6 shrink-0" /> : <Plus className="h-6 w-6 shrink-0" />}
                        </button>
                        {isOpen && <div className="pb-3">{navPages(c.slug).map((s) => <Link key={s.path} to={s.path} onClick={() => setOpen(false)} className="flex min-h-11 items-center gap-3 py-1.5 pl-1 text-base text-foreground hover:text-primary"><s.icon className="h-4 w-4 shrink-0 text-muted-foreground" />{s.title}</Link>)}</div>}
                      </li>
                    );
                  })}
                </ul>
              )}
              <div className="mt-6 flex flex-col gap-4 text-sm font-medium text-foreground">
                <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                <Link to="/contact" onClick={() => setOpen(false)}>Contact</Link>
                <Link to="/#partner-enquiry" onClick={() => setOpen(false)}>Partner enquiry</Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
export default Header;
