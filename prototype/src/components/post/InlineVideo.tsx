import { useEffect, useMemo, useRef } from 'react';

type InlineVideoProps = {
  provider: 'mp4' | 'youtube';
  src: string; // mp4 url or youtubeId depending on provider
  poster?: string;
  className?: string;
  controls?: boolean;
  onTimeUpdate?: (currentTimeSec: number) => void;
  onPlay?: () => void;
  onPause?: () => void;
};

// A lightweight inline video that supports native MP4 and YouTube iframe with minimal chrome
export default function InlineVideo({
  provider,
  src,
  poster,
  className,
  controls = true,
  onTimeUpdate,
  onPlay,
  onPause,
}: InlineVideoProps) {
  const htmlVideoRef = useRef<HTMLVideoElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const pollingRef = useRef<number | null>(null);
  const ytPlayerRef = useRef<any>(null);
  const elementIdRef = useRef<string>('ytp_' + Math.random().toString(36).slice(2));
  const containerRef = useRef<HTMLDivElement | null>(null);
  const onTimeUpdateRef = useRef<typeof onTimeUpdate>();
  const onPlayRef = useRef<typeof onPlay>();
  const onPauseRef = useRef<typeof onPause>();

  const iframeSrc = useMemo(() => {
    if (provider !== 'youtube') return '';
    const id = src;
    const params = new URLSearchParams({ enablejsapi: '1', playsinline: '1' });
    return `https://www.youtube.com/embed/${id}?${params.toString()}`;
  }, [provider, src]);

  // Keep latest callbacks without retriggering player creation
  useEffect(() => { onTimeUpdateRef.current = onTimeUpdate; }, [onTimeUpdate]);
  useEffect(() => { onPlayRef.current = onPlay; }, [onPlay]);
  useEffect(() => { onPauseRef.current = onPause; }, [onPause]);

  // Initialize YT player once and when switching to youtube provider
  useEffect(() => {
    const win = window as any;
    if (provider !== 'youtube') {
      // tear down if switching away from youtube
      if (pollingRef.current) { clearInterval(pollingRef.current); pollingRef.current = null; }
      try { ytPlayerRef.current?.destroy?.(); } catch {}
      ytPlayerRef.current = null;
      return;
    }

    if (ytPlayerRef.current) {
      // already initialized
      return;
    }

    // Load API if needed
    if (!win.YT || !win.YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      (win as any).onYouTubeIframeAPIReady = () => {
        // guard against double init
        if (ytPlayerRef.current) return;
        const playerId = elementIdRef.current;
        if (!containerRef.current) return;
        containerRef.current.id = playerId;
        ytPlayerRef.current = new (win as any).YT.Player(playerId, {
          videoId: src,
          playerVars: { playsinline: 1, modestbranding: 1, rel: 0, controls: controls ? 1 : 0, fs: 1, iv_load_policy: 3 },
          events: {
            onReady: () => {
              if (pollingRef.current) { clearInterval(pollingRef.current); }
              pollingRef.current = window.setInterval(() => {
                try {
                  const t = ytPlayerRef.current?.getCurrentTime?.();
                  if (typeof t === 'number' && onTimeUpdateRef.current) onTimeUpdateRef.current(t);
                } catch {}
              }, 250);
            },
            onStateChange: (e: any) => {
              if (e?.data === 1 && onPlayRef.current) onPlayRef.current();
              if (e?.data === 2 && onPauseRef.current) onPauseRef.current();
            },
          },
        });
      };
    } else {
      // API ready now
      const playerId = elementIdRef.current;
      if (!containerRef.current) return;
      containerRef.current.id = playerId;
      ytPlayerRef.current = new (win as any).YT.Player(playerId, {
        videoId: src,
        playerVars: { playsinline: 1, modestbranding: 1, rel: 0, controls: controls ? 1 : 0, fs: 1, iv_load_policy: 3 },
        events: {
          onReady: () => {
            if (pollingRef.current) { clearInterval(pollingRef.current); }
            pollingRef.current = window.setInterval(() => {
              try {
                const t = ytPlayerRef.current?.getCurrentTime?.();
                if (typeof t === 'number' && onTimeUpdateRef.current) onTimeUpdateRef.current(t);
              } catch {}
            }, 250);
          },
          onStateChange: (e: any) => {
            if (e?.data === 1 && onPlayRef.current) onPlayRef.current();
            if (e?.data === 2 && onPauseRef.current) onPauseRef.current();
          },
        },
      });
    }
  }, [provider, controls, src]);

  // Update video when src changes (without recreating player)
  useEffect(() => {
    if (provider === 'youtube' && ytPlayerRef.current) {
      try {
        ytPlayerRef.current.cueVideoById(src);
      } catch {}
    }
  }, [provider, src]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) { clearInterval(pollingRef.current); pollingRef.current = null; }
      try { ytPlayerRef.current?.destroy?.(); } catch {}
      ytPlayerRef.current = null;
    };
  }, []);

  if (provider === 'mp4') {
    return (
      <video
        ref={htmlVideoRef}
        className={className}
        poster={poster}
        controls={controls}
        onTimeUpdate={(e) => onTimeUpdate && onTimeUpdate((e.target as HTMLVideoElement).currentTime)}
        onPlay={onPlay}
        onPause={onPause}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  // YouTube player container (API will replace with iframe)
  return (
    <div
      ref={containerRef}
      className={className}
      title="YouTube video player"
    />
  );
}


