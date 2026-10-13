import { useState, FormEvent } from "react";
import Layout from "@/components/layout/Layout";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <Layout>
      {/* Page Title */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-purple-400 italic">
            What can we do for you?
          </h1>
        </div>
      </section>

      {/* Form + Contact */}
      <section className="bg-gradient-to-r from-sage to-sage/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left: Form */}
            <div className="py-16 md:py-20 md:pr-16">
              {submitted ? (
                <div className="bg-background/60 rounded-2xl p-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h2 className="font-display text-2xl font-bold text-navy-900 mb-2">Message sent!</h2>
                  <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <label className="block text-muted-foreground mb-1 text-sm">Name</label>
                    <input
                      required
                      type="text"
                      placeholder="Type your name here"
                      className="w-full border-0 border-b border-navy-900/20 focus:border-navy-900 bg-transparent px-0 py-2 text-sm text-navy-900 placeholder:text-navy-900/30 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1 text-sm">E-mail address</label>
                    <input
                      required
                      type="email"
                      placeholder="Type your emailaddress here"
                      className="w-full border-0 border-b border-navy-900/20 focus:border-navy-900 bg-transparent px-0 py-2 text-sm text-navy-900 placeholder:text-navy-900/30 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1 text-sm">Phone number</label>
                    <input
                      required
                      type="tel"
                      placeholder="Type your phone number here"
                      className="w-full border-0 border-b border-navy-900/20 focus:border-navy-900 bg-transparent px-0 py-2 text-sm text-navy-900 placeholder:text-navy-900/30 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-muted-foreground mb-1 text-sm">Message</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Type your message here"
                      className="w-full border-0 border-b border-navy-900/20 focus:border-navy-900 bg-transparent px-0 py-2 text-sm text-navy-900 placeholder:text-navy-900/30 outline-none transition-colors resize-none"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-8 py-2.5 rounded-full transition-colors text-sm"
                    >
                      Send
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right: Contact Info + Map */}
            <div className="py-16 md:py-20 md:pl-16">
              <h2 className="font-display text-2xl font-bold text-navy-900 mb-6 italic">Visit us</h2>
              <div className="space-y-1 text-sm text-muted-foreground mb-2">
                <p>1250 Market Street, Suite 400</p>
                <p>San Francisco, CA 94102</p>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground mt-4">
                <p>415-789-2200</p>
                <p>info@apexinjurylaw.com</p>
              </div>

              <h3 className="font-display text-lg font-semibold text-navy-900 mt-10 mb-3 italic">On the map</h3>
              <div className="rounded-xl overflow-hidden h-48">
                <iframe
                  title="Map showing Apex Injury Advocates office location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color band */}
      <div className="h-4 bg-sage" />
    </Layout>
  );
};

export default Contact;
