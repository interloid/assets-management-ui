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
import { CircleAlert, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { loginSchema } from "@/schemas/auth";
import interloidMark from "@/assets/interloid-mark.svg";
import { login } from "@/services/auth.services";
import { useNavigate } from "react-router";
import type { LoginErrors, LoginForm } from "@/types/auth";
import { toast } from "sonner";

export function LoginForm({ onLoginSuccess, className, ...props }: LoginForm) {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<LoginErrors | null>({});
  const [serverError, setServerError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  function validateForm() {
    const result = loginSchema.safeParse({
      email,
      password,
    });
    if (result.success) {
      setErrors(null);
      return true;
    }

    const fieldErrors = result.error.flatten().fieldErrors;

    setErrors({
      email: fieldErrors.email?.[0], //checks the first error message
      password: fieldErrors.password?.[0],
    });

    console.log('fieldErrors', fieldErrors);

    return false;

  
  }

  

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError("");

    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    try {
      setIsLoading(true);
      const response = await login({ email, password });
      if (response.ok) {
        onLoginSuccess();
        navigate("/dashboard");
        toast.success("login Successfull!");
      }
      if (!response.ok) {
        switch(response.status) {
          case 401:
            setServerError("Invalid email or password.");
            break;
          case 422:
            setServerError("Please check the submitted information.");
            break
          default:
            if(response.status >= 500) {
              setServerError("Server error. Please try again later.");
            }
            setServerError("Login failed. Try again later.");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col w-full gap-6 justify-center items-center",
        className,
      )}
      {...props}
    >
      <div className="flex gap-2.5 justify-center relative md:gap-[8.5px] md:top-px">
        <div className="relative bottom-0.5!">
          <img src={interloidMark} alt="logo" className="w-8" />
        </div>
        <div className="flex flex-col leading-4 relative bottom-px left-px">
          <span className="font-semibold text-[16px]">Interloid</span>
          <span className="text-muted-foreground text-[13px]">
            Asset Register
          </span>
        </div>
      </div>
      <Card className="pl-1 py-4 gap-5.5 md:p-8 md:gap-5 w-full shadow-[0_1px_3px_0_oklch(0_0_0/0.1),0_1px_2px_-1px_oklch(0_0_0/0.1)] md:w-100 md:pt-8.5 ring-transparent">
        <CardHeader className="px-4 pt-1.5 tracking-[-0.01em] relative md:px-0 md:pt-0 md:pl-px">
          <CardTitle className="text-[22px] font-semibold relative bottom-px md:top-[0.5px]">
            Sign in
          </CardTitle>
          <CardDescription className="tracking-normal relative md:top-[1.5px]!">
            Use your Interloid work email.
          </CardDescription>
        </CardHeader>
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
                  value={email ?? ""}
                  onChange={handleEmailChange}
                  className={`h-10 text-sm p-3 rounded-[8px]! focus-visible:bg-input ${
                    errors?.email &&
                    "border-destructive focus-visible:border-destructive"
                  }`}
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
                    value={password ?? ""}
                    maxLength={128}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className={`h-10! rounded-[8px]! text-sm relative focus-visible:bg-input ${
                      errors?.password &&
                      "border-destructive focus-visible:border-destructive"
                    }`}
                    autoComplete="current-password"
                  />
                  <Button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1 rounded-md p-1 text-foreground bg-transparent hover:bg-transparent"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <span className="text-xs font-medium text-muted-foreground">
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-mute" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-text" />
                      )}
                    </span>
                  </Button>
                </div>
              </Field>
              {(errors?.email || errors?.password || serverError) && (
                <div className="border-destructive! bg-destructive/10 p-2 border h-10 flex w-full gap-2.5 items-center rounded-md animate-il-shake">
                  <CircleAlert className="w-4 text-destructive" />
                  <p className="text-destructive!">
                    {errors?.email || errors?.password || serverError}
                  </p>
                </div>
              )}
              <Field className="gap-5">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-10.5! relative bottom-px rounded-[8px] md:bottom-0 transition-[transform,background-color,color,border-color,box-shadow,opacity] duration-150 ease-in-out] hover:bg-primary/90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {isLoading && <LoaderCircle className="animate-spin" />}
                  {isLoading ? "signing in" : "sign in"}
                </Button>
                <FieldDescription className="text-center relative bottom-1 md:bottom-0">
                  New to Interloid?
                  <a
                    href="/signup"
                    className="text-foreground font-medium underline-offset-2! md:pl-1"
                  >
                    Create an account
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
