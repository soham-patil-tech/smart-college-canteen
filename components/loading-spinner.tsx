export function LoadingSpinner() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-muted border-t-primary" />
      </div>
      <p className="text-sm text-muted-foreground">Loading menu...</p>
    </div>
  )
}
