import { LoginForm } from "@/components/auth/login-form";
import type { LoginPageProps } from "@/types/auth";

export default function LoginPage({ setIsAuthenticated }: LoginPageProps) {
  return <LoginForm onLoginSuccess={setIsAuthenticated} />;
}
