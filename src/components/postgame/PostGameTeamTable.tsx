import { cn } from "@/lib/utils";
import { PostGamePlayer } from "@/lib/postGameMockData";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getItemIcon, getKeystoneIcon, getSecondaryTreeIcon } from "@/lib/gameAssets";
import { RoleIcon } from "@/components/ui/RoleIcon";
import { Link } from "react-router-dom";
import { Crown, Eye, Swords, Shield, Coins } from "lucide-react";

interface PostGameTeamTableProps {
  team: PostGamePlayer[];
  side: "blue" | "red";
  currentPlayer?: string;
  isWinner?: boolean;
}

export function PostGameTeamTable({ team, side, currentPlayer, isWinner }: PostGameTeamTableProps) {
  const totalDamage = team.reduce((sum, p) => sum + p.damage, 0);
  const totalKills = team.reduce((sum, p) => sum + p.kills, 0);

  return (
    <div className={cn(
      "glass-card overflow-hidden",
      isWinner && "ring-2 ring-gold/30"
    )}>
      {/* Header */}
      <div className={cn(
        "px-4 py-3 flex items-center justify-between",
        side === "blue" 
          ? "bg-gradient-to-r from-cyan/20 to-transparent border-b border-cyan/20" 
          : "bg-gradient-to-r from-destructive/20 to-transparent border-b border-destructive/20"
      )}>
        <div className="flex items-center gap-3">
          <span className={cn(
            "font-display font-bold",
            side === "blue" ? "text-cyan" : "text-destructive"
          )}>
            {side === "blue" ? "Time Azul" : "Time Vermelho"}
          </span>
          {isWinner && (
            <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-gold to-yellow-500 text-black rounded-full flex items-center gap-1">
              <Crown className="w-3 h-3" />
              VITÓRIA
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Swords className="w-3.5 h-3.5" />
            {totalKills} Kills
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-muted-foreground border-b border-border/50">
              <th className="text-left p-3 w-64">Jogador</th>
              <th className="text-center p-3 w-20">KDA</th>
              <th className="text-center p-3 w-24">Dano</th>
              <th className="text-center p-3 w-16">CS</th>
              <th className="text-center p-3 w-16">Visão</th>
              <th className="text-center p-3 w-16">Ouro</th>
              <th className="text-left p-3">Itens</th>
              <th className="text-center p-3 w-12">Nota</th>
            </tr>
          </thead>
          <tbody>
            {team.map((player, index) => {
              const isCurrentPlayer = player.summonerName === currentPlayer;
              const damagePercent = (player.damage / totalDamage) * 100;
              const kda = (player.kills + player.assists) / Math.max(1, player.deaths);

              return (
                <tr 
                  key={player.summonerName}
                  className={cn(
                    "border-b border-border/30 transition-colors hover:bg-muted/30",
                    isCurrentPlayer && "bg-gold/5 hover:bg-gold/10"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Player Info */}
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <RoleIcon role={player.role} className="w-4 h-4 text-muted-foreground" />
                      
                      <div className="relative">
                        <img 
                          src={player.championIcon} 
                          alt={player.champion}
                          className={cn(
                            "w-10 h-10 rounded-lg border",
                            isCurrentPlayer ? "border-gold" : "border-border/50"
                          )}
                        />
                        {player.isMvp && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-gold to-yellow-500 flex items-center justify-center">
                            <Crown className="w-3 h-3 text-black" />
                          </div>
                        )}
                      </div>

                      {/* Runes */}
                      <div className="flex flex-col gap-0.5">
                        <img 
                          src={getKeystoneIcon(player.keystone)} 
                          alt={player.keystone}
                          className="w-5 h-5"
                        />
                        <img 
                          src={getSecondaryTreeIcon(player.secondaryTree)} 
                          alt={player.secondaryTree}
                          className="w-4 h-4 opacity-70"
                        />
                      </div>

                      <div className="min-w-0">
                        <Link 
                          to={`/profile/${player.summonerName}`}
                          className={cn(
                            "font-medium truncate block hover:underline",
                            isCurrentPlayer ? "text-gold" : "text-foreground"
                          )}
                        >
                          {player.summonerName}
                        </Link>
                        <p className="text-xs text-muted-foreground">{player.champion}</p>
                      </div>
                    </div>
                  </td>

                  {/* KDA */}
                  <td className="p-3 text-center">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-foreground">
                        {player.kills}/{player.deaths}/{player.assists}
                      </span>
                      <span className={cn(
                        "text-xs",
                        kda >= 5 ? "text-gold" : kda >= 3 ? "text-cyan" : "text-muted-foreground"
                      )}>
                        {kda.toFixed(2)}
                      </span>
                    </div>
                  </td>

                  {/* Damage */}
                  <td className="p-3">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{(player.damage / 1000).toFixed(1)}K</span>
                        <span className="text-muted-foreground">{damagePercent.toFixed(0)}%</span>
                      </div>
                      <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            side === "blue" ? "bg-cyan" : "bg-destructive"
                          )}
                          style={{ width: `${damagePercent}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* CS */}
                  <td className="p-3 text-center">
                    <span className="font-medium">{player.cs}</span>
                    <span className="text-xs text-muted-foreground ml-1">({player.csPerMin.toFixed(1)})</span>
                  </td>

                  {/* Vision */}
                  <td className="p-3 text-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-center gap-1 cursor-help">
                            <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                            <span>{player.visionScore}</span>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Wards: {player.wardsPlaced} | Destruídas: {player.wardsKilled}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </td>

                  {/* Gold */}
                  <td className="p-3 text-center">
                    <span className="text-gold font-medium">{(player.gold / 1000).toFixed(1)}K</span>
                  </td>

                  {/* Items */}
                  <td className="p-3">
                    <div className="flex items-center gap-1">
                      {player.items.map((itemId, i) => (
                        <div 
                          key={i}
                          className="w-7 h-7 rounded bg-muted/50 border border-border/30 overflow-hidden"
                        >
                          {itemId > 0 && (
                            <img 
                              src={getItemIcon(itemId)} 
                              alt={`Item ${itemId}`}
                              className="w-full h-full"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Grade */}
                  <td className="p-3 text-center">
                    <GradeBadge grade={player.grade} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function GradeBadge({ grade }: { grade: string }) {
  const getGradeColor = (g: string) => {
    if (g.startsWith("S")) return "from-gold to-yellow-500 text-black";
    if (g.startsWith("A")) return "from-emerald-500 to-green-500 text-white";
    if (g.startsWith("B")) return "from-blue-500 to-cyan text-white";
    if (g.startsWith("C")) return "from-orange-500 to-amber-500 text-white";
    return "from-gray-500 to-gray-600 text-white";
  };

  return (
    <span className={cn(
      "px-2 py-1 text-xs font-bold rounded-md bg-gradient-to-r inline-block",
      getGradeColor(grade)
    )}>
      {grade}
    </span>
  );
}
