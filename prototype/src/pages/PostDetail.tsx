import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import VoteControls from '../components/post/VoteControls';
import StyledOverlay from '../components/post/StyledOverlay';
import { mockPosts } from '../data/mockPosts';
import { getCommentsForPost } from '../data/mockComments';
import { Post, Comment } from '../types';

const POSTS_STORAGE_KEY = 'highlighthub_custom_posts';

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (postId) {
      // Try to find in custom posts first
      try {
        const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
        const customPosts = storedPosts ? JSON.parse(storedPosts) : [];
        const parsedCustomPosts = customPosts.map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt)
        }));

        const foundCustomPost = parsedCustomPosts.find((p: Post) => p.id === postId);
        if (foundCustomPost) {
          setPost(foundCustomPost);
          setComments(getCommentsForPost(postId));
          return;
        }
      } catch (error) {
        console.error('Error loading custom post:', error);
      }

      // Fall back to mock posts
      const foundPost = mockPosts.find(p => p.id === postId);
      setPost(foundPost || null);
      setComments(getCommentsForPost(postId));
    }
  }, [postId]);

  const handleVote = (voteType: 'up' | 'down') => {
    if (!post) return;
    
    setPost(prevPost => {
      if (!prevPost) return null;
      
      let newVotes = prevPost.votes;
      let newUserVote: 'up' | 'down' | null = voteType;

      if (prevPost.userVote === voteType) {
        newUserVote = null;
        newVotes += voteType === 'up' ? -1 : 1;
      } else if (prevPost.userVote) {
        newVotes += voteType === 'up' ? 2 : -2;
      } else {
        newVotes += voteType === 'up' ? 1 : -1;
      }

      return { ...prevPost, votes: newVotes, userVote: newUserVote };
    });
  };

  const handleCommentVote = (commentId: string, voteType: 'up' | 'down') => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment.id === commentId) {
          let newVotes = comment.votes;
          let newUserVote: 'up' | 'down' | null = voteType;

          if (comment.userVote === voteType) {
            newUserVote = null;
            newVotes += voteType === 'up' ? -1 : 1;
          } else if (comment.userVote) {
            newVotes += voteType === 'up' ? 2 : -2;
          } else {
            newVotes += voteType === 'up' ? 1 : -1;
          }

          return { ...comment, votes: newVotes, userVote: newUserVote };
        }
        return comment;
      })
    );
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center">
          <p className="text-gray-500 dark:text-gray-400">Post not found</p>
          <Link to="/" className="text-reddit-blue hover:underline mt-2 inline-block">
            Return to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/"
        className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-reddit-blue transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to feed</span>
      </Link>

      <div className="post-card p-6">
        <div className="flex space-x-4">
          {/* Vote Controls */}
          <div className="flex-shrink-0">
            <VoteControls
              votes={post.votes}
              userVote={post.userVote ?? null}
              onVote={handleVote}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Post Header */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="text-xl">
                {post.context.sport === 'basketball' && '🏀'}
                {post.context.sport === 'football' && '🏈'}
                {post.context.sport === 'soccer' && '⚽'}
                {post.context.sport === 'baseball' && '⚾'}
              </span>
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {post.context.league}
              </span>
              <span>•</span>
              <span>{post.author.username}</span>
            </div>

            {/* Game Context */}
            <div className="flex items-center space-x-3 mb-4">
              <span className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                {post.context.teams.away.shortName} @ {post.context.teams.home.shortName}
              </span>
              {post.context.score && (
                <span className="text-lg text-gray-600 dark:text-gray-400">
                  {post.context.score.away}-{post.context.score.home}
                </span>
              )}
              <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm">
                {post.context.gameType}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {post.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {post.description}
            </p>

            {/* Video Player with Overlays */}
            <div className="relative rounded-lg overflow-hidden bg-gray-900 mb-6">
              <div className="relative aspect-video">
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  poster={post.thumbnailUrl}
                  controls
                  onTimeUpdate={(e) => {
                    setCurrentVideoTime(e.currentTarget.currentTime);
                  }}
                  onSeeked={(e) => {
                    setCurrentVideoTime(e.currentTarget.currentTime);
                  }}
                >
                  <source src={post.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* Display overlays if this is a custom highlight */}
                {post.overlays && post.overlays.map((overlay) => (
                  <StyledOverlay
                    key={overlay.factId}
                    overlay={overlay}
                    currentVideoTime={currentVideoTime}
                  />
                ))}
              </div>

              {post.overlays && post.overlays.length > 0 && (
                <div className="bg-gray-800 px-4 py-2 text-center">
                  <p className="text-xs text-gray-400">
                    ✨ This highlight features {post.overlays.length} custom data overlay{post.overlays.length > 1 ? 's' : ''}
                  </p>
                </div>
              )}
            </div>

            {/* Player Stats */}
            {post.stats.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Player Stats
                </h3>
                {post.stats.map((playerStat) => (
                  <div key={playerStat.playerId} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">
                        {playerStat.playerName}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {playerStat.position} • {playerStat.team}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                      {Object.entries(playerStat.stats).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="font-semibold text-gray-900 dark:text-white">{value}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Comments Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Comments ({comments.length})
              </h3>
              
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <VoteControls
                          votes={comment.votes}
                          userVote={comment.userVote ?? null}
                          onVote={(type) => handleCommentVote(comment.id, type)}
                          size="sm"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {comment.author.username}
                          </span>
                          <span>•</span>
                          <span>2h ago</span>
                        </div>
                        <p className="text-gray-800 dark:text-gray-200 mb-3">
                          {comment.content}
                        </p>
                        
                        {/* Replies */}
                        {comment.replies.length > 0 && (
                          <div className="space-y-3 mt-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="comment-item">
                                <div className="flex space-x-2">
                                  <div className="flex-shrink-0">
                                    <VoteControls
                                      votes={reply.votes}
                                      userVote={reply.userVote ?? null}
                                      onVote={() => {}}
                                      size="sm"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-1">
                                      <span className="font-medium text-gray-700 dark:text-gray-300">
                                        {reply.author.username}
                                      </span>
                                      <span>•</span>
                                      <span>1h ago</span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                                      {reply.content}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {comments.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 