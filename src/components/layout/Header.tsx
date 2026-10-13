import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/exf-education-logo.png.asset.json";
import { Menu, X, ChevronDown } from "lucide-react";
import { categories, navPages } from "@/data/site";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex shrink-0 items-center">
          <img src={logo.url} alt="exf Education — An EdTech unit of Exafluence Inc. USA" className="h-10 w-auto" />
        </Link>
        <nav className="hidden items-center lg:flex">
          {categories.map((c, ci) => {
            const items = navPages(c.slug);
            const wide = items.length > 6;
            return (
              <div key={c.slug} className="group relative">
                <button className="flex items-center gap-1 whitespace-nowrap px-3 py-2 text-sm text-foreground/80 hover:text-primary">
                  {c.short} <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
                <div className={`invisible absolute top-full rounded-lg border bg-popover p-2 opacity-0 shadow-sm transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${ci > 1 ? "right-0" : "left-0"} ${wide ? "grid w-[34rem] grid-cols-2" : "w-64"}`}>
                  {items.map((s) => (
                    <Link key={s.path} to={s.path} className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm hover:bg-muted">
                      <s.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} /> {s.title}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
          <Button asChild size="sm" className="ml-3"><Link to="/contact">Enquire Now</Link></Button>
        </nav>
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t bg-background lg:hidden">
          <div className="container space-y-5 py-5">
            {categories.map((c) => (
              <div key={c.slug}>
                <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">{c.title}</p>
                {navPages(c.slug).map((s) => (
                  <Link key={s.path} to={s.path} onClick={() => setOpen(false)} className="block py-1.5 text-sm">{s.title}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
