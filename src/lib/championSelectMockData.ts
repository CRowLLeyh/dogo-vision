// Mock data for Champion Select page

export interface ChampionBuild {
  name: string;
  winRate: number;
  pickRate: number;
  games: number;
}

export interface ChampionRunes {
  keystone: string;
  primaryTree: string;
  secondaryTree: string;
  primaryRunes: string[];
  secondaryRunes: string[];
  statShards: [string, string, string];
  winRate: number;
  pickRate: number;
}

export interface ChampionSpells {
  spell1: string;
  spell2: string;
  winRate: number;
  pickRate: number;
}

export interface ChampionItems {
  starter: number[];
  core: number[];
  situational: number[];
  boots: number;
  winRate: number;
}

export interface ProBuild {
  proName: string;
  team: string;
  region: string;
  items: number[];
  runes: ChampionRunes;
  spells: ChampionSpells;
  kda: string;
  result: "win" | "loss";
  date: string;
}

export interface ChampionMeta {
  id: string;
  name: string;
  icon: string;
  role: "top" | "jungle" | "mid" | "adc" | "support";
  tier: "S+" | "S" | "A" | "B" | "C" | "D";
  winRate: number;
  pickRate: number;
  banRate: number;
  builds: ChampionItems[];
  runes: ChampionRunes[];
  spells: ChampionSpells[];
  proBuilds: ProBuild[];
  counters: string[];
  synergies: string[];
}

export const ROLES = [
  { id: "top", label: "Top", icon: "🛡️" },
  { id: "jungle", label: "Jungle", icon: "🌲" },
  { id: "mid", label: "Mid", icon: "⚡" },
  { id: "adc", label: "ADC", icon: "🎯" },
  { id: "support", label: "Suporte", icon: "💫" },
] as const;

export const TIER_COLORS: Record<string, string> = {
  "S+": "from-yellow-400 to-amber-500",
  "S": "from-orange-400 to-orange-500",
  "A": "from-emerald-400 to-emerald-500",
  "B": "from-blue-400 to-blue-500",
  "C": "from-slate-400 to-slate-500",
  "D": "from-red-400 to-red-500",
};

