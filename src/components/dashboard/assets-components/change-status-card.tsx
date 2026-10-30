import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Asset, AssetStatus } from "@/types/assets";
import { Check, X } from "lucide-react";
import {
  allowedStatusTransistions,
  statusDotStyles,
  statusLabels,
} from "../reusable-components/utils";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

type ChangeStatusCardProps = {
  onOpenChange: (open: boolean) => void;
  asset: Asset;
  onConfirm: (status: AssetStatus) => void;
  isLoading: boolean;
};

export function ChangeStatusCard({
  onOpenChange,
  asset,
  onConfirm,
  isLoading,
}: ChangeStatusCardProps) {
  const currentStatus = asset.status as AssetStatus;
  const availableStatuses = allowedStatusTransistions[currentStatus].filter(
    (status) =>
      status !== "assigned" &&
      !(currentStatus === "assigned" && status === "in_stock"),
  );
  const [selectedStatus, setSelectedStatus] = useState<AssetStatus | null>(
    null,
  );
  return (
    <section
      className="absolute inset-0 z-20 flex items-center justify-center p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      <Card className="w-full max-w-120 gap-0 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-lg">
        <CardHeader className="flex flex-row items-start gap-3 px-5 pt-5 pb-0">
          <div className="min-w-0 flex-1 gap-1">
            <CardTitle className="text-lg font-semibold">
              Change status
            </CardTitle>

            <CardDescription>
              Current status: {statusLabels[currentStatus]}. Only allowed moves
              are listed.
            </CardDescription>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={() => onOpenChange(false)}
            className="-mt-1 -mr-1 size-8 shrink-0 text-muted-foreground"
          >
            <X className="size-4" />
          </Button>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 overflow-y-auto px-5 py-4">
          <div
            role="radiogroup"
            aria-label="New status"
            className="flex flex-col gap-2"
          >
            {availableStatuses.map((status) => {
              const isSelected = selectedStatus === status;
              return (
                <button
                  key={status}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedStatus(status)}
                  className={`flex items-start gap-3 rounded-md border p-3 text-left transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-transparent hover:bg-muted/50"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full border ${
                      isSelected ? "border-primary" : "border-input"
                    }`}
                  >
                    {isSelected && (
                      <span className="size-2 rounded-full bg-primary" />
                    )}
                  </span>

                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="flex items-center gap-2 text-sm font-medium">
                      <span
                        className={`size-2 shrink-0 rounded-full ${statusDotStyles[statusLabels[status]]}`}
                      />
                      {statusLabels[status]}
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {status === "in_stock"
                        ? "Back in stock and available to assign."
                        : status === "repair"
                          ? "Send for repair. It can return to stock or be retired later."
                          : status === "retired"
                            ? "Permanently retire. Retired is final and cannot be changed."
                            : "No description available."}
                    </span>
                  </div>

                  {isSelected && (
                    <Check
                      aria-hidden="true"
                      className="size-4 shrink-0 text-primary"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </CardContent>

        <CardFooter className="flex flex-wrap-reverse justify-end gap-2 border-t px-5 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            disabled={!selectedStatus}
            onClick={() => {
              if (selectedStatus) onConfirm(selectedStatus);
            }}
          >
            {isLoading ? (
              <>
                {" "}
                <Spinner /> Changing Status
              </>
            ) : (
              <>Change status</>
            )}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
