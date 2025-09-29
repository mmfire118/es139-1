export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  primaryColor: string;
}

export interface GameContext {
  sport: 'basketball' | 'football' | 'soccer' | 'baseball';
  league: string; // NBA, NFL, Premier League, etc.
  teams: {
    home: Team;
    away: Team;
  };
  gameDate: Date;
  gameType: string; // Regular Season, Playoffs, Finals
  quarter?: number;
  timeRemaining?: string;
  score?: {
    home: number;
    away: number;
  };
}

export interface PlayerStats {
  playerId: string;
  playerName: string;
  team: string;
  position: string;
  stats: Record<string, number | string>;
}

export interface Post {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  context: GameContext;
  stats: PlayerStats[];
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  votes: number;
  userVote?: 'up' | 'down' | null;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
} 