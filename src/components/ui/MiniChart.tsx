import { cn } from "@/lib/utils";

interface MiniChartProps {
  data: number[];
  type?: "bar" | "line";
  color?: "gold" | "blue" | "green" | "red";
  className?: string;
  height?: number;
}

const colorClasses = {
  gold: "bg-primary",
  blue: "bg-accent",
  green: "bg-success",
  red: "bg-destructive"
};

export function MiniChart({ 
  data, 
  type = "bar",
  color = "gold",
  className,
  height = 32
}: MiniChartProps) {
  const max = Math.max(...data, 1);
  
  if (type === "bar") {
    return (
      <div className={cn("flex items-end gap-0.5", className)} style={{ height }}>
        {data.map((value, i) => (
          <div
            key={i}
            className={cn(
              "flex-1 rounded-t-sm transition-all duration-300",
              colorClasses[color],
              "opacity-60 hover:opacity-100"
            )}
            style={{ 
              height: `${(value / max) * 100}%`,
              minHeight: value > 0 ? 2 : 0
            }}
          />
        ))}
      </div>
    );
  }

  // Line chart
  const points = data.map((value, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (value / max) * 100;
    return `${x},${y}`;
  }).join(" ");

  return (
    <div className={cn("relative", className)} style={{ height }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={cn(
            color === "gold" && "text-primary",
            color === "blue" && "text-accent",
            color === "green" && "text-success",
            color === "red" && "text-destructive"
          )}
        />
      </svg>
    </div>
  );
}
