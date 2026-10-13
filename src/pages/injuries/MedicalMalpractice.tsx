import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import medicalIllustration from "@/assets/icons/medical-error.svg";

const MedicalMalpractice = () => (
  <Layout>
    <section className="bg-navy-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Medical error caused you harm? Hold negligent providers accountable.
            </h1>
            <p className="text-white/80 leading-relaxed mb-8">
              When you trust a medical professional with your health and they fail to meet the standard of care, the consequences can be devastating. Medical malpractice cases are complex, but our team has the expertise and resources to take on hospitals, doctors, and insurance companies on your behalf.
            </p>
            <Link to="/contact" className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              Get Free Consultation
            </Link>
          </div>
          <div className="flex justify-center">
            <img src={medicalIllustration} alt="Medical malpractice illustration" className="w-full max-w-sm" />
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-2">
          <span className="border-b-4 border-purple-500 pb-2 inline-block">Types of medical malpractice</span>
        </h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          {["Surgical errors and wrong-site surgery", "Misdiagnosis or delayed diagnosis", "Medication errors and wrong dosages", "Birth injuries and obstetric negligence", "Anesthesia complications", "Failure to obtain informed consent", "Hospital-acquired infections", "Emergency room negligence"].map((item) => (
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
        <h2 className="text-2xl md:text-3xl font-extrabold text-navy-900 mb-6">Proving medical negligence</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          A successful medical malpractice claim requires proving four key elements: a doctor-patient relationship existed, the provider deviated from the accepted standard of care, that deviation directly caused your injury, and the injury resulted in quantifiable damages. This requires expert medical testimony and thorough review of medical records.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our firm works with a network of medical experts across every specialty who can review your case and provide authoritative testimony. We invest heavily in case preparation because we know that meticulous documentation is the foundation of every successful malpractice claim. With over $85 million recovered in medical malpractice verdicts and settlements, we have the track record to back up our commitment.
        </p>
      </div>
    </section>
  </Layout>
);

export default MedicalMalpractice;
