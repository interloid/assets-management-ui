export type User = {
  id: string;
  fullName: string;
  email: string;
  role: "admin" | "employee";
  assetsHeld?: number;
};

export type UsersPageProps = {
  users: User[];
  isLoading?: boolean;
  error?: string | null;
  page: number;
  totalPages: number;
  totalUsers: number;
  onPageChange: (page: number) => void;
};

export interface UserAssetListProps {
  users: User[];
  totalUsers: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  startIndex: number;
  endIndex: number;
}
