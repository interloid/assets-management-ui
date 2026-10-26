import type { User } from "@/services/assets.services";
import type { AssetStats, AssignedUser } from "@/services/dashboard.services";

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
  assetStats: AssetStats | null;
  assets: Asset[];
  query: AssetQuery;
  isLoading: boolean;
  onQueryChange: <K extends keyof AssetQuery>(
    key: K,
    value: AssetQuery[K],
  ) => void;
};

export type AssetFiltersProps = {
  query: AssetQuery;
  allUsers: User[];
  onQueryChange: <K extends keyof AssetQuery>(
    key: K,
    value: AssetQuery[K],
  ) => void;
};

export type AssetStatusProps = {
  assetStats: AssetStats | null;
  status: AssetQuery["status"];
  onQueryChange: <K extends keyof AssetQuery>(
    key: K,
    value: AssetQuery[K],
  ) => void;
};

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
