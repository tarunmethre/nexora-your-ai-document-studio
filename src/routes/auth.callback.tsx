import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth/callback")({
  head: () => ({
    meta: [
      { title: "Signing in · Nexora" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Callback,
});

function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;
    const finish = async () => {
      for (let i = 0; i < 20 && !cancelled; i++) {
        const { data } = await supabase.auth.getSession();
        if (data.session) {
          navigate({ to: "/dashboard", replace: true });
          return;
        }
        await new Promise((r) => setTimeout(r, 150));
      }
      if (!cancelled) navigate({ to: "/auth/signin", replace: true });
    };
    void finish();
    return () => {
      cancelled = true;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen grid place-items-center bg-background">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
        Completing sign in…
      </div>
    </div>
  );
}