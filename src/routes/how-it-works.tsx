import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How it Works · Nexora" },
      {
        name: "description",
        content:
          "From idea to polished document in three moves. See how Nexora composes AI, templates, and export.",
      },
      { property: "og:title", content: "How it Works · Nexora" },
      {
        property: "og:description",
        content: "Three steps from prompt to premium export.",
      },
    ],
  }),
  component: HowItWorks,
});

const STEPS = [
  {
    n: "01",
    title: "Pick a template or prompt",
    text: "Choose from 200+ editorial templates or start from a single sentence — Nexora will draft the shape for you.",
  },
  {
    n: "02",
    title: "Compose with the studio",
    text: "Highlight, rewrite, summarize, expand. Every keystroke has an AI collaborator listening.",
  },
  {
    n: "03",
    title: "Export anywhere",
    text: "Pixel-perfect PDF, DOCX, or slides. Share via link, sync to the cloud, print to press.",
  },
];

function HowItWorks() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="How it works"
        title="From prompt to polished. In three moves."
      />
      <section className="max-w-5xl mx-auto px-6 py-16 space-y-6">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="grid grid-cols-[80px_1fr] sm:grid-cols-[120px_1fr] gap-6 p-8 rounded-3xl bg-card ring-1 ring-border"
          >
            <div className="text-4xl sm:text-6xl font-extrabold text-accent-blue tracking-tighter">
              {s.n}
            </div>
            <div className="min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold mb-2">{s.title}</h3>
              <p className="text-muted-foreground">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </SiteLayout>
  );
}