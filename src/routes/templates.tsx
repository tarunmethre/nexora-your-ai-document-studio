import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Search, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/nexora-data";

export const Route = createFileRoute("/templates")({
  head: () => ({
    meta: [
      { title: "Templates · Nexora" },
      {
        name: "description",
        content:
          "200+ editorial templates across HR, Education, Healthcare, Business, Finance, Legal and more.",
      },
      { property: "og:title", content: "Templates · Nexora" },
      {
        property: "og:description",
        content: "Search, favorite, and use professional templates instantly.",
      },
    ],
  }),
  component: TemplatesPage,
});

function TemplatesPage() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [favs, setFavs] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return TEMPLATES.filter(
      (t) =>
        (cat === "All" || t.category === cat) &&
        (q === "" || t.name.toLowerCase().includes(q.toLowerCase())),
    );
  }, [cat, q]);

  const toggleFav = (id: string) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Template Library"
        title="Beautifully composed. Ready to ship."
        description="A curated library of professional layouts. Search, filter, favorite, and open in the studio."
      />
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="sticky top-16 z-30 -mx-6 px-6 py-4 bg-background/85 backdrop-blur-md">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl bg-card ring-1 ring-border">
              <Search className="size-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search templates..."
                className="flex-1 bg-transparent outline-none text-sm"
              />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {TEMPLATE_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest transition-colors ${
                  cat === c
                    ? "bg-foreground text-background"
                    : "bg-card ring-1 ring-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((t, i) => (
            <motion.div
              key={t.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (i % 8) * 0.03 }}
              className="rounded-3xl bg-card ring-1 ring-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div
                className={`aspect-[4/5] bg-gradient-to-br ${t.gradient} relative p-5 flex flex-col`}
              >
                <button
                  onClick={() => toggleFav(t.id)}
                  aria-label="Favorite"
                  className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/20 backdrop-blur text-white"
                >
                  <Heart
                    className={`size-4 ${favs.has(t.id) ? "fill-white" : ""}`}
                  />
                </button>
                <div className="mt-auto space-y-2 text-white">
                  <div className="h-2 w-3/4 bg-white/40 rounded-full" />
                  <div className="h-2 w-1/2 bg-white/30 rounded-full" />
                  <div className="h-2 w-2/3 bg-white/20 rounded-full" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {t.category}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono text-accent-blue">
                    <Star className="size-3 fill-accent-blue" /> {t.popularity}
                  </span>
                </div>
                <h3 className="font-bold text-sm leading-snug mb-4 line-clamp-2">
                  {t.name}
                </h3>
                <Link
                  to="/editor"
                  className="block w-full py-2.5 rounded-xl bg-foreground text-background text-xs font-bold text-center hover:opacity-90"
                >
                  Use Template
                </Link>
              </div>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-24 text-center text-muted-foreground">
              No templates match that search.
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}