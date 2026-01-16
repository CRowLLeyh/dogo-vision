import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SearchInput } from "@/components/ui/SearchInput";
import { RecentSearches } from "@/components/RecentSearches";
import { Swords, TrendingUp, Users, Zap } from "lucide-react";

const RECENT_SEARCHES_KEY = "dogo_recent_searches";
const MAX_RECENT_SEARCHES = 5;

export default function Index() {
  const [searchValue, setSearchValue] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
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
    saveRecentSearch(value);
    navigate(`/profile/${encodeURIComponent(value)}`);
  };

  const handleRemoveSearch = (search: string) => {
    const updated = recentSearches.filter(s => s !== search);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 grid-background opacity-50" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[128px] animate-float" style={{ animationDelay: "1.5s" }} />

      {/* Content */}
      <div className="relative z-10 container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-20">
        {/* Hero */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-gold-glow 
                            flex items-center justify-center shadow-[0_0_40px_-10px_hsl(var(--gold))]
                            animate-glow-pulse">
              <Swords className="w-9 h-9 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black mb-4 tracking-tight">
            <span className="text-gradient-gold">DOGO</span>{" "}
            <span className="text-foreground">STATS</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            Analise seu perfil de League of Legends com estatísticas detalhadas e visuais premium
          </p>
        </div>

        {/* Search */}
        <div className="w-full max-w-xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            placeholder="Buscar jogador... (Nome#TAG)"
          />
        </div>

        {/* Recent Searches */}
        <div className="w-full max-w-xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <RecentSearches
            searches={recentSearches}
            onSelect={handleSearch}
            onRemove={handleRemoveSearch}
          />
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-20 w-full max-w-4xl animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <FeatureCard 
            icon={TrendingUp}
            title="Estatísticas Detalhadas"
            description="KDA, CS/min, visão e muito mais"
          />
          <FeatureCard 
            icon={Users}
            title="Histórico Completo"
            description="Todas as suas partidas recentes"
          />
          <FeatureCard 
            icon={Zap}
            title="Análise em Tempo Real"
            description="Live game e tier list atualizada"
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
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="glass-card p-6 text-center transition-all duration-300 hover:scale-[1.02] hover-glow">
      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
