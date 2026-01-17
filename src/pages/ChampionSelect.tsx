import { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import { mockChampionsMeta, ChampionMeta, getChampionsByRole } from "@/lib/championSelectMockData";
import { RoleTabs } from "@/components/championselect/RoleTabs";
import { TierList } from "@/components/championselect/TierList";
import { ChampionBuildCard } from "@/components/championselect/ChampionBuildCard";
import { ProBuildsPanel } from "@/components/championselect/ProBuildsPanel";
import { EnemyCounterPicker } from "@/components/championselect/EnemyCounterPicker";
import { Search, Zap, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function ChampionSelect() {
  const [selectedRole, setSelectedRole] = useState("mid");
  const [selectedChampion, setSelectedChampion] = useState<ChampionMeta | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChampions = useMemo(() => {
    let champions = getChampionsByRole(selectedRole);
    
    if (searchQuery) {
      champions = mockChampionsMeta.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return champions;
  }, [selectedRole, searchQuery]);

  // Auto-select first S+ or S tier champion when role changes
  useMemo(() => {
    if (!searchQuery) {
      const topChampion = filteredChampions.find((c) => c.tier === "S+" || c.tier === "S");
      setSelectedChampion(topChampion || filteredChampions[0] || null);
    }
  }, [selectedRole, filteredChampions, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        className="container mx-auto px-4 py-6 max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Zap className="w-6 h-6 text-yellow-500" />
                Champion Select
              </h1>
              <p className="text-sm text-muted-foreground">
                Meta tier list • Builds • Runas
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar campeão..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Role Tabs */}
        <motion.div variants={itemVariants} className="mb-6">
          <RoleTabs selectedRole={selectedRole} onSelectRole={setSelectedRole} />
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Tier List + Enemy Counter */}
          <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
            {/* Tier List */}
            <div className="bg-card border border-border rounded-xl p-4">
              <h2 className="font-semibold mb-4 text-sm text-muted-foreground uppercase tracking-wide">
                Tier List - Patch 14.24
              </h2>
              <TierList
                champions={filteredChampions}
                selectedChampion={selectedChampion}
                onSelectChampion={setSelectedChampion}
              />
            </div>

            {/* Enemy Counter Picker */}
            <EnemyCounterPicker
              selectedRole={selectedRole}
              champions={filteredChampions}
              onSelectChampion={setSelectedChampion}
            />
          </motion.div>

          {/* Champion Build */}
          <motion.div variants={itemVariants} className="lg:col-span-7 space-y-6">
            {selectedChampion ? (
              <>
                <ChampionBuildCard champion={selectedChampion} />
                <ProBuildsPanel champion={selectedChampion} />

                {/* Counters & Synergies */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Counters */}
                  <div className="p-4 bg-card border border-border rounded-xl">
                    <h3 className="font-semibold text-sm text-red-400 mb-3 flex items-center gap-2">
                      {/* Custom Danger SVG Icon */}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                        <line x1="12" y1="9" x2="12" y2="13" />
                        <line x1="12" y1="17" x2="12.01" y2="17" />
                      </svg>
                      Cuidado contra
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {selectedChampion.counters.map((counter) => {
                        const counterChamp = mockChampionsMeta.find(
                          (c) => c.name === counter
                        );
                        return counterChamp ? (
                          <img
                            key={counter}
                            src={counterChamp.icon}
                            alt={counter}
                            title={counter}
                            className="w-10 h-10 rounded-lg border border-red-500/30 hover:scale-110 transition-transform cursor-pointer bg-muted"
                            onClick={() => setSelectedChampion(counterChamp)}
                          />
                        ) : (
                          <div
                            key={counter}
                            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs text-muted-foreground font-medium"
                          >
                            {counter.charAt(0)}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Synergies */}
                  <div className="p-4 bg-card border border-border rounded-xl">
                    <h3 className="font-semibold text-sm text-emerald-400 mb-3 flex items-center gap-2">
                      {/* Custom Checkmark SVG Icon */}
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Combina com
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {selectedChampion.synergies.map((synergy) => {
                        const synergyChamp = mockChampionsMeta.find(
                          (c) => c.name === synergy
                        );
                        return synergyChamp ? (
                          <img
                            key={synergy}
                            src={synergyChamp.icon}
                            alt={synergy}
                            title={synergy}
                            className="w-10 h-10 rounded-lg border border-emerald-500/30 hover:scale-110 transition-transform cursor-pointer"
                            onClick={() => setSelectedChampion(synergyChamp)}
                          />
                        ) : (
                          <div
                            key={synergy}
                            className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-xs"
                          >
                            {synergy.charAt(0)}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-12 text-center text-muted-foreground bg-card border border-border rounded-xl">
                <p>Selecione um campeão para ver builds e runas</p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
