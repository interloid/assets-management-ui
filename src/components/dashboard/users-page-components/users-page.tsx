import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { UsersPageProps } from "@/types/users";
import { ArrowUpRight, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { UsersTableSkeleton } from "./users-page-skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/converters";
import { UserRoleBadge } from "./user-badge";
import { Link } from "react-router";

export function UserListPage({
  users,
  isLoading = false,
  error = null,
  page,
  totalPages,
  totalUsers,
  onPageChange,
}: UsersPageProps) {
  const [search, setSearch] = useState<string | null>(null);
  const PAGE_SIZE = 20;
  const filteredUsers = users.filter((user) => {
    const query = search?.trim().toLowerCase() ?? "";
    return (
      user.fullName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });
  const startIndex = totalUsers === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(page * PAGE_SIZE, totalUsers);

  return (
    <main className="mx-auto flex w-full max-w-[2400px] flex-col gap-5 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground">
            People who can hold assets. New accounts are created through
            registration.
          </p>
        </div>
      </header>

      <div className="relative w-full max-w-105">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search name or email"
          value={search ?? undefined}
          onChange={(event) => setSearch(event.target.value)}
          className="pl-9"
          aria-label="Search users"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 p-6 text-center"
        >
          <p className="font-medium">Unable to load users</p>
          <p className="mt-1 text-sm text-muted-foreground">{error}</p>
        </div>
      )}
      {isLoading ? (
        <UsersTableSkeleton />
      ) : (
        <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-170 text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Name
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground">
                    Role
                  </th>
                  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                    Assets held
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t transition-colors hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 font-medium">
                        <Avatar className="size-8">
                          <AvatarFallback className="text-xs font-semibold">
                            {getInitials(user.fullName)}
                          </AvatarFallback>
                        </Avatar>

                        <span>{user.fullName}</span>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-muted-foreground">
                      {user.email}
                    </td>

                    <td className="px-4 py-3">
                      <UserRoleBadge role={user.role} />
                    </td>

                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/dashboard/assets?assigned_to=${(user.id)}`}
                        aria-label={`View assets held by ${user.fullName}`}
                        className="inline-flex items-center gap-1.5 font-medium tabular-nums hover:underline"
                      >
                        {user.assetsHeld ?? "—"}
                        <ArrowUpRight className="size-3.5 text-muted-foreground" />
                      </Link>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
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
      )}
    </main>
  );
}
