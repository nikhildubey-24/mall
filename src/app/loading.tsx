import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading..."
      className="min-h-screen bg-surface-darker"
    >
      <div className="h-16 w-full" />
      <div className="mx-auto max-w-7xl mt-8 px-6">
        <Skeleton className="h-48 w-full rounded-3xl" />
        <div className="mt-8 space-y-4">
          <Skeleton className="h-28 w-full rounded-2xl" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-32 rounded-2xl" />
            <Skeleton className="h-32 rounded-2xl" />
          </div>
        </div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
