import { cn } from "@/lib/utils";
import { KDADisplay } from "./ui/KDADisplay";
import { ChevronDown, Clock, Sword, Eye } from "lucide-react";
import { useState } from "react";

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
  className?: string;
}

const itemBaseUrl = "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/";

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
          {/* Champion Icon */}
          <div className="relative">
            <img 
              src={championIcon} 
              alt={champion}
              className={cn(
                "w-14 h-14 rounded-xl border-2 transition-colors",
                win ? "border-success/50" : "border-destructive/50"
              )}
            />
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
            </div>
            <p className="font-semibold text-foreground">{champion}</p>
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
          <div className="mt-4 pt-4 border-t border-border/50 animate-fade-in">
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
          </div>
        )}
      </div>
    </div>
  );
}
