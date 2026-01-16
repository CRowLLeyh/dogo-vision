import { cn } from "@/lib/utils";
import { WinrateBar } from "./ui/WinrateBar";

interface ChampionCardProps {
  name: string;
  icon: string;
  masteryLevel: number;
  masteryPoints: number;
  gamesPlayed: number;
  winrate: number;
  kda: number;
  className?: string;
}

const masteryColors: Record<number, string> = {
  7: "from-primary to-gold-glow",
  6: "from-purple-500 to-purple-400",
  5: "from-red-500 to-red-400",
  4: "from-gray-500 to-gray-400",
  3: "from-gray-600 to-gray-500",
  2: "from-gray-700 to-gray-600",
  1: "from-gray-800 to-gray-700",
};

function formatMasteryPoints(points: number): string {
  if (points >= 1000000) return `${(points / 1000000).toFixed(1)}M`;
  if (points >= 1000) return `${(points / 1000).toFixed(1)}K`;
  return points.toString();
}

export function ChampionCard({
  name,
  icon,
  masteryLevel,
  masteryPoints,
  gamesPlayed,
  winrate,
  kda,
  className
}: ChampionCardProps) {
  const kdaColorClass = kda >= 4 
    ? "text-success" 
    : kda >= 3 
      ? "text-primary" 
      : kda >= 2 
        ? "text-muted-foreground" 
        : "text-destructive";

  return (
    <div 
      className={cn(
        "glass-card p-4 flex flex-col gap-3 transition-all duration-300",
        "hover:scale-[1.03] hover-glow cursor-pointer group",
        className
      )}
    >
      {/* Champion Icon & Mastery */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img 
            src={icon} 
            alt={name}
            className="w-14 h-14 rounded-xl border border-border/50 
                       group-hover:border-primary/50 transition-colors"
          />
          <div 
            className={cn(
              "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center",
              "text-xs font-bold text-white bg-gradient-to-br",
              masteryColors[masteryLevel] || masteryColors[1]
            )}
          >
            {masteryLevel}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate">{name}</h3>
          <p className="text-sm text-muted-foreground">
            {formatMasteryPoints(masteryPoints)} pts
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 text-center">
        <div>
          <p className="text-lg font-bold text-foreground">{gamesPlayed}</p>
          <p className="text-xs text-muted-foreground">Partidas</p>
        </div>
        <div>
          <p className={cn("text-lg font-bold", kdaColorClass)}>{kda.toFixed(1)}</p>
          <p className="text-xs text-muted-foreground">KDA</p>
        </div>
        <div>
          <p className={cn(
            "text-lg font-bold",
            winrate >= 55 ? "text-success" : winrate >= 50 ? "text-primary" : "text-destructive"
          )}>
            {winrate}%
          </p>
          <p className="text-xs text-muted-foreground">WR</p>
        </div>
      </div>

      {/* Winrate Bar */}
      <WinrateBar 
        wins={Math.round(gamesPlayed * (winrate / 100))}
        losses={Math.round(gamesPlayed * ((100 - winrate) / 100))}
        winrate={winrate}
        showLabels={false}
        size="sm"
      />
    </div>
  );
}
