import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { useRef } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { FEATURES, INDUSTRIES, SERVICES } from "@/lib/nexora-data";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <LogoMarquee />
      <ServicesCarousel />
      <IndustriesRow />
      <FeatureBento />
      <StudioPreview />
      <CTA />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 sm:pt-28 sm:pb-36">
      <div className="absolute inset-0 bg-mesh" />

      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -6 }}
        animate={{ opacity: 1, y: 0, rotate: -6 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="hidden md:grid absolute top-24 left-[8%] size-16 place-items-center bg-card shadow-2xl rounded-2xl animate-float"
      >
        <Sparkles className="size-6 text-accent-blue" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        style={{ animationDelay: "2s" }}
        className="hidden md:grid absolute top-40 right-[10%] size-20 place-items-center bg-card shadow-2xl rounded-3xl animate-float"
      >
        <Star className="size-7 text-accent-purple" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: 6 }}
        animate={{ opacity: 1, y: 0, rotate: 6 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{ animationDelay: "4s" }}
        className="hidden md:grid absolute bottom-20 left-[18%] size-14 place-items-center bg-card shadow-2xl rounded-xl animate-float"
      >
        <Heart className="size-5 text-accent-cyan" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-accent-blue/5 border border-accent-blue/15 rounded-full mb-8"
        >
          <span className="size-1.5 rounded-full bg-accent-blue animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-blue">
            Introducing Nexora 2.0
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 text-balance"
        >
          Create Smarter.
          <br />
          <span className="text-muted-foreground">Work Faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mb-12 text-pretty leading-relaxed"
        >
          Nexora is the AI-powered document studio for professionals. Generate,
          edit, and export premium documents — proposals, resumes, reports, and
          beyond — in one editorial workspace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/studio"
            className="w-full sm:w-auto px-8 py-4 bg-foreground text-background rounded-2xl font-bold text-base shadow-2xl hover:-translate-y-0.5 transition-transform"
          >
            Start Creating
          </Link>
          <Link
            to="/templates"
            className="w-full sm:w-auto px-8 py-4 bg-card ring-1 ring-border rounded-2xl font-bold text-base hover:bg-surface transition-colors"
          >
            Explore Templates
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function LogoMarquee() {
  const logos = [
    "VENTURE LABS",
    "HELIOS HEALTH",
    "OXFORD ED",
    "STRATOS CORP",
    "METRIC AI",
    "LUMEN SCALE",
    "NORTH STAR",
    "APEX GROUP",
  ];
  return (
    <div className="w-full py-10 border-y border-border bg-surface/50 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...logos, ...logos, ...logos].map((l, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-mono tracking-widest text-muted-foreground/60"
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

function ServicesCarousel() {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 mb-14 flex items-end justify-between gap-4">
        <div className="space-y-3 min-w-0">
          <span className="font-mono text-xs uppercase tracking-widest text-accent-blue">
            01 // Document Studio
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Intelligent Toolset
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Sixteen specialized AI engines. Every professional workflow, one
            editorial workspace.
          </p>
        </div>
        <div className="hidden sm:flex gap-2 shrink-0">
          <button
            onClick={() => scrollBy(-1)}
            aria-label="Previous"
            className="grid size-12 place-items-center rounded-full border border-border hover:bg-muted transition-colors"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => scrollBy(1)}
            aria-label="Next"
            className="grid size-12 place-items-center rounded-full border border-border hover:bg-muted transition-colors"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 px-6 md:pl-[calc((100vw-80rem)/2+1.5rem)] md:pr-[calc((100vw-80rem)/2+1.5rem)] no-scrollbar pb-8"
      >
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: (i % 6) * 0.06, duration: 0.6 }}
            whileHover={{ y: -6 }}
            className={`flex-none w-[300px] sm:w-[360px] snap-center p-8 sm:p-10 h-[460px] sm:h-[500px] rounded-[32px] bg-gradient-to-br ${s.gradient} text-white relative overflow-hidden shadow-xl`}
          >
            <div className="relative z-10 h-full flex flex-col">
              <div className="size-14 bg-white/20 backdrop-blur-md rounded-2xl grid place-items-center mb-auto">
                <s.icon className="size-6 text-white" />
              </div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-white/70 mt-6 mb-2">
                Nexora AI · {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-3">{s.title}</h3>
              <p className="text-white/85 leading-relaxed mb-8 text-sm sm:text-base">
                {s.description}
              </p>
              <Link
                to="/studio"
                className={`w-full py-3.5 bg-white rounded-xl font-bold text-center ${s.textOn} hover:bg-stone-50 transition-colors`}
              >
                Try Now
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function IndustriesRow() {
  return (
    <section className="py-20 bg-surface/40 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 mb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-accent-purple">
          02 // Built For
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-3">
          Every Industry
        </h2>
      </div>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 md:pl-[calc((100vw-80rem)/2+1.5rem)] no-scrollbar pb-6">
        {INDUSTRIES.map((ind, i) => (
          <motion.div
            key={ind.slug}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
          >
            <Link
              to="/industries"
              className="block flex-none w-[240px] sm:w-[280px] snap-start p-6 rounded-3xl bg-card ring-1 ring-border hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div
                className={`size-12 rounded-xl grid place-items-center mb-4 ${ind.accent}`}
              >
                <ind.icon className="size-5" />
              </div>
              <div className="text-lg font-bold mb-1">{ind.name}</div>
              <div className="text-sm text-muted-foreground mb-4">
                {ind.description}
              </div>
              <div className="flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-accent-blue">
                Explore <ArrowUpRight className="size-3" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeatureBento() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 mb-14">
        <span className="font-mono text-xs uppercase tracking-widest text-accent-cyan">
          03 // Features
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-3 max-w-2xl">
          One canvas. Every AI you'll ever need.
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-5 auto-rows-[220px]">
        <BentoCell className="md:col-span-2 md:row-span-2 bg-card p-10 ring-1 ring-border shadow-sm overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">
              Dynamic AI Editor
            </h3>
            <p className="text-muted-foreground max-w-sm mb-6">
              Highlight text to rewrite, summarize, or expand — in real time.
              Powered by an editor that thinks with you.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Chip color="blue">Context Aware</Chip>
              <Chip color="purple">Rich Formatting</Chip>
              <Chip color="cyan">Slash Commands</Chip>
            </div>
          </div>
          <div className="absolute bottom-[-25%] right-[-8%] w-[110%] h-[280px] bg-surface rounded-[40px] border border-border p-6">
            <div className="space-y-4">
              <div className="h-3 w-3/4 bg-muted rounded-full" />
              <div className="h-3 w-1/2 bg-muted rounded-full" />
              <div className="h-3 w-2/3 bg-muted rounded-full" />
              <div className="h-3 w-1/3 bg-accent-blue/40 rounded-full" />
            </div>
          </div>
        </BentoCell>

        <BentoCell className="md:col-span-2 bg-card p-10 ring-1 ring-border flex flex-col justify-center">
          <h4 className="text-xl font-bold mb-2">Smart Templates</h4>
          <p className="text-muted-foreground">
            200+ curated layouts for every industry — searchable, favoritable,
            editable.
          </p>
          <Link
            to="/templates"
            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent-blue"
          >
            Browse library <ArrowRight className="size-4" />
          </Link>
        </BentoCell>

        <StatCell value="140+" label="Languages" color="blue" />
        <StatCell value="99.9%" label="Uptime" color="purple" />

        <BentoCell className="md:col-span-2 bg-foreground text-background p-10 flex items-center justify-between">
          <div>
            <h4 className="text-2xl font-bold mb-2">Secure Storage</h4>
            <p className="text-background/70">
              Bank-grade encryption. Your documents, your rules.
            </p>
          </div>
          <div className="hidden sm:grid size-14 place-items-center rounded-full bg-white/10">
            <div className="size-5 border-2 border-white rounded-full" />
          </div>
        </BentoCell>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {FEATURES.slice(0, 12).map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className="p-6 rounded-2xl bg-card ring-1 ring-border hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div
                className={`size-10 rounded-xl bg-muted grid place-items-center mb-4 ${f.tint}`}
              >
                <f.icon className="size-5" />
              </div>
              <h4 className="font-bold mb-1">{f.title}</h4>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCell({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      className={`rounded-3xl ${className ?? ""}`}
    >
      {children}
    </motion.div>
  );
}

function Chip({
  color,
  children,
}: {
  color: "blue" | "purple" | "cyan";
  children: React.ReactNode;
}) {
  const map = {
    blue: "bg-accent-blue/10 text-accent-blue",
    purple: "bg-accent-purple/10 text-accent-purple",
    cyan: "bg-accent-cyan/15 text-cyan-700",
  } as const;
  return (
    <span
      className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest rounded-lg ${map[color]}`}
    >
      {children}
    </span>
  );
}

function StatCell({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: "blue" | "purple";
}) {
  const map = {
    blue: "bg-accent-blue/10 text-accent-blue",
    purple: "bg-accent-purple/10 text-accent-purple",
  } as const;
  return (
    <BentoCell className={`p-8 flex flex-col items-center justify-center text-center ${map[color]}`}>
      <div className="text-3xl sm:text-4xl font-bold mb-1">{value}</div>
      <div className="text-[10px] font-mono uppercase tracking-widest">
        {label}
      </div>
    </BentoCell>
  );
}

function StudioPreview() {
  return (
    <section className="py-24 sm:py-32 bg-surface/60 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-accent-purple">
          04 // The Studio
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight mt-3 max-w-2xl mx-auto">
          A workspace designed for elite production.
        </h2>
      </div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-[32px] overflow-hidden ring-1 ring-border bg-card shadow-2xl flex flex-col lg:flex-row">
          <aside className="w-full lg:w-56 border-r border-border bg-surface/60 p-5">
            <div className="flex items-center gap-2 mb-6">
              <span className="size-2.5 rounded-full bg-rose-500" />
              <span className="size-2.5 rounded-full bg-amber-500" />
              <span className="size-2.5 rounded-full bg-emerald-500" />
            </div>
            {["Home", "Templates", "Documents", "Recent", "Favorites", "AI"].map(
              (l, i) => (
                <div
                  key={l}
                  className={`p-2.5 rounded-xl text-sm font-medium ${
                    i === 0
                      ? "bg-foreground text-background"
                      : "text-muted-foreground"
                  }`}
                >
                  {l}
                </div>
              ),
            )}
          </aside>
          <main className="flex-1 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">
                  Untitled · Draft
                </div>
                <div className="text-xl font-bold">Q4 Business Proposal</div>
              </div>
              <div className="hidden sm:flex gap-2">
                <button className="px-3 py-1.5 rounded-lg bg-muted text-xs font-medium">
                  Draft
                </button>
                <button className="px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-bold">
                  Publish
                </button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-3 w-1/3 rounded-full bg-muted" />
              <div className="h-3 w-3/4 rounded-full bg-muted" />
              <div className="h-3 w-2/3 rounded-full bg-muted" />
              <div className="h-32 rounded-2xl bg-gradient-to-br from-accent-blue/15 to-accent-purple/15 border border-border p-5">
                <div className="text-[10px] font-mono uppercase tracking-widest text-accent-blue mb-2">
                  AI Suggestion
                </div>
                <div className="text-sm">
                  "Rewrite this section with a more persuasive executive tone."
                </div>
              </div>
            </div>
          </main>
          <aside className="w-full lg:w-72 border-l border-border bg-surface/60 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-bold text-accent-blue">
                AI Assistant
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Online
              </span>
            </div>
            <div className="space-y-3">
              <div className="rounded-2xl bg-card p-3 text-xs">
                Should I make the executive summary more persuasive?
              </div>
              <div className="rounded-2xl bg-accent-blue/10 text-accent-blue p-3 text-xs">
                Rewrite intro for clarity.
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-border">
          <Search className="size-3" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            Start free · No card
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tighter mb-6">
          Ready to write like the best <br className="hidden sm:block" />
          teams in the world?
        </h2>
        <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
          Nexora combines editorial craft with AI precision. Try the studio
          free.
        </p>
        <Link
          to="/studio"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-foreground text-background font-bold shadow-2xl hover:-translate-y-0.5 transition-transform"
        >
          Open the Studio <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
