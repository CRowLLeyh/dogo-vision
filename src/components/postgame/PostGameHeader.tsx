import { cn } from "@/lib/utils";
import { PostGameData } from "@/lib/postGameMockData";
import { formatDuration } from "@/lib/gameAssets";
import { Trophy, Skull, Clock, Swords, Target, Flame } from "lucide-react";

interface PostGameHeaderProps {
  data: PostGameData;
  currentPlayer?: string;
}

export function PostGameHeader({ data, currentPlayer }: PostGameHeaderProps) {
  const playerTeam = data.blueTeam.find(p => p.summonerName === currentPlayer) ? "blue" : "red";
  const isWinner = data.winner === playerTeam;
  const player = [...data.blueTeam, ...data.redTeam].find(p => p.summonerName === currentPlayer);

  const blueKills = data.blueTeam.reduce((sum, p) => sum + p.kills, 0);
  const redKills = data.redTeam.reduce((sum, p) => sum + p.kills, 0);

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 opacity-30",
        isWinner 
          ? "bg-gradient-to-r from-cyan/50 via-transparent to-cyan/20" 
          : "bg-gradient-to-r from-destructive/50 via-transparent to-destructive/20"
      )} />
      
      {/* Animated Glow */}
      <div className={cn(
        "absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-40 rounded-full blur-3xl",
        isWinner ? "bg-cyan/30" : "bg-destructive/30"
      )} />

      <div className="relative glass-card p-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Result Banner */}
          <div className="flex items-center gap-4">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center",
              isWinner 
                ? "bg-gradient-to-br from-cyan to-blue-500 shadow-lg shadow-cyan/30" 
                : "bg-gradient-to-br from-destructive to-red-700 shadow-lg shadow-destructive/30"
            )}>
              {isWinner ? (
                <Trophy className="w-8 h-8 text-white" />
              ) : (
                <Skull className="w-8 h-8 text-white" />
              )}
            </div>
            <div>
              <h1 className={cn(
                "text-3xl font-display font-bold",
                isWinner ? "text-cyan" : "text-destructive"
              )}>
                {isWinner ? "VITÓRIA" : "DERROTA"}
              </h1>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Swords className="w-4 h-4" />
                  {data.gameMode}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatDuration(data.gameDuration)}
                </span>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center gap-6">
            <div className="text-center">
              <span className="text-4xl font-display font-bold text-cyan">{blueKills}</span>
              <p className="text-xs text-muted-foreground uppercase">Azul</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <span className="text-4xl font-display font-bold text-destructive">{redKills}</span>
              <p className="text-xs text-muted-foreground uppercase">Vermelho</p>
            </div>
          </div>

          {/* Player Stats Summary */}
          {player && (
            <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-border/50">
              <img 
                src={player.championIcon} 
                alt={player.champion}
                className="w-14 h-14 rounded-xl border-2 border-gold/50"
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">{player.summonerName}</span>
                  <GradeBadge grade={player.grade} />
                  {player.isMvp && (
                    <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-gold to-yellow-500 text-black rounded-full">
                      MVP
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-lg font-bold text-foreground">
                    {player.kills}/{player.deaths}/{player.assists}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {((player.kills + player.assists) / Math.max(1, player.deaths)).toFixed(2)} KDA
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Objectives Comparison */}
        <div className="mt-6 pt-6 border-t border-border/50">
          <div className="flex items-center justify-center gap-8">
            <ObjectiveRow 
              label="Torres" 
              blueValue={data.blueObjectives.towers} 
              redValue={data.redObjectives.towers} 
            />
            <ObjectiveRow 
              label="Dragões" 
              blueValue={data.blueObjectives.dragons} 
              redValue={data.redObjectives.dragons} 
            />
            <ObjectiveRow 
              label="Arautos" 
              blueValue={data.blueObjectives.heralds} 
              redValue={data.redObjectives.heralds} 
            />
            <ObjectiveRow 
              label="Barões" 
              blueValue={data.blueObjectives.barons} 
              redValue={data.redObjectives.barons} 
            />
            <ObjectiveRow 
              label="Inibidores" 
              blueValue={data.blueObjectives.inhibitors} 
              redValue={data.redObjectives.inhibitors} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface GradeBadgeProps {
  grade: string;
}

function GradeBadge({ grade }: GradeBadgeProps) {
  const getGradeColor = (g: string) => {
    if (g.startsWith("S")) return "from-gold to-yellow-500 text-black";
    if (g.startsWith("A")) return "from-emerald-500 to-green-500 text-white";
    if (g.startsWith("B")) return "from-blue-500 to-cyan text-white";
    if (g.startsWith("C")) return "from-orange-500 to-amber-500 text-white";
    return "from-gray-500 to-gray-600 text-white";
  };

  return (
    <span className={cn(
      "px-2 py-0.5 text-xs font-bold rounded-md bg-gradient-to-r",
      getGradeColor(grade)
    )}>
      {grade}
    </span>
  );
}

interface ObjectiveRowProps {
  label: string;
  blueValue: number;
  redValue: number;
}

function ObjectiveRow({ label, blueValue, redValue }: ObjectiveRowProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-3">
        <span className={cn(
          "text-lg font-bold tabular-nums",
          blueValue > redValue ? "text-cyan" : "text-muted-foreground"
        )}>
          {blueValue}
        </span>
        <span className="text-muted-foreground">-</span>
        <span className={cn(
          "text-lg font-bold tabular-nums",
          redValue > blueValue ? "text-destructive" : "text-muted-foreground"
        )}>
          {redValue}
        </span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
