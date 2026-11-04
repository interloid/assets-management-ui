
import { Skeleton } from "@/components/ui/skeleton";

function ProfileHeaderSkeleton() {
  return (
    <header className="flex items-center gap-4">
      <Skeleton className="size-14 shrink-0 rounded-full" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Skeleton className="h-6 w-40 max-w-full" />
        <Skeleton className="h-4 w-56 max-w-full" />
      </div>
    </header>
  );
}

function AccountDetailsSkeleton() {
  return (
    <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="border-b px-5 py-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="mt-2 h-3.5 w-64 max-w-full" />
      </div>
      <dl className="m-0 px-5 py-1">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-[minmax(110px,180px)_minmax(0,1fr)] gap-x-4 gap-y-1 border-t py-3 first:border-t-0"
          >
            <Skeleton className="h-4 w-20 max-w-full" />
            <Skeleton className="h-4 w-full max-w-48" />
          </div>
        ))}
      </dl>
    </section>
  );
}

function ChangePasswordSkeleton() {
  return (
    <section className="overflow-hidden rounded-lg border bg-card shadow-sm">
      <div className="border-b px-5 py-4">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="mt-2 h-3.5 w-72 max-w-full" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-5 gap-y-4 p-5">
        <div className="col-span-full flex max-w-90 flex-col gap-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="col-span-full flex flex-wrap gap-x-5 gap-y-2">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="flex justify-end border-t bg-muted p-4">
        <Skeleton className="h-9 w-36 rounded-md" />
      </div>
    </section>
  );
}

function SessionsSkeleton() {
  return (
    <section className="flex flex-wrap items-center justify-between gap-3 rounded-lg border bg-card px-5 py-4 shadow-sm">
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-4 w-full max-w-sm" />
      </div>

      <Skeleton className="h-9 w-40 shrink-0 rounded-md" />
    </section>
  );
}

export function ProfilePageSkeleton() {
  return (
    <main className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <ProfileHeaderSkeleton />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,520px),1fr))] items-start gap-6">
        <div className="flex min-w-0 flex-col gap-6">
          <AccountDetailsSkeleton />
        </div>
        <div className="flex min-w-0 flex-col gap-6">
          <ChangePasswordSkeleton />
          <SessionsSkeleton />
        </div>
      </div>
    </main>
  );
}
