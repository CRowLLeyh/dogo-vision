import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TierBadgeProps {
  tier: "S+" | "S" | "A" | "B" | "C" | "D";
  size?: "sm" | "md" | "lg";
  className?: string;
}

const tierConfig = {
  "S+": {
    gradient: "from-amber-300 via-yellow-400 to-amber-500",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.5)]",
    border: "border-amber-400/50",
    text: "text-amber-900",
  },
  S: {
    gradient: "from-orange-400 via-amber-400 to-orange-500",
    glow: "shadow-[0_0_15px_rgba(251,146,60,0.4)]",
    border: "border-orange-400/50",
    text: "text-orange-900",
  },
  A: {
    gradient: "from-emerald-400 via-green-400 to-emerald-500",
    glow: "shadow-[0_0_12px_rgba(52,211,153,0.35)]",
    border: "border-emerald-400/50",
    text: "text-emerald-900",
  },
  B: {
    gradient: "from-cyan-400 via-blue-400 to-cyan-500",
    glow: "shadow-[0_0_10px_rgba(34,211,238,0.3)]",
    border: "border-cyan-400/50",
    text: "text-cyan-900",
  },
  C: {
    gradient: "from-slate-400 via-gray-400 to-slate-500",
    glow: "",
    border: "border-slate-400/50",
    text: "text-slate-900",
  },
  D: {
    gradient: "from-red-400 via-rose-400 to-red-500",
    glow: "",
    border: "border-red-400/50",
    text: "text-red-900",
  },
};

const sizeClasses = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-lg",
  lg: "w-14 h-14 text-xl",
};

export function TierBadge({ tier, size = "md", className }: TierBadgeProps) {
  const config = tierConfig[tier];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "relative flex items-center justify-center rounded-xl font-black font-display tracking-tight",
        `bg-gradient-to-br ${config.gradient}`,
        config.glow,
        config.border,
        config.text,
        "border-2",
        sizeClasses[size],
        className
      )}
    >
      {/* Inner shine effect */}
      <div className="absolute inset-0.5 rounded-[10px] bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      
      {/* Tier text */}
      <span className="relative z-10 drop-shadow-sm">{tier}</span>

      {/* Animated glow ring for top tiers */}
      {(tier === "S+" || tier === "S") && (
        <motion.div
          className={cn(
            "absolute -inset-1 rounded-xl opacity-50",
            `bg-gradient-to-br ${config.gradient}`
          )}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ zIndex: -1, filter: "blur(4px)" }}
        />
      )}
    </motion.div>
  );
}
