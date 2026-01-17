import { ROLES } from "@/lib/championSelectMockData";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RoleTabsProps {
  selectedRole: string;
  onSelectRole: (role: string) => void;
}

export function RoleTabs({ selectedRole, onSelectRole }: RoleTabsProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-card border border-border rounded-xl">
      {ROLES.map((role) => (
        <button
          key={role.id}
          onClick={() => onSelectRole(role.id)}
          className={cn(
            "relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors",
            selectedRole === role.id
              ? "text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          )}
        >
          {selectedRole === role.id && (
            <motion.div
              layoutId="activeRole"
              className="absolute inset-0 bg-primary rounded-lg"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{role.icon}</span>
          <span className="relative z-10">{role.label}</span>
        </button>
      ))}
    </div>
  );
}
