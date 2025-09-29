import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import PostCard from '../components/post/PostCard';
import LiveGames from '../components/live/LiveGames';
import { mockPosts, getSortedPosts } from '../data/mockPosts';
import { Post, SortOption } from '../types';

const POSTS_STORAGE_KEY = 'highlighthub_custom_posts';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentSort, setCurrentSort] = useState<SortOption>('hot');

  // Load posts from localStorage and merge with mock posts
  useEffect(() => {
    const loadPosts = () => {
      try {
        const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
        const customPosts = storedPosts ? JSON.parse(storedPosts) : [];
        // Convert date strings back to Date objects
        const parsedCustomPosts = customPosts.map((post: any) => ({
          ...post,
          createdAt: new Date(post.createdAt),
          updatedAt: new Date(post.updatedAt)
        }));
        return [...parsedCustomPosts, ...mockPosts];
      } catch (error) {
        console.error('Error loading posts from localStorage:', error);
        return mockPosts;
      }
    };

    const allPosts = loadPosts();
    const sortParam = searchParams.get('sort') as SortOption;
    const validSort = ['hot', 'top', 'new'].includes(sortParam) ? sortParam : 'hot';
    setCurrentSort(validSort);
    setPosts(getSortedPosts(allPosts, validSort));
  }, [searchParams]);

  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setPosts(prevPosts =>
      prevPosts.map(post => {
        if (post.id === postId) {
          let newVotes = post.votes;
          let newUserVote: 'up' | 'down' | null = voteType;

          // Handle vote logic
          if (post.userVote === voteType) {
            // Remove vote if clicking same button
            newUserVote = null;
            newVotes += voteType === 'up' ? -1 : 1;
          } else if (post.userVote) {
            // Change vote from opposite
            newVotes += voteType === 'up' ? 2 : -2;
          } else {
            // New vote
            newVotes += voteType === 'up' ? 1 : -1;
          }

          return { ...post, votes: newVotes, userVote: newUserVote };
        }
        return post;
      })
    );
  };

  const handleSortChange = (sort: SortOption) => {
    setSearchParams(sort === 'hot' ? {} : { sort });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Live Games Section */}
      <div className="mb-6">
        <LiveGames />
      </div>

      {/* Sort Tabs */}
      <div className="flex space-x-1 mb-6 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700">
        {(['hot', 'top', 'new'] as SortOption[]).map((sort) => (
          <button
            key={sort}
            onClick={() => handleSortChange(sort)}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              currentSort === sort
                ? 'bg-reddit-orange text-white'
                : 'text-gray-600 dark:text-gray-300 hover:text-reddit-orange hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {sort.charAt(0).toUpperCase() + sort.slice(1)}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onVote={handleVote}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
} 