export function WarrantyExpiringSkeleton() {
  return (
    <section className="animate-pulse overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-4">
        <div className="flex flex-col gap-2">
          <div className="h-5 w-36 rounded bg-muted" />
          <div className="h-4 w-44 rounded bg-muted" />
        </div>
        <div className="h-4 w-14 shrink-0 rounded bg-muted" />
      </div>
      <ul className="m-0 list-none p-0">
        {Array.from({ length: 4 }).map((_, index) => (
          <li
            key={index}
            className="flex min-h-14 items-center gap-3 border-t border-border px-5 py-3 first:border-t-0"
          >
            <div className="size-4 shrink-0 rounded bg-muted" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="h-4 w-24 rounded bg-muted" />
              <div className="h-3 w-16 rounded bg-muted" />
            </div>
            <div className="h-4 w-28 shrink-0 rounded bg-muted" />
          </li>
        ))}
      </ul>
    </section>
  );
}
