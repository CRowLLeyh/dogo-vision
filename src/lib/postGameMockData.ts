export interface PostGamePlayer {
  summonerName: string;
  tagLine: string;
  champion: string;
  championIcon: string;
  tier: string;
  division: string;
  role: "top" | "jungle" | "mid" | "adc" | "support";
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  csPerMin: number;
  damage: number;
  damageTaken: number;
  healing: number;
  gold: number;
  visionScore: number;
  wardsPlaced: number;
  wardsKilled: number;
  killParticipation: number;
  items: number[];
  summonerSpells: [string, string];
  keystone: string;
  secondaryTree: string;
  grade: "S+" | "S" | "S-" | "A+" | "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "C-" | "D+" | "D" | "D-";
  isMvp?: boolean;
}

export interface GameEvent {
  time: number; // seconds
  type: "first_blood" | "dragon" | "herald" | "baron" | "tower" | "inhibitor" | "ace" | "multikill";
  team: "blue" | "red";
  description: string;
  icon?: string;
}

export interface PostGameData {
  matchId: string;
  gameMode: string;
  gameDuration: number; // seconds
  winner: "blue" | "red";
  blueTeam: PostGamePlayer[];
  redTeam: PostGamePlayer[];
  events: GameEvent[];
  blueObjectives: {
    towers: number;
    dragons: number;
    barons: number;
    heralds: number;
    inhibitors: number;
  };
  redObjectives: {
    towers: number;
    dragons: number;
    barons: number;
    heralds: number;
    inhibitors: number;
  };
}

