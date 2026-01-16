import { cn } from "@/lib/utils";
import { RankBadge } from "./ui/RankBadge";
import { WinrateBar } from "./ui/WinrateBar";

interface RankCardProps {
  queueType: "solo" | "flex";
  tier: string;
  division: string;
  lp: number;
  wins: number;
  losses: number;
  winrate: number;
  className?: string;
}

const queueLabels = {
  solo: "Ranked Solo/Duo",
  flex: "Ranked Flex"
};

const queueColors = {
  solo: "from-accent/20 to-accent/5",
  flex: "from-success/20 to-success/5"
};

export function RankCard({
  queueType,
  tier,
  division,
  lp,
  wins,
  losses,
  winrate,
  className
}: RankCardProps) {
  return (
    <div 
      className={cn(
        "glass-card overflow-hidden transition-all duration-300",
        "hover:scale-[1.02] hover-glow",
        className
      )}
    >
      {/* Gradient Header */}
      <div className={cn(
        "h-1.5 w-full bg-gradient-to-r",
        queueColors[queueType]
      )} />

      <div className="p-5">
        {/* Queue Label */}
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-4">
          {queueLabels[queueType]}
        </p>

        {/* Rank Badge */}
        <div className="flex justify-center mb-4">
          <RankBadge 
            tier={tier} 
            division={division} 
            lp={lp}
            wins={wins}
            losses={losses}
            size="lg"
          />
        </div>

        {/* Winrate */}
        <WinrateBar 
          wins={wins}
          losses={losses}
          winrate={winrate}
        />
      </div>
    </div>
  );
}
