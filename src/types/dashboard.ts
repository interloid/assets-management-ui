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