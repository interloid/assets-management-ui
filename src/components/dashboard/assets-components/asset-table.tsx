import { toPascalCase, toStatusLabel } from "@/lib/converters";
import type { Asset, AssetTableProps } from "@/types/assets";
import { cn } from "cn";
import {
  ChevronLeft,
  ChevronRight,
  Keyboard,
  Laptop,
  Monitor,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router";
import { statusStyles } from "../resuable-components/statusStyles";
import AssetTableSkeleton from "./assetsTableSkeleton";

function AssetTypeIcon({ type }: { type: Asset["type"] }) {
  const className = "size-4 shrink-0 text-muted-foreground";

  switch (type) {
    case "Laptop":
      return <Laptop className={className} />;
    case "Monitor":
      return <Monitor className={className} />;
    case "Phone":
      return <Smartphone className={className} />;
    case "Accessory":
      return <Keyboard className={className} />;
  }
}

function WarrantyCell({ warranty }: { warranty: string }) {
  const isExpired = warranty.startsWith("Expired");
  const isExpiring = warranty.startsWith("Expires in");

  return (
    <td
      className={`whitespace-nowrap px-4 py-2.5 ${
        isExpired
          ? "text-destructive"
          : isExpiring
            ? "text-warning"
            : warranty === "No warranty"
              ? "text-muted-foreground"
              : "text-foreground"
      }`}
    >
      {warranty}
    </td>
  );
}

export default function AssetTable({ assets, isLoading }: AssetTableProps) {
  return isLoading ? (
    <div>
      {" "}
      <AssetTableSkeleton />{" "}
    </div>
  ) : (
    <section
      aria-label="Asset list"
      className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-215 border-collapse text-sm">
          <thead className="bg-muted text-left">
            <tr>
              {[
                "Asset",
                "Type",
                "Status",
                "Assigned to",
                "Purchased",
                "Warranty",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 py-2.75 text-xs font-medium text-muted-foreground"
                >
                  {heading}
                </th>
              ))}
              <th scope="col" className="w-11">
                <span className="sr-only">Open</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset) => (
              <tr
                key={asset.id}
                className="border-t border-border transition-colors hover:bg-muted/50"
              >
                <td className="px-4 py-2.75">
                  <Link
                    to={`/dashboard/assets/${asset.id}`}
                    className="flex flex-col no-underline"
                  >
                    <span className="font-mono text-[13px] font-medium text-foreground">
                      {asset.assetTag}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {asset.serialNumber}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-2.5">
                  <span className="inline-flex items-center gap-2 capitalize">
                    <AssetTypeIcon type={toPascalCase(asset.type)} />
                    {asset.type}
                  </span>
                </td>

                <td className="px-4 py-2.5">
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
                </td>

                <td className="px-4 py-2.5">
                  {asset.assignedUser ? (
                    <span className="inline-flex items-center gap-2 text-foreground">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-secondary text-[10px] font-semibold text-secondary-foreground">
                        {asset.initials}
                      </span>
                      {asset.assignedUser.fullName}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Unassigned</span>
                  )}
                </td>

                <td className="whitespace-nowrap px-4 py-2.5 tabular-nums">
                  {asset.purchaseDate}
                </td>

                <WarrantyCell warranty={asset.warrantyExpiry} />

                <td className="py-2.5 pl-0 pr-3 text-muted-foreground">
                  <ChevronRight aria-hidden="true" className="size-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm text-muted-foreground">
        <span>
          Showing <strong className="font-medium text-foreground">1-20</strong>{" "}
          of <strong className="font-medium text-foreground">24</strong> assets
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="rows-per-page">Rows</label>
          <select
            id="rows-per-page"
            defaultValue="20"
            className="h-8 rounded-md border border-input bg-background px-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>

          <span className="px-2 tabular-nums">Page 1 of 2</span>

          <button
            type="button"
            aria-label="Previous page"
            disabled
            className="grid size-8 place-items-center rounded-md border border-border bg-background opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="size-4" />
          </button>

          <button
            type="button"
            aria-label="Next page"
            className="grid size-8 place-items-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-muted"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </footer>
    </section>
  );
}
