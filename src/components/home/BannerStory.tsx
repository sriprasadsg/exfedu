import type { Organisation } from "@/data/site";
import svuLaptopDashboard from "@/assets/svu-laptop-dashboard-v2.png";
import ibmCampus from "@/assets/ibm-collaboration-campus-v2.png";

/* Collaboration carousel artwork (client briefs, 3 November 2026): each slide shows the
   client-supplied render that also heads that organisation's own page, so the carousel and
   the partner pages always match. Static images only — no motion, nothing cropped. */
const artwork: Partial<Record<Organisation, { src: string; alt: string }>> = {
  SVU: {
    src: svuLaptopDashboard,
    alt: "Illustration: a laptop with a Python analysis workspace and a floating Data Science dashboard showing a dataset, a chart, an insight and the technologies used",
  },
  IBM: {
    src: ibmCampus,
    alt: "Illustration: a technology campus around a glowing chip core with signboards for Exafluence Education, IBM Silver Business Partner and Collaborating Institutions",
  },
};

/* Which banners carry an illustration; a slide without one gives its text the full width. */
export const hasBannerStory = (organisation: Organisation) => Boolean(artwork[organisation]);

const BannerStory = ({ organisation }: { organisation: Organisation; active?: boolean }) => {
  const art = artwork[organisation];
  if (!art) return null;
  return (
    <figure className="banner-story">
      <img className="bs-static" src={art.src} alt={art.alt} loading="lazy" />
    </figure>
  );
};
export default BannerStory;
