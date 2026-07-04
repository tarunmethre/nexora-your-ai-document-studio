import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({
    meta: [
      { title: "Sign Up · Nexora" },
      { name: "description", content: "Create a Nexora account and start composing." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignUp,
});

function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      <div className="hidden lg:block relative overflow-hidden bg-surface order-2">
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="relative z-10 h-full flex flex-col justify-center px-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-md"
          >
            <div className="size-14 rounded-2xl bg-foreground text-background grid place-items-center mb-8">
              <Sparkles className="size-6" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tighter mb-4">
              Join the Studio.
            </h2>
            <p className="text-muted-foreground text-lg">
              14-day Pro trial. No card required. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-center px-6 sm:px-16 py-16 order-1"
      >
        <Link to="/" className="flex items-center gap-2 mb-16">
          <div className="grid size-8 place-items-center rounded-xl bg-foreground text-background">
            <div className="size-3 rounded-full bg-background" />
          </div>
          <span className="font-bold tracking-tight">NEXORA</span>
        </Link>
        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tighter mb-2">
            Create your studio.
          </h1>
          <p className="text-muted-foreground mb-10">
            Start composing in under a minute.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            <input
              value={form.name}
              onChange={set("name")}
              placeholder="Full name"
              className="w-full px-4 py-3.5 rounded-2xl bg-card ring-1 ring-border outline-none focus:ring-accent-blue"
            />
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder="you@studio.com"
              className="w-full px-4 py-3.5 rounded-2xl bg-card ring-1 ring-border outline-none focus:ring-accent-blue"
            />
            <input
              type="password"
              value={form.password}
              onChange={set("password")}
              placeholder="Password"
              className="w-full px-4 py-3.5 rounded-2xl bg-card ring-1 ring-border outline-none focus:ring-accent-blue"
            />
            <button className="w-full py-3.5 rounded-2xl bg-foreground text-background font-bold shadow-xl hover:-translate-y-0.5 transition-transform">
              Create account
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/auth/signin" className="font-bold text-foreground">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}