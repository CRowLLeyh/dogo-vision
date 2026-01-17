import { motion, AnimatePresence } from "framer-motion";
import { ChampionMeta } from "@/lib/championSelectMockData";
import { getItemIcon, getKeystoneIcon } from "@/lib/gameAssets";
import { cn } from "@/lib/utils";
import { Shield, Swords, Zap, Heart, Target } from "lucide-react";

interface MatchupBuildSuggestionsProps {
  selectedChampion: ChampionMeta;
  enemyTeam: ChampionMeta[];
}

// Item suggestions based on enemy team composition
const MATCHUP_ITEMS = {
  antiTank: {
    label: "Anti-Tank",
    icon: Shield,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    items: [3036, 3033, 3153, 3135, 3165], // LDR, Mortal Reminder, BotRK, Void Staff, Morellonomicon
    condition: (enemies: ChampionMeta[]) => enemies.some(e => 
      ["K'Sante", "Ornn", "Sion", "Malphite", "Leona", "Nautilus", "Thresh", "Alistar", "Braum"].includes(e.name)
    ),
  },
  antiAP: {
    label: "Anti-AP",
    icon: Zap,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    items: [3156, 3102, 3065, 3111, 3222], // Maw, Banshee's, Spirit Visage, Mercs, Mikael's
    condition: (enemies: ChampionMeta[]) => enemies.filter(e => 
      ["Syndra", "Ahri", "Viktor", "Orianna", "Lux", "Brand", "Zyra", "Karma", "Lulu"].includes(e.name)
    ).length >= 2,
  },
  antiAD: {
    label: "Anti-AD",
    icon: Swords,
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    items: [3047, 3143, 3075, 3110, 3157], // Plated, Randuin's, Thornmail, Frozen Heart, Zhonya's
    condition: (enemies: ChampionMeta[]) => enemies.filter(e => 
      ["Zed", "Talon", "Yasuo", "Yone", "Jinx", "Caitlyn", "Vayne", "Draven", "Jhin", "Lucian"].includes(e.name)
    ).length >= 2,
  },
  antiHeal: {
    label: "Anti-Cura",
    icon: Heart,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    items: [3033, 3165, 3076, 3123], // Mortal Reminder, Morello, Bramble, Exec
    condition: (enemies: ChampionMeta[]) => enemies.some(e => 
      ["Aatrox", "Warwick", "Soraka", "Yuumi", "Vladimir", "Sylas", "Fiora", "Dr. Mundo"].includes(e.name)
    ),
  },
  antiAssassin: {
    label: "Anti-Assassino",
    icon: Target,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    items: [3157, 3026, 3053, 3156, 6675], // Zhonya's, GA, Sterak's, Maw, Galeforce
    condition: (enemies: ChampionMeta[]) => enemies.some(e => 
      ["Zed", "Talon", "Katarina", "Akali", "Fizz", "LeBlanc", "Rengar", "Kha'Zix", "Evelynn"].includes(e.name)
    ),
  },
};

// Alternative rune suggestions
const MATCHUP_RUNES = {
  sustain: {
    keystone: "Fleet Footwork",
    condition: (enemies: ChampionMeta[]) => enemies.some(e => 
      ["Teemo", "Quinn", "Vayne", "Jayce", "Kennen"].includes(e.name)
    ),
    reason: "Sustain contra poke",
  },
  scaling: {
    keystone: "Lethal Tempo",
    condition: (enemies: ChampionMeta[]) => enemies.some(e => 
      ["Nasus", "Kayle", "Kassadin", "Veigar"].includes(e.name)
    ),
    reason: "Escala melhor late game",
  },
  burst: {
    keystone: "Electrocute",
    condition: (enemies: ChampionMeta[]) => enemies.filter(e => 
      ["Jinx", "Caitlyn", "Ashe", "Kog'Maw", "Twitch"].includes(e.name)
    ).length >= 1,
    reason: "Burst contra ADCs squishy",
  },
  tanky: {
    keystone: "Grasp of the Undying",
    condition: (enemies: ChampionMeta[]) => enemies.filter(e => 
      ["K'Sante", "Ornn", "Sion", "Malphite", "Sejuani"].includes(e.name)
    ).length >= 2,
    reason: "Trades curtos contra tanks",
  },
};

