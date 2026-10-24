import type { AssetStatusProps } from "@/types/assets";
import { useState } from "react";

const statusTabs = [
  { label: "All", value: "all" },
  { label: "In stock", value: "in_stock" },
  { label: "Assigned", value: "assigned" },
  { label: "In repair", value: "in_repair" },
  { label: "Retired", value: "retired" },
] as const;

export default function StatusTabs({ query } : AssetStatusProps) {
  console.log('query', query)
  const [activeTab, setActiveTab] = useState("All");

  return (
    <div
      role="tablist"
      aria-label="Filter by status"
      className="flex gap-1 overflow-x-auto border-b border-border scrollbar-none"
    >
      {statusTabs.map((tab) => {
        const isActive = activeTab === tab.label;

        return (
          <button
            key={tab.label}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => setActiveTab(tab.label)}
            className={`-mb-px inline-flex h-10 shrink-0 items-center gap-2 border-0 border-b-2 bg-transparent px-3 text-sm transition-colors duration-150 ${
              isActive
                ? "border-b-primary font-medium text-foreground"
                : "border-b-transparent font-normal text-muted-foreground hover:text-foreground"
            }`}
          >
            <span>{tab.label}</span>

            <span className="inline-grid h-5 min-w-5 place-items-center rounded-full bg-muted px-1.5 text-xs tabular-nums text-muted-foreground">
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
