import { ROLES } from "@/lib/championSelectMockData";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import roleTop from "@/assets/roles/position-top.svg";
import roleJungle from "@/assets/roles/position-jungle.svg";
import roleMiddle from "@/assets/roles/position-middle.svg";
import roleBottom from "@/assets/roles/position-bottom.svg";
import roleUtility from "@/assets/roles/position-utility.svg";

interface RoleTabsProps {
  selectedRole: string;
  onSelectRole: (role: string) => void;
}

const roleIcons: Record<string, string> = {
  top: roleTop,
  jungle: roleJungle,
  mid: roleMiddle,
  adc: roleBottom,
  support: roleUtility,
};

export function RoleTabs({ selectedRole, onSelectRole }: RoleTabsProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-card border border-border rounded-xl">
      {ROLES.map((role) => (
        <button
          key={role.id}
          onClick={() => onSelectRole(role.id)}
          className={cn(
            "relative flex items-center gap-2.5 px-4 py-2.5 rounded-lg font-medium text-sm transition-colors",
            selectedRole === role.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {selectedRole === role.id && (
            <motion.div
              layoutId="activeRole"
              className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 rounded-lg"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <img 
            src={roleIcons[role.id]} 
            alt={role.label}
            className={cn(
              "relative z-10 w-5 h-5 transition-all",
              selectedRole === role.id 
                ? "brightness-200 drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]" 
                : "opacity-70"
            )}
          />
          <span className="relative z-10">{role.label}</span>
        </button>
      ))}
    </div>
  );
}
