import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import productIllustration from "@/assets/icons/product-liability.svg";

const ProductLiability = () => (
  <Layout>
    <section className="bg-navy-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Injured by a defective product? Manufacturers must be held accountable.
            </h1>
            <p className="text-white/80 leading-relaxed mb-8">
              When a product you trusted causes injury due to a design flaw, manufacturing defect, or inadequate warnings, you have the right to seek compensation. Product liability cases can involve anything from household appliances to vehicles to medical devices. Our attorneys have the experience to take on large corporations and fight for the justice you deserve.
            </p>
            <Link to="/contact" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              Get Free Consultation
            </Link>
          </div>
          <div className="flex justify-center">
            <img src={productIllustration} alt="Product liability illustration" className="w-full max-w-sm" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-2">
          <span className="border-b-4 border-purple-500 pb-2 inline-block">Types of product liability claims</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {["Defective vehicle parts and recalls", "Dangerous pharmaceutical drugs", "Faulty medical devices and implants", "Contaminated food products", "Defective household appliances", "Children's toys with safety hazards", "Industrial equipment failures", "Inadequate product warnings or labels"].map((item) => (
            <div key={item} className="flex items-center gap-3 text-muted-foreground">
              <CheckCircle className="w-5 h-5 text-purple-500 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-6">Holding manufacturers responsible</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Product liability law holds manufacturers, distributors, and retailers responsible when defective products cause harm. Unlike many personal injury claims, you often don't need to prove negligence — only that the product was defective and that the defect caused your injury. There are three main types of defects: design defects, manufacturing defects, and marketing defects (failure to warn).
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our firm has successfully handled cases against major corporations, recovering millions for clients injured by unsafe products. We work with engineers, product safety experts, and medical professionals to build airtight cases. If you've been injured by a product, time is critical — evidence can be lost and statutes of limitations apply. Contact us for a free case evaluation.
        </p>
      </div>
    </section>
  </Layout>
);

export default ProductLiability;
