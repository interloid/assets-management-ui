import { Badge } from "@/components/ui/badge";
import type { User } from "@/types/users";
import { ShieldCheck, UserRound } from "lucide-react";

export function UserRoleBadge({ role }: { role: User["role"] }) {
  const isAdmin = role === "admin";

  return (
    <Badge variant="outline" className="gap-1.5 font-medium">
      {isAdmin ? (
        <ShieldCheck className="size-3.5" />
      ) : (
        <UserRound className="size-3.5" />
      )}
      {isAdmin ? "Admin" : "Employee"}
    </Badge>
  );
}
