import { z } from "zod";

const emailSchema = z
  .union([z.string(), z.null()])
  .transform((email) => email ?? "")
  .pipe(
    z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address."),
  );

const passwordSchema = z
  .union([z.string(), z.null()])
  .transform((password) => password ?? "")
  .pipe(z.string().min(1, "Password is required"));

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  fullName: z
    .union([z.string(), z.null()])
    .transform((fullname) => fullname ?? "")
    .pipe(
      z
        .string()
        .trim()
        .min(1, "Enter your full name.")
        .max(100, "Full name must not exceed 100 characters")
        .regex(
          /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u,
          "Please enter a valid full name",
        ),
    ),
  email: emailSchema,
  password: passwordSchema,
});
