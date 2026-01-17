import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChampionMeta, mockChampionsMeta } from "@/lib/championSelectMockData";
import { cn } from "@/lib/utils";
import { X, Users, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TierBadge } from "./TierBadge";
import { ChampionSlotTooltip } from "./ChampionSlotTooltip";

interface EnemyCounterPickerProps {
  selectedRole: string;
  champions: ChampionMeta[];
  onSelectChampion: (champion: ChampionMeta) => void;
}

interface TeamSlot {
  role: string;
  champion: ChampionMeta | null;
}

const ROLES = [
  { id: "top", label: "Top" },
  { id: "jungle", label: "Jungle" },
  { id: "mid", label: "Mid" },
  { id: "adc", label: "ADC" },
  { id: "support", label: "Suporte" },
];

// Custom SVG Icons
const SwordsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 17.5L3 6V3h3l11.5 11.5" />
    <path d="M13 19l6-6" />
    <path d="M16 16l4 4" />
    <path d="M19 21l2-2" />
    <path d="M9.5 6.5L21 18v3h-3L6.5 9.5" />
    <path d="M11 5L5 11" />
    <path d="M8 8L4 4" />
    <path d="M5 3L3 5" />
  </svg>
);

const ShieldIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const TargetIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L13.09 8.26L22 9.27L15.45 13.97L18.18 21.02L12 17.27L5.82 21.02L8.55 13.97L2 9.27L10.91 8.26L12 2Z" />
  </svg>
);

