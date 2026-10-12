import { LoginForm } from "../../../components/shad/login-form";

export default function Login() {
  return (
    <div className="flex min-h-svh w-full items-center bg-muted justify-center p-4 pr-3.5 md:p-10">
      <div className="w-full max-w-md pr-0">
        <LoginForm />
      </div>
    </div>
  )
}
