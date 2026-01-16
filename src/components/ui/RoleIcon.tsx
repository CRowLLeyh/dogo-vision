import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { getRoleInfo } from "@/lib/gameAssets";

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

export function RoleIcon({ role, size = "md", showLabel = false, className }: RoleIconProps) {
  const roleInfo = getRoleInfo(role);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    setImgOk(true);
  }, [role]);

  const showEmojiFallback = !roleInfo.iconUrl || !imgOk;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-lg overflow-hidden",
          "bg-muted/30 ring-1 ring-border/50",
          sizeClasses[size]
        )}
      >
        {roleInfo.iconUrl && imgOk ? (
          <img
            src={roleInfo.iconUrl}
            alt={`${roleInfo.label} (LoL)`}
            loading="lazy"
            className={cn("object-contain", imgSizeClasses[size])}
            onLoad={() => setImgOk(true)}
            onError={() => setImgOk(false)}
          />
        ) : null}

        {showEmojiFallback ? <span className="text-[12px]">{roleInfo.icon}</span> : null}
      </div>

      {showLabel ? <span className="text-sm font-medium text-foreground">{roleInfo.label}</span> : null}
    </div>
  );
}
