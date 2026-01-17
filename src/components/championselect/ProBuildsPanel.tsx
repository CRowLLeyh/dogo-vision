import { ProBuild, ChampionMeta } from "@/lib/championSelectMockData";
import { getItemIcon, getKeystoneIcon, getSpellIcon } from "@/lib/gameAssets";
import { motion } from "framer-motion";
import { Trophy, Clock, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProBuildsPanelProps {
  champion: ChampionMeta;
}

export function ProBuildsPanel({ champion }: ProBuildsPanelProps) {
  const [importedIndex, setImportedIndex] = useState<number | null>(null);

  const handleImport = (index: number) => {
    setImportedIndex(index);
    setTimeout(() => setImportedIndex(null), 2000);
  };

  if (champion.proBuilds.length === 0) {
    return (
      <div className="p-6 text-center text-muted-foreground bg-card border border-border rounded-xl">
        <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="font-medium">Nenhuma build de pro disponível</p>
        <p className="text-sm mt-1">Builds de jogadores profissionais aparecerão aqui</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
        <Trophy className="w-4 h-4 text-yellow-500" />
        Builds dos Prós
      </h3>

      {champion.proBuilds.map((build, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-4 bg-card border border-border rounded-xl"
        >
          {/* Pro Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center font-bold text-white">
                {build.proName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold">{build.proName}</p>
                <p className="text-xs text-muted-foreground">{build.team} • {build.region}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={cn(
                "px-2 py-1 rounded text-xs font-medium",
                build.result === "win" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
              )}>
                {build.kda}
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {build.date}
              </span>
            </div>
          </div>

          {/* Build Preview */}
          <div className="flex items-center gap-4 mb-3">
            {/* Runes */}
            <div className="flex items-center gap-1">
              <img
                src={getKeystoneIcon(build.runes.keystone)}
                alt={build.runes.keystone}
                className="w-8 h-8 rounded-full"
              />
            </div>

            {/* Spells */}
            <div className="flex items-center gap-1">
              <img
                src={getSpellIcon(build.spells.spell1)}
                alt={build.spells.spell1}
                className="w-6 h-6 rounded"
              />
              <img
                src={getSpellIcon(build.spells.spell2)}
                alt={build.spells.spell2}
                className="w-6 h-6 rounded"
              />
            </div>

            {/* Items */}
            <div className="flex items-center gap-1 flex-1">
              {build.items.slice(0, 6).map((itemId, i) => (
                <img
                  key={i}
                  src={getItemIcon(itemId)}
                  alt={`Item ${itemId}`}
                  className="w-7 h-7 rounded border border-border/50"
                />
              ))}
            </div>

            {/* Import Button */}
            <Button
              size="sm"
              variant={importedIndex === index ? "default" : "ghost"}
              className="gap-1"
              onClick={() => handleImport(index)}
            >
              {importedIndex === index ? (
                <>
                  <Check className="w-3 h-3" />
                  OK
                </>
              ) : (
                <>
                  <Download className="w-3 h-3" />
                  Usar
                </>
              )}
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
