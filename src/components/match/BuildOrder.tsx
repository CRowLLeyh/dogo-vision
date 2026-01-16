import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

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
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollState = useMemo(() => {
    const el = scrollerRef.current;
    if (!el) return { left: false, right: false };

    const left = el.scrollLeft > 0;
    const right = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
    return { left, right };
  }, [items]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });

    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [items]);

  useEffect(() => {
    // sync initial state after mount
    setCanScrollLeft(scrollState.left);
    setCanScrollRight(scrollState.right);
  }, [scrollState.left, scrollState.right]);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;

    const amount = Math.max(240, Math.floor(el.clientWidth * 0.6));
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <div className={cn("bento-card", className)}>
      <h3 className="text-lg font-display font-bold text-foreground mb-6 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-primary to-gold-glow rounded-full" />
        Ordem de Build
      </h3>

      <div className="relative pt-4">
        {/* Connection line */}
        <div className="absolute top-[52px] left-0 right-0 h-0.5 bg-gradient-to-r from-muted via-gold/30 to-muted" />

        {/* Desktop scroll arrows */}
        <button
          type="button"
          onClick={() => scrollByAmount("left")}
          aria-label="Rolar build para a esquerda"
          className={cn(
            "hidden md:flex absolute left-1 top-7 z-20",
            "h-9 w-9 items-center justify-center rounded-xl",
            "bg-background/70 backdrop-blur border border-border/60",
            "transition-all",
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <ChevronLeft className="h-4 w-4 text-foreground" />
        </button>

        <button
          type="button"
          onClick={() => scrollByAmount("right")}
          aria-label="Rolar build para a direita"
          className={cn(
            "hidden md:flex absolute right-1 top-7 z-20",
            "h-9 w-9 items-center justify-center rounded-xl",
            "bg-background/70 backdrop-blur border border-border/60",
            "transition-all",
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <ChevronRight className="h-4 w-4 text-foreground" />
        </button>

        {/* Edge hints on desktop */}
        <div
          className={cn(
            "hidden md:block pointer-events-none absolute inset-y-0 left-0 w-10 z-10",
            "bg-gradient-to-r from-background to-transparent",
            canScrollLeft ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "hidden md:block pointer-events-none absolute inset-y-0 right-0 w-10 z-10",
            "bg-gradient-to-l from-background to-transparent",
            canScrollRight ? "opacity-100" : "opacity-0"
          )}
        />

        <div
          ref={scrollerRef}
          className={cn(
            "flex items-start gap-4 overflow-x-auto pt-2 pb-4 scrollbar-hide",
            "scroll-smooth"
          )}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[80px] animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Item icon */}
              <div className="relative z-10 group">
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl border-2 overflow-hidden transition-all duration-300",
                    "bg-gradient-to-br from-card to-background",
                    "border-border/50 group-hover:border-gold/50",
                    "group-hover:shadow-[0_0_20px_-5px_hsl(var(--gold)/0.4)]"
                  )}
                >
                  <img
                    src={`${itemBaseUrl}${item.itemId}.png`}
                    alt={item.name}
                    loading="lazy"
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

const skillStyles = {
  Q: "bg-accent/20 border-accent/40 text-foreground",
  W: "bg-success/15 border-success/40 text-foreground",
  E: "bg-primary/15 border-primary/40 text-foreground",
  R: "bg-destructive/15 border-destructive/40 text-foreground",
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

      <div className="space-y-3">
        {(["Q", "W", "E", "R"] as const).map((skill) => (
          <div key={skill} className="flex items-center gap-3">
            {/* Skill label */}
            <div
              className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center font-display font-bold text-sm",
                "border",
                skillStyles[skill]
              )}
            >
              {skill}
            </div>

            {/* Leveled chips (compact) */}
            <div className="min-w-0 flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-2 min-w-max py-0.5 pr-1">
                {skillRows[skill].map((s) => (
                  <span
                    key={`${skill}-${s.level}`}
                    className={cn(
                      "inline-flex items-center rounded-full border px-3 py-1",
                      "text-xs font-mono leading-none",
                      skillStyles[skill]
                    )}
                  >
                    <span className="opacity-80">lvl</span>
                    <span className="ml-1 font-bold">{s.level}</span>
                  </span>
                ))}

                {skillRows[skill].length === 0 && (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
