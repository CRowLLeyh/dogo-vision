import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { mockPlayerData, mockTierListData } from "@/lib/mockData";
import { ProfileSkeleton } from "@/components/SkeletonLoaders";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  RefreshCw,
  Target,
  Crosshair,
  Eye,
  Flame,
  TrendingUp,
  ChevronRight,
  Trophy,
  Sword,
  Shield,
  Users,
  Clock,
  BarChart2,
  Star,
  Zap,
} from "lucide-react";
import { WinrateBar } from "@/components/ui/WinrateBar";
import { KDADisplay } from "@/components/ui/KDADisplay";
import { MiniChart } from "@/components/ui/MiniChart";
import { GameModeIcon } from "@/components/ui/GameModeIcon";
import { RoleIcon } from "@/components/ui/RoleIcon";
import { getRankEmblemUrl } from "@/components/ui/RankBadge";
import { getRoleInfo, translateRank } from "@/lib/gameAssets";

// Helper to get translated role label
function getRoleLabel(role: string): string {
  return getRoleInfo(role).label;
}

// Helper to format rank display
function formatRank(tier: string, division: string): string {
  return `${translateRank(tier)} ${division}`;
}

type PlayerData = typeof mockPlayerData;

export default function Profile() {
  const { summonerName } = useParams<{ summonerName: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setPlayerData(mockPlayerData);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [summonerName]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setPlayerData(mockPlayerData);
      setIsLoading(false);
    }, 600);
  };

  if (isLoading) {
    return (
      <div className="container py-6">
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

  // Mock performance data
  const last7Games = [1, 0, 1, 1, 0, 1, 1]; // 1 = win, 0 = loss
  const kdaHistory = [2.8, 3.2, 1.9, 4.1, 2.5, 3.8, 2.2];

  return (
    <div className="min-h-[calc(100vh-4rem)] mesh-background">
      <div className="container py-6">
        {/* Dense Profile Header - Blitz/Mobalytics Style */}
        <section className="mb-6 animate-fade-in">
          <div className="bento-card p-0 overflow-hidden">
            {/* Gradient Banner */}
            <div className="h-16 bg-gradient-to-r from-primary/20 via-accent/10 to-transparent relative">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-5" />
            </div>
            
            <div className="px-6 pb-6 -mt-8">
              <div className="flex flex-col md:flex-row md:items-end gap-4">
                {/* Avatar */}
                <div className="relative">
                  <img 
                    src={profile.profileIconUrl}
                    alt={profile.gameName}
                    className="w-20 h-20 rounded-2xl border-4 border-background shadow-lg"
                  />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-2 py-0.5 rounded-md text-xs font-bold">
                    {profile.level}
                  </div>
                </div>
                
                {/* Name & Quick Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h1 className="text-2xl font-display font-bold text-foreground">
                      {profile.gameName}
                      <span className="text-muted-foreground font-normal">#{profile.tagLine}</span>
                    </h1>
                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-xs font-semibold",
                      `rank-${ranks.solo.tier.toLowerCase()}`
                    )}>
                      {formatRank(ranks.solo.tier, ranks.solo.division)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      {stats.totalGames} jogos
                    </span>
                    <span className="flex items-center gap-1">
                      <RoleIcon role={stats.mostPlayedRole} size="sm" className="gap-0" />
                      {getRoleLabel(stats.mostPlayedRole)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3 h-3 text-primary" />
                      {stats.recentWinstreak} vitórias seguidas
                    </span>
                  </div>
                </div>

                {/* Refresh Button */}
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all",
                    "bg-primary/10 text-primary hover:bg-primary/20 active:scale-95",
                    "disabled:opacity-50"
                  )}
                >
                  <RefreshCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
                  Atualizar
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Layout - Dense Pro Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Ranked Solo Card */}
          <div className="bento-card animate-fade-in-up delay-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Solo/Duo</span>
              <span className="text-xs text-accent">{ranks.solo.lp} LP</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "w-16 h-16 rounded-xl flex items-center justify-center",
                        "bg-muted/30 border border-border/50"
                      )}
                    >
                      <div className="w-14 h-14 overflow-hidden">
                        <img
                          src={getRankEmblemUrl(ranks.solo.tier)}
                          alt={`Emblema ${translateRank(ranks.solo.tier)}`}
                          loading="lazy"
                          className="w-full h-full object-cover scale-[1.78] origin-center"
                        />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center">
                    <div className="space-y-0.5">
                      <p className="font-semibold">{formatRank(ranks.solo.tier, ranks.solo.division)}</p>
                      <p className="text-xs text-muted-foreground">{ranks.solo.lp} LP</p>
                      <p className="text-xs text-muted-foreground">{ranks.solo.wins}V {ranks.solo.losses}D</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div>
                <p className="text-lg font-bold text-foreground">{formatRank(ranks.solo.tier, ranks.solo.division)}</p>
                <p className="text-xs text-muted-foreground">{ranks.solo.wins}V {ranks.solo.losses}D</p>
              </div>
            </div>
            <WinrateBar 
              wins={ranks.solo.wins} 
              losses={ranks.solo.losses} 
              winrate={ranks.solo.winrate}
              size="sm"
            />
          </div>

          {/* Ranked Flex Card */}
          <div className="bento-card animate-fade-in-up delay-150">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Flex 5v5</span>
              <span className="text-xs text-success">{ranks.flex.lp} LP</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "w-16 h-16 rounded-xl flex items-center justify-center",
                        "bg-muted/30 border border-border/50"
                      )}
                    >
                      <div className="w-14 h-14 overflow-hidden">
                        <img
                          src={getRankEmblemUrl(ranks.flex.tier)}
                          alt={`Emblema ${translateRank(ranks.flex.tier)}`}
                          loading="lazy"
                          className="w-full h-full object-cover scale-[1.78] origin-center"
                        />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center">
                    <div className="space-y-0.5">
                      <p className="font-semibold">{formatRank(ranks.flex.tier, ranks.flex.division)}</p>
                      <p className="text-xs text-muted-foreground">{ranks.flex.lp} LP</p>
                      <p className="text-xs text-muted-foreground">{ranks.flex.wins}V {ranks.flex.losses}D</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <div>
                <p className="text-lg font-bold text-foreground">{formatRank(ranks.flex.tier, ranks.flex.division)}</p>
                <p className="text-xs text-muted-foreground">{ranks.flex.wins}V {ranks.flex.losses}D</p>
              </div>
            </div>
            <WinrateBar 
              wins={ranks.flex.wins} 
              losses={ranks.flex.losses} 
              winrate={ranks.flex.winrate}
              size="sm"
            />
          </div>

          {/* Quick Stats - Compact */}
          <div className="bento-card animate-fade-in-up delay-200">
            <div className="flex items-center gap-2 mb-3">
              <BarChart2 className="w-4 h-4 text-primary" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Performance</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className={cn(
                  "text-xl font-bold",
                  stats.avgKDA >= 3 ? "text-success" : "text-foreground"
                )}>
                  {stats.avgKDA.toFixed(2)}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase">KDA Médio</p>
              </div>
              <div>
                <p className="text-xl font-bold text-accent">{stats.avgCS.toFixed(1)}</p>
                <p className="text-[10px] text-muted-foreground uppercase">CS/min</p>
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stats.avgVision.toFixed(1)}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Visão/min</p>
              </div>
              <div>
                <p className="text-xl font-bold text-primary">{stats.recentWinstreak}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Win Streak</p>
              </div>
            </div>
          </div>

          {/* Recent Form */}
          <div className="bento-card animate-fade-in-up delay-250">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-success" />
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Últimas 20</span>
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl font-bold text-success">{stats.last20.wins}W</span>
              <span className="text-muted-foreground">/</span>
              <span className="text-2xl font-bold text-destructive">{stats.last20.losses}L</span>
            </div>
            <div className="flex gap-1">
              {last7Games.map((win, i) => (
                <div 
                  key={i}
                  className={cn(
                    "flex-1 h-6 rounded-md transition-all",
                    win ? "bg-success/80" : "bg-destructive/80"
                  )}
                />
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground mt-2 text-center">Últimos 7 jogos</p>
          </div>
        </div>

        {/* Top Champions - Horizontal Dense Cards */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Star className="w-4 h-4 text-primary" />
              Campeões Mais Jogados
            </h2>
            <span className="text-xs text-muted-foreground">{topChampions.length} campeões</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {topChampions.map((champ, i) => (
              <div 
                key={champ.name}
                className={cn(
                  "glass-card p-3 flex items-center gap-3 transition-all hover:scale-[1.02]",
                  "animate-fade-in-up cursor-pointer"
                )}
                style={{ animationDelay: `${0.3 + i * 0.05}s` }}
              >
                <div className="relative">
                  <img 
                    src={champ.icon}
                    alt={champ.name}
                    className="w-12 h-12 rounded-xl border border-border/50"
                  />
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold",
                    champ.masteryLevel >= 6 && "bg-gradient-to-br from-primary to-gold-glow text-primary-foreground",
                    champ.masteryLevel === 5 && "bg-red-500 text-white",
                    champ.masteryLevel < 5 && "bg-muted text-foreground"
                  )}>
                    {champ.masteryLevel}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{champ.name}</p>
                  <div className="flex items-center gap-2 text-[10px]">
                    <span className={cn(
                      "font-bold",
                      champ.winrate >= 55 ? "text-success" : "text-muted-foreground"
                    )}>
                      {champ.winrate}% WR
                    </span>
                    <span className="text-muted-foreground">{champ.gamesPlayed} jogos</span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className={cn(
                      "font-semibold",
                      champ.kda >= 3 ? "text-success" : ""
                    )}>
                      {champ.kda.toFixed(1)} KDA
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Matches - Compact Dense List */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              Partidas Recentes
            </h2>
            <Link to="/champions" className="text-xs text-primary hover:underline flex items-center gap-1">
              Ver histórico completo <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {recentMatches.slice(0, 5).map((match, i) => (
              <Link
                key={match.matchId}
                to={`/match/${match.matchId}`}
                className={cn(
                  "glass-card p-3 flex items-center gap-4 transition-all",
                  "hover:-translate-y-0.5 hover:shadow-lg group",
                  "animate-fade-in-up"
                )}
                style={{ animationDelay: `${0.4 + i * 0.05}s` }}
              >
                {/* Win/Loss Indicator */}
                <div className={cn(
                  "w-1 h-12 rounded-full",
                  match.win ? "bg-success" : "bg-destructive"
                )} />
                
                {/* Champion */}
                <img 
                  src={match.championIcon}
                  alt={match.champion}
                  className="w-10 h-10 rounded-xl border border-border/50"
                />
                
                {/* Game Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className={cn(
                        "text-xs font-semibold",
                        match.win ? "text-success" : "text-destructive"
                      )}
                    >
                      {match.win ? "Vitória" : "Derrota"}
                    </span>
                    <GameModeIcon mode={match.gameMode} size="sm" />
                    <span className="text-xs text-muted-foreground">{match.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <RoleIcon
                      role={mockTierListData.find((c) => c.name === match.champion)?.role ?? stats.mostPlayedRole}
                      size="sm"
                      className="gap-0"
                    />
                    <p className="text-sm font-medium text-foreground">{match.champion}</p>
                  </div>
                </div>

                {/* KDA */}
                <div className="hidden sm:block">
                  <KDADisplay 
                    kills={match.kills}
                    deaths={match.deaths}
                    assists={match.assists}
                    size="sm"
                    showRatio
                  />
                </div>

                {/* Stats */}
                <div className="hidden md:flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Sword className="w-3 h-3" />
                    {match.cs} <span className="text-[10px]">({match.csPerMin}/m)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-primary" />
                    {(match.damage / 1000).toFixed(1)}K
                  </div>
                </div>

                {/* Items Preview */}
                <div className="hidden lg:flex gap-0.5">
                  {match.items.filter(i => i > 0).slice(0, 4).map((item, idx) => (
                    <img 
                      key={idx}
                      src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/item/${item}.png`}
                      alt=""
                      className="w-6 h-6 rounded-md border border-border/30"
                    />
                  ))}
                </div>

                {/* Time & Arrow */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{match.timeAgo}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
