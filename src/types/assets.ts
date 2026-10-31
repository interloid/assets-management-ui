import type { User } from "@/services/assets.services";
import type { AssetStats, AssignedUser } from "@/services/dashboard.services";

export type AssetStatus = "in_stock" | "assigned" | "repair" | "retired";
export type AssetType = "laptop" | "monitor" | "phone" | "accessory";

export type Asset = {
  id: string;
  assetTag: string;
  type: string;
  status: string;
  serialNumber: string;
  notes: string;
  purchaseDate: string;
  warrantyExpiry: string | null;
  warrantyExpiresInDays: string | number | null;
  createdAt: string;
  updatedAt: string;
  assignedUser: AssignedUser | null;
  initials: string;
};

export type AssetTableProps = {
  assetStats: AssetStats | null;
  handleClearFilters: () => void;
  assets: Asset[];
  onRowClick: (asset: Asset) => void;
  query: AssetQuery;
  isLoading: boolean;
  onQueryChange: <K extends keyof AssetQuery>(
    key: K,
    value: AssetQuery[K],
  ) => void;
};

export type AssetFiltersProps = {
  query: AssetQuery;
  handleClearFilters: () => void;
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

export type DrawerMode = "view" | "edit";

export type ViewAssetDrawerProps = {
  asset: Asset | null;
  allUsers: User[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssign?: (asset: Asset) => void;
  onUnassign?: (assetId: string) => void;
  onChangeStatus?: (asset: Asset) => void;
  onEdit?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
  onOpenFullPage?: (asset: Asset) => void;
};

export type AssetViewFullPageProps = {
  allUsers?: User[];
  onChangeStatus?: (asset: Asset) => void;
  onEdit?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
  onAssign?: (asset: Asset) => void;
  onUnassign?: (assetId: string) => void;
};

export type AssignAssetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: Asset | null;
  allUsers: User[];
  onAssigned?: (userId: string) => void;
};

export type AssetViewHeaderProps = {
  asset: Asset;
  onAssign?: (asset: Asset) => void;
  onChangeStatus?: (asset: Asset) => void;
  onEdit?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
};

export type EditFormSectionProps = {
  open?: boolean,
  asset: Asset,
  onOpenChange: (open: boolean) => void;
};

export type DrawerHeaderProps = {
  onOpenFullPage?: (asset: Asset) => void;
  asset: Asset ;
  onOpenChange: (open: boolean) => void;
  mode: "view" | "edit"
};
