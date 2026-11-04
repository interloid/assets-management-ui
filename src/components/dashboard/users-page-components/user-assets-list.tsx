import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/converters";
import { UserRoleBadge } from "./user-badge";
import { Link } from "react-router";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserAssetListProps } from "@/types/users";

export default function UserAssetList({
  users,
  totalUsers,
  page,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
}: UserAssetListProps) {
  return (
    <section className="overflow-hidden hidden md:block rounded-lg border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-170 border-collapse text-sm">
          <thead>
            <tr className="bg-muted text-left">
              <th
                scope="col"
                className="px-4 py-2.5 text-xs font-medium text-muted-foreground"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-4 py-2.5 text-xs font-medium text-muted-foreground"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-4 py-2.5 text-xs font-medium text-muted-foreground"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-4 py-2.5 text-right text-xs font-medium text-muted-foreground"
              >
                Assets held
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-border transition-colors hover:bg-muted/30 w-full"
              >
                <td className="px-4 py-2.5 w-1/4">
                  <div className="flex items-center gap-2.5 font-medium">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{user.fullName}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground w-1/4">
                  {user.email}
                </td>
                <td className="px-4 py-2.5 w-1/4">
                  <UserRoleBadge role={user.role} />
                </td>
                <td className="px-4 py-2.5 text-right w-1/4">
                  <Link
                    to={`/dashboard/assets?assigned_to=${user.id}`}
                    aria-label={`View assets held by ${user.fullName}`}
                    className="inline-flex items-center gap-1.5 font-medium tabular-nums hover:underline"
                  >
                    {user.assetsHeld ?? "—"}
                    <ArrowUpRight className="size-3.5 text-muted-foreground" />
                  </Link>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center">
                  <p className="font-medium">No users found</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Try searching with a different name or email.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-3 text-sm text-muted-foreground">
        <span className="tabular-nums">
          Showing {startIndex}-{endIndex} of {totalUsers}
        </span>
        <div className="flex items-center gap-3">
          <span className="tabular-nums">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              aria-label="Previous page"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-8"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
              aria-label="Next page"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </footer>
    </section>
  );
}
