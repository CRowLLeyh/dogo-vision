import { ChampionMeta, TIER_COLORS } from "@/lib/championSelectMockData";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TierListProps {
  champions: ChampionMeta[];
  selectedChampion: ChampionMeta | null;
  onSelectChampion: (champion: ChampionMeta) => void;
}

export function TierList({ champions, selectedChampion, onSelectChampion }: TierListProps) {
  // Group champions by tier
  const tiers = ["S+", "S", "A", "B", "C", "D"];
  const groupedByTier = tiers.reduce((acc, tier) => {
    acc[tier] = champions.filter((c) => c.tier === tier);
    return acc;
  }, {} as Record<string, ChampionMeta[]>);

  return (
    <div className="space-y-3">
      {tiers.map((tier) => {
        const tierChampions = groupedByTier[tier];
        if (tierChampions.length === 0) return null;

        return (
          <motion.div
            key={tier}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-3"
          >
            {/* Tier Badge */}
            <div
              className={cn(
                "w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg text-white shrink-0",
                `bg-gradient-to-br ${TIER_COLORS[tier]}`
              )}
            >
              {tier}
            </div>

            {/* Champions */}
            <div className="flex flex-wrap gap-2">
              {tierChampions.map((champion) => (
                <motion.button
                  key={champion.id}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelectChampion(champion)}
                  className={cn(
                    "relative group",
                    selectedChampion?.id === champion.id && "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-lg"
                  )}
                >
                  <img
                    src={champion.icon}
                    alt={champion.name}
                    className="w-12 h-12 rounded-lg border border-border/50 group-hover:border-primary transition-colors"
                  />
                  {/* Winrate tooltip */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className={cn(
                      "text-xs font-medium px-1.5 py-0.5 rounded",
                      champion.winRate >= 52 ? "bg-emerald-500/20 text-emerald-400" :
                      champion.winRate >= 50 ? "bg-blue-500/20 text-blue-400" :
                      "bg-red-500/20 text-red-400"
                    )}>
                      {champion.winRate}%
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
