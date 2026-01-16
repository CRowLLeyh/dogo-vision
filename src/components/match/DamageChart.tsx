import { cn } from "@/lib/utils";
import type { TeamPlayer } from "@/lib/mockData";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface DamageChartProps {
  blueTeam: TeamPlayer[];
  redTeam: TeamPlayer[];
  currentPlayer?: string;
  className?: string;
}

function formatDamage(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function DamageChart({ blueTeam, redTeam, currentPlayer, className }: DamageChartProps) {
  // Combine and sort all players by damage
  const allPlayers = [...blueTeam, ...redTeam].sort((a, b) => b.damage - a.damage);
  const maxDamage = Math.max(...allPlayers.map(p => p.damage));

  return (
    <div className={cn("bento-card", className)}>
      <h3 className="text-lg font-display font-bold text-foreground mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-destructive to-destructive/50 rounded-full" />
        Dano Causado
      </h3>

      <div className="space-y-3">
        {allPlayers.map((player, index) => {
          const isBlueTeam = blueTeam.some(p => p.summonerName === player.summonerName);
          const isCurrentPlayer = player.summonerName === currentPlayer;
          const percentage = (player.damage / maxDamage) * 100;

          return (
            <div 
              key={player.summonerName}
              className={cn(
                "flex items-center gap-3 p-2 rounded-xl transition-colors",
                isCurrentPlayer && "bg-gold/10 ring-1 ring-gold/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Champion Icon */}
              <img
                src={player.championIcon}
                alt={player.champion}
                className="w-8 h-8 rounded-lg border border-border/50"
              />

              {/* Player Name */}
              <div className="w-28 min-w-0">
                <p className={cn(
                  "text-sm font-medium truncate",
                  isCurrentPlayer ? "text-gold" : "text-foreground"
                )}>
                  {player.summonerName}
                </p>
                <p className="text-xs text-muted-foreground">{player.champion}</p>
              </div>

              {/* Damage Bar */}
              <div className="flex-1 h-7 bg-muted/50 rounded-lg overflow-hidden relative">
                <div
                  className={cn(
                    "h-full rounded-lg transition-all duration-1000 ease-spring origin-left",
                    isBlueTeam 
                      ? "bg-gradient-to-r from-cyan/80 to-cyan" 
                      : "bg-gradient-to-r from-destructive/80 to-destructive"
                  )}
                  style={{ 
                    width: `${percentage}%`,
                    animation: `bar-fill 1s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                    animationDelay: `${index * 50}ms`
                  }}
                />
                
                {/* Damage value on bar */}
                <div className="absolute inset-0 flex items-center px-3">
                  <span className="text-xs font-bold text-white drop-shadow-md">
                    <AnimatedCounter value={player.damage} duration={1000 + index * 50} />
                  </span>
                </div>
              </div>

              {/* KDA */}
              <div className="w-20 text-right">
                <span className="text-sm text-muted-foreground">
                  {player.kills}/{player.deaths}/{player.assists}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Totals */}
      <div className="mt-6 pt-4 border-t border-border/50 grid grid-cols-2 gap-4">
        <div className="flex items-center justify-between p-3 rounded-xl bg-cyan/10 border border-cyan/20">
          <span className="text-sm font-medium text-cyan">Time Azul</span>
          <span className="text-lg font-bold text-cyan">
            {formatDamage(blueTeam.reduce((sum, p) => sum + p.damage, 0))}
          </span>
        </div>
        <div className="flex items-center justify-between p-3 rounded-xl bg-destructive/10 border border-destructive/20">
          <span className="text-sm font-medium text-destructive">Time Vermelho</span>
          <span className="text-lg font-bold text-destructive">
            {formatDamage(redTeam.reduce((sum, p) => sum + p.damage, 0))}
          </span>
        </div>
      </div>
    </div>
  );
}
