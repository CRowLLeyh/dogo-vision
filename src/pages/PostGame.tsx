import { useParams, useSearchParams } from "react-router-dom";
import { mockPostGameData } from "@/lib/postGameMockData";
import { PostGameHeader } from "@/components/postgame/PostGameHeader";
import { PostGameTeamTable } from "@/components/postgame/PostGameTeamTable";
import { PostGameTimeline } from "@/components/postgame/PostGameTimeline";
import { PostGameDamageChart } from "@/components/postgame/PostGameDamageChart";
import { PostGamePerformance } from "@/components/postgame/PostGamePerformance";
import { ArrowLeft, Share2, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PostGame() {
  const { matchId } = useParams();
  const [searchParams] = useSearchParams();
  const currentPlayer = searchParams.get("player") || "EtoH";

  // In a real app, fetch data based on matchId
  const data = mockPostGameData;

  const player = [...data.blueTeam, ...data.redTeam].find(p => p.summonerName === currentPlayer);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to={`/profile/${currentPlayer}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar ao Perfil</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="w-4 h-4" />
              Compartilhar
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Header with Result */}
          <PostGameHeader data={data} currentPlayer={currentPlayer} />

          {/* Performance Section */}
          {player && (
            <PostGamePerformance player={player} data={data} />
          )}

          {/* Damage Chart */}
          <PostGameDamageChart 
            blueTeam={data.blueTeam} 
            redTeam={data.redTeam} 
            currentPlayer={currentPlayer}
          />

          {/* Timeline */}
          <PostGameTimeline events={data.events} gameDuration={data.gameDuration} />

          {/* Teams Tables */}
          <div className="space-y-4">
            <PostGameTeamTable 
              team={data.blueTeam} 
              side="blue" 
              currentPlayer={currentPlayer}
              isWinner={data.winner === "blue"}
            />
            <PostGameTeamTable 
              team={data.redTeam} 
              side="red" 
              currentPlayer={currentPlayer}
              isWinner={data.winner === "red"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
