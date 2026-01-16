import { useState } from "react";
import { PlayerSearchCard } from "@/components/compare/PlayerSearchCard";
import { CompareStats } from "@/components/compare/CompareStats";
import { cn } from "@/lib/utils";
import { ArrowLeftRight, Trophy } from "lucide-react";

interface PlayerData {
  gameName: string;
  tagLine: string;
  level: number;
  profileIconUrl: string;
  tier: string;
  division: string;
}

export default function Compare() {
  const [player1, setPlayer1] = useState<PlayerData | null>(null);
  const [player2, setPlayer2] = useState<PlayerData | null>(null);

  const handleSwap = () => {
    const temp = player1;
    setPlayer1(player2);
    setPlayer2(temp);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] mesh-background">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent 
                            flex items-center justify-center shadow-lg">
              <Trophy className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-black mb-2">
            <span className="text-gradient-gold">Comparar</span>{" "}
            <span className="text-foreground">Jogadores</span>
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Compare estatísticas, performance e histórico de dois jogadores lado a lado
          </p>
        </div>

        {/* Player Selection */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 mb-8">
          <PlayerSearchCard 
            side="left"
            player={player1}
            onPlayerSelect={setPlayer1}
            className="animate-fade-in-up delay-100"
          />
          
          {/* Swap Button */}
          <div className="flex items-center justify-center lg:py-0 py-2">
            <button
              onClick={handleSwap}
              disabled={!player1 && !player2}
              className={cn(
                "p-4 rounded-2xl bg-card border border-border transition-all duration-300",
                "hover:bg-muted hover:border-primary/50 hover:scale-110",
                "disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-card"
              )}
            >
              <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <PlayerSearchCard 
            side="right"
            player={player2}
            onPlayerSelect={setPlayer2}
            className="animate-fade-in-up delay-200"
          />
        </div>

        {/* Comparison Stats */}
        <div className="animate-fade-in-up delay-300">
          <CompareStats player1={player1} player2={player2} />
        </div>
      </div>
    </div>
  );
}
