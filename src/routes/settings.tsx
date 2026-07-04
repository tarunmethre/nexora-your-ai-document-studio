import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Nexora" },
      { name: "description", content: "Nexora preferences — theme, notifications, AI." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Settings,
});

function Settings() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [notif, setNotif] = useState(true);
  const [lang, setLang] = useState("English");
  const [aiTone, setAiTone] = useState("Editorial");

  return (
    <SiteLayout>
      <PageHeader eyebrow="Settings" title="Fine-tune the studio." />
      <section className="max-w-3xl mx-auto px-6 pb-24 space-y-6">
        <Card title="Theme">
          <div className="flex gap-2">
            {(["light", "dark", "system"] as const).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTheme(t);
                  if (t === "dark") document.documentElement.classList.add("dark");
                  if (t === "light") document.documentElement.classList.remove("dark");
                }}
                className={`flex-1 py-3 rounded-xl text-sm font-mono uppercase tracking-widest ${
                  theme === t
                    ? "bg-foreground text-background"
                    : "bg-surface text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Card>
        <Card title="Notifications">
          <Toggle label="Product updates" value={notif} onChange={setNotif} />
          <Toggle label="AI completion alerts" value={true} onChange={() => {}} />
          <Toggle label="Weekly digest" value={false} onChange={() => {}} />
        </Card>
        <Card title="Language">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface outline-none"
          >
            {["English", "Español", "Français", "Deutsch", "日本語"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </Card>
        <Card title="AI Preferences">
          <div className="flex gap-2 flex-wrap">
            {["Editorial", "Casual", "Technical", "Playful", "Formal"].map((t) => (
              <button
                key={t}
                onClick={() => setAiTone(t)}
                className={`px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest ${
                  aiTone === t
                    ? "bg-foreground text-background"
                    : "bg-surface text-muted-foreground"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Card>
        <Card title="Accessibility">
          <Toggle label="Reduce motion" value={false} onChange={() => {}} />
          <Toggle label="High contrast" value={false} onChange={() => {}} />
        </Card>
      </section>
    </SiteLayout>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-8 rounded-3xl bg-card ring-1 ring-border">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!value)}
      className="w-full flex items-center justify-between py-2"
    >
      <span className="text-sm">{label}</span>
      <span
        className={`relative w-11 h-6 rounded-full transition-colors ${
          value ? "bg-foreground" : "bg-muted"
        }`}
      >
        <span
          className={`absolute top-0.5 size-5 rounded-full bg-background transition-all ${
            value ? "left-[22px]" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}