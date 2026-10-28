import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "@/context/auth";
import { getCurrentSession, type User } from "@/services/auth.services";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await getCurrentSession();
        if (response.success) {
          setCurrentUser(response);
        } else {
          setCurrentUser(null);
        }
      } catch (error) {
        console.error(error);
        setCurrentUser(null);
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
        setCurrentUser(response);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error(error);
      setCurrentUser(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: currentUser !== null,
        isLoading,
        refreshSession,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
