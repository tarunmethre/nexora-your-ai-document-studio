import type { Session, User } from "@supabase/supabase-js";

export type AppRole = "admin" | "user";

export interface AuthState {
  session: Session | null;
  user: User | null;
  loading: boolean;
  roles: AppRole[];
}

export interface AuthActions {
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName?: string,
  ) => Promise<{ needsConfirmation: boolean }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  hasRole: (role: AppRole) => boolean;
  refreshRoles: () => Promise<void>;
}

export type AuthContextValue = AuthState & AuthActions;