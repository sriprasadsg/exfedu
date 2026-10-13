import Layout from "@/components/layout/Layout";
import { images } from "@/lib/images";

const values = [
  {
    title: "Specialised personal injury lawyers",
    bg: "bg-navy-700",
  },
  {
    title: "Accessible and personal",
    bg: "bg-purple-500",
  },
  {
    title: "Practical and clear",
    bg: "bg-purple-300",
  },
];

const AboutUs = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-purple-400 leading-tight">
                Apex<br />
                Personal Injury<br />
                <span className="italic">Lawyers</span>
              </h1>
            </div>
            <div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Injury following a car accident. An accident at work. A medical error. Or a serious injury caused by foul play during a sports match. Injuries due to someone else's mistake can occur in a number of different ways, often when you least expect it. In addition to physical, psychological and financial damage, an accident can also cause worry and uncertainty. What should you do next?
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Fortunately, our personal injury lawyers are here to help. We maintain close support and, if there is no other option, we will litigate to recover your damages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width team image */}
      <div className="w-full h-64 md:h-80 overflow-hidden">
        <img
          src={images.teamPhoto}
          alt="Our diverse team of legal professionals"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Why Apex */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-purple-400 text-center mb-12 italic">
            Why Apex
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {values.map((v) => (
              <div
                key={v.title}
                className={`${v.bg} ${v.bg === "bg-purple-300" ? "text-navy-900" : "text-white"} rounded-2xl p-8 flex items-center justify-center text-center min-h-[140px]`}
              >
                <h3 className="text-lg font-bold leading-snug">{v.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-navy-900 mb-2">
            <span className="italic">Who</span> we are
          </h2>
          <div className="w-16 h-1 bg-purple-500 rounded-full mb-8" />
          <p className="text-muted-foreground leading-relaxed">
            As specialised personal injury lawyers with many years of experience behind us, we continue where a personal injury expert stops. While a personal injury expert cannot litigate on your behalf, we can. This makes us a reliable partner for insurers, so that you have a greater chance of achieving the very best result. We maintain a clear, practical and personal approach. We have short lines of communication so that there are no unnecessary delays in the handling of your case!
          </p>
        </div>
      </section>

      {/* Cream spacer */}
      <section className="bg-cream py-20 md:py-28" />
    </Layout>
  );
};

export default AboutUs;
