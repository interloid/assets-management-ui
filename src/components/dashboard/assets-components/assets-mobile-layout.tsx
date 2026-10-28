import type { Asset } from "@/types/assets";
import { AssetTypeIcon } from "./asset-table";
import { toPascalCase, toStatusLabel } from "@/lib/converters";
import { cn } from "cn";
import { statusStyles } from "../resuable-components/reusable-variables";
import { Link } from "react-router";

export type AssetsMobileProps = {
  assets: Asset[];
  onRowClick: (asset: Asset) => void;
};
export function AssetsMobile({ assets, onRowClick }: AssetsMobileProps) {
  return (
    <div className="md:hidden">
      <div className="w-full overflow-hidden rounded-lg border-2 border-x border-border bg-card shadow-sm">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-card border border-x-0">
            <Link
              to={`/dashboard/assets/`}
              onClick={() => onRowClick(asset)}
              className="flex flex-col gap-2 px-4 py-3.5 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-medium">
                  {asset.assetTag}
                </span>

                <span
                  className={cn(
                    "inline-flex h-5.5 items-center gap-1.5 whitespace-nowrap rounded-sm px-2 text-xs font-medium",
                    statusStyles[toStatusLabel(asset.status)] ??
                      "bg-muted text-muted-foreground",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-current"
                  />
                  {toStatusLabel(asset.status).replace(
                    /([a-z])([A-Z])/g,
                    "$1 $2",
                  )}
                </span>
              </div>
              <div className="flex min-w-0 items-center gap-2 text-[13px] text-muted-foreground">
                <span className="flex gap-1">
                  <AssetTypeIcon type={toPascalCase(asset.type)} />
                  <span>{asset.type}</span>
                </span>
                <span>·</span>

                <span className="truncate font-mono">{asset.serialNumber}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 text-[13px]">
                <span className="text-muted-foreground">
                  {asset.assignedUser?.fullName ?? "Unassigned"}
                </span>

                <span className="text-foreground">
                  {asset.warrantyExpiry ?? "No warranty"}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
