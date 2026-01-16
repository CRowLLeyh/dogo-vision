import { cn } from "@/lib/utils";

export function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Header */}
      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-muted" />
        <div className="flex-1">
          <div className="h-8 w-48 bg-muted rounded mb-2" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
      </div>

      {/* Rank Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="h-48 bg-muted rounded-xl" />
        <div className="h-48 bg-muted rounded-xl" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-muted rounded-xl" />
        ))}
      </div>

      {/* Matches */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-20 bg-muted rounded-xl" />
        ))}
      </div>
    </div>
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="glass-card p-4 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-muted" />
        <div className="flex-1">
          <div className="h-4 w-20 bg-muted rounded mb-2" />
          <div className="h-5 w-28 bg-muted rounded" />
        </div>
        <div className="h-10 w-24 bg-muted rounded" />
      </div>
    </div>
  );
}

export function ChampionCardSkeleton() {
  return (
    <div className="glass-card p-4 animate-pulse">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-14 h-14 rounded-xl bg-muted" />
        <div className="flex-1">
          <div className="h-5 w-24 bg-muted rounded mb-2" />
          <div className="h-3 w-16 bg-muted rounded" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-10 bg-muted rounded" />
        ))}
      </div>
      <div className="h-2 bg-muted rounded" />
    </div>
  );
}

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse bg-muted rounded", className)} />
  );
}
