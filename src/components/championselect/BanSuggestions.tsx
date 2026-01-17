import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChampionMeta } from "@/lib/championSelectMockData";
import { cn } from "@/lib/utils";
import { Ban, X } from "lucide-react";

interface BanSuggestionsProps {
  champions: ChampionMeta[];
  selectedRole: string;
  onSelectChampion: (champion: ChampionMeta) => void;
}

export function BanSuggestions({ champions, selectedRole }: BanSuggestionsProps) {
  const [bannedChampions, setBannedChampions] = useState<ChampionMeta[]>([]);

  // Get top 5 champions by ban rate for the role
  const topBans = [...champions]
    .sort((a, b) => b.banRate - a.banRate)
    .slice(0, 5);

  const handleBanChampion = (champion: ChampionMeta) => {
    if (bannedChampions.find(c => c.id === champion.id)) {
      // Already banned, remove from bans
      setBannedChampions(prev => prev.filter(c => c.id !== champion.id));
    } else if (bannedChampions.length < 5) {
      // Add to bans (max 5)
      setBannedChampions(prev => [...prev, champion]);
    }
  };

  const handleRemoveBan = (championId: string) => {
    setBannedChampions(prev => prev.filter(c => c.id !== championId));
  };

  const isBanned = (championId: string) => bannedChampions.some(c => c.id === championId);

  if (topBans.length === 0) return null;

  return (
    <div className="p-4 bg-card border border-border rounded-xl space-y-4">
      {/* Popular Bans Section */}
      <div>
        <h3 className="font-semibold text-sm text-orange-400 mb-3 flex items-center gap-2">
          <Ban className="w-4 h-4" />
          Bans Populares
          <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full ml-auto capitalize">
            {selectedRole}
          </span>
        </h3>
        
        <div className="flex items-center gap-2">
          {topBans.map((champion, index) => {
            const banned = isBanned(champion.id);
            return (
              <motion.button
                key={champion.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: banned ? 1 : 1.1, y: banned ? 0 : -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBanChampion(champion)}
                className="group relative"
                title={banned ? `Remover ban de ${champion.name}` : `Banir ${champion.name}`}
              >
                <div className="relative">
                  <img
                    src={champion.icon}
                    alt={champion.name}
                    className={cn(
                      "w-11 h-11 rounded-lg border-2 transition-all bg-muted",
                      banned
                        ? "border-red-600 grayscale brightness-50"
                        : index === 0 
                          ? "border-orange-500/70 shadow-lg shadow-orange-500/20" 
                          : "border-orange-500/30 group-hover:border-orange-500/60"
                    )}
                  />
                  
                  {/* Banned overlay */}
                  {banned && (
                    <motion.div 
                      initial={{ opacity: 0, rotate: -45 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <Ban className="w-6 h-6 text-red-500" />
                    </motion.div>
                  )}
                  
                  {/* Ban rate badge - hidden when banned */}
                  {!banned && (
                    <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-orange-500 rounded-full">
                      <span className="text-[9px] font-bold text-white">
                        {champion.banRate.toFixed(0)}%
                      </span>
                    </div>
                  )}
                  
                  {/* Rank indicator for top ban - hidden when banned */}
                  {index === 0 && !banned && (
                    <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-[9px] font-bold text-white">1</span>
                    </div>
                  )}
                </div>
                
                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <span className="text-[10px] font-medium px-2 py-1 rounded-md whitespace-nowrap bg-popover border border-border shadow-xl">
                    {banned ? "Clique para remover" : champion.name}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Bans Section */}
      <AnimatePresence>
        {bannedChampions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-3 border-t border-border"
          >
            <h4 className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
              <span>Seus Bans</span>
              <span className="text-red-400">({bannedChampions.length}/5)</span>
            </h4>
            <div className="flex items-center gap-2 flex-wrap">
              {bannedChampions.map((champion) => (
                <motion.div
                  key={champion.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="group relative"
                >
                  <div className="relative">
                    <img
                      src={champion.icon}
                      alt={champion.name}
                      className="w-9 h-9 rounded-lg border-2 border-red-500/50 grayscale brightness-75 bg-muted"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Ban className="w-4 h-4 text-red-500/80" />
                    </div>
                    <button
                      onClick={() => handleRemoveBan(champion.id)}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label={`Remover ban de ${champion.name}`}
                    >
                      <X className="w-2.5 h-2.5 text-white" />
                    </button>
                  </div>
                </motion.div>
              ))}
              
              {/* Empty slots */}
              {Array.from({ length: 5 - bannedChampions.length }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="w-9 h-9 rounded-lg border-2 border-dashed border-red-500/20 flex items-center justify-center"
                >
                  <Ban className="w-3 h-3 text-red-500/30" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
