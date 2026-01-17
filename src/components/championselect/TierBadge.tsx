import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TierBadgeProps {
  tier: "S+" | "S" | "A" | "B" | "C" | "D";
  size?: "sm" | "md" | "lg";
  className?: string;
}

// Custom Crown SVG for S+ tier
const CrownIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={cn("w-3 h-3", className)}
  >
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
  </svg>
);

// Custom Star SVG for S tier
const StarIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={cn("w-2.5 h-2.5", className)}
  >
    <path d="M12 2L14.4 9.2H22L15.8 13.8L18.2 21L12 16.4L5.8 21L8.2 13.8L2 9.2H9.6L12 2Z" />
  </svg>
);

const tierConfig = {
  "S+": {
    gradient: "from-amber-300 via-yellow-400 to-amber-500",
    glow: "shadow-[0_0_20px_rgba(251,191,36,0.5)]",
    border: "border-amber-400/50",
    text: "text-amber-900",
    iconColor: "text-amber-800",
  },
  S: {
    gradient: "from-orange-400 via-amber-400 to-orange-500",
    glow: "shadow-[0_0_15px_rgba(251,146,60,0.4)]",
    border: "border-orange-400/50",
    text: "text-orange-900",
    iconColor: "text-orange-800",
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
  sm: "w-8 h-8 text-xs",
  md: "w-12 h-12 text-base",
  lg: "w-14 h-14 text-lg",
};

export function TierBadge({ tier, size = "md", className }: TierBadgeProps) {
  const config = tierConfig[tier];

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(
        "relative flex flex-col items-center justify-center rounded-xl font-black font-display tracking-tight",
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
      
      {/* Custom icon for S+ and S tiers */}
      {tier === "S+" && (
        <CrownIcon className={cn("relative z-10 -mb-0.5", tierConfig["S+"].iconColor)} />
      )}
      {tier === "S" && (
        <StarIcon className={cn("relative z-10 -mb-0.5", tierConfig["S"].iconColor)} />
      )}
      
      {/* Tier text */}
      <span className="relative z-10 drop-shadow-sm leading-none">{tier}</span>

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