export function MatchupBuildSuggestions({ selectedChampion, enemyTeam }: MatchupBuildSuggestionsProps) {
  if (enemyTeam.length === 0) return null;

  // Get applicable item suggestions
  const applicableSuggestions = Object.entries(MATCHUP_ITEMS)
    .filter(([_, data]) => data.condition(enemyTeam))
    .map(([key, data]) => ({ key, ...data }));

  // Get applicable rune suggestion
  const applicableRune = Object.entries(MATCHUP_RUNES)
    .find(([_, data]) => data.condition(enemyTeam));

  if (applicableSuggestions.length === 0 && !applicableRune) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-red-500/10 border border-amber-500/30 rounded-xl space-y-4"
    >
      <h3 className="font-semibold text-sm text-amber-400 flex items-center gap-2">
        <Swords className="w-4 h-4" />
        Adaptações de Build
        <span className="text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-full ml-auto">
          vs {enemyTeam.map(e => e.name).join(", ")}
        </span>
      </h3>

      {/* Item Suggestions */}
      <AnimatePresence>
        {applicableSuggestions.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Itens Recomendados</p>
            <div className="flex flex-wrap gap-2">
              {applicableSuggestions.map(({ key, label, icon: Icon, color, bgColor, borderColor, items }) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={cn(
                    "p-3 rounded-lg border",
                    bgColor,
                    borderColor
                  )}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={cn("w-4 h-4", color)} />
                    <span className={cn("text-xs font-medium", color)}>{label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {items.slice(0, 3).map((itemId, i) => (
                      <motion.img
                        key={itemId}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        src={getItemIcon(itemId)}
                        alt={`Item ${itemId}`}
                        className="w-8 h-8 rounded border border-border hover:scale-110 transition-transform cursor-pointer"
                        title="Clique para mais detalhes"
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Alternative Rune Suggestion */}
      <AnimatePresence>
        {applicableRune && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-3 border-t border-amber-500/20"
          >
            <p className="text-xs text-muted-foreground mb-2">Runa Alternativa</p>
            <div className="flex items-center gap-3 p-3 bg-card/80 rounded-lg border border-primary/20">
              <img
                src={getKeystoneIcon(applicableRune[1].keystone)}
                alt={applicableRune[1].keystone}
                className="w-10 h-10 rounded-full border-2 border-primary/30"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{applicableRune[1].keystone}</p>
                <p className="text-xs text-muted-foreground">{applicableRune[1].reason}</p>
              </div>
              <div className="px-2 py-1 bg-primary/10 rounded text-[10px] text-primary font-medium">
                Alternativa
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matchup Tips */}
      <div className="pt-3 border-t border-amber-500/20">
        <p className="text-xs text-muted-foreground mb-2">Dicas de Matchup</p>
        <div className="space-y-1">
          {enemyTeam.slice(0, 2).map((enemy) => {
            const isCounter = selectedChampion.counters.includes(enemy.name);
            const countersEnemy = enemy.counters.includes(selectedChampion.name);
            
            return (
              <div
                key={enemy.id}
                className={cn(
                  "flex items-center gap-2 p-2 rounded-lg text-xs",
                  isCounter 
                    ? "bg-red-500/10 border border-red-500/20" 
                    : countersEnemy 
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : "bg-muted/50"
                )}
              >
                <img
                  src={enemy.icon}
                  alt={enemy.name}
                  className="w-6 h-6 rounded border border-border"
                />
                <span className="font-medium">{enemy.name}</span>
                {isCounter && (
                  <span className="text-red-400 ml-auto">⚠️ Te countera</span>
                )}
                {countersEnemy && (
                  <span className="text-emerald-400 ml-auto">✓ Você countera</span>
                )}
                {!isCounter && !countersEnemy && (
                  <span className="text-muted-foreground ml-auto">Matchup neutro</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
