import { cn } from "@/lib/utils";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "sm" | "md" | "lg" | "xl";
  level?: number;
  className?: string;
  glowColor?: "gold" | "blue";
}

const sizeClasses = {
  sm: "w-10 h-10",
  md: "w-16 h-16",
  lg: "w-24 h-24",
  xl: "w-32 h-32"
};

export function Avatar({ 
  src, 
  alt, 
  size = "md", 
  level, 
  className,
  glowColor = "gold"
}: AvatarProps) {
  const glowClass = glowColor === "gold" 
    ? "shadow-[0_0_20px_-5px_hsl(var(--gold)/0.5)]" 
    : "shadow-[0_0_20px_-5px_hsl(var(--neon-blue)/0.5)]";

  return (
    <div className={cn("relative inline-block", className)}>
      <div 
        className={cn(
          "relative rounded-full overflow-hidden border-2 border-primary/50",
          sizeClasses[size],
          glowClass,
          "transition-all duration-300 hover:scale-105 hover:border-primary"
        )}
      >
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover"
        />
      </div>
      {level !== undefined && (
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 
                        px-2 py-0.5 bg-primary text-primary-foreground 
                        text-xs font-bold rounded-full
                        border border-primary/50 shadow-lg">
          {level}
        </div>
      )}
    </div>
  );
}
