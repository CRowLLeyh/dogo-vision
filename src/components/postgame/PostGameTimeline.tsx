import { cn } from "@/lib/utils";
import { GameEvent } from "@/lib/postGameMockData";
import { formatDuration } from "@/lib/gameAssets";
import { 
  Droplet, 
  Castle, 
  Crown, 
  Swords, 
  Skull, 
  Target,
  Flame,
  Shield
} from "lucide-react";

interface PostGameTimelineProps {
  events: GameEvent[];
  gameDuration: number;
}

export function PostGameTimeline({ events, gameDuration }: PostGameTimelineProps) {
  const getEventIcon = (type: GameEvent["type"]) => {
    switch (type) {
      case "first_blood": return <Droplet className="w-4 h-4" />;
      case "dragon": return <Flame className="w-4 h-4" />;
      case "herald": return <Shield className="w-4 h-4" />;
      case "baron": return <Crown className="w-4 h-4" />;
      case "tower": return <Castle className="w-4 h-4" />;
      case "inhibitor": return <Target className="w-4 h-4" />;
      case "ace": return <Skull className="w-4 h-4" />;
      case "multikill": return <Swords className="w-4 h-4" />;
      default: return <Swords className="w-4 h-4" />;
    }
  };

  return (
    <div className="glass-card p-4">
      <h3 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
        <div className="w-1 h-6 bg-gradient-to-b from-accent to-accent/50 rounded-full" />
        Timeline da Partida
      </h3>

      {/* Timeline Bar */}
      <div className="relative mb-6">
        <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan via-accent to-gold rounded-full" />
        </div>
        
        {/* Event Markers */}
        <div className="relative h-4 mt-1">
          {events.map((event, index) => {
            const position = (event.time / gameDuration) * 100;
            return (
              <div
                key={index}
                className={cn(
                  "absolute -top-3 w-2 h-2 rounded-full transform -translate-x-1/2",
                  event.team === "blue" ? "bg-cyan" : "bg-destructive"
                )}
                style={{ left: `${position}%` }}
              />
            );
          })}
        </div>
        
        {/* Time Labels */}
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0:00</span>
          <span>{formatDuration(Math.floor(gameDuration / 2))}</span>
          <span>{formatDuration(gameDuration)}</span>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
        {events.map((event, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-3 p-2 rounded-lg transition-colors hover:bg-muted/30",
              event.team === "blue" ? "border-l-2 border-l-cyan" : "border-l-2 border-l-destructive"
            )}
            style={{ animationDelay: `${index * 30}ms` }}
          >
            <span className="text-xs text-muted-foreground tabular-nums w-12">
              {formatDuration(event.time)}
            </span>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center",
              event.team === "blue" ? "bg-cyan/20 text-cyan" : "bg-destructive/20 text-destructive"
            )}>
              {getEventIcon(event.type)}
            </div>
            <span className="text-sm text-foreground flex-1">{event.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
