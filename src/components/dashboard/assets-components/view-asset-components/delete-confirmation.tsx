import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export type DeleteAssetCardProps = {
  assetTag: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DeleteAssetCard({
  assetTag,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteAssetCardProps) {
  return (
    <section
      className="absolute inset-0 z-20 flex items-center bg-black/10 justify-center p-4 backdrop-blur-xs"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <Card className="w-full max-w-120 gap-0 overflow-hidden rounded-lg shadow-lg">
        <CardHeader className="flex flex-row items-start justify-between gap-3 px-5 pb-0">
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
            className="relative size-8 shrink-0"
            onClick={onCancel}
            disabled={isDeleting}
          >
            <X className="absolute top-0.5 right-1 size-4 text-muted-foreground" />
            <span className="sr-only">Close</span>
          </Button>
        </CardHeader>
        <CardContent className="py-2" />
        <CardFooter className="flex flex-wrap-reverse justify-end gap-2 border-none bg-background px-5 pb-5">
          <Button
            variant="outline"
            className="rounded-sm px-3.5 py-4"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={onConfirm}
            disabled={isDeleting}
            className="rounded-sm px-3.5 py-4 bg-destructive text-background hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                {" "}
                <Spinner className="size-4"/> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
