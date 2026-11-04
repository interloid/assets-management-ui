import { AssetDetailTable } from "../reusable-components/asset-detail-table";
import { Section } from "./view-asset-drawer";
import { AssetStatusRules } from "../reusable-components/asset-status-rules";
import { AssetAssignedUser } from "../reusable-components/asset-assigned-user";
import { AssetViewHeader } from "../reusable-components/asset-view-header";
import type {
  Asset,
  AssetStatus,
  AssetViewFullPageProps,
  User,
} from "@/types/assets";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AssignAssetDialog } from "./asset-assign-dialog";
import { ChangeStatusCard } from "./change-status-card";
import { ReturnToStockCard } from "./return-to-stock-card";
import {
  changeStatus,
  deleteAsset,
  getAssetsById,
  unassignAsset,
} from "@/services/assets-services";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import DeleteAssetCard from "./delete-confirmation";

export function AssetViewFullPage({
  onChangeStatus,
  onSaved,
  onDelete,
  onUnassign,
}: AssetViewFullPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { asset?: Asset; allUsers?: User[] } | null;
  const { assetId } = useParams();
  const allUsers = state?.allUsers ?? [];
  const [asset, setAsset] = useState<Asset | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isChangeStatus, setIsChangeStatus] = useState<boolean>(false);
  const [isReturnToStockOpen, setIsReturnToStockOpen] = useState(false);
  const [isStatusChangeLoading, setIsStatusChangeLoading] =
    useState<boolean>(false);
  const [isUnassignLoading, setIsUnassignLoading] = useState<boolean>(false);
  const [isDeleteCardOpen, setIsDeleteCardOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const routeAsset = state?.asset?.id === assetId ? state?.asset : null;

  useEffect(() => {
    if (!assetId || routeAsset) return;

    const id = assetId;
    let active = true;

    async function loadAsset() {
      try {
        const response = await getAssetsById(id);
        if (!response.success || !response.data) {
          toast.error(response.message ?? "Failed to load asset details.");
          return;
        }
        if (active) {
          setAsset(response.data);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load asset details.");
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }
    void loadAsset();
    return () => {
      active = false;
    };
  }, [assetId, routeAsset]);

  const currentAsset = routeAsset ?? asset;

  if (isLoading && !routeAsset) {
    return (
      <div className="flex h-full items-center justify-center gap-2">
        <Spinner />
        <span>Loading asset details...</span>
      </div>
    );
  }

  if (!currentAsset) {
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
    setIsStatusChangeLoading(true);
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
      if (response.success) {
        setIsDeleteCardOpen(false);
        onDelete?.(asset);
        toast.success(response.message ?? "Asset deleted successfully.");
        navigate("/assets");
      } else {
        toast.error(response.message ?? "Failed to delete asset.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <section className="mx-auto flex w-full max-w-480 flex-col gap-6 p-4 md:p-6 xl:p-8 2xl:gap-7.5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/assets" className="flex items-center gap-1">
          <ArrowLeft className="size-4 lg:size-4" />
          Assets
        </Link>
        <ChevronRight className="size-3.5" />
        <span className="font-mono text-foreground">{asset?.assetTag}</span>
      </div>
      <AssetViewHeader
        asset={currentAsset}
        onChangeStatus={(selectedAsset) => {
          onChangeStatus?.(selectedAsset);
          setIsChangeStatus(true);
        }}
        onEdit={(selectedAsset) =>
          navigate(`/assets/asset-details/edit/${selectedAsset.id}`, {
            state: { asset: selectedAsset, allUsers },
          })
        }
        onDelete={() => {
          setIsDeleteCardOpen(true);
        }}
        onAssign={handleAssignAsset}
        isPage={true}
      />
      <div className="flex flex-col gap-6 lg:flex-col xl:flex-row xl:w-full">
        <div className="flex min-w-0 flex-1 flex-col gap-6 xl:w-[67%]">
          <AssetDetailTable asset={currentAsset} isPage={true} />
          <Section title="Notes">
            <p className="whitespace-pre-wrap py-4 text-sm leading-6">
              {asset?.notes || "No notes added."}
            </p>
          </Section>
        </div>
        <div className="flex w-full flex-col gap-6 xl:w-[33%]">
          <AssetAssignedUser asset={currentAsset} />
          <AssetStatusRules asset={currentAsset} isPage={true} />
        </div>
      </div>
      {isDialogOpen && (
        <AssignAssetDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          asset={asset}
          allUsers={allUsers}
          onSaved={onSaved}
        />
      )}
      {isChangeStatus && (
        <ChangeStatusCard
          onOpenChange={setIsChangeStatus}
          asset={asset}
          onConfirm={handleConfirmStatusChange}
          isLoading={isStatusChangeLoading}
        />
      )}
      {isReturnToStockOpen && (
        <ReturnToStockCard
          assetTag={currentAsset.assetTag}
          assignedUserName={
            currentAsset.assignedUser?.fullName ?? "the assigned user"
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
    </section>
  );
}
