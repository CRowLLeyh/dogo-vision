export interface TeamPlayer {
  summonerName: string;
  champion: string;
  championIcon: string;
  kills: number;
  deaths: number;
  assists: number;
  rank: string;
  damage: number;
}

export interface MatchData {
  matchId: string;
  champion: string;
  championIcon: string;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  csPerMin: number;
  duration: string;
  gameMode: string;
  timeAgo: string;
  items: number[];
  summonerSpells: string[];
  keystone: string;
  secondaryTree: string;
  damage: number;
  visionScore: number;
  goldEarned: number;
  killParticipation: number;
  largestMultikill: number;
  /** Highlight match where player was MVP (mock/UI only) */
  isMvp?: boolean;
  blueTeam: TeamPlayer[];
  redTeam: TeamPlayer[];
}

export const mockPlayerData = {
  profile: {
    gameName: "EtoH",
    tagLine: "BR1",
    level: 245,
    profileIconUrl: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/5367.png"
  },
  ranks: {
    solo: {
      tier: "GOLD",
      division: "IV",
      lp: 45,
      wins: 120,
      losses: 98,
      winrate: 55
    },
    flex: {
      tier: "SILVER",
      division: "I",
      lp: 75,
      wins: 30,
      losses: 25,
      winrate: 54
    }
  },
  recentMatches: [
    {
      matchId: "BR1_123456",
      champion: "Jinx",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Jinx.png",
      win: true,
      kills: 8,
      deaths: 3,
      assists: 12,
      cs: 245,
      csPerMin: 7.6,
      duration: "32:15",
      gameMode: "Ranked Solo",
      timeAgo: "2 horas atrás",
      items: [3031, 3094, 3006, 3072, 3036, 3363],
      summonerSpells: ["Flash", "Heal"],
      keystone: "Lethal Tempo",
      secondaryTree: "Sorcery",
      damage: 28450,
      visionScore: 24,
      goldEarned: 14200,
      killParticipation: 62,
      largestMultikill: 2,
      isMvp: true,
      blueTeam: [
        { summonerName: "EtoH", champion: "Jinx", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Jinx.png", kills: 8, deaths: 3, assists: 12, rank: "Gold IV", damage: 28450 },
        { summonerName: "ThreshGod", champion: "Thresh", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Thresh.png", kills: 2, deaths: 4, assists: 18, rank: "Gold II", damage: 8200 },
        { summonerName: "MidDiff", champion: "Ahri", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Ahri.png", kills: 6, deaths: 2, assists: 8, rank: "Plat IV", damage: 22100 },
        { summonerName: "JungleMaster", champion: "Lee Sin", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/LeeSin.png", kills: 5, deaths: 5, assists: 14, rank: "Gold III", damage: 15800 },
        { summonerName: "TopChad", champion: "Garen", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Garen.png", kills: 3, deaths: 6, assists: 7, rank: "Gold IV", damage: 18500 }
      ],
      redTeam: [
        { summonerName: "ADC Smurf", champion: "Caitlyn", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Caitlyn.png", kills: 5, deaths: 6, assists: 8, rank: "Gold II", damage: 21200 },
        { summonerName: "HookCity", champion: "Nautilus", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Nautilus.png", kills: 3, deaths: 5, assists: 15, rank: "Gold III", damage: 9100 },
        { summonerName: "ZedMain", champion: "Zed", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Zed.png", kills: 7, deaths: 4, assists: 5, rank: "Plat IV", damage: 24500 },
        { summonerName: "GravesOP", champion: "Graves", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Graves.png", kills: 4, deaths: 6, assists: 10, rank: "Gold I", damage: 19800 },
        { summonerName: "TopDiff", champion: "Darius", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Darius.png", kills: 8, deaths: 3, assists: 4, rank: "Gold II", damage: 25100 }
      ]
    },
    {
      matchId: "BR1_123457",
      champion: "Caitlyn",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Caitlyn.png",
      win: false,
      kills: 4,
      deaths: 6,
      assists: 8,
      cs: 198,
      csPerMin: 6.2,
      duration: "28:45",
      gameMode: "Ranked Solo",
      timeAgo: "4 horas atrás",
      items: [3031, 3094, 3006, 3072, 0, 3363],
      summonerSpells: ["Flash", "Heal"],
      keystone: "Fleet Footwork",
      secondaryTree: "Inspiration",
      damage: 18200,
      visionScore: 18,
      goldEarned: 11500,
      killParticipation: 48,
      largestMultikill: 1,
      blueTeam: [
        { summonerName: "EtoH", champion: "Caitlyn", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Caitlyn.png", kills: 4, deaths: 6, assists: 8, rank: "Gold IV", damage: 18200 },
        { summonerName: "LuluMain", champion: "Lulu", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Lulu.png", kills: 1, deaths: 5, assists: 12, rank: "Gold III", damage: 6500 },
        { summonerName: "ViegoJG", champion: "Viego", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Viego.png", kills: 6, deaths: 7, assists: 5, rank: "Gold II", damage: 16800 },
        { summonerName: "SyndraOTP", champion: "Syndra", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Syndra.png", kills: 5, deaths: 4, assists: 6, rank: "Plat IV", damage: 21500 },
        { summonerName: "MalphiteRock", champion: "Malphite", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Malphite.png", kills: 2, deaths: 8, assists: 9, rank: "Gold IV", damage: 12300 }
      ],
      redTeam: [
        { summonerName: "DravenKing", champion: "Draven", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Draven.png", kills: 12, deaths: 3, assists: 6, rank: "Plat III", damage: 32100 },
        { summonerName: "BlitzHook", champion: "Blitzcrank", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Blitzcrank.png", kills: 2, deaths: 4, assists: 14, rank: "Gold I", damage: 7800 },
        { summonerName: "KatLife", champion: "Katarina", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Katarina.png", kills: 8, deaths: 5, assists: 7, rank: "Plat IV", damage: 26700 },
        { summonerName: "RekSaiOP", champion: "Rek'Sai", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/RekSai.png", kills: 3, deaths: 4, assists: 12, rank: "Gold II", damage: 14200 },
        { summonerName: "CamilleTop", champion: "Camille", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Camille.png", kills: 5, deaths: 2, assists: 8, rank: "Plat IV", damage: 19800 }
      ]
    },
    {
      matchId: "BR1_123458",
      champion: "Kai'Sa",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Kaisa.png",
      win: true,
      kills: 12,
      deaths: 2,
      assists: 7,
      cs: 267,
      csPerMin: 8.1,
      duration: "33:02",
      gameMode: "Ranked Solo",
      timeAgo: "6 horas atrás",
      items: [3031, 3094, 3006, 3072, 3036, 3363],
      summonerSpells: ["Flash", "Heal"],
      keystone: "Hail of Blades",
      secondaryTree: "Precision",
      damage: 35200,
      visionScore: 28,
      goldEarned: 16800,
      killParticipation: 72,
      largestMultikill: 3,
      blueTeam: [
        { summonerName: "EtoH", champion: "Kai'Sa", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Kaisa.png", kills: 12, deaths: 2, assists: 7, rank: "Gold IV", damage: 35200 },
        { summonerName: "RakanLover", champion: "Rakan", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Rakan.png", kills: 1, deaths: 3, assists: 19, rank: "Gold II", damage: 7200 },
        { summonerName: "OriannaMid", champion: "Orianna", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Orianna.png", kills: 7, deaths: 2, assists: 10, rank: "Plat III", damage: 24800 },
        { summonerName: "KhaZixJG", champion: "Kha'Zix", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Khazix.png", kills: 5, deaths: 3, assists: 8, rank: "Gold I", damage: 18500 },
        { summonerName: "JaxTop", champion: "Jax", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Jax.png", kills: 4, deaths: 4, assists: 6, rank: "Gold III", damage: 16200 }
      ],
      redTeam: [
        { summonerName: "VayneSpot", champion: "Vayne", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Vayne.png", kills: 3, deaths: 5, assists: 4, rank: "Gold III", damage: 14500 },
        { summonerName: "LeonaEngage", champion: "Leona", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Leona.png", kills: 1, deaths: 6, assists: 8, rank: "Gold IV", damage: 8900 },
        { summonerName: "LeBlanc1v9", champion: "LeBlanc", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Leblanc.png", kills: 5, deaths: 6, assists: 3, rank: "Plat IV", damage: 18200 },
        { summonerName: "EliseJG", champion: "Elise", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Elise.png", kills: 2, deaths: 6, assists: 5, rank: "Gold II", damage: 12100 },
        { summonerName: "ShenUlt", champion: "Shen", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Shen.png", kills: 3, deaths: 6, assists: 6, rank: "Gold IV", damage: 11500 }
      ]
    },
    {
      matchId: "BR1_123459",
      champion: "Ezreal",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Ezreal.png",
      win: true,
      kills: 6,
      deaths: 4,
      assists: 15,
      cs: 234,
      csPerMin: 7.2,
      duration: "31:20",
      gameMode: "Ranked Flex",
      timeAgo: "1 dia atrás",
      items: [3042, 3078, 3158, 3508, 3036, 3363],
      summonerSpells: ["Flash", "Heal"],
      keystone: "Conqueror",
      secondaryTree: "Inspiration",
      damage: 22800,
      visionScore: 21,
      goldEarned: 13500,
      killParticipation: 58,
      largestMultikill: 2,
      blueTeam: [
        { summonerName: "EtoH", champion: "Ezreal", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Ezreal.png", kills: 6, deaths: 4, assists: 15, rank: "Silver I", damage: 22800 },
        { summonerName: "NamiWave", champion: "Nami", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Nami.png", kills: 2, deaths: 3, assists: 20, rank: "Gold IV", damage: 9500 },
        { summonerName: "VeigarStack", champion: "Veigar", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Veigar.png", kills: 8, deaths: 2, assists: 6, rank: "Silver II", damage: 28900 },
        { summonerName: "SejuaniTank", champion: "Sejuani", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Sejuani.png", kills: 3, deaths: 5, assists: 16, rank: "Gold III", damage: 14200 },
        { summonerName: "GnarTop", champion: "Gnar", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Gnar.png", kills: 5, deaths: 4, assists: 8, rank: "Silver I", damage: 17600 }
      ],
      redTeam: [
        { summonerName: "JhinArt", champion: "Jhin", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Jhin.png", kills: 6, deaths: 5, assists: 7, rank: "Silver I", damage: 20100 },
        { summonerName: "MorganaQ", champion: "Morgana", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Morgana.png", kills: 2, deaths: 4, assists: 12, rank: "Gold IV", damage: 11200 },
        { summonerName: "VladMid", champion: "Vladimir", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Vladimir.png", kills: 4, deaths: 6, assists: 5, rank: "Silver II", damage: 18500 },
        { summonerName: "NidaleeJG", champion: "Nidalee", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Nidalee.png", kills: 3, deaths: 5, assists: 6, rank: "Gold II", damage: 15800 },
        { summonerName: "OrnTop", champion: "Ornn", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Ornn.png", kills: 3, deaths: 4, assists: 9, rank: "Silver III", damage: 13200 }
      ]
    },
    {
      matchId: "BR1_123460",
      champion: "Jinx",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Jinx.png",
      win: false,
      kills: 5,
      deaths: 7,
      assists: 9,
      cs: 189,
      csPerMin: 5.8,
      duration: "34:12",
      gameMode: "Ranked Solo",
      timeAgo: "1 dia atrás",
      items: [3031, 3094, 3006, 3072, 0, 3363],
      summonerSpells: ["Flash", "Heal"],
      keystone: "Lethal Tempo",
      secondaryTree: "Sorcery",
      damage: 21500,
      visionScore: 19,
      goldEarned: 12800,
      killParticipation: 45,
      largestMultikill: 1,
      blueTeam: [
        { summonerName: "EtoH", champion: "Jinx", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Jinx.png", kills: 5, deaths: 7, assists: 9, rank: "Gold IV", damage: 21500 },
        { summonerName: "SorakaHeal", champion: "Soraka", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Soraka.png", kills: 0, deaths: 8, assists: 14, rank: "Gold III", damage: 5800 },
        { summonerName: "TalonMid", champion: "Talon", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Talon.png", kills: 7, deaths: 6, assists: 4, rank: "Gold I", damage: 19200 },
        { summonerName: "NunuJG", champion: "Nunu", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Nunu.png", kills: 2, deaths: 7, assists: 8, rank: "Gold IV", damage: 12100 },
        { summonerName: "IreliaTop", champion: "Irelia", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Irelia.png", kills: 4, deaths: 6, assists: 5, rank: "Gold II", damage: 16800 }
      ],
      redTeam: [
        { summonerName: "TristJump", champion: "Tristana", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Tristana.png", kills: 9, deaths: 4, assists: 8, rank: "Plat IV", damage: 28500 },
        { summonerName: "PykeKill", champion: "Pyke", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Pyke.png", kills: 8, deaths: 3, assists: 12, rank: "Plat III", damage: 14200 },
        { summonerName: "ViktorLaser", champion: "Viktor", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Viktor.png", kills: 6, deaths: 4, assists: 9, rank: "Plat IV", damage: 25800 },
        { summonerName: "KaynFarm", champion: "Kayn", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Kayn.png", kills: 5, deaths: 5, assists: 10, rank: "Gold I", damage: 18900 },
        { summonerName: "FioraTop", champion: "Fiora", championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Fiora.png", kills: 6, deaths: 2, assists: 4, rank: "Plat IV", damage: 22100 }
      ]
    }
  ] as MatchData[],
  topChampions: [
    {
      name: "Jinx",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Jinx.png",
      masteryLevel: 7,
      masteryPoints: 125430,
      gamesPlayed: 89,
      winrate: 58,
      kda: 3.2
    },
    {
      name: "Caitlyn",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Caitlyn.png",
      masteryLevel: 6,
      masteryPoints: 87650,
      gamesPlayed: 67,
      winrate: 52,
      kda: 2.8
    },
    {
      name: "Kai'Sa",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Kaisa.png",
      masteryLevel: 7,
      masteryPoints: 156200,
      gamesPlayed: 112,
      winrate: 61,
      kda: 3.5
    },
    {
      name: "Ezreal",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Ezreal.png",
      masteryLevel: 5,
      masteryPoints: 45320,
      gamesPlayed: 34,
      winrate: 47,
      kda: 2.4
    },
    {
      name: "Miss Fortune",
      icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/MissFortune.png",
      masteryLevel: 6,
      masteryPoints: 72100,
      gamesPlayed: 45,
      winrate: 56,
      kda: 3.0
    }
  ],
  stats: {
    totalGames: 450,
    avgKDA: 2.9,
    avgCS: 6.8,
    avgVision: 1.2,
    mostPlayedRole: "BOTTOM",
    recentWinstreak: 3,
    last20: { wins: 12, losses: 8 }
  }
};

export const mockTierListData = [
  { name: "Jinx", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Jinx.png", tier: "S", winrate: 53.2, pickRate: 12.4, banRate: 8.2, role: "ADC" },
  { name: "Caitlyn", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Caitlyn.png", tier: "S", winrate: 52.8, pickRate: 15.1, banRate: 5.3, role: "ADC" },
  { name: "Kai'Sa", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Kaisa.png", tier: "A", winrate: 51.5, pickRate: 18.2, banRate: 12.1, role: "ADC" },
  { name: "Ezreal", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Ezreal.png", tier: "A", winrate: 50.2, pickRate: 22.3, banRate: 3.2, role: "ADC" },
  { name: "Yasuo", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Yasuo.png", tier: "B", winrate: 49.8, pickRate: 14.5, banRate: 25.3, role: "MID" },
  { name: "Zed", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Zed.png", tier: "A", winrate: 51.2, pickRate: 11.2, banRate: 18.4, role: "MID" },
  { name: "Ahri", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Ahri.png", tier: "S", winrate: 52.5, pickRate: 9.8, banRate: 4.1, role: "MID" },
  { name: "Lee Sin", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/LeeSin.png", tier: "A", winrate: 48.9, pickRate: 16.7, banRate: 8.9, role: "JNG" },
  { name: "Graves", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Graves.png", tier: "S", winrate: 52.1, pickRate: 8.4, banRate: 6.2, role: "JNG" },
  { name: "Thresh", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Thresh.png", tier: "A", winrate: 50.5, pickRate: 11.3, banRate: 7.8, role: "SUP" },
  { name: "Nautilus", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Nautilus.png", tier: "S", winrate: 53.1, pickRate: 8.9, banRate: 12.4, role: "SUP" },
  { name: "Garen", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Garen.png", tier: "B", winrate: 51.8, pickRate: 6.2, banRate: 2.1, role: "TOP" },
  { name: "Darius", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Darius.png", tier: "A", winrate: 50.9, pickRate: 7.8, banRate: 15.2, role: "TOP" },
  { name: "Aatrox", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Aatrox.png", tier: "S", winrate: 52.3, pickRate: 10.1, banRate: 18.6, role: "TOP" },
];
