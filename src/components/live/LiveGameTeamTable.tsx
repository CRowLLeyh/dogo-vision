import { cn } from "@/lib/utils";
import { LiveGamePlayer } from "@/lib/liveGameMockData";
import { RankBadge } from "@/components/ui/RankBadge";
import { RoleIcon } from "@/components/ui/RoleIcon";
import { formatStatValue } from "@/lib/utils";

interface LiveGameTeamTableProps {
  team: LiveGamePlayer[];
  side: "blue" | "red";
  highlightPlayer?: string;
}

export function LiveGameTeamTable({ team, side, highlightPlayer }: LiveGameTeamTableProps) {
  const isBlue = side === "blue";
  
  return (
    <div className="glass-card overflow-hidden">
      {/* Team Header */}
      <div
        className={cn(
          "px-4 py-3 border-b border-border/50 flex items-center gap-2",
          isBlue ? "bg-blue-500/10" : "bg-red-500/10"
        )}
      >
        <div
          className={cn(
            "w-3 h-3 rounded-full",
            isBlue ? "bg-blue-500" : "bg-red-500"
          )}
        />
        <span className="font-semibold text-foreground">
          {isBlue ? "Time Azul" : "Time Vermelho"}
        </span>
      </div>

      {/* Players */}
      <div className="divide-y divide-border/30">
        {team.map((player, index) => {
          const isHighlighted = player.summonerName === highlightPlayer;
          const winrate = Math.round((player.wins / (player.wins + player.losses)) * 100);
          
          return (
            <div
              key={player.summonerName}
              className={cn(
                "px-4 py-3 flex items-center gap-4 transition-colors",
                isHighlighted && "bg-primary/10 border-l-2 border-l-primary",
                !isHighlighted && "hover:bg-muted/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Role */}
              <RoleIcon role={player.role} size="sm" className="flex-shrink-0 opacity-60" />

              {/* Champion */}
              <div className="relative flex-shrink-0">
                <img
                  src={player.championIcon}
                  alt={player.champion}
                  className="w-10 h-10 rounded-lg border border-border"
                  loading="lazy"
                />
              </div>

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-semibold text-sm truncate",
                      isHighlighted ? "text-primary" : "text-foreground"
                    )}
                  >
                    {player.summonerName}
                  </span>
                  <span className="text-xs text-muted-foreground">#{player.tagLine}</span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-muted-foreground">{player.champion}</span>
                </div>
              </div>

              {/* Rank */}
              <div className="flex-shrink-0 hidden sm:block">
                <RankBadge
                  tier={player.tier}
                  division={player.division}
                  lp={player.lp}
                  wins={player.wins}
                  losses={player.losses}
                  size="sm"
                  showLp={false}
                />
              </div>

              {/* Champion Winrate */}
              <div className="flex-shrink-0 w-24 hidden md:block">
                <div className="text-xs text-muted-foreground mb-1">Champ WR</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all",
                        player.championWinrate >= 55
                          ? "bg-success"
                          : player.championWinrate >= 50
                          ? "bg-foreground/50"
                          : "bg-destructive"
                      )}
                      style={{ width: `${player.championWinrate}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium tabular-nums w-8",
                      player.championWinrate >= 55
                        ? "text-success"
                        : player.championWinrate >= 50
                        ? "text-foreground"
                        : "text-destructive"
                    )}
                  >
                    {player.championWinrate}%
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground tabular-nums">
                  {player.championGames} jogos
                </div>
              </div>

              {/* Recent KDA */}
              <div className="flex-shrink-0 text-right hidden lg:block">
                <div className="text-xs text-muted-foreground mb-1">KDA Recente</div>
                <span
                  className={cn(
                    "text-sm font-bold tabular-nums",
                    player.recentKDA >= 3.5
                      ? "text-success"
                      : player.recentKDA >= 2.5
                      ? "text-foreground"
                      : "text-destructive"
                  )}
                >
                  {formatStatValue(player.recentKDA, "decimal1")}
                </span>
              </div>

              {/* Overall Winrate */}
              <div className="flex-shrink-0 text-right">
                <div className="text-xs text-muted-foreground mb-1 hidden sm:block">WR Geral</div>
                <span
                  className={cn(
                    "text-sm font-bold tabular-nums",
                    winrate >= 55
                      ? "text-success"
                      : winrate >= 50
                      ? "text-foreground"
                      : "text-destructive"
                  )}
                >
                  {winrate}%
                </span>
                <div className="text-[10px] text-muted-foreground tabular-nums hidden sm:block">
                  {player.wins}V {player.losses}D
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
