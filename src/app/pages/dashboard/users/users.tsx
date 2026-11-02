import { useState } from "react";
import type { User } from "@/types/users";
import { getListUsers } from "@/services/assets.services";
import { useEffect } from "react";
import { UserListPage } from "@/components/dashboard/users-page-components/users-page";

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 20;

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await getListUsers();
        if (!response.success || !response.data) {
          setError(response.message || "Unable to load users.");
          return;
        }
        setUsers(
          response.data.map((user) => ({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            role: user.role === "admin" ? "admin" : "employee",
            ...("assetsHeld" in user && typeof user.assetsHeld === "number"
              ? { assetsHeld: user.assetsHeld }
              : {}),
          })),
        );
      } catch (loadError) {
        console.error(loadError);
      } finally {
        setIsLoading(false);
      }
    }

    void loadUsers();
  }, []);

  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
  const pageUsers = users.slice((page - 1) * pageSize, page * pageSize);

  return (
    <UserListPage
      users={pageUsers}
      isLoading={isLoading}
      error={error}
      page={page}
      totalPages={totalPages}
      totalUsers={users.length}
      onPageChange={setPage}
    />
  );
}
