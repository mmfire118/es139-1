import { Settings, Sparkles, Zap, Tv, Radio, Award, Minimize2 } from 'lucide-react';
import { OverlayStyle } from '../../types';

interface StyleSettingsProps {
  selectedStyle: OverlayStyle;
  duration: number;
  onStyleChange: (style: OverlayStyle) => void;
  onDurationChange: (duration: number) => void;
}

const STYLE_OPTIONS = [
  {
    id: 'modern' as OverlayStyle,
    name: 'Modern',
    icon: Sparkles,
    description: 'Gradient with glow',
    colors: 'bg-gradient-to-r from-emerald-500 to-green-600'
  },
  {
    id: 'minimal' as OverlayStyle,
    name: 'Minimal',
    icon: Minimize2,
    description: 'Clean & simple',
    colors: 'bg-black/80'
  },
  {
    id: 'bold' as OverlayStyle,
    name: 'Bold',
    icon: Zap,
    description: 'Thick borders, high contrast',
    colors: 'border-4 border-blue-500 bg-blue-50'
  },
  {
    id: 'broadcast' as OverlayStyle,
    name: 'Broadcast',
    icon: Tv,
    description: 'TV news style',
    colors: 'bg-white border-l-4 border-blue-500'
  },
  {
    id: 'neon' as OverlayStyle,
    name: 'Neon',
    icon: Radio,
    description: 'Glowing effect',
    colors: 'bg-black border-2 border-purple-500'
  },
  {
    id: 'classic' as OverlayStyle,
    name: 'Classic',
    icon: Award,
    description: 'Traditional lower-third',
    colors: 'bg-gradient-to-r from-black/95 to-black/85'
  },
  {
    id: 'compact' as OverlayStyle,
    name: 'Compact',
    icon: Minimize2,
    description: 'Small, corner-friendly',
    colors: 'bg-purple-500'
  }
];

const DURATION_OPTIONS = [
  { value: 0, label: 'Always Visible' },
  { value: 3, label: '3 seconds' },
  { value: 5, label: '5 seconds' },
  { value: 10, label: '10 seconds' },
  { value: 15, label: '15 seconds' }
];

export default function StyleSettings({
  selectedStyle,
  duration,
  onStyleChange,
  onDurationChange
}: StyleSettingsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="w-5 h-5 text-reddit-orange" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Visual Style & Timing
        </h3>
      </div>

      {/* Style Options */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Overlay Design
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {STYLE_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedStyle === option.id;

            return (
              <button
                key={option.id}
                onClick={() => onStyleChange(option.id)}
                className={`relative p-3 rounded-lg border-2 transition-all text-left hover:scale-105 ${
                  isSelected
                    ? 'border-reddit-orange bg-orange-50 dark:bg-orange-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                {/* Style preview */}
                <div className={`h-8 ${option.colors} rounded mb-2 flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${option.id === 'broadcast' || option.id === 'bold' ? 'text-gray-700' : 'text-white'}`} />
                </div>

                <div className={`font-semibold text-sm mb-1 ${isSelected ? 'text-reddit-orange' : 'text-gray-900 dark:text-white'}`}>
                  {option.name}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {option.description}
                </div>

                {isSelected && (
                  <div className="absolute -top-1 -right-1">
                    <div className="w-5 h-5 bg-reddit-orange rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Duration Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Display Duration
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {DURATION_OPTIONS.map((option) => {
            const isSelected = duration === option.value;

            return (
              <button
                key={option.value}
                onClick={() => onDurationChange(option.value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105 ${
                  isSelected
                    ? 'bg-reddit-orange text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {duration === 0 ? '⏱️ Overlays stay visible throughout the video' : `⏱️ Overlays auto-hide after ${duration} seconds`}
        </p>
      </div>
    </div>
  );
}