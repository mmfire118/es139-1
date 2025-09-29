import { Link } from 'react-router-dom';
import { MessageCircle, Clock, User } from 'lucide-react';
import VoteControls from './VoteControls';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
  onVote: (postId: string, voteType: 'up' | 'down') => void;
}

export default function PostCard({ post, onVote }: PostCardProps) {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case 'basketball': return '🏀';
      case 'football': return '🏈';
      case 'soccer': return '⚽';
      case 'baseball': return '⚾';
      default: return '🏆';
    }
  };

  return (
    <div className="post-card p-4 mb-4">
      <div className="flex space-x-3">
        {/* Vote Controls */}
        <div className="flex-shrink-0">
          <VoteControls
            votes={post.votes}
            userVote={post.userVote}
            onVote={(type) => onVote(post.id, type)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Post Header */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <span className="text-lg">{getSportIcon(post.context.sport)}</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {post.context.league}
            </span>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3" />
              <span>{post.author.username}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{formatTimeAgo(post.createdAt)}</span>
            </div>
          </div>

          {/* Game Context */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {post.context.teams.away.shortName} @ {post.context.teams.home.shortName}
            </span>
            {post.context.score && (
              <span className="text-sm text-gray-500">
                ({post.context.score.away}-{post.context.score.home})
              </span>
            )}
            <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
              {post.context.gameType}
            </span>
          </div>

          {/* Title and Description */}
          <Link to={`/post/${post.id}`} className="block group">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-reddit-blue transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
              {post.description}
            </p>
          </Link>

          {/* Video Thumbnail */}
          <Link to={`/post/${post.id}`} className="block mb-3">
            <div className="relative rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 aspect-video">
              <img
                src={post.thumbnailUrl}
                alt={post.title}
                className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                </div>
              </div>
            </div>
          </Link>

          {/* Stats Preview */}
          {post.stats.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 mb-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {post.stats[0].playerName}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">
                    ({post.stats[0].position})
                  </span>
                </div>
                <div className="flex space-x-4 text-sm">
                  {Object.entries(post.stats[0].stats).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="font-medium text-gray-900 dark:text-white">{value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{key}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <Link
              to={`/post/${post.id}`}
              className="flex items-center space-x-1 hover:text-reddit-blue transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{post.commentCount} comments</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 