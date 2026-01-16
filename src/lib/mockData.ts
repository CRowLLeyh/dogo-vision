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
      keystone: "Lethal Tempo"
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
      keystone: "Fleet Footwork"
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
      keystone: "Hail of Blades"
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
      keystone: "Conqueror"
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
      keystone: "Lethal Tempo"
    }
  ],
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
