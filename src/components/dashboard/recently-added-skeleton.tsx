export default function RecentlyAddedSkeleton() {
  return (
    <section className="animate-pulse overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex flex-col gap-1.5">
          <div className="h-5 w-32 rounded bg-muted" />
          <div className="h-4 w-48 rounded bg-muted" />
        </div>

        <div className="h-4 w-14 shrink-0 rounded bg-muted" />
      </div>
      <ul className="m-0 list-none p-0">
        {Array.from({ length: 5 }).map((_, index) => (
          <li
            key={index}
            className="flex min-h-14 items-center gap-3 border-t border-border px-5 py-3 first:border-t-0"
          >
            <div className="size-4 shrink-0 rounded bg-muted" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-4 w-28 max-w-full rounded bg-muted" />
            </div>
            <div className="flex h-5.5 shrink-0 items-center gap-1.5 rounded-sm px-2">
              <div className="size-1.5 rounded-full bg-muted-foreground/20" />
              <div className="h-3 w-14 rounded bg-muted" />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
