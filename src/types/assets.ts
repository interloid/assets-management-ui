import type { AssignedUser } from "@/services/dashboard.services";

export type Asset = {
  id: string;
  assetTag: string;
  type: string;
  status: string;
  serialNumber: string;
  notes: string;
  purchaseDate: string;
  warrantyExpiry: string;
  createdAt: string;
  updatedAt: string;
  assignedUser: AssignedUser | null;
  initials: string;
};

export type AssetTableProps = {
  assets: Asset[];
  isLoading: boolean;
};

export type AssetFiltersProps = {
  query: AssetQuery;
  assignedUsers: Pick<AssignedUser, "id" | "fullName">[];
  onQueryChange: <K extends keyof AssetQuery>(
    key: K,
    value: AssetQuery[K],
  ) => void;
};

export type AssetStatusProps ={
  query: AssetQuery;
}

export type AssetQuery = {
  status: string;
  search: string;
  type: string;
  assignedUser: string;
  warrantyExpiry: string;
  sort: string;
  page: number;
  size: number;
};
