import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface AssetEmptyStateProps {
  onClearFilters: () => void;
}

export function AssetEmptyState({ onClearFilters }: AssetEmptyStateProps){

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
    <div className="flex flex-col items-center gap-3 border border-border px-6 py-8 text-center sm:py-16">
      <SearchX aria-hidden="true" className="size-6 text-muted-foreground" />

      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold">
          No assets match these filters
        </h2>

        <p className="max-w-[40ch] text-sm text-muted-foreground">
          Try a different search term or clear the filters to see the full
          register.
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="h-9 px-3.5 text-sm font-medium shadow-xs"
        onClick={onClearFilters}
      >
        Clear filters
      </Button>
    </div>
    </section>
  );
}
