import { Link, useRouterState } from "@tanstack/react-router";
import { FileText, Home, LayoutGrid, Sparkles, User } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/templates", label: "Templates", icon: LayoutGrid },
  { to: "/studio", label: "AI", icon: Sparkles, primary: true },
  { to: "/dashboard", label: "Docs", icon: FileText },
  { to: "/profile", label: "Profile", icon: User },
];

export function MobileBottomNav() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 glass border-t border-border">
      <div className="flex items-center justify-around px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {ITEMS.map(({ to, label, icon: Icon, primary }) => {
          const active = path === to;
          if (primary) {
            return (
              <Link
                key={to}
                to={to}
                className="-mt-8 grid size-14 place-items-center rounded-2xl bg-foreground text-background shadow-xl"
                aria-label={label}
              >
                <Icon className="size-5" />
              </Link>
            );
          }
          return (
            <Link
              key={to}
              to={to}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg ${
                active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}