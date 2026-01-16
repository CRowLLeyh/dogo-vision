import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getRoleInfo } from "@/lib/gameAssets";
import wildRiftRoleSprite from "@/assets/role-positions-wildrift.jpg";

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

const spriteScaleBySize: Record<NonNullable<RoleIconProps["size"]>, number> = {
  sm: 1,
  md: 1,
  lg: 1,
};

function normalizeRole(role: string) {
  const r = role?.toUpperCase?.() ?? "";
  if (r === "BOTTOM") return "ADC";
  return r;
}

export function RoleIcon({ role, size = "md", showLabel = false, className }: RoleIconProps) {
  const roleInfo = getRoleInfo(role);
  const [imgOk, setImgOk] = useState(true);

  const spriteIndex = useMemo(() => {
    // Ordem no sprite do Wild Rift (da esquerda para direita): Topo, Selva, Meio, Atirador, Suporte
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
          "flex items-center justify-center rounded-lg overflow-hidden",
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
              backgroundImage: `url(${wildRiftRoleSprite})`,
              backgroundSize: `${5 * spriteScaleBySize[size] * 100}% 100%`,
              backgroundPosition: `${(spriteIndex / 4) * 100}% 0%`,
            }}
          />
        ) : null}

        {showEmojiFallback ? <span className="text-[12px]">{roleInfo.icon}</span> : null}
      </div>

      {showLabel ? <span className="text-sm font-medium text-foreground">{roleInfo.label}</span> : null}
    </div>
  );
}

