import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center rounded-lg bg-foreground text-background">
              <div className="size-2.5 rounded-full bg-background" />
            </div>
            <span className="font-bold tracking-tight">NEXORA</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Defining the next generation of professional document creation through editorial-grade AI.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16 text-sm">
          <FooterCol
            title="Product"
            items={[
              { label: "Templates", to: "/templates" },
              { label: "Features", to: "/features" },
              { label: "Pricing", to: "/pricing" },
              { label: "Studio", to: "/studio" },
            ]}
          />
          <FooterCol
            title="Company"
            items={[
              { label: "How it Works", to: "/how-it-works" },
              { label: "Resources", to: "/resources" },
              { label: "Industries", to: "/industries" },
            ]}
          />
          <FooterCol
            title="Account"
            items={[
              { label: "Sign In", to: "/auth/signin" },
              { label: "Sign Up", to: "/auth/signup" },
              { label: "Dashboard", to: "/dashboard" },
              { label: "Settings", to: "/settings" },
            ]}
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 mt-16 flex flex-col sm:flex-row justify-between gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
        <span>© {new Date().getFullYear()} Nexora Studio</span>
        <span>Editorial AI · San Francisco</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  return (
    <div className="space-y-4">
      <h5 className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
        {title}
      </h5>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.to}>
            <Link
              to={i.to}
              className="text-foreground/80 hover:text-accent-blue transition-colors"
            >
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}