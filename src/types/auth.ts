import type { ComponentProps } from "react";

export interface LoginPageProps {
  onLoginSuccess: () => void;
}

export type LoginForm = LoginPageProps & ComponentProps<"div">;