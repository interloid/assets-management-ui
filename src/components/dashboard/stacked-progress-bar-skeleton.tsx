export default function StackedProgressBarSkeleton() {
  return (
    <div className="space-y-5 border p-6 rounded-lg" aria-busy="true">
      <div className="flex flex-wrap items-baseline justify-between gap-2 md:pb-1">
        <h2
          id="status-heading"
          className="text-sm font-medium text-muted-foreground"
        >
          Assets by Status
        </h2>

        <div className="flex items-baseline gap-2" aria-hidden="true">
          <div className="h-8 w-12 animate-pulse rounded bg-muted" />
          <div className="h-4 w-8 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div
        className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-muted"
        aria-hidden="true"
      >
        <div className="h-full w-1/4 animate-pulse rounded-full bg-muted-foreground/20" />
        <div className="h-full w-1/4 animate-pulse rounded-full bg-muted-foreground/15" />
        <div className="h-full w-1/4 animate-pulse rounded-full bg-muted-foreground/20" />
        <div className="h-full w-1/4 animate-pulse rounded-full bg-muted-foreground/15" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="-m-1 flex flex-col gap-1.5 rounded-md p-3"
            aria-hidden="true"
          >
            <div className="flex items-center gap-2">
              <div className="size-2 shrink-0 animate-pulse rounded-full bg-muted-foreground/25" />
              <div
                className={`h-3.5 animate-pulse rounded bg-muted ${index % 2 === 0 ? "w-20" : "w-16"}`}
              />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="h-6 w-10 animate-pulse rounded bg-muted" />
              <div className="h-3.5 w-8 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
