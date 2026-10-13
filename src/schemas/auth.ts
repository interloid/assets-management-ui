import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email is required")
  .pipe(z.email("Enter a valid email address."));

const passwordSchema = z
  .string()
  .min(1, "Password is required");

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export type LoginFormData = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Enter your full name.")
    .max(100, "Full name must not exceed 100 characters")
    .regex(
      /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u,
      "Please enter a valid full name",
    ),
  email: emailSchema,
  password: passwordSchema,
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
