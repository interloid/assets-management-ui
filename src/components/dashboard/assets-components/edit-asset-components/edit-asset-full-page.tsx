import { editAssetSchema } from "@/schemas/asset";
import type { Asset, AssetStatus, AssetType } from "@/types/assets";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router"; // 👈 Link imported here
import type { editAssetErrors } from "./edit-asset-drawer";
import { updateAsset } from "@/services/assets.services";
import { toast } from "sonner";
import { assetStatuses, assetTypes } from "../../reusable-components/utils";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditAssetFullPage() {
  const location = useLocation();
  const state = location.state as { asset?: Asset } | null;
  const asset = state?.asset;

  if (!asset) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center h-full">
        <p>No asset was provided.</p>
        <Link to="/assets">
          <Button className="rounded-sm">Return to Assets</Button>
        </Link>
      </div>
    );
  }

  return <EditAssetForm asset={asset} />;
}

function EditAssetForm({ asset }: { asset: Asset }) {
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
  const [serverError, setServerError] = useState<string | null>(null);

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
      });

      if (response.success || response.data) {
        toast.success(response.message);
        navigate(`/assets`);
      } else {
        const errorMsg =
          response.errors && response.errors.length > 0
            ? response.errors.map((error) => error.message).join(", ")
            : response.message;
        setServerError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="mx-auto flex w-full flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          to="/assets"
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Assets
        </Link>
        <span>/</span>
        <span className="font-mono text-foreground">{asset.assetTag}</span>
      </div>
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Edit asset</h1>
        <p className="text-sm text-muted-foreground">
          Update details, status and assignment in one place.
        </p>
      </header>

      <form className="border rounded-lg shadow-md" onSubmit={editAsset}>
        <div className="flex flex-col gap-3 border-b p-5">
          <h3 className="text-sm font-medium">Type</h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,130px),1fr))] gap-2">
            {assetTypes.map(({ label, value, icon: Icon }) => (
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
                    type === value ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
          {errors.type && (
            <p className="text-sm text-destructive">{errors.type}</p>
          )}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4 p-5">
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
              <p className="text-sm text-destructive">{errors.serialNumber}</p>
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
              <p className="text-sm text-destructive">{errors.purchaseDate}</p>
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
              Notes <span className="text-muted-foreground">(optional)</span>
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

        <div className="flex flex-col gap-4 border-t p-5">
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
            {assetStatuses.map((item) => (
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
            ))}
          </div>
        </div>

        {serverError && (
          <p className="px-5 text-sm text-destructive">{serverError}</p>
        )}

        <div className="flex flex-wrap-reverse justify-end gap-2 rounded-b-lg border-t bg-muted px-5 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/assets")}
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
