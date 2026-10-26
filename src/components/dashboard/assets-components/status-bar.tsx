import { Spinner } from "@/components/ui/spinner";
import type { AssetStatusProps } from "@/types/assets";

const statusTabs = [
  { label: "All", value: "total", statKey: "total" },
  { label: "In stock", value: "in_stock", statKey: "inStock" },
  { label: "Assigned", value: "assigned", statKey: "assigned" },
  { label: "In repair", value: "repair", statKey: "repair" },
  { label: "Retired", value: "retired", statKey: "retired" },
] as const;

export default function StatusTabs({
  assetStats,
  status,
  onQueryChange,
}: AssetStatusProps) {

  return (
    <div
      role="tablist"
      aria-label="Filter by status"
      className="flex gap-1 overflow-x-auto border-b border-border scrollbar-none"
    >
      {statusTabs.map((tab) => {
        const isActive = status === tab.value;

        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onQueryChange("status", tab.value)}
            className={`-mb-px inline-flex h-10 shrink-0 items-center gap-2 border-0 border-b-2 bg-transparent px-3 text-sm transition-colors duration-150 ${
              isActive
                ? "border-b-primary font-medium text-foreground"
                : "border-b-transparent font-normal text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{tab.label}</span>

            <span className="inline-grid h-5 min-w-5 place-items-center rounded-full bg-muted px-1.5 text-xs tabular-nums text-muted-foreground">
              {assetStats ? (
                assetStats[tab.statKey]
              ) : (
                <Spinner className="size-3" />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
