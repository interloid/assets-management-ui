import { Copy, Maximize2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { AssetStatus, ViewAssetDrawerProps } from "@/types/assets";
import {
  getStatusMessage,
  statusDotStyles,
  statusLabels,
  statusTextStyles,
} from "../reusable-components/utils";
import { useSidebar } from "@/components/ui/sidebar-context";
import { useNavigate } from "react-router";
import { useState } from "react";
import { AssignAssetDialog } from "./asset-assign-dialog";
import { ChangeStatusCard } from "./change-status-card";
import { changeStatus, unassignAsset } from "@/services/assets.services";
import { toast } from "sonner";
import { ReturnToStockCard } from "./return-to-stock-card";
import { copyValue } from "@/lib/utils";
import { AssetDetailTable } from "./reusable-components/asset-detail-table";
import { AssetViewHeader } from "./reusable-components/asset-view-header";

export function DetailRow({
  label,
  value,
  mono = false,
  showCopy = false,
  status,
}: {
  label: string;
  value: string;
  mono?: boolean;
  showCopy?: boolean;
  status?: AssetStatus;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-[minmax(120px,180px)_minmax(0,1fr)] py-4 px-1 md:py-5 md:px-0 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <div className="flex w-full items-center">
        <dd
          className={`min-w-0 wrap-break-words ml-5 relative top-1 ${
            mono ? "font-mono" : ""
          } ${status ? statusTextStyles[status] : "text-foreground"}`}
        >
          {value}
        </dd>
        {showCopy && (
          <Copy
            className="size-3.5 relative left-2.5 2xl:top-1 text-muted-foreground cursor-pointer"
            onClick={() => copyValue(value)}
          />
        )}
      </div>
    </div>
  );
}

export function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="min-w-0 overflow-hidden rounded-lg border bg-card shadow-sm">
      <h3 className="border-b px-5 py-4 text-[16px] font-semibold sm:px-5 sm:py-4">
        {title}
      </h3>
      <div className="px-4 sm:px-5">{children}</div>
    </section>
  );
}

export function ViewAssetDrawer({
  asset,
  allUsers,
  open,
  onOpenChange,
  onUnassign,
  onChangeStatus,
  onEdit,
  onDelete,
  onOpenFullPage,
}: ViewAssetDrawerProps) {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isChangeStatus, setIsChangeStatus] = useState<boolean>(false);
  const [isReturnToStockOpen, setIsReturnToStockOpen] =
    useState<boolean>(false);
  const [isUnAssignLoading, setIsUnAssignLoading] = useState<boolean>(false);
  const [isConfirmStatus, setIsConfirmStatus] = useState<boolean>(false);

  function handleAssignAsset() {
    if (!asset) return;

    if (asset.status === "assigned") {
      setIsReturnToStockOpen(true);
    } else {
      setIsDialogOpen(true);
    }
  }

  async function handleConfirmStatusChange(status: AssetStatus) {
    if (!asset) return;
    setIsUnAssignLoading(true);
    try {
      const response = await changeStatus(asset.id, status);
      if (response.success) {
        setIsChangeStatus(false);
        toast.success("Asset status updated successfully.");
      } else {
        toast.error(response.message ?? "Failed to update asset status.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUnAssignLoading(false);
    }
  }

  async function handleConfirmUnassign() {
    if (!asset) return;
    setIsConfirmStatus(true);
    try {
      const response = await unassignAsset(asset.id);
      if (response.success) {
        onUnassign?.(asset.id);
        setIsReturnToStockOpen(false);
        toast.success("Asset unassigned successfully.");
      } else {
        toast.error(response.message ?? "Failed to unassign asset.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsConfirmStatus(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        overlayClassName={`top-14 bottom-0 lg:top-0  ${
          state === "expanded" ? "lg:left-64" : "lg:left-16"
        }`}
        className="flex w-full fixed  bottom-0 right-0 data-[side=right]:top-14 lg:data-[side=right]:top-0 z-50 min-w-full sm:min-w-153 lg:min-w-153 xl:min-w-[63%] flex-col gap-0 p-0"
        style={{ height: "auto" }}
      >
        {!asset ? (
          <div className="p-6 text-sm text-muted-foreground">
            No asset selected.
          </div>
        ) : (
          <>
            <div className="sticky top-0 z-10 border-r-2 flex items-center justify-between gap-3 border-b bg-background px-4 py-3 sm:px-6 md:px-5 lg:px-7">
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted-foreground">
                  Asset details
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 text-muted-foreground lg:pr-4">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Open asset as full page"
                  title="Open as full page"
                  onClick={() => {
                    onOpenFullPage?.(asset);
                    navigate(`/assets/asset-details/${asset.id}`, {
                      state: { asset },
                    });
                  }}
                >
                  <Maximize2 className="size-4" />
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close asset details"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="size-4.5" />
                </Button>
              </div>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto pt-2 lg:pt-1 xl:pt-0">
              <div className="flex flex-col gap-6 p-4 sm:gap-6 sm:p-5 lg:p-5.5 xl:p-7">
                <AssetViewHeader
                  asset={asset}
                  onChangeStatus={(selectedAsset) => {
                    onChangeStatus?.(selectedAsset);
                    setIsChangeStatus(true);
                  }}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onAssign={handleAssignAsset}
                />
                <div className="grid min-w-0 grid-cols-1 items-start gap-5 2xl:gap-5.5 2xl:grid-cols-[3fr_1.55fr]">
                  <div className="flex min-w-0 flex-col gap-5">
                    <AssetDetailTable asset={asset} />

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
                      <ul className="py-1">
                        {(
                          ["in_stock", "assigned", "repair", "retired"] as const
                        ).map((status) => {
                          const message = getStatusMessage(
                            asset.status as AssetStatus,
                            status,
                          );

                          return (
                            <li
                              key={status}
                              className="flex items-center gap-2 py-3 text-sm"
                            >
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
                        })}
                      </ul>
                    </Section>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}
        {asset && isDialogOpen && (
          <AssignAssetDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            asset={asset}
            allUsers={allUsers}
          />
        )}
        {asset && isChangeStatus && (
          <ChangeStatusCard
            onOpenChange={setIsChangeStatus}
            asset={asset}
            onConfirm={handleConfirmStatusChange}
            isLoading={isUnAssignLoading}
          />
        )}
        {asset && isReturnToStockOpen && (
          <ReturnToStockCard
            assetTag={asset.assetTag}
            assignedUserName={
              asset.assignedUser?.fullName ?? "the assigned user"
            }
            onClose={() => setIsReturnToStockOpen(false)}
            onOpenChange={setIsReturnToStockOpen}
            onConfirm={handleConfirmUnassign}
            isLoading={isConfirmStatus}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
