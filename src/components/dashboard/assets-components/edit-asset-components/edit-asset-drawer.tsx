import type {
  AssetStatus,
  AssetType,
  EditFormSectionProps,
} from "@/types/assets";
import { useState } from "react";
import { assetStatuses, assetTypes } from "../../reusable-components/utils";
import { Lock } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar-context";
import DrawerHeader from "../reusable-components/drawer-header";
import { Button } from "@/components/ui/button";
import { updateAsset } from "@/services/assets.services";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { editAssetSchema } from "@/schemas/asset";

export type editAssetErrors = {
  type: string | null;
  serialNumber: string | null;
  purchaseDate: string | null;
};

export function EditAssetDrawer({
  asset,
  open,
  onOpenChange,
}: EditFormSectionProps) {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const [type, setType] = useState<AssetType | null>(asset?.type as AssetType);
  const [status, setStatus] = useState<AssetStatus | null>(
    asset?.status as AssetStatus
  );
  const [serialNumber, setSerialNumber] = useState<string | null>(
    asset.serialNumber
  );
  const [purchaseDate, setPurchaseDate] = useState<string | null>(
    asset.purchaseDate
  );
  const [warrantyExpiry, setWarrantyExpiry] = useState<string | null>(
    asset.warrantyExpiry
  );
  const [notes, setNotes] = useState<string | null>(asset.notes);
  const [errors, setErrors] = useState<editAssetErrors>({
    type: null,
    serialNumber: null,
    purchaseDate: null,
  });
  const [serverError, setServerError] = useState<string | null>(null);

  function validateForm() {
    const result = editAssetSchema.safeParse({
      type,
      serialNumber,
      purchaseDate,
    });

    if (result.success) {
      setErrors({
        type: null,
        serialNumber: null,
        purchaseDate: null,
      });
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

    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    try {
      const response = await updateAsset(asset.id, {
        type: type ?? asset.type,
        notes: notes ?? asset.notes,
        purchase_date: purchaseDate ?? asset.purchaseDate,
        warranty_expiry: warrantyExpiry ?? asset.warrantyExpiry,
        serial_number: serialNumber ?? asset.serialNumber,
      });
      console.log("response", response);
      if (response.success || response.data) {
        toast.success(response.message);
        navigate(`/assets`);
      }
      if (!response.success || !response.data) {
        if (response.errors && response.errors !== null) {
          setServerError(
            response.errors.map((error) => error.message).join(", "),
          );
        } else {
          setServerError(response.message);
        }
        toast.error(serverError);
      }
    } catch (error) {
      console.error(error);
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
        <DrawerHeader onOpenChange={onOpenChange} asset={asset} mode={"edit"} />
        <section className="flex flex-col gap-6 p-4 sm:gap-6 sm:p-5 lg:p-5.5 xl:p-7">
          <header className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Edit asset
            </h1>

            <p className="text-sm text-muted-foreground">
              Update details, status and assignment in one place.
            </p>
          </header>
          <form className="border rounded-lg shadow-md 2xl:flex 2xl:flex-col" onSubmit={editAsset}>
            <div className="2xl:flex 2xl:flex-row 2xl:w-full">
            <div className="2xl:flex 2xl:w-1/2! 2xl:flex-col">
            <div className="flex flex-col gap-3 border-b 2xl:border-r p-5">
              <h3 className="text-sm font-medium">Type</h3>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,130px),1fr))] gap-2">
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
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] 2xl:grid-cols-2 gap-4 p-5 2xl:border-r">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">Asset tag</label>
                <div className="flex h-9 items-center gap-2 rounded-md border border-dashed bg-muted px-3 font-mono text-xs text-muted-foreground">
                  <Lock className="size-3.5" />
                  assetTag
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
                  Warranty expiry{" "}
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
                  className="resize-y rounded-md border bg-background px-3 py-2 text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Searchable from the assets list.
                </p>
              </div>
            </div>
            </div>
            <div className="flex flex-col gap-4 border-t 2xl:border-t-0 p-5 2xl:w-1/2">
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-medium">Status &amp; assignment</h3>
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
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setStatus(item.value)}
                      aria-pressed={status === item.value}
                      className={`flex flex-col items-start gap-2 rounded-md border p-3 text-left ${
                        status === item.value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted"
                      }`}
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
            </div>
            </div>
            <div className="flex flex-wrap-reverse justify-end gap-2 rounded-b-lg border-t bg-muted px-5 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
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
      </SheetContent>
    </Sheet>
  );
}
