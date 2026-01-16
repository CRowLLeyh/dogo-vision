import { cn } from "@/lib/utils";

export interface BuildItem {
  itemId: number;
  timestamp: string;
  name: string;
}

interface BuildOrderProps {
  items: BuildItem[];
  className?: string;
}

const itemBaseUrl = "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/";

export function BuildOrder({ items, className }: BuildOrderProps) {
  return (
    <div className={cn("bento-card", className)}>
      <h3 className="text-lg font-display font-bold text-foreground mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-primary to-gold-glow rounded-full" />
        Ordem de Build
      </h3>

      <div className="relative pt-4">
        {/* Connection line */}
        <div className="absolute top-[52px] left-0 right-0 h-0.5 bg-gradient-to-r from-muted via-gold/30 to-muted" />

        <div className="flex items-start gap-4 overflow-x-auto pt-2 pb-4 scrollbar-hide">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[80px] animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Item icon */}
              <div className="relative z-10 group">
                <div className={cn(
                  "w-14 h-14 rounded-xl border-2 overflow-hidden transition-all duration-300",
                  "bg-gradient-to-br from-card to-background",
                  "border-border/50 group-hover:border-gold/50",
                  "group-hover:shadow-[0_0_20px_-5px_hsl(var(--gold)/0.4)]"
                )}>
                  <img
                    src={`${itemBaseUrl}${item.itemId}.png`}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Order number */}
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-primary-foreground flex items-center justify-center text-xs font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>

              {/* Timestamp */}
              <span className="text-xs font-mono text-muted-foreground mt-2">
                {item.timestamp}
              </span>

              {/* Item name */}
              <span className="text-xs text-foreground text-center mt-1 leading-tight max-w-[80px]">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Skill Order Component
export interface SkillLevel {
  level: number;
  skill: "Q" | "W" | "E" | "R";
}

interface SkillOrderProps {
  skills: SkillLevel[];
  className?: string;
}

const skillColors = {
  Q: "bg-blue-500/80 border-blue-400",
  W: "bg-green-500/80 border-green-400",
  E: "bg-orange-500/80 border-orange-400",
  R: "bg-purple-500/80 border-purple-400",
};

export function SkillOrder({ skills, className }: SkillOrderProps) {
  // Group by skill type
  const skillRows = {
    Q: skills.filter(s => s.skill === "Q"),
    W: skills.filter(s => s.skill === "W"),
    E: skills.filter(s => s.skill === "E"),
    R: skills.filter(s => s.skill === "R"),
  };

  return (
    <div className={cn("bento-card", className)}>
      <h3 className="text-lg font-display font-bold text-foreground mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500 rounded-full" />
        Ordem de Skills
      </h3>

      <div className="space-y-2">
        {(["Q", "W", "E", "R"] as const).map((skill) => (
          <div key={skill} className="flex items-center gap-2">
            {/* Skill label */}
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white",
              skillColors[skill].split(" ")[0]
            )}>
              {skill}
            </div>

            {/* Level markers */}
            <div className="flex gap-1 flex-1">
              {Array.from({ length: 18 }, (_, i) => i + 1).map((level) => {
                const isLeveled = skillRows[skill].some(s => s.level === level);
                return (
                  <div
                    key={level}
                    className={cn(
                      "flex-1 h-6 rounded transition-all duration-300",
                      isLeveled
                        ? cn(skillColors[skill], "border")
                        : "bg-muted/30"
                    )}
                  />
                );
              })}
            </div>
          </div>
        ))}

        {/* Level numbers */}
        <div className="flex items-center gap-2 mt-2">
          <div className="w-8" />
          <div className="flex gap-1 flex-1">
            {Array.from({ length: 18 }, (_, i) => i + 1).map((level) => (
              <div key={level} className="flex-1 text-center text-[10px] text-muted-foreground">
                {level}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
