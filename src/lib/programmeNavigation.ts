import { organisations, type Organisation, type Programme } from "@/data/site";

export const organisationPath = (organisation: Organisation) => `/collaboration-network/${organisation.toLowerCase()}`;
export const programmePath = (programme: Pick<Programme, "organisation" | "slug">) => `${organisationPath(programme.organisation)}/${programme.slug}`;
export const organisationFromPath = (path: string): Organisation | undefined =>
  (Object.keys(organisations) as Organisation[]).find(organisation => organisationPath(organisation) === path.replace(/\/$/, ""));
export const svuSectionIds = ["overview", "programmes", "projects-research", "internships", "placements"] as const;
export type SvuSectionId = typeof svuSectionIds[number];
export const svuSectionPath = (id: SvuSectionId) => id === "overview" ? organisationPath("SVU") : `${organisationPath("SVU")}/${id}`;
export const svuSectionFromPath = (path: string): SvuSectionId | undefined =>
  svuSectionIds.find(id => svuSectionPath(id) === path.replace(/\/$/, ""));
