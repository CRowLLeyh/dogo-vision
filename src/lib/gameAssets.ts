// League of Legends Data Dragon CDN URLs - Season 2026
const DDRAGON_VERSION = "14.1.1";
const DDRAGON_CDN = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

// Base URLs
export const CHAMPION_ICON_URL = `${DDRAGON_CDN}/img/champion/`;
export const ITEM_ICON_URL = `${DDRAGON_CDN}/img/item/`;
export const SPELL_ICON_URL = `${DDRAGON_CDN}/img/spell/`;
export const PROFILE_ICON_URL = `${DDRAGON_CDN}/img/profileicon/`;
export const RUNE_ICON_URL = "https://ddragon.leagueoflegends.com/cdn/img/";

// Game Mode Icons - CDN + fallback
// Using CommunityDragon for up-to-date League client assets.
// If an iconUrl breaks, the UI falls back to the emoji icon.
export const GAME_MODE_ICONS: Record<
  string,
  { icon: string; iconUrl?: string; label: string; color: string }
> = {
  "Ranked Solo": {
    icon: "⚔️",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/classic_sru/img/game-select-icon-default.png",
    label: "Ranked Solo/Duo",
    color: "from-gold to-gold-glow",
  },
  "Ranked Flex": {
    icon: "👥",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/classic_sru/img/game-select-icon-default.png",
    label: "Ranked Flex",
    color: "from-emerald-500 to-emerald-400",
  },
  "ARAM": {
    icon: "❄️",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/howling_abyss/img/game-select-icon-default.png",
    label: "ARAM",
    color: "from-blue-500 to-cyan-400",
  },
  "Arena": {
    icon: "🏟️",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/cherry/img/game-select-icon-default.png",
    label: "Arena 2v2v2v2",
    color: "from-purple-500 to-pink-400",
  },
  "URF": {
    icon: "🐟",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/urf/img/game-select-icon-default.png",
    label: "Ultra Rapid Fire",
    color: "from-yellow-500 to-orange-400",
  },
  "Normal Draft": {
    icon: "📋",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/classic_sru/img/game-select-icon-default.png",
    label: "Normal Draft",
    color: "from-slate-500 to-slate-400",
  },
  "Normal Blind": {
    icon: "👁️",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/classic_sru/img/game-select-icon-default.png",
    label: "Normal Blind",
    color: "from-slate-600 to-slate-500",
  },
  "Clash": {
    icon: "🏆",
    label: "Clash",
    color: "from-red-500 to-orange-500",
  },
  "One for All": {
    icon: "🎭",
    label: "One for All",
    color: "from-indigo-500 to-purple-400",
  },
  "Nexus Blitz": {
    icon: "⚡",
    label: "Nexus Blitz",
    color: "from-teal-500 to-green-400",
  },
  "TFT": {
    icon: "♟️",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/gamemodeassets/tft/img/game-select-icon-active.png",
    label: "TFT Ranked",
    color: "from-violet-500 to-indigo-400",
  },
};

// Summoner Spell mapping
export const SUMMONER_SPELLS: Record<string, string> = {
  "Flash": "SummonerFlash",
  "Heal": "SummonerHeal",
  "Ignite": "SummonerDot",
  "Barrier": "SummonerBarrier",
  "Exhaust": "SummonerExhaust",
  "Ghost": "SummonerHaste",
  "Teleport": "SummonerTeleport",
  "Cleanse": "SummonerBoost",
  "Smite": "SummonerSmite",
  "Mark": "SummonerSnowball"
};

// Rank emblems - CDN placeholders
export const RANK_EMBLEMS: Record<string, string> = {
  IRON: `${DDRAGON_CDN}/img/ranked-emblem/IRON.png`,
  BRONZE: `${DDRAGON_CDN}/img/ranked-emblem/BRONZE.png`,
  SILVER: `${DDRAGON_CDN}/img/ranked-emblem/SILVER.png`,
  GOLD: `${DDRAGON_CDN}/img/ranked-emblem/GOLD.png`,
  PLATINUM: `${DDRAGON_CDN}/img/ranked-emblem/PLATINUM.png`,
  EMERALD: `${DDRAGON_CDN}/img/ranked-emblem/EMERALD.png`,
  DIAMOND: `${DDRAGON_CDN}/img/ranked-emblem/DIAMOND.png`,
  MASTER: `${DDRAGON_CDN}/img/ranked-emblem/MASTER.png`,
  GRANDMASTER: `${DDRAGON_CDN}/img/ranked-emblem/GRANDMASTER.png`,
  CHALLENGER: `${DDRAGON_CDN}/img/ranked-emblem/CHALLENGER.png`,
};

