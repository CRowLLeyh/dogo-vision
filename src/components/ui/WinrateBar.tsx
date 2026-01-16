import { cn } from "@/lib/utils";

interface WinrateBarProps {
  wins: number;
  losses: number;
  winrate?: number;
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

export function WinrateBar({ 
  wins, 
  losses, 
  winrate,
  showLabels = true,
  size = "md",
  className,
  animated = true
}: WinrateBarProps) {
  const calculatedWinrate = winrate ?? Math.round((wins / (wins + losses)) * 100);
  
  const heightClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4"
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabels && (
        <div className="flex justify-between mb-1.5 text-xs">
          <span className="text-success font-medium">{wins}W</span>
          <span className={cn(
            "font-bold",
            calculatedWinrate >= 50 ? "text-success" : "text-destructive"
          )}>
            {calculatedWinrate}%
          </span>
          <span className="text-destructive font-medium">{losses}L</span>
        </div>
      )}
      <div className={cn(
        "w-full rounded-full overflow-hidden bg-destructive/30 flex",
        heightClasses[size]
      )}>
        <div 
          className={cn(
            "bg-success rounded-full transition-all duration-1000 ease-out",
            animated && "animate-winrate-fill"
          )}
          style={{ 
            width: animated ? undefined : `${calculatedWinrate}%`,
            "--winrate": `${calculatedWinrate}%` 
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
