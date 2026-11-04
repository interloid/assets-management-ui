import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/converters";
import type { UserAssetListProps } from "@/types/users";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

export function UserAssetListMobile({
  users,
  totalUsers,
  page,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
}: UserAssetListProps) {

  return (
    <section className="overflow-hidden md:hidden rounded-lg border border-border bg-card shadow-sm">
      <ul className="m-0 list-none p-0">
        {users.length > 0 ? (
          users.map((user) => (
            <li
              key={user.id}
              className="border-t border-border first:border-t-0"
            >
              <Link
                to={`/dashboard/assets?assigned_to=${user.id}`}
                className="flex min-h-16 items-center gap-3 px-4 py-3 no-underline transition-colors hover:bg-muted/50"
              >
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground"
                >
                  {getInitials(user.fullName)}
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="text-sm font-medium">
                    {user.fullName}
                    <span className="font-normal text-muted-foreground">
                      {" "}
                      · {user.role}
                    </span>
                  </span>
                  <span className="truncate text-[13px] text-muted-foreground">
                    {user.email}
                  </span>
                </span>
                <span className="shrink-0 whitespace-nowrap text-[13px] text-muted-foreground">
                  {user.assetsHeld} {user.assetsHeld === 1 ? "asset" : "assets"}
                </span>
              </Link>
            </li>
          ))
        ) : (
          <li className="px-4 py-10 text-center text-sm text-muted-foreground">
            No users found.
          </li>
        )}
      </ul>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-2.5 text-sm text-muted-foreground">
        <span className="tabular-nums">
          Showing {startIndex}–{endIndex} of {totalUsers}
        </span>

        <div className="flex items-center gap-3">
          <span className="whitespace-nowrap tabular-nums">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-8"
              aria-label="Next page"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      </footer>
    </section>
  );
}
