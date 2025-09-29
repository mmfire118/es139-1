import { useState, useRef, useEffect, useCallback } from 'react';
import { GripVertical } from 'lucide-react';
import { HighlightFact } from '../../types';
import { OverlayStyle } from '../../types/Customizer';

interface VideoOverlayProps {
  fact: HighlightFact;
  position: { x: number; y: number };
  isDraggable: boolean;
  style?: OverlayStyle;
  duration?: number;
  delay?: number;
  currentVideoTime?: number; // in seconds, undefined means always show (for editor preview)
  onPositionChange?: (position: { x: number; y: number }) => void;
}

export default function VideoOverlay({
  fact,
  position,
  isDraggable,
  style = 'modern',
  duration = 0,
  delay = 0,
  currentVideoTime,
  onPositionChange
}: VideoOverlayProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(position);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Update position when prop changes
  useEffect(() => {
    setCurrentPosition(position);
  }, [position]);

  // Calculate visibility based on video time (or always show in editor)
  const isVisible = (() => {
    // If no video time provided, always show (editor mode)
    if (currentVideoTime === undefined) return true;

    // If video hasn't reached delay time yet, don't show
    if (currentVideoTime < delay) return false;

    // If duration is 0, always show after delay
    if (duration === 0) return true;

    // If duration is set, show between delay and delay+duration
    const endTime = delay + duration;
    return currentVideoTime >= delay && currentVideoTime < endTime;
  })();

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'performance':
        return { primary: '#10b981', secondary: '#059669', light: '#d1fae5' };
      case 'context':
        return { primary: '#3b82f6', secondary: '#2563eb', light: '#dbeafe' };
      case 'probability':
        return { primary: '#a855f7', secondary: '#9333ea', light: '#f3e8ff' };
      default:
        return { primary: '#6b7280', secondary: '#4b5563', light: '#f3f4f6' };
    }
  };

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isDraggable || !overlayRef.current) return;
    e.preventDefault();
    e.stopPropagation();

    const rect = overlayRef.current.getBoundingClientRect();
    dragStartPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    setIsDragging(true);
  }, [isDraggable]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !overlayRef.current || !onPositionChange) return;

    const container = overlayRef.current.parentElement;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const overlayWidth = overlayRef.current.offsetWidth;
    const overlayHeight = overlayRef.current.offsetHeight;

    let newX = e.clientX - containerRect.left - dragStartPos.current.x;
    let newY = e.clientY - containerRect.top - dragStartPos.current.y;

    newX = Math.max(0, Math.min(containerRect.width - overlayWidth, newX));
    newY = Math.max(0, Math.min(containerRect.height - overlayHeight, newY));

    setCurrentPosition({ x: newX, y: newY });
  }, [isDragging, onPositionChange]);

  const handleMouseUp = useCallback(() => {
    if (isDragging && onPositionChange) {
      onPositionChange(currentPosition);
    }
    setIsDragging(false);
  }, [isDragging, currentPosition, onPositionChange]);

  useEffect(() => {
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
  }, [isDragging, handleMouseMove, handleMouseUp]);

  if (!isVisible) return null;

  const colors = getCategoryColor(fact.category);

  // Render different visual styles
  const renderOverlay = () => {
    switch (style) {
      case 'minimal':
        return (
          <div className="bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded">
            <div className="flex items-baseline space-x-2">
              <span className="text-white/70 text-[10px] font-medium uppercase tracking-wider">{fact.label}</span>
              <span className="text-white text-lg font-bold">{fact.value}</span>
            </div>
          </div>
        );

      case 'bold':
        return (
          <div
            className="border-4 rounded-lg overflow-hidden"
            style={{ borderColor: colors.primary, backgroundColor: colors.light }}
          >
            <div className="px-4 py-2">
              <div className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: colors.secondary }}>
                {fact.label}
              </div>
              <div className="text-3xl font-black" style={{ color: colors.primary }}>
                {fact.value}
              </div>
            </div>
          </div>
        );

      case 'broadcast':
        return (
          <div className="relative">
            <div className="absolute -left-2 top-0 bottom-0 w-1.5 rounded-full" style={{ backgroundColor: colors.primary }}></div>
            <div className="bg-white shadow-2xl pl-4 pr-5 py-2.5 border-l-4" style={{ borderLeftColor: colors.primary }}>
              <div className="flex items-baseline space-x-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {fact.label}
                </div>
                <div className="text-2xl font-black tracking-tight" style={{ color: colors.primary }}>
                  {fact.value}
                </div>
              </div>
            </div>
          </div>
        );

      case 'neon':
        return (
          <div className="relative">
            <div
              className="rounded-lg px-4 py-2.5 border-2"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                borderColor: colors.primary,
                boxShadow: `0 0 20px ${colors.primary}80, inset 0 0 10px ${colors.primary}40`
              }}
            >
              <div className="flex items-baseline space-x-2">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: colors.primary, textShadow: `0 0 10px ${colors.primary}` }}>
                  {fact.label}
                </span>
                <span className="text-2xl font-black" style={{ color: colors.primary, textShadow: `0 0 15px ${colors.primary}` }}>
                  {fact.value}
                </span>
              </div>
            </div>
          </div>
        );

      case 'classic':
        return (
          <div className="relative">
            <div className="bg-gradient-to-r from-black/95 to-black/85 backdrop-blur-sm">
              <div className="h-0.5" style={{ backgroundColor: colors.primary }}></div>
              <div className="px-5 py-2 flex items-center space-x-3">
                <div className="w-1 h-8 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                    {fact.label}
                  </div>
                  <div className="text-xl font-black text-white tracking-tight">
                    {fact.value}
                  </div>
                </div>
              </div>
              <div className="h-0.5" style={{ backgroundColor: colors.primary }}></div>
            </div>
          </div>
        );

      case 'compact':
        return (
          <div
            className="rounded px-2 py-1 text-xs font-bold shadow-lg"
            style={{ backgroundColor: colors.primary, color: 'white' }}
          >
            {fact.label}: {fact.value}
          </div>
        );

      case 'modern':
      default:
        return (
          <div className="relative">
            <div className={`bg-gradient-to-r rounded-lg overflow-hidden backdrop-blur-sm shadow-xl`}
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
              }}>
              <div className="h-1" style={{ backgroundColor: colors.primary, opacity: 0.6 }}></div>
              <div className="px-4 py-2 flex items-center space-x-3">
                {isDraggable && (
                  <div className="opacity-60 hover:opacity-100 transition-opacity">
                    <GripVertical className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="flex items-baseline space-x-2">
                  <div className="text-white/90 text-xs font-semibold uppercase tracking-wider">
                    {fact.label}
                  </div>
                  <div className="text-white text-2xl font-black tracking-tight">
                    {fact.value}
                  </div>
                </div>
              </div>
              <div className="h-0.5 bg-white/20"></div>
            </div>
            <div
              className="absolute inset-0 rounded-lg opacity-20 blur-xl -z-10"
              style={{
                backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`
              }}
            ></div>
          </div>
        );
    }
  };

  return (
    <div
      ref={overlayRef}
      className={`absolute z-20 select-none transition-shadow duration-200 ${
        isDraggable ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
      } ${isDragging ? 'scale-105' : ''}`}
      style={{
        left: `${currentPosition.x}px`,
        top: `${currentPosition.y}px`,
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.2s ease-out'
      }}
      onMouseDown={handleMouseDown}
    >
      {renderOverlay()}
      {isDraggable && !isDragging && (
        <div className="absolute -top-1 -right-1 w-3 h-3 animate-pulse">
          <div className="w-full h-full rounded-full bg-red-500 opacity-75"></div>
        </div>
      )}
    </div>
  );
}