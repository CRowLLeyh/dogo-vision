import { cn } from "@/lib/utils";

interface TierBadgeProps {
  tier: "S" | "A" | "B" | "C" | "D";
  className?: string;
}

const tierColors = {
  S: "bg-gradient-to-br from-primary to-gold-glow text-primary-foreground shadow-[0_0_15px_-3px_hsl(var(--gold))]",
  A: "bg-gradient-to-br from-success to-emerald-400 text-white",
  B: "bg-gradient-to-br from-accent to-cyan-400 text-primary-foreground",
  C: "bg-gradient-to-br from-muted-foreground to-gray-500 text-white",
  D: "bg-gradient-to-br from-destructive to-red-400 text-white",
};

export function TierBadge({ tier, className }: TierBadgeProps) {
  return (
    <span 
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold font-display text-sm",
        tierColors[tier],
        className
      )}
    >
      {tier}
    </span>
  );
}
