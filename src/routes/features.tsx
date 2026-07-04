import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FEATURES } from "@/lib/nexora-data";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features · Nexora" },
      {
        name: "description",
        content:
          "Every AI feature in Nexora — from smart templates to voice commands, in one editorial workspace.",
      },
      { property: "og:title", content: "Features · Nexora" },
      {
        property: "og:description",
        content: "The complete list of AI-powered features inside Nexora.",
      },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Features"
        title="Every AI you'll ever need."
        description="Nexora is more than an editor. It's a studio where AI, templates, and collaboration compose into one premium workflow."
      />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.04 }}
              className="p-8 rounded-3xl bg-card ring-1 ring-border hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div
                className={`size-12 rounded-2xl bg-muted grid place-items-center mb-5 ${f.tint}`}
              >
                <f.icon className="size-5" />
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}