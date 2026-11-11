import type { Asset, AssetStatus } from "@/types/assets";
import { Section } from "./view-asset-components/view-asset-drawer";
import { cn } from "cn";
import { getStatusMessage, statusDisplayNames, statusDotStyles } from "../utils";

export function AssetStatusRules({
  asset,
  isPage,
}: {
  asset: Asset;
  isPage: boolean;
}) {
  return (
    <Section title="Status rules">
      <ul className="py-1">
        {(["in_stock", "assigned", "repair", "retired"] as const).map(
          (status) => {
            const message = getStatusMessage(
              asset.status as AssetStatus,
              status,
            );
            return (
              <li
                key={status}
                className={cn(
                  "flex items-center gap-2 py-3 text-sm",
                  isPage && "lg:py-2.5",
                )}
              >
                <span
                  className={`size-2 shrink-0 rounded-full ${statusDotStyles[statusDisplayNames[status]]}`}
                />
                <span
                  className={`min-w-0 flex-1 ${message === "Current" && "font-semibold"}`}
                >
                  {statusDisplayNames[status]}
                </span>
                <span
                  className={`shrink-0 text-xs ${
                    message === "Can move here"
                      ? "text-success"
                      : message === "Current"
                        ? "text-foreground"
                        : message === "Not Allowed"
                          ? "text-muted-foreground"
                          : null
                  }`}
                >
                  {message}
                </span>
              </li>
            );
          },
        )}
      </ul>
    </Section>
  );
}
