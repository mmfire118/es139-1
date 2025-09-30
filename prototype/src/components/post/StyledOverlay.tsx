import { OverlayData } from '../../types/Post';

interface StyledOverlayProps {
  overlay: OverlayData;
  currentVideoTime: number; // in seconds
}

export default function StyledOverlay({ overlay, currentVideoTime }: StyledOverlayProps) {
  // Calculate visibility based on video time
  const delay = overlay.delay || 0;
  const duration = overlay.duration || 0;

  const isVisible = (() => {
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

  if (!isVisible) return null;

  const colors = getCategoryColor(overlay.category);
  const style = overlay.style || 'modern';

  // Render different visual styles (same as VideoOverlay component)
  const renderOverlay = () => {
    switch (style) {
      case 'minimal':
        return (
          <div className="bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded">
            <div className="flex items-baseline space-x-2">
              <span className="text-white/70 text-[10px] font-medium uppercase tracking-wider">{overlay.label}</span>
              <span className="text-white text-lg font-bold">{overlay.value}</span>
            </div>
          </div>
        );

      case 'bold':
        return (
          <div className="border-4 rounded-lg overflow-hidden" style={{ borderColor: colors.primary, backgroundColor: colors.light }}>
            <div className="px-4 py-2">
              <div className="text-xs font-black uppercase tracking-widest mb-0.5" style={{ color: colors.secondary }}>
                {overlay.label}
              </div>
              <div className="text-3xl font-black" style={{ color: colors.primary }}>
                {overlay.value}
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
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{overlay.label}</div>
                <div className="text-2xl font-black tracking-tight" style={{ color: colors.primary }}>{overlay.value}</div>
              </div>
            </div>
          </div>
        );

      case 'neon':
        return (
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
                {overlay.label}
              </span>
              <span className="text-2xl font-black" style={{ color: colors.primary, textShadow: `0 0 15px ${colors.primary}` }}>
                {overlay.value}
              </span>
            </div>
          </div>
        );

      case 'classic':
        return (
          <div className="bg-gradient-to-r from-black/95 to-black/85 backdrop-blur-sm">
            <div className="h-0.5" style={{ backgroundColor: colors.primary }}></div>
            <div className="px-5 py-2 flex items-center space-x-3">
              <div className="w-1 h-8 rounded-full" style={{ backgroundColor: colors.primary }}></div>
              <div>
                <div className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                  {overlay.label}
                </div>
                <div className="text-xl font-black text-white tracking-tight">
                  {overlay.value}
                </div>
              </div>
            </div>
            <div className="h-0.5" style={{ backgroundColor: colors.primary }}></div>
          </div>
        );

      case 'compact':
        return (
          <div className="rounded px-2 py-1 text-xs font-bold shadow-lg" style={{ backgroundColor: colors.primary, color: 'white' }}>
            {overlay.label}: {overlay.value}
          </div>
        );

      case 'modern':
      default:
        return (
          <div className="relative">
            <div className="rounded-lg overflow-hidden backdrop-blur-sm shadow-xl" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}>
              <div className="h-1" style={{ backgroundColor: colors.primary, opacity: 0.6 }}></div>
              <div className="px-4 py-2">
                <div className="flex items-baseline space-x-2">
                  <div className="text-white/90 text-xs font-semibold uppercase tracking-wider">{overlay.label}</div>
                  <div className="text-white text-2xl font-black tracking-tight">{overlay.value}</div>
                </div>
              </div>
              <div className="h-0.5 bg-white/20"></div>
            </div>
            <div className="absolute inset-0 rounded-lg opacity-20 blur-xl -z-10" style={{ backgroundImage: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}></div>
          </div>
        );
    }
  };

  return (
    <div
      className="absolute z-10 select-none shadow-xl pointer-events-none"
      style={{
        left: `${overlay.position.x}px`,
        top: `${overlay.position.y}px`
      }}
    >
      {renderOverlay()}
    </div>
  );
}