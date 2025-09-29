import { GameContext } from './Post';

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
  thumbnailUrl: string;
  context: GameContext;
  availableFacts: HighlightFact[];
  selectedFacts: string[]; // array of fact IDs
}

export type OverlayStyle =
  | 'modern'        // Current gradient style (default)
  | 'minimal'       // Clean, simple, small
  | 'bold'          // Large, thick borders, high contrast
  | 'broadcast'     // TV broadcast style with accent bars
  | 'neon'          // Glowing neon effect
  | 'classic'       // Traditional sports lower-third
  | 'compact';      // Very small, corner-friendly

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