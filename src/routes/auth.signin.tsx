import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Sparkles } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/auth/signin")({
  head: () => ({
    meta: [
      { title: "Sign In · Nexora" },
      { name: "description", content: "Sign in to your Nexora studio account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-center px-6 sm:px-16 py-16"
      >
        <Link to="/" className="flex items-center gap-2 mb-16">
          <div className="grid size-8 place-items-center rounded-xl bg-foreground text-background">
            <div className="size-3 rounded-full bg-background" />
          </div>
          <span className="font-bold tracking-tight">NEXORA</span>
        </Link>
        <div className="max-w-sm w-full mx-auto">
          <h1 className="text-4xl font-extrabold tracking-tighter mb-2">
            Welcome back.
          </h1>
          <p className="text-muted-foreground mb-10">
            Sign in to continue composing.
          </p>

          <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-border bg-card font-bold hover:bg-surface transition-colors mb-3">
            <span className="size-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-blue-500" />
            Continue with Google
          </button>

          <div className="relative my-6 text-center">
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
            <span className="relative bg-background px-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              or with email
            </span>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-3"
          >
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@studio.com"
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl bg-card ring-1 ring-border outline-none focus:ring-accent-blue"
              />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3.5 rounded-2xl bg-card ring-1 ring-border outline-none focus:ring-accent-blue"
            />
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="accent-foreground" /> Remember me
              </label>
              <a href="#" className="font-mono uppercase tracking-widest text-accent-blue">
                Forgot?
              </a>
            </div>
            <button className="w-full py-3.5 rounded-2xl bg-foreground text-background font-bold shadow-xl hover:-translate-y-0.5 transition-transform">
              Sign In
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            New to Nexora?{" "}
            <Link to="/auth/signup" className="font-bold text-foreground">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>

      <div className="hidden lg:block relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-mesh opacity-70" />
        <div className="relative z-10 h-full flex flex-col justify-center px-16">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="max-w-md"
          >
            <div className="size-14 rounded-2xl bg-foreground text-background grid place-items-center mb-8">
              <Sparkles className="size-6" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tighter mb-4">
              An editorial studio for the AI era.
            </h2>
            <p className="text-muted-foreground text-lg">
              Draft, rewrite, and export documents worthy of your best work.
            </p>
            <div className="mt-12 p-6 rounded-3xl bg-card ring-1 ring-border shadow-2xl animate-float">
              <div className="text-[10px] font-mono uppercase tracking-widest text-accent-blue mb-2">
                AI Suggestion
              </div>
              <div className="text-sm">
                "Add a persuasive opening paragraph to your Q4 proposal."
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}