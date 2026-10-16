import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, CircleDashed, ImageOff, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PENDING, PendingTag, pages, programmes, programmeAreas, galleryItems, type Block, type Page, type Tone } from "@/data/site";
import PartnerEnquiry from "@/components/home/PartnerEnquiry";

const H2 = ({ children }: { children: React.ReactNode }) => <h2 className="site-section-title font-display font-normal">{children}</h2>;

export const PendingTag = () => (
  <span className="inline-flex items-center gap-1.5 border-l border-dashed pl-2 text-xs text-muted-foreground">
    <CircleDashed className="h-3 w-3" /> {PENDING}
  </span>
);

const categoryTone: Record<string, Tone> = { academic: "blue", industry: "teal", learning: "violet", core: "amber" };

const LinkCard = ({ to, title, meta, icon: Icon, tone = "blue" }: {
  to: string; title: string; meta?: string; icon?: LucideIcon; tone?: Tone;
}) => (
  <Link to={to} className="ways-card">
    {Icon && (
      <span className={`ways-icon tone-${tone}`} aria-hidden>
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </span>
    )}
    <span className="min-w-0">
      <span className="ways-title">{title}</span>
      {meta && <span className="ways-line">{meta}</span>}
    </span>
    <ArrowRight className="ways-arrow ml-auto shrink-0" aria-hidden />
  </Link>
);

const AreaCard = ({ title, text, icon: Icon, tone }: { title: string; text: string; icon: LucideIcon; tone: Tone }) => (
  <div className="area-card">
    <span className={`ways-icon tone-${tone}`} aria-hidden>
      <Icon className="h-5 w-5" strokeWidth={1.5} />
    </span>
    <span className="min-w-0">
      <span className="ways-title">{title}</span>
      <span className="mt-1.5 block text-sm font-light leading-relaxed text-muted-foreground">{text}</span>
    </span>
  </div>
);

