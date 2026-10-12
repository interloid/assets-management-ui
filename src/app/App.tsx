import { Navigate, Route, Routes } from "react-router";
import LoginPage from "./pages/auth/login";
import DashboardPage from "@/layout/dashboard";
import ProtectedRoute from "./auth/protected-route";
import { useState } from "react";


export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsAuthenticated(true)}/>} />
      <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
