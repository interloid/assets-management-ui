export type AuthErrors = Partial<
  Record<"email" | "password" | "fullName", string | null>
>;
