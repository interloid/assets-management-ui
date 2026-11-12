import { useCallback } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { MAX_FILES } from "@/schemas/asset";

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  maxFiles?: number;
  disabled?: boolean;
}

export function FileDropzone({
  onFilesSelected,
  maxFiles = MAX_FILES,
  disabled = false,
}: FileDropzoneProps) {
  const isDisabled = disabled || maxFiles <= 0;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
    [onFilesSelected],
  );

  const onDropRejected = useCallback((rejections: FileRejection[]) => {
    for (const { file, errors } of rejections) {
      for (const error of errors) {
        toast.error(`${file.name}: ${error.message}`);
      }
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    onDropRejected,
    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: true,
    maxFiles,
    disabled: isDisabled,
  });
  const prompt = maxFiles <= 0
    ? `Maximum of ${MAX_FILES} files reached`
    : disabled
      ? "Uploads are in progress"
      : isDragActive
        ? "Drop your files here"
        : "Drag and drop files here or click to ";

  return (
    <div
      {...getRootProps({
        role: "button",
        tabIndex: 0,
        "aria-label": "Upload files. Drag and drop or press Enter to browse.",
      })}
      className={cn(
        "mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        isDisabled
          ? "cursor-not-allowed border-border bg-muted/40 opacity-60"
          : isDragReject
            ? "border-destructive bg-destructive/10"
            : isDragAccept
              ? "border-primary bg-primary/10"
              : isDragActive
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/60 hover:bg-muted/40",
      )}
    >
      <input {...getInputProps()} type="file" />
      <CloudUpload
        className={cn(
          "size-9",
          isDisabled ? "text-muted-foreground" : "text-primary",
        )}
        aria-hidden="true"
      />
      <p className="font-medium">
        {prompt}
        {!isDisabled && !isDragActive && (
          <span className="text-primary">browse</span>
        )}
      </p>
      <p className="text-xs text-muted-foreground">
        Supported: PDF, JPG, PNG, WEBP • Max size: 5 MB • Max {MAX_FILES} files
      </p>
    </div>
  );
}
