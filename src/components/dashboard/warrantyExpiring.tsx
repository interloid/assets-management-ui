import { toPascalCase } from "@/lib/converters";
import type { WarrantyExpiringProps } from "@/types/dashboard";
import { Link } from "react-router";
import { WarrantyExpiringSkeleton } from "./warranty-expiring-skeleton";

export default function WarrantyExpiring({
  assets,
  isLoading,
}: WarrantyExpiringProps) {
  const getRemainingDays = (dateString: string): number => {
    const [yearPart, month, day] = dateString.split("-").map(Number);
    const year =
      dateString.split("-")[0].length === 2 ? 2000 + yearPart : yearPart;
    const expiryDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);
    return Math.ceil(
      (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
  };

  return (
    <>
      {isLoading ? (
        <WarrantyExpiringSkeleton />
      ) : (
        <section className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-semibold">Warranty expiring</h2>
              <span className="text-[13px] text-muted-foreground">
                Active assets, next 90 days
              </span>
            </div>

            <Link
              to="/dashboard/assets?warranty=90"
              className="shrink-0 text-sm font-medium  hover:underline"
            >
              View all
            </Link>
          </div>
          {assets.length > 0 ? (
            <ul className="m-0 list-none p-0">
              {assets.map((asset) => {
                const daysRemaining = getRemainingDays(asset.warrantyExpiry);
                const Icon = asset.icon;
                return (
                  <li
                    key={asset.id}
                    className="border-t border-border first:border-t-0"
                  >
                    <Link
                      to={`/dashboard/assets/`}
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
                          {toPascalCase(asset.status)}
                        </span>
                      </span>

                      <span className="shrink-0 whitespace-nowrap text-[13px] font-medium text-warning">
                        expires in {daysRemaining} days
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
      )}
    </>
  );
}
