import Layout from "@/components/layout/Layout";
import { images } from "@/lib/images";

const compensationTypes = [
  "Compensation for pain and suffering",
  "Costs of medical care",
  "Compensation for loss of earnings",
  "Compensation for delayed studies",
  "Travel expenses",
  "Costs of aids",
  "Loss of enjoyment of life",
  "Compensation for damage of material goods",
];

const Costs = () => {
  return (
    <Layout>
      {/* Legal Costs */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-navy-900 leading-tight mb-10">
            <span className="italic">Legal</span> costs
          </h1>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In personal injury cases, legal costs are often paid by the insurer. If the insurer of the party who caused the accident has acknowledged liability, the legal costs will form part of your compensation. This means that the insurer must reimburse your legal costs in addition to your compensation. This is enshrined in law.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                At Apex Injury Advocates, <strong className="text-navy-900">the first consultation is free of charge</strong>. During this initial consultation, we will go through the legal options with you and assess whether we can take on your case on a no-win, no-fee basis. If so, we will make mutual agreements and if liability has not yet been acknowledged, we will consult with you about the options.
              </p>
            </div>
            <div className="bg-cream rounded-2xl p-8">
              <ul className="space-y-3">
                {compensationTypes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground text-sm">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Other Options */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div className="flex justify-center">
              <img src={images.costsFinancial} alt="Financial documents" className="w-full max-w-sm rounded-2xl object-cover" />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-2">
                <span className="italic">Other</span> options
              </h2>
              <div className="w-16 h-1 bg-purple-500 rounded-full mb-8" />

              <h3 className="font-semibold text-navy-900 mb-2 text-sm">Legal expenses insurance</h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-8">
                Do you have insurance cover for legal expenses but feel dissatisfied with the way in which you have been helped? Then you can also ask us for help. In many situations, you have the right to choose your own lawyer, usually at the expense of the legal expenses insurer. Apex Injury Advocates can take over the file from your legal expenses insurer. We can also assess your file as a second opinion.
              </p>

              <h3 className="font-semibold text-navy-900 mb-2 text-sm">Financed legal aid</h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                If liability has not been acknowledged and you do not have the funds to pay the lawyer, you may be eligible for financed legal aid from the Council for Legal Aid. Are you eligible? You then only pay a personal contribution to the lawyer. The Council for Legal Aid will pay the remainder of the fees.
              </p>

              <a
                href="#"
                className="inline-block border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-medium px-6 py-2.5 rounded-full transition-all duration-300 text-sm"
              >
                Council for Legal Aid
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Want to Know More */}
      <section className="bg-sage py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-4">
            Want to know <span className="italic">more?</span>
          </h2>
          <div className="w-16 h-1 bg-purple-500 rounded-full mb-6" />
          <p className="text-muted-foreground leading-relaxed">
            We would be happy to tell you more about the options and to work with you to find a solution. Apex Injury Advocates thinks and works with your best interests in mind.
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Costs;
