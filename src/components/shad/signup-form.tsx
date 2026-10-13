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
import { Circle } from "lucide-react";
import { useState } from "react";
import { signUpSchema } from "@/schemas/auth";
import { signUp } from "@/services/auth.services";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState<
    Partial<Record<"fullName" | "email" | "password", string>>
  >({});

  function validateForm() {
    const result = signUpSchema.safeParse({
      fullName,
      email,
      password,
    });
    if (result.success) {
      setErrors({});
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

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    try {
      await signUp({ fullName, email, password });
      navigate("/login", { replace: true });
      toast.success("Account created, Now you can sign in");
    } catch (error) {
      console.log(error);
      toast.error("sign up Failed");
    }
  }

  return (
    <div
      className="flex flex-col w-full gap-6 justify-center items-center"
      {...props}
    >
      <div className="flex gap-2.5 justify-center relative md:gap-[8.5px]">
        <div className="relative bottom-px">
          <img src={interloidMark} alt="logo" className="w-8" />
        </div>
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
                  value={fullName}
                  maxLength={100}
                  onChange={(event) => setFullName(event.target.value)}
                  className={`h-10! text-[14px] border-border relative bottom-px rounded-md pl-3! shadow-xs ${
                    errors.fullName
                      ? "border-destructive focus-visible:border-destructive"
                      : ""
                  }`}
                  required
                  autoComplete="name"
                />
                {errors.fullName && (
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
                  value={email}
                  maxLength={256}
                  onChange={(event) => setEmail(event.target.value)}
                  className={`h-10! text-[14px] rounded-md pl-3! relative bottom-px border-border shadow-xs ${
                    errors.email
                      ? "border-destructive focus-visible:border-destructive"
                      : ""
                  }`}
                  required
                  autoComplete="email"
                />
              </Field>
              {errors.email && <p>{errors.email}</p>}
              <Field className="relative top-0.20">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  maxLength={128}
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={`h-10! text-[14px] rounded-md relative bottom-0.5 pl-3! border-border shadow-xs ${
                    errors.password
                      ? "border-destructive focus-visible:border-destructive"
                      : ""
                  }`}
                  autoComplete="new-password"
                />
                <div className="flex gap-4  text-muted-foreground flex-wrap gap-y-0 relative bottom-1.25">
                  <div className="flex gap-1.5 md:gap-1.5">
                    <Circle className="w-3.5" />
                    <span className="text-[13px] relative self-end bottom-px">
                      8+ characters
                    </span>
                  </div>
                  <div className="flex gap-1.5 md:gap-1.5">
                    <Circle className="w-3.5" />
                    <span className="text-[13px] relative self-end bottom-px">
                      A letter
                    </span>
                  </div>
                  <div className="flex gap-1.5 md:gap-1.5">
                    <Circle className="w-3.5" />
                    <span className="text-[13px] relative self-end bottom-px">
                      A number
                    </span>
                  </div>
                </div>
              </Field>
              {errors.password && <p>{errors.password}</p>}
              <FieldGroup>
                <Field className="relative w-full">
                  <Button
                    type="submit"
                    className="h-10! relative bottom-2 rounded-[8px] py-4.5 px-0"
                  >
                    Create account
                  </Button>
                  <FieldDescription className="px-0 md:px-6 text-center  relative top-px">
                    Already have an account?{" "}
                    <a
                      href="/login"
                      className="text-foreground font-medium underline-offset-3!"
                    >
                      Sign in
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
