import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/auth/login";
import DashboardPage from "@/layout/dashboard";
import ProtectedRoute from "./auth/protected-route";

export default function App() {
  const isAuthenticated = false;
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
