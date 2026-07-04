import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources · Nexora" },
      {
        name: "description",
        content:
          "Prompt libraries, guides, and case studies for building with Nexora AI.",
      },
      { property: "og:title", content: "Resources · Nexora" },
      {
        property: "og:description",
        content: "Everything you need to build with Nexora.",
      },
    ],
  }),
  component: Resources,
});

const ITEMS = [
  { title: "Prompt Library", tag: "Guide", text: "60 professional prompts for docs, emails, and reports." },
  { title: "Editorial Style Guide", tag: "Handbook", text: "The Nexora approach to voice, tone, and craft." },
  { title: "Case Study: Helios Health", tag: "Story", text: "How a 200-person clinic cut report time by 78%." },
  { title: "Template Deep Dive", tag: "Video", text: "Anatomy of the executive business proposal." },
  { title: "AI Best Practices", tag: "Handbook", text: "How to compose prompts that produce great docs." },
  { title: "Product Changelog", tag: "Updates", text: "What's new in Nexora each week." },
];

function Resources() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Resources"
        title="Learn. Compose. Ship."
        description="Guides, prompt libraries, and case studies from teams building with Nexora."
      />
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ITEMS.map((r) => (
          <div
            key={r.title}
            className="p-8 rounded-3xl bg-card ring-1 ring-border hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <span className="inline-block px-2.5 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-[10px] font-mono uppercase tracking-widest mb-4">
              {r.tag}
            </span>
            <h3 className="text-xl font-bold mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground">{r.text}</p>
          </div>
        ))}
      </section>
    </SiteLayout>
  );
}