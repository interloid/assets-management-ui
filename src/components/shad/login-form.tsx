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
import { Eye, EyeOff } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  
  return (
    <div className={cn("flex flex-col w-full gap-6 justify-center items-center", className)} {...props}>
      <div className="flex gap-2.5 justify-center relative md:gap-[8.5px] md:top-px">
        <div className="relative bottom-0.5!">
          <img src="public/interloid-mark.svg" alt="logo" className="w-8"/>
        </div>
        <div className="flex flex-col leading-4 relative bottom-px left-px">
          <span className="font-semibold text-[16px]">Interloid</span>
          <span className="text-muted-foreground text-[13px]">
            Asset Register
          </span>
        </div>
      </div>
      <Card className="pl-1 py-4 gap-5.5 md:p-8 md:gap-5 w-full shadow-[0_1px_3px_0_oklch(0_0_0/0.1),0_1px_2px_-1px_oklch(0_0_0/0.1)] md:w-100 md:pt-8.5">
        <CardHeader className="px-4 pt-1.5 tracking-[-0.01em] relative md:px-0 md:pt-0 md:pl-px">
          <CardTitle className="text-[22px] font-semibold relative bottom-px md:top-[0.5px]">Sign in</CardTitle>
          <CardDescription className="tracking-normal relative md:top-[1.5px]!">
            Use your Interloid work email.
          </CardDescription>
        </CardHeader>
        <CardContent className="pr-5 md:px-0">
          <form>
            <FieldGroup>
              <Field className="relative top-0.75 md:left-px">
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@interloid.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-10 text-sm p-3 rounded-[8px]! focus-visible:bg-input"
                  required
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="h-10! rounded-[8px]! text-sm relative"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-foreground"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    <span className="text-xs font-medium">
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-mute" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-text" />
                      )}
                    </span>
                  </button>
                </div>
              </Field>
              <Field className="gap-5">
                <Button type="submit" className="h-10.5! relative bottom-px rounded-[8px] md:bottom-0">
                  Sign in
                </Button>
                <FieldDescription className="text-center relative bottom-1 md:bottom-0">
                  New to Interloid?{" "}
                  <a href="#" className="text-foreground font-medium underline-offset-2!">
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
