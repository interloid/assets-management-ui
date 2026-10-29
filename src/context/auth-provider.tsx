import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "@/context/auth";
import { getCurrentSession, type User } from "@/services/auth.services";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [sessionResponse, setSessionResponse] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await getCurrentSession();
        if (response.success) {
          setSessionResponse(response);
        } else {
          setSessionResponse(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    void loadSession();
  }, []);

  async function refreshSession() {
    try {
      const response = await getCurrentSession();
      if (response.success) {
        setSessionResponse(response);
      } else {
        setSessionResponse(null);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        sessionResponse,
        isAuthenticated: sessionResponse !== null,
        isLoading,
        refreshSession,
        setSessionResponse,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
