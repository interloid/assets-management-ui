export const statusStyles: Record<string, string> = {
  "In stock":
    "text-[var(--success)] bg-[color-mix(in_oklch,var(--success)_12%,transparent)]",
  Assigned:
    "text-primary bg-[color-mix(in_oklch,var(--primary)_12%,transparent)]",
  "In repair":
    "text-[var(--warning)] bg-[color-mix(in_oklch,var(--warning)_12%,transparent)]",
  Retired: "text-muted-foreground bg-muted",
};