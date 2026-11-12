import { useEffect, useState } from "react";

export default function FilePreview({ file }: { file: File }) {
  const [previewUrl] = useState(() => URL.createObjectURL(file));
  useEffect(() => {
    const url = URL.createObjectURL(file);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <a
      href={previewUrl ?? undefined}
      target="_blank"
      rel="noopener noreferrer"
      className="min-w-0 flex gap-3"
      aria-label={`Preview ${file.name} in a new tab`}
    >
      <div className="size-11 shrink-0 overflow-hidden rounded-sm bg-muted">
        {previewUrl && (
          <img
            src={previewUrl}
            alt={`Preview of ${file.name}`}
            className="size-full object-cover"
          />
        )}
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{file.name}</p>
        <p className="text-xs text-muted-foreground">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </p>
      </div>
    </a>
  );
}
