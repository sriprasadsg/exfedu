import infographic from "@/assets/exafluence-education-hub.png.asset.json";

const EducationHub = () => (
  <section aria-label="Exafluence Education ecosystem" className="mx-auto max-w-5xl">
    <h1 className="sr-only">Exafluence Education — Where Academia, Industry &amp; Technology Converge</h1>
    <img
      src={infographic.url}
      alt="Exafluence Education at the centre, connected to Exafluence Inc., academic and industry collaborations, programmes, practical learning, internships, student success, Student’s Corner, SkillShone, gallery, research and career development."
      width={1024}
      height={768}
      fetchPriority="high"
      className="block h-auto w-full"
    />
  </section>
);
export default EducationHub;
