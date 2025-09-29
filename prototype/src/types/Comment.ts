export interface Comment {
  id: string;
  postId: string;
  parentId?: string; // For nested comments
  author: {
    id: string;
    username: string;
    avatar?: string;
  };
  content: string;
  votes: number;
  userVote?: 'up' | 'down' | null;
  replies: Comment[];
  createdAt: Date;
  updatedAt: Date;
} 