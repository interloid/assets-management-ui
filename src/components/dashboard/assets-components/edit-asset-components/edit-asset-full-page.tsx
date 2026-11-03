import { editAssetSchema } from "@/schemas/asset";
import type { Asset, AssetStatus, AssetType } from "@/types/assets";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router"; // 👈 Link imported here
import type { editAssetErrors } from "./edit-asset-drawer";
import {
  getAssetsById,
  updateAsset,
  type User,
} from "@/services/assets.services";
import { toast } from "sonner";
import { assetStatuses, assetTypes } from "../../reusable-components/utils";
import { ArrowLeft, ChevronDown, Info, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditAssetFullPageSkeleton from "./edit-asset-full-page-skeleton";

type EditAssetLocationState = {
  asset: Asset;
  allUsers: User[];
};

export default function EditAssetFullPage() {
  const location = useLocation();
  const state = location.state as EditAssetLocationState | null;
  const allUsers = state?.allUsers ?? [];
  const { assetId } = useParams();
  const [asset, setAsset] = useState<Asset | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!assetId) return;
    const currentAssetId = assetId;

    let active = true;

    async function loadAsset() {
      setIsLoading(true);
      try {
        const response = await getAssetsById(currentAssetId);
        if (!response.success || !response.data) {
          return;
        }
        if (response.success || response.data) {
          if (active) {
            setAsset(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    void loadAsset();
    return () => {
      active = false;
    };
  }, [assetId]);

  return isLoading || !asset ? (
    <EditAssetFullPageSkeleton />
  ) : asset ? (
    <EditAssetForm asset={asset} allUsers={allUsers} />
  ) : (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <p>No asset was provided.</p>
      <Link to="/assets">
        <Button className="rounded-sm">Return to Assets</Button>
      </Link>
    </div>
  );
}

function EditAssetForm({
  asset,
  allUsers,
}: {
  asset: Asset;
  allUsers: User[];
}) {
  const navigate = useNavigate();

  const [type, setType] = useState<AssetType | null>(asset.type as AssetType);
  const [status, setStatus] = useState<AssetStatus | null>(
    asset.status as AssetStatus,
  );
  const [serialNumber, setSerialNumber] = useState<string | null>(
    asset.serialNumber,
  );
  const [purchaseDate, setPurchaseDate] = useState<string | null>(
    asset.purchaseDate,
  );
  const [warrantyExpiry, setWarrantyExpiry] = useState<string | null>(
    asset.warrantyExpiry,
  );
  const [notes, setNotes] = useState<string | null>(asset.notes);
  const [errors, setErrors] = useState<editAssetErrors>({
    type: null,
    serialNumber: null,
    purchaseDate: null,
  });
  const [selectedUserId, setSelectedUserId] = useState(
    asset.assignedUser?.id ?? undefined,
  );
  const [serverError, setServerError] = useState<string | null>(null);

  const updatedStatus = status ?? asset.status;
  const updatedAssignedUser =
    updatedStatus === "assigned"
      ? (allUsers.find((user) => user.id === selectedUserId) ??
        asset.assignedUser)
      : null;
  const updatedAsset: Asset = {
    ...asset,
    type: type ?? asset.type,
    status: updatedStatus,
    serialNumber: serialNumber ?? asset.serialNumber,
    purchaseDate: purchaseDate ?? asset.purchaseDate,
    warrantyExpiry: warrantyExpiry ?? asset.warrantyExpiry,
    notes: notes ?? asset.notes,
    assignedUser: updatedAssignedUser,
    initials: updatedAssignedUser
      ? updatedAssignedUser.fullName
          .split(/\s+/)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
      : "",
  };

  function validateForm() {
    const result = editAssetSchema.safeParse({
      type,
      serialNumber,
      purchaseDate,
    });

    if (result.success) {
      setErrors({ type: null, serialNumber: null, purchaseDate: null });
      return true;
    }
    const fieldErrors = result.error.flatten().fieldErrors;
    setErrors({
      type: fieldErrors.type?.[0] ?? null,
      serialNumber: fieldErrors.serialNumber?.[0] ?? null,
      purchaseDate: fieldErrors.purchaseDate?.[0] ?? null,
    });
    return false;
  }

  async function editAsset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);
    if (!validateForm()) return;
    try {
      const response = await updateAsset(asset.id, {
        type: type ?? asset.type,
        notes: notes ?? asset.notes,
        purchase_date: purchaseDate ?? asset.purchaseDate,
        warranty_expiry: warrantyExpiry ?? asset.warrantyExpiry,
        serial_number: serialNumber ?? asset.serialNumber,
        status: status ?? asset.status,
        ...(status === "assigned" && selectedUserId
          ? { user_id: selectedUserId }
          : null),
      });

      if (response.success || response.data) {
        toast.success(response.message);
        navigate(`/assets/asset-details/${asset.id}`, {
          state: { asset: updatedAsset, allUsers },
        });
      }
      if (!response.success || !response.data) {
        if (response.errors && response.errors !== null) {
          const errorMessage = response.errors
            .map((error) => error.message)
            .join(", ");
          setServerError(errorMessage);
          toast.error(errorMessage);
        } else {
          setServerError(response.message);
          toast.error(response.message);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="mx-auto flex w-full flex-col gap-6 p-4 md:p-6 xl:p-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to={`/assets`}
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <span className="font-mono text-muted-foreground">
          {asset.assetTag}
        </span>
      </div>
      <header className="flex flex-col gap-1 lg:pt-1">
        <h1 className="text-[22px] lg:text-2xl font-semibold tracking-tight">
          Edit asset
        </h1>
        <p className="text-sm text-muted-foreground">
          Update details, status and assignment in one place.
        </p>
      </header>
      <form
        className="border rounded-lg shadow-md 2xl:flex 2xl:flex-col"
        onSubmit={editAsset}
      >
        <div className="2xl:flex 2xl:flex-row 2xl:w-full">
          <div className="2xl:flex 2xl:w-[75%] 2xl:flex-col">
            <div className="flex flex-col gap-3 border-b 2xl:border-r p-5">
              <h3 className="text-sm font-medium">Type</h3>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,130px),1fr))] xl:grid-cols-4  gap-2">
                {assetTypes.map(({ label, value, icon: Icon }) => {
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setType(value)}
                      className={`flex min-h-20 flex-col items-start gap-2.5 rounded-md border p-3 text-left transition-colors ${
                        type === value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted"
                      }`}
                    >
                      <Icon
                        className={`size-5 ${
                          type === value
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  );
                })}
                {errors.type && (
                  <p className="text-sm text-destructive">{errors.type}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] xl:grid-cols-4 gap-4 p-5 2xl:border-r">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Asset tag</label>
                <div className="flex h-9 items-center gap-2 rounded-md border border-dashed bg-muted px-3 font-mono text-xs text-muted-foreground">
                  <Lock className="size-3.5" />
                  {asset.assetTag}
                </div>
                <p className="text-xs text-muted-foreground">
                  Asset tags cannot be changed.
                </p>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="serialNumber" className="text-sm font-medium">
                  Serial number
                </label>
                <input
                  id="serialNumber"
                  value={serialNumber ?? undefined}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  placeholder="e.g. C02FK3J1Q6L4"
                  className="h-9 rounded-md border bg-background px-3 font-mono text-sm"
                />
                {errors.serialNumber && (
                  <p className="text-sm text-destructive">
                    {errors.serialNumber}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="purchaseDate" className="text-sm font-medium">
                  Purchase date
                </label>
                <input
                  id="purchaseDate"
                  type="date"
                  value={purchaseDate ?? undefined}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="h-9 rounded-md border bg-background px-3 text-sm"
                />
                {errors.purchaseDate && (
                  <p className="text-sm text-destructive">
                    {errors.purchaseDate}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="warrantyExpiry" className="text-sm font-medium">
                  Warranty expiry
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="warrantyExpiry"
                  type="date"
                  value={warrantyExpiry ?? undefined}
                  onChange={(e) => setWarrantyExpiry(e.target.value)}
                  className="h-9 rounded-md border bg-background px-3 text-sm"
                />
              </div>
              <div className="col-span-full flex flex-col gap-1.5">
                <label htmlFor="notes" className="text-sm font-medium">
                  Notes{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes ?? undefined}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Model, configuration, condition or ticket references"
                  className="resize-y lg:h-26 rounded-md border bg-background px-3 py-2 text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Searchable from the assets list.
                </p>
                {serverError && <span>{serverError}</span>}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t lg:pb-4 2xl:border-t-0 p-5 2xl:w-1/2">
            <div className="flex flex-col gap-1">
              <h3 className="text-sm font-medium">Status & assignment</h3>
              <p className="text-xs text-muted-foreground">
                Current:{" "}
                {
                  assetStatuses.find((item) => item.value === asset?.status)
                    ?.label
                }{" "}
                Only allowed moves can be selected.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-2">
              {assetStatuses.map((item) => {
                const isDisabled =
                  (asset.status === "assigned" && item.value === "retired") ||
                  (asset.status === "repair" && item.value === "assigned") ||
                  (asset.status === "retired" &&
                    ["assigned", "in_stock", "repair"].includes(item.value));
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setStatus(item.value)}
                    aria-pressed={status === item.value}
                    disabled={isDisabled}
                    className={`flex flex-col items-start gap-2 rounded-md border p-3 text-left cursor-pointer ${
                      status === item.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted"
                    } ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <span className="flex w-full items-center gap-2 text-sm font-medium">
                      <span className={`size-2 rounded-full ${item.color}`} />
                      {item.label}
                      {asset?.status === item.value && (
                        <span className="ml-auto text-xs text-muted-foreground">
                          current
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="flex">
              {status === "assigned" && (
                <div className="flex flex-col gap-2 h-17 w-full relative">
                  <span className="text-[16px]"> Assigned to </span>
                  <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="h-9 w-full relative appearance-none rounded-md border border-input bg-background px-3 pr-9 text-sm shadow-xs outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Choose a person…</option>
                    {allUsers.map((user) => {
                      return (
                        <option key={user.id} value={user.id}>
                          {user.fullName} · {user.email}
                        </option>
                      );
                    })}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3 top-3/4 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                </div>
              )}
              {status === "repair" ? (
                <div
                  role="note"
                  className="flex w-full items-start gap-2.5 rounded-md bg-muted px-3 py-2.5 text-[13px]"
                >
                  <Info className="mt-px size-4 shrink-0 text-muted-foreground" />
                  <span>On save, it goes to repair.</span>
                </div>
              ) : status === "retired" ? (
                <div
                  role="note"
                  className="flex w-full items-start gap-2.5 rounded-md bg-muted px-3 py-2.5 text-[13px]"
                >
                  <Info className="mt-px size-4 shrink-0 text-muted-foreground" />
                  <span>
                    On save, it is retired permanently. This cannot be undone.
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap-reverse justify-end gap-2 rounded-b-lg border-t bg-muted px-5 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/assets/asset-details/${asset.id}`)}
            className="h-9 px-3.5"
          >
            Cancel
          </Button>
          <Button type="submit" className="h-9 gap-2 px-3.5">
            Save changes
          </Button>
        </div>
      </form>
    </section>
  );
}
