import { ChampionMeta, ChampionItems } from "@/lib/championSelectMockData";
import { getItemIcon, getKeystoneIcon, getSecondaryTreeIcon, getSpellIcon } from "@/lib/gameAssets";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Users, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ChampionBuildCardProps {
  champion: ChampionMeta;
}

export function ChampionBuildCard({ champion }: ChampionBuildCardProps) {
  const [importedRunes, setImportedRunes] = useState(false);
  const [importedBuild, setImportedBuild] = useState(false);

  const mainRune = champion.runes[0];
  const mainBuild = champion.builds[0];
  const mainSpells = champion.spells[0];

  const handleImportRunes = () => {
    setImportedRunes(true);
    setTimeout(() => setImportedRunes(false), 2000);
  };

  const handleImportBuild = () => {
    setImportedBuild(true);
    setTimeout(() => setImportedBuild(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      {/* Champion Header */}
      <div className="p-4 border-b border-border bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-4">
          <img
            src={champion.icon}
            alt={champion.name}
            className="w-16 h-16 rounded-xl border-2 border-primary/30"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{champion.name}</h2>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Trophy className="w-4 h-4 text-yellow-500" />
                {champion.winRate}% WR
              </span>
              <span className="flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                {champion.pickRate}% Pick
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4 text-red-500" />
                {champion.banRate}% Ban
              </span>
            </div>
          </div>
          <div className={cn(
            "px-3 py-1.5 rounded-lg font-bold text-white",
            `bg-gradient-to-br ${champion.tier === "S+" ? "from-yellow-400 to-amber-500" : 
              champion.tier === "S" ? "from-orange-400 to-orange-500" : "from-emerald-400 to-emerald-500"}`
          )}>
            {champion.tier}
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Runes Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Runas Recomendadas
            </h3>
            <span className="text-xs text-emerald-400 font-medium">
              {mainRune.winRate}% WR • {mainRune.pickRate}% Pick
            </span>
          </div>
          
          <div className="flex items-center gap-4 p-3 bg-background/50 rounded-lg">
            {/* Primary Tree */}
            <div className="flex items-center gap-2">
              <img
                src={getKeystoneIcon(mainRune.keystone)}
                alt={mainRune.keystone}
                className="w-12 h-12 rounded-full border-2 border-primary/30"
              />
              <img
                src={getSecondaryTreeIcon(mainRune.secondaryTree)}
                alt={mainRune.secondaryTree}
                className="w-8 h-8 rounded-full opacity-80"
              />
            </div>
            
            {/* Rune Names */}
            <div className="flex-1">
              <p className="font-medium text-sm">{mainRune.keystone}</p>
              <p className="text-xs text-muted-foreground">
                {mainRune.primaryTree} + {mainRune.secondaryTree}
              </p>
            </div>

            {/* Import Button */}
            <Button
              size="sm"
              variant={importedRunes ? "default" : "outline"}
              className="gap-2"
              onClick={handleImportRunes}
            >
              {importedRunes ? (
                <>
                  <Check className="w-4 h-4" />
                  Importado!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Importar
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Summoner Spells */}
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
            Feitiços
          </h3>
          <div className="flex items-center gap-4 p-3 bg-background/50 rounded-lg">
            <div className="flex items-center gap-2">
              <img
                src={getSpellIcon(mainSpells.spell1)}
                alt={mainSpells.spell1}
                className="w-10 h-10 rounded-lg border border-border"
              />
              <img
                src={getSpellIcon(mainSpells.spell2)}
                alt={mainSpells.spell2}
                className="w-10 h-10 rounded-lg border border-border"
              />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">{mainSpells.spell1} + {mainSpells.spell2}</p>
              <p className="text-xs text-muted-foreground">
                {mainSpells.winRate}% WR • {mainSpells.pickRate}% Pick
              </p>
            </div>
          </div>
        </div>

        {/* Build Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Build Principal
            </h3>
            <span className="text-xs text-emerald-400 font-medium">
              {mainBuild.winRate}% WR
            </span>
          </div>

          {/* Starter Items */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Iniciais</p>
            <div className="flex items-center gap-2">
              {mainBuild.starter.map((itemId, i) => (
                <img
                  key={i}
                  src={getItemIcon(itemId)}
                  alt={`Item ${itemId}`}
                  className="w-8 h-8 rounded border border-border"
                />
              ))}
            </div>
          </div>

          {/* Core Items */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Core</p>
            <div className="flex items-center gap-2">
              <img
                src={getItemIcon(mainBuild.boots)}
                alt="Boots"
                className="w-10 h-10 rounded-lg border border-border"
              />
              {mainBuild.core.map((itemId, i) => (
                <img
                  key={i}
                  src={getItemIcon(itemId)}
                  alt={`Item ${itemId}`}
                  className="w-10 h-10 rounded-lg border border-border"
                />
              ))}
            </div>
          </div>

          {/* Situational Items */}
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">Situacionais</p>
            <div className="flex items-center gap-2">
              {mainBuild.situational.map((itemId, i) => (
                <img
                  key={i}
                  src={getItemIcon(itemId)}
                  alt={`Item ${itemId}`}
                  className="w-8 h-8 rounded border border-border opacity-70"
                />
              ))}
            </div>
          </div>

          {/* Import Build Button */}
          <Button
            variant={importedBuild ? "default" : "outline"}
            className="w-full gap-2 mt-2"
            onClick={handleImportBuild}
          >
            {importedBuild ? (
              <>
                <Check className="w-4 h-4" />
                Build Importada!
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Importar Build Completa
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
