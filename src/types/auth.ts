import type { ComponentProps } from "react";

export type LoginSuccessHandler = (isAuthenticated: boolean) => void;

export interface LoginPageProps {
  setIsAuthenticated: LoginSuccessHandler;
}

export type LoginForm = {
  onLoginSuccess: LoginSuccessHandler;
} & ComponentProps<"div">;

export type AuthErrors = Partial<
  Record<"email" | "password" | "fullName", string | null>
>;
