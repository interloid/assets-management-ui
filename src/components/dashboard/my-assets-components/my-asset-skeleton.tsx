interface AssignedAssetsSkeletonProps {
  count?: number;
}

export default function AssignedAssetsSkeleton({
  count = 2,
}: AssignedAssetsSkeletonProps) {
  return (
    <section
      className="overflow-hidden h-full border bg-card shadow-sm"
      aria-label="Loading assigned assets"
      aria-busy="true"
    >
      <div className="p-3.75 pt-4 md:px-5.5 md:pt-6 lg:px-5.5 lg:pt-6 xl:px-8 xl:pt-8 h-full flex flex-col gap-7">
        <header className="flex flex-col gap-5">
          <h1 className="text-[22px] font-semibold tracking-tight md:text-2xl">
            My assets
          </h1>
          <div
            aria-hidden="true"
            className="h-4 w-72 max-w-full animate-pulse rounded-md bg-muted"
          />
        </header>
        <div
          className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-4"
          aria-label="Loading assigned assets"
          aria-busy="true"
        >
          {Array.from({ length: count }).map((_, index) => (
            <AssetCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AssetCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="flex items-start gap-3 p-4">
        <div className="size-10 shrink-0 animate-pulse rounded-md bg-muted" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 border-t px-4 py-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex min-w-0 flex-col gap-2">
            <div className="h-3 w-12 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 max-w-full animate-pulse rounded bg-muted" />
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 border-t px-4 py-3">
        <div className="size-3.5 shrink-0 animate-pulse rounded-full bg-muted" />
        <div className="h-3.5 w-40 max-w-full animate-pulse rounded bg-muted" />
      </div>
    </div>
  );
}
