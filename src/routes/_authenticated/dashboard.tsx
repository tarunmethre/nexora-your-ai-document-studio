import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FileText, Sparkles, Upload, Zap } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · Nexora" },
      {
        name: "description",
        content:
          "Your Nexora dashboard — documents, AI usage, storage, and quick actions.",
      },
      { property: "og:title", content: "Dashboard · Nexora" },
      {
        property: "og:description",
        content: "A calm overview of your creative work.",
      },
    ],
  }),
  component: Dashboard,
});

const AI_DATA = [
  { d: "Mon", v: 12 }, { d: "Tue", v: 19 }, { d: "Wed", v: 34 },
  { d: "Thu", v: 28 }, { d: "Fri", v: 42 }, { d: "Sat", v: 21 },
  { d: "Sun", v: 30 },
];
const TEMPLATE_DATA = [
  { name: "Proposals", v: 12 }, { name: "Resumes", v: 9 },
  { name: "Invoices", v: 7 }, { name: "Reports", v: 5 },
  { name: "Letters", v: 4 },
];
const RECENT = [
  { name: "Q4 Business Proposal", type: "Proposal", when: "2h ago" },
  { name: "Series A Pitch Deck", type: "Presentation", when: "yesterday" },
  { name: "Freelancer Invoice · #018", type: "Invoice", when: "2 days ago" },
  { name: "Product Marketing Brief", type: "Marketing", when: "1 week ago" },
];

function Dashboard() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Dashboard" title="Welcome back, Peter." />
      <section className="max-w-7xl mx-auto px-6 pb-24 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Stat label="Documents" value="128" icon={FileText} tint="text-accent-blue" />
          <Stat label="AI Usage" value="4,214" icon={Sparkles} tint="text-accent-purple" />
          <Stat label="Templates Used" value="37" icon={Zap} tint="text-accent-cyan" />
          <Stat label="Storage" value="4.8 / 20 GB" icon={Upload} tint="text-emerald-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-6 rounded-3xl bg-card ring-1 ring-border">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                  Weekly AI usage
                </div>
                <div className="text-xl font-bold">AI Generations</div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer>
                <AreaChart data={AI_DATA}>
                  <defs>
                    <linearGradient id="ai" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent-blue)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-accent-blue)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="d" stroke="var(--color-muted-foreground)" fontSize={11} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="v" stroke="var(--color-accent-blue)" fill="url(#ai)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-card ring-1 ring-border">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Top templates
            </div>
            <div className="text-xl font-bold mb-4">Usage mix</div>
            <div className="h-64">
              <ResponsiveContainer>
                <BarChart data={TEMPLATE_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={10} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Bar dataKey="v" fill="var(--color-accent-purple)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-6 rounded-3xl bg-card ring-1 ring-border">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl font-bold">Recent Documents</div>
              <Link to="/studio" className="text-xs font-bold text-accent-blue">
                View all →
              </Link>
            </div>
            <div className="divide-y divide-border">
              {RECENT.map((r) => (
                <div key={r.name} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-surface grid place-items-center">
                      <FileText className="size-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{r.name}</div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                        {r.type}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground shrink-0">{r.when}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-foreground text-background">
            <div className="text-[10px] font-mono uppercase tracking-widest text-background/60 mb-2">
              Quick actions
            </div>
            <div className="text-xl font-bold mb-6">Start something new</div>
            <div className="space-y-2">
              <Link to="/editor" className="block w-full py-3 rounded-xl bg-background text-foreground text-sm font-bold text-center">
                + New document
              </Link>
              <Link to="/templates" className="block w-full py-3 rounded-xl border border-background/20 text-sm font-bold text-center">
                Browse templates
              </Link>
              <Link to="/studio" className="block w-full py-3 rounded-xl border border-background/20 text-sm font-bold text-center">
                Open studio
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string;
  value: string;
  icon: typeof FileText;
  tint: string;
}) {
  return (
    <div className="p-6 rounded-3xl bg-card ring-1 ring-border">
      <div className={`size-10 rounded-xl bg-muted grid place-items-center mb-4 ${tint}`}>
        <Icon className="size-5" />
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
      <div className="text-2xl font-bold tracking-tight">{value}</div>
    </div>
  );
}