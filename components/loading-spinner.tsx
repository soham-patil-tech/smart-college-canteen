export function LoadingSpinner() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">Loading menu...</p>
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="flex animate-pulse flex-col gap-3 rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between">
        <div className="h-10 w-10 rounded-lg bg-primary/10" />
        <div className="h-5 w-20 rounded-full bg-muted" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded bg-muted" />
        <div className="h-3 w-full rounded bg-muted" />
      </div>
      <div className="flex items-center justify-between">
        <div className="h-5 w-12 rounded bg-primary/10" />
        <div className="h-5 w-16 rounded bg-muted" />
      </div>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
