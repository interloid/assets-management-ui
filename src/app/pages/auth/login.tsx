import { LoginForm } from "@/components/auth/login-form";
import type { LoginPageProps } from "@/types/auth";

export default function LoginPage({setIsAuthenticated} : LoginPageProps) {
  return (
    <section className="flex min-h-full w-full items-center bg-muted justify-center p-4 pr-3.5 md:p-10">
      <div className="w-full max-w-md pr-0">
        <LoginForm onLoginSuccess={setIsAuthenticated}/>
      </div>
    </section>
  );
}
