import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockPlayerData } from "@/lib/mockData";
import { MatchHeader } from "@/components/match/MatchHeader";
import { DamageChart } from "@/components/match/DamageChart";
import { MatchTimeline, type TimelineEvent } from "@/components/match/MatchTimeline";
import { BuildOrder, SkillOrder, type BuildItem, type SkillLevel } from "@/components/match/BuildOrder";
import { MatchTeamsTable } from "@/components/match/MatchTeamsTable";
import { MatchDetailSkeleton } from "@/components/ui/ModernSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock timeline data
const mockTimelineEvents: TimelineEvent[] = [
  { timestamp: "02:15", type: "kill", description: "Primeira blood! Você eliminou ZedMain", team: "blue" },
  { timestamp: "05:30", type: "dragon", description: "Dragão Infernal conquistado", team: "blue" },
  { timestamp: "08:45", type: "tower", description: "Torre externa bot destruída", team: "blue" },
  { timestamp: "12:20", type: "death", description: "Você foi eliminado por TopDiff", team: "red" },
  { timestamp: "15:00", type: "dragon", description: "Dragão Montanha conquistado", team: "blue" },
  { timestamp: "18:30", type: "baron", description: "Barão Nashor conquistado", team: "blue" },
  { timestamp: "22:15", type: "kill", description: "Triple Kill! Você eliminou 3 inimigos", team: "blue" },
  { timestamp: "25:00", type: "tower", description: "Torre do Nexus destruída", team: "blue" },
  { timestamp: "28:30", type: "inhibitor", description: "Inibidor mid destruído", team: "blue" },
];

// Mock build order
const mockBuildOrder: BuildItem[] = [
  { itemId: 1055, timestamp: "01:30", name: "Long Sword" },
  { itemId: 3006, timestamp: "06:45", name: "Berserker's" },
  { itemId: 3031, timestamp: "12:20", name: "Infinity Edge" },
  { itemId: 3094, timestamp: "18:00", name: "Rapid Firecannon" },
  { itemId: 3072, timestamp: "24:15", name: "Bloodthirster" },
  { itemId: 3036, timestamp: "28:00", name: "Lord Dominik's" },
];

// Mock skill order
const mockSkillOrder: SkillLevel[] = [
  { level: 1, skill: "Q" },
  { level: 2, skill: "W" },
  { level: 3, skill: "E" },
  { level: 4, skill: "Q" },
  { level: 5, skill: "Q" },
  { level: 6, skill: "R" },
  { level: 7, skill: "Q" },
  { level: 8, skill: "W" },
  { level: 9, skill: "Q" },
  { level: 10, skill: "W" },
  { level: 11, skill: "R" },
  { level: 12, skill: "W" },
  { level: 13, skill: "W" },
  { level: 14, skill: "E" },
  { level: 15, skill: "E" },
  { level: 16, skill: "R" },
  { level: 17, skill: "E" },
  { level: 18, skill: "E" },
];

export default function MatchDetail() {
  const { matchId } = useParams<{ matchId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [matchData, setMatchData] = useState<typeof mockPlayerData.recentMatches[0] | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const match = mockPlayerData.recentMatches.find(m => m.matchId === matchId);
      setMatchData(match || mockPlayerData.recentMatches[0]);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [matchId]);

  if (isLoading) {
    return (
      <div className="min-h-screen mesh-background">
        <div className="container py-8">
          <MatchDetailSkeleton />
        </div>
      </div>
    );
  }

  if (!matchData) {
    return (
      <div className="min-h-screen mesh-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-foreground mb-2">
            Partida não encontrada
          </h2>
          <Link to="/" className="text-primary hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mesh-background">
      <div className="container py-6 space-y-5">
        {/* Back Button */}
        <Link
          to={`/profile/${mockPlayerData.profile.gameName}`}
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-xl",
            "bg-secondary/50 text-muted-foreground hover:text-foreground",
            "transition-all hover:bg-secondary/80 animate-fade-in"
          )}
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Perfil
        </Link>

        {/* Match Header (compact + Blitz-like) */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.08s" }}>
          <MatchHeader
            win={matchData.win}
            champion={matchData.champion}
            championIcon={matchData.championIcon}
            gameMode={matchData.gameMode}
            duration={matchData.duration}
            timeAgo={matchData.timeAgo}
            kills={matchData.kills}
            deaths={matchData.deaths}
            assists={matchData.assists}
            cs={matchData.cs}
            damage={matchData.damage || 0}
            visionScore={matchData.visionScore || 0}
            goldEarned={matchData.goldEarned || 0}
            killParticipation={matchData.killParticipation || 0}
            keystone={matchData.keystone}
            summonerSpells={matchData.summonerSpells}
            largestMultikill={matchData.largestMultikill}
            isMvp={matchData.isMvp}
          />
        </div>

        {/* Blitz-like Tabs */}
        <Tabs defaultValue="overview" className="animate-fade-in-up" style={{ animationDelay: "0.12s" }}>
          <TabsList className="w-full justify-start bg-muted/20 border border-border/40 rounded-2xl p-1.5">
            <TabsTrigger value="overview" className="rounded-xl">Visão geral</TabsTrigger>
            <TabsTrigger value="stats" className="rounded-xl">Estatísticas</TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-xl">Linha do tempo</TabsTrigger>
            <TabsTrigger value="gold" className="rounded-xl">Gráfico de ouro</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4">
            <div className="space-y-6">
              <MatchTeamsTable
                blueTeam={matchData.blueTeam || []}
                redTeam={matchData.redTeam || []}
                currentPlayer="EtoH"
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BuildOrder items={mockBuildOrder} />
                <SkillOrder skills={mockSkillOrder} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="mt-4">
            <div className="space-y-6">
              <DamageChart
                blueTeam={matchData.blueTeam || []}
                redTeam={matchData.redTeam || []}
                currentPlayer="EtoH"
              />
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="mt-4">
            <MatchTimeline events={mockTimelineEvents} duration={matchData.duration} />
          </TabsContent>

          <TabsContent value="gold" className="mt-4">
            <div className="bento-card p-6">
              <h2 className="text-lg font-display font-bold text-foreground mb-2">Gráfico de Ouro</h2>
              <p className="text-sm text-muted-foreground">
                Em breve: diferença de ouro ao longo do tempo (vamos plugar nesse mock depois).
              </p>
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </div>
  );
}
