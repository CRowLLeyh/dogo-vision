import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "feature" | "accent" | "muted";
  hover?: boolean;
  glow?: "gold" | "blue" | "none";
}

const sizeClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
  xl: "p-10",
};

const variantClasses = {
  default: "bg-gradient-to-br from-card to-background border-border/50",
  feature: "bg-gradient-to-br from-card via-card to-primary/5 border-primary/20",
  accent: "bg-gradient-to-br from-card via-card to-accent/5 border-accent/20",
  muted: "bg-muted/50 border-border/30",
};

const glowClasses = {
  gold: "hover:shadow-[0_0_60px_-15px_hsl(var(--gold)/0.4)]",
  blue: "hover:shadow-[0_0_60px_-15px_hsl(var(--neon-blue)/0.4)]",
  none: "",
};

export function BentoCard({
  children,
  className,
  size = "md",
  variant = "default",
  hover = true,
  glow = "gold",
}: BentoCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border",
        "transition-all duration-400 ease-spring",
        sizeClasses[size],
        variantClasses[variant],
        hover && "hover:-translate-y-1 hover:border-primary/30",
        glowClasses[glow],
        className
      )}
    >
      {/* Mesh gradient overlay */}
      <div 
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-400 pointer-events-none",
          hover && "group-hover:opacity-100"
        )}
        style={{
          background: `
            radial-gradient(at 0% 0%, hsl(var(--gold) / 0.08) 0px, transparent 50%),
            radial-gradient(at 100% 100%, hsl(var(--neon-blue) / 0.06) 0px, transparent 50%)
          `
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Grid layout helper
interface BentoGridProps {
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

export function BentoGrid({ children, className, columns = 3 }: BentoGridProps) {
  return (
    <div className={cn("grid gap-4", columnClasses[columns], className)}>
      {children}
    </div>
  );
}
