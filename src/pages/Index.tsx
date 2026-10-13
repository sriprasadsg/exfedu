import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import { images } from "@/lib/images";
import whyLawyerIllustration from "@/assets/why-lawyer-illustration.svg";
import iconTraffic from "@/assets/icons/traffic-accident.svg";
import iconWorkplace from "@/assets/icons/workplace-injury.svg";
import iconMedical from "@/assets/icons/medical-error.svg";
import iconOccupational from "@/assets/icons/occupational-illness.svg";
import iconSports from "@/assets/icons/sports-games.svg";
import iconChildhood from "@/assets/icons/childhood-injury.svg";
import iconProductLiability from "@/assets/icons/product-liability.svg";
import iconBusiness from "@/assets/icons/business-owners.svg";

const services = [
  { img: iconTraffic, title: "Traffic accident", path: "/injuries/traffic-accidents" },
  { img: iconWorkplace, title: "Occupational accident", path: "/injuries/workplace-injuries" },
  { img: iconMedical, title: "Medical error", path: "/injuries/medical-malpractice" },
  { img: iconOccupational, title: "Occupational illness", path: "/injuries/occupational-disease" },
  { img: iconSports, title: "Sport and games", path: "/injuries/sports-recreation" },
  { img: iconChildhood, title: "Childhood injury", path: "/injuries/childrens-injuries" },
  { img: iconProductLiability, title: "Product liability", path: "/injuries/product-liability" },
  { img: iconBusiness, title: "Business owners", path: "/injuries/business-owners" },
];

const articles = [
  {
    slug: "insurance-settlement-negotiations",
    author: "Sarah Martinez",
    date: "March 15, 2024",
    title: "Understanding Insurance Settlement Negotiations: What You Need to Know",
    excerpt: "Insurance companies often make initial settlement offers that are far below what your claim is worth. Learn how to navigate these negotiations effectively and ensure you receive fair compensation for your injuries.",
  },
  {
    slug: "medical-malpractice-proving-negligence",
    author: "Jennifer Chen",
    date: "March 8, 2024",
    title: "Medical Malpractice Claims: Proving Negligence in Treatment",
    excerpt: "Not every negative medical outcome constitutes malpractice. Learn the key elements required to prove medical negligence and when you should consider pursuing a claim.",
  },
  {
    slug: "occupational-illness-compensation",
    author: "Rebecca Thompson",
    date: "February 28, 2024",
    title: "Occupational Illness Compensation: Your Rights as an Employee",
    excerpt: "Developed a work-related illness? You may be entitled to compensation beyond standard workers' comp. Understand the full range of benefits available to you.",
  },
];

const attorneys = [
  { name: "Sarah Martinez", title: "Senior Partner", img: images.attorney1 },
  { name: "Jennifer Chen", title: "Managing Partner", img: images.attorney2 },
  { name: "Rebecca Thompson", title: "Lead Trial Attorney", img: images.attorney3 },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center bg-background py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy-900 leading-tight mb-6">
                <span className="italic">Injured?</span><br />
                We protect your rights<br />
                and future!
              </h1>
              <ul className="space-y-3 mb-8">
                {["Compassionate, transparent legal guidance", "Serving clients nationwide", "Board-certified personal injury specialists"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground text-base">
                    <span className="w-5 h-5 rounded-full bg-navy-900 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-block bg-purple-500 hover:bg-purple-600 text-white font-medium px-6 py-3 rounded-full transition-all duration-300 text-sm"
              >
                Need help?
              </Link>
            </div>

            {/* Staggered attorney photos — asymmetric 2+1 grid */}
            <div className="relative h-[480px] hidden lg:block">
              <div className="absolute top-0 left-0 w-[240px] h-[300px] overflow-hidden">
                <img src={attorneys[0].img} alt={attorneys[0].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-[80px] right-0 w-[240px] h-[300px] overflow-hidden">
                <img src={attorneys[1].img} alt={attorneys[1].name} className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-[100px] w-[240px] h-[300px] overflow-hidden">
                <img src={attorneys[2].img} alt={attorneys[2].name} className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Mobile attorney layout */}
            <div className="flex justify-center gap-4 lg:hidden">
              {attorneys.map((attorney) => (
                <div key={attorney.name} className="text-center">
                  <img src={attorney.img} alt={attorney.name} className="w-28 h-36 object-cover mb-2" />
                  <p className="font-semibold text-navy-900 text-xs">{attorney.name}</p>
                  <p className="text-[10px] text-muted-foreground">{attorney.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why a Lawyer */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-center">
              <img src={whyLawyerIllustration} alt="Person with questions about injury compensation" className="w-full max-w-md" loading="lazy" width={800} height={800} />
            </div>
            <div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-navy-900 mb-6">
                Why a personal injury<br /><span className="italic">lawyer?</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Following an accident or medical error, you'll have many questions going through your head. Are you entitled to compensation? What if the other party refuses to pay? How can you continue to live independently or return to work? Our personal injury lawyers can help you to get peace of mind, clarity and the compensation that you are entitled to.
              </p>
              <div className="w-16 h-1 bg-primary rounded-full mt-8" />
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-navy-900 text-center mb-16">
            Need <span className="italic">Help?</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.path}
                className="group flex flex-col"
              >
                <div className="h-28 md:h-36 flex items-end justify-center mb-4">
                  <img src={service.img} alt={service.title} className="h-full w-auto object-contain" loading="lazy" />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-navy-900 text-sm md:text-base">{service.title}</h3>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-purple-500 shrink-0 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 md:py-28 bg-cream">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-2">
                We fight for<br /><span className="italic">your future</span>
              </h2>
              <div className="w-16 h-1 bg-purple-500 rounded-full mb-6" />
              <p className="text-muted-foreground leading-relaxed mb-8">
                Founded by Sarah Martinez and Jennifer Chen, Apex Injury Advocates combines over 40 years of personal injury expertise with a client-first philosophy. Our team of board-certified specialists has recovered over $250 million for injury victims nationwide.
              </p>
              <Link
                to="/about-us"
                className="inline-block border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-medium px-6 py-2.5 rounded-full transition-all duration-300 text-sm"
              >
                About us
              </Link>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 w-full h-full bg-purple-500 rounded-2xl" />
                <img
                  src={images.aboutPreview}
                  alt="Attorneys in discussion"
                  className="relative w-full max-w-md rounded-2xl object-cover shadow-lg z-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-20 md:py-28 bg-cream-dark">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-14">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900">
                Stay <span className="italic">informed</span>
              </h2>
              <div className="w-16 h-1 bg-purple-500 rounded-full mt-3" />
            </div>
            <Link to="/news" className="text-navy-900 hover:text-purple-500 font-medium text-sm transition-colors">
              View all articles →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {articles.map((article) => (
              <Link key={article.slug} to={`/news/${article.slug}`} className="group">
                <p className="font-semibold text-navy-900 text-sm mb-1 group-hover:text-purple-500 transition-colors">
                  {article.author}
                </p>
                <p className="text-xs text-muted-foreground mb-3">{article.date}</p>
                <h3 className="font-display text-lg font-semibold text-navy-900 mb-2 leading-snug group-hover:text-purple-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
