import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/PageHeader";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile · Nexora" },
      { name: "description", content: "Manage your Nexora profile and subscription." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Profile,
});

function Profile() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Account" title="Your profile." />
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-card ring-1 ring-border text-center">
          <div className="mx-auto size-24 rounded-full bg-gradient-to-br from-accent-blue via-accent-purple to-accent-cyan grid place-items-center text-2xl font-bold text-white mb-4">
            PN
          </div>
          <div className="font-bold text-xl">Peter Nexora</div>
          <div className="text-sm text-muted-foreground mb-4">peter@studio.com</div>
          <span className="inline-block px-3 py-1 rounded-full bg-accent-blue/10 text-accent-blue text-[10px] font-mono uppercase tracking-widest">
            Pro Member
          </span>
        </div>
        <div className="lg:col-span-2 space-y-6">
          <Section title="Personal details">
            <Row label="Full name" value="Peter Nexora" />
            <Row label="Email" value="peter@studio.com" />
            <Row label="Timezone" value="Europe / Berlin" />
          </Section>
          <Section title="Subscription">
            <Row label="Plan" value="Pro · $18/mo" />
            <Row label="Renews" value="Aug 12, 2026" />
          </Section>
          <Section title="API Keys">
            <div className="flex items-center justify-between text-sm">
              <code className="text-xs font-mono">nx_live_••••••••••8d21</code>
              <button className="px-3 py-1.5 rounded-lg bg-muted text-xs font-bold">
                Rotate
              </button>
            </div>
          </Section>
        </div>
      </section>
    </SiteLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-8 rounded-3xl bg-card ring-1 ring-border">
      <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}