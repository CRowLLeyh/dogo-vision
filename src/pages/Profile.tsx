import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar } from "@/components/ui/PlayerAvatar";
import { RankCard } from "@/components/RankCard";
import { StatCard } from "@/components/ui/StatCard";
import { ChampionCard } from "@/components/ChampionCard";
import { MatchCard } from "@/components/MatchCard";
import { ProfileSkeleton } from "@/components/SkeletonLoaders";
import { mockPlayerData } from "@/lib/mockData";
import { RefreshCw, Target, Crosshair, Eye, Flame, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

type PlayerData = typeof mockPlayerData;

export default function Profile() {
  const { summonerName } = useParams<{ summonerName: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setPlayerData(mockPlayerData);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [summonerName]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPlayerData(mockPlayerData);
      setIsLoading(false);
    }, 1000);
  };

  if (isLoading) {
    return (
      <div className="container py-8">
        <ProfileSkeleton />
      </div>
    );
  }

  if (!playerData) {
    return (
      <div className="container py-20 text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Jogador não encontrado</h2>
        <p className="text-muted-foreground">Verifique o nome e a tag do jogador</p>
      </div>
    );
  }

  const { profile, ranks, stats, topChampions, recentMatches } = playerData;

  const kdaColorClass = stats.avgKDA >= 4 
    ? "text-success" 
    : stats.avgKDA >= 3 
      ? "text-primary" 
      : "text-muted-foreground";

  return (
    <div className="container py-8">
      {/* Profile Header */}
      <section className="mb-8 animate-fade-in">
        <div className="flex items-center gap-6">
          <Avatar 
            src={profile.profileIconUrl}
            alt={profile.gameName}
            size="xl"
            level={profile.level}
          />
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
              {profile.gameName}
              <span className="text-muted-foreground font-normal">#{profile.tagLine}</span>
            </h1>
            <p className="text-muted-foreground">
              Nível {profile.level} • {stats.totalGames} partidas jogadas
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary 
                       rounded-xl font-medium text-sm transition-all duration-300
                       hover:bg-primary/20 hover:scale-105 active:scale-95"
          >
            <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
            <span className="hidden sm:inline">Atualizar</span>
          </button>
        </div>
      </section>

      {/* Rank Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <RankCard
            queueType="solo"
            tier={ranks.solo.tier}
            division={ranks.solo.division}
            lp={ranks.solo.lp}
            wins={ranks.solo.wins}
            losses={ranks.solo.losses}
            winrate={ranks.solo.winrate}
          />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
          <RankCard
            queueType="flex"
            tier={ranks.flex.tier}
            division={ranks.flex.division}
            lp={ranks.flex.lp}
            wins={ranks.flex.wins}
            losses={ranks.flex.losses}
            winrate={ranks.flex.winrate}
          />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <StatCard
            label="KDA Médio"
            value={stats.avgKDA.toFixed(2)}
            icon={Target}
            color={stats.avgKDA >= 3 ? "green" : stats.avgKDA >= 2 ? "gold" : "red"}
          />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
          <StatCard
            label="CS/min"
            value={stats.avgCS.toFixed(1)}
            icon={Crosshair}
            color="blue"
          />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
          <StatCard
            label="Win Streak"
            value={stats.recentWinstreak}
            icon={Flame}
            color="gold"
          />
        </div>
        <div className="animate-fade-in-up" style={{ animationDelay: "0.35s" }}>
          <StatCard
            label="Últimas 20"
            value={`${stats.last20.wins}W ${stats.last20.losses}L`}
            icon={TrendingUp}
            color={stats.last20.wins > stats.last20.losses ? "green" : "red"}
          />
        </div>
      </section>

      {/* Top Champions */}
      <section className="mb-8">
        <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Campeões Mais Jogados
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topChampions.map((champion, index) => (
            <div 
              key={champion.name} 
              className="animate-fade-in-up" 
              style={{ animationDelay: `${0.4 + index * 0.05}s` }}
            >
              <ChampionCard {...champion} />
            </div>
          ))}
        </div>
      </section>

      {/* Recent Matches */}
      <section>
        <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-accent rounded-full" />
          Partidas Recentes
        </h2>
        <div className="space-y-3">
          {recentMatches.map((match, index) => (
            <div 
              key={match.matchId} 
              className="animate-fade-in-up" 
              style={{ animationDelay: `${0.5 + index * 0.05}s` }}
            >
              <MatchCard {...match} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
