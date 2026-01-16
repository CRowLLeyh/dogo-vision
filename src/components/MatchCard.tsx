import { cn } from "@/lib/utils";
import { KDADisplay } from "./ui/KDADisplay";
import { ChevronRight, Clock, Sword } from "lucide-react";
import { Link } from "react-router-dom";

interface MatchCardProps {
  matchId: string;
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
  largestMultikill?: number;
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
  2: "Double",
  3: "Triple",
  4: "Quadra",
  5: "Penta"
};

export function MatchCard({
  matchId,
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
  largestMultikill,
  className
}: MatchCardProps) {
  return (
    <Link 
      to={`/match/${matchId}`}
      className={cn(
        "group block glass-card overflow-hidden transition-all duration-400",
        "hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_hsl(var(--gold)/0.3)]",
        className
      )}
    >
      {/* Win/Loss Indicator Bar */}
      <div className={cn(
        "h-1.5 w-full",
        win 
          ? "bg-gradient-to-r from-success via-success/80 to-success/60" 
          : "bg-gradient-to-r from-destructive via-destructive/80 to-destructive/60"
      )} />

      <div className="p-5">
        <div className="flex items-center gap-4">
          {/* Champion Icon + Spells */}
          <div className="relative flex items-center gap-2">
            <img 
              src={championIcon} 
              alt={champion}
              className={cn(
                "w-16 h-16 rounded-2xl border-2 transition-all",
                win ? "border-success/50" : "border-destructive/50",
                "group-hover:scale-105"
              )}
            />
            <div className="flex flex-col gap-0.5">
              {summonerSpells.map((spell, index) => (
                <img 
                  key={index}
                  src={`${spellBaseUrl}${spellMap[spell] || spell}.png`}
                  alt={spell}
                  className="w-7 h-7 rounded-lg border border-border/50"
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
                <span className="text-xs text-gold font-semibold px-2 py-0.5 rounded-full bg-gold/10">
                  {multikillLabels[largestMultikill]}
                </span>
              )}
            </div>
            <p className="font-semibold text-lg text-foreground">{champion}</p>
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
              <span>{cs} <span className="text-xs">({csPerMin}/m)</span></span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
          </div>

          {/* Items Preview */}
          <div className="hidden lg:flex gap-1">
            {items.filter(item => item > 0).slice(0, 3).map((item, index) => (
              <img 
                key={index}
                src={`${itemBaseUrl}${item}.png`}
                alt={`Item ${item}`}
                className="w-8 h-8 rounded-lg border border-border/50"
              />
            ))}
            {items.filter(item => item > 0).length > 3 && (
              <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-xs text-muted-foreground">
                +{items.filter(item => item > 0).length - 3}
              </div>
            )}
          </div>

          {/* Arrow & Time */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {timeAgo}
            </span>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
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
      </div>
    </Link>
  );
}
