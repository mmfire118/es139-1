export interface Vote {
  userId: string;
  postId?: string;
  commentId?: string;
  type: 'up' | 'down';
  createdAt: Date;
}

export type SortOption = 'hot' | 'top' | 'new';

export interface SortConfig {
  type: SortOption;
  timeframe?: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all';
} 