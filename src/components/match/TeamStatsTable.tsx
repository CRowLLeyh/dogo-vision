import { cn } from "@/lib/utils";
import { RankBadge } from "@/components/ui/RankBadge";
import type { TeamPlayer } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TeamStatsTableProps {
  team: TeamPlayer[];
  teamColor: "blue" | "red";
  currentPlayer?: string;
  className?: string;
}

const itemBaseUrl = "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/";

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function parseRankString(rank: string): { tier: string; division?: string } {
  // Examples from mock: "Gold IV", "Plat III", "Silver I"
  const [rawTier, rawDivision] = rank.trim().split(/\s+/);

  const tierMap: Record<string, string> = {
    iron: "IRON",
    bronze: "BRONZE",
    silver: "SILVER",
    gold: "GOLD",
    plat: "PLATINUM",
    platinum: "PLATINUM",
    emerald: "EMERALD",
    diamond: "DIAMOND",
    master: "MASTER",
    grandmaster: "GRANDMASTER",
    challenger: "CHALLENGER",
  };

  const tier = tierMap[(rawTier || "").toLowerCase()] ?? rawTier?.toUpperCase() ?? "IRON";
  return { tier, division: rawDivision };
}

export function TeamStatsTable({ team, teamColor, currentPlayer, className }: TeamStatsTableProps) {
  const teamColorClasses = teamColor === "blue" 
    ? "from-cyan/20 to-cyan/5 border-cyan/30"
    : "from-destructive/20 to-destructive/5 border-destructive/30";

  const teamLabelColor = teamColor === "blue" ? "text-cyan" : "text-destructive";

  return (
    <div className={cn("bento-card", className)}>
      <div className={cn(
        "flex items-center gap-3 mb-6 p-3 rounded-xl bg-gradient-to-r border",
        teamColorClasses
      )}>
        <div className={cn(
          "w-3 h-3 rounded-full",
          teamColor === "blue" ? "bg-cyan" : "bg-destructive"
        )} />
        <h3 className={cn("text-lg font-display font-bold", teamLabelColor)}>
          {teamColor === "blue" ? "Time Azul" : "Time Vermelho"}
        </h3>
      </div>

      <div className="space-y-2">
        {team.map((player, index) => {
          const isCurrentPlayer = player.summonerName === currentPlayer;
          const kda = player.deaths === 0 
            ? "Perfect" 
            : ((player.kills + player.assists) / player.deaths).toFixed(2);

          return (
            <div
              key={player.summonerName}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl transition-all",
                isCurrentPlayer 
                  ? "bg-gold/10 border border-gold/30 shadow-[0_0_20px_-10px_hsl(var(--gold)/0.3)]" 
                  : "hover:bg-muted/30"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Champion */}
              <div className="relative">
                <Link
                  to={`/profile/${encodeURIComponent(player.summonerName)}`}
                  aria-label={`Abrir perfil de ${player.summonerName}`}
                  className="shrink-0"
                >
                  <img
                    src={player.championIcon}
                    alt={player.champion}
                    className={cn(
                      "w-12 h-12 rounded-xl border-2",
                      "hover:opacity-90 transition-opacity",
                      isCurrentPlayer ? "border-gold" : "border-border/50"
                    )}
                  />
                </Link>
              </div>

              {/* Player Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        to={`/profile/${encodeURIComponent(player.summonerName)}`}
                        className={cn(
                          "font-semibold truncate",
                          "hover:underline underline-offset-2",
                          isCurrentPlayer ? "text-gold" : "text-foreground"
                        )}
                      >
                        {player.summonerName}
                      </Link>
                    </TooltipTrigger>
                    {(player.tagLine || player.level !== undefined) && (
                      <TooltipContent side="top" align="start">
                        <div className="text-xs">
                          <span className="font-semibold">
                            {player.summonerName}
                            {player.tagLine ? `#${player.tagLine}` : ""}
                          </span>
                          {player.level !== undefined && (
                            <span className="text-muted-foreground"> • Nível {player.level}</span>
                          )}
                        </div>
                      </TooltipContent>
                    )}
                  </Tooltip>

                  {(() => {
                    const parsed = parseRankString(player.rank);
                    return (
                      <RankBadge
                        tier={parsed.tier}
                        division={parsed.division}
                        lp={player.lp}
                        wins={player.wins}
                        losses={player.losses}
                        size="md"
                        showLp={false}
                        className="shrink-0"
                      />
                    );
                  })()}
                </div>
              </div>

              {/* KDA */}
              <div className="text-center min-w-[80px]">
                <p className="font-bold text-foreground">
                  {player.kills}
                  <span className="text-muted-foreground">/</span>
                  <span className="text-destructive">{player.deaths}</span>
                  <span className="text-muted-foreground">/</span>
                  {player.assists}
                </p>
                <p className={cn(
                  "text-xs",
                  parseFloat(kda) >= 4 ? "text-success" 
                    : parseFloat(kda) >= 2.5 ? "text-primary" 
                    : "text-muted-foreground"
                )}>
                  {kda} KDA
                </p>
              </div>

              {/* Damage */}
              <div className="text-center min-w-[60px]">
                <p className="font-bold text-destructive">
                  {formatNumber(player.damage)}
                </p>
                <p className="text-xs text-muted-foreground">Dano</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Totals */}
      <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center text-sm">
        <span className="text-muted-foreground">Total do Time</span>
        <div className="flex gap-6">
          <span className="font-bold text-foreground">
            {team.reduce((sum, p) => sum + p.kills, 0)}/
            {team.reduce((sum, p) => sum + p.deaths, 0)}/
            {team.reduce((sum, p) => sum + p.assists, 0)}
          </span>
          <span className="font-bold text-destructive">
            {formatNumber(team.reduce((sum, p) => sum + p.damage, 0))} DMG
          </span>
        </div>
      </div>
    </div>
  );
}
