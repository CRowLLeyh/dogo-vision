import { cn } from "@/lib/utils";
import { KDADisplay } from "./ui/KDADisplay";
import { ChevronDown, Clock, Sword, Eye, Coins, Target, Zap } from "lucide-react";
import { useState } from "react";
import type { TeamPlayer } from "@/lib/mockData";

interface MatchCardProps {
  champion: string;
  championIcon: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  csPerMin: number;
  duration: string;
  gameMode: string;
  timeAgo: string;
  items: number[];
  summonerSpells: string[];
  keystone: string;
  secondaryTree?: string;
  damage?: number;
  visionScore?: number;
  goldEarned?: number;
  killParticipation?: number;
  largestMultikill?: number;
  blueTeam?: TeamPlayer[];
  redTeam?: TeamPlayer[];
  className?: string;
}

const itemBaseUrl = "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/";
const spellBaseUrl = "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/";

const spellMap: Record<string, string> = {
  "Flash": "SummonerFlash",
  "Heal": "SummonerHeal",
  "Ignite": "SummonerDot",
  "Barrier": "SummonerBarrier",
  "Exhaust": "SummonerExhaust",
  "Ghost": "SummonerHaste",
  "Teleport": "SummonerTeleport",
  "Cleanse": "SummonerBoost",
  "Smite": "SummonerSmite",
};

const multikillLabels: Record<number, string> = {
  2: "Double Kill",
  3: "Triple Kill",
  4: "Quadra Kill",
  5: "Penta Kill"
};

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function TeamPlayerRow({ player, isCurrentPlayer }: { player: TeamPlayer; isCurrentPlayer?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-2 py-1.5 px-2 rounded transition-colors",
      isCurrentPlayer ? "bg-gold/10 border border-gold/20" : "hover:bg-white/5"
    )}>
      <img 
        src={player.championIcon} 
        alt={player.champion}
        className="w-6 h-6 rounded"
      />
      <span className={cn(
        "flex-1 text-xs truncate",
        isCurrentPlayer ? "text-gold font-semibold" : "text-foreground"
      )}>
        {player.summonerName}
      </span>
      <span className="text-xs text-muted-foreground whitespace-nowrap">
        {player.kills}/{player.deaths}/{player.assists}
      </span>
      <span className="text-xs text-muted-foreground/60 w-14 text-right">
        {formatNumber(player.damage)}
      </span>
    </div>
  );
}

