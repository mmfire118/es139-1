import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Clock } from 'lucide-react';

interface PlayerStat {
  name: string;
  team: 'home' | 'away';
  stat: string;
  value: string;
}

interface GameEvent {
  id: string;
  time: string;
  type: 'goal' | 'card' | 'substitution' | 'shot' | 'corner';
  team: 'home' | 'away';
  description: string;
  icon: string;
}

interface LiveGame {
  id: string;
  league: string;
  homeTeam: {
    name: string;
    shortName: string;
    logo: string;
    score: number;
  };
  awayTeam: {
    name: string;
    shortName: string;
    logo: string;
    score: number;
  };
  time: string;
  period: string;
  isLive: boolean;
  winProbability: {
    home: number;
    away: number;
  };
  recentStats: PlayerStat[];
  events: GameEvent[];
}

const mockEvents: GameEvent[] = [
  { id: '1', time: "67'", type: 'goal', team: 'home', description: 'GOAL! Vinícius Jr. scores', icon: '⚽' },
  { id: '2', time: "65'", type: 'shot', team: 'home', description: 'Bellingham shot on target', icon: '🎯' },
  { id: '3', time: "61'", type: 'corner', team: 'away', description: 'Corner for Barcelona', icon: '🚩' },
  { id: '4', time: "58'", type: 'card', team: 'away', description: 'Yellow card - Gavi', icon: '🟨' },
  { id: '5', time: "52'", type: 'substitution', team: 'home', description: 'Rodrygo → Modrić', icon: '🔄' },
  { id: '6', time: "46'", type: 'shot', team: 'away', description: 'Raphinha shot wide', icon: '➡️' }
];

const mockLiveGames: LiveGame[] = [
  {
    id: 'live_1',
    league: 'La Liga',
    homeTeam: {
      name: 'Real Madrid',
      shortName: 'RMA',
      logo: 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
      score: 2
    },
    awayTeam: {
      name: 'FC Barcelona',
      shortName: 'FCB',
      logo: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
      score: 1
    },
    time: "67'",
    period: '2nd Half',
    isLive: true,
    winProbability: {
      home: 58,
      away: 42
    },
    recentStats: [
      { name: 'Vinícius Jr.', team: 'home', stat: 'Goal', value: "65'" },
      { name: 'Jude Bellingham', team: 'home', stat: 'Assists', value: '2' },
      { name: 'Robert Lewandowski', team: 'away', stat: 'Goal', value: "34'" },
      { name: 'Frenkie de Jong', team: 'away', stat: 'Pass Accuracy', value: '94%' }
    ],
    events: mockEvents
  }
];

