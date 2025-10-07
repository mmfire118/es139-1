import { GameContext } from './Post';
import type { OverlayStyle } from './Post';

export interface HighlightFact {
  id: string;
  label: string;
  value: string;
  category: 'performance' | 'context' | 'probability';
  position?: {
    x: number; // percentage from left
    y: number; // percentage from top
  };
}

export interface CustomizableHighlight {
  id: string;
  title: string;
  videoUrl: string;
  // Optional provider fields to support YouTube inline playback in addition to MP4
  videoProvider?: 'mp4' | 'youtube';
  youtubeId?: string; // used when videoProvider === 'youtube'
  thumbnailUrl: string;
  context: GameContext;
  availableFacts: HighlightFact[];
  selectedFacts: string[]; // array of fact IDs
}

export interface VideoOverlay {
  factId: string;
  isVisible: boolean;
  position: {
    x: number;
    y: number;
  };
  style?: OverlayStyle;
  duration?: number; // in seconds, 0 = permanent
  delay?: number; // delay before showing, in seconds
} 