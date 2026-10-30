import type { AssetStatus, AssetType } from "@/types/assets";
import {
  Keyboard,
  Laptop,
  Monitor,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

export const statusStyles: Record<string, string> = {
  "In stock": "text-success bg-success/12",
  Assigned: "text-primary bg-primary/12",
  Repair: "text-warning bg-warning/12",
  Retired: "text-muted-foreground bg-muted",
};

export const statusTextStyles: Record<AssetStatus, string> = {
  in_stock: "text-success",
  assigned: "text-primary",
  repair: "text-warning",
  retired: "text-muted-foreground",
};

export const statusDotStyles: Record<string, string> = {
  "In stock": "bg-success",
  Assigned: "bg-primary",
  Repair: "bg-warning",
  "In repair": "bg-warning",
  Retired: "bg-muted-foreground",
};

export const statusTabs = [
  { label: "All", value: "all", statKey: "total" },
  { label: "In stock", value: "in_stock", statKey: "inStock" },
  { label: "Assigned", value: "assigned", statKey: "assigned" },
  { label: "In repair", value: "repair", statKey: "repair" },
  { label: "Retired", value: "retired", statKey: "retired" },
] as const;

export const statusLabels: Record<AssetStatus, string> = {
  in_stock: "In stock",
  assigned: "Assigned",
  repair: "In repair",
  retired: "Retired",
};

export const typeIcons: Record<AssetType, LucideIcon> = {
  laptop: Laptop,
  monitor: Monitor,
  phone: Smartphone,
  accessory: Keyboard,
};

export const allowedStatusTransistions: Record<AssetStatus, AssetStatus[]> = {
  in_stock: ["assigned", "repair", "retired"],
  assigned: ["in_stock", "repair"],
  repair: ["in_stock", "retired"],
  retired: [],
};

export function getStatusMessage(
  current: AssetStatus,
  target: AssetStatus,
): "Current" | "Can move here" | "Not Allowed" {
  if (current === target) return "Current";
  return allowedStatusTransistions[current].includes(target)
    ? "Can move here"
    : "Not Allowed";
}