export function EnemyCounterPicker({ selectedRole, champions, onSelectChampion }: EnemyCounterPickerProps) {
  const [enemyTeam, setEnemyTeam] = useState<TeamSlot[]>(
    ROLES.map((r) => ({ role: r.id, champion: null }))
  );
  const [allyTeam, setAllyTeam] = useState<TeamSlot[]>(
    ROLES.map((r) => ({ role: r.id, champion: null }))
  );
  const [activeSlot, setActiveSlot] = useState<{ team: "enemy" | "ally"; role: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectChampion = (champion: ChampionMeta) => {
    if (!activeSlot) return;
    
    if (activeSlot.team === "enemy") {
      setEnemyTeam((prev) =>
        prev.map((slot) =>
          slot.role === activeSlot.role ? { ...slot, champion } : slot
        )
      );
    } else {
      setAllyTeam((prev) =>
        prev.map((slot) =>
          slot.role === activeSlot.role ? { ...slot, champion } : slot
        )
      );
    }
    setActiveSlot(null);
    setSearchQuery("");
  };

  const handleRemoveChampion = (team: "enemy" | "ally", role: string) => {
    if (team === "enemy") {
      setEnemyTeam((prev) =>
        prev.map((slot) =>
          slot.role === role ? { ...slot, champion: null } : slot
        )
      );
    } else {
      setAllyTeam((prev) =>
        prev.map((slot) =>
          slot.role === role ? { ...slot, champion: null } : slot
        )
      );
    }
  };

  const enemyChampions = enemyTeam.map((s) => s.champion).filter(Boolean) as ChampionMeta[];
  const allyChampions = allyTeam.map((s) => s.champion).filter(Boolean) as ChampionMeta[];

  // Calculate suggestions based on enemy team AND ally synergies
  const getSuggestions = (filterByRole: boolean = false) => {
    const baseChampions = filterByRole 
      ? champions.filter(c => c.role === selectedRole)
      : champions;

    if (enemyChampions.length === 0 && allyChampions.length === 0) {
      // If no teams selected, just return top tier champions for the role
      if (filterByRole) {
        return baseChampions
          .filter(c => c.tier === "S+" || c.tier === "S")
          .slice(0, 3)
          .map(champion => ({
            champion,
            score: champion.tier === "S+" ? 100 : 80,
            reasons: ["Meta pick"],
            reasonType: "meta" as const,
            isMultiCounter: false,
            counterCount: 0
          }));
      }
      return [];
    }

    const scored = baseChampions.map((champ) => {
      let score = 0;
      let reasons: string[] = [];
      let counterCount = 0;
      let synergyCount = 0;

      // Counter enemy analysis
      enemyChampions.forEach((enemy) => {
        if (enemy.counters.includes(champ.name)) {
          score += 20;
          counterCount++;
          reasons.push(`Countera ${enemy.name}`);
        }
        if (champ.counters.includes(enemy.name)) {
          score -= 15;
        }
      });

      // Synergy with ally analysis
      allyChampions.forEach((ally) => {
        if (ally.synergies.includes(champ.name) || champ.synergies.includes(ally.name)) {
          score += 18;
          synergyCount++;
          reasons.push(`Sinergia com ${ally.name}`);
        }
      });

      // Multi-counter bonus
      if (counterCount >= 2) score += 25;
      if (synergyCount >= 2) score += 20;

      // Tier bonus
      if (champ.tier === "S+") score += 10;
      else if (champ.tier === "S") score += 7;
      else if (champ.tier === "A") score += 4;

      // Winrate bonus
      if (champ.winRate >= 52) score += 5;
      else if (champ.winRate >= 50) score += 2;

      // Determine primary reason type
      const hasCounter = reasons.some(r => r.startsWith("Countera"));
      const hasSynergy = reasons.some(r => r.startsWith("Sinergia"));
      const reasonType = hasCounter && hasSynergy ? "both" : hasCounter ? "counter" : hasSynergy ? "synergy" : "meta";
      const isMultiCounter = counterCount >= 2;

      return { champion: champ, score, reasons, reasonType, isMultiCounter, counterCount };
    });

    return scored
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, filterByRole ? 3 : 6);
  };

  const suggestions = getSuggestions(false);
  const roleSuggestions = getSuggestions(true);
  
  // Get role label for display
  const currentRoleLabel = ROLES.find(r => r.id === selectedRole)?.label || selectedRole;

  // Filter all champions for picker
  const filteredChamps = searchQuery
    ? mockChampionsMeta.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockChampionsMeta.slice(0, 20);

  // Render team slots
  const renderTeamSlots = (team: TeamSlot[], teamType: "enemy" | "ally") => (
    <div className="flex flex-wrap items-start gap-2 w-full overflow-hidden">
      {team.map((slot) => {
        const roleInfo = ROLES.find((r) => r.id === slot.role);
        const isActive = activeSlot?.team === teamType && activeSlot?.role === slot.role;
        const borderColor = teamType === "enemy" ? "border-red-500/50" : "border-emerald-500/50";
        const hoverBorderColor = teamType === "enemy" ? "hover:border-red-500/50" : "hover:border-emerald-500/50";
        const ringColor = teamType === "enemy" ? "ring-red-500" : "ring-emerald-500";

        return (
          <div key={slot.role} className="group w-12 shrink-0">
            <div className="relative">
              <button
                onClick={() => setActiveSlot({ team: teamType, role: slot.role })}
                className={cn(
                  "w-12 h-12 rounded-lg border-2 border-dashed flex items-center justify-center transition-all",
                  slot.champion
                    ? `${borderColor} p-0`
                    : `border-border ${hoverBorderColor} bg-muted/30`,
                  isActive && `ring-2 ${ringColor}`
                )}
              >
              {slot.champion ? (
                <ChampionSlotTooltip champion={slot.champion}>
                  <img
                    src={slot.champion.icon}
                    alt={slot.champion.name}
                    className="w-full h-full rounded-lg object-cover bg-muted"
                  />
                </ChampionSlotTooltip>
              ) : (
                  <span className="text-xs text-muted-foreground font-medium">
                    {roleInfo?.label.charAt(0)}
                  </span>
                )}
              </button>

              {slot.champion && (
                <button
                  onClick={() => handleRemoveChampion(teamType, slot.role)}
                  className={cn(
                    "absolute top-0.5 right-0.5 w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                    teamType === "enemy" ? "bg-red-500" : "bg-emerald-500"
                  )}
                  aria-label="Remover campeão"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              )}
            </div>

            <span className="mt-1 block w-12 text-[9px] text-muted-foreground text-center leading-none truncate">
              {roleInfo?.label}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Both Teams Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Enemy Team */}
        <div className="p-4 bg-card border border-border rounded-xl min-w-0 overflow-hidden">
          <h3 className="font-semibold text-sm text-red-400 mb-3 flex items-center gap-2">
            <SwordsIcon className="w-4 h-4" />
            Time Inimigo
          </h3>
          {renderTeamSlots(enemyTeam, "enemy")}
        </div>

        {/* Ally Team */}
        <div className="p-4 bg-card border border-border rounded-xl min-w-0 overflow-hidden">
          <h3 className="font-semibold text-sm text-emerald-400 mb-3 flex items-center gap-2">
            <ShieldIcon className="w-4 h-4" />
            Meu Time
          </h3>
          {renderTeamSlots(allyTeam, "ally")}
        </div>
      </div>

      {/* Champion Picker Dropdown */}
      <AnimatePresence>
        {activeSlot && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-card border border-border rounded-xl"
          >
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={`Buscar campeão ${activeSlot.team === "enemy" ? "inimigo" : "aliado"}...`}
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
                  onClick={() => handleSelectChampion(champ)}
                  className={cn(
                    "w-10 h-10 rounded-lg border transition-colors overflow-hidden",
                    activeSlot.team === "enemy" 
                      ? "border-border hover:border-red-500/50" 
                      : "border-border hover:border-emerald-500/50"
                  )}
                >
                  <img
                    src={champ.icon}
                    alt={champ.name}
                    className="w-full h-full object-cover bg-muted"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Role-specific Recommendations */}
      {roleSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-br from-primary/10 via-primary/5 to-violet-500/10 border border-primary/30 rounded-xl"
        >
          <h3 className="font-semibold text-sm text-primary mb-3 flex items-center gap-2">
            {/* Role Icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <circle cx="12" cy="8" r="5" />
              <path d="M20 21a8 8 0 1 0-16 0" />
            </svg>
            Pick Recomendado para {currentRoleLabel}
            <span className="text-[10px] bg-primary/20 px-2 py-0.5 rounded-full ml-auto">
              Sua Role
            </span>
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {roleSuggestions.map(({ champion, score, reasons, reasonType, isMultiCounter }) => (
              <motion.button
                key={champion.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectChampion(champion)}
                className="relative p-2 bg-card/80 border border-primary/30 rounded-lg hover:border-primary/60 transition-colors text-left overflow-hidden"
              >
                <div className="relative flex items-center gap-2">
                  <div className="relative shrink-0">
                    <img
                      src={champion.icon}
                      alt={champion.name}
                      className="w-10 h-10 rounded-lg border border-primary/30 bg-muted"
                    />
                    {isMultiCounter && (
                      <motion.div 
                        className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="text-[8px] font-bold text-white">!</span>
                      </motion.div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{champion.name}</p>
                    <p className="text-xs text-primary tabular-nums">{champion.winRate}% WR</p>
                  </div>
                  <TierBadge tier={champion.tier as "S+" | "S" | "A" | "B" | "C" | "D"} size="sm" />
                </div>
                {reasons.length > 0 && (
                  <div className="relative mt-1.5 flex flex-wrap gap-1">
                    {reasons.slice(0, 2).map((reason, i) => (
                      <span 
                        key={i} 
                        className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded-full",
                          reason.startsWith("Countera") 
                            ? "bg-red-500/20 text-red-400" 
                            : reason.startsWith("Sinergia")
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "bg-primary/20 text-primary"
                        )}
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Suggestions Based on Both Teams */}
      {suggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-amber-500/10 border border-emerald-500/30 rounded-xl"
        >
          <h3 className="font-semibold text-sm text-emerald-400 mb-3 flex items-center gap-2">
            <TargetIcon className="w-4 h-4" />
            Sugestões Ideais (Todas as Roles)
            {enemyChampions.length > 0 && allyChampions.length > 0 && (
              <span className="text-[10px] bg-emerald-500/20 px-2 py-0.5 rounded-full ml-auto">
                Counter + Sinergia
              </span>
            )}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            {suggestions.map(({ champion, score, reasons, reasonType, isMultiCounter, counterCount }) => (
              <motion.button
                key={champion.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  boxShadow: isMultiCounter 
                    ? ["0 0 0 rgba(239,68,68,0)", "0 0 20px rgba(239,68,68,0.4)", "0 0 0 rgba(239,68,68,0)"]
                    : "none"
                }}
                transition={{
                  boxShadow: isMultiCounter ? {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  } : undefined
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectChampion(champion)}
                className={cn(
                  "relative p-2 bg-card/80 border rounded-lg transition-colors text-left overflow-hidden",
                  isMultiCounter 
                    ? "border-red-500/50 hover:border-red-500" 
                    : "border-border hover:border-emerald-500/50"
                )}
              >
                {/* Multi-counter glow background */}
                {isMultiCounter && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 pointer-events-none"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                
                <div className="relative flex items-center gap-2">
                  <div className="relative shrink-0">
                    <img
                      src={champion.icon}
                      alt={champion.name}
                      className="w-10 h-10 rounded-lg border border-border/50 bg-muted"
                    />
                    {/* Multi-counter badge */}
                    {isMultiCounter && (
                      <motion.div 
                        className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <span className="text-[10px] font-bold text-white">{counterCount}x</span>
                      </motion.div>
                    )}
                    {/* Synergy + counter badge */}
                    {!isMultiCounter && reasonType === "both" && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-sm">
                        <SparkleIcon className="w-2.5 h-2.5 text-amber-900" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{champion.name}</p>
                    <p className={cn(
                      "text-xs tabular-nums",
                      isMultiCounter ? "text-red-400" : "text-emerald-400"
                    )}>
                      {champion.winRate}% WR
                    </p>
                  </div>
                  <TierBadge tier={champion.tier as "S+" | "S" | "A" | "B" | "C" | "D"} size="sm" />
                </div>
                {reasons.length > 0 && (
                  <div className="relative mt-1.5 flex flex-wrap gap-1">
                    {reasons.slice(0, 2).map((reason, i) => (
                      <span 
                        key={i} 
                        className={cn(
                          "text-[9px] px-1.5 py-0.5 rounded-full",
                          reason.startsWith("Countera") 
                            ? "bg-red-500/20 text-red-400" 
                            : "bg-cyan-500/20 text-cyan-400"
                        )}
                      >
                        {reason}
                      </span>
                    ))}
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {enemyChampions.length === 0 && allyChampions.length === 0 && roleSuggestions.length === 0 && (
        <div className="p-4 bg-muted/30 border border-border rounded-xl text-center">
          <Users className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">
            Selecione campeões inimigos e aliados para ver sugestões personalizadas
          </p>
        </div>
      )}
    </div>
  );
}