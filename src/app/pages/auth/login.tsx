import type { LoginPageProps } from "@/types/auth";
import { LoginForm } from "../../../components/shad/login-form";

export default function LoginPage({onLoginSuccess}: LoginPageProps) {
  return (
    <div className="flex min-h-svh w-full items-center bg-muted justify-center p-4 pr-3.5 md:p-10">
      <div className="w-full max-w-md pr-0">
        <LoginForm onLoginSuccess={onLoginSuccess}/>
      </div>
    </div>
  );
}
