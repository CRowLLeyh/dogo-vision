import { cn } from "@/lib/utils";

interface KDADisplayProps {
  kills: number;
  deaths: number;
  assists: number;
  showRatio?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function KDADisplay({ 
  kills, 
  deaths, 
  assists, 
  showRatio = false,
  size = "md",
  className 
}: KDADisplayProps) {
  const kda = deaths === 0 ? kills + assists : ((kills + assists) / deaths).toFixed(2);
  const kdaNumber = parseFloat(kda.toString());
  
  const kdaColorClass = kdaNumber >= 4 
    ? "kda-excellent" 
    : kdaNumber >= 3 
      ? "kda-good" 
      : kdaNumber >= 2 
        ? "kda-average" 
        : "kda-poor";

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  };

  return (
    <div className={cn("flex flex-col", className)}>
      <div className={cn("font-bold", sizeClasses[size])}>
        <span className="text-foreground">{kills}</span>
        <span className="text-muted-foreground mx-1">/</span>
        <span className="text-destructive">{deaths}</span>
        <span className="text-muted-foreground mx-1">/</span>
        <span className="text-accent">{assists}</span>
      </div>
      {showRatio && (
        <span className={cn("text-xs font-medium", kdaColorClass)}>
          {deaths === 0 ? "Perfect" : `${kda} KDA`}
        </span>
      )}
    </div>
  );
}
