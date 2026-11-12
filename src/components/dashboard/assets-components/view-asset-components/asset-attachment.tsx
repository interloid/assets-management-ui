import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { calculateFileHash, formatDate, formatSize } from "@/lib/converters";
import { downloadFile } from "@/lib/download-asset-attachment";
import { deleteFile, generateUploadUrl } from "@/services/assets-services";
import type { Asset } from "@/types/assets";
import { cn } from "cn";
import {
  AlertCircle,
  CheckCircle2,
  CircleX,
  CloudUpload,
  Download,
  Eye,
  FileText,
  Info,
  Paperclip,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useRef, useState, type ChangeEvent } from "react";
import { toast } from "sonner";
import { FileDropzone } from "./file-drop-zone";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router";
import { fileSchema, MAX_FILES } from "@/schemas/asset";
import FilePreview from "../file-preview";

export interface PaginationMeta {
  items_on_page: number;
  page: number;
  records_per_page: number;
  total_items: number;
  total_pages: number;
}

export interface AssetAttachmentData {
  fileId: string;
  assetId: string;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  status: AttachmentStatus;
  uploadedAt: string;
  downloadUrl: string;
  expiresIn: number;
}

export interface AssetAttachmentResponse {
  success: boolean;
  message: string;
  statusCode: number;
  errors?: {
    field: string;
    message: string;
  }[];
  data: AssetAttachmentData[];
  pagination_meta: PaginationMeta;
}

export type AssetAttachmentProps = {
  isLoading: boolean;
  asset: Asset;
  files: AssetAttachmentData[];
  onFilesChanged: () => Promise<void>;
};

export type AttachmentStatus = "uploaded" | "deleted" | "failed" | "pending";

function FileTypeTile({
  mimeType,
  fileUrl,
}: {
  mimeType: string;
  fileUrl: string;
}) {
  const isPdf = mimeType === "application/pdf";
  const [isLoading, setIsLoading] = useState<boolean>(true);

  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg",
        isPdf
          ? "bg-destructive/10 text-destructive"
          : "bg-primary/15 text-primary",
      )}
      aria-hidden="true"
    >
      {isPdf ? (
        <div className="flex flex-col items-center leading-none">
          <FileText className="size-5" />
          <span className="mt-0.5 text-[9px] font-bold">PDF</span>
        </div>
      ) : (
        <>
          {isLoading && <Spinner />}
          <img
            src={fileUrl}
            alt=""
            className={cn(
              "size-full rounded-sm object-cover",
              isLoading && "hidden",
            )}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </>
      )}
    </div>
  );
}
function StatusBadge({ status }: { status: AttachmentStatus }) {
  const styles = {
    uploaded: {
      label: "Uploaded",
      icon: <CheckCircle2 className="size-3.5" />,
      className:
        "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    pending: {
      label: "Pending",
      icon: <Spinner className="size-3.5" />,
      className:
        "border-primary/30 bg-blue-500/10 text-primary/60 dark:text-priamry/40",
    },
    failed: {
      label: "Failed",
      icon: <AlertCircle className="size-3.5" />,
      className: "border-destructive/30 bg-destructive/10 text-destructive",
    },
    deleted: {
      label: "Deleted",
      icon: <CircleX className="size-3.5" />,
      className: "border-destructive/30 bg-destructive/10 text-destructive",
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
        styles.className,
      )}
    >
      {styles.icon}
      {styles.label}
    </span>
  );
}

