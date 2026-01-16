import { useState } from "react";
import { TierBadge } from "@/components/TierBadge";
import { mockTierListData } from "@/lib/mockData";
import { Search, Filter, ChevronDown, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { RoleIcon } from "@/components/ui/RoleIcon";

const roles = [
  { id: "Todas", label: "Todas", icon: "🎮" },
  { id: "TOP", label: "Top" },
  { id: "JNG", label: "Jungle" },
  { id: "MID", label: "Mid" },
  { id: "ADC", label: "ADC" },
  { id: "SUP", label: "Support" },
];

const tiers = ["Todas", "S", "A", "B", "C", "D"];

type SortKey = "tier" | "winrate" | "pickRate" | "banRate";
type SortOrder = "asc" | "desc";

export default function Champions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("Todas");
  const [selectedTier, setSelectedTier] = useState("Todas");
  const [sortKey, setSortKey] = useState<SortKey>("tier");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("desc");
    }
  };

  const tierOrder: Record<string, number> = { S: 1, A: 2, B: 3, C: 4, D: 5 };

  const filteredChampions = mockTierListData
    .filter((champion) => {
      const matchesSearch = champion.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = selectedRole === "Todas" || champion.role === selectedRole;
      const matchesTier = selectedTier === "Todas" || champion.tier === selectedTier;
      return matchesSearch && matchesRole && matchesTier;
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortKey === "tier") {
        comparison = tierOrder[a.tier] - tierOrder[b.tier];
      } else {
        comparison = (b[sortKey] as number) - (a[sortKey] as number);
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const stats = {
    total: mockTierListData.length,
    sTier: mockTierListData.filter(c => c.tier === "S").length,
    avgWinrate: (mockTierListData.reduce((sum, c) => sum + c.winrate, 0) / mockTierListData.length).toFixed(1)
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] mesh-background">
      <div className="container py-6">
        {/* Dense Header */}
        <header className="mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-1">
                <span className="text-gradient-gold">Tier List</span> Season 2026
              </h1>
              <p className="text-sm text-muted-foreground">
                Patch 26.01 • {stats.total} campeões • Média WR: {stats.avgWinrate}%
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="glass-card px-4 py-2 flex items-center gap-2">
                <span className="text-xs text-muted-foreground">S-Tier:</span>
                <span className="text-sm font-bold text-primary">{stats.sTier}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Filters Bar - Dense */}
        <div className="glass-card p-4 mb-6 animate-fade-in-up delay-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar campeão..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full pl-10 pr-4 py-2 rounded-xl text-sm",
                  "bg-muted/50 border border-border/50",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:border-primary/50 transition-colors"
                )}
              />
            </div>

            {/* Role Filter - Icon Pills */}
            <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-xl">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    selectedRole === role.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {role.id === "Todas" ? (
                    <span>{role.icon}</span>
                  ) : (
                    <RoleIcon role={role.id} size="sm" className="gap-0" />
                  )}
                  <span className="hidden sm:inline">{role.label}</span>
                </button>
              ))}
            </div>

            {/* Tier Filter */}
            <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-xl">
              {tiers.map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    selectedTier === tier
                      ? tier === "S" 
                        ? "bg-gradient-to-r from-primary to-gold-glow text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table Header - Sort Controls */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs text-muted-foreground uppercase tracking-wider mb-2 animate-fade-in-up delay-150">
          <div className="col-span-1">#</div>
          <div className="col-span-4">Campeão</div>
          <div 
            className={cn("col-span-2 flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors", sortKey === "winrate" && "text-primary")}
            onClick={() => handleSort("winrate")}
          >
            Win Rate
            {sortKey === "winrate" && (sortOrder === "desc" ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />)}
          </div>
          <div 
            className={cn("col-span-2 flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors", sortKey === "pickRate" && "text-primary")}
            onClick={() => handleSort("pickRate")}
          >
            Pick Rate
            {sortKey === "pickRate" && (sortOrder === "desc" ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />)}
          </div>
          <div 
            className={cn("col-span-2 flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors", sortKey === "banRate" && "text-primary")}
            onClick={() => handleSort("banRate")}
          >
            Ban Rate
            {sortKey === "banRate" && (sortOrder === "desc" ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />)}
          </div>
          <div className="col-span-1 text-right">Trend</div>
        </div>

        {/* Champions List - Dense Table Style */}
        <div className="space-y-1.5">
          {filteredChampions.map((champion, index) => (
            <ChampionRow 
              key={champion.name} 
              champion={champion} 
              index={index}
              delay={0.15 + index * 0.02}
            />
          ))}
        </div>

        {filteredChampions.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-1">Nenhum campeão encontrado</h3>
            <p className="text-sm text-muted-foreground">Tente ajustar os filtros</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface ChampionRowProps {
  champion: {
    name: string;
    icon: string;
    tier: string;
    winrate: number;
    pickRate: number;
    banRate: number;
    role: string;
  };
  index: number;
  delay: number;
}

function ChampionRow({ champion, index, delay }: ChampionRowProps) {
  // Mock trend data
  const trend = champion.winrate > 51 ? "up" : champion.winrate < 49 ? "down" : "neutral";
  
  return (
    <div 
      className={cn(
        "glass-card p-3 grid grid-cols-12 gap-4 items-center transition-all",
        "hover:scale-[1.01] hover:-translate-y-0.5 cursor-pointer group",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Rank Number */}
      <div className="col-span-1 text-sm font-bold text-muted-foreground">
        #{index + 1}
      </div>

      {/* Champion Info */}
      <div className="col-span-6 md:col-span-4 flex items-center gap-3">
        <div className="relative">
          <img 
            src={champion.icon} 
            alt={champion.name}
            className="w-11 h-11 rounded-xl border border-border/50 group-hover:border-primary/50 transition-colors"
          />
          <TierBadge 
            tier={champion.tier as "S" | "A" | "B" | "C" | "D"} 
            className="absolute -top-1 -right-1 scale-75"
          />
        </div>
        <div>
          <h3 className="font-semibold text-foreground text-sm">{champion.name}</h3>
          <div className="flex items-center gap-1.5">
            <RoleIcon role={champion.role} size="sm" className="gap-0" />
            <span className="text-[10px] text-muted-foreground uppercase">{champion.role}</span>
          </div>
        </div>
      </div>

      {/* Win Rate */}
      <div className="hidden md:flex col-span-2 items-center gap-2">
        <div className="flex-1">
          <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                champion.winrate >= 52 ? "bg-success" : champion.winrate >= 50 ? "bg-primary" : "bg-destructive"
              )}
              style={{ width: `${Math.min(champion.winrate, 100)}%` }}
            />
          </div>
        </div>
        <span className={cn(
          "text-sm font-bold tabular-nums min-w-[45px] text-right",
          champion.winrate >= 52 ? "text-success" : champion.winrate >= 50 ? "text-foreground" : "text-destructive"
        )}>
          {champion.winrate}%
        </span>
      </div>

      {/* Pick Rate */}
      <div className="hidden md:flex col-span-2 items-center gap-2">
        <div className="flex-1">
          <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
            <div 
              className="h-full rounded-full bg-accent/70 transition-all duration-500"
              style={{ width: `${Math.min(champion.pickRate * 3, 100)}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-medium tabular-nums text-muted-foreground min-w-[45px] text-right">
          {champion.pickRate}%
        </span>
      </div>

      {/* Ban Rate */}
      <div className="hidden md:flex col-span-2 items-center gap-2">
        <div className="flex-1">
          <div className="h-1.5 rounded-full bg-muted/50 overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500",
                champion.banRate >= 15 ? "bg-destructive" : "bg-muted-foreground/50"
              )}
              style={{ width: `${Math.min(champion.banRate * 2.5, 100)}%` }}
            />
          </div>
        </div>
        <span className={cn(
          "text-sm font-medium tabular-nums min-w-[45px] text-right",
          champion.banRate >= 15 ? "text-destructive" : "text-muted-foreground"
        )}>
          {champion.banRate}%
        </span>
      </div>

      {/* Trend */}
      <div className="col-span-5 md:col-span-1 flex justify-end">
        <div className={cn(
          "w-7 h-7 rounded-lg flex items-center justify-center",
          trend === "up" && "bg-success/10 text-success",
          trend === "down" && "bg-destructive/10 text-destructive",
          trend === "neutral" && "bg-muted/50 text-muted-foreground"
        )}>
          {trend === "up" && <TrendingUp className="w-4 h-4" />}
          {trend === "down" && <TrendingDown className="w-4 h-4" />}
          {trend === "neutral" && <Minus className="w-4 h-4" />}
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="col-span-12 md:hidden flex items-center gap-4 text-xs pt-2 border-t border-border/30">
        <div>
          <span className="text-muted-foreground">WR: </span>
          <span className={cn(
            "font-bold",
            champion.winrate >= 52 ? "text-success" : "text-foreground"
          )}>
            {champion.winrate}%
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Pick: </span>
          <span className="font-medium">{champion.pickRate}%</span>
        </div>
        <div>
          <span className="text-muted-foreground">Ban: </span>
          <span className={cn(
            "font-medium",
            champion.banRate >= 15 && "text-destructive"
          )}>
            {champion.banRate}%
          </span>
        </div>
      </div>
    </div>
  );
}
