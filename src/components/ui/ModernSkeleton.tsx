import { cn } from "@/lib/utils";

interface ModernSkeletonProps {
  className?: string;
}

export function ModernSkeleton({ className }: ModernSkeletonProps) {
  return (
    <div className={cn("skeleton-shimmer", className)} />
  );
}

// Profile page skeleton
export function ProfileSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-6">
        <ModernSkeleton className="w-28 h-28 rounded-2xl" />
        <div className="flex-1 space-y-3">
          <ModernSkeleton className="h-10 w-64 rounded-xl" />
          <ModernSkeleton className="h-5 w-40 rounded-lg" />
        </div>
        <ModernSkeleton className="h-12 w-32 rounded-xl" />
      </div>

      {/* Rank Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernSkeleton className="h-56 rounded-3xl" />
        <ModernSkeleton className="h-56 rounded-3xl" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <ModernSkeleton key={i} className="h-28 rounded-2xl" />
        ))}
      </div>

      {/* Champions */}
      <div>
        <ModernSkeleton className="h-8 w-56 rounded-lg mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <ModernSkeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      </div>

      {/* Matches */}
      <div>
        <ModernSkeleton className="h-8 w-48 rounded-lg mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <ModernSkeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

// Match card skeleton
export function MatchCardSkeleton() {
  return (
    <div className="glass-card p-5 rounded-2xl">
      <div className="flex items-center gap-4">
        <ModernSkeleton className="w-16 h-16 rounded-xl" />
        <div className="flex-1 space-y-2">
          <ModernSkeleton className="h-4 w-24 rounded" />
          <ModernSkeleton className="h-6 w-32 rounded" />
        </div>
        <ModernSkeleton className="h-12 w-28 rounded-xl" />
      </div>
    </div>
  );
}

// Champion card skeleton
export function ChampionCardSkeleton() {
  return (
    <div className="glass-card p-5 rounded-2xl space-y-4">
      <div className="flex items-center gap-3">
        <ModernSkeleton className="w-16 h-16 rounded-xl" />
        <div className="flex-1 space-y-2">
          <ModernSkeleton className="h-5 w-28 rounded" />
          <ModernSkeleton className="h-4 w-20 rounded" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <ModernSkeleton key={i} className="h-14 rounded-lg" />
        ))}
      </div>
      <ModernSkeleton className="h-2 rounded-full" />
    </div>
  );
}

// Tier list skeleton
export function TierListSkeleton() {
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-4">
        <ModernSkeleton className="h-12 flex-1 rounded-xl" />
        <div className="flex gap-2">
          {[...Array(6)].map((_, i) => (
            <ModernSkeleton key={i} className="h-12 w-16 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, i) => (
          <ModernSkeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

// Match detail skeleton
export function MatchDetailSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <ModernSkeleton className="h-40 rounded-3xl" />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <ModernSkeleton key={i} className="h-24 rounded-2xl" />
        ))}
      </div>

      {/* Damage Chart */}
      <ModernSkeleton className="h-80 rounded-3xl" />

      {/* Timeline */}
      <ModernSkeleton className="h-64 rounded-3xl" />

      {/* Teams */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ModernSkeleton className="h-96 rounded-3xl" />
        <ModernSkeleton className="h-96 rounded-3xl" />
      </div>
    </div>
  );
}
