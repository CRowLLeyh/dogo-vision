import { cn } from "@/lib/utils";
import { Sword, Shield, CircleDot, Crown, Castle } from "lucide-react";

export interface TimelineEvent {
  timestamp: string;
  type: "kill" | "death" | "dragon" | "baron" | "tower" | "inhibitor";
  description: string;
  team?: "blue" | "red";
}

interface MatchTimelineProps {
  events: TimelineEvent[];
  duration: string;
  className?: string;
}

const eventIcons = {
  kill: Sword,
  death: Shield,
  dragon: CircleDot,
  baron: Crown,
  tower: Castle,
  inhibitor: Castle,
};

const eventColors = {
  kill: "bg-success text-success",
  death: "bg-destructive text-destructive",
  dragon: "bg-purple-500 text-purple-500",
  baron: "bg-amber-500 text-amber-500",
  tower: "bg-cyan text-cyan",
  inhibitor: "bg-pink-500 text-pink-500",
};

const eventBgColors = {
  kill: "bg-success/10 border-success/30",
  death: "bg-destructive/10 border-destructive/30",
  dragon: "bg-purple-500/10 border-purple-500/30",
  baron: "bg-amber-500/10 border-amber-500/30",
  tower: "bg-cyan/10 border-cyan/30",
  inhibitor: "bg-pink-500/10 border-pink-500/30",
};

export function MatchTimeline({ events, duration, className }: MatchTimelineProps) {
  return (
    <div className={cn("bento-card", className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-bold text-foreground flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-gold to-accent rounded-full" />
          Timeline da Partida
        </h3>
        <span className="text-sm text-muted-foreground">
          Duração: {duration}
        </span>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-accent to-primary opacity-30" />

        <div className="space-y-4">
          {events.map((event, index) => {
            const Icon = eventIcons[event.type];
            
            return (
              <div
                key={index}
                className="relative flex items-start gap-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Timeline dot */}
                <div 
                  className={cn(
                    "relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border",
                    eventBgColors[event.type]
                  )}
                >
                  <Icon className={cn("w-5 h-5", eventColors[event.type].split(" ")[1])} />
                </div>

                {/* Event content */}
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                      {event.timestamp}
                    </span>
                    {event.team && (
                      <span className={cn(
                        "text-xs font-medium px-2 py-0.5 rounded",
                        event.team === "blue" 
                          ? "bg-cyan/20 text-cyan" 
                          : "bg-destructive/20 text-destructive"
                      )}>
                        {event.team === "blue" ? "Azul" : "Vermelho"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-foreground">{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
