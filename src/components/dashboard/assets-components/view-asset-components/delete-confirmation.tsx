import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, X } from "lucide-react";

export type DeleteAssetCardProps = {
  assetTag: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

function DeleteAssetCard({
  assetTag,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteAssetCardProps) {
  return (
    <section
      className="absolute inset-0 z-20 flex items-center justify-center p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
           onCancel();
        }
      }}
    >
      <Card className="w-full max-w-120 gap-0 overflow-hidden rounded-lg shadow-lg">
        <CardHeader className="flex flex-row items-start justify-between gap-3 px-5 pt-5 pb-0">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-lg">Delete asset?</CardTitle>
            <p className="text-sm text-muted-foreground">
              {assetTag} will be removed from the register permanently. Only In
              stock or Retired assets can be deleted.
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="size-8 shrink-0"
            onClick={onCancel}
            disabled={isDeleting}
          >
            <X className="size-4" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>
        <CardContent className="px-5 py-4" />
        <CardFooter className="flex flex-wrap-reverse justify-end gap-2 px-5 pb-5">
          <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Trash2 className="size-4" />
            )}
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}

export default DeleteAssetCard;
