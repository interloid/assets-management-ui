import { useCallback } from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { CloudUpload } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
}

export function FileDropzone({ onFilesSelected }: FileDropzoneProps) {
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
  });

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
        isDragReject
          ? "border-destructive bg-destructive/10"
          : isDragAccept
            ? "border-primary bg-primary/10"
            : isDragActive
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/60 hover:bg-muted/40",
      )}
    >
      <input {...getInputProps()} type="file" />
      <CloudUpload className="size-9 text-primary" aria-hidden="true" />
      <p className="font-medium">
        {isDragActive
          ? "Drop your files here"
          : "Drag and drop files here or click to "}
        {!isDragActive && <span className="text-primary">browse</span>}
      </p>
      <p className="text-xs text-muted-foreground">
        Supported: PDF, JPG, PNG, WEBP • Max size: 5 MB
      </p>
    </div>
  );
}
