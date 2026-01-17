import { cn } from "@/lib/utils";
import { ChampionDifficulty } from "@/lib/championSelectMockData";

interface DifficultyBadgeProps {
  difficulty: ChampionDifficulty;
  showLabel?: boolean;
  className?: string;
}

const difficultyConfig: Record<ChampionDifficulty, { label: string; color: string; dots: number }> = {
  easy: { label: "Fácil", color: "text-emerald-400", dots: 1 },
  medium: { label: "Médio", color: "text-amber-400", dots: 2 },
  hard: { label: "Difícil", color: "text-red-400", dots: 3 },
};

export function DifficultyBadge({ difficulty, showLabel = false, className }: DifficultyBadgeProps) {
  const config = difficultyConfig[difficulty];
  
  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex gap-0.5">
        {[1, 2, 3].map((dot) => (
          <span
            key={dot}
            className={cn(
              "w-1.5 h-1.5 rounded-full transition-colors",
              dot <= config.dots ? config.color.replace("text-", "bg-") : "bg-muted-foreground/30"
            )}
          />
        ))}
      </div>
      {showLabel && (
        <span className={cn("text-[10px] font-medium", config.color)}>
          {config.label}
        </span>
      )}
    </div>
  );
}