export const mockPostGameData: PostGameData = {
  matchId: "BR1_987654",
  gameMode: "Ranked Solo/Duo",
  gameDuration: 1892, // 31:32
  winner: "blue",
  blueObjectives: {
    towers: 9,
    dragons: 3,
    barons: 1,
    heralds: 2,
    inhibitors: 2,
  },
  redObjectives: {
    towers: 4,
    dragons: 1,
    barons: 0,
    heralds: 0,
    inhibitors: 0,
  },
  events: [
    { time: 145, type: "first_blood", team: "blue", description: "First Blood por MidDiff" },
    { time: 312, type: "dragon", team: "blue", description: "Dragão Infernal" },
    { time: 485, type: "herald", team: "blue", description: "Arauto da Fenda" },
    { time: 612, type: "tower", team: "blue", description: "Torre Mid T1" },
    { time: 780, type: "dragon", team: "red", description: "Dragão Montanha" },
    { time: 920, type: "herald", team: "blue", description: "Arauto da Fenda (2)" },
    { time: 1080, type: "ace", team: "blue", description: "Ace no Time Vermelho" },
    { time: 1150, type: "baron", team: "blue", description: "Barão Nashor" },
    { time: 1320, type: "dragon", team: "blue", description: "Dragão Oceano" },
    { time: 1450, type: "multikill", team: "blue", description: "Quadra Kill por EtoH" },
    { time: 1620, type: "inhibitor", team: "blue", description: "Inibidor Mid" },
    { time: 1750, type: "dragon", team: "blue", description: "Alma do Dragão (Infernal)" },
    { time: 1892, type: "ace", team: "blue", description: "Ace Final - Vitória!" },
  ],
  blueTeam: [
    {
      summonerName: "TopChad",
      tagLine: "BR1",
      champion: "Garen",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Garen.png",
      tier: "GOLD",
      division: "IV",
      role: "top",
      kills: 5,
      deaths: 3,
      assists: 12,
      cs: 245,
      csPerMin: 7.8,
      damage: 22450,
      damageTaken: 38200,
      healing: 4500,
      gold: 13200,
      visionScore: 32,
      wardsPlaced: 8,
      wardsKilled: 3,
      killParticipation: 58,
      items: [3078, 3742, 3065, 3111, 3075, 3363],
      summonerSpells: ["Flash", "Teleport"],
      keystone: "Conqueror",
      secondaryTree: "Resolve",
      grade: "A",
    },
    {
      summonerName: "JungleMaster",
      tagLine: "BR1",
      champion: "Lee Sin",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/LeeSin.png",
      tier: "GOLD",
      division: "III",
      role: "jungle",
      kills: 7,
      deaths: 4,
      assists: 15,
      cs: 178,
      csPerMin: 5.6,
      damage: 18900,
      damageTaken: 25600,
      healing: 2800,
      gold: 12800,
      visionScore: 45,
      wardsPlaced: 14,
      wardsKilled: 8,
      killParticipation: 75,
      items: [6693, 3071, 3156, 3111, 3026, 3363],
      summonerSpells: ["Flash", "Smite"],
      keystone: "Conqueror",
      secondaryTree: "Inspiration",
      grade: "A+",
    },
    {
      summonerName: "MidDiff",
      tagLine: "BR1",
      champion: "Ahri",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ahri.png",
      tier: "PLATINUM",
      division: "IV",
      role: "mid",
      kills: 9,
      deaths: 2,
      assists: 8,
      cs: 267,
      csPerMin: 8.5,
      damage: 28750,
      damageTaken: 12400,
      healing: 1200,
      gold: 15600,
      visionScore: 28,
      wardsPlaced: 10,
      wardsKilled: 2,
      killParticipation: 58,
      items: [4645, 3165, 3089, 3020, 3135, 3363],
      summonerSpells: ["Flash", "Ignite"],
      keystone: "Electrocute",
      secondaryTree: "Precision",
      grade: "S",
    },
    {
      summonerName: "EtoH",
      tagLine: "BR1",
      champion: "Jinx",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Jinx.png",
      tier: "GOLD",
      division: "IV",
      role: "adc",
      kills: 12,
      deaths: 1,
      assists: 9,
      cs: 298,
      csPerMin: 9.4,
      damage: 42800,
      damageTaken: 8900,
      healing: 3200,
      gold: 18400,
      visionScore: 24,
      wardsPlaced: 7,
      wardsKilled: 1,
      killParticipation: 72,
      items: [3031, 3094, 3085, 3036, 3072, 3363],
      summonerSpells: ["Flash", "Heal"],
      keystone: "Lethal Tempo",
      secondaryTree: "Sorcery",
      grade: "S+",
      isMvp: true,
    },
    {
      summonerName: "ThreshGod",
      tagLine: "BR1",
      champion: "Thresh",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Thresh.png",
      tier: "GOLD",
      division: "II",
      role: "support",
      kills: 1,
      deaths: 5,
      assists: 22,
      cs: 42,
      csPerMin: 1.3,
      damage: 8200,
      damageTaken: 18500,
      healing: 0,
      gold: 9800,
      visionScore: 68,
      wardsPlaced: 24,
      wardsKilled: 12,
      killParticipation: 79,
      items: [3190, 3109, 3107, 3117, 3222, 3363],
      summonerSpells: ["Flash", "Ignite"],
      keystone: "Aftershock",
      secondaryTree: "Inspiration",
      grade: "A+",
    },
  ],
  redTeam: [
    {
      summonerName: "TopDiff",
      tagLine: "BR1",
      champion: "Darius",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Darius.png",
      tier: "GOLD",
      division: "II",
      role: "top",
      kills: 4,
      deaths: 6,
      assists: 5,
      cs: 212,
      csPerMin: 6.7,
      damage: 19800,
      damageTaken: 32100,
      healing: 5200,
      gold: 11200,
      visionScore: 18,
      wardsPlaced: 5,
      wardsKilled: 2,
      killParticipation: 45,
      items: [3078, 3053, 3742, 3111, 0, 3363],
      summonerSpells: ["Flash", "Ghost"],
      keystone: "Conqueror",
      secondaryTree: "Resolve",
      grade: "B",
    },
    {
      summonerName: "GravesOP",
      tagLine: "BR1",
      champion: "Graves",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Graves.png",
      tier: "GOLD",
      division: "I",
      role: "jungle",
      kills: 5,
      deaths: 7,
      assists: 8,
      cs: 156,
      csPerMin: 4.9,
      damage: 21500,
      damageTaken: 28400,
      healing: 2100,
      gold: 10800,
      visionScore: 28,
      wardsPlaced: 9,
      wardsKilled: 4,
      killParticipation: 65,
      items: [6676, 3071, 3156, 3047, 0, 3363],
      summonerSpells: ["Flash", "Smite"],
      keystone: "Fleet Footwork",
      secondaryTree: "Domination",
      grade: "C+",
    },
    {
      summonerName: "ZedMain",
      tagLine: "BR1",
      champion: "Zed",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Zed.png",
      tier: "PLATINUM",
      division: "IV",
      role: "mid",
      kills: 6,
      deaths: 8,
      assists: 4,
      cs: 234,
      csPerMin: 7.4,
      damage: 24100,
      damageTaken: 18900,
      healing: 800,
      gold: 12100,
      visionScore: 15,
      wardsPlaced: 4,
      wardsKilled: 1,
      killParticipation: 50,
      items: [6693, 3071, 3156, 3047, 0, 3363],
      summonerSpells: ["Flash", "Ignite"],
      keystone: "Electrocute",
      secondaryTree: "Precision",
      grade: "C",
    },
    {
      summonerName: "ADC Smurf",
      tagLine: "BR1",
      champion: "Caitlyn",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Caitlyn.png",
      tier: "GOLD",
      division: "II",
      role: "adc",
      kills: 3,
      deaths: 6,
      assists: 7,
      cs: 245,
      csPerMin: 7.7,
      damage: 18900,
      damageTaken: 12100,
      healing: 1800,
      gold: 11800,
      visionScore: 21,
      wardsPlaced: 6,
      wardsKilled: 2,
      killParticipation: 50,
      items: [3031, 3094, 3006, 3508, 0, 3363],
      summonerSpells: ["Flash", "Heal"],
      keystone: "Fleet Footwork",
      secondaryTree: "Inspiration",
      grade: "C+",
    },
    {
      summonerName: "HookCity",
      tagLine: "BR1",
      champion: "Nautilus",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Nautilus.png",
      tier: "GOLD",
      division: "III",
      role: "support",
      kills: 2,
      deaths: 7,
      assists: 12,
      cs: 28,
      csPerMin: 0.9,
      damage: 9100,
      damageTaken: 24500,
      healing: 0,
      gold: 8200,
      visionScore: 42,
      wardsPlaced: 18,
      wardsKilled: 6,
      killParticipation: 70,
      items: [3190, 3109, 3117, 3076, 0, 3363],
      summonerSpells: ["Flash", "Ignite"],
      keystone: "Aftershock",
      secondaryTree: "Inspiration",
      grade: "C",
    },
  ],
};
