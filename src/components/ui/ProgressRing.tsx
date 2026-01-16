import { cn } from "@/lib/utils";
import { AnimatedCounter } from "./AnimatedCounter";

interface ProgressRingProps {
  value: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: "gold" | "cyan" | "success" | "destructive";
  showValue?: boolean;
  label?: string;
  className?: string;
}

const colorClasses = {
  gold: {
    stroke: "stroke-primary",
    text: "text-primary",
    glow: "drop-shadow-[0_0_8px_hsl(var(--gold)/0.5)]",
  },
  cyan: {
    stroke: "stroke-accent",
    text: "text-accent",
    glow: "drop-shadow-[0_0_8px_hsl(var(--neon-blue)/0.5)]",
  },
  success: {
    stroke: "stroke-success",
    text: "text-success",
    glow: "drop-shadow-[0_0_8px_hsl(var(--success)/0.5)]",
  },
  destructive: {
    stroke: "stroke-destructive",
    text: "text-destructive",
    glow: "drop-shadow-[0_0_8px_hsl(var(--destructive)/0.5)]",
  },
};

export function ProgressRing({
  value,
  size = 80,
  strokeWidth = 6,
  color = "gold",
  showValue = true,
  label,
  className,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={size}
        height={size}
        className="progress-ring"
      >
        {/* Background circle */}
        <circle
          className="stroke-muted"
          fill="none"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className={cn(
            "progress-ring-circle transition-all duration-1000",
            colorClasses[color].stroke,
            colorClasses[color].glow
          )}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
          }}
        />
      </svg>
      
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-lg font-bold font-display", colorClasses[color].text)}>
            <AnimatedCounter value={value} suffix="%" />
          </span>
          {label && (
            <span className="text-xs text-muted-foreground">{label}</span>
          )}
        </div>
      )}
    </div>
  );
}

// Horizontal progress bar variant
interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: "gold" | "cyan" | "success" | "destructive";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const barSizes = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = false,
  color = "gold",
  size = "md",
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className={cn("w-full", className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-muted-foreground">{label}</span>}
          {showValue && (
            <span className={cn("text-xs font-semibold", colorClasses[color].text)}>
              <AnimatedCounter value={value} /> / {max}
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-muted rounded-full overflow-hidden", barSizes[size])}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-spring origin-left animate-bar-fill",
            color === "gold" && "bg-gradient-to-r from-gold-dim to-primary",
            color === "cyan" && "bg-gradient-to-r from-accent/80 to-accent",
            color === "success" && "bg-gradient-to-r from-success/80 to-success",
            color === "destructive" && "bg-gradient-to-r from-destructive/80 to-destructive"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
