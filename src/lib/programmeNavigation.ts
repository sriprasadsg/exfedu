import { organisations, type Organisation, type Programme } from "@/data/site";

export const organisationPath = (organisation: Organisation) => `/collaboration-network/${organisation.toLowerCase()}`;
export const programmePath = (programme: Pick<Programme, "organisation" | "slug">) => `${organisationPath(programme.organisation)}/${programme.slug}`;
export const organisationFromPath = (path: string): Organisation | undefined =>
  (Object.keys(organisations) as Organisation[]).find(organisation => organisationPath(organisation) === path.replace(/\/$/, ""));