import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface CompactStatRowProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: LucideIcon;
  color?: "gold" | "blue" | "green" | "red" | "default";
  progress?: number;
  className?: string;
}

const colorClasses = {
  gold: "text-primary",
  blue: "text-accent",
  green: "text-success",
  red: "text-destructive",
  default: "text-foreground"
};

const progressColors = {
  gold: "bg-primary",
  blue: "bg-accent",
  green: "bg-success",
  red: "bg-destructive",
  default: "bg-muted-foreground"
};

export function CompactStatRow({ 
  label, 
  value, 
  subValue,
  icon: Icon,
  color = "default",
  progress,
  className 
}: CompactStatRowProps) {
  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className={cn("w-3.5 h-3.5", colorClasses[color])} />}
        <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={cn("text-sm font-bold tabular-nums", colorClasses[color])}>
          {value}
        </span>
        {subValue && (
          <span className="text-xs text-muted-foreground">{subValue}</span>
        )}
        {progress !== undefined && (
          <div className="w-16 h-1.5 rounded-full bg-muted/50 overflow-hidden">
            <div 
              className={cn("h-full rounded-full transition-all duration-500", progressColors[color])}
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
