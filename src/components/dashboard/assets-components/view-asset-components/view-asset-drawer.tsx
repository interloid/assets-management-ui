import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import type { AssetStatus, ViewAssetDrawerProps } from "@/types/assets";
import { useSidebar } from "@/components/ui/sidebar-context";
import { useEffect, useState } from "react";
import { AssignAssetDialog } from "./asset-assign-dialog";
import { ChangeStatusCard } from "./change-status-card";
import {
  changeStatus,
  deleteAsset,
  getFiles,
  unassignAsset,
} from "@/services/assets-services";
import { toast } from "sonner";
import { ReturnToStockCard } from "./return-to-stock-card";
import { AssetDetailTable } from "../asset-detail-table";
import { AssetViewHeader } from "../asset-view-header";
import DrawerHeader from "../drawer-header";
import DeleteAssetCard from "./delete-confirmation";
import {
  getStatusMessage,
  statusDisplayNames,
  statusDotStyles,
} from "../../utils";
import type { AssetAttachmentData } from "./asset-attachment";
import { useParams } from "react-router";
import AssetAttachment from "./asset-attachment";

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
  onSaved,
  onOpenFullPage,
  onOpenChange,
  onEdit,
  onUnassign,
  onChangeStatus,
  onDelete,
}: ViewAssetDrawerProps) {
  const { state } = useSidebar();
  const { assetId } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isChangeStatus, setIsChangeStatus] = useState<boolean>(false);
  const [isReturnToStockOpen, setIsReturnToStockOpen] =
    useState<boolean>(false);
  const [isStatusChangeLoading, setIsStatusChangeLoading] =
    useState<boolean>(false);
  const [isUnassignLoading, setIsUnassignLoading] = useState<boolean>(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
  const routeAsset = asset?.id === assetId ? asset : null;
  const [files, setFiles] = useState<AssetAttachmentData[]>([]);
  const currentAsset = routeAsset ?? asset;
  const currentAssetId = currentAsset?.id;

  useEffect(() => {
    if (!currentAssetId) return;

    const id = currentAssetId;
    let active = true;

    async function loadFiles() {
      setIsFileLoading(true);
      try {
        const response = await getFiles(id);
        if (response.success && active) {
          setFiles(response.data);
        }
        if (!response.success || !response.data) {
          if (response.errors && response.errors !== null) {
            const errorMessage = response.errors
              .map((error) => error.message)
              .join(", ");
            toast.error(errorMessage);
          } else {
            toast.error(response.message);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsFileLoading(false);
      }
    }
    void loadFiles();
    return () => {
      active = false;
    };
  }, [currentAssetId]);

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
    setIsStatusChangeLoading(true);
    try {
      const response = await changeStatus(asset.id, status);
      if (response.success) {
        setIsChangeStatus(false);
        toast.success("Asset status updated successfully.");
        await onSaved();
      } else {
        toast.error(response.message ?? "Failed to update asset status.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsStatusChangeLoading(false);
    }
  }

  async function handleConfirmUnassign() {
    if (!asset) return;
    setIsUnassignLoading(true);
    try {
      const response = await unassignAsset(asset.id);
      if (response.success) {
        onUnassign?.(asset.id);
        setIsReturnToStockOpen(false);
        toast.success("Asset unassigned successfully.");
        await onSaved();
      } else {
        toast.error(response.message ?? "Failed to unassign asset.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUnassignLoading(false);
    }
  }

  async function handleDeleteAsset() {
    if (!asset) return;
    setIsDeleting(true);
    try {
      const response = await deleteAsset(asset.id);
      if (response.ok) {
        setIsDeleteCardOpen(false);
        onOpenChange(false);
        onDelete?.(asset);
        toast.success("Asset deleted successfully.");
        await onSaved();
      } else {
        toast.error("Failed to delete asset.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  async function refreshFiles() {
    if (!currentAssetId) return;

    setIsFileLoading(true);
    try {
      const response = await getFiles(currentAssetId);
      if (response.success) {
        setFiles(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to refresh attachments.");
    } finally {
      setIsFileLoading(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        overlayClassName={`top-14 bottom-0 lg:top-0  ${
          state === "expanded" ? "lg:left-64" : "lg:left-16"
        }`}
        className="flex w-full fixed bottom-0 right-0 data-[side=right]:top-14 lg:data-[side=right]:top-0 z-50 min-w-full sm:min-w-153 lg:min-w-153 xl:min-w-[57.5%] 2xl:min-w-[63.25%] flex-col gap-0 p-0"
        style={{ height: "auto" }}
      >
        {!asset ? (
          <div className="p-6 text-sm text-muted-foreground">
            No asset selected.
          </div>
        ) : (
          <>
            <DrawerHeader
              onOpenFullPage={onOpenFullPage}
              asset={asset}
              onOpenChange={onOpenChange}
              mode={"view"}
              allUsers={allUsers}
            />
            <div className="min-h-0 flex-1 overflow-y-auto pt-2 lg:pt-1 xl:pt-0">
              <div className="flex flex-col gap-6 p-4 sm:gap-6 sm:p-5 lg:p-5.5 xl:p-6 2xl:p-8">
                <AssetViewHeader
                  asset={asset}
                  onChangeStatus={(selectedAsset) => {
                    onChangeStatus?.(selectedAsset);
                    setIsChangeStatus(true);
                  }}
                  onEdit={onEdit}
                  onDelete={() => setIsDeleteCardOpen(true)}
                  onAssign={handleAssignAsset}
                  isPage={false}
                />
                <div className="grid min-w-0 grid-cols-1 items-start gap-5 2xl:gap-5.5 2xl:grid-cols-[3fr_1.55fr]">
                  <div className="flex min-w-0 flex-col gap-5">
                    <AssetDetailTable asset={asset} isPage={false} />
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
                                className={`size-2 shrink-0 rounded-full ${statusDotStyles[statusDisplayNames[status]]}`}
                              />
                              <span
                                className={`min-w-0 flex-1 ${message === "Current" ? "font-semibold" : null}`}
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
                        })}
                      </ul>
                    </Section>
                  </div>
                </div>
                {currentAsset && (
                  <AssetAttachment
                    isLoading={isFileLoading}
                    asset={currentAsset}
                    files={files}
                    onFilesChanged={refreshFiles}
                  />
                )}
              </div>
            </div>
            <Separator />
          </>
        )}
        {isDialogOpen && asset && (
          <AssignAssetDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            asset={asset}
            allUsers={allUsers}
            onSaved={onSaved}
          />
        )}
        {isChangeStatus && asset && (
          <ChangeStatusCard
            onOpenChange={setIsChangeStatus}
            asset={asset}
            onConfirm={handleConfirmStatusChange}
            isLoading={isStatusChangeLoading}
          />
        )}
        {isReturnToStockOpen && asset && (
          <ReturnToStockCard
            assetTag={asset.assetTag}
            assignedUserName={
              asset.assignedUser?.fullName ?? "the assigned user"
            }
            onClose={() => setIsReturnToStockOpen(false)}
            onOpenChange={setIsReturnToStockOpen}
            onConfirm={handleConfirmUnassign}
            isLoading={isUnassignLoading}
          />
        )}
        {isDeleteCardOpen && asset && (
          <DeleteAssetCard
            assetTag={asset.assetTag}
            isDeleting={isDeleting}
            onCancel={() => setIsDeleteCardOpen(false)}
            onConfirm={handleDeleteAsset}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
