import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "@/app/auth/protected-route";
import { useEffect, useState } from "react";
import SignUpPage from "@/app/pages/auth/signup";
import { Toaster } from "sonner";
import LoginPage from "@/app/pages/auth/login";
import { getCurrentSession, type User } from "@/services/auth.services";
import { Spinner } from "@/components/ui/spinner";
import Assets from "./pages/dashboard/assets/assets";
import Users from "./pages/dashboard/users/users";
import MyAssets from "./pages/dashboard/my-assets/my-assets";
import Profile from "./pages/dashboard/profile/profile";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "@/layout/dashboard";
import NotFound from "./pages/not-found";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function currentSession() {
      try {
        const response = await getCurrentSession();
        if (!response.success) {
          setCurrentUser(null);
          setIsAuthenticated(response.success);
          return;
        }
        setCurrentUser(response);
        setIsAuthenticated(response.success);
        return true;
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    void currentSession();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-full justify-center items-center gap-2">
        <p>Checking for Session</p>
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            element={
              currentUser ? (
                <DashboardLayout
                  setIsAuthenticated={setIsAuthenticated}
                  currentUser={currentUser}
                />
              ) : (
                <Navigate to="/login" replace></Navigate>
              )
            }
          >
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/users" element={<Users />} />
            <Route path="/my-assets" element={<MyAssets />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
