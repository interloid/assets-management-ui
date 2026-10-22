import { SignupForm } from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <section className="flex min-h-full w-full items-center justify-center p-4 md:p-10 bg-muted">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </section>
  )
}
