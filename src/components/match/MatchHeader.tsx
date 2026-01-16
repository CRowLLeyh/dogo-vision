import { cn } from "@/lib/utils";
import { Clock, Calendar, Trophy, Target, Eye, Coins, Crown } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getMultikillLabelPt, getMultikillTooltipPt } from "@/lib/multikill";

interface MatchHeaderProps {
  win: boolean;
  champion: string;
  championIcon: string;
  gameMode: string;
  duration: string;
  timeAgo: string;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  damage: number;
  visionScore: number;
  goldEarned: number;
  killParticipation: number;
  keystone: string;
  summonerSpells: string[];
  largestMultikill?: number;
  isMvp?: boolean;
  className?: string;
}

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

export function MatchHeader({
  win,
  champion,
  championIcon,
  gameMode,
  duration,
  timeAgo,
  kills,
  deaths,
  assists,
  cs,
  damage,
  visionScore,
  goldEarned,
  killParticipation,
  keystone,
  summonerSpells,
  largestMultikill,
  isMvp,
  className,
}: MatchHeaderProps) {
  const kda = deaths === 0 ? "Perfect" : ((kills + assists) / deaths).toFixed(2);

  return (
    <TooltipProvider>
      <div className={cn(
        "bento-card overflow-hidden",
        isMvp && "glow-border",
        className
      )}
      >
      {/* Win/Loss Banner */}
      <div className={cn(
        "h-2 w-full",
        win 
          ? "bg-gradient-to-r from-success via-success/80 to-success/60" 
          : "bg-gradient-to-r from-destructive via-destructive/80 to-destructive/60"
      )} />

      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Champion + Spells */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={championIcon}
                alt={champion}
                className={cn(
                  "w-24 h-24 rounded-2xl border-4",
                  win ? "border-success/50" : "border-destructive/50",
                  "shadow-lg"
                )}
              />
              {/* Summoner Spells */}
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                {summonerSpells.map((spell, index) => (
                  <img
                    key={index}
                    src={`${spellBaseUrl}${spellMap[spell] || spell}.png`}
                    alt={spell}
                    className="w-8 h-8 rounded-lg border border-border/50 shadow-md"
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={cn(
                  "text-2xl font-display font-bold",
                  win ? "text-success" : "text-destructive"
                )}>
                  {win ? "VITÓRIA" : "DERROTA"}
                </span>
                <Trophy className={cn(
                  "w-6 h-6",
                  win ? "text-success" : "text-destructive"
                )} />

                {largestMultikill && largestMultikill >= 2 && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                        {getMultikillLabelPt(largestMultikill)}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center">
                      <p className="text-xs">{getMultikillTooltipPt(largestMultikill)}</p>
                    </TooltipContent>
                  </Tooltip>
                )}

                {isMvp && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                    <Crown className="w-4 h-4" />
                    MVP
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground mb-1">
                {champion}
              </h1>
              <p className="text-sm text-muted-foreground">{keystone}</p>
            </div>
          </div>

          {/* KDA Display */}
          <div className="flex-1 flex flex-col items-center">
            <div className="text-4xl font-display font-bold text-foreground">
              <span className="text-foreground">{kills}</span>
              <span className="text-muted-foreground mx-1">/</span>
              <span className="text-destructive">{deaths}</span>
              <span className="text-muted-foreground mx-1">/</span>
              <span className="text-foreground">{assists}</span>
            </div>
            <div className={cn(
              "text-lg font-semibold mt-1",
              parseFloat(kda) >= 4 ? "text-success" 
                : parseFloat(kda) >= 2.5 ? "text-primary" 
                : "text-muted-foreground"
            )}>
              {kda} KDA
            </div>
          </div>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{duration}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">{timeAgo}</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-primary/10 text-primary font-medium">
              {gameMode}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6 pt-6 border-t border-border/50">
          <StatItem 
            icon={<Target className="w-5 h-5" />}
            label="Dano"
            value={damage}
            format="number"
            color="destructive"
          />
          <StatItem 
            icon={<Eye className="w-5 h-5" />}
            label="Vision"
            value={visionScore}
            color="cyan"
          />
          <StatItem 
            icon={<Coins className="w-5 h-5" />}
            label="Ouro"
            value={goldEarned}
            format="number"
            color="gold"
          />
          <StatItem 
            icon={<Trophy className="w-5 h-5" />}
            label="KP"
            value={killParticipation}
            suffix="%"
            color="primary"
          />
          <StatItem 
            icon={<Target className="w-5 h-5" />}
            label="CS"
            value={cs}
            color="default"
          />
        </div>
      </div>
      </div>
    </TooltipProvider>
  );
}

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix?: string;
  format?: "number" | "default";
  color?: "destructive" | "cyan" | "gold" | "primary" | "default";
}

const colorClasses = {
  destructive: "text-destructive",
  cyan: "text-cyan",
  gold: "text-gold",
  primary: "text-primary",
  default: "text-foreground",
};

function StatItem({ icon, label, value, suffix = "", format = "default", color = "default" }: StatItemProps) {
  const formattedValue = format === "number" && value >= 1000 
    ? (value / 1000).toFixed(1) + "K"
    : value.toString();

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/20">
      <div className={cn("opacity-70", colorClasses[color])}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className={cn("text-xl font-bold font-display", colorClasses[color])}>
          {formattedValue}{suffix}
        </p>
      </div>
    </div>
  );
}
