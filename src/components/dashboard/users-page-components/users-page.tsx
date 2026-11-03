import { Input } from "@/components/ui/input";
import type { UsersPageProps } from "@/types/users";
import { Search } from "lucide-react";
import { useState } from "react";
import { UsersTableSkeleton } from "./users-page-skeleton";
import UserAssetList from "./user-assets-list";
import { UserAssetListMobile } from "./user-assets-list-mobile";

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
          <h1 className="text-[22px] lg:text-2xl font-semibold tracking-normal">
            Users
          </h1>
          <p className="text-sm text-muted-foreground">
            People who can hold assets. New accounts are created through
            registration.
          </p>
        </div>
      </header>

      <div className="relative w-full max-w-105">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <kbd className="pointer-events-none absolute right-2 top-2 grid h-5 min-w-5 place-items-center rounded border bg-muted px-1.5 font-mono text-[11px] text-muted-foreground">
          /
        </kbd>
        <Input
          type="search"
          placeholder="Search name or email"
          value={search ?? undefined}
          onChange={(event) => setSearch(event.target.value)}
          className="min-w-0 h-9 px-9 py-0 border border-input rounded-md bg-background shadow-xs text-sm outline-none"
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
      {isLoading && <UsersTableSkeleton />}

      {!isLoading && users && (
        <>
          <UserAssetListMobile
            users={filteredUsers}
            totalUsers={totalUsers}
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            startIndex={startIndex}
            endIndex={endIndex}
          />
          <UserAssetList
            users={filteredUsers}
            totalUsers={totalUsers}
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        </>
      )}
    </main>
  );
}
