import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Bookmark,
  FileText,
  Home,
  MessageSquare,
  Search,
  Settings,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import { FloatingAI } from "@/components/site/FloatingAI";
import { Navbar } from "@/components/site/Navbar";
import { TEMPLATES, TEMPLATE_CATEGORIES } from "@/lib/nexora-data";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio · Nexora" },
      {
        name: "description",
        content:
          "The Nexora Studio — pick a template, prompt the AI, and compose beautiful documents.",
      },
      { property: "og:title", content: "Studio · Nexora" },
      {
        property: "og:description",
        content: "Your AI-powered document workspace.",
      },
    ],
  }),
  component: Studio,
});

const SIDE = [
  { icon: Home, label: "Home" },
  { icon: FileText, label: "Templates" },
  { icon: Bookmark, label: "Documents" },
  { icon: Star, label: "Favorites" },
  { icon: Sparkles, label: "AI" },
  { icon: Settings, label: "Settings" },
] as const;

function Studio() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const filtered = TEMPLATES.filter(
    (t) =>
      (cat === "All" || t.category === cat) &&
      (q === "" || t.name.toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[220px_1fr_320px] gap-4 p-4">
        <aside className="rounded-3xl bg-card ring-1 ring-border p-4 space-y-1 h-fit sticky top-20">
          {SIDE.map((s, i) => (
            <button
              key={s.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <s.icon className="size-4" /> {s.label}
            </button>
          ))}
        </aside>

        <main className="min-w-0">
          <div className="rounded-3xl bg-card ring-1 ring-border p-6 mb-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl bg-surface">
                <Search className="size-4 text-muted-foreground" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search templates, prompts, or documents..."
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
              <Link
                to="/editor"
                className="px-4 py-3 bg-foreground text-background rounded-2xl text-sm font-bold whitespace-nowrap"
              >
                + New Document
              </Link>
            </div>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {TEMPLATE_CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest transition-colors ${
                    cat === c
                      ? "bg-foreground text-background"
                      : "bg-surface text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 6) * 0.04 }}
                className="rounded-3xl bg-card ring-1 ring-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className={`aspect-[5/4] bg-gradient-to-br ${t.gradient} p-5 flex flex-col justify-end`}>
                  <div className="space-y-1.5">
                    <div className="h-2 w-3/4 bg-white/40 rounded-full" />
                    <div className="h-2 w-1/2 bg-white/30 rounded-full" />
                  </div>
                </div>
                <div className="p-5">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1">
                    {t.category}
                  </div>
                  <div className="font-bold text-sm mb-3">{t.name}</div>
                  <Link
                    to="/editor"
                    className="text-xs font-bold text-accent-blue"
                  >
                    Use template →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </main>

        <aside className="rounded-3xl bg-card ring-1 ring-border p-5 h-fit sticky top-20 hidden lg:block">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-foreground text-background grid place-items-center">
                <Sparkles className="size-4" />
              </div>
              <div>
                <div className="text-sm font-bold">Nexora AI</div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Assistant
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3 mb-4">
            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
              Suggestions
            </div>
            {[
              "Draft a Q4 proposal",
              "Summarize last meeting",
              "Rewrite in a formal tone",
              "Create an invoice",
            ].map((s) => (
              <button
                key={s}
                className="w-full text-left text-sm px-3 py-2 rounded-xl bg-surface hover:bg-muted"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
            History
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="size-3.5" /> Proposal · 2h ago
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageSquare className="size-3.5" /> Resume · yesterday
            </div>
          </div>
        </aside>
      </div>
      <FloatingAI />
    </div>
  );
}