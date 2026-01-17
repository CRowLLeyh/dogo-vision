import { cn } from "@/lib/utils";
import { PostGamePlayer, PostGameData } from "@/lib/postGameMockData";
import { TrendingUp, TrendingDown, Minus, Target, Eye, Coins, Swords, Shield } from "lucide-react";

interface PostGamePerformanceProps {
  player: PostGamePlayer;
  data: PostGameData;
}

export function PostGamePerformance({ player, data }: PostGamePerformanceProps) {
  // Calculate averages for comparison (mock rank average)
  const rankAverages = {
    kda: 2.5,
    csPerMin: 6.5,
    damage: 18000,
    visionScore: 25,
    goldPerMin: 380,
    killParticipation: 55,
  };

  const playerKDA = (player.kills + player.assists) / Math.max(1, player.deaths);
  const playerGoldPerMin = player.gold / (data.gameDuration / 60);

  const stats = [
    {
      label: "KDA",
      value: playerKDA.toFixed(2),
      average: rankAverages.kda,
      current: playerKDA,
      icon: Swords,
    },
    {
      label: "CS/min",
      value: player.csPerMin.toFixed(1),
      average: rankAverages.csPerMin,
      current: player.csPerMin,
      icon: Target,
    },
    {
      label: "Dano",
      value: `${(player.damage / 1000).toFixed(1)}K`,
      average: rankAverages.damage,
      current: player.damage,
      icon: Swords,
    },
    {
      label: "Visão",
      value: player.visionScore.toString(),
      average: rankAverages.visionScore,
      current: player.visionScore,
      icon: Eye,
    },
    {
      label: "Ouro/min",
      value: playerGoldPerMin.toFixed(0),
      average: rankAverages.goldPerMin,
      current: playerGoldPerMin,
      icon: Coins,
    },
    {
      label: "Part. Kills",
      value: `${player.killParticipation}%`,
      average: rankAverages.killParticipation,
      current: player.killParticipation,
      icon: Shield,
    },
  ];

  const getComparison = (current: number, average: number) => {
    const diff = ((current - average) / average) * 100;
    if (diff > 10) return { icon: TrendingUp, color: "text-emerald-500", label: "Acima da média" };
    if (diff < -10) return { icon: TrendingDown, color: "text-destructive", label: "Abaixo da média" };
    return { icon: Minus, color: "text-muted-foreground", label: "Na média" };
  };

  return (
    <div className="glass-card p-4">
      <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-gold to-gold/50 rounded-full" />
        Sua Performance
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((stat, index) => {
          const comparison = getComparison(stat.current, stat.average);
          const ComparisonIcon = comparison.icon;

          return (
            <div 
              key={stat.label}
              className="p-3 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</span>
                <stat.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                <div className={cn("flex items-center gap-1", comparison.color)}>
                  <ComparisonIcon className="w-4 h-4" />
                </div>
              </div>
              <p className={cn("text-xs mt-1", comparison.color)}>{comparison.label}</p>
            </div>
          );
        })}
      </div>

      {/* Performance Summary */}
      <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-gold/10 to-yellow-500/10 border border-gold/20">
        <div className="flex items-center gap-4">
          <img 
            src={player.championIcon} 
            alt={player.champion}
            className="w-16 h-16 rounded-xl border-2 border-gold/50"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-display font-bold text-foreground text-lg">{player.champion}</span>
              <GradeBadge grade={player.grade} size="lg" />
            </div>
            <p className="text-sm text-muted-foreground">
              {player.kills}/{player.deaths}/{player.assists} • {player.cs} CS • {(player.damage / 1000).toFixed(1)}K de dano
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function GradeBadge({ grade, size = "md" }: { grade: string; size?: "md" | "lg" }) {
  const getGradeColor = (g: string) => {
    if (g.startsWith("S")) return "from-gold to-yellow-500 text-black";
    if (g.startsWith("A")) return "from-emerald-500 to-green-500 text-white";
    if (g.startsWith("B")) return "from-blue-500 to-cyan text-white";
    if (g.startsWith("C")) return "from-orange-500 to-amber-500 text-white";
    return "from-gray-500 to-gray-600 text-white";
  };

  return (
    <span className={cn(
      "font-bold rounded-md bg-gradient-to-r inline-block",
      size === "lg" ? "px-3 py-1 text-sm" : "px-2 py-0.5 text-xs",
      getGradeColor(grade)
    )}>
      {grade}
    </span>
  );
}
