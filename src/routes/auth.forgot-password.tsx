import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Loader2, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useAuth } from "@/context/AuthContext";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password · Nexora" },
      { name: "description", content: "Reset your Nexora account password." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const { sendPasswordReset } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = z.string().email().safeParse(email);
    if (!parsed.success) {
      toast.error("Enter a valid email");
      return;
    }
    setSubmitting(true);
    try {
      await sendPasswordReset(email);
      setSent(true);
      toast.success("Reset link sent — check your inbox.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send reset email");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <Link to="/" className="flex items-center gap-2 mb-12">
          <div className="grid size-8 place-items-center rounded-xl bg-foreground text-background">
            <div className="size-3 rounded-full bg-background" />
          </div>
          <span className="font-bold tracking-tight">NEXORA</span>
        </Link>
        <h1 className="text-4xl font-extrabold tracking-tighter mb-2">
          Reset password.
        </h1>
        <p className="text-muted-foreground mb-10">
          Enter your email and we'll send you a reset link.
        </p>
        <form onSubmit={handleSubmit} className="space-y-3">
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
          <button
            type="submit"
            disabled={submitting || sent}
            className="w-full py-3.5 rounded-2xl bg-foreground text-background font-bold shadow-xl disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 className="size-4 animate-spin" />}
            {sent ? "Email sent" : "Send reset link"}
          </button>
        </form>
        <p className="text-center text-sm text-muted-foreground mt-8">
          Remembered it?{" "}
          <Link to="/auth/signin" className="font-bold text-foreground">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}