import { Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bell, LayoutDashboard, LogOut, Menu, Moon, Sun, User as UserIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

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
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = typeof window !== "undefined" && localStorage.getItem("nexora-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("nexora-theme", next ? "dark" : "light");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Signed out");
      navigate({ to: "/" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign out failed");
    }
  };

  const initials = (user?.user_metadata?.full_name || user?.email || "U")
    .split(/[\s@]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p: string) => p[0]?.toUpperCase())
    .join("");

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
          {user ? (
            <>
              <Link
                to="/dashboard"
                aria-label="Notifications"
                className="hidden sm:grid size-9 place-items-center rounded-full hover:bg-muted transition-colors relative"
              >
                <Bell className="size-4" />
              </Link>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="hidden sm:grid size-9 place-items-center rounded-full bg-gradient-to-br from-accent-blue via-accent-purple to-accent-cyan text-white text-xs font-bold"
                  aria-label="Account menu"
                >
                  {initials || "U"}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                      <div className="text-sm font-bold truncate">
                        {user.user_metadata?.full_name ?? user.email}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">{user.email}</div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted"
                    >
                      <LayoutDashboard className="size-4" /> Dashboard
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-muted"
                    >
                      <UserIcon className="size-4" /> Profile
                    </Link>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        void handleSignOut();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-destructive hover:bg-muted border-t border-border"
                    >
                      <LogOut className="size-4" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
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
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex-1 py-2.5 rounded-full border border-border text-center text-sm font-semibold"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false);
                      void handleSignOut();
                    }}
                    className="flex-1 py-2.5 rounded-full bg-foreground text-background text-center text-sm font-bold"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/signin"
                    onClick={() => setOpen(false)}
                    className="flex-1 py-2.5 rounded-full border border-border text-center text-sm font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/auth/signup"
                    onClick={() => setOpen(false)}
                    className="flex-1 py-2.5 rounded-full bg-foreground text-background text-center text-sm font-bold"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}