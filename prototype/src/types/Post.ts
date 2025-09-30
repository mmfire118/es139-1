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

export type OverlayStyle =
  | 'modern'
  | 'minimal'
  | 'bold'
  | 'broadcast'
  | 'neon'
  | 'classic'
  | 'compact';

export interface OverlayData {
  factId: string;
  label: string;
  value: string;
  category: 'performance' | 'context' | 'probability';
  position: {
    x: number;
    y: number;
  };
  style?: OverlayStyle;
  duration?: number; // in seconds, 0 = permanent
  delay?: number; // delay before showing, in seconds
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
  overlays?: OverlayData[]; // For custom highlights with overlays
} 