import { toStatusLabel } from "@/lib/converters";
import type { WarrantyExpiringProps } from "@/types/dashboard";
import { Link } from "react-router";

export default function WarrantyExpiring({ assets }: WarrantyExpiringProps) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-base font-semibold">Warranty expiring</h2>
          <span className="text-[13px] text-muted-foreground">
            Active assets, next 90 days
          </span>
        </div>

        <Link
          to="/assets"
          className="shrink-0 text-sm font-medium  hover:underline"
        >
          View all
        </Link>
      </div>
      {assets.length > 0 ? (
        <ul className="m-0 list-none p-0">
          {assets.map((asset) => {
            const Icon = asset.icon;
            return (
              <li
                key={asset.id}
                className="border-t border-border first:border-t-0"
              >
                <Link
                  to={`/assets`}
                  className="flex min-h-14 items-center gap-3 px-5 py-3 no-underline transition-colors duration-150 hover:bg-muted/50"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted-foreground"
                  />

                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="font-mono text-[13px] font-medium">
                      {asset.assetTag}
                    </span>

                    <span className="truncate text-[13px] text-muted-foreground">
                      {toStatusLabel(asset.status)}
                    </span>
                  </span>

                  <span className="shrink-0 whitespace-nowrap text-[13px] font-medium text-warning">
                    expires in {asset.warrantyExpiresInDays} days
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="px-5 py-8 text-center text-sm text-muted-foreground">
          No warranties expiring in the next 90 days.
        </p>
      )}
    </section>
  );
}
