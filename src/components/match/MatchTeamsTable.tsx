import { cn } from "@/lib/utils";
import type { TeamPlayer } from "@/lib/mockData";
import { RankBadge } from "@/components/ui/RankBadge";
import { Link } from "react-router-dom";

interface MatchTeamsTableProps {
  blueTeam: TeamPlayer[];
  redTeam: TeamPlayer[];
  currentPlayer?: string;
  className?: string;
}

function parseRankString(rank: string): { tier: string; division?: string } {
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

function kdaText(kills: number, deaths: number, assists: number) {
  return deaths === 0 ? "Perfect" : ((kills + assists) / deaths).toFixed(1);
}

function TeamBlock({
  label,
  teamColor,
  team,
  currentPlayer,
}: {
  label: string;
  teamColor: "blue" | "red";
  team: TeamPlayer[];
  currentPlayer?: string;
}) {
  const maxDamage = Math.max(1, ...team.map((p) => p.damage || 0));

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <span
              className={cn(
                "text-xs font-semibold tracking-wider",
                teamColor === "blue" ? "text-cyan" : "text-destructive"
              )}
          >
            {label}
          </span>
        </div>

        <div className="text-xs text-muted-foreground tabular-nums">
          {team.reduce((s, p) => s + p.kills, 0)} / {team.reduce((s, p) => s + p.deaths, 0)} / {team.reduce((s, p) => s + p.assists, 0)}
        </div>
      </div>

      <div className="rounded-2xl overflow-hidden border border-border/50">
        {/* Header */}
        <div className="grid grid-cols-[1fr_110px_120px] gap-3 px-3 py-2 bg-muted/20 text-[11px] text-muted-foreground">
          <div>Jogador</div>
          <div className="text-center">KDA</div>
          <div className="text-right">Dano</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/40">
          {team.map((p) => {
            const isMe = p.summonerName === currentPlayer;
            const kda = kdaText(p.kills, p.deaths, p.assists);
            const damagePct = Math.round(((p.damage || 0) / maxDamage) * 100);
            const parsed = parseRankString(p.rank);

            return (
              <div
                key={`${label}-${p.summonerName}`}
                className={cn(
                  "grid grid-cols-[1fr_110px_120px] gap-3 px-3 py-2.5",
                  "bg-background/10 hover:bg-muted/20 transition-colors",
                  isMe && "relative"
                )}
              >
                {/* left marker for current player */}
                {isMe && (
                  <div
                    className={cn(
                      "absolute left-0 top-0 bottom-0 w-1",
                      teamColor === "blue" ? "bg-cyan" : "bg-destructive"
                    )}
                  />
                )}

                {/* Player */}
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={p.championIcon}
                    alt={p.champion}
                    loading="lazy"
                    className={cn(
                      "w-10 h-10 rounded-xl border",
                      isMe ? "border-primary/40" : "border-border/50"
                    )}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <Link
                        to={`/profile/${encodeURIComponent(p.summonerName)}`}
                        className={cn(
                          "text-sm font-semibold truncate",
                          "hover:underline underline-offset-2",
                          isMe ? "text-primary" : "text-foreground"
                        )}
                      >
                        {p.summonerName}
                      </Link>

                      <RankBadge
                        tier={parsed.tier}
                        division={parsed.division}
                        lp={p.lp}
                        wins={p.wins}
                        losses={p.losses}
                        size="md"
                        showLp={false}
                        className="shrink-0"
                      />
                    </div>
                  </div>
                </div>

                {/* KDA */}
                <div className="text-center">
                  <div className="text-sm font-bold tabular-nums">
                    <span className="text-foreground">{p.kills}</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-destructive">{p.deaths}</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-foreground">{p.assists}</span>
                  </div>
                  <div
                    className={cn(
                      "text-[11px] tabular-nums",
                      parseFloat(kda) >= 4
                        ? "text-success"
                        : parseFloat(kda) >= 2.5
                          ? "text-primary"
                          : "text-muted-foreground"
                    )}
                  >
                    {kda} AMA
                  </div>
                </div>

                {/* Damage */}
                <div className="text-right">
                  <div className="text-sm font-semibold tabular-nums">{(p.damage || 0).toLocaleString("pt-BR")}</div>
                  <div className="mt-1 h-1.5 rounded-full bg-muted/30 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        teamColor === "blue" ? "bg-cyan" : "bg-destructive"
                      )}
                      style={{ width: `${damagePct}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function MatchTeamsTable({ blueTeam, redTeam, currentPlayer, className }: MatchTeamsTableProps) {
  return (
    <div className={cn("bento-card p-5", className)}>
      <TeamBlock label="EQUIPE 1" teamColor="blue" team={blueTeam} currentPlayer={currentPlayer} />
      <div className="h-5" />
      <TeamBlock label="EQUIPE 2" teamColor="red" team={redTeam} currentPlayer={currentPlayer} />
    </div>
  );
}
