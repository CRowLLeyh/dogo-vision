import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  animate?: boolean;
}

export function AnimatedCounter({
  value,
  duration = 1000,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
  animate = true,
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
  const startTimeRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!animate || hasAnimatedRef.current) {
      setDisplayValue(value);
      return;
    }

    hasAnimatedRef.current = true;
    startTimeRef.current = null;

    const animateValue = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      
      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = easedProgress * value;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(value);
      }
    };

    animationRef.current = requestAnimationFrame(animateValue);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [value, duration, animate]);

  const formattedValue = displayValue.toFixed(decimals);

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
}

// Large display counter with animation
interface BigCounterProps {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  color?: "gold" | "cyan" | "success" | "default";
  className?: string;
}

const colorClasses = {
  gold: "text-primary",
  cyan: "text-accent",
  success: "text-success",
  default: "text-foreground",
};

export function BigCounter({
  value,
  label,
  suffix = "",
  decimals = 0,
  color = "default",
  className,
}: BigCounterProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className={cn("text-3xl md:text-4xl font-bold font-display", colorClasses[color])}>
        <AnimatedCounter value={value} decimals={decimals} suffix={suffix} />
      </div>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