export default function AssetAttachment({
  asset,
  files,
  isLoading,
  onFilesChanged,
}: AssetAttachmentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [deletingFileId, setDeletingFileId] = useState<string | null>(null);
  const activeFileCount = files.filter(
    (file) => file.status !== "deleted",
  ).length;
  const remainingFiles = Math.max(
    0,
    MAX_FILES - activeFileCount - selectedFiles.length,
  );

  const addFiles = useCallback((newFiles: File[]) => {
    setSelectedFiles((currentFiles) => [...currentFiles, ...newFiles]);
  }, []);

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, fileIndex) => fileIndex !== index),
    );
  };

  function handleFilesSelected(newFiles: File[]) {
    if (newFiles.length > remainingFiles) {
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

  function handleFileInputChange(event: ChangeEvent<HTMLInputElement>) {
    const chosenFiles = Array.from(event.currentTarget.files ?? []);
    event.currentTarget.value = "";
    if (isUploading) return;
    if (chosenFiles.length > remainingFiles) {
      toast.error(`You can upload a maximum of ${MAX_FILES} files per asset.`);
      return;
    }
    const validFiles = chosenFiles.filter((file) => {
      const result = fileSchema.safeParse(file);
      if (!result.success) {
        toast.error(result.error.issues[0]?.message ?? "Invalid file");
        return false;
      }
      return true;
    });
    void uploadSelectedFiles(validFiles);
  }

  async function handleDownload(attachment: AssetAttachmentData) {
    try {
      await downloadFile({
        url: attachment.downloadUrl,
        fileName: attachment.originalFileName,
      });
      toast.success("Download started");
    } catch (error) {
      console.error(error);
      toast.error("Download failed");
    }
  }

  async function uploadFiles(filesToUpload: File[]): Promise<File[]> {
    if (filesToUpload.length === 0 || isUploading) return filesToUpload;
    setIsUploading(true);
    setErrors([]);
    try {
      const payload = await Promise.all(
        filesToUpload.map(async (file) => ({
          filename: file.name,
          contentType: file.type,
          fileSize: file.size,
          checksumSha256: await calculateFileHash(file),
        })),
      );
      const presignResponse = await generateUploadUrl(asset.id, payload);
      if (!presignResponse.success) {
        setErrors([presignResponse.message]);
        toast.error(presignResponse.message || "Could not prepare uploads");
        return filesToUpload;
      }

      const uploads = presignResponse.data.files;
      if (uploads.length !== filesToUpload.length) {
        setErrors(["The server returned an unexpected number of upload URLs."]);
        toast.error("The server returned an unexpected number of upload URLs.");
        return filesToUpload;
      }

      const results = await Promise.all(
        filesToUpload.map(async (file, index) => {
          const upload = uploads[index];
          if (!upload) {
            toast.error(`No upload URL was returned for ${file.name}.`);
            return { file, success: false };
          }

          try {
            const s3Response = await fetch(upload.uploadUrl, {
              method: "PUT",
              credentials: "include",
              headers: upload.headers,
              body: file,
            });
            if (s3Response.ok) {
              toast.success(`${file.name} uploaded successfully`);
              return { file, success: true };
            }
            toast.error(`Upload failed for ${file.name}`);
            return { file, success: false };
          } catch (error) {
            console.error(error);
            return { file, success: false };
          }
        }),
      );

      const failedFiles = results
        .filter((result) => !result.success)
        .map((result) => result.file);
      if (results.some((result) => result.success)) {
        await onFilesChanged();
      }
      return failedFiles;
    } catch (error) {
      console.error(error);
      toast.error("Failed to prepare the selected files for upload.");
      return filesToUpload;
    } finally {
      setIsUploading(false);
    }
  }

  async function uploadSelectedFiles(filesToUpload: File[]) {
    await uploadFiles(filesToUpload);
  }

  async function handleUpload() {
    if (selectedFiles.length === 0 || isUploading) return;
    const failedFiles = await uploadFiles(selectedFiles);
    setSelectedFiles(failedFiles);
  }

  async function handleDelete(attachment: AssetAttachmentData) {
    if (!attachment.assetId || !attachment.fileId) return;
    setDeletingFileId(attachment.fileId);
    try {
      const response = await deleteFile(attachment.assetId, attachment.fileId);
      if (response.success) {
        toast.success("File deleted succesfully.");
        await onFilesChanged();
      } else {
        toast.error("Failed to delete file.");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setDeletingFileId(null);
    }
  }

  return (
    <section
      aria-labelledby="attachments-heading"
      className="rounded-lg border bg-card p-4 text-card-foreground sm:p-6"
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
        <Button
          type="button"
          onClick={handleUpload}
          disabled={selectedFiles.length === 0 || isUploading}
        >
          {isUploading ? <Spinner /> : <CloudUpload />}
          {isUploading ? "Uploading..." : `Upload (${selectedFiles.length})`}
        </Button>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        accept=".pdf,.png,.jpg,.jpeg,.webp"
        onChange={handleFileInputChange}
      />
      <div className="flex flex-col gap-4 w-full">
        <FileDropzone
          maxFiles={remainingFiles}
          disabled={isUploading}
          onFilesSelected={handleFilesSelected}
        />
        <div className="flex justify-end items-center gap-3">
          <span className="text-xs sm:text-sm text-warning border p-2 rounded-sm border-input shadow-xs flex gap-1 items-center">
            <AlertCircle className="size-3.5 sm:size-4" />
            Refresh to view the recently uploaded files.
          </span>
          <Button
            onClick={async () => await onFilesChanged()}
            className="flex w-fit h-9 items-center self-end bg-primary text-background justify-center gap-2 rounded-md border px-2 text-xs font-medium transition-colors hover:bg-primary/90 sm:px-3 sm:text-sm"
          >
            {isLoading ? (
              <>
                <Spinner /> Refreshing
              </>
            ) : (
              <>
                <RefreshCw />
                Refresh
              </>
            )}
          </Button>
        </div>
      </div>
      {errors.length > 0 && (
        <div
          role="alert"
          className="mt-3 flex items-start justify-between gap-2 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive"
        >
          <div className="flex min-w-0 items-start gap-2">
            <AlertCircle className="mt-0.5 size-4 shrink-0" />
            <ul className="space-y-0.5">
              {errors.map((message) => (
                <li key={message}>{message}</li>
              ))}
            </ul>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Dismiss upload error"
            onClick={() => setErrors([])}
            className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="size-4" />
          </Button>
        </div>
      )}
      {selectedFiles.length > 0 && (
        <div className="mt-4 space-y-2 border-b pb-5">
          {selectedFiles.map((file, index) => (
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
          ))}
        </div>
      )}
      {isLoading && (
        <div className="mt-5 space-y-3" aria-label="Loading attachments">
          {Array.from({ length: files.length }).map(() => (
            <div className="rounded-xl border bg-background/40 p-3">
              <div className="flex min-w-0 items-center gap-3">
                <Skeleton className="size-11 shrink-0 rounded-lg" />

                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-3 w-1/3" />
                </div>

                <Skeleton className="h-6 w-20 rounded-full" />
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 border-t pt-3 sm:flex sm:justify-end sm:border-t-0 sm:pt-0">
                <Skeleton className="h-9 w-full sm:w-20" />
                <Skeleton className="h-9 w-full sm:w-24" />
                <Skeleton className="h-9 w-full sm:w-20" />
              </div>
            </div>
          ))}
        </div>
      )}
      {!isLoading && files.length === 0 ? (
        <p className="mt-5 rounded-lg border border-dashed py-6 text-center text-sm text-muted-foreground">
          No attachments yet. Upload an invoice, warranty, or photo to get
          started.
        </p>
      ) : (
        !isLoading &&
        files.length > 0 && (
          <ul className="mt-5 space-y-3">
            {files.map((attachment) => {
              const isUploaded = attachment.status === "uploaded";
              const isDeleting = deletingFileId === attachment.fileId;
              return (
                <li
                  key={attachment.fileId}
                  className="rounded-xl border bg-background/40 p-3"
                >
                  <Link
                    to={attachment.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <FileTypeTile
                        mimeType={attachment.contentType}
                        fileUrl={attachment.downloadUrl}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="wrap-break-word text-xs sm:text-sm font-medium sm:truncate">
                          {attachment.originalFileName}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatSize(attachment.fileSize)}
                          {" • "}
                          {formatDate(attachment.uploadedAt)}
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <StatusBadge status={attachment.status} />
                      </div>
                    </div>
                  </Link>
                  <div className="mt-3 grid grid-cols-3 gap-2 border-t pt-3 sm:flex sm:justify-end sm:border-t-0 sm:pt-0">
                    {isUploaded ? (
                      <>
                        <Link
                          to={attachment.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border px-2 text-xs font-medium transition-colors hover:bg-muted sm:px-3 sm:text-sm"
                        >
                          <Eye className="size-3.5 sm:size-4" />
                          View
                        </Link>

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownload(attachment)}
                          className="inline-flex h-9 items-center justify-center gap-2 rounded-md border px-2 text-xs font-medium transition-colors hover:bg-muted sm:px-3 sm:text-sm"
                        >
                          <Download className="size-3.5 sm:size-4" />
                          Download
                        </Button>
                      </>
                    ) : (
                      <div className="col-span-2 flex items-center justify-center text-xs text-muted-foreground">
                        File not available
                      </div>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="gap-2 text-xs text-destructive hover:bg-destructive/10 hover:text-destructive inline-flex h-9 items-center justify-center rounded-md border px-2 font-medium transition-colors sm:px-3 sm:text-sm"
                      aria-label={`Delete ${attachment.originalFileName}`}
                      onClick={() => handleDelete(attachment)}
                    >
                      {isDeleting ? (
                        <Spinner className="size-3.5 sm:size-4" />
                      ) : (
                        <Trash2 className="size-3.5 sm:size-4" />
                      )}
                      {isDeleting ? "Deleting" : "Delete"}
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )
      )}
      <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
        <Info className="size-4 shrink-0 text-primary" aria-hidden="true" />
        <p>
          Files are securely stored in Amazon S3. Download links are available
          for a limited time.
        </p>
      </div>
    </section>
  );
}
