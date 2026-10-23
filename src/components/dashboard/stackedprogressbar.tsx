import type { StackedProgressBarProps } from "@/types/dashboard";
import { useMemo } from "react";
import StackProgressSkeleton from "./stacked-progressbar-skeleton";
import { cn } from "cn";
import AnimatedNumber from "./resuable-components/animated-number";

export default function StackedProgressBar({
  title = "Assets by status",
  segments,
  isLoading,
}: StackedProgressBarProps) {
  const total = useMemo(
    () => segments.reduce((sum, segment) => sum + segment.count, 0),
    [segments],
  );

  if (segments.some((segment) => segment.count < 0)) {
    throw new Error("Segment counts cannot be negative.");
  }

  return (
    <section
      aria-labelledby="status-heading"
      className="flex flex-col gap-5 md:p-4.5 md:pt-6 lg:pt-7 lg:p-6 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm"
    >
      {isLoading ? (
        <StackProgressSkeleton title={title} />
      ) : (
        <>
          <div className="flex flex-wrap items-baseline justify-between gap-2 md:pb-1!">
            <h2
              id="status-heading"
              className="text-sm font-medium text-muted-foreground"
            >
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">
              <span className="text-[26px] font-semibold tracking-tight text-foreground tabular-nums md:text-3xl">
                <AnimatedNumber value={total} />
              </span>{" "}
              total
            </p>
          </div>
          <div
            role="img"
            aria-label={segments
              .map(
                (segment) =>
                  `${segment.label}: ${segment.count} (${total ? ((segment.count / total) * 100).toFixed(1) : "0"}%)`,
              )
              .join(", ")}
            className="flex h-2 w-full gap-0.5 overflow-hidden rounded-full bg-muted"
          >
            {segments.map((segment) => {
              const percentage = total ? (segment.count / total) * 100 : 0;

              return (
                <span
                  key={segment.label}
                  title={`${segment.label}: ${segment.count}`}
                  className={cn(
                    segment.color,
                    "h-full animate-[grow_700ms_ease-out_forwards]!",
                  )}
                  style={
                    {
                      "--target-width": `${percentage}%`,
                      width: `${percentage}%`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-2 ">
            {segments.map((segment) => {
              const percentage = total ? (segment.count / total) * 100 : 0;
              return (
                <div
                  key={segment.label}
                  className="-m-1 flex flex-col gap-1.5 rounded-md p-3"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span
                      className={`size-2 shrink-0 rounded-full ${segment.color}`}
                      aria-hidden="true"
                    />
                    {segment.label}
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-[22px] md:text-[24px] font-semibold tracking-tight tabular-nums">
                      <AnimatedNumber value={segment.count}/>
                    </span>
                    <span className="text-[13px] text-muted-foreground tabular-nums">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