// Role icons - CDN + fallback
// Using CommunityDragon lobby/party position icons.
export const ROLE_ICONS: Record<
  string,
  { icon: string; iconUrl?: string; label: string }
> = {
  TOP: {
    icon: "🛡️",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-top.png",
    label: "Topo",
  },
  JNG: {
    icon: "🌲",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-jungle.png",
    label: "Selva",
  },
  MID: {
    icon: "⚡",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-middle.png",
    label: "Meio",
  },
  ADC: {
    icon: "🎯",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-bottom.png",
    label: "Atirador",
  },
  BOTTOM: {
    icon: "🎯",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-bottom.png",
    label: "Atirador",
  },
  SUP: {
    icon: "💫",
    iconUrl:
      "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-parties/global/default/icon-position-utility.png",
    label: "Suporte",
  },
};

// Keystone runes
export const KEYSTONE_ICONS: Record<string, { icon: string; tree: string }> = {
  "Lethal Tempo": { icon: "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png", tree: "Precision" },
  "Fleet Footwork": { icon: "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png", tree: "Precision" },
  "Conqueror": { icon: "perk-images/Styles/Precision/Conqueror/Conqueror.png", tree: "Precision" },
  "Press the Attack": { icon: "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png", tree: "Precision" },
  "Hail of Blades": { icon: "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png", tree: "Domination" },
  "Electrocute": { icon: "perk-images/Styles/Domination/Electrocute/Electrocute.png", tree: "Domination" },
  "Dark Harvest": { icon: "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png", tree: "Domination" },
  "Summon Aery": { icon: "perk-images/Styles/Sorcery/SummonAery/SummonAery.png", tree: "Sorcery" },
  "Arcane Comet": { icon: "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png", tree: "Sorcery" },
  "Phase Rush": { icon: "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png", tree: "Sorcery" },
  "Grasp of the Undying": { icon: "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png", tree: "Resolve" },
  "Aftershock": { icon: "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png", tree: "Resolve" },
  "Guardian": { icon: "perk-images/Styles/Resolve/Guardian/Guardian.png", tree: "Resolve" },
  "Glacial Augment": { icon: "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png", tree: "Inspiration" },
  "First Strike": { icon: "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png", tree: "Inspiration" },
};

// Rune trees (para árvore secundária)
export const RUNE_TREE_ICONS: Record<string, string> = {
  Precision: "perk-images/Styles/Precision/Precision.png",
  Domination: "perk-images/Styles/Domination/Domination.png",
  Sorcery: "perk-images/Styles/Sorcery/Sorcery.png",
  Resolve: "perk-images/Styles/Resolve/Resolve.png",
  Inspiration: "perk-images/Styles/Inspiration/Inspiration.png",
};
// Helper functions
export function getChampionIcon(championName: string): string {
  return `${CHAMPION_ICON_URL}${championName.replace(/['\s]/g, "")}.png`;
}

export function getItemIcon(itemId: number): string {
  return `${ITEM_ICON_URL}${itemId}.png`;
}

export function getSpellIcon(spellName: string): string {
  const spellKey = SUMMONER_SPELLS[spellName] || spellName;
  return `${SPELL_ICON_URL}${spellKey}.png`;
}

export function getGameModeInfo(gameMode: string) {
  return GAME_MODE_ICONS[gameMode] || GAME_MODE_ICONS["Normal Draft"];
}

export function getRoleInfo(role: string) {
  return ROLE_ICONS[role] || ROLE_ICONS.MID;
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Rank tier translation to Portuguese
const RANK_TRANSLATION: Record<string, string> = {
  IRON: "Ferro",
  BRONZE: "Bronze",
  SILVER: "Prata",
  GOLD: "Ouro",
  PLATINUM: "Platina",
  EMERALD: "Esmeralda",
  DIAMOND: "Diamante",
  MASTER: "Mestre",
  GRANDMASTER: "Grão-Mestre",
  CHALLENGER: "Desafiante",
};

export function translateRank(tier: string): string {
  return RANK_TRANSLATION[tier.toUpperCase()] || tier;
}
