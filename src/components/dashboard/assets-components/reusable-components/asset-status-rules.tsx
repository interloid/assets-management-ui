import type { Asset, AssetStatus } from "@/types/assets";
import {
  getStatusMessage,
  statusDotStyles,
  statusLabels,
} from "../../reusable-components/utils";
import { Section } from "../view-asset-components/view-asset-drawer";

export function AssetStatusRules({ asset }: { asset: Asset }) {
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
              <li key={status} className="flex items-center gap-2 py-3 text-sm">
                <span
                  className={`size-2 shrink-0 rounded-full ${statusDotStyles[statusLabels[status]]}`}
                />
                <span
                  className={`min-w-0 flex-1 ${message === "Current" ? "font-semibold" : null}`}
                >
                  {statusLabels[status]}
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
