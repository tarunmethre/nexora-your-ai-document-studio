import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing · Nexora" },
      {
        name: "description",
        content:
          "Simple, transparent pricing. Free forever for starters, Pro for professionals, Studio for teams.",
      },
      { property: "og:title", content: "Pricing · Nexora" },
      {
        property: "og:description",
        content: "Choose the plan that fits your creative team.",
      },
    ],
  }),
  component: Pricing,
});

const PLANS = [
  {
    name: "Starter",
    price: "$0",
    cadence: "forever",
    tag: "For getting a feel of Nexora",
    highlight: false,
    features: [
      "50 AI generations / month",
      "Access to core templates",
      "PDF export",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$18",
    cadence: "/ month",
    tag: "For professionals who ship",
    highlight: true,
    features: [
      "Unlimited AI generations",
      "Full template library",
      "PDF · DOCX · Slides export",
      "Version history",
      "Priority AI queue",
    ],
  },
  {
    name: "Studio",
    price: "$48",
    cadence: "/ seat / month",
    tag: "For teams and agencies",
    highlight: false,
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Brand kit + custom fonts",
      "SSO & advanced security",
      "Dedicated success manager",
    ],
  },
];

function Pricing() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Pricing"
        title="Simple. Transparent."
        description="Start free. Upgrade when it feels indispensable. Every plan includes the editorial AI experience."
      />
      <section className="max-w-6xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`p-10 rounded-3xl ring-1 ${
              p.highlight
                ? "bg-foreground text-background ring-foreground shadow-2xl scale-[1.02]"
                : "bg-card ring-border"
            }`}
          >
            {p.highlight && (
              <div className="inline-block px-3 py-1 rounded-full bg-accent-blue/20 text-accent-blue text-[10px] font-mono uppercase tracking-widest mb-4">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold">{p.name}</h3>
            <p
              className={`text-sm mb-6 ${
                p.highlight ? "text-background/70" : "text-muted-foreground"
              }`}
            >
              {p.tag}
            </p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-5xl font-extrabold tracking-tighter">
                {p.price}
              </span>
              <span
                className={
                  p.highlight ? "text-background/60" : "text-muted-foreground"
                }
              >
                {p.cadence}
              </span>
            </div>
            <Link
              to="/auth/signup"
              className={`block w-full py-3.5 rounded-xl text-center font-bold mb-8 ${
                p.highlight
                  ? "bg-background text-foreground hover:bg-surface"
                  : "bg-foreground text-background hover:opacity-90"
              }`}
            >
              Get started
            </Link>
            <ul className="space-y-3 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check
                    className={`size-4 mt-0.5 shrink-0 ${
                      p.highlight ? "text-accent-cyan" : "text-accent-blue"
                    }`}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </section>
    </SiteLayout>
  );
}