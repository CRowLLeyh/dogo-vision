import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Search, TrendingUp, Users, Zap, Trophy, 
  ChevronRight, Star, Crown, Target, BarChart3
} from "lucide-react";
import { mockTierListData, mockPlayerData } from "@/lib/mockData";
import dogoLogo from "@/assets/dogo-logo.png";
import { GAME_MODE_ICONS } from "@/lib/gameAssets";
import { GameModeIcon } from "@/components/ui/GameModeIcon";

const RECENT_SEARCHES_KEY = "dogo_recent_searches";
const MAX_RECENT_SEARCHES = 5;

export default function Index() {
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  const saveRecentSearch = (search: string) => {
    const updated = [
      search,
      ...recentSearches.filter(s => s.toLowerCase() !== search.toLowerCase())
    ].slice(0, MAX_RECENT_SEARCHES);
    
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    saveRecentSearch(value);
    navigate(`/profile/${encodeURIComponent(value)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch(searchValue);
  };

  // Top champions for quick stats
  const topChamps = mockTierListData.slice(0, 5);
  const gameModes = Object.keys(GAME_MODE_ICONS).slice(0, 6);

  return (
    <div className="min-h-[calc(100vh-4rem)] mesh-background relative overflow-hidden">
      {/* Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/8 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/6 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10 py-8">
        {/* Dense Header - Blitz Style */}
        <header className="text-center mb-10 animate-fade-in">
          <div className="inline-flex items-center gap-4 mb-4">
            <img 
              src={dogoLogo} 
              alt="DOGO Logo"
              className={cn(
                "w-14 h-14 rounded-2xl shadow-[0_0_40px_-8px_hsl(var(--gold))]",
                "animate-glow-pulse"
              )}
            />
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight">
                <span className="text-gradient-gold">DOGO</span>{" "}
                <span className="text-foreground">STATS</span>
              </h1>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">
                Season 2026 • Patch 26.01
              </p>
            </div>
          </div>
        </header>

        {/* Search Section - Pro Style */}
        <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up delay-100">
          <div className={cn(
            "relative rounded-2xl transition-all duration-300",
            isFocused && "ring-2 ring-primary/50 shadow-[0_0_40px_-10px_hsl(var(--gold)/0.4)]"
          )}>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/10 via-transparent to-accent/10 pointer-events-none" />
            <div className="relative flex items-center gap-3 p-1.5 bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50">
              <div className="flex-1 flex items-center gap-3 px-4">
                <Search className={cn(
                  "w-5 h-5 transition-colors",
                  isFocused ? "text-primary" : "text-muted-foreground"
                )} />
                <input
                  type="text"
                  placeholder="Buscar jogador... (Nome#TAG)"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent py-3 text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <button
                onClick={() => handleSearch(searchValue)}
                className={cn(
                  "px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300",
                  "bg-gradient-to-r from-primary to-gold-glow text-primary-foreground",
                  "hover:shadow-[0_0_30px_-5px_hsl(var(--gold))] hover:scale-[1.02]",
                  "active:scale-[0.98]"
                )}
              >
                Buscar
              </button>
            </div>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <span className="text-xs text-muted-foreground">Recentes:</span>
              {recentSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    "bg-muted/50 text-muted-foreground",
                    "hover:bg-primary/10 hover:text-primary"
                  )}
                >
                  {search}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bento Grid - Dense Pro Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Quick Stats Card */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bento-card animate-fade-in-up delay-150">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Tier List Resumida</h3>
                <p className="text-xs text-muted-foreground">Top picks do patch atual</p>
              </div>
              <button 
                onClick={() => navigate("/champions")}
                className="ml-auto flex items-center gap-1 text-xs text-primary hover:underline"
              >
                Ver todos <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="grid grid-cols-5 gap-2">
              {topChamps.map((champ, i) => (
                <div 
                  key={champ.name}
                  className={cn(
                    "flex flex-col items-center p-3 rounded-xl transition-all",
                    "bg-muted/30 hover:bg-muted/50 cursor-pointer group"
                  )}
                >
                  <div className="relative mb-2">
                    <img 
                      src={champ.icon} 
                      alt={champ.name}
                      className="w-12 h-12 rounded-xl border border-border/50 group-hover:border-primary/50 transition-colors"
                    />
                    <div className={cn(
                      "absolute -top-1 -right-1 w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold",
                      champ.tier === "S" && "bg-gradient-to-br from-primary to-gold-glow text-primary-foreground",
                      champ.tier === "A" && "bg-accent text-accent-foreground",
                      champ.tier === "B" && "bg-muted text-foreground"
                    )}>
                      {champ.tier}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-foreground truncate w-full text-center">{champ.name}</span>
                  <span className={cn(
                    "text-[10px] font-bold",
                    champ.winrate >= 52 ? "text-success" : "text-muted-foreground"
                  )}>
                    {champ.winrate}% WR
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Compare Card */}
          <div 
            className="bento-card cursor-pointer animate-fade-in-up delay-200 hover:border-accent/50"
            onClick={() => navigate("/compare")}
          >
            <div className="h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Comparar</h3>
              <p className="text-xs text-muted-foreground mb-4 flex-1">
                Compare stats entre dois jogadores com radar charts
              </p>
              <div className="flex items-center gap-2 text-accent text-xs font-medium">
                <span>Comparar agora</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Live Game Card */}
          <div 
            className="bento-card cursor-pointer animate-fade-in-up delay-250"
            onClick={() => navigate("/live")}
          >
            <div className="h-full flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4 relative">
                <Zap className="w-6 h-6 text-success" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Live Game</h3>
              <p className="text-xs text-muted-foreground mb-4 flex-1">
                Veja partidas ao vivo e análise em tempo real
              </p>
              <div className="flex items-center gap-2 text-success text-xs font-medium">
                <span>Ver ao vivo</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>

        {/* Game Modes Section */}
        <div className="bento-card mb-8 animate-fade-in-up delay-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Modos de Jogo</h3>
              <p className="text-xs text-muted-foreground">Estatísticas disponíveis para cada modo</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {gameModes.map((mode) => (
              <div
                key={mode}
                className={cn(
                  "flex flex-col items-center p-3 rounded-xl transition-all cursor-pointer",
                  "bg-muted/20 hover:bg-muted/40 group"
                )}
              >
                <GameModeIcon
                  mode={mode}
                  size="lg"
                  className="gap-0 transition-transform group-hover:scale-110"
                />
                <span className="mt-2 text-xs font-medium text-foreground text-center">{mode}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid - Dense */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in-up delay-350">
          <FeatureCard 
            icon={TrendingUp}
            title="Estatísticas Detalhadas"
            description="KDA, CS/min, visão, dano e muito mais em cada partida"
            color="gold"
          />
          <FeatureCard 
            icon={Target}
            title="Builds & Runas"
            description="Veja as melhores builds e runas para cada campeão"
            color="blue"
          />
          <FeatureCard 
            icon={Crown}
            title="Tier List Atualizada"
            description="Rankings atualizados do patch 26.01 Season 2026"
            color="green"
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: "gold" | "blue" | "green";
}

function FeatureCard({ icon: Icon, title, description, color }: FeatureCardProps) {
  const colorClasses = {
    gold: "bg-primary/10 text-primary border-primary/20",
    blue: "bg-accent/10 text-accent border-accent/20",
    green: "bg-success/10 text-success border-success/20"
  };

  return (
    <div className="glass-card p-5 group hover:scale-[1.02] transition-all duration-300">
      <div className={cn(
        "w-11 h-11 rounded-xl flex items-center justify-center mb-3 border",
        colorClasses[color]
      )}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
