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
  "Assigned": "text-primary bg-primary/12",
  "In repair": "text-warning bg-warning/12",
  "Retired": "text-muted-foreground bg-muted",
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
