import Layout from "@/components/layout/Layout";
import EcosystemHub from "@/components/home/EcosystemHub";

/** Preview of the redesigned ecosystem section before it replaces the homepage image. */
const EcosystemPreview = () => (
  <Layout>
    <meta name="robots" content="noindex, nofollow" />
    <p className="mx-auto mt-4 max-w-fit rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
      Preview — not yet on the homepage
    </p>
    <EcosystemHub />
  </Layout>
);
export default EcosystemPreview;
