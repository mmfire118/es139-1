import { CustomizableHighlight } from '../types';

export const mockCustomizableHighlights: CustomizableHighlight[] = [
  {
    id: 'custom1',
    title: 'Mahomes No-Look TD Pass',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    videoProvider: 'youtube',
    youtubeId: 'S1QQ6YiUO_I',
    thumbnailUrl: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=800&h=450&fit=crop',
    context: {
      sport: 'football',
      league: 'NFL',
      teams: {
        home: {
          id: 'kc',
          name: 'Kansas City Chiefs',
          shortName: 'KC',
          logo: '🏈',
          primaryColor: '#E31837'
        },
        away: {
          id: 'buf',
          name: 'Buffalo Bills',
          shortName: 'BUF',
          logo: '🦬',
          primaryColor: '#00338D'
        }
      },
      gameDate: new Date('2023-10-12'),
      gameType: 'Regular Season',
      quarter: 2,
      timeRemaining: '3:47',
      score: {
        home: 14,
        away: 10
      }
    },
    availableFacts: [
      {
        id: 'fact1',
        label: 'Completion %',
        value: '78%',
        category: 'performance'
      },
      {
        id: 'fact2',
        label: 'Defensive Scheme',
        value: 'Cover 2',
        category: 'context'
      },
      {
        id: 'fact3',
        label: 'Win Probability Shift',
        value: '+12%',
        category: 'probability'
      },
      {
        id: 'fact4',
        label: 'Pass Distance',
        value: '42 yards',
        category: 'performance'
      },
      {
        id: 'fact5',
        label: 'Game Situation',
        value: 'Red Zone',
        category: 'context'
      },
      {
        id: 'fact6',
        label: 'Expected Points',
        value: '+6.2',
        category: 'probability'
      }
    ],
    selectedFacts: []
  },
  {
    id: 'custom2',
    title: 'Curry Logo Three',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    videoProvider: 'youtube',
    youtubeId: 'uC0VY3EeBnA',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=800&h=450&fit=crop',
    context: {
      sport: 'basketball',
      league: 'NBA',
      teams: {
        home: {
          id: 'gsw',
          name: 'Golden State Warriors',
          shortName: 'GSW',
          logo: '⚡',
          primaryColor: '#1D428A'
        },
        away: {
          id: 'bos',
          name: 'Boston Celtics',
          shortName: 'BOS',
          logo: '🍀',
          primaryColor: '#007A33'
        }
      },
      gameDate: new Date('2023-10-08'),
      gameType: 'Regular Season',
      quarter: 3,
      timeRemaining: '8:34',
      score: {
        home: 89,
        away: 84
      }
    },
    availableFacts: [
      {
        id: 'bfact1',
        label: 'Shot Distance',
        value: '38 feet',
        category: 'performance'
      },
      {
        id: 'bfact2',
        label: 'Shot Quality',
        value: 'Contested',
        category: 'context'
      },
      {
        id: 'bfact3',
        label: '3PT Make %',
        value: '43%',
        category: 'performance'
      },
      {
        id: 'bfact4',
        label: 'Defender Distance',
        value: '4.2 feet',
        category: 'context'
      },
      {
        id: 'bfact5',
        label: 'Win Probability',
        value: '+8%',
        category: 'probability'
      },
      {
        id: 'bfact6',
        label: 'Expected Points',
        value: '+1.1',
        category: 'probability'
      }
    ],
    selectedFacts: []
  },
  {
    id: 'custom3',
    title: 'Messi Free Kick Goal',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    videoProvider: 'youtube',
    youtubeId: 'pORjd5ZkTrs',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    context: {
      sport: 'soccer',
      league: 'MLS',
      teams: {
        home: {
          id: 'mia',
          name: 'Inter Miami CF',
          shortName: 'MIA',
          logo: '⚽',
          primaryColor: '#F7B5CD'
        },
        away: {
          id: 'nyc',
          name: 'New York City FC',
          shortName: 'NYC',
          logo: '🗽',
          primaryColor: '#6CABDD'
        }
      },
      gameDate: new Date('2023-10-10'),
      gameType: 'Regular Season',
      timeRemaining: '73:22',
      score: {
        home: 2,
        away: 1
      }
    },
    availableFacts: [
      {
        id: 'sfact1',
        label: 'Free Kick Distance',
        value: '28 yards',
        category: 'performance'
      },
      {
        id: 'sfact2',
        label: 'Wall Formation',
        value: '5 defenders',
        category: 'context'
      },
      {
        id: 'sfact3',
        label: 'Conversion Rate',
        value: '12%',
        category: 'performance'
      },
      {
        id: 'sfact4',
        label: 'Game State',
        value: 'Winning',
        category: 'context'
      },
      {
        id: 'sfact5',
        label: 'xG (Expected Goals)',
        value: '0.08',
        category: 'probability'
      }
    ],
    selectedFacts: []
  }
]; 