import { organisations, type Organisation, type Programme } from "@/data/site";

export const organisationPath = (organisation: Organisation) => `/collaboration-network/${organisation.toLowerCase()}`;
export const programmePath = (programme: Pick<Programme, "organisation" | "slug">) => `${organisationPath(programme.organisation)}/${programme.slug}`;
export const organisationFromPath = (path: string): Organisation | undefined =>
  (Object.keys(organisations) as Organisation[]).find(organisation => organisationPath(organisation) === path.replace(/\/$/, ""));

/** SVU renders as five pages; the finer section ids resolve to an anchor on one of them. */
export const svuPageIds = ["overview", "outcomes", "innovations", "placements", "faculty"] as const;
export type SvuPageId = typeof svuPageIds[number];
export const svuSectionIds = ["overview", "programmes", "projects-research", "internships", "placements", "faculty"] as const;
export type SvuSectionId = typeof svuSectionIds[number];

const svuBase = () => organisationPath("SVU");
export const svuPagePath = (id: SvuPageId) => id === "overview" ? svuBase() : `${svuBase()}/${id}`;
const sectionTargets: Record<SvuSectionId, string> = {
  overview: "",
  programmes: "#programmes",
  "projects-research": "/outcomes#projects",
  internships: "/innovations#internships",
  placements: "/placements",
  faculty: "/faculty",
};
export const svuSectionPath = (id: SvuSectionId) => `${svuBase()}${sectionTargets[id]}`;
export const svuSectionFromPath = (path: string): SvuPageId | undefined =>
  svuPageIds.find(id => svuPagePath(id) === path.replace(/\/$/, ""));

/** Retired single-section SVU URLs redirect to their anchor on the merged pages. */
export const svuLegacyRedirect = (path: string): string | undefined => {
  const clean = path.replace(/\/$/, "");
  const legacy = (["programmes", "projects-research", "internships"] as const).find(id => `${svuBase()}/${id}` === clean);
  return legacy ? svuSectionPath(legacy) : undefined;
};
