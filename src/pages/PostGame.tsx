import { useParams, useSearchParams } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { mockPostGameData } from "@/lib/postGameMockData";
import { PostGameHeader } from "@/components/postgame/PostGameHeader";
import { PostGameTeamTable } from "@/components/postgame/PostGameTeamTable";
import { PostGameTimeline } from "@/components/postgame/PostGameTimeline";
import { PostGameDamageChart } from "@/components/postgame/PostGameDamageChart";
import { PostGamePerformance } from "@/components/postgame/PostGamePerformance";
import { ArrowLeft, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Animation variants for staggered reveal
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      mass: 0.8,
    },
  },
};

const headerVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: -20,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
    },
  },
};

export default function PostGame() {
  const { matchId } = useParams();
  const [searchParams] = useSearchParams();
  const currentPlayer = searchParams.get("player") || "EtoH";

  // In a real app, fetch data based on matchId
  const data = mockPostGameData;

  const player = [...data.blueTeam, ...data.redTeam].find(p => p.summonerName === currentPlayer);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <motion.div 
        className="container mx-auto px-4 py-6 max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Navigation */}
        <motion.div 
          className="flex items-center justify-between mb-6"
          variants={headerVariants}
        >
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
        </motion.div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Header with Result */}
          <motion.div variants={itemVariants}>
            <PostGameHeader data={data} currentPlayer={currentPlayer} />
          </motion.div>

          {/* Performance Section */}
          {player && (
            <motion.div variants={itemVariants}>
              <PostGamePerformance player={player} data={data} />
            </motion.div>
          )}

          {/* Damage Chart */}
          <motion.div variants={itemVariants}>
            <PostGameDamageChart 
              blueTeam={data.blueTeam} 
              redTeam={data.redTeam} 
              currentPlayer={currentPlayer}
            />
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants}>
            <PostGameTimeline events={data.events} gameDuration={data.gameDuration} />
          </motion.div>

          {/* Teams Tables */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <PostGameTeamTable 
              team={data.blueTeam} 
              side="blue" 
              currentPlayer={currentPlayer}
              isWinner={data.winner === "blue"}
            />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <PostGameTeamTable 
              team={data.redTeam} 
              side="red" 
              currentPlayer={currentPlayer}
              isWinner={data.winner === "red"}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
