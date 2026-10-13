import { SignupForm } from "@/components/shad/signup-form";

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-4 md:p-10 bg-muted">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
