import { useState } from 'react';
import { Search, TrendingUp, Info, Zap } from 'lucide-react';
import { HighlightFact } from '../../types';

interface FactSidebarProps {
  facts: HighlightFact[];
  selectedFacts: string[];
  onFactToggle: (factId: string) => void;
}

export default function FactSidebar({ facts, selectedFacts, onFactToggle }: FactSidebarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Facts', icon: null },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'context', label: 'Context', icon: Info },
    { id: 'probability', label: 'Probability', icon: Zap }
  ];

  const filteredFacts = facts.filter(fact => {
    const matchesSearch = fact.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fact.value.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || fact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });


  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'performance':
        return 'bg-green-100 text-green-800';
      case 'context':
        return 'bg-blue-100 text-blue-800';
      case 'probability':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Available Facts
        </h3>
        
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search facts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-reddit-orange focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map(category => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-reddit-orange text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                <span>{category.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Facts List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredFacts.map(fact => (
          <div
            key={fact.id}
            className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
              selectedFacts.includes(fact.id)
                ? 'border-reddit-orange bg-orange-50 dark:bg-orange-900/20'
                : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
            }`}
            onClick={() => onFactToggle(fact.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {fact.label}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getCategoryBadgeColor(fact.category)}`}>
                    {fact.category}
                  </span>
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {fact.value}
                </div>
              </div>
              
              <div className="ml-2">
                <input
                  type="checkbox"
                  checked={selectedFacts.includes(fact.id)}
                  onChange={() => onFactToggle(fact.id)}
                  className="w-4 h-4 text-reddit-orange bg-gray-100 border-gray-300 rounded focus:ring-reddit-orange focus:ring-2"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        ))}

        {filteredFacts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No facts found matching your criteria
            </p>
          </div>
        )}
      </div>

      {/* Selected Facts Summary */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Selected Facts: {selectedFacts.length} / {facts.length}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          Click facts above to add overlays to your video
        </div>
      </div>
    </div>
  );
} 