import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { getRoleInfo } from "@/lib/gameAssets";

import roleBottom from "@/assets/roles/position-bottom.svg";
import roleJungle from "@/assets/roles/position-jungle.svg";
import roleLane from "@/assets/roles/position-lane.svg";
import roleMiddle from "@/assets/roles/position-middle.svg";
import roleTop from "@/assets/roles/position-top.svg";
import roleUtility from "@/assets/roles/position-utility.svg";

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

const imgSizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-7 h-7",
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

function getRoleIconSrc(role: string) {
  // Ícones oficiais do Champ Select (CommunityDragon - SVG)
  switch (normalizeRole(role)) {
    case "TOP":
      return roleTop;
    case "JNG":
    case "JUNGLE":
      return roleJungle;
    case "MID":
      return roleMiddle;
    case "ADC":
      return roleBottom;
    case "SUP":
    case "SUPPORT":
      return roleUtility;
    default:
      return roleLane;
  }
}

export function RoleIcon({ role, size = "md", showLabel = false, className }: RoleIconProps) {
  const roleInfo = getRoleInfo(role);
  const [imgOk, setImgOk] = useState(true);

  const src = useMemo(() => getRoleIconSrc(role), [role]);

  useEffect(() => {
    setImgOk(true);
  }, [role]);

  const showEmojiFallback = !imgOk;

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
        {imgOk ? (
          <img
            src={src}
            alt=""
            aria-hidden
            loading="lazy"
            className={cn("object-contain", imgSizeClasses[size])}
            onError={() => setImgOk(false)}
          />
        ) : null}

        {showEmojiFallback ? <span className="text-[12px]">{roleInfo.icon}</span> : null}
      </div>

      {showLabel ? <span className="text-sm font-medium text-foreground">{roleInfo.label}</span> : null}
    </div>
  );
}



