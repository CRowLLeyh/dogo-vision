import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: "up" | "down" | "neutral";
  color?: "gold" | "blue" | "green" | "red" | "default";
  className?: string;
}

const colorClasses = {
  gold: "text-primary",
  blue: "text-accent",
  green: "text-success",
  red: "text-destructive",
  default: "text-foreground"
};

export function StatCard({ 
  label, 
  value, 
  icon: Icon,
  trend,
  color = "default",
  className 
}: StatCardProps) {
  return (
    <div 
      className={cn(
        "glass-card p-4 flex flex-col gap-2 transition-all duration-300",
        "hover:scale-[1.02] hover:shadow-[0_0_30px_-10px_hsl(var(--gold)/0.3)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
          {label}
        </span>
        {Icon && (
          <Icon className={cn("w-4 h-4", colorClasses[color])} />
        )}
      </div>
      <div className="flex items-end gap-2">
        <span className={cn("text-2xl font-bold font-display", colorClasses[color])}>
          {value}
        </span>
        {trend && (
          <span className={cn(
            "text-xs font-medium mb-1",
            trend === "up" && "text-success",
            trend === "down" && "text-destructive",
            trend === "neutral" && "text-muted-foreground"
          )}>
            {trend === "up" && "↑"}
            {trend === "down" && "↓"}
            {trend === "neutral" && "→"}
          </span>
        )}
      </div>
    </div>
  );
}
