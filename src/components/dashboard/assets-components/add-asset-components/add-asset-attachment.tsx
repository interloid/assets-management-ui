import { Paperclip, X } from "lucide-react";
import { FileDropzone } from "../view-asset-components/file-drop-zone";
import { useCallback } from "react";
import { toast } from "sonner";
import { fileSchema, MAX_FILES } from "@/schemas/asset";
import { Button } from "@/components/ui/button";
import FilePreview from "../file-preview";

export type AddAssetAttachmentProps = {
  files: File[];
  onFilesChange: (files: File[]) => void;
};

export default function AddAssetAttachment({
  files,
  onFilesChange,
}: AddAssetAttachmentProps) {
  const addFiles = useCallback(
    (newFiles: File[]) => {
      if (files.length + newFiles.length > MAX_FILES) {
        toast.error(`You can upload a maximum of ${MAX_FILES} files per asset.`);
        return;
      }
      onFilesChange([...files, ...newFiles]);
    },
    [files, onFilesChange],
  );

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
  };

  function handleFilesSelected(newFiles: File[]) {
    if (files.length + newFiles.length > MAX_FILES) {
      toast.error(`You can upload a maximum of ${MAX_FILES} files per asset.`);
      return;
    }

    const validFiles: File[] = [];
    newFiles.forEach((file) => {
      const result = fileSchema.safeParse(file);
      if (result.success) {
        validFiles.push(file);
      } else {
        toast.error(result.error.issues[0]?.message ?? "Invalid file");
      }
    });
    addFiles(validFiles);
  }
 
  const maxFiles = Math.max(0, MAX_FILES - files.length);
  
  return (
    <section
      aria-labelledby="attachments-heading"
      className="rounded-2xl border-input border bg-card p-4 text-card-foreground sm:p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <Paperclip className="mt-1 size-6 text-primary" aria-hidden="true" />
          <div>
            <h2 id="attachments-heading" className="text-xl font-semibold">
              Attachments
            </h2>
            <p className="text-sm text-muted-foreground">
              Documents and files related to this asset
            </p>
          </div>
        </div>
      </div>
      <FileDropzone
        maxFiles={maxFiles}
        onFilesSelected={handleFilesSelected}
      />
      {files.length > 0 && (
        <div className="mt-4 space-y-2 border-b pb-5">
          {files.map((file, index) => {
            return (
              <div
                key={`${file.name}-${file.lastModified}-${index}`}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <FilePreview file={file} />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="size-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
