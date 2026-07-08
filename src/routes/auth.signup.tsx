import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";

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
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signUpWithEmail, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const schema = z.object({
    name: z.string().trim().min(1, "Name is required").max(80),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      const { needsConfirmation } = await signUpWithEmail(form.email, form.password, form.name);
      if (needsConfirmation) {
        toast.success("Check your inbox to verify your email.");
        navigate({ to: "/auth/signin" });
      } else {
        toast.success("Welcome to Nexora");
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign in failed");
      setGoogleLoading(false);
    }
  };

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

          <button
            type="button"
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-border bg-card font-bold hover:bg-surface transition-colors mb-3 disabled:opacity-60"
          >
            {googleLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <span className="size-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-blue-500" />
            )}
            Continue with Google
          </button>

          <div className="relative my-6 text-center">
            <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
            <span className="relative bg-background px-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              or with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
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
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-2xl bg-foreground text-background font-bold shadow-xl hover:-translate-y-0.5 transition-transform disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
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