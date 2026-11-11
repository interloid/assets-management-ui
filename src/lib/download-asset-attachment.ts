import { toast } from "sonner";

interface DownloadFileOptions {
  url: string;
  fileName: string;
}

export async function downloadFile({
  url,
  fileName,
}: DownloadFileOptions): Promise<void> {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      toast.error("Download failed");
    }

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error(error);
  }
}
