import { Search, Radio, AlertCircle } from "lucide-react";
import { useState } from "react";
import { SearchInput } from "@/components/ui/SearchInput";
import { LiveGameView } from "@/components/live/LiveGameView";
import { mockLiveGameData } from "@/lib/liveGameMockData";

export default function LiveGame() {
  const [searchValue, setSearchValue] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isInGame, setIsInGame] = useState(false);
  const [searchedPlayer, setSearchedPlayer] = useState("");

  const handleSearch = (value: string) => {
    setHasSearched(true);
    // Simulate finding a player in game
    const playerName = value.split("#")[0].toLowerCase();
    const allPlayers = [...mockLiveGameData.blueTeam, ...mockLiveGameData.redTeam];
    const found = allPlayers.find((p) => p.summonerName.toLowerCase().includes(playerName));
    
    if (found) {
      setIsInGame(true);
      setSearchedPlayer(found.summonerName);
    } else {
      setIsInGame(false);
      setSearchedPlayer("");
    }
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="relative">
            <Radio className="w-6 h-6 text-accent" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success rounded-full animate-pulse" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            <span className="text-gradient-blue">Live Game</span>
          </h1>
        </div>
        <p className="text-muted-foreground">
          Veja informações em tempo real de partidas em andamento
        </p>
      </div>

      {/* Search */}
      <div className="max-w-xl mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <SearchInput
          value={searchValue}
          onChange={setSearchValue}
          onSearch={handleSearch}
          placeholder="Buscar jogador em partida..."
        />
        {!hasSearched && (
          <p className="text-xs text-muted-foreground mt-2">
            Experimente buscar: EtoH, MidDiff, ZedMain...
          </p>
        )}
      </div>

      {/* Content */}
      {hasSearched ? (
        isInGame ? (
          <LiveGameView data={mockLiveGameData} searchedPlayer={searchedPlayer} />
        ) : (
          // Not in game state
          <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
            <div className="glass-card p-8 text-center max-w-md">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Jogador não está em partida
              </h2>
              <p className="text-muted-foreground">
                Este jogador não está em uma partida ativa no momento. Tente novamente mais tarde.
              </p>
            </div>
          </div>
        )
      ) : (
        // Initial empty state
        <div className="flex flex-col items-center justify-center py-16 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="glass-card p-8 text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/50 flex items-center justify-center">
              <Radio className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Busque um jogador
            </h2>
            <p className="text-muted-foreground">
              Digite o nome de um jogador para ver informações da partida em andamento.
            </p>
          </div>

          {/* Feature Preview */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
            <FeaturePreview
              title="Ranks dos Jogadores"
              description="Veja o rank de todos os 10 jogadores"
            />
            <FeaturePreview
              title="Winrates"
              description="Taxa de vitória nos campeões escolhidos"
            />
            <FeaturePreview
              title="Estatísticas"
              description="KDA e performance recente"
            />
          </div>
        </div>
      )}
    </div>
  );
}

interface FeaturePreviewProps {
  title: string;
  description: string;
}

function FeaturePreview({ title, description }: FeaturePreviewProps) {
  return (
    <div className="glass-card p-4 text-center opacity-60">
      <h3 className="font-medium text-foreground mb-1 text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
