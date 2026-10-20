import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "@/app/auth/protected-route";
import { useEffect, useState } from "react";
import SignUpPage from "@/app/pages/auth/signup";
import { Toaster } from "sonner";
import LoginPage from "@/app/pages/auth/login";
import { getCurrentSession } from "@/services/auth.services";
import { Spinner } from "@/components/ui/spinner";
import Assets from "./pages/dashboard/assets/assets";
import Users from "./pages/dashboard/users/users";
import MyAssets from "./pages/dashboard/my-assets/myassets";
import Profile from "./pages/dashboard/profile/profile";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "@/layout/dashboard";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function CurrentSession() {
      try {
        const response = await getCurrentSession();
        if (response.success) {
          setIsAuthenticated(response.success);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    void CurrentSession();
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
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="assets" element={<Assets />} />
            <Route path="users" element={<Users />} />
            <Route path="myassets" element={<MyAssets />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </>
  );
}
