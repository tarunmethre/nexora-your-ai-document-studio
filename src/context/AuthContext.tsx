import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { authService } from "@/services/auth.service";
import type { AppRole, AuthContextValue } from "@/types/auth";

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();
  const router = useRouter();
  const userIdRef = useRef<string | null>(null);

  const loadRoles = useCallback(async (uid: string | null) => {
    if (!uid) {
      setRoles([]);
      return;
    }
    try {
      const list = await authService.fetchRoles(uid);
      setRoles(list);
    } catch (err) {
      console.error("Failed to load roles", err);
      setRoles([]);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (!mounted) return;
      setSession(s);
      setUser(s?.user ?? null);

      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        const newId = s?.user?.id ?? null;
        if (newId !== userIdRef.current) {
          userIdRef.current = newId;
          // Defer to avoid deadlocks inside the auth callback
          setTimeout(() => {
            void loadRoles(newId);
          }, 0);
        }
        router.invalidate();
        if (event !== "SIGNED_OUT") {
          queryClient.invalidateQueries();
        }
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      userIdRef.current = data.session?.user?.id ?? null;
      if (data.session?.user?.id) {
        void loadRoles(data.session.user.id);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [loadRoles, queryClient, router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user,
      loading,
      roles,
      signInWithEmail: authService.signInWithEmail,
      signUpWithEmail: authService.signUpWithEmail,
      signInWithGoogle: authService.signInWithGoogle,
      async signOut() {
        await queryClient.cancelQueries();
        queryClient.clear();
        await authService.signOut();
      },
      sendPasswordReset: authService.sendPasswordReset,
      updatePassword: authService.updatePassword,
      hasRole: (role: AppRole) => roles.includes(role),
      refreshRoles: () => loadRoles(user?.id ?? null),
    }),
    [session, user, loading, roles, queryClient, loadRoles],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}