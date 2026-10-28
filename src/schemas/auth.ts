import { z } from "zod";

const emailSchema = z
  .union([z.string(), z.null()])
  .transform((email) => email ?? undefined)
  .pipe(
    z
      .string()
      .trim()
      .min(1, "Email is required.")
      .email("Enter a valid email address."),
  );

const passwordSchema = z
  .union([z.string(), z.null()])
  .transform((password) => password ?? undefined)
  .pipe(z.string().min(1, "Password is required."));

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

const signUpPasswordSchema = z
  .union([z.string(), z.null()])
  .transform((password) => password ?? undefined)
  .pipe(
    z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[a-zA-Z]/, "Password must contain a letter.")
      .regex(/[0-9]/, "Password must contain a number."),
  );

export const signUpSchema = z.object({
  fullName: z
    .union([z.string(), z.null()])
    .transform((fullname) => fullname ?? undefined)
    .pipe(
      z
        .string()
        .trim()
        .min(1, "Enter your full name.")
        .max(100, "Full name must not exceed 100 characters.")
        .regex(
          /^[\p{L}\p{M}]+(?:[ '-][\p{L}\p{M}]+)*$/u,
          "Full name must contain only letters.",
        ),
    ),
  email: emailSchema,
  password: signUpPasswordSchema,
});
