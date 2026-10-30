import { Navigate, Route, Routes } from "react-router";
import ProtectedRoute from "@/app/auth/protected-route";
import SignUpPage from "@/app/pages/auth/signup";
import { Toaster } from "sonner";
import LoginPage from "@/app/pages/auth/login";
import { Spinner } from "@/components/ui/spinner";
import Assets from "./pages/dashboard/assets/assets";
import Users from "./pages/dashboard/users/users";
import MyAssets from "./pages/dashboard/my-assets/my-assets";
import Profile from "./pages/dashboard/profile/profile";
import Dashboard from "./pages/dashboard/dashboard";
import DashboardLayout from "@/layout/dashboard";
import NotFound from "./pages/not-found";
import { useAuth } from "@/context/auth";
import { AddAsset } from "@/components/dashboard/assets-components/add-asset";
import { AssetViewFullPage } from "@/components/dashboard/assets-components/asset-view-fullpage";

export default function App() {
  const { isLoading, isAuthenticated } = useAuth();

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
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/assets/new" element={<AddAsset />} />
            <Route
              path="/assets/asset-details/:assetId"
              element={<AssetViewFullPage />}
            />
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
