import { z } from "zod";

export const loginSchema = z.object({
  email: z.string()
  .trim()
  .min(1, "email is required")
  .pipe(z.email("please enter a valid Email address")),

  password:z.string()
  .min(1, "password is Required")
});

export type LoginFormData = z.infer<typeof loginSchema>; // extract the data type of the schema by infer