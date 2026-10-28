import { cn } from "cn";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import { loginSchema } from "@/schemas/auth";
import { login } from "@/services/auth.services";
import { Link, useNavigate, useSearchParams } from "react-router";
import type { AuthErrors, LoginFormProps } from "@/types/auth";
import { toast } from "sonner";
import PasswordEye from "@/components/auth/password-eye";
import BrandTitle from "./brand-title";

export function LoginForm({ onLoginSuccess, className }: LoginFormProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [errors, setErrors] = useState<AuthErrors | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  const isRegistered = searchParams.get("registered") === "true";

  function validateForm() {
    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (result.success) {
      setErrors(null);
      return true;
    }

    const errorsByField = result.error.flatten().fieldErrors;

    setErrors({
      email: errorsByField.email?.[0], //checks the first error message
      password: errorsByField.password?.[0],
    });
    return false;
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrors((prev) => ({ ...prev, email: null }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrors((prev) => ({ ...prev, password: null }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await login({ email, password });
      if (response.success) {
        onLoginSuccess(true);
        navigate("/dashboard");
        toast.success("Login Successful!");
      }
      if (!response.success) {
        if (response.errors && response.errors !== null) {
          setServerError(
            response.errors.map((error) => error.message).join(","),
          );
        } else {
          setServerError(response.message);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      className={cn(
        "flex flex-col w-full h-full gap-6 justify-center items-center min-h-full bg-muted p-4 pr-3.5 md:p-10",
        className,
      )}
    >
      <BrandTitle />
      <Card className="pl-1 max-w-100 py-4 gap-5.5 md:p-8 md:gap-5 w-full shadow-[0_1px_3px_0_oklch(0_0_0/0.1),0_1px_2px_-1px_oklch(0_0_0/0.1)] md:w-100 md:pt-8.5 ring-transparent">
        <CardHeader className="px-4 pt-1.5 tracking-[-0.01em] relative md:px-0 md:pt-0 md:pl-px">
          <CardTitle className="text-[22px] font-semibold relative bottom-px md:top-[0.5px]">
            Sign in
          </CardTitle>
          <CardDescription className="tracking-normal relative md:top-[1.5px]">
            Use your Interloid work email.
          </CardDescription>
        </CardHeader>
        {isRegistered && (
          <div
            role="status"
            className="rounded-md m-4 sm:m-0 flex justify-between bg-success/12 p-3 text-sm"
          >
            <CircleCheck className="size-6.5 xs:size-4 xs:top-0.5 md:size-4.5 text-success/90 relative bottom-1 md:bottom-1" />
            <span className="text-foreground pl-2">
              Account created. Sign in with your new password.
            </span>
          </div>
        )}
        <CardContent className="pr-5 md:px-0">
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <Field className="relative top-0.75 md:left-px">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@interloid.com"
                  maxLength={254}
                  value={email ?? undefined}
                  onChange={handleEmailChange}
                  className={cn(
                    "h-10 text-sm p-3 rounded-[8px] focus-visible:bg-input",
                    errors?.email &&
                      "border-destructive focus-visible:border-destructive",
                  )}
                  autoComplete="email"
                />
              </Field>
              <Field className="relative top-0.75">
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password ?? undefined}
                    maxLength={128}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className={cn(
                      "h-10 rounded-[8px] text-sm relative focus-visible:bg-input",
                      errors?.password &&
                        "border-destructive focus-visible:border-destructive",
                    )}
                    autoComplete="current-password"
                  />
                  <PasswordEye
                    showPassword={showPassword}
                    onToggle={() => setShowPassword((visible) => !visible)}
                  />
                </div>
              </Field>
              {(errors?.email || errors?.password || serverError) && (
                <div className="border-destructive bg-destructive/10 p-2 border h-10 flex w-full gap-2.5 items-center rounded-md animate-il-shake">
                  <CircleAlert className="w-4 text-destructive" />
                  <p className="text-destructive">
                    {errors?.email || errors?.password || serverError}
                  </p>
                </div>
              )}
              <Field className="gap-5">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-10.5 relative bottom-px rounded-[8px] md:bottom-0 transition-[transform,background-color,color,border-color,box-shadow,opacity] duration-150 ease-in-out hover:bg-primary/90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isLoading && <LoaderCircle className="animate-spin" />}
                  {isLoading ? "Signing in" : "Sign in"}
                </Button>
                <FieldDescription className="text-center relative bottom-1 md:bottom-0">
                  New to Interloid?
                  <Link
                    to="/signup"
                    className="text-foreground font-medium underline-offset-2! md:pl-1"
                  >
                    Create an account
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
