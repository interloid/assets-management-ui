import type { AssetStats, AssignedUser } from "./dashboard";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
}

export interface UsersResponse {
  success: boolean;
  StatusCode: number;
  message: string;
  data: User[];
}

export type AssetStatus = "in_stock" | "assigned" | "repair" | "retired";
export type AssetType = "laptop" | "monitor" | "phone" | "accessory";

export type AssetFile = {
  fileId: string;
  uploadUrl: string;
  expiresIn: number;
};
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
  files?: AssetFile[];
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
  onSaved: () => Promise<void>;
};

export type AssetViewFullPageProps = {
  onChangeStatus?: (asset: Asset) => void;
  onEdit?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
  onAssign?: (asset: Asset) => void;
  onUnassign?: (assetId: string) => void;
  onSaved?: () => Promise<void>;
};

export type AssignAssetDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  asset: Asset | null;
  allUsers: User[];
  onAssigned?: (userId: string) => void;
  onSaved?: () => Promise<void>;
};

export type ChangeStatusCardProps = {
  onOpenChange: (open: boolean) => void;
  asset: Asset | null;
  onConfirm: (status: AssetStatus) => void;
  isLoading: boolean;
};

export type AssetViewHeaderProps = {
  asset: Asset;
  onAssign?: (asset: Asset) => void;
  onChangeStatus?: (asset: Asset) => void;
  onEdit?: (asset: Asset) => void;
  onDelete?: (asset: Asset) => void;
  isPage: boolean;
};

export type EditFormSectionProps = {
  open?: boolean;
  asset: Asset;
  onOpenChange: (open: boolean) => void;
  allUsers: User[];
  onSaved: () => Promise<void>;
};

export type DrawerHeaderProps = {
  onOpenFullPage?: (asset: Asset) => void;
  asset: Asset;
  allUsers: User[];
  onOpenChange: (open: boolean) => void;
  mode: "view" | "edit";
};

export type CreateAssetPayload = {
  type: string | null;
  serialNumber: string | null;
  purchaseDate: string | null;
  warrantyExpiry: string | null;
  notes: string | null;
};

export interface createAssetResponse {
  success: boolean;
  StatusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
  data: CreateAssetPayload[];
}

export type UpdateAssetPayload = {
  type: AssetType | string;
  notes: string;
  purchase_date: string;
  warranty_expiry: string | null;
  serial_number: string;
  status: string;
  user_id?: string;
};

export interface UpdateAssetResponse {
  success: string;
  StatusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
  assetId: string;
  data: UpdateAssetPayload[];
}
