import * as React from "react";
import { cn, formatStatValue } from "@/lib/utils";
import { RadarChart } from "@/components/ui/RadarChart";
import { mockPlayerData } from "@/lib/mockData";
import { Trophy, Target, Sword, Eye, Coins, Zap, TrendingUp } from "lucide-react";

interface CompareStatsProps {
  player1: { gameName: string } | null;
  player2: { gameName: string } | null;
}

export const CompareStats = React.forwardRef<HTMLDivElement, CompareStatsProps>(
  ({ player1, player2 }, ref) => {
    if (!player1 || !player2) {
      return (
        <div ref={ref} className="flex items-center justify-center py-20 text-center">
          <div>
            <div className="w-20 h-20 rounded-3xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              Selecione dois jogadores
            </h3>
            <p className="text-muted-foreground max-w-md">
              Busque os dois jogadores que você deseja comparar para ver as estatísticas lado a lado
            </p>
          </div>
        </div>
      );
    }

    const stats = mockPlayerData.stats;

    // Mock data for player 2 (slightly different)
    const p1Stats = {
      kda: stats.avgKDA,
      cs: stats.avgCS,
      vision: stats.avgVision,
      winrate: mockPlayerData.ranks.solo.winrate,
      damage: 28.5,
      gold: 12.8,
    };

    const p2Stats = {
      kda: 3.2,
      cs: 7.1,
      vision: 1.4,
      winrate: 52,
      damage: 24.2,
      gold: 11.5,
    };

    const comparisons = [
      {
        label: "KDA",
        icon: Target,
        p1: p1Stats.kda,
        p2: p2Stats.kda,
        format: (v: number) => formatStatValue(v, "decimal1"),
      },
      {
        label: "CS/min",
        icon: Sword,
        p1: p1Stats.cs,
        p2: p2Stats.cs,
        format: (v: number) => formatStatValue(v, "decimal1"),
      },
      {
        label: "Visão/min",
        icon: Eye,
        p1: p1Stats.vision,
        p2: p2Stats.vision,
        format: (v: number) => formatStatValue(v, "decimal1"),
      },
      {
        label: "Winrate",
        icon: TrendingUp,
        p1: p1Stats.winrate,
        p2: p2Stats.winrate,
        format: (v: number) => formatStatValue(v, "percent0"),
      },
      {
        label: "Dano/min (K)",
        icon: Zap,
        p1: p1Stats.damage,
        p2: p2Stats.damage,
        format: (v: number) => formatStatValue(v, "decimal1"),
      },
      {
        label: "Gold/min (K)",
        icon: Coins,
        p1: p1Stats.gold,
        p2: p2Stats.gold,
        format: (v: number) => formatStatValue(v, "decimal1"),
      },
    ];

    const radarData1 = [
      { label: "KDA", value: Math.min(p1Stats.kda * 20, 100), max: 100 },
      { label: "CS", value: Math.min(p1Stats.cs * 10, 100), max: 100 },
      { label: "Visão", value: Math.min(p1Stats.vision * 50, 100), max: 100 },
      { label: "WR", value: p1Stats.winrate, max: 100 },
      { label: "DMG", value: Math.min(p1Stats.damage * 3, 100), max: 100 },
      { label: "Gold", value: Math.min(p1Stats.gold * 6, 100), max: 100 },
    ];

    const radarData2 = [
      { label: "KDA", value: Math.min(p2Stats.kda * 20, 100), max: 100 },
      { label: "CS", value: Math.min(p2Stats.cs * 10, 100), max: 100 },
      { label: "Visão", value: Math.min(p2Stats.vision * 50, 100), max: 100 },
      { label: "WR", value: p2Stats.winrate, max: 100 },
      { label: "DMG", value: Math.min(p2Stats.damage * 3, 100), max: 100 },
      { label: "Gold", value: Math.min(p2Stats.gold * 6, 100), max: 100 },
    ];

    return (
      <div ref={ref} className="space-y-8 animate-enter">
        {/* Radar Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="flex flex-col items-center animate-fade-in">
            <h4 className="text-sm font-medium text-primary mb-4">{player1.gameName}</h4>
            <RadarChart data={radarData1} color="gold" size={180} />
          </div>

          <div className="hidden lg:flex items-center justify-center">
            <div className="text-4xl font-display font-black text-muted-foreground/30">VS</div>
          </div>

          <div className="flex flex-col items-center animate-fade-in">
            <h4 className="text-sm font-medium text-accent mb-4">{player2.gameName}</h4>
            <RadarChart data={radarData2} color="blue" size={180} />
          </div>
        </div>

        {/* Stat Comparisons */}
        <div className="space-y-3">
          {comparisons.map((stat) => {
            const total = stat.p1 + stat.p2;
            const p1Percent = (stat.p1 / total) * 100;
            const p2Percent = (stat.p2 / total) * 100;
            const p1Wins = stat.p1 > stat.p2;
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={cn(
                  "glass-card p-4",
                  "animate-enter",
                  "transition-[border-radius,transform] duration-300",
                  "hover:rounded-3xl hover:scale-[1.01]",
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "text-lg font-bold tabular-nums",
                        p1Wins ? "text-success" : "text-muted-foreground",
                      )}
                    >
                      {stat.format(stat.p1)}
                    </span>
                    {p1Wins && <span className="text-xs text-success">▲</span>}
                  </div>

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider">{stat.label}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {!p1Wins && <span className="text-xs text-success">▲</span>}
                    <span
                      className={cn(
                        "text-lg font-bold tabular-nums",
                        !p1Wins ? "text-success" : "text-muted-foreground",
                      )}
                    >
                      {stat.format(stat.p2)}
                    </span>
                  </div>
                </div>

                <div className="flex h-2 rounded-full overflow-hidden bg-muted/30">
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      p1Wins ? "bg-primary" : "bg-primary/50",
                    )}
                    style={{ width: `${p1Percent}%` }}
                  />
                  <div
                    className={cn(
                      "h-full transition-all duration-500",
                      !p1Wins ? "bg-accent" : "bg-accent/50",
                    )}
                    style={{ width: `${p2Percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);
CompareStats.displayName = "CompareStats";

