import { createFileRoute } from "@tanstack/react-router";
import {
  Bold,
  ChevronLeft,
  Download,
  History,
  Italic,
  List,
  MessageSquare,
  Sparkles,
  Underline,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/site/Navbar";

export const Route = createFileRoute("/_authenticated/editor")({
  head: () => ({
    meta: [
      { title: "Editor · Nexora" },
      {
        name: "description",
        content:
          "The Nexora editor — rich text, AI rewrite, versioning, and one-click export.",
      },
      { property: "og:title", content: "Editor · Nexora" },
      {
        property: "og:description",
        content: "Compose beautiful documents with AI beside you.",
      },
    ],
  }),
  component: Editor,
});

const INITIAL = `# Q4 Business Proposal

## Executive Summary
Nexora is redefining how professionals create documents. This proposal outlines our roadmap, pricing, and expected returns for Q4.

## Objectives
- Launch Nexora Studio 2.0
- Onboard 5,000 pro users
- Deliver enterprise SSO

## Investment
A $250,000 commitment over three quarters unlocks a projected 3.4x return by Q3 next year.
`;

function Editor() {
  const [text, setText] = useState(INITIAL);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 p-4">
        <main className="rounded-3xl bg-card ring-1 ring-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3 min-w-0">
              <button className="grid size-9 place-items-center rounded-xl hover:bg-muted shrink-0">
                <ChevronLeft className="size-4" />
              </button>
              <div className="min-w-0">
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Draft · autosaved
                </div>
                <div className="text-sm font-bold truncate">
                  Untitled Business Proposal
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="hidden sm:inline-flex items-center gap-1 px-3 py-2 rounded-xl hover:bg-muted text-sm">
                <History className="size-4" /> Versions
              </button>
              <button className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-bold">
                <Download className="size-4" /> Export
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1 px-6 py-3 border-b border-border bg-surface/50">
            {[Bold, Italic, Underline, List].map((I, i) => (
              <button
                key={i}
                className="grid size-9 place-items-center rounded-lg hover:bg-muted"
              >
                <I className="size-4" />
              </button>
            ))}
            <div className="mx-2 h-6 w-px bg-border" />
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent-blue/10 text-accent-blue text-xs font-bold">
              <Wand2 className="size-3.5" /> AI Improve
            </button>
            <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-muted text-xs font-medium">
              <Sparkles className="size-3.5" /> Rewrite
            </button>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full min-h-[70vh] p-10 bg-transparent outline-none text-base leading-relaxed font-display resize-none"
          />

          <div className="flex items-center justify-between px-6 py-3 border-t border-border text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span>{words} words</span>
            <span>Grammar · 98%</span>
          </div>
        </main>

        <aside className="rounded-3xl bg-card ring-1 ring-border p-5 h-fit lg:sticky lg:top-20">
          <div className="flex items-center gap-2 mb-5">
            <div className="size-8 rounded-lg bg-foreground text-background grid place-items-center">
              <Sparkles className="size-4" />
            </div>
            <div className="text-sm font-bold">AI Suggestions</div>
          </div>
          <div className="space-y-3 text-sm">
            {[
              "Make executive summary more persuasive",
              "Add a risk assessment paragraph",
              "Shorten investment section by 20%",
              "Translate to French",
            ].map((s) => (
              <button
                key={s}
                className="w-full text-left p-3 rounded-xl bg-surface hover:bg-muted"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-3">
              <MessageSquare className="size-3.5" /> Comments
            </div>
            <div className="text-sm text-muted-foreground">
              No comments yet.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}