
type AssetTableSkeletonProps = {
  rows?: number;
};

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-md bg-muted ${className}`}
    />
  );
}

export default function AssetTableSkeleton({
  rows = 10,
}: AssetTableSkeletonProps) {
  return (
    <section
      aria-label="Loading asset list"
      aria-busy="true"
      className="overflow-hidden rounded-lg border border-border bg-card shadow-sm"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-55 border-collapse text-sm">
          <thead className="bg-muted text-left">
            <tr>
              {[
                "Asset",
                "Type",
                "Status",
                "Assigned to",
                "Purchased",
                "Warranty",
              ].map((heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-4 py-2.75 text-xs font-medium text-muted-foreground"
                >
                  {heading}
                </th>
              ))}
              <th scope="col" className="w-11">
                <span className="sr-only">Open</span>
              </th>
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: rows }, (_, index) => (
              <tr
                key={index}
                className="border-t border-border"
              >
                <td className="px-4 py-3">
                  <div className="flex flex-col gap-2">
                    <Skeleton className="h-3.5 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-4 rounded-sm" />
                    <Skeleton className="h-3.5 w-20" />
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <Skeleton className="h-5.5 w-16 rounded-sm" />
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-6 rounded-full" />
                    <Skeleton className="h-3.5 w-24" />
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <Skeleton className="h-3.5 w-20" />
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-3.5 w-20" />
                    <Skeleton className="h-3 w-14" />
                  </div>
                </td>
                <td className="py-2.5 pl-0 pr-3">
                  <Skeleton className="size-4" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3">
        <Skeleton className="h-4 w-36" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-8 w-14 rounded-md" />
          <Skeleton className="h-4 w-20" />

          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="size-8 rounded-md" />
        </div>
      </footer>
    </section>
  );
}
