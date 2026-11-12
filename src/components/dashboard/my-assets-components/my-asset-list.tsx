import type { AssetType } from "@/types/assets";
import { PackageOpen, Shield, SquareOff } from "lucide-react";
import { Link } from "react-router";
import { cn } from "cn";
import { formatDate } from "@/lib/converters";
import type { MyAssetsProps } from "@/types/my-assets";
import AssignedAssetsHeader from "./my-asset-header";
import AssignedAssetsSkeleton from "./my-asset-skeleton";
import { typeIcons } from "../utils";

export default function MyAssetList({
  assets,
  isLoading = false,
  totalAssets,
}: MyAssetsProps) {
  if (isLoading) {
    return <AssignedAssetsSkeleton />;
  }

  if (assets.length === 0) {
    return (
      <section className="flex flex-col items-center gap-3 rounded-lg border border-dashed px-6 py-12 text-center sm:py-16 lg:py-20">
        <PackageOpen
          className="size-6 text-muted-foreground"
          aria-hidden="true"
        />
        <h2 className="text-base font-semibold">
          No devices are assigned to you
        </h2>
        <p className="max-w-[44ch] text-sm text-muted-foreground">
          When IT issues you a laptop, phone or accessory, it will show up here.
        </p>
      </section>
    );
  }

  return (
    <section className="overflow-hidden h-full   border bg-card shadow-sm">
      <div className="p-3.75 pt-8 md:px-5.5 md:pt-10 lg:px-5.5 lg:pt-10 xl:px-8 xl:pt-12.25 h-full flex flex-col gap-7">
        <AssignedAssetsHeader totalAssets={totalAssets} />
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4">
          {assets.map((asset) => {
            const AssetIcon =
              typeIcons[asset.type.toLowerCase() as AssetType] ?? SquareOff;
            return (
              <Link
                key={asset.id}
                to={`/assets/asset-details/${asset.id}`}
                className={cn(
                  "flex flex-col rounded-lg border bg-card shadow-sm",
                  "text-card-foreground no-underline",
                  "transition-all duration-200",
                  "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                )}
              >
                <div className="flex items-start gap-3 p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-muted">
                    <AssetIcon className="size-5" />
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="font-mono text-sm font-medium">
                      {asset.assetTag}
                    </span>

                    <span className="line-clamp-2 text-sm text-muted-foreground">
                      {asset.notes}
                    </span>
                  </div>
                </div>
                <dl className="grid grid-cols-3 gap-3 border-t px-4 py-3 text-[13px]">
                  <div className="min-w-0">
                    <dt className="text-muted-foreground">Type</dt>
                    <dd className="mt-0.5 truncate">{asset.type}</dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-muted-foreground">Serial</dt>
                    <dd className="mt-0.5 truncate font-mono text-xs">
                      {asset.serialNumber || "—"}
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-muted-foreground">Purchased</dt>
                    <dd className="mt-0.5 truncate">
                      {formatDate(asset.purchaseDate ?? "")}
                    </dd>
                  </div>
                </dl>
                <div className="mt-auto flex items-center gap-2 border-t px-4 py-2.5 text-[13px]">
                  <Shield className="size-3.5 shrink-0" />
                  <span className="truncate">
                    {asset.warrantyExpiry
                      ? `Warranty until ${formatDate(asset.warrantyExpiry)}`
                      : "No warranty information"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