export function MatchCard({
  champion,
  championIcon,
  win,
  kills,
  deaths,
  assists,
  cs,
  csPerMin,
  duration,
  gameMode,
  timeAgo,
  items,
  summonerSpells,
  keystone,
  damage,
  visionScore,
  goldEarned,
  killParticipation,
  largestMultikill,
  blueTeam,
  redTeam,
  className
}: MatchCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className={cn(
        "glass-card overflow-hidden transition-all duration-300 cursor-pointer",
        "hover:shadow-[0_0_30px_-10px_hsl(var(--gold)/0.2)]",
        className
      )}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Win/Loss Indicator Bar */}
      <div className={cn(
        "h-1 w-full",
        win ? "bg-success" : "bg-destructive"
      )} />

      {/* Main Content */}
      <div className="p-4">
        <div className="flex items-center gap-4">
          {/* Champion Icon + Spells */}
          <div className="relative flex items-center gap-2">
            <img 
              src={championIcon} 
              alt={champion}
              className={cn(
                "w-14 h-14 rounded-xl border-2 transition-colors",
                win ? "border-success/50" : "border-destructive/50"
              )}
            />
            {/* Summoner Spells */}
            <div className="flex flex-col gap-0.5">
              {summonerSpells.map((spell, index) => (
                <img 
                  key={index}
                  src={`${spellBaseUrl}${spellMap[spell] || spell}.png`}
                  alt={spell}
                  className="w-6 h-6 rounded border border-border/50"
                />
              ))}
            </div>
          </div>

          {/* Match Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={cn(
                "font-bold text-sm",
                win ? "text-success" : "text-destructive"
              )}>
                {win ? "Vitória" : "Derrota"}
              </span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{gameMode}</span>
              {largestMultikill && largestMultikill >= 2 && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-gold font-medium">
                    {multikillLabels[largestMultikill]}
                  </span>
                </>
              )}
            </div>
            <p className="font-semibold text-foreground">{champion}</p>
            <p className="text-xs text-muted-foreground">{keystone}</p>
          </div>

          {/* KDA */}
          <div className="hidden sm:block">
            <KDADisplay 
              kills={kills} 
              deaths={deaths} 
              assists={assists} 
              showRatio={true}
            />
          </div>

          {/* Stats */}
          <div className="hidden md:flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Sword className="w-4 h-4" />
              <span>{cs} <span className="text-xs">({csPerMin}/min)</span></span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          </div>

          {/* Time Ago & Expand */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {timeAgo}
            </span>
            <ChevronDown 
              className={cn(
                "w-5 h-5 text-muted-foreground transition-transform duration-300",
                isExpanded && "rotate-180"
              )} 
            />
          </div>
        </div>

        {/* Mobile KDA */}
        <div className="sm:hidden mt-3 flex items-center justify-between">
          <KDADisplay 
            kills={kills} 
            deaths={deaths} 
            assists={assists} 
            showRatio={true}
            size="sm"
          />
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{cs} CS</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in space-y-4">
            {/* Items Row */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Items:
              </span>
              <div className="flex gap-1.5">
                {items.filter(item => item > 0).map((item, index) => (
                  <img 
                    key={index}
                    src={`${itemBaseUrl}${item}.png`}
                    alt={`Item ${item}`}
                    className="w-8 h-8 rounded border border-border/50"
                  />
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            {(damage || visionScore || goldEarned || killParticipation) && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {damage && (
                  <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                    <Target className="w-4 h-4 text-destructive" />
                    <div>
                      <p className="text-xs text-muted-foreground">Dano</p>
                      <p className="text-sm font-semibold text-foreground">{formatNumber(damage)}</p>
                    </div>
                  </div>
                )}
                {visionScore !== undefined && (
                  <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                    <Eye className="w-4 h-4 text-cyan" />
                    <div>
                      <p className="text-xs text-muted-foreground">Vision</p>
                      <p className="text-sm font-semibold text-foreground">{visionScore}</p>
                    </div>
                  </div>
                )}
                {goldEarned && (
                  <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                    <Coins className="w-4 h-4 text-gold" />
                    <div>
                      <p className="text-xs text-muted-foreground">Ouro</p>
                      <p className="text-sm font-semibold text-foreground">{formatNumber(goldEarned)}</p>
                    </div>
                  </div>
                )}
                {killParticipation && (
                  <div className="flex items-center gap-2 bg-white/5 rounded-lg p-2">
                    <Zap className="w-4 h-4 text-gold" />
                    <div>
                      <p className="text-xs text-muted-foreground">KP</p>
                      <p className="text-sm font-semibold text-foreground">{killParticipation}%</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Teams */}
            {blueTeam && redTeam && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Blue Team (Ally) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-cyan uppercase tracking-wider">
                      Time Azul
                    </span>
                    <span className="text-xs text-muted-foreground">DMG</span>
                  </div>
                  <div className="space-y-0.5">
                    {blueTeam.map((player, index) => (
                      <TeamPlayerRow 
                        key={index} 
                        player={player} 
                        isCurrentPlayer={player.summonerName === "EtoH"}
                      />
                    ))}
                  </div>
                </div>

                {/* Red Team (Enemy) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-destructive uppercase tracking-wider">
                      Time Vermelho
                    </span>
                    <span className="text-xs text-muted-foreground">DMG</span>
                  </div>
                  <div className="space-y-0.5">
                    {redTeam.map((player, index) => (
                      <TeamPlayerRow 
                        key={index} 
                        player={player}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
