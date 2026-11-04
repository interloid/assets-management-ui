import type { LucideIcon } from "lucide-react";

export type ProgressSegment = {
  label: string;
  count: number;
  color: string;
};

export type StackedProgressBarProps = {
  title?: string;
  segments: ProgressSegment[];
};

export type WarrantyAsset = {
  id: string;
  assetTag: string;
  status: string;
  warrantyExpiry: string | null;
  warrantyExpiresInDays: string | null;
  type: string;
  icon: LucideIcon;
};

export type WarrantyExpiringProps = {
  assets: WarrantyAsset[];
};

export type RecentAsset = {
  id: string;
  assetTag: string;
  type: string;
  status: string;
  notes: string;
  icon: LucideIcon;
};

export type RecentlyAddedProps = {
  assets: RecentAsset[];
};

export type AssetStats = {
  total: number;
  inStock: number;
  assigned: number;
  repair: number;
  retired: number;
};

export interface AssetResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
  data?: AssetStats;
}

export interface AssetListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: { field: string; message: string }[];
  data?: {
    id: string;
    assetTag: string;
    assignedUser: AssignedUser | null;
    createdAt: string;
    type: string;
    warrantyExpiry: string | null;
    warrantyExpiresInDays: string | null;
    status: string;
    notes: string;
    purchaseDate: string;
    serialNumber: string;
    updatedAt: string;
  }[];
  paginationMeta?: {
    itemsOnPage: number;
    page: number;
    recordsPerPage: number;
    totalItems: number;
    totalPages: number;
  };
}

export type AssignedUser = {
  id: string;
  email: string;
  fullName: string;
};
