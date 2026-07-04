import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { INDUSTRIES } from "@/lib/nexora-data";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries · Nexora" },
      {
        name: "description",
        content:
          "Templates and AI workflows curated for HR, Education, Healthcare, Finance, Law, and more.",
      },
      { property: "og:title", content: "Industries · Nexora" },
      {
        property: "og:description",
        content: "Nexora AI, tailored to your industry.",
      },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Industries"
        title="Tailored to your world."
        description="Every industry has its own vocabulary, conventions, and compliance. Nexora ships with curated templates for each."
      />
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES.map((ind, i) => (
          <motion.div
            key={ind.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 6) * 0.04 }}
          >
            <Link
              to="/templates"
              className="group block p-8 rounded-3xl bg-card ring-1 ring-border hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className={`size-14 rounded-2xl grid place-items-center mb-6 ${ind.accent}`}>
                <ind.icon className="size-6" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{ind.name}</h3>
              <p className="text-muted-foreground mb-6">{ind.description}</p>
              <div className="flex items-center gap-1 text-sm font-mono uppercase tracking-widest text-accent-blue group-hover:gap-2 transition-all">
                Templates <ArrowUpRight className="size-4" />
              </div>
            </Link>
          </motion.div>
        ))}
      </section>
    </SiteLayout>
  );
}