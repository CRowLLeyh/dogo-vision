import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RankBadgeProps {
  tier: string;
  division?: string;
  lp?: number;
  wins?: number;
  losses?: number;
  size?: "sm" | "md" | "lg";
  showLp?: boolean;
  className?: string;
}

export const RANK_ICON_URLS: Record<string, string> = {
  IRON: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-iron.png",
  BRONZE: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-bronze.png",
  SILVER: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-silver.png",
  GOLD: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-gold.png",
  PLATINUM: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-platinum.png",
  EMERALD: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-emerald.png",
  DIAMOND: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-diamond.png",
  MASTER: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-master.png",
  GRANDMASTER: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-grandmaster.png",
  CHALLENGER: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-challenger.png",
};

export function getRankEmblemUrl(tier: string): string | undefined {
  return RANK_ICON_URLS[tier.toUpperCase()];
}

const rankColors: Record<string, string> = {
  IRON: "rank-iron",
  BRONZE: "rank-bronze",
  SILVER: "rank-silver",
  GOLD: "rank-gold",
  PLATINUM: "rank-platinum",
  EMERALD: "rank-emerald",
  DIAMOND: "rank-diamond",
  MASTER: "rank-master",
  GRANDMASTER: "rank-grandmaster",
  CHALLENGER: "rank-challenger",
};

const sizeClasses = {
  sm: { container: "p-2", icon: "w-8 h-8", text: "text-xs" },
  md: { container: "p-3", icon: "w-12 h-12", text: "text-sm" },
  lg: { container: "p-4", icon: "w-16 h-16", text: "text-base" },
};

export function RankBadge({ 
  tier, 
  division, 
  lp,
  wins,
  losses,
  size = "md", 
  showLp = true,
  className 
}: RankBadgeProps) {
  const sizes = sizeClasses[size];
  const colorClass = rankColors[tier.toUpperCase()] || "rank-iron";

  return (
    <div 
      className={cn(
        "inline-flex items-center gap-2 rounded-xl border transition-all duration-300",
        "hover:scale-105",
        colorClass,
        sizes.container,
        className
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className={cn(sizes.icon, "overflow-hidden cursor-default")}> 
              <img 
                src={getRankEmblemUrl(tier)} 
                alt={`Emblema ${tier}`} 
                className="w-full h-full object-cover scale-[1.78] origin-center"
              />
            </div>
          </TooltipTrigger>
          <TooltipContent side="top" align="center">
            <div className="space-y-0.5">
              <p className="font-semibold">{tier}{division ? ` ${division}` : ""}</p>
              {lp !== undefined && <p className="text-xs text-muted-foreground">{lp} LP</p>}
              {wins !== undefined && losses !== undefined && (
                <p className="text-xs text-muted-foreground">{wins}V {losses}D</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex flex-col">
        <span className={cn("font-bold font-display", sizes.text)}>
          {tier} {division}
        </span>
        {showLp && lp !== undefined && (
          <span className={cn("text-muted-foreground", size === "sm" ? "text-[10px]" : "text-xs")}>
            {lp} LP
          </span>
        )}
      </div>
    </div>
  );
}
