import { cn } from "@/lib/utils";

interface RadarChartProps {
  data: { label: string; value: number; max?: number }[];
  size?: number;
  color?: "gold" | "blue" | "green";
  showLabels?: boolean;
  className?: string;
}

const colorMap = {
  gold: { fill: "hsl(42 85% 55% / 0.3)", stroke: "hsl(42 85% 55%)" },
  blue: { fill: "hsl(185 100% 55% / 0.3)", stroke: "hsl(185 100% 55%)" },
  green: { fill: "hsl(150 85% 45% / 0.3)", stroke: "hsl(150 85% 45%)" }
};

export function RadarChart({
  data,
  size = 200,
  color = "gold",
  showLabels = true,
  className,
}: RadarChartProps) {
  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (2 * Math.PI) / data.length;

  const formatValue = (value: number) => {
    // Avoid ugly float artifacts (e.g. 76.80000000000001)
    const rounded0 = Math.round(value);
    if (Math.abs(value - rounded0) < 1e-6) return String(rounded0);

    const rounded1 = Math.round(value * 10) / 10;
    if (Math.abs(value - rounded1) < 1e-6) return rounded1.toFixed(1);

    return rounded1.toString();
  };

  // Generate polygon points
  const points = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2;
    const normalizedValue = d.value / (d.max || 100);
    const r = radius * normalizedValue;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle, label: d.label, value: d.value, formattedValue: formatValue(d.value) };
  });

  const polygonPoints = points.map(p => `${p.x},${p.y}`).join(" ");
  
  // Generate grid circles
  const gridLevels = [0.25, 0.5, 0.75, 1];
  
  return (
    <div className={cn("relative", className)}>
      <svg width={size} height={size} className="overflow-visible">
        {/* Background grid */}
        {gridLevels.map((level, i) => (
          <polygon
            key={i}
            points={data.map((_, j) => {
              const angle = j * angleStep - Math.PI / 2;
              const r = radius * level;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);
              return `${x},${y}`;
            }).join(" ")}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            className="opacity-30"
          />
        ))}
        
        {/* Axis lines */}
        {data.map((_, i) => {
          const angle = i * angleStep - Math.PI / 2;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth="1"
              className="opacity-30"
            />
          );
        })}
        
        {/* Data polygon */}
        <polygon
          points={polygonPoints}
          fill={colorMap[color].fill}
          stroke={colorMap[color].stroke}
          strokeWidth="2"
          className="transition-all duration-500"
        />
        
        {/* Data points */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="4"
            fill={colorMap[color].stroke}
            className="transition-all duration-300"
          />
        ))}
      </svg>
      
      {/* Labels */}
      {showLabels && (
        <div className="absolute inset-0">
          {points.map((p, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const labelRadius = radius + 24;
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);
            
            return (
              <div
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 text-center"
                style={{ left: x, top: y }}
              >
                 <span className="text-[10px] text-muted-foreground block">{p.label}</span>
                 <span className="text-xs font-bold text-foreground tabular-nums">{p.formattedValue}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
