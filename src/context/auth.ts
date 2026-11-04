import type { CurrentSessionResponse } from "@/types/auth";
import { createContext, useContext } from "react";

export interface AuthContextValue {
  sessionResponse: CurrentSessionResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  refreshSession: () => Promise<void>;
  setSessionResponse: (session: CurrentSessionResponse | null) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
