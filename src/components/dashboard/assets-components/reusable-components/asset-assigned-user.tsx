import type { Asset } from "@/types/assets";
import { Section } from "../view-asset-components/view-asset-drawer";

export function AssetAssignedUser({ asset }: { asset: Asset }) {
  return (
    <Section title="Assigned to">
      <div className="py-4">
        {asset.assignedUser ? (
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
              {asset.assignedUser.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="wrap-break-words text-sm font-medium">
                {asset.assignedUser.fullName}
              </p>
              <p className="break-all text-xs text-muted-foreground">
                {asset.assignedUser.email}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Not assigned. Available to issue.
          </p>
        )}
      </div>
    </Section>
  );
}
