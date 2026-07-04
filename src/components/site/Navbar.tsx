import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bell, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV = [
  { to: "/features", label: "Features" },
  { to: "/templates", label: "Templates" },
  { to: "/industries", label: "Industries" },
  { to: "/how-it-works", label: "How it Works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/resources", label: "Resources" },
] as const;

export function Navbar() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("nexora-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("nexora-theme", next ? "dark" : "light");
  };

  return (
    <motion.nav
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full border-b border-border/60 glass"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="grid size-8 place-items-center rounded-xl bg-foreground text-background">
            <div className="size-3 rounded-full bg-background" />
          </div>
          <span className="text-lg font-bold tracking-tight">NEXORA</span>
        </Link>

        <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-muted-foreground">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-foreground" }}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="hidden sm:grid size-9 place-items-center rounded-full hover:bg-muted transition-colors"
          >
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            aria-label="Notifications"
            className="hidden sm:grid size-9 place-items-center rounded-full hover:bg-muted transition-colors relative"
          >
            <Bell className="size-4" />
            <span className="absolute top-2 right-2 size-1.5 rounded-full bg-accent-blue" />
          </button>
          <Link
            to="/auth/signin"
            className="hidden sm:inline-flex px-3 py-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/auth/signup"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Get Started
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden grid size-9 place-items-center rounded-full hover:bg-muted"
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden border-t border-border overflow-hidden"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-2 text-base font-medium"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-3">
              <Link
                to="/auth/signin"
                className="flex-1 py-2.5 rounded-full border border-border text-center text-sm font-semibold"
              >
                Sign In
              </Link>
              <Link
                to="/auth/signup"
                className="flex-1 py-2.5 rounded-full bg-foreground text-background text-center text-sm font-bold"
              >
                Get Started
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}