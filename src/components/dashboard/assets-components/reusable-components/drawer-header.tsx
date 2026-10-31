import { Button } from "@/components/ui/button";
import type { Asset, DrawerHeaderProps } from "@/types/assets";
import { Maximize2, X } from "lucide-react";
import { useNavigate } from "react-router";

export default function DrawerHeader({
  onOpenFullPage,
  onOpenChange,
  asset,
  mode,
}: DrawerHeaderProps) {
  const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-10 border-r-2 flex items-center justify-between gap-3 border-b bg-background px-4 py-3 sm:px-6 md:px-5 lg:px-7">
      <div className="min-w-0">
        <p className="text-sm font-medium text-muted-foreground">
          Asset details
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-2 text-muted-foreground lg:pr-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open asset as full page"
          title="Open as full page"
          onClick={() => {
            onOpenFullPage?.(asset as Asset);
            const destination =
              mode === "edit"
                ? `/assets/asset-details/edit/${asset.id}`
                : `/assets/asset-details/${asset.id}`;

            navigate(destination, { state: { asset } });
          }}
        >
          <Maximize2 className="size-4" />
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Close asset details"
          onClick={() => onOpenChange(false)}
        >
          <X className="size-4.5" />
        </Button>
      </div>
    </div>
  );
}
