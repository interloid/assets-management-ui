import type { AssetStatus } from "@/types/assets";
import { cn } from "cn";
import { statusTextStyles } from "../utils";
import { CopyButton } from "./copy-button";

export function DetailRow({
  label,
  value,
  mono = false,
  showCopy = false,
  status,
  isPage,
}: {
  label: string;
  value: string;
  mono?: boolean;
  showCopy?: boolean;
  status?: AssetStatus;
  isPage: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-[minmax(120px,180px)_minmax(0,1fr)] py-4 px-1 md:py-4  md:px-0 text-sm",
        isPage && "lg:py-4.25 xl:py-4",
      )}
    >
      <dt className="text-muted-foreground">{label}</dt>
      <div className="flex w-full items-center">
        <dd
          className={`min-w-0 wrap-break-words ml-5 relative top-1 ${
            mono ? "font-mono" : ""
          } ${status ? statusTextStyles[status] : "text-foreground"} ${isPage && "lg:ml-3.5"}`}
        >
          {value}
        </dd>
        {showCopy && <CopyButton value={value} className="relative top-1" />}
      </div>
    </div>
  );
}
