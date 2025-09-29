import { ChevronUp, ChevronDown } from 'lucide-react';

interface VoteControlsProps {
  votes: number;
  userVote: 'up' | 'down' | null;
  onVote: (type: 'up' | 'down') => void;
  size?: 'sm' | 'md';
}

export default function VoteControls({ votes, userVote, onVote, size = 'md' }: VoteControlsProps) {
  const formatVotes = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const iconSize = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  const buttonSize = size === 'sm' ? 'p-1' : 'p-2';

  return (
    <div className="flex flex-col items-center space-y-1">
      <button
        onClick={() => onVote('up')}
        className={`vote-btn ${buttonSize} ${
          userVote === 'up' ? 'active-up' : ''
        }`}
        aria-label="Upvote"
      >
        <ChevronUp className={iconSize} />
      </button>
      
      <span className={`font-medium ${
        userVote === 'up' 
          ? 'text-reddit-orange' 
          : userVote === 'down' 
          ? 'text-blue-600' 
          : 'text-gray-600 dark:text-gray-400'
      } ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {formatVotes(votes)}
      </span>
      
      <button
        onClick={() => onVote('down')}
        className={`vote-btn ${buttonSize} ${
          userVote === 'down' ? 'active-down' : ''
        }`}
        aria-label="Downvote"
      >
        <ChevronDown className={iconSize} />
      </button>
    </div>
  );
} 