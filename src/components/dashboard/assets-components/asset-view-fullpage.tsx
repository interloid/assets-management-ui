import { AssetDetailTable } from "./reusable-components/asset-detail-table";
import { Section } from "./view-asset-drawer";
import { AssetStatusRules } from "./reusable-components/asset-status-rules";
import { AssetAssignedUser } from "./reusable-components/asset-assigned-user";
import { AssetViewHeader } from "./reusable-components/asset-view-header";
import type {
  Asset,
  AssetStatus,
  AssetViewFullPageProps,
} from "@/types/assets";
import { Link, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { AssignAssetDialog } from "./asset-assign-dialog";
import { ChangeStatusCard } from "./change-status-card";
import { ReturnToStockCard } from "./return-to-stock-card";
import { changeStatus, unassignAsset } from "@/services/assets.services";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function AssetViewFullPage({
  allUsers = [],
  onChangeStatus,
  onEdit,
  onDelete,
  onUnassign,
}: AssetViewFullPageProps) {
  const location = useLocation();
  const asset = (location.state as { asset?: Asset } | null)?.asset;
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isChangeStatus, setIsChangeStatus] = useState<boolean>(false);
  const [isReturnToStockOpen, setIsReturnToStockOpen] = useState(false);
  const [isUnAssignLoading, setIsUnAssignLoading] = useState<boolean>(false);
  const [isConfirmStatus, setIsConfirmStatus] = useState<boolean>(false);

  if (!asset) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-full">
        <p>No asset was provided.</p>
        <Link to="/dashboard">
          <Button className="rounded-sm">return to Dashboard</Button>
        </Link>
      </div>
    );
  }

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
    <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/assets" className="flex items-center gap-1">
          <ArrowLeft className="size-4" />
          Assets
        </Link>
        <span>/</span>
        <span className="font-mono text-foreground">{asset.assetTag}</span>
      </div>
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
      <div className="flex flex-col gap-6 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <AssetDetailTable asset={asset} />
          <Section title="Notes">
            <p className="whitespace-pre-wrap py-4 text-sm leading-6">
              {asset.notes || "No notes added."}
            </p>
          </Section>
        </div>
        <div className="flex w-full flex-col gap-6 lg:w-80">
          <AssetAssignedUser asset={asset} />
          <AssetStatusRules asset={asset} />
        </div>
      </div>
      {isDialogOpen && (
        <AssignAssetDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          asset={asset}
          allUsers={allUsers}
        />
      )}
      {isChangeStatus && (
        <ChangeStatusCard
          onOpenChange={setIsChangeStatus}
          asset={asset}
          onConfirm={handleConfirmStatusChange}
          isLoading={isUnAssignLoading}
        />
      )}
      {isReturnToStockOpen && (
        <ReturnToStockCard
          assetTag={asset.assetTag}
          assignedUserName={asset.assignedUser?.fullName ?? "the assigned user"}
          onClose={() => setIsReturnToStockOpen(false)}
          onOpenChange={setIsReturnToStockOpen}
          onConfirm={handleConfirmUnassign}
          isLoading={isConfirmStatus}
        />
      )}
    </section>
  );
}
