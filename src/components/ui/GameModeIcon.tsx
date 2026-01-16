import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getGameModeInfo } from "@/lib/gameAssets";

interface GameModeIconProps {
  mode: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-5 h-5 text-xs",
  md: "w-7 h-7 text-sm",
  lg: "w-10 h-10 text-lg",
};

export function GameModeIcon({ mode, size = "md", showLabel = false, className }: GameModeIconProps) {
  const modeInfo = getGameModeInfo(mode);
  const [imgOk, setImgOk] = useState(true);

  // Reset imgOk when mode changes
  useEffect(() => {
    setImgOk(true);
  }, [mode]);

  const showEmojiFallback = !modeInfo.iconUrl || !imgOk;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg overflow-hidden",
          "ring-1 ring-border/50",
          `bg-gradient-to-br ${modeInfo.color}`,
          sizeClasses[size]
        )}
      >
        {/** imagem removida a pedido — mantendo apenas fallback por emoji */}
        {null}

        {showEmojiFallback ? <span>{modeInfo.icon}</span> : null}
      </div>

      {showLabel ? <span className="text-sm font-medium text-foreground">{modeInfo.label}</span> : null}
    </div>
  );
}
