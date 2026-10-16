import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/exf-education-logo.png.asset.json";
import { Menu, X, ChevronDown } from "lucide-react";
import { menuCategories, navPages } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import catCore from "@/assets/cat-core.png";
import catAcademic from "@/assets/cat-academic.png";
import catIndustry from "@/assets/cat-industry.png";
import catLearning from "@/assets/cat-learning.png";

const catIcons: Record<string, string> = { core: catCore, academic: catAcademic, industry: catIndustry, learning: catLearning };

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  return (
    <header className="site-header sticky top-0 z-50 border-b">
      <div className="container flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex min-w-0 items-center" aria-label="Exafluence Education home">
          <span className="inline-flex min-w-0 items-center rounded-md bg-background px-1 py-0.5">
            <img src={logo.url} alt="Exafluence Education — A Division of Exafluence Inc., USA" className="h-10 w-auto max-w-[200px] object-contain" />
          </span>

        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
          <Button asChild variant="ghost" className="nav-on-navy"><Link to="/" aria-current={pathname === "/" ? "page" : undefined}>Home</Link></Button>
          <Button asChild variant="ghost" className="nav-on-navy"><Link to="/about" aria-current={pathname === "/about" ? "page" : undefined}>About Us</Link></Button>
          {menuCategories.map((c) => (
            <DropdownMenu key={c.slug}>
              <DropdownMenuTrigger asChild><Button variant="ghost" className={`nav-on-navy ${c.accent}`}><img src={catIcons[c.slug]} alt="" aria-hidden className="menu-cat-icon" loading="lazy" />{c.short}<ChevronDown className="h-3.5 w-3.5" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end" className={c.slug === "learning" ? "grid w-[520px] grid-cols-2 p-2 shadow-sm" : "w-72 p-2 shadow-sm"}>
                <div className={c.slug === "learning" ? "col-span-2 mb-1 flex items-center gap-3 border-b px-2 pb-2" : "mb-1 flex items-center gap-3 border-b px-2 pb-2"}>
                  <img src={catIcons[c.slug]} alt="" aria-hidden className="menu-cat-hero" loading="lazy" />
                  <span className={`text-sm font-medium ${c.accent}`}>{c.title}</span>
                </div>
                {navPages(c.slug).map((s) => (
                  <DropdownMenuItem key={s.path} asChild className="min-h-11 cursor-pointer gap-2.5">
                    <Link to={s.path} aria-current={pathname === s.path ? "page" : undefined}><s.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />{s.title}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          <Button asChild size="sm" className="ml-3 bg-primary-foreground text-primary hover:bg-primary-foreground/90"><Link to="/#partner-enquiry">Partner enquiry</Link></Button>
        </nav>
        <Button variant="ghost" size="icon" className="nav-on-navy nav-icon-btn lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">

          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="site-header-panel max-h-[calc(100dvh-5rem)] overflow-y-auto border-t lg:hidden">
          <div className="container py-4">
            <Button asChild variant="ghost" className="nav-on-navy h-11 w-full justify-start"><Link to="/" onClick={() => setOpen(false)}>Home</Link></Button>
            <Button asChild variant="ghost" className="nav-on-navy h-11 w-full justify-start"><Link to="/about" onClick={() => setOpen(false)}>About Us</Link></Button>

            <Accordion type="single" collapsible>
              {menuCategories.map((c) => (
                <AccordionItem key={c.slug} value={c.slug}>
                  <AccordionTrigger className={`nav-on-navy text-left font-normal ${c.accent}`}><span className="flex items-center gap-2.5"><img src={catIcons[c.slug]} alt="" aria-hidden className="menu-cat-icon" loading="lazy" />{c.title}</span></AccordionTrigger>
                  <AccordionContent>
                    {navPages(c.slug).map((s) => <Link key={s.path} to={s.path} onClick={() => setOpen(false)} className="mobile-sublink flex min-h-11 items-center gap-3 py-2 text-base"><s.icon className="h-4 w-4 shrink-0 text-muted-foreground" />{s.title}</Link>)}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <Button asChild className="mt-5 bg-primary-foreground text-primary hover:bg-primary-foreground/90"><Link to="/#partner-enquiry" onClick={() => setOpen(false)}>Partner enquiry</Link></Button>
          </div>
        </nav>
      )}
    </header>
  );
};
export default Header;
