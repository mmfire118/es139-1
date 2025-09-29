import { useState, useRef, useEffect } from 'react';
import { Move } from 'lucide-react';
import { HighlightFact } from '../../types';

interface VideoOverlayProps {
  fact: HighlightFact;
  position: { x: number; y: number };
  isDraggable: boolean;
  onPositionChange?: (position: { x: number; y: number }) => void;
}

export default function VideoOverlay({ 
  fact, 
  position, 
  isDraggable, 
  onPositionChange 
}: VideoOverlayProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance':
        return 'bg-green-600 border-green-500';
      case 'context':
        return 'bg-blue-600 border-blue-500';
      case 'probability':
        return 'bg-purple-600 border-purple-500';
      default:
        return 'bg-gray-600 border-gray-500';
    }
  };

  // Global mouse event handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !onPositionChange) return;

      // Calculate new position relative to the video container
      const container = overlayRef.current?.parentElement;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const newX = e.clientX - containerRect.left - dragOffset.x;
      const newY = e.clientY - containerRect.top - dragOffset.y;

      // Constrain to container bounds
      const overlayWidth = overlayRef.current?.offsetWidth || 100;
      const overlayHeight = overlayRef.current?.offsetHeight || 40;
      
      const constrainedX = Math.max(0, Math.min(containerRect.width - overlayWidth, newX));
      const constrainedY = Math.max(0, Math.min(containerRect.height - overlayHeight, newY));

      onPositionChange({ x: constrainedX, y: constrainedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, dragOffset, onPositionChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isDraggable) return;
    
    e.preventDefault();
    e.stopPropagation();

    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect) return;

    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setIsDragging(true);
  };

  return (
    <div
      ref={overlayRef}
      className={`absolute z-20 ${getCategoryColor(fact.category)} text-white text-sm rounded-lg shadow-lg border-2 transition-all duration-200 select-none ${
        isDraggable ? 'cursor-grab hover:scale-105' : 'cursor-default'
      } ${isDragging ? 'scale-110 shadow-xl cursor-grabbing' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center space-x-2 px-3 py-2">
        {/* Drag Handle */}
        {isDraggable && (
          <Move className="w-3 h-3 opacity-60" />
        )}
        
        <div className="flex items-center space-x-2">
          <div className="font-medium">{fact.label}</div>
          <div className="font-bold">{fact.value}</div>
        </div>
      </div>
      
      {/* Category indicator */}
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white opacity-75">
        <div className={`w-full h-full rounded-full ${
          fact.category === 'performance' ? 'bg-green-400' :
          fact.category === 'context' ? 'bg-blue-400' :
          'bg-purple-400'
        }`}></div>
      </div>

      {/* Visual feedback for draggable state */}
      {isDraggable && !isDragging && (
        <div className="absolute inset-0 border-2 border-white border-opacity-30 rounded-lg pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
          <div className="absolute -top-2 -left-2 bg-white text-gray-800 text-xs px-1 rounded text-center">
            Drag to move
          </div>
        </div>
      )}
    </div>
  );
} 