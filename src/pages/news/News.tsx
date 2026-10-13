import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const articles = [
  {
    slug: "insurance-settlement-negotiations",
    author: "Sarah Martinez",
    date: "March 15, 2024",
    category: "Legal Insights",
    title: "Understanding Insurance Settlement Negotiations: What You Need to Know",
    excerpt: "Insurance companies often make initial settlement offers that are far below what your claim is worth...",
  },
  {
    slug: "medical-malpractice-proving-negligence",
    author: "Jennifer Chen",
    date: "March 8, 2024",
    category: "Medical Law",
    title: "Medical Malpractice Claims: Proving Negligence in Treatment",
    excerpt: "Not every negative medical outcome constitutes malpractice. Learn the key elements required to prove medical negligence...",
  },
  {
    slug: "occupational-illness-compensation",
    author: "Rebecca Thompson",
    date: "February 28, 2024",
    category: "Workplace Injury",
    title: "Occupational Illness Compensation: Your Rights as an Employee",
    excerpt: "Developed a work-related illness? You may be entitled to compensation beyond standard workers' comp...",
  },
  {
    slug: "ski-injury-liability",
    author: "Jennifer Chen",
    date: "February 12, 2024",
    category: "Sports & Recreation Law",
    title: "Ski Slope Injuries: Understanding Liability and Compensation",
    excerpt: "Winter sports bring joy to millions, but they also come with serious risks. Understanding your legal rights after a slope accident...",
  },
];

const News = () => (
  <Layout>
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-navy-900 mb-4">News & Insights</h1>
        <p className="text-muted-foreground mb-12 text-lg">Legal insights, case studies, and updates from our attorneys.</p>

        <div className="space-y-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/news/${article.slug}`}
              className="block bg-card rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-purple-500 group"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-4">
                <div className="flex-1">
                  <span className="inline-block bg-purple-300 text-navy-900 text-xs font-semibold px-3 py-1 rounded-full mb-3">
                    {article.category}
                  </span>
                  <h2 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-purple-500 transition-colors">{article.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{article.excerpt}</p>
                  <p className="text-xs text-muted-foreground">{article.author} · {article.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default News;
