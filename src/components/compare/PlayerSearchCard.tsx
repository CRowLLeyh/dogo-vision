import { useState } from "react";
import { cn } from "@/lib/utils";
import { Search, User, X, RefreshCw } from "lucide-react";
import { mockPlayerData } from "@/lib/mockData";

interface PlayerData {
  gameName: string;
  tagLine: string;
  level: number;
  profileIconUrl: string;
  tier: string;
  division: string;
}

interface PlayerSearchCardProps {
  side: "left" | "right";
  player: PlayerData | null;
  onPlayerSelect: (player: PlayerData | null) => void;
  className?: string;
}

export function PlayerSearchCard({ side, player, onPlayerSelect, className }: PlayerSearchCardProps) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      onPlayerSelect({
        gameName: searchValue.split("#")[0] || searchValue,
        tagLine: searchValue.split("#")[1] || "BR1",
        level: mockPlayerData.profile.level,
        profileIconUrl: mockPlayerData.profile.profileIconUrl,
        tier: mockPlayerData.ranks.solo.tier,
        division: mockPlayerData.ranks.solo.division
      });
      setIsSearching(false);
      setSearchValue("");
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleClear = () => {
    onPlayerSelect(null);
    setSearchValue("");
  };

  return (
    <div className={cn(
      "relative flex-1 min-w-0",
      className
    )}>
      <div className={cn(
        "h-full rounded-2xl border-2 border-dashed transition-all duration-300",
        player 
          ? "border-transparent bg-card" 
          : "border-border/50 hover:border-primary/30 bg-card/50"
      )}>
        {player ? (
          // Player Card
          <div className="p-6 h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={player.profileIconUrl}
                    alt={player.gameName}
                    className="w-16 h-16 rounded-2xl border-2 border-border"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-background px-2 py-0.5 rounded-lg text-xs font-bold border border-border">
                    {player.level}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {player.gameName}
                    <span className="text-muted-foreground font-normal">#{player.tagLine}</span>
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-xs font-semibold",
                      `rank-${player.tier.toLowerCase()}`
                    )}>
                      {player.tier} {player.division}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleClear}
                className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          // Search Input
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className={cn(
              "w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4",
              side === "left" ? "text-primary" : "text-accent"
            )}>
              <User className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Jogador {side === "left" ? "1" : "2"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Busque um jogador para comparar
            </p>
            <div className="w-full max-w-xs relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Nome#TAG"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className={cn(
                  "w-full pl-11 pr-4 py-3 rounded-xl",
                  "bg-muted/50 border border-border/50",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:border-primary/50 transition-colors"
                )}
              />
              {isSearching && (
                <RefreshCw className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary animate-spin" />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
