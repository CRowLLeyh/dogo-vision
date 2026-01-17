import { ChampionMeta } from "@/lib/championSelectMockData";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TierBadge } from "./TierBadge";

interface TierListProps {
  champions: ChampionMeta[];
  selectedChampion: ChampionMeta | null;
  onSelectChampion: (champion: ChampionMeta) => void;
}

export function TierList({ champions, selectedChampion, onSelectChampion }: TierListProps) {
  // Group champions by tier
  const tiers = ["S+", "S", "A", "B", "C", "D"] as const;
  const groupedByTier = tiers.reduce((acc, tier) => {
    acc[tier] = champions.filter((c) => c.tier === tier);
    return acc;
  }, {} as Record<string, ChampionMeta[]>);

  return (
    <div className="space-y-4">
      {tiers.map((tier, tierIndex) => {
        const tierChampions = groupedByTier[tier];
        if (tierChampions.length === 0) return null;

        return (
          <motion.div
            key={tier}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: tierIndex * 0.05 }}
            className="flex items-start gap-3"
          >
            {/* Tier Badge - using new component */}
            <TierBadge tier={tier} size="md" className="shrink-0" />

            {/* Champions */}
            <div className="flex flex-wrap gap-2">
              {tierChampions.map((champion) => (
                <motion.button
                  key={champion.id}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectChampion(champion)}
                  className={cn(
                    "relative group z-0 rounded-lg transition-all",
                    selectedChampion?.id === champion.id && "ring-2 ring-primary ring-offset-2 ring-offset-background"
                  )}
                >
                  {/* Selection glow */}
                  {selectedChampion?.id === champion.id && (
                    <motion.div
                      layoutId="champion-selection"
                      className="absolute inset-0 bg-primary/20 rounded-lg -z-10"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <img
                    src={champion.icon}
                    alt={champion.name}
                    className="w-12 h-12 rounded-lg border border-border/50 group-hover:border-primary transition-all group-hover:shadow-lg group-hover:shadow-primary/20 bg-muted"
                    loading="lazy"
                  />
                  {/* Winrate tooltip */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    <span className={cn(
                      "text-xs font-semibold px-2 py-1 rounded-md whitespace-nowrap",
                      "bg-popover border border-border shadow-xl",
                      champion.winRate >= 52 ? "text-emerald-400" :
                      champion.winRate >= 50 ? "text-blue-400" :
                      "text-red-400"
                    )}>
                      {champion.winRate}% WR
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
