import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/exf-education-logo.png.asset.json";
import { Menu, X, ChevronDown } from "lucide-react";
import { categories, sections } from "@/data/site";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo.url} alt="exf Education — An EdTech unit of Exafluence Inc. USA" className="h-11 w-auto" />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {categories.map((c) => (
            <div key={c.slug} className="group relative">
              <Button variant="ghost" className="flex items-center gap-1 px-3 py-2">
                {c.title} <ChevronDown className="h-3.5 w-3.5" />
              </Button>
              <div className="invisible absolute left-0 top-full w-64 rounded-xl border bg-popover p-2 opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                {sections.filter((s) => s.category === c.slug).map((s) => (
                  <Link key={s.slug} to={`/${s.slug}`} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
                    <s.icon className="h-4 w-4 text-accent" /> {s.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Button asChild className="ml-2"><Link to="/#partner-enquiry">Partner enquiry</Link></Button>
        </nav>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <div className="border-t bg-background lg:hidden">
          <div className="container space-y-4 py-4">
            {categories.map((c) => (
              <div key={c.slug}>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.title}</p>
                {sections.filter((s) => s.category === c.slug).map((s) => (
                  <Link key={s.slug} to={`/${s.slug}`} onClick={() => setOpen(false)} className="block py-1.5 text-sm">{s.title}</Link>
                ))}
              </div>
            ))}
            <Link to="/#partner-enquiry" onClick={() => setOpen(false)} className="block font-medium text-accent">Partner enquiry</Link>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