export default function LiveGames() {
  const [game] = useState<LiveGame>(mockLiveGames[0]);
  const [pulseAnimation, setPulseAnimation] = useState(true);
  const [winProb, setWinProb] = useState({ home: 58, away: 42 });
  const [displayedEvents, setDisplayedEvents] = useState<GameEvent[]>([game.events[0]]);
  const [eventIndex, setEventIndex] = useState(0);

  // Pulse animation for live indicator
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animate win probability
  useEffect(() => {
    const probabilities = [
      { home: 58, away: 42 },
      { home: 61, away: 39 },
      { home: 59, away: 41 },
      { home: 63, away: 37 },
      { home: 60, away: 40 },
      { home: 62, away: 38 }
    ];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % probabilities.length;
      setWinProb(probabilities[index]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Stream in new events
  useEffect(() => {
    if (eventIndex >= game.events.length - 1) return;

    const interval = setInterval(() => {
      setEventIndex(prev => {
        const next = prev + 1;
        if (next < game.events.length) {
          setDisplayedEvents(prevEvents => [game.events[next], ...prevEvents].slice(0, 5));
          return next;
        }
        return prev;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [eventIndex, game.events]);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl overflow-hidden shadow-2xl border border-gray-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`w-3 h-3 bg-red-500 rounded-full ${pulseAnimation ? 'animate-ping absolute' : ''}`}></div>
              <div className="w-3 h-3 bg-red-500 rounded-full relative"></div>
            </div>
            <span className="text-white font-bold text-lg uppercase tracking-wider">Live</span>
            <div className="h-5 w-px bg-white/30"></div>
            <span className="text-white/90 font-medium">{game.league}</span>
          </div>
          <div className="flex items-center space-x-2 text-white/90">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">{game.time}</span>
            <span className="text-xs">•</span>
            <span className="text-sm">{game.period}</span>
          </div>
        </div>
      </div>

      {/* Main Score Display */}
      <div className="px-6 py-8 bg-gradient-to-b from-gray-800 to-gray-850">
        <div className="flex items-center justify-between">
          {/* Home Team */}
          <div className="flex-1 flex items-center space-x-4">
            <div className="w-20 h-20 bg-white rounded-full p-3 shadow-lg">
              <img src={game.homeTeam.logo} alt={game.homeTeam.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-white font-bold text-2xl">{game.homeTeam.shortName}</h3>
              <p className="text-gray-400 text-sm">{game.homeTeam.name}</p>
            </div>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-6 mx-8">
            <div className="text-center">
              <div className="text-6xl font-black text-white">{game.homeTeam.score}</div>
            </div>
            <div className="text-4xl font-bold text-gray-600">-</div>
            <div className="text-center">
              <div className="text-6xl font-black text-white">{game.awayTeam.score}</div>
            </div>
          </div>

          {/* Away Team */}
          <div className="flex-1 flex items-center justify-end space-x-4">
            <div className="text-right">
              <h3 className="text-white font-bold text-2xl">{game.awayTeam.shortName}</h3>
              <p className="text-gray-400 text-sm">{game.awayTeam.name}</p>
            </div>
            <div className="w-20 h-20 bg-white rounded-full p-3 shadow-lg">
              <img src={game.awayTeam.logo} alt={game.awayTeam.name} className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>

      {/* Win Probability */}
      <div className="px-6 py-4 bg-gray-800/50">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="text-gray-400 font-medium">Win Probability</span>
          <div className="flex items-center space-x-4">
            <span className="text-white font-bold">{winProb.home}%</span>
            <span className="text-gray-500">|</span>
            <span className="text-white font-bold">{winProb.away}%</span>
          </div>
        </div>
        <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-in-out"
            style={{ width: `${winProb.home}%` }}
          ></div>
          <div
            className="absolute right-0 h-full bg-gradient-to-l from-red-500 to-red-600 transition-all duration-1000 ease-in-out"
            style={{ width: `${winProb.away}%` }}
          ></div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-blue-400">
            {winProb.home > 50 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span className="text-xs font-medium">{game.homeTeam.shortName}</span>
          </div>
          <div className="flex items-center space-x-1 text-red-400">
            <span className="text-xs font-medium">{game.awayTeam.shortName}</span>
            {winProb.away > 50 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Events + Stats */}
      <div className="grid grid-cols-2 gap-4 px-6 py-4 bg-gray-900/50 border-t border-gray-700">
        {/* Live Events Stream */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Live Events</h4>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
            {displayedEvents.map((event, index) => (
              <div
                key={event.id}
                className={`flex items-center space-x-3 p-2 rounded-lg border transition-all duration-500 ${
                  index === 0 ? 'bg-reddit-orange/20 border-reddit-orange/40 scale-105' : 'bg-gray-800/50 border-gray-700/50'
                } ${event.team === 'home' ? 'border-l-4 border-l-blue-500' : 'border-l-4 border-l-red-500'}`}
              >
                <span className="text-2xl">{event.icon}</span>
                <div className="flex-1">
                  <div className="text-xs text-gray-400 font-medium">{event.time}</div>
                  <div className={`text-sm font-semibold ${index === 0 ? 'text-white' : 'text-gray-300'}`}>
                    {event.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Stats */}
        <div>
          <h4 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-3">Key Stats</h4>
          <div className="grid grid-cols-1 gap-2">
            {game.recentStats.slice(0, 4).map((stat, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-2 rounded-lg border ${
                  stat.team === 'home'
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}
              >
                <div>
                  <div className={`text-sm font-bold ${stat.team === 'home' ? 'text-blue-400' : 'text-red-400'}`}>
                    {stat.name}
                  </div>
                  <div className="text-xs text-gray-400">{stat.stat}</div>
                </div>
                <div className={`text-lg font-black ${stat.team === 'home' ? 'text-blue-300' : 'text-red-300'}`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4 bg-gradient-to-b from-gray-900 to-black border-t border-gray-700">
        <div className="flex items-center justify-center space-x-3">
          <button className="flex-1 bg-reddit-orange hover:bg-orange-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors">
            Watch Live
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors">
            Stats
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors">
            Highlights
          </button>
        </div>
      </div>
    </div>
  );
}