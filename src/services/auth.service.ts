import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import type { AppRole } from "@/types/auth";

function getSiteOrigin(): string {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

export const authService = {
  async signInWithEmail(email: string, password: string) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  },

  async signUpWithEmail(email: string, password: string, fullName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${getSiteOrigin()}/auth/callback`,
        data: fullName ? { full_name: fullName } : undefined,
      },
    });
    if (error) throw error;
    return { needsConfirmation: !data.session };
  },

  async signInWithGoogle() {
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${getSiteOrigin()}/auth/callback`,
    });
    if (result.error) throw result.error;
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async sendPasswordReset(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${getSiteOrigin()}/auth/reset-password`,
    });
    if (error) throw error;
  },

  async updatePassword(password: string) {
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw error;
  },

  async fetchRoles(userId: string): Promise<AppRole[]> {
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);
    if (error) throw error;
    return (data ?? []).map((r) => r.role as AppRole);
  },
};