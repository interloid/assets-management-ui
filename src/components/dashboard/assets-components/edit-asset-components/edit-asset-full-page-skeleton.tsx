import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";

export default function EditAssetFullPageSkeleton() {
  return (
    <section className="mx-auto max-w-480 flex w-full flex-col gap-6 p-4 md:p-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="flex items-center gap-1 hover:text-foreground transition-colors">
          <ArrowLeft className="size-4" />
        </span>
        <Skeleton className="h-4 w-24" />
      </div>
      <header className="flex flex-col gap-1">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-80 max-w-full" />
      </header>
      <div className="overflow-hidden rounded-lg border shadow-md">
        <div className="2xl:flex 2xl:flex-row">
          <div className="2xl:w-1/2">
            <div className="flex flex-col gap-3 border-b p-5 2xl:border-r">
              <Skeleton className="h-4 w-12" />
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,130px),1fr))] gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex min-h-20 flex-col items-start gap-2.5 rounded-md border p-3"
                  >
                    <Skeleton className="size-5 rounded-md" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-4 p-5 2xl:grid-cols-2 2xl:border-r">
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-full" />
                <Skeleton className="h-3 w-40" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="flex flex-col gap-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="col-span-full flex flex-col gap-1.5">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t p-5 2xl:w-1/2 2xl:border-t-0">
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="h-3 w-64 max-w-full" />
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 rounded-md border p-3"
                >
                  <div className="flex w-full items-center gap-2">
                    <Skeleton className="size-2 rounded-full" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-3 w-28" />
                </div>
              ))}
            </div>

            <div className="flex w-full flex-col gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap-reverse justify-end gap-2 border-t bg-muted px-5 py-4">
          <Skeleton className="h-9 w-20 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
        </div>
      </div>
    </section>
  );
}
