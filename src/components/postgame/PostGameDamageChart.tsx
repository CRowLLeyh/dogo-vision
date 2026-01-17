import { cn } from "@/lib/utils";
import { PostGamePlayer } from "@/lib/postGameMockData";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Swords, Shield, Heart } from "lucide-react";
import { useState } from "react";

interface PostGameDamageChartProps {
  blueTeam: PostGamePlayer[];
  redTeam: PostGamePlayer[];
  currentPlayer?: string;
}

type DamageType = "dealt" | "taken" | "healing";

export function PostGameDamageChart({ blueTeam, redTeam, currentPlayer }: PostGameDamageChartProps) {
  const [damageType, setDamageType] = useState<DamageType>("dealt");

  const getDamageValue = (player: PostGamePlayer) => {
    switch (damageType) {
      case "dealt": return player.damage;
      case "taken": return player.damageTaken;
      case "healing": return player.healing;
    }
  };

  const allPlayers = [...blueTeam, ...redTeam].sort((a, b) => getDamageValue(b) - getDamageValue(a));
  const maxDamage = Math.max(...allPlayers.map(p => getDamageValue(p)));

  const tabs = [
    { id: "dealt" as DamageType, label: "Dano Causado", icon: Swords, color: "text-destructive" },
    { id: "taken" as DamageType, label: "Dano Recebido", icon: Shield, color: "text-cyan" },
    { id: "healing" as DamageType, label: "Cura", icon: Heart, color: "text-emerald-500" },
  ];

  return (
    <div className="glass-card p-4">
      <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-destructive to-destructive/50 rounded-full" />
        Estatísticas de Combate
      </h3>

      {/* Tabs */}
      <div className="flex gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setDamageType(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
              damageType === tab.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:bg-muted/50"
            )}
          >
            <tab.icon className={cn("w-4 h-4", damageType === tab.id && tab.color)} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="space-y-2">
        {allPlayers.map((player, index) => {
          const isBlueTeam = blueTeam.some(p => p.summonerName === player.summonerName);
          const isCurrentPlayer = player.summonerName === currentPlayer;
          const value = getDamageValue(player);
          const percentage = maxDamage > 0 ? (value / maxDamage) * 100 : 0;

          return (
            <div 
              key={player.summonerName}
              className={cn(
                "flex items-center gap-3 p-2 rounded-xl transition-colors",
                isCurrentPlayer && "bg-gold/10 ring-1 ring-gold/30"
              )}
            >
              {/* Champion Icon */}
              <img
                src={player.championIcon}
                alt={player.champion}
                className="w-8 h-8 rounded-lg border border-border/50"
              />

              {/* Player Name */}
              <div className="w-24 min-w-0">
                <p className={cn(
                  "text-sm font-medium truncate",
                  isCurrentPlayer ? "text-gold" : "text-foreground"
                )}>
                  {player.summonerName}
                </p>
              </div>

              {/* Damage Bar */}
              <div className="flex-1 h-6 bg-muted/50 rounded-lg overflow-hidden relative">
                <div
                  className={cn(
                    "h-full rounded-lg transition-all duration-700",
                    damageType === "dealt" && (isBlueTeam ? "bg-gradient-to-r from-cyan/80 to-cyan" : "bg-gradient-to-r from-destructive/80 to-destructive"),
                    damageType === "taken" && "bg-gradient-to-r from-orange-500/80 to-orange-500",
                    damageType === "healing" && "bg-gradient-to-r from-emerald-500/80 to-emerald-500"
                  )}
                  style={{ 
                    width: `${percentage}%`,
                    animation: `bar-fill 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                    animationDelay: `${index * 30}ms`
                  }}
                />
                
                {/* Value on bar */}
                <div className="absolute inset-0 flex items-center px-3">
                  <span className="text-xs font-bold text-white drop-shadow-md">
                    <AnimatedCounter value={value} duration={700 + index * 30} />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Totals */}
      <div className="mt-4 pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-cyan/10 border border-cyan/20">
          <span className="text-sm font-medium text-cyan">Time Azul</span>
          <span className="text-lg font-bold text-cyan tabular-nums">
            {(blueTeam.reduce((sum, p) => sum + getDamageValue(p), 0) / 1000).toFixed(1)}K
          </span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          <span className="text-sm font-medium text-destructive">Time Vermelho</span>
          <span className="text-lg font-bold text-destructive tabular-nums">
            {(redTeam.reduce((sum, p) => sum + getDamageValue(p), 0) / 1000).toFixed(1)}K
          </span>
        </div>
      </div>
    </div>
  );
}
