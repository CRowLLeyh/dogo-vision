import { cn } from "@/lib/utils";
import { LiveGameData, BannedChampion } from "@/lib/liveGameMockData";
import { LiveGameTeamTable } from "./LiveGameTeamTable";
import { Clock, Swords, Trophy, TrendingUp, Ban } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LiveGameViewProps {
  data: LiveGameData;
  searchedPlayer: string;
}

export function LiveGameView({ data, searchedPlayer }: LiveGameViewProps) {
  // Calculate team averages
  const calcTeamStats = (team: LiveGameData["blueTeam"]) => {
    const avgWinrate = team.reduce((sum, p) => sum + (p.wins / (p.wins + p.losses)) * 100, 0) / team.length;
    const avgKDA = team.reduce((sum, p) => sum + p.recentKDA, 0) / team.length;
    const avgChampWR = team.reduce((sum, p) => sum + p.championWinrate, 0) / team.length;
    return { avgWinrate, avgKDA, avgChampWR };
  };

  const blueStats = calcTeamStats(data.blueTeam);
  const redStats = calcTeamStats(data.redTeam);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Game Info Header */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Swords className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{data.gameMode}</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>Carregando...</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Comparison */}
        <div className="flex items-center gap-6">
          <QuickStatComparison
            label="WR Média"
            blueValue={`${Math.round(blueStats.avgWinrate)}%`}
            redValue={`${Math.round(redStats.avgWinrate)}%`}
            blueWins={blueStats.avgWinrate > redStats.avgWinrate}
          />
          <QuickStatComparison
            label="KDA Médio"
            blueValue={blueStats.avgKDA.toFixed(1)}
            redValue={redStats.avgKDA.toFixed(1)}
            blueWins={blueStats.avgKDA > redStats.avgKDA}
          />
          <QuickStatComparison
            label="Champ WR"
            blueValue={`${Math.round(blueStats.avgChampWR)}%`}
            redValue={`${Math.round(redStats.avgChampWR)}%`}
            blueWins={blueStats.avgChampWR > redStats.avgChampWR}
            className="hidden md:flex"
          />
        </div>
      </div>

      {/* Bans Section */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Blue Team Bans */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-blue-400">
              <Ban className="w-4 h-4" />
              <span className="text-xs font-medium uppercase tracking-wide">Bans</span>
            </div>
            <BansList bans={data.blueBans} side="blue" />
          </div>

          {/* Red Team Bans */}
          <div className="flex items-center gap-3">
            <BansList bans={data.redBans} side="red" />
            <div className="flex items-center gap-1.5 text-red-400">
              <span className="text-xs font-medium uppercase tracking-wide">Bans</span>
              <Ban className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Teams */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <LiveGameTeamTable
          team={data.blueTeam}
          side="blue"
          highlightPlayer={searchedPlayer}
        />
        <LiveGameTeamTable
          team={data.redTeam}
          side="red"
          highlightPlayer={searchedPlayer}
        />
      </div>

      {/* Tips */}
      <div className="glass-card p-4 border-l-4 border-l-accent">
        <div className="flex items-start gap-3">
          <Trophy className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-foreground mb-1">Dica da partida</h3>
            <p className="text-sm text-muted-foreground">
              {blueStats.avgWinrate > redStats.avgWinrate
                ? "O Time Azul tem uma winrate média maior. Fique atento aos jogadores com alta maestria no campeão!"
                : "O Time Vermelho tem uma winrate média maior. Cuidado com os jogadores de maior rank!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface QuickStatComparisonProps {
  label: string;
  blueValue: string;
  redValue: string;
  blueWins: boolean;
  className?: string;
}

function QuickStatComparison({ label, blueValue, redValue, blueWins, className }: QuickStatComparisonProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-sm font-bold tabular-nums",
            blueWins ? "text-blue-400" : "text-muted-foreground"
          )}
        >
          {blueValue}
        </span>
        <TrendingUp className="w-3 h-3 text-muted-foreground" />
        <span
          className={cn(
            "text-sm font-bold tabular-nums",
            !blueWins ? "text-red-400" : "text-muted-foreground"
          )}
        >
          {redValue}
        </span>
      </div>
    </div>
  );
}

interface BansListProps {
  bans: BannedChampion[];
  side: "blue" | "red";
}

function BansList({ bans, side }: BansListProps) {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-1.5", side === "red" && "flex-row-reverse")}>
        {bans.map((ban, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              <div className="relative group">
                <img
                  src={ban.icon}
                  alt={ban.name}
                  className="w-8 h-8 rounded-md grayscale opacity-60 group-hover:opacity-80 transition-opacity"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-red-500/80 rotate-45" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              {ban.name}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
}
