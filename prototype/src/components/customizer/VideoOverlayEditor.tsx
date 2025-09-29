import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize, Eye, EyeOff, Grid, RotateCcw } from 'lucide-react';
import VideoOverlay from './VideoOverlay';
import { CustomizableHighlight, VideoOverlay as VideoOverlayType, HighlightFact } from '../../types';

interface VideoOverlayEditorProps {
  highlight: CustomizableHighlight;
  onOverlayChange: (overlays: VideoOverlayType[]) => void;
}

export default function VideoOverlayEditor({ highlight, onOverlayChange }: VideoOverlayEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlays, setShowOverlays] = useState(true);
  const [overlays, setOverlays] = useState<VideoOverlayType[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Preset positions for easy placement
  const presetPositions = [
    { name: 'Top Left', x: 20, y: 20 },
    { name: 'Top Center', x: 50, y: 20 }, // Will be calculated as percentage
    { name: 'Top Right', x: 80, y: 20 },
    { name: 'Bottom Left', x: 20, y: 80 },
    { name: 'Bottom Center', x: 50, y: 80 },
    { name: 'Bottom Right', x: 80, y: 80 },
  ];

  // Initialize overlays when selected facts change
  useEffect(() => {
    const containerWidth = containerRef.current?.offsetWidth || 800;
    const containerHeight = containerRef.current?.offsetHeight || 450;
    
    const newOverlays: VideoOverlayType[] = highlight.selectedFacts.map((factId, index) => {
      // Use preset positions, cycling through them
      const preset = presetPositions[index % presetPositions.length];
      
      return {
        factId,
        isVisible: true,
        position: {
          x: (preset.x / 100) * containerWidth - 100, // Convert percentage to pixels
          y: (preset.y / 100) * containerHeight - 30
        }
      };
    });
    
    setOverlays(newOverlays);
    onOverlayChange(newOverlays);
  }, [highlight.selectedFacts, onOverlayChange]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleOverlayPositionChange = (factId: string, newPosition: { x: number; y: number }) => {
    const updatedOverlays = overlays.map(overlay =>
      overlay.factId === factId
        ? { ...overlay, position: newPosition }
        : overlay
    );
    setOverlays(updatedOverlays);
    onOverlayChange(updatedOverlays);
  };

  const handleAutoArrange = () => {
    const containerWidth = containerRef.current?.offsetWidth || 800;
    const containerHeight = containerRef.current?.offsetHeight || 450;
    
    const updatedOverlays = overlays.map((overlay, index) => {
      const preset = presetPositions[index % presetPositions.length];
      return {
        ...overlay,
        position: {
          x: Math.max(10, (preset.x / 100) * containerWidth - 100),
          y: Math.max(10, (preset.y / 100) * containerHeight - 30)
        }
      };
    });
    
    setOverlays(updatedOverlays);
    onOverlayChange(updatedOverlays);
  };

  const getFactById = (factId: string): HighlightFact | undefined => {
    return highlight.availableFacts.find(fact => fact.id === factId);
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
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Video Header */}
      <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{getSportIcon(highlight.context.sport)}</span>
            <div>
              <h2 className="text-lg font-semibold text-white">{highlight.title}</h2>
              <p className="text-sm text-gray-400">
                {highlight.context.teams.away.shortName} @ {highlight.context.teams.home.shortName}
                {highlight.context.score && (
                  <span className="ml-2">
                    ({highlight.context.score.away}-{highlight.context.score.home})
                  </span>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {overlays.length > 0 && (
              <button
                onClick={handleAutoArrange}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
                title="Auto-arrange overlays"
              >
                <Grid className="w-4 h-4" />
                <span className="text-sm">Auto Arrange</span>
              </button>
            )}
            
            <button
              onClick={() => setShowOverlays(!showOverlays)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                showOverlays 
                  ? 'bg-reddit-orange text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {showOverlays ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span className="text-sm">{showOverlays ? 'Hide' : 'Show'} Overlays</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Container */}
      <div className="flex-1 relative bg-black flex items-center justify-center">
        <div 
          ref={containerRef}
          className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden"
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain"
            poster={highlight.thumbnailUrl}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={highlight.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Overlays */}
          {showOverlays && overlays.map(overlay => {
            const fact = getFactById(overlay.factId);
            if (!fact || !overlay.isVisible) return null;

            return (
              <VideoOverlay
                key={overlay.factId}
                fact={fact}
                position={overlay.position}
                isDraggable={true}
                onPositionChange={(newPosition) => 
                  handleOverlayPositionChange(overlay.factId, newPosition)
                }
              />
            );
          })}

          {/* Play/Pause Overlay */}
          <div 
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-200"
            onClick={handlePlayPause}
          >
            <div className="w-16 h-16 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white ml-0" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="bg-gray-800 px-4 py-3 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePlayPause}
              className="flex items-center justify-center w-10 h-10 bg-reddit-orange hover:bg-orange-600 rounded-full transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-white" />
              ) : (
                <Play className="w-5 h-5 text-white ml-0.5" />
              )}
            </button>
            
            <div className="text-sm text-gray-400">
              {highlight.context.gameType} • {highlight.context.league}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-gray-400" />
            <Maximize className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>
      </div>

      {/* Overlay Instructions */}
      {highlight.selectedFacts.length > 0 && (
        <div className="bg-gray-800 px-4 py-2 border-t border-gray-700">
          <p className="text-xs text-gray-400 text-center">
            💡 Drag overlays to reposition • Use "Auto Arrange" for quick setup • Toggle visibility with the eye icon
          </p>
        </div>
      )}
    </div>
  );
} 