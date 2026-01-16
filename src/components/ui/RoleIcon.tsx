import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getRoleInfo } from "@/lib/gameAssets";
import rolePositionsSprite from "@/assets/role-positions-gold.png";

interface RoleIconProps {
  role: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-7 h-7",
  lg: "w-10 h-10",
};

function normalizeRole(role: string) {
  const r = role?.toUpperCase?.() ?? "";
  if (r === "BOTTOM") return "ADC";
  // caso venha PT-BR em algum lugar
  if (r === "TOPO") return "TOP";
  if (r === "SELVA") return "JNG";
  if (r === "MEIO") return "MID";
  if (r === "ATIRADOR") return "ADC";
  if (r === "SUPORTE") return "SUP";
  return r;
}

export function RoleIcon({ role, size = "md", showLabel = false, className }: RoleIconProps) {
  const roleInfo = getRoleInfo(role);
  const [imgOk, setImgOk] = useState(true);

  const spriteIndex = useMemo(() => {
    // Ordem no sprite (da esquerda para direita): Topo, Selva, Meio, Atirador, Suporte
    switch (normalizeRole(role)) {
      case "TOP":
        return 0;
      case "JNG":
      case "JUNGLE":
        return 1;
      case "MID":
        return 2;
      case "ADC":
        return 3;
      case "SUP":
      case "SUPPORT":
        return 4;
      default:
        return null;
    }
  }, [role]);

  useEffect(() => {
    setImgOk(true);
  }, [role]);

  const showEmojiFallback = spriteIndex == null || !imgOk;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "relative flex items-center justify-center rounded-lg overflow-hidden",
          "bg-muted/30 ring-1 ring-border/50",
          sizeClasses[size]
        )}
        aria-label={roleInfo.label}
        title={roleInfo.label}
      >
        {spriteIndex != null && imgOk ? (
          <div
            className="h-full w-full bg-no-repeat"
            style={{
              backgroundImage: `url(${rolePositionsSprite})`,
              backgroundSize: "500% 100%",
              backgroundPosition: `${(spriteIndex / 4) * 100}% 0%`,
            }}
            onErrorCapture={() => setImgOk(false)}
          />
        ) : null}

        {showEmojiFallback ? <span className="text-[12px]">{roleInfo.icon}</span> : null}
      </div>

      {showLabel ? <span className="text-sm font-medium text-foreground">{roleInfo.label}</span> : null}
    </div>
  );
}


