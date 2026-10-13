import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const Contact = () => {
  const [sent, setSent] = useState(false);
  return (
    <Layout>
      <section className="container max-w-xl py-16">
        <h1 className="font-display text-4xl font-bold">Contact us</h1>
        <p className="mt-3 text-muted-foreground">Ask about programmes, admissions or partnerships.</p>
        {sent ? (
          <p className="mt-8 rounded-xl border p-6">Thanks — we'll be in touch soon.</p>
        ) : (
          <form className="mt-8 space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <Input required placeholder="Your name" />
            <Input required type="email" placeholder="Email" />
            <Textarea required placeholder="Your message" rows={5} />
            <Button type="submit">Send message</Button>
          </form>
        )}
      </section>
    </Layout>
  );
};
export default Contact;
