import type { AssetStatus, AssetType } from "@/types/assets";
import { Keyboard, Laptop, Monitor, Smartphone, type LucideIcon } from "lucide-react";

export const statusStyles: Record<string, string> = {
  "In stock":
    "text-[var(--success)] bg-[color-mix(in_oklch,var(--success)_12%,transparent)]",
  Assigned:
    "text-primary bg-[color-mix(in_oklch,var(--primary)_12%,transparent)]",
  "In repair":
    "text-[var(--warning)] bg-[color-mix(in_oklch,var(--warning)_12%,transparent)]",
  Retired: "text-muted-foreground bg-muted",
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

export const typeIcons:Record<AssetType, LucideIcon> = {
  laptop: Laptop,
  monitor: Monitor,
  phone: Smartphone,
  accessory: Keyboard,
};