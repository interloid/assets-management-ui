import type { LucideIcon } from "lucide-react";

export type ProgressSegment = {
  label: string;
  count: number;
  color: string;
};

export type StackedProgressBarProps = {
  title?: string;
  segments: ProgressSegment[];
  isLoading: boolean;
};

export type WarrantyAsset = {
  id: string;
  assetTag: string;
  status: string;
  warrantyExpiry: string;
  type: string;
  icon: LucideIcon;
};

export type WarrantyExpiringProps = {
  assets: WarrantyAsset[];
  isLoading: boolean;
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
  isLoading: boolean;
};