import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

interface ReturnToStockCardProps {
  assetTag: string | undefined;
  assignedUserName: string;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReturnToStockCard({
  assetTag,
  assignedUserName,
  onOpenChange,
  onClose,
  onConfirm,
  isLoading = false,
}: ReturnToStockCardProps) {
  return (
    <section
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/10 p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
    >
      <Card className="w-full max-w-120 gap-5 overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-lg">
        <CardHeader className="flex flex-row items-start gap-3 px-5 pb-0">
          <div className="min-w-0 flex-1 gap-1">
            <CardTitle className="text-lg font-semibold">
              Return to stock?
            </CardTitle>
            <CardDescription className="text-sm">
              {assetTag} will be removed from {assignedUserName} and marked In
              stock.
            </CardDescription>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={onClose}
            disabled={isLoading}
            className="relative size-8 shrink-0 text-muted-foreground"
          >
            <X className="absolute top-0 right-0.5 size-4" />
          </Button>
        </CardHeader>
        <CardFooter className="flex flex-wrap-reverse justify-end gap-2 border-none bg-background px-5 py-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-sm px-3.5 py-4"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="rounded-sm px-3.5 py-4"
          >
            {isLoading ? (
              <>
                {" "}
                <Spinner /> Returning
              </>
            ) : (
              <>UnAssign</>
            )}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
