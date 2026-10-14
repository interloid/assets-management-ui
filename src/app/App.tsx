import { Navigate, Route, Routes } from "react-router";
import DashboardPage from "@/layout/dashboard";
import ProtectedRoute from "@/app/auth/protected-route";
import { useState } from "react";
import SignUpPage from "@/app/pages/auth/signup";
import { Toaster } from "sonner";
import LoginPage from "@/app/pages/auth/login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />
          }
        />
        <Route path="/signup" element={<SignUpPage />} />

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}
