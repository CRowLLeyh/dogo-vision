import { useState } from "react";
import { TierBadge } from "@/components/TierBadge";
import { mockTierListData } from "@/lib/mockData";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const roles = ["Todas", "TOP", "JNG", "MID", "ADC", "SUP"];
const tiers = ["Todas", "S", "A", "B", "C", "D"];

export default function Champions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("Todas");
  const [selectedTier, setSelectedTier] = useState("Todas");

  const filteredChampions = mockTierListData.filter((champion) => {
    const matchesSearch = champion.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === "Todas" || champion.role === selectedRole;
    const matchesTier = selectedTier === "Todas" || champion.tier === selectedTier;
    return matchesSearch && matchesRole && matchesTier;
  });

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
          <span className="text-gradient-gold">Tier List</span>
        </h1>
        <p className="text-muted-foreground">
          Melhores campeões do patch atual organizados por tier
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar campeão..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-secondary/50 rounded-xl border border-border/50
                       text-foreground placeholder:text-muted-foreground
                       focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>

        {/* Role Filter */}
        <div className="flex gap-2 flex-wrap">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                selectedRole === role
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {role}
            </button>
          ))}
        </div>

        {/* Tier Filter */}
        <div className="flex gap-2">
          {tiers.map((tier) => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                selectedTier === tier
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Champions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredChampions.map((champion, index) => (
          <div 
            key={champion.name}
            className="animate-fade-in-up"
            style={{ animationDelay: `${0.1 + index * 0.03}s` }}
          >
            <ChampionTierCard {...champion} />
          </div>
        ))}
      </div>

      {filteredChampions.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">Nenhum campeão encontrado</p>
        </div>
      )}
    </div>
  );
}

interface ChampionTierCardProps {
  name: string;
  icon: string;
  tier: string;
  winrate: number;
  pickRate: number;
  banRate: number;
  role: string;
}

function ChampionTierCard({ name, icon, tier, winrate, pickRate, banRate, role }: ChampionTierCardProps) {
  return (
    <div className="glass-card p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover-glow">
      {/* Tier */}
      <TierBadge tier={tier as "S" | "A" | "B" | "C" | "D"} />
      
      {/* Champion Icon */}
      <img 
        src={icon} 
        alt={name}
        className="w-12 h-12 rounded-xl border border-border/50"
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground truncate">{name}</h3>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>

      {/* Stats */}
      <div className="flex gap-6 text-right text-sm">
        <div>
          <p className={cn(
            "font-bold",
            winrate >= 52 ? "text-success" : winrate >= 50 ? "text-foreground" : "text-destructive"
          )}>
            {winrate}%
          </p>
          <p className="text-xs text-muted-foreground">WR</p>
        </div>
        <div>
          <p className="font-bold text-foreground">{pickRate}%</p>
          <p className="text-xs text-muted-foreground">Pick</p>
        </div>
        <div>
          <p className={cn(
            "font-bold",
            banRate >= 15 ? "text-destructive" : "text-foreground"
          )}>
            {banRate}%
          </p>
          <p className="text-xs text-muted-foreground">Ban</p>
        </div>
      </div>
    </div>
  );
}