export const mockChampionsMeta: ChampionMeta[] = [
  // TOP
  {
    id: "ksante",
    name: "K'Sante",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/KSante.png",
    role: "top",
    tier: "S+",
    winRate: 52.4,
    pickRate: 12.8,
    banRate: 24.5,
    builds: [
      {
        starter: [1054, 2003],
        core: [6653, 3075, 3065],
        situational: [3742, 3143, 3053],
        boots: 3047,
        winRate: 53.2,
      },
    ],
    runes: [
      {
        keystone: "Grasp of the Undying",
        primaryTree: "Resolve",
        secondaryTree: "Precision",
        primaryRunes: ["Demolish", "Second Wind", "Overgrowth"],
        secondaryRunes: ["Legend: Tenacity", "Last Stand"],
        statShards: ["Attack Speed", "Adaptive Force", "Health"],
        winRate: 53.8,
        pickRate: 78.2,
      },
    ],
    spells: [{ spell1: "Flash", spell2: "Teleport", winRate: 52.4, pickRate: 92.1 }],
    proBuilds: [
      {
        proName: "Zeus",
        team: "T1",
        region: "LCK",
        items: [6653, 3075, 3065, 3742, 3047, 3143],
        runes: {
          keystone: "Grasp of the Undying",
          primaryTree: "Resolve",
          secondaryTree: "Precision",
          primaryRunes: ["Demolish", "Second Wind", "Overgrowth"],
          secondaryRunes: ["Legend: Tenacity", "Last Stand"],
          statShards: ["Attack Speed", "Adaptive Force", "Health"],
          winRate: 53.8,
          pickRate: 78.2,
        },
        spells: { spell1: "Flash", spell2: "Teleport", winRate: 52.4, pickRate: 92.1 },
        kda: "5/2/8",
        result: "win",
        date: "2h atrás",
      },
    ],
    counters: ["Fiora", "Vayne", "Gwen"],
    synergies: ["Jarvan IV", "Orianna", "Jinx"],
  },
  {
    id: "ambessa",
    name: "Ambessa",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ambessa.png",
    role: "top",
    tier: "S",
    winRate: 51.8,
    pickRate: 15.2,
    banRate: 32.1,
    builds: [
      {
        starter: [1055, 2003],
        core: [6632, 3071, 3053],
        situational: [3156, 3026, 3742],
        boots: 3111,
        winRate: 52.1,
      },
    ],
    runes: [
      {
        keystone: "Conqueror",
        primaryTree: "Precision",
        secondaryTree: "Resolve",
        primaryRunes: ["Triumph", "Legend: Tenacity", "Last Stand"],
        secondaryRunes: ["Bone Plating", "Unflinching"],
        statShards: ["Attack Speed", "Adaptive Force", "Health"],
        winRate: 52.5,
        pickRate: 85.3,
      },
    ],
    spells: [{ spell1: "Flash", spell2: "Ignite", winRate: 52.8, pickRate: 68.4 }],
    proBuilds: [],
    counters: ["Malphite", "Teemo", "Quinn"],
    synergies: ["Lee Sin", "Syndra", "Kai'Sa"],
  },
  // JUNGLE
  {
    id: "viego",
    name: "Viego",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Viego.png",
    role: "jungle",
    tier: "S+",
    winRate: 51.9,
    pickRate: 14.5,
    banRate: 18.2,
    builds: [
      {
        starter: [1103, 2003],
        core: [6672, 6673, 3124],
        situational: [3156, 3026, 6676],
        boots: 3006,
        winRate: 52.8,
      },
    ],
    runes: [
      {
        keystone: "Conqueror",
        primaryTree: "Precision",
        secondaryTree: "Domination",
        primaryRunes: ["Triumph", "Legend: Alacrity", "Coup de Grace"],
        secondaryRunes: ["Sudden Impact", "Treasure Hunter"],
        statShards: ["Attack Speed", "Adaptive Force", "Health"],
        winRate: 52.2,
        pickRate: 72.4,
      },
    ],
    spells: [{ spell1: "Flash", spell2: "Smite", winRate: 51.9, pickRate: 99.8 }],
    proBuilds: [
      {
        proName: "Canyon",
        team: "GEN.G",
        region: "LCK",
        items: [6672, 6673, 3124, 3156, 3006, 3026],
        runes: {
          keystone: "Conqueror",
          primaryTree: "Precision",
          secondaryTree: "Domination",
          primaryRunes: ["Triumph", "Legend: Alacrity", "Coup de Grace"],
          secondaryRunes: ["Sudden Impact", "Treasure Hunter"],
          statShards: ["Attack Speed", "Adaptive Force", "Health"],
          winRate: 52.2,
          pickRate: 72.4,
        },
        spells: { spell1: "Flash", spell2: "Smite", winRate: 51.9, pickRate: 99.8 },
        kda: "8/1/6",
        result: "win",
        date: "5h atrás",
      },
    ],
    counters: ["Rammus", "Elise", "Nidalee"],
    synergies: ["Orianna", "Lulu", "Jinx"],
  },
  {
    id: "leesin",
    name: "Lee Sin",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/LeeSin.png",
    role: "jungle",
    tier: "S",
    winRate: 49.8,
    pickRate: 18.2,
    banRate: 12.4,
    builds: [
      {
        starter: [1103, 2003],
        core: [6693, 3071, 3156],
        situational: [3026, 3742, 6676],
        boots: 3111,
        winRate: 50.2,
      },
    ],
    runes: [
      {
        keystone: "Conqueror",
        primaryTree: "Precision",
        secondaryTree: "Inspiration",
        primaryRunes: ["Triumph", "Legend: Tenacity", "Last Stand"],
        secondaryRunes: ["Magical Footwear", "Cosmic Insight"],
        statShards: ["Attack Speed", "Adaptive Force", "Health"],
        winRate: 50.5,
        pickRate: 65.8,
      },
    ],
    spells: [{ spell1: "Flash", spell2: "Smite", winRate: 49.8, pickRate: 99.9 }],
    proBuilds: [],
    counters: ["Rammus", "Udyr", "Warwick"],
    synergies: ["Yasuo", "Orianna", "Jinx"],
  },
  // MID
  {
    id: "ahri",
    name: "Ahri",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ahri.png",
    role: "mid",
    tier: "S",
    winRate: 52.1,
    pickRate: 11.4,
    banRate: 5.2,
    builds: [
      {
        starter: [1056, 2003],
        core: [4645, 3165, 3089],
        situational: [3135, 3157, 3102],
        boots: 3020,
        winRate: 52.8,
      },
    ],
    runes: [
      {
        keystone: "Electrocute",
        primaryTree: "Domination",
        secondaryTree: "Inspiration",
        primaryRunes: ["Cheap Shot", "Eyeball Collection", "Ultimate Hunter"],
        secondaryRunes: ["Biscuit Delivery", "Cosmic Insight"],
        statShards: ["Adaptive Force", "Adaptive Force", "Health"],
        winRate: 53.2,
        pickRate: 82.1,
      },
    ],
    spells: [{ spell1: "Flash", spell2: "Ignite", winRate: 52.4, pickRate: 78.5 }],
    proBuilds: [
      {
        proName: "Chovy",
        team: "GEN.G",
        region: "LCK",
        items: [4645, 3165, 3089, 3135, 3020, 3157],
        runes: {
          keystone: "Electrocute",
          primaryTree: "Domination",
          secondaryTree: "Inspiration",
          primaryRunes: ["Cheap Shot", "Eyeball Collection", "Ultimate Hunter"],
          secondaryRunes: ["Biscuit Delivery", "Cosmic Insight"],
          statShards: ["Adaptive Force", "Adaptive Force", "Health"],
          winRate: 53.2,
          pickRate: 82.1,
        },
        spells: { spell1: "Flash", spell2: "Ignite", winRate: 52.4, pickRate: 78.5 },
        kda: "7/2/10",
        result: "win",
        date: "1d atrás",
      },
    ],
    counters: ["Kassadin", "Fizz", "Zed"],
    synergies: ["Lee Sin", "Jinx", "Thresh"],
  },
  {
    id: "syndra",
    name: "Syndra",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Syndra.png",
    role: "mid",
    tier: "S+",
    winRate: 51.5,
    pickRate: 9.8,
    banRate: 8.4,
    builds: [
      {
        starter: [1056, 2003],
        core: [6653, 3165, 3089],
        situational: [3135, 3157, 4645],
        boots: 3020,
        winRate: 52.1,
      },
    ],
    runes: [
      {
        keystone: "Electrocute",
        primaryTree: "Domination",
        secondaryTree: "Sorcery",
        primaryRunes: ["Cheap Shot", "Eyeball Collection", "Ultimate Hunter"],
        secondaryRunes: ["Manaflow Band", "Transcendence"],
        statShards: ["Adaptive Force", "Adaptive Force", "Health"],
        winRate: 52.4,
        pickRate: 68.5,
      },
    ],
    spells: [{ spell1: "Flash", spell2: "Teleport", winRate: 51.8, pickRate: 55.2 }],
    proBuilds: [],
    counters: ["Fizz", "Zed", "Yasuo"],
    synergies: ["Jarvan IV", "Thresh", "Jinx"],
  },
  // ADC
  {
    id: "jinx",
    name: "Jinx",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Jinx.png",
    role: "adc",
    tier: "S+",
    winRate: 52.8,
    pickRate: 16.5,
    banRate: 12.1,
    builds: [
      {
        starter: [1055, 2003],
        core: [3031, 3094, 3085],
        situational: [3036, 3072, 6676],
        boots: 3006,
        winRate: 53.4,
      },
    ],
    runes: [
      {
        keystone: "Lethal Tempo",
        primaryTree: "Precision",
        secondaryTree: "Sorcery",
        primaryRunes: ["Presence of Mind", "Legend: Alacrity", "Coup de Grace"],
        secondaryRunes: ["Absolute Focus", "Gathering Storm"],
        statShards: ["Attack Speed", "Adaptive Force", "Health"],
        winRate: 53.1,
        pickRate: 88.2,
      },
    ],
    spells: [{ spell1: "Flash", spell2: "Heal", winRate: 52.8, pickRate: 95.4 }],
    proBuilds: [
      {
        proName: "Gumayusi",
        team: "T1",
        region: "LCK",
        items: [3031, 3094, 3085, 3036, 3006, 3072],
        runes: {
          keystone: "Lethal Tempo",
          primaryTree: "Precision",
          secondaryTree: "Sorcery",
          primaryRunes: ["Presence of Mind", "Legend: Alacrity", "Coup de Grace"],
          secondaryRunes: ["Absolute Focus", "Gathering Storm"],
          statShards: ["Attack Speed", "Adaptive Force", "Health"],
          winRate: 53.1,
          pickRate: 88.2,
        },
        spells: { spell1: "Flash", spell2: "Heal", winRate: 52.8, pickRate: 95.4 },
        kda: "12/1/9",
        result: "win",
        date: "3h atrás",
      },
    ],
    counters: ["Draven", "Lucian", "Caitlyn"],
    synergies: ["Thresh", "Lulu", "Nautilus"],
  },
  {
    id: "kaisa",
    name: "Kai'Sa",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Kaisa.png",
    role: "adc",
    tier: "S",
    winRate: 51.2,
    pickRate: 14.8,
    banRate: 8.5,
    builds: [
      {
        starter: [1055, 2003],
        core: [6672, 3124, 3115],
        situational: [3089, 3157, 3135],
        boots: 3006,
        winRate: 51.8,
      },
    ],
    runes: [
      {
        keystone: "Hail of Blades",
        primaryTree: "Domination",
        secondaryTree: "Precision",
        primaryRunes: ["Taste of Blood", "Eyeball Collection", "Treasure Hunter"],
        secondaryRunes: ["Presence of Mind", "Legend: Alacrity"],
        statShards: ["Attack Speed", "Adaptive Force", "Health"],
        winRate: 52.1,
        pickRate: 75.4,
      },
    ],
    spells: [{ spell1: "Flash", spell2: "Heal", winRate: 51.2, pickRate: 94.8 }],
    proBuilds: [],
    counters: ["Miss Fortune", "Draven", "Ashe"],
    synergies: ["Nautilus", "Thresh", "Leona"],
  },
  // SUPPORT
  {
    id: "thresh",
    name: "Thresh",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Thresh.png",
    role: "support",
    tier: "S",
    winRate: 50.8,
    pickRate: 12.4,
    banRate: 6.2,
    builds: [
      {
        starter: [3858, 2003],
        core: [3190, 3109, 3107],
        situational: [3222, 3050, 4401],
        boots: 3117,
        winRate: 51.2,
      },
    ],
    runes: [
      {
        keystone: "Aftershock",
        primaryTree: "Resolve",
        secondaryTree: "Inspiration",
        primaryRunes: ["Font of Life", "Bone Plating", "Unflinching"],
        secondaryRunes: ["Biscuit Delivery", "Cosmic Insight"],
        statShards: ["Health", "Armor", "Health"],
        winRate: 51.5,
        pickRate: 72.8,
      },
    ],
    spells: [{ spell1: "Flash", spell2: "Ignite", winRate: 51.2, pickRate: 82.5 }],
    proBuilds: [
      {
        proName: "Keria",
        team: "T1",
        region: "LCK",
        items: [3190, 3109, 3107, 3222, 3117, 3050],
        runes: {
          keystone: "Aftershock",
          primaryTree: "Resolve",
          secondaryTree: "Inspiration",
          primaryRunes: ["Font of Life", "Bone Plating", "Unflinching"],
          secondaryRunes: ["Biscuit Delivery", "Cosmic Insight"],
          statShards: ["Health", "Armor", "Health"],
          winRate: 51.5,
          pickRate: 72.8,
        },
        spells: { spell1: "Flash", spell2: "Ignite", winRate: 51.2, pickRate: 82.5 },
        kda: "1/2/18",
        result: "win",
        date: "6h atrás",
      },
    ],
    counters: ["Morgana", "Braum", "Alistar"],
    synergies: ["Jinx", "Kai'Sa", "Draven"],
  },
  {
    id: "lulu",
    name: "Lulu",
    icon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Lulu.png",
    role: "support",
    tier: "S+",
    winRate: 52.4,
    pickRate: 10.2,
    banRate: 15.8,
    builds: [
      {
        starter: [3850, 2003],
        core: [6617, 3011, 3504],
        situational: [3107, 3222, 3190],
        boots: 3158,
        winRate: 52.8,
      },
    ],
    runes: [
      {
        keystone: "Summon Aery",
        primaryTree: "Sorcery",
        secondaryTree: "Resolve",
        primaryRunes: ["Manaflow Band", "Transcendence", "Scorch"],
        secondaryRunes: ["Font of Life", "Revitalize"],
        statShards: ["Ability Haste", "Adaptive Force", "Health"],
        winRate: 53.1,
        pickRate: 85.4,
      },
    ],
    spells: [{ spell1: "Flash", spell2: "Ignite", winRate: 52.8, pickRate: 68.2 }],
    proBuilds: [],
    counters: ["Zyra", "Brand", "Vel'Koz"],
    synergies: ["Jinx", "Kog'Maw", "Twitch"],
  },
];

// Get champions by role
export function getChampionsByRole(role: string): ChampionMeta[] {
  return mockChampionsMeta.filter((c) => c.role === role);
}

// Get top tier champions (S+ and S)
export function getTopTierChampions(): ChampionMeta[] {
  return mockChampionsMeta.filter((c) => c.tier === "S+" || c.tier === "S");
}
