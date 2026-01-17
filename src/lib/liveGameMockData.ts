export interface LiveGamePlayer {
  summonerName: string;
  tagLine: string;
  champion: string;
  championIcon: string;
  tier: string;
  division: string;
  lp: number;
  wins: number;
  losses: number;
  championWinrate: number;
  championGames: number;
  recentKDA: number;
  summonerSpells: [string, string];
  role: "top" | "jungle" | "mid" | "adc" | "support";
}

export interface BannedChampion {
  name: string;
  icon: string;
}

export interface LiveGameData {
  gameMode: string;
  gameTime: number; // seconds since start
  blueTeam: LiveGamePlayer[];
  redTeam: LiveGamePlayer[];
  blueBans: BannedChampion[];
  redBans: BannedChampion[];
}

export const mockLiveGameData: LiveGameData = {
  gameMode: "Ranked Solo/Duo",
  gameTime: 0, // Loading screen
  blueBans: [
    { name: "Yone", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Yone.png" },
    { name: "Yasuo", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Yasuo.png" },
    { name: "Vayne", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Vayne.png" },
    { name: "Viego", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Viego.png" },
    { name: "Kayn", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Kayn.png" },
  ],
  redBans: [
    { name: "Ksante", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/KSante.png" },
    { name: "Ambessa", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Ambessa.png" },
    { name: "Aurora", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Aurora.png" },
    { name: "Senna", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Senna.png" },
    { name: "Draven", icon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Draven.png" },
  ],
  blueTeam: [
    {
      summonerName: "TopChad",
      tagLine: "BR1",
      champion: "Garen",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Garen.png",
      tier: "GOLD",
      division: "IV",
      lp: 73,
      wins: 67,
      losses: 62,
      championWinrate: 58,
      championGames: 45,
      recentKDA: 2.8,
      summonerSpells: ["Flash", "Teleport"],
      role: "top",
    },
    {
      summonerName: "JungleMaster",
      tagLine: "BR1",
      champion: "Lee Sin",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/LeeSin.png",
      tier: "GOLD",
      division: "III",
      lp: 18,
      wins: 101,
      losses: 96,
      championWinrate: 52,
      championGames: 128,
      recentKDA: 3.1,
      summonerSpells: ["Flash", "Smite"],
      role: "jungle",
    },
    {
      summonerName: "MidDiff",
      tagLine: "BR1",
      champion: "Ahri",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Ahri.png",
      tier: "PLATINUM",
      division: "IV",
      lp: 12,
      wins: 54,
      losses: 49,
      championWinrate: 61,
      championGames: 89,
      recentKDA: 3.8,
      summonerSpells: ["Flash", "Ignite"],
      role: "mid",
    },
    {
      summonerName: "EtoH",
      tagLine: "BR1",
      champion: "Jinx",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Jinx.png",
      tier: "GOLD",
      division: "IV",
      lp: 45,
      wins: 120,
      losses: 98,
      championWinrate: 58,
      championGames: 89,
      recentKDA: 3.2,
      summonerSpells: ["Flash", "Heal"],
      role: "adc",
    },
    {
      summonerName: "ThreshGod",
      tagLine: "BR1",
      champion: "Thresh",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Thresh.png",
      tier: "GOLD",
      division: "II",
      lp: 62,
      wins: 88,
      losses: 74,
      championWinrate: 55,
      championGames: 156,
      recentKDA: 2.9,
      summonerSpells: ["Flash", "Ignite"],
      role: "support",
    },
  ],
  redTeam: [
    {
      summonerName: "TopDiff",
      tagLine: "BR1",
      champion: "Darius",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Darius.png",
      tier: "GOLD",
      division: "II",
      lp: 40,
      wins: 77,
      losses: 70,
      championWinrate: 54,
      championGames: 67,
      recentKDA: 2.6,
      summonerSpells: ["Flash", "Ghost"],
      role: "top",
    },
    {
      summonerName: "GravesOP",
      tagLine: "BR1",
      champion: "Graves",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Graves.png",
      tier: "GOLD",
      division: "I",
      lp: 94,
      wins: 156,
      losses: 139,
      championWinrate: 49,
      championGames: 78,
      recentKDA: 2.4,
      summonerSpells: ["Flash", "Smite"],
      role: "jungle",
    },
    {
      summonerName: "ZedMain",
      tagLine: "BR1",
      champion: "Zed",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Zed.png",
      tier: "PLATINUM",
      division: "IV",
      lp: 5,
      wins: 63,
      losses: 57,
      championWinrate: 48,
      championGames: 234,
      recentKDA: 2.9,
      summonerSpells: ["Flash", "Ignite"],
      role: "mid",
    },
    {
      summonerName: "ADC Smurf",
      tagLine: "BR1",
      champion: "Caitlyn",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Caitlyn.png",
      tier: "GOLD",
      division: "II",
      lp: 22,
      wins: 140,
      losses: 121,
      championWinrate: 56,
      championGames: 45,
      recentKDA: 3.5,
      summonerSpells: ["Flash", "Heal"],
      role: "adc",
    },
    {
      summonerName: "HookCity",
      tagLine: "BR1",
      champion: "Nautilus",
      championIcon: "https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/Nautilus.png",
      tier: "GOLD",
      division: "III",
      lp: 58,
      wins: 92,
      losses: 80,
      championWinrate: 53,
      championGames: 112,
      recentKDA: 2.2,
      summonerSpells: ["Flash", "Ignite"],
      role: "support",
    },
  ],
};
