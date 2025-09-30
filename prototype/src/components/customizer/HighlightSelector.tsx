import { CustomizableHighlight } from '../../types';

interface HighlightSelectorProps {
  highlights: CustomizableHighlight[];
  selectedHighlight: CustomizableHighlight | null;
  onHighlightSelect: (highlight: CustomizableHighlight) => void;
}

export default function HighlightSelector({ 
  highlights, 
  selectedHighlight, 
  onHighlightSelect 
}: HighlightSelectorProps) {
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
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Select a Highlight to Customize
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            onClick={() => onHighlightSelect(highlight)}
            className={`cursor-pointer rounded-lg border-2 transition-all duration-200 hover:shadow-lg ${
              selectedHighlight?.id === highlight.id
                ? 'border-reddit-orange bg-orange-50 dark:bg-orange-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
          >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-t-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
              <img
                src={highlight.thumbnailUrl}
                alt={highlight.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-white border-y-[6px] border-y-transparent ml-1"></div>
                </div>
              </div>
              
              {/* Sport Badge */}
              <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white bg-opacity-90 rounded-full px-2 py-1">
                <span className="text-sm">{getSportIcon(highlight.context.sport)}</span>
                <span className="text-xs font-medium text-gray-700">
                  {highlight.context.league}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                {highlight.title}
              </h4>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {highlight.context.teams.away.shortName} @ {highlight.context.teams.home.shortName}
                {highlight.context.score && (
                  <span className="ml-1">
                    ({highlight.context.score.away}-{highlight.context.score.home})
                  </span>
                )}
              </div>

              {/* Facts Count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {highlight.availableFacts.length} facts available
                  </span>
                </div>
                
                <div className="flex space-x-1">
                  {['performance', 'context', 'probability'].map(category => {
                    const count = highlight.availableFacts.filter(fact => fact.category === category).length;
                    if (count === 0) return null;
                    
                    return (
                      <span
                        key={category}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          category === 'performance' ? 'bg-green-100 text-green-800' :
                          category === 'context' ? 'bg-blue-100 text-blue-800' :
                          'bg-purple-100 text-purple-800'
                        }`}
                      >
                        {count}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {highlights.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            No highlights available for customization
          </p>
        </div>
      )}
    </div>
  );
} 