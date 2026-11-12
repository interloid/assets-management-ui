import { toStatusLabel } from "@/lib/converters";
import type { RecentlyAddedProps } from "@/types/dashboard";
import { cn } from "cn";
import { Link } from "react-router";
import { statusStyles } from "./utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function RecentlyAdded({ assets }: RecentlyAddedProps) {
  return (
    <div className="p-4 md:p-6 md:pt-0 lg:p-10 lg:pl-11.5 lg:pt-0 lg:pr-7 xl:w-1/2 xl:pr-7 2xl:pr-1 py-0 xl:p-0 border-none">
      <section className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
        <Tooltip>
          <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
            <div className="flex flex-col gap-0.5">
              <h2 className="text-base font-semibold">Recently added</h2>
              <span className="text-[13px] text-muted-foreground">
                Latest 5 assets in the register
              </span>
            </div>
            <TooltipTrigger asChild>
              <Link
                to="/assets"
                className="shrink-0 text-sm font-medium hover:underline"
              >
                View all
              </Link>
            </TooltipTrigger>
          </div>
          <TooltipContent showArrow={false}>
            Recently added assets
          </TooltipContent>
        </Tooltip>
        {assets.length > 0 ? (
          <ul className="m-0 list-none p-0">
            {assets.slice(0, 5).map((asset) => {
              const Icon = asset.icon;
              return (
                <li
                  key={asset.id}
                  className="border-t border-border first:border-t-0"
                >
                  <Link
                    to={`/assets/asset-details/${asset.id}`}
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
                        {asset.notes}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "inline-flex h-5.5 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-sm px-2 text-xs font-medium",
                        statusStyles[toStatusLabel(asset.status)] ??
                          "bg-muted text-muted-foreground",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="size-1.5 shrink-0 rounded-full bg-current"
                      />
                      {toStatusLabel(asset.status)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="px-5 py-8 text-center text-sm text-muted-foreground">
            No assets have been added yet.
          </p>
        )}
      </section>
    </div>
  );
}
