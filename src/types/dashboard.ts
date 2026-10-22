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
  warrantyExpiry: string;
  type: string;
  icon: LucideIcon;
};

export type WarrantyExpiringProps = {
  assets: WarrantyAsset[];
};
