import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createAssetSchema } from "@/schemas/asset";
import { createAsset } from "@/services/assets.services";
import { Laptop, Monitor, Smartphone, Keyboard, Lock } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const assetTypes = [
  { value: "laptop", label: "Laptop", icon: Laptop },
  { value: "monitor", label: "Monitor", icon: Monitor },
  { value: "phone", label: "Phone", icon: Smartphone },
  { value: "accessory", label: "Accessory", icon: Keyboard },
] as const;

type AssetType = (typeof assetTypes)[number]["value"];

type FormErrors = {
  type: string | null;
  serialNumber: string | null;
  purchaseDate: string | null;
};

export function AddAssetForm() {
  const navigate = useNavigate();
  const [type, setType] = useState<AssetType | null>(null);
  const [serialNumber, setSerialNumber] = useState<string | null>(null);
  const [purchaseDate, setPurchaseDate] = useState<string | null>(null);
  const [warrantyExpiry, setwarrantyExpiry] = useState<string | null>(null);
  const [notes, setNotes] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({
    type: null,
    serialNumber: null,
    purchaseDate: null,
  });
  const [serverErrors, setServerError] = useState<string | null>(null);

  function validateForm() {
    const result = createAssetSchema.safeParse({
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
      type: fieldErrors.type?.[0] ?? null, //checks the first error
      serialNumber: fieldErrors.serialNumber?.[0] ?? null,
      purchaseDate: fieldErrors.purchaseDate?.[0] ?? null,
    });
    return false;
  }

  const handleTypeChange = (type: AssetType) => {
    setType(type);
    setErrors((prev) => ({ ...prev, type: null }));
  };

  const handleSerialNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSerialNumber(event.target.value);
    setErrors((prev) => ({ ...prev, serialNumber: null }));
  };
  const handlePurchasechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurchaseDate(event.target.value);
    setErrors((prev) => ({ ...prev, purchaseDate: null }));
  };

  const handleWarrantyExpiryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setwarrantyExpiry(event.target.value);
  };
  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerError(null);

    const isValid = validateForm();
    if (!isValid) {
      return;
    }
    try {
      const response = await createAsset({
        type,
        serialNumber,
        purchaseDate,
        warrantyExpiry,
        notes,
      });
      console.log("response", response);
      if (response.success || response.data) {
        toast.success(response.message);
        navigate(`/dashboard/assets`);
      }
      if (!response.success || !response.data) {
        if (response.errors && response.errors !== null) {
          setServerError(
            response.errors.map((error) => error.message).join(","),
          );
        } else {
          setServerError(response.message);
        }
        toast.error(serverErrors);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
    >
      <div className="grid grid-cols-1 items-stretch">
        <div className="min-w-0">
          <fieldset className="m-0 flex flex-col gap-3 border-0 p-5">
            <legend className="float-left w-full p-0 text-sm font-medium">
              Type
            </legend>
            <div
              role="radiogroup"
              aria-label="Asset type"
              className="grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-0.5"
            >
              {assetTypes.map((item) => {
                const Icon = item.icon;
                const isSelected = type === item.value;
                return (
                  <button
                    key={item.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    value={type ?? ""}
                    onClick={() => handleTypeChange(item.value)}
                    className={`flex min-h-19 cursor-pointer flex-col items-start gap-2.5 rounded-md border p-3 text-left transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-border bg-transparent hover:bg-muted/50"
                    }`}
                  >
                    <Icon
                      className={`size-5 ${
                        isSelected ? "text-primary" : "text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
            {errors.type && (
              <p className="text-sm text-destructive">{errors.type}</p>
            )}
          </fieldset>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-5 gap-y-4 border-t border-border p-5">
            <div className="flex min-w-0 flex-col gap-2.5">
              <Label>Asset tag</Label>
              <div className="flex h-9 items-center gap-2 rounded-md border border-dashed border-border bg-muted px-3 font-mono text-[13px] text-muted-foreground">
                <Lock className="size-3.5" aria-hidden="true" />
                <span>IL-···-····</span>
              </div>

              <p className="text-xs text-muted-foreground">
                Generated by the server when you save.
              </p>
            </div>

            <div className="flex min-w-0 flex-col gap-2.5">
              <Label htmlFor="serialNumber">Serial number</Label>
              <Input
                id="serialNumber"
                value={serialNumber ?? ""}
                onChange={handleSerialNumberChange}
                autoComplete="off"
                spellCheck={false}
                placeholder="e.g. C02FK3J1Q6L4"
                className="h-9 font-mono text-[13px] shadow-sm"
              />
              {(errors?.serialNumber || serverErrors) && (
                <p className="text-sm text-destructive">
                  {errors.serialNumber ?? serverErrors}
                </p>
              )}
            </div>

            <div className="flex min-w-0 flex-col gap-2.5">
              <Label htmlFor="purchaseDate">Purchase date</Label>
              <Input
                id="purchaseDate"
                type="date"
                max={new Date().toLocaleDateString("en-CA")}
                value={purchaseDate ?? ""}
                onChange={handlePurchasechange}
                className="h-9 text-[14px] shadow-sm"
              />
              {(errors.purchaseDate || serverErrors) && (
                <p className="text-sm text-destructive">
                  {errors.purchaseDate}
                </p>
              )}
            </div>

            <div className="flex min-w-0 flex-col gap-2.5">
              <Label htmlFor="warrantyExpiry">
                Warranty expiry
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Input
                id="warrantyExpiry"
                type="date"
                min={purchaseDate || undefined}
                value={warrantyExpiry ?? ""}
                onChange={handleWarrantyExpiryChange}
                className="h-9 text-[14px] shadow-sm"
              />
            </div>
            <div className="col-span-full flex min-w-0 flex-col gap-1.5">
              <Label htmlFor="notes">
                Notes{" "}
                <span className="font-normal text-muted-foreground">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="notes"
                rows={4}
                placeholder="Model, configuration, condition or ticket references"
                value={notes ?? ""}
                onChange={handleNotesChange}
                className="min-h-25 text-[14px] shadow-sm"
              />
              <p className="text-xs text-muted-foreground">
                Searchable from the assets list.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap-reverse justify-end gap-2 border-t border-border bg-muted px-5 py-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/dashboard/assets")}
          title="Discard changes"
          className="h-9 px-3.5 text-sm font-medium shadow-xs cursor-pointer"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          title="Create the asset as In stock"
          className="h-9 gap-2 px-3.5 text-sm font-medium shadow-xs cursor-pointer"
        >
          Create asset
        </Button>
      </div>
    </form>
  );
}
