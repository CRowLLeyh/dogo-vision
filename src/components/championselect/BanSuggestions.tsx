import { motion } from "framer-motion";
import { ChampionMeta } from "@/lib/championSelectMockData";
import { cn } from "@/lib/utils";
import { Ban } from "lucide-react";

interface BanSuggestionsProps {
  champions: ChampionMeta[];
  selectedRole: string;
  onSelectChampion: (champion: ChampionMeta) => void;
}

export function BanSuggestions({ champions, selectedRole, onSelectChampion }: BanSuggestionsProps) {
  // Get top 5 champions by ban rate for the role
  const topBans = [...champions]
    .sort((a, b) => b.banRate - a.banRate)
    .slice(0, 5);

  if (topBans.length === 0) return null;

  return (
    <div className="p-4 bg-card border border-border rounded-xl">
      <h3 className="font-semibold text-sm text-orange-400 mb-3 flex items-center gap-2">
        <Ban className="w-4 h-4" />
        Bans Populares
        <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full ml-auto capitalize">
          {selectedRole}
        </span>
      </h3>
      
      <div className="flex items-center gap-2">
        {topBans.map((champion, index) => (
          <motion.button
            key={champion.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectChampion(champion)}
            className="group relative"
          >
            <div className="relative">
              <img
                src={champion.icon}
                alt={champion.name}
                className={cn(
                  "w-11 h-11 rounded-lg border-2 transition-all bg-muted",
                  index === 0 
                    ? "border-orange-500/70 shadow-lg shadow-orange-500/20" 
                    : "border-orange-500/30 group-hover:border-orange-500/60"
                )}
              />
              {/* Ban rate badge */}
              <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-orange-500 rounded-full">
                <span className="text-[9px] font-bold text-white">
                  {champion.banRate.toFixed(0)}%
                </span>
              </div>
              {/* Rank indicator for top ban */}
              {index === 0 && (
                <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-[9px] font-bold text-white">1</span>
                </div>
              )}
            </div>
            
            {/* Tooltip */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              <span className="text-[10px] font-medium px-2 py-1 rounded-md whitespace-nowrap bg-popover border border-border shadow-xl">
                {champion.name}
              </span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
