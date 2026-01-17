import * as React from "react";
import { cn } from "@/lib/utils";
import { Search, User, X, RefreshCw } from "lucide-react";
import { mockPlayerData } from "@/lib/mockData";
import { RankBadge } from "@/components/ui/RankBadge";

interface PlayerData {
  gameName: string;
  tagLine: string;
  level: number;
  profileIconUrl: string;
  tier: string;
  division: string;
  lp: number;
  wins: number;
  losses: number;
}

interface PlayerSearchCardProps {
  side: "left" | "right";
  player: PlayerData | null;
  onPlayerSelect: (player: PlayerData | null) => void;
  className?: string;
}

export const PlayerSearchCard = React.forwardRef<HTMLDivElement, PlayerSearchCardProps>(
  ({ side, player, onPlayerSelect, className }, ref) => {
    const [searchValue, setSearchValue] = React.useState("");
    const [isSearching, setIsSearching] = React.useState(false);

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
          division: mockPlayerData.ranks.solo.division,
          lp: mockPlayerData.ranks.solo.lp,
          wins: mockPlayerData.ranks.solo.wins,
          losses: mockPlayerData.ranks.solo.losses,
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
      <div ref={ref} className={cn("relative flex-1 min-w-0 w-full", className)}>
        <div
          className={cn(
            "rounded-2xl border-2 border-dashed transition-all duration-300",
            player
              ? "border-transparent bg-card animate-enter"
              : "border-border/50 hover:border-primary/30 bg-card/50 hover:rounded-3xl",
          )}
        >
          {player ? (
            // Player Card - compact, no extra space
            <div className="p-5 animate-fade-in">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={player.profileIconUrl}
                      alt={player.gameName}
                      className="w-14 h-14 rounded-xl border-2 border-border"
                      loading="lazy"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-background px-1.5 py-0.5 rounded-md text-[10px] font-bold border border-border tabular-nums">
                      {player.level}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold text-foreground truncate">
                      {player.gameName}
                      <span className="text-muted-foreground font-normal">#{player.tagLine}</span>
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <RankBadge
                        tier={player.tier}
                        division={player.division}
                        lp={player.lp}
                        wins={player.wins}
                        losses={player.losses}
                        size="sm"
                        showLp={false}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleClear}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                  aria-label="Limpar jogador"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          ) : (
            // Search Input
            <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4",
                  side === "left" ? "text-primary" : "text-accent",
                )}
              >
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
                    "focus:outline-none focus:border-primary/50 transition-colors",
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
  },
);
PlayerSearchCard.displayName = "PlayerSearchCard";

