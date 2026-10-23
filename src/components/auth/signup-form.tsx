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
import interloidMark from "@/assets/interloid-mark.svg";
import { Circle, CircleAlert, CircleCheck, LoaderCircle } from "lucide-react";
import React, { useState } from "react";
import { signUpSchema } from "@/schemas/auth";
import { signUp } from "@/services/auth.services";
import { Link, useNavigate } from "react-router";
import type { AuthErrors } from "@/types/auth";
import PasswordEye from "./password-eye";
import { cn } from "cn";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<AuthErrors | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const hasMinLength = (password ?? "").length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password ?? "");
  const hasNumber = /[0-9]/.test(password ?? "");

  function validateForm() {
    const result = signUpSchema.safeParse({
      fullName,
      email,
      password,
    });
    if (result.success) {
      setErrors(null);
      return true;
    }
    const fieldErrors = result.error.flatten().fieldErrors;

    setErrors({
      fullName: fieldErrors.fullName?.[0],
      email: fieldErrors.email?.[0],
      password: fieldErrors.password?.[0],
    });
    return false;
  }

  const handleFullName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value);
    setErrors((prev) => ({ ...prev, fullName: null }));
  };

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
      const response = await signUp({ fullName, email, password });
      if (response.success) {
        navigate("/login?registered=true", { replace: true });
      }
      if (!response.success) {
        if (response.errors && response.errors !== null) {
          response.errors.map((error) => error.message).join(",");
        } else {
          setServerError(response.message);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main
      className="flex flex-col w-full gap-6 justify-center items-center"
      {...props}
    >
      <div className="flex gap-2.5 justify-center relative md:gap-[8.5px]">
        <img
          src={interloidMark}
          alt="logo"
          className="w-8 relative bottom-px"
        />
        <div className="flex flex-col leading-4 relative md:left-px">
          <span className="font-semibold text-[16px]">Interloid</span>
          <span className="text-muted-foreground text-[13px]">
            Asset Register
          </span>
        </div>
      </div>
      <Card
        className=" w-full md:w-100 p-5 md:p-8 shadow-[0_1px_3px_0_oklch(0_0_0/0.1),0_1px_2px_-1px_oklch(0_0_0/0.1)] border ring-transparent"
        {...props}
      >
        <CardHeader className="p-0">
          <CardTitle className="text-[22px] font-semibold tracking-[-0.01em] pt-px">
            Create an account
          </CardTitle>
          <CardDescription>
            See the devices IT has issued to you.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} noValidate>
            <FieldGroup>
              <Field className="relative top-1">
                <FieldLabel htmlFor="name">Full name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Priya Nair"
                  value={fullName ?? undefined}
                  maxLength={100}
                  onChange={handleFullName}
                  className={cn(
                    "h-10 text-[14px] border-border relative bottom-px rounded-md pl-3 shadow-xs",
                    errors?.fullName &&
                      "border-destructive focus-visible:border-destructive",
                  )}
                  autoComplete="name"
                />
                {errors?.fullName && (
                  <div className="gap-0">
                    <p className="text-destructive/80 text-[13px]">
                      {errors.fullName}
                    </p>
                  </div>
                )}
              </Field>

              <Field className="relative top-0.5">
                <FieldLabel htmlFor="email">Work email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@interloid.com"
                  value={email ?? undefined}
                  maxLength={256}
                  onChange={handleEmailChange}
                  className={cn(
                    "h-10 text-[14px] rounded-md pl-3 relative bottom-px border-border shadow-xs",
                    errors?.email &&
                      "border-destructive focus-visible:border-destructive",
                  )}
                  autoComplete="email"
                />
                {errors?.email && (
                  <div className="gap-0">
                    <p className="text-destructive/80 text-[13px]">
                      {errors.email}
                    </p>
                  </div>
                )}
              </Field>
              <Field className="relative top-0.20">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    maxLength={128}
                    value={password ?? undefined}
                    placeholder="••••••••"
                    onChange={handlePasswordChange}
                    className={cn(
                      "h-10 text-[14px] rounded-md relative bottom-0.5 pl-3 border-border shadow-xs",
                      errors?.password &&
                        "border-destructive focus-visible:border-destructive",
                    )}
                    autoComplete="new-password"
                  />
                  <PasswordEye
                    showPassword={showPassword}
                    onToggle={() => setShowPassword((visible) => !visible)}
                  />
                </div>
                <div className="flex gap-4  text-muted-foreground flex-wrap gap-y-0 relative bottom-1.25">
                  <div className="flex gap-1.5 md:gap-1.5">
                    {hasMinLength ? (
                      <CircleCheck className="w-3.5 text-success pt-px" />
                    ) : (
                      <Circle className="w-3.5 pt-px" />
                    )}
                    <span
                      className={cn(
                        "text-[13px] relative self-end bottom-px",
                        hasMinLength && "text-success",
                      )}
                    >
                      8+ characters
                    </span>
                  </div>
                  <div className="flex gap-1.5 md:gap-1.5">
                    {hasLetter ? (
                      <CircleCheck className="w-3.5 text-success pt-px" />
                    ) : (
                      <Circle className="w-3.5 pt-px" />
                    )}
                    <span
                      className={cn(
                        "text-[13px] relative self-end bottom-px",
                        hasLetter && "text-success",
                      )}
                    >
                      A letter
                    </span>
                  </div>
                  <div className="flex gap-1.5 md:gap-1.5">
                    {hasNumber ? (
                      <CircleCheck className="w-3.5 text-success pt-px" />
                    ) : (
                      <Circle className="w-3.5 pt-px" />
                    )}
                    <span
                      className={cn(
                        "text-[13px] relative self-end bottom-px",
                        hasNumber && "text-success",
                      )}
                    >
                      A number
                    </span>
                  </div>
                </div>
              </Field>
              {(errors?.password || serverError) && (
                <div className="border-destructive/40! bg-destructive/10 p-2 px-3 border h-fit flex w-full gap-2.5 items-center rounded-md animate-il-shake relative bottom-2">
                  <CircleAlert className="w-4 text-destructive" />
                  <p className="text-destructive!">
                    {errors?.password || serverError}
                  </p>
                </div>
              )}
              <FieldGroup>
                <Field className="relative w-full">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-10 relative bottom-2 rounded-[8px] py-4.5 px-0"
                  >
                    {isLoading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create account"
                    )}
                  </Button>
                  <FieldDescription className="px-0 md:px-6 text-center flex justify-center gap-1 relative top-px">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-foreground font-medium underline-offset-3!"
                    >
                      Sign in
                    </Link>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
