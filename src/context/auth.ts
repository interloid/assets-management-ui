import { createContext, useContext } from "react";
import type { User } from "@/services/auth.services";

export interface AuthContextValue {
  sessionResponse: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  setSessionResponse: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
