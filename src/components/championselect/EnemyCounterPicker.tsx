import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChampionMeta, mockChampionsMeta } from "@/lib/championSelectMockData";
import { cn } from "@/lib/utils";
import { X, Target, Shield, Users, Search, Swords } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TierBadge } from "./TierBadge";

interface EnemyCounterPickerProps {
  selectedRole: string;
  champions: ChampionMeta[];
  onSelectChampion: (champion: ChampionMeta) => void;
}

interface EnemySlot {
  role: string;
  champion: ChampionMeta | null;
}

const ENEMY_ROLES = [
  { id: "top", label: "Top" },
  { id: "jungle", label: "Jungle" },
  { id: "mid", label: "Mid" },
  { id: "adc", label: "ADC" },
  { id: "support", label: "Suporte" },
];

export function EnemyCounterPicker({ selectedRole, champions, onSelectChampion }: EnemyCounterPickerProps) {
  const [enemyTeam, setEnemyTeam] = useState<EnemySlot[]>(
    ENEMY_ROLES.map((r) => ({ role: r.id, champion: null }))
  );
  const [activeSlot, setActiveSlot] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectEnemy = (champion: ChampionMeta) => {
    if (!activeSlot) return;
    setEnemyTeam((prev) =>
      prev.map((slot) =>
        slot.role === activeSlot ? { ...slot, champion } : slot
      )
    );
    setActiveSlot(null);
    setSearchQuery("");
  };

  const handleRemoveEnemy = (role: string) => {
    setEnemyTeam((prev) =>
      prev.map((slot) =>
        slot.role === role ? { ...slot, champion: null } : slot
      )
    );
  };

  const enemyChampions = enemyTeam
    .map((s) => s.champion)
    .filter(Boolean) as ChampionMeta[];

  // Calculate suggestions based on enemy team
  const getSuggestions = () => {
    if (enemyChampions.length === 0) return [];

    const enemyNames = enemyChampions.map((c) => c.name);

    // Score champions based on how well they counter the enemy team
    const scored = champions.map((champ) => {
      let score = 0;
      let reasons: string[] = [];

      // Check if this champion counters any enemy
      enemyChampions.forEach((enemy) => {
        if (enemy.counters.includes(champ.name)) {
          score += 15; // Enemy is countered by this champ
          reasons.push(`Countera ${enemy.name}`);
        }
        if (champ.counters.includes(enemy.name)) {
          score -= 10; // This champ is countered by enemy
        }
      });

      // Tier bonus
      if (champ.tier === "S+") score += 10;
      else if (champ.tier === "S") score += 7;
      else if (champ.tier === "A") score += 4;

      // Winrate bonus
      if (champ.winRate >= 52) score += 5;
      else if (champ.winRate >= 50) score += 2;

      return { champion: champ, score, reasons };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  };

  const suggestions = getSuggestions();

  // Filter all champions for picker
  const filteredChamps = searchQuery
    ? mockChampionsMeta.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockChampionsMeta.slice(0, 20);

  return (
    <div className="space-y-4">
      {/* Enemy Team Slots */}
      <div className="p-4 bg-card border border-border rounded-xl">
        <h3 className="font-semibold text-sm text-red-400 mb-3 flex items-center gap-2">
          <Swords className="w-4 h-4" />
          Time Inimigo
        </h3>
        <div className="flex items-center gap-2">
          {enemyTeam.map((slot) => {
            const roleInfo = ENEMY_ROLES.find((r) => r.id === slot.role);
            return (
              <div key={slot.role} className="relative group">
                <button
                  onClick={() => setActiveSlot(slot.role)}
                  className={cn(
                    "w-12 h-12 rounded-lg border-2 border-dashed flex items-center justify-center transition-all",
                    slot.champion
                      ? "border-red-500/50 p-0"
                      : "border-border hover:border-red-500/50 bg-muted/30",
                    activeSlot === slot.role && "ring-2 ring-red-500"
                  )}
                >
                  {slot.champion ? (
                    <img
                      src={slot.champion.icon}
                      alt={slot.champion.name}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {roleInfo?.label.charAt(0)}
                    </span>
                  )}
                </button>
                {slot.champion && (
                  <button
                    onClick={() => handleRemoveEnemy(slot.role)}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                )}
                <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground">
                  {roleInfo?.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Champion Picker Dropdown */}
        <AnimatePresence>
          {activeSlot && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-4 border-t border-border"
            >
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar campeão inimigo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9"
                  autoFocus
                />
              </div>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {filteredChamps.map((champ) => (
                  <button
                    key={champ.id}
                    onClick={() => handleSelectEnemy(champ)}
                    className="w-10 h-10 rounded-lg border border-border hover:border-red-500/50 transition-colors overflow-hidden"
                  >
                    <img
                      src={champ.icon}
                      alt={champ.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestions Based on Enemy Team */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl"
        >
          <h3 className="font-semibold text-sm text-emerald-400 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Bom Contra o Time Inimigo
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {suggestions.map(({ champion, score, reasons }) => (
              <motion.button
                key={champion.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectChampion(champion)}
                className="relative p-2 bg-card/80 border border-border rounded-lg hover:border-emerald-500/50 transition-colors text-left"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={champion.icon}
                    alt={champion.name}
                    className="w-10 h-10 rounded-lg border border-border/50"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{champion.name}</p>
                    <p className="text-xs text-emerald-400">{champion.winRate}% WR</p>
                  </div>
                  <TierBadge tier={champion.tier as "S+" | "S" | "A" | "B" | "C" | "D"} size="sm" />
                </div>
                {reasons.length > 0 && (
                  <p className="mt-1 text-[10px] text-muted-foreground truncate">
                    {reasons[0]}
                  </p>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Synergies info */}
      {enemyChampions.length === 0 && (
        <div className="p-4 bg-muted/30 border border-border rounded-xl text-center">
          <Users className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Selecione campeões inimigos para ver sugestões de counter picks
          </p>
        </div>
      )}
    </div>
  );
}