const Gallery = ({ filters }: { filters: string[] }) => {
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState<number | null>(null);
  const shown = galleryItems.filter((g) => active === "All" || g.category === active);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist">
        {filters.map((f) => (
          <Button variant="outline" key={f} role="tab" aria-selected={active === f} onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${active === f ? "border-primary bg-primary text-primary-foreground" : "hover:border-primary"}`}>{f}</Button>
        ))}
      </div>
      {shown.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-lg border border-dashed py-16 text-center text-muted-foreground">
          <ImageOff className="h-8 w-8" strokeWidth={1.25} />
          <p>No approved photos in {active === "All" ? "the gallery" : active} yet.</p>
          <PendingTag />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {shown.map((g, i) => (
            <Button variant="ghost" aria-label={`Open photo: ${g.alt}`} key={g.src} onClick={() => setOpen(i)} className="h-auto aspect-[4/3] overflow-hidden rounded-lg border p-0">
              <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </Button>
          ))}
        </div>
      )}
      <Dialog open={open !== null} onOpenChange={() => setOpen(null)}>
        <DialogContent className="max-w-4xl p-2">
          <DialogTitle className="sr-only">{open !== null ? shown[open]?.alt : "Photo"}</DialogTitle>
          {open !== null && shown[open] && <img src={shown[open].src} alt={shown[open].alt} className="w-full rounded" />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export const BlockView = ({ block, page }: { block: Block; page: Page }) => {
  switch (block.type) {
    case "text":
      return <div className="max-w-3xl">{block.title && <H2>{block.title}</H2>}<p className="mt-4 text-lg font-light leading-relaxed text-muted-foreground">{block.text}</p></div>;
    case "features":
      return (
        <div><H2>{block.title}</H2>{block.note && <p className="mt-2 text-muted-foreground">{block.note}</p>}
          <div className="mt-6 grid gap-px overflow-hidden rounded-lg border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {block.items.map((i) => <div key={i} className="flex items-start gap-3 bg-background p-5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} /><span>{i}</span></div>)}
          </div>
        </div>
      );
    case "pending":
      return (
        <div><H2>{block.title}</H2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {block.items.map((i) => <div key={i} className="rounded-lg border border-dashed p-5"><p className="mb-3">{i}</p><PendingTag /></div>)}
          </div>
        </div>
      );
    case "pathway":
      return (
        <div><H2>{block.title}</H2>
          <ol className="mt-8 flex flex-col gap-0 lg:flex-row">
            {block.steps.map((s, i) => (
              <li key={s} className="relative flex flex-1 items-center gap-4 pb-6 lg:flex-col lg:pb-0 lg:text-center">
                {i < block.steps.length - 1 && <span aria-hidden className="absolute left-5 top-10 h-full w-px bg-border lg:left-1/2 lg:top-5 lg:h-px lg:w-full" />}
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary bg-background text-sm text-primary">{i + 1}</span>
                <span className="text-sm lg:mt-3 lg:px-2">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      );
    case "offerings":
      return (
        <div><H2>{block.title}</H2>
          <div className="mt-6 overflow-hidden rounded-lg border">
            <div className="hidden grid-cols-[1fr_1.2fr_1.6fr] gap-6 border-b bg-muted px-6 py-3 text-xs uppercase tracking-wider text-muted-foreground md:grid">
              <span>Programme Name</span><span>Programme Significance</span><span>Student Benefits</span>
            </div>
            {block.rows.map((r) => (
              <div key={r.name} className="grid gap-3 border-b px-6 py-5 last:border-0 md:grid-cols-[1fr_1.2fr_1.6fr] md:gap-6">
                <p className="font-display">{r.name}</p>
                <ul className="space-y-1.5 text-sm">{r.significance.map((s) => <li key={s} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={1.5} />{s}</li>)}</ul>
                <p className="text-sm font-light leading-relaxed text-muted-foreground">{r.benefits}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case "areas":
      return <div><H2>{block.title}</H2><div className="ways-stack mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{programmeAreas.map((a) => <AreaCard key={a.title} {...a} />)}</div></div>;
    case "programmes":
      return <div><H2>{block.title}</H2><div className="ways-stack mt-6 grid gap-3 md:grid-cols-2">{programmes.map((p) => <LinkCard key={p.slug} to={`/programmes/${p.slug}`} title={p.title} meta={p.level} icon={p.icon} tone={p.tone} />)}</div></div>;
    case "children": {
      const kids = pages.filter((p) => p.parent === page.path);
      return <div><H2>{block.title}</H2><div className="ways-stack mt-6 grid gap-3 md:grid-cols-2">{kids.map((k) => <LinkCard key={k.path} to={k.path} title={k.title} meta="View Collaboration" icon={k.icon} tone={categoryTone[k.category] ?? "blue"} />)}</div></div>;
    }
    case "faq":
      return (
        <div><H2>{block.title}</H2>
          <Accordion type="single" collapsible className="mt-6 max-w-3xl">
            {["Programmes & admissions", "Collaborations", "Internships & careers", "SkillShone access"].map((q) => (
              <AccordionItem key={q} value={q}><AccordionTrigger className="font-normal">{q}</AccordionTrigger><AccordionContent><PendingTag /></AccordionContent></AccordionItem>
            ))}
          </Accordion>
        </div>
      );
    case "team":
      return (
        <div className="space-y-10">{block.groups.map((g) => (
          <div key={g}><H2>{g}</H2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((n) => <div key={n} className="rounded-lg border p-5"><div className="mb-4 aspect-square rounded-md bg-muted" /><p>Faculty name</p><p className="mb-3 text-sm text-muted-foreground">Role / expertise</p><PendingTag /></div>)}
            </div>
          </div>
        ))}</div>
      );
    case "enquiry-form":
      return <PartnerEnquiry />;
    case "gallery":
      return <Gallery filters={block.filters} />;
    case "logo":
      return <img src={block.src} alt={block.alt} className="h-20 w-auto" />;
    case "cta":
      return (
        <div className="flex flex-col items-start justify-between gap-4 border-y py-8 md:flex-row md:items-center">
          <div><p className="font-display text-xl">{block.title}</p><p className="mt-1 text-muted-foreground">{block.text}</p></div>
          {block.to?.startsWith("http") ? <Button asChild><a href={block.to} target="_blank" rel="noopener noreferrer">{block.label}<ArrowRight /></a></Button>
            : block.to ? <Button asChild><Link to={block.to}>{block.label}<ArrowRight /></Link></Button> : <Button disabled>{block.label}</Button>}
        </div>
      );
  }
};
