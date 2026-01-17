import { ChampionMeta } from "@/lib/championSelectMockData";
import { TierBadge } from "./TierBadge";
import { DifficultyBadge } from "./DifficultyBadge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ChampionSlotTooltipProps {
  champion: ChampionMeta;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export function ChampionSlotTooltip({ champion, children, side = "top" }: ChampionSlotTooltipProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
          side={side} 
          className="p-0 bg-card border border-border shadow-xl w-48"
          sideOffset={8}
        >
          <div className="p-3 space-y-2">
            {/* Header */}
            <div className="flex items-center gap-2">
              <img 
                src={champion.icon} 
                alt={champion.name} 
                className="w-10 h-10 rounded-lg border border-border bg-muted"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">{champion.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <TierBadge tier={champion.tier as "S+" | "S" | "A" | "B" | "C" | "D"} size="sm" />
                  <DifficultyBadge difficulty={champion.difficulty} showLabel />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-border">
              <div className="text-center">
                <p className={cn(
                  "text-sm font-semibold tabular-nums",
                  champion.winRate >= 52 ? "text-emerald-400" :
                  champion.winRate >= 50 ? "text-blue-400" : "text-red-400"
                )}>
                  {champion.winRate}%
                </p>
                <p className="text-[9px] text-muted-foreground uppercase">Win</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold tabular-nums text-foreground">
                  {champion.pickRate}%
                </p>
                <p className="text-[9px] text-muted-foreground uppercase">Pick</p>
              </div>
              <div className="text-center">
                <p className={cn(
                  "text-sm font-semibold tabular-nums",
                  champion.banRate >= 20 ? "text-orange-400" : "text-foreground"
                )}>
                  {champion.banRate}%
                </p>
                <p className="text-[9px] text-muted-foreground uppercase">Ban</p>
              </div>
            </div>

            {/* Counters preview */}
            {champion.counters.length > 0 && (
              <div className="pt-2 border-t border-border">
                <p className="text-[9px] text-red-400 uppercase font-medium mb-1">Counters</p>
                <p className="text-xs text-muted-foreground truncate">
                  {champion.counters.slice(0, 3).join(", ")}
                </p>
              </div>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
