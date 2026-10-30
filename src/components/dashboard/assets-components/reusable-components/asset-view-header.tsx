import { copyValue } from "@/lib/utils";
import type {
  AssetStatus,
  AssetType,
  AssetViewHeaderProps,
} from "@/types/assets";
import {
  Copy,
  Pencil,
  RefreshCw,
  SquareOff,
  Trash2,
  UserMinus,
  UserPlus,
} from "lucide-react";
import {
  statusDotStyles,
  statusLabels,
  statusStyles,
  typeIcons,
} from "../../reusable-components/utils";
import { toStatusLabel } from "@/lib/converters";
import { Button } from "@/components/ui/button";

export function AssetViewHeader({
  asset,
  onChangeStatus,
  onAssign,
  onEdit,
  onDelete,
}: AssetViewHeaderProps) {
  const TypeIcon = asset
    ? (typeIcons[asset.type as AssetType] ?? SquareOff)
    : SquareOff;

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-5">
            <div className="p-0 text-left">
              <h1 className="break-all font-mono text-xl tracking-tight md:text-[21.5px] xl:text-2xl">
                {asset.assetTag}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Copy asset tag"
                  title="Copy asset tag"
                  onClick={() => copyValue(asset.assetTag)}
                >
                  <Copy className="size-3.5 relative left-2.5 bottom-px text-muted-foreground" />
                </Button>
              </h1>
              <p className="sr-only">
                Details and available actions for asset {asset.assetTag}
              </p>
            </div>
            <span
              className={`inline-flex items-center relative right-px bottom-px gap-1.5 rounded-sm px-2 py-1 text-xs font-medium ${statusStyles[toStatusLabel(asset.status)]} `}
            >
              <span
                className={`size-1.5 rounded-full ${statusDotStyles[toStatusLabel(asset.status)]}`}
              />
              {statusLabels[asset.status as AssetStatus]}
            </span>
          </div>

          <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
            <TypeIcon className="size-4 shrink-0" />
            <span className="capitalize">{asset.type}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate font-mono">{asset.serialNumber}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 2xl:mr-4.5 2xl:relative 2xl:bottom-1">
        <Button
          type="button"
          size="sm"
          variant={asset.status === "assigned" ? "outline" : "default"}
          disabled={asset.status === "retired"}
          onClick={() => onAssign?.(asset)}
          className="h-9 gap-2 px-3.5 text-sm font-medium shadow-xs cursor-pointer"
        >
          {asset.status === "assigned" ? (
            <>
              <UserMinus className="size-4" /> Unassign{" "}
            </>
          ) : (
            <>
              <UserPlus className="size-4" /> Assign{" "}
            </>
          )}
        </Button>
        <Button
          type="button"
          size="sm"
          variant="outline"
          disabled={asset.status === "retired"}
          onClick={() => onChangeStatus?.(asset)}
          className="h-9 gap-2 px-3.5 text-sm font-medium shadow-xs cursor-pointer"
        >
          <RefreshCw className="size-4" />
          Change status
        </Button>

        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={() => onEdit?.(asset)}
          className="h-9 gap-2 px-3.5 text-sm font-medium shadow-xs cursor-pointer"
        >
          <Pencil className="size-4" />
          Edit
        </Button>

        <Button
          type="button"
          size="icon"
          variant="outline"
          aria-label="Delete asset"
          title="Delete asset"
          className="text-destructive hover:text-destructive h-9 gap-2 p-4 px-4.25 rounded-sm shadow-xs cursor-pointer"
          onClick={() => onDelete?.(asset)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}
