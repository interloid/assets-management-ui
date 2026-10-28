import {
  ArrowUpRight,
  Copy,
  Pencil,
  RefreshCw,
  SquareOff,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type {
  AssetStatus,
  AssetType,
  ViewAssetDrawerProps,
} from "@/types/assets";
import { formatDate, toStatusLabel } from "@/lib/converters";
import { statusLabels, statusStyles, typeIcons } from "../reusable-components/reusable-variables";

function DetailRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="grid grid-cols-[minmax(110px,0.8fr)_minmax(0,1.2fr)] gap-3 py-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd
        className={`min-w-0 wrap-break-words text-foreground ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-lg border bg-card shadow-sm">
      <h3 className="border-b px-4 py-3 text-sm font-semibold sm:px-5 sm:py-4">
        {title}
      </h3>
      <div className="px-4 sm:px-5">{children}</div>
    </section>
  );
}

export function ViewAssetDrawer({
  asset,
  open,
  onOpenChange,
  onAssign,
  onChangeStatus,
  onEdit,
  onDelete,
  onOpenFullPage,
}: ViewAssetDrawerProps) {
  const TypeIcon = asset
    ? (typeIcons[asset.type as AssetType] ?? SquareOff)
    : SquareOff;

  async function copyValue(value: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        overlayClassName="top-14 bottom-0 md:top-0"
        className="flex w-full min-w-full sm:min-w-150 lg:min-w-3/5 flex-col gap-0 overflow-hidden p-0 "
      >
        {!asset ? (
          <div className="p-6 text-sm text-muted-foreground">
            No asset selected.
          </div>
        ) : (
          <>
            <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b bg-background px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                  Asset details
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Open asset as full page"
                  title="Open as full page"
                  onClick={() => onOpenFullPage?.(asset)}
                >
                  <ArrowUpRight className="size-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close asset details"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="size-4" />
                </Button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-5 p-4 sm:gap-6 sm:p-6">
                <div className="flex flex-col gap-4 xl:flex-row xl:justify-between">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <SheetHeader className="space-y-0 text-left">
                          <SheetTitle className="break-all font-mono text-xl tracking-tight">
                            {asset.assetTag}
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              aria-label="Copy asset tag"
                              title="Copy asset tag"
                              onClick={() => void copyValue(asset.assetTag)}
                            >
                              <Copy className="size-4" />
                            </Button>
                          </SheetTitle>
                          <SheetDescription className="sr-only">
                            Details and available actions for asset{" "}
                            {asset.assetTag}
                          </SheetDescription>
                        </SheetHeader>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${statusStyles[toStatusLabel(asset.status)]}`}
                        >
                          <span
                            className={`size-1.5 rounded-full bg-current ${statusStyles[toStatusLabel(asset.status)]}`}
                          />
                          {statusLabels[asset.status as AssetStatus]}
                        </span>
                      </div>

                      <div className="flex min-w-0 items-center gap-2 text-sm text-muted-foreground">
                        <TypeIcon className="size-4 shrink-0" />
                        <span className="capitalize">{asset.type}</span>
                        <span aria-hidden="true">·</span>
                        <span className="truncate font-mono">
                          {asset.serialNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => onAssign?.(asset)}
                    >
                      <UserPlus className="mr-2 size-4" />
                      Assign
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => onChangeStatus?.(asset)}
                    >
                      <RefreshCw className="mr-2 size-4" />
                      Change status
                    </Button>

                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit?.(asset)}
                    >
                      <Pencil className="mr-2 size-4" />
                      Edit
                    </Button>

                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      aria-label="Delete asset"
                      title="Delete asset"
                      className="text-destructive hover:text-destructive"
                      onClick={() => onDelete?.(asset)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid min-w-0 grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
                  <div className="flex min-w-0 flex-col gap-5">
                    <Section title="Details">
                      <dl className="divide-y">
                        <DetailRow
                          label="Asset tag"
                          value={asset.assetTag}
                          mono
                        />
                        <DetailRow
                          label="Serial number"
                          value={asset.serialNumber}
                          mono
                        />
                        <DetailRow label="Type" value={asset.type} />
                        <DetailRow
                          label="Status"
                          value={statusLabels[asset.status as AssetStatus]}
                        />
                        <DetailRow
                          label="Purchase date"
                          value={formatDate(asset.purchaseDate)}
                        />
                        <DetailRow
                          label="Warranty expiry"
                          value={formatDate(asset.warrantyExpiry)}
                        />
                        <DetailRow
                          label="Created"
                          value={formatDate(asset.createdAt)}
                        />
                        <DetailRow
                          label="Last updated"
                          value={formatDate(asset.updatedAt)}
                        />
                        <DetailRow label="Asset ID" value={asset.id} mono />
                      </dl>
                    </Section>

                    <Section title="Notes">
                      <p className="whitespace-pre-wrap py-4 text-sm leading-6">
                        {asset.notes || "No notes added."}
                      </p>
                    </Section>
                  </div>
                  <div className="flex min-w-0 flex-col gap-5">
                    <Section title="Assigned to">
                      <div className="py-4">
                        {asset.assignedUser ? (
                          <div className="flex min-w-0 items-start gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                              {asset.assignedUser.fullName
                                .charAt(0)
                                .toUpperCase()}
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

                    <Section title="Status rules">
                      <ul className="divide-y py-1">
                        {(
                          ["in_stock", "assigned", "repair", "retired"] as const
                        ).map((status) => (
                          <li
                            key={status}
                            className="flex items-center gap-2 py-3 text-sm"
                          >
                            <span
                              className={`size-2 shrink-0 rounded-full ${
                                status === "in_stock"
                                  ? "bg-emerald-500"
                                  : status === "assigned"
                                    ? "bg-primary"
                                    : status === "repair"
                                      ? "bg-amber-500"
                                      : "bg-muted-foreground"
                              }`}
                            />
                            <span className="min-w-0 flex-1">
                              {statusLabels[status]}
                            </span>
                            {asset.status === status && (
                              <span className="shrink-0 text-xs text-muted-foreground">
                                Current
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </Section>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
