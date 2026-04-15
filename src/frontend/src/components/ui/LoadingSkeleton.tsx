import { cn } from "@/lib/utils";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className={cn("kpi-card animate-pulse", className)}>
      <div className="flex items-start justify-between mb-3">
        <div className="h-4 w-24 bg-muted rounded" />
        <div className="w-9 h-9 bg-muted rounded-lg" />
      </div>
      <div className="h-8 w-32 bg-muted rounded mt-1" />
      <div className="h-3 w-20 bg-muted rounded mt-2" />
    </div>
  );
}

const skeletonKeys4 = ["a", "b", "c", "d"];

export function SkeletonKPI({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {skeletonKeys4.slice(0, count).map((key) => (
        <SkeletonCard key={key} />
      ))}
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 p-3 animate-pulse">
      <div className="w-8 h-8 bg-muted rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3.5 w-36 bg-muted rounded" />
        <div className="h-3 w-24 bg-muted rounded" />
      </div>
      <div className="h-5 w-16 bg-muted rounded-full" />
    </div>
  );
}

const rowKeys = ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"];
const colKeys = ["c1", "c2", "c3", "c4", "c5", "c6"];

export function SkeletonTable({
  rows = 5,
  cols = 4,
}: { rows?: number; cols?: number }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden animate-pulse">
      <div className="flex gap-4 p-4 border-b border-border bg-muted/30">
        {colKeys.slice(0, cols).map((c) => (
          <div key={c} className="h-4 bg-muted rounded flex-1" />
        ))}
      </div>
      {rowKeys.slice(0, rows).map((r) => (
        <div
          key={r}
          className="flex gap-4 p-4 border-b border-border last:border-0"
        >
          {colKeys.slice(0, cols).map((c, j) => (
            <div
              key={c}
              className={cn(
                "h-4 bg-muted rounded flex-1",
                j === 0 && "w-1/3 flex-none",
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-48 bg-muted rounded animate-pulse" />
          <div className="h-4 w-64 bg-muted rounded animate-pulse mt-2" />
        </div>
        <div className="h-9 w-32 bg-muted rounded-lg animate-pulse" />
      </div>
      <SkeletonKPI />
      <SkeletonTable />
    </div>
  );
}
