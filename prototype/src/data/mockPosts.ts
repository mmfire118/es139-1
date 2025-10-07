import { Post } from '../types';
import { mockUsers } from './mockUsers';

export const mockPosts: Post[] = [
  {
    id: 'post1',
    title: 'LeBron James with the clutch 3-pointer to seal the game!',
    description: 'With 1.2 seconds left on the clock, LeBron delivers when it matters most',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    videoProvider: 'youtube',
    youtubeId: 'YI1GLB-byeQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=450&fit=crop',
    context: {
      sport: 'basketball',
      league: 'NBA',
      teams: {
        home: {
          id: 'lal',
          name: 'Los Angeles Lakers',
          shortName: 'LAL',
          logo: '🏀',
          primaryColor: '#552583'
        },
        away: {
          id: 'gsw',
          name: 'Golden State Warriors',
          shortName: 'GSW',
          logo: '⚡',
          primaryColor: '#1D428A'
        }
      },
      gameDate: new Date('2023-10-15'),
      gameType: 'Regular Season',
      quarter: 4,
      timeRemaining: '0:01.2',
      score: {
        home: 108,
        away: 105
      }
    },
    stats: [
      {
        playerId: 'lebron',
        playerName: 'LeBron James',
        team: 'LAL',
        position: 'SF',
        stats: {
          'Points': 28,
          'Rebounds': 8,
          'Assists': 11,
          'FG%': '52.4%',
          '3P%': '41.7%'
        }
      }
    ],
    author: mockUsers[0],
    votes: 1847,
    userVote: null,
    commentCount: 156,
    createdAt: new Date('2023-10-15T22:30:00'),
    updatedAt: new Date('2023-10-15T22:30:00')
  },
  {
    id: 'post2',
    title: 'Mahomes throws incredible no-look pass for touchdown',
    description: 'Patrick Mahomes continues to amaze with his incredible arm talent',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
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
      timeRemaining: '3:47'
    },
    stats: [
      {
        playerId: 'mahomes',
        playerName: 'Patrick Mahomes',
        team: 'KC',
        position: 'QB',
        stats: {
          'Passing Yards': 312,
          'TD Passes': 3,
          'Completion %': '68.4%',
          'QB Rating': 118.7,
          'Interceptions': 0
        }
      }
    ],
    author: mockUsers[2],
    votes: 2341,
    userVote: 'up',
    commentCount: 203,
    createdAt: new Date('2023-10-12T20:15:00'),
    updatedAt: new Date('2023-10-12T20:15:00')
  },
  {
    id: 'post3',
    title: 'Messi\'s free kick masterclass - top corner perfection',
    description: 'Lionel Messi shows why he\'s the GOAT with this stunning free kick',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
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
      timeRemaining: '73:22'
    },
    stats: [
      {
        playerId: 'messi',
        playerName: 'Lionel Messi',
        team: 'MIA',
        position: 'RW',
        stats: {
          'Goals': 2,
          'Assists': 1,
          'Shots': 6,
          'Pass Accuracy': '91%',
          'Dribbles': 8
        }
      }
    ],
    author: mockUsers[3],
    votes: 3127,
    userVote: null,
    commentCount: 287,
    createdAt: new Date('2023-10-10T19:45:00'),
    updatedAt: new Date('2023-10-10T19:45:00')
  },
  {
    id: 'post4',
    title: 'Steph Curry from WAY downtown - logo shot!',
    description: 'Curry pulls up from the logo and drains it like it\'s nothing',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
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
      timeRemaining: '8:34'
    },
    stats: [
      {
        playerId: 'curry',
        playerName: 'Stephen Curry',
        team: 'GSW',
        position: 'PG',
        stats: {
          'Points': 42,
          'Rebounds': 5,
          'Assists': 7,
          '3PM': 9,
          '3PA': 15,
          '3P%': '60.0%'
        }
      }
    ],
    author: mockUsers[1],
    votes: 4521,
    userVote: 'up',
    commentCount: 412,
    createdAt: new Date('2023-10-08T21:20:00'),
    updatedAt: new Date('2023-10-08T21:20:00')
  },
  {
    id: 'post5',
    title: 'Aaron Judge crushes 450ft home run to center field',
    description: 'Judge absolutely demolishes this baseball - what a moonshot!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    videoProvider: 'youtube',
    youtubeId: 'nLz47wO26Bk',
    thumbnailUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&h=450&fit=crop',
    context: {
      sport: 'baseball',
      league: 'MLB',
      teams: {
        home: {
          id: 'nyy',
          name: 'New York Yankees',
          shortName: 'NYY',
          logo: '⚾',
          primaryColor: '#132448'
        },
        away: {
          id: 'bos',
          name: 'Boston Red Sox',
          shortName: 'BOS',
          logo: '🧦',
          primaryColor: '#BD3039'
        }
      },
      gameDate: new Date('2023-10-05'),
      gameType: 'Playoffs',
      quarter: 7,
      timeRemaining: 'Top 7th'
    },
    stats: [
      {
        playerId: 'judge',
        playerName: 'Aaron Judge',
        team: 'NYY',
        position: 'RF',
        stats: {
          'Home Runs': 2,
          'RBIs': 4,
          'Batting Avg': '.312',
          'Exit Velocity': '112.4 mph',
          'Distance': '450 ft'
        }
      }
    ],
    author: mockUsers[4],
    votes: 1923,
    userVote: null,
    commentCount: 178,
    createdAt: new Date('2023-10-05T20:30:00'),
    updatedAt: new Date('2023-10-05T20:30:00')
  },
  {
    id: 'post6',
    title: 'Giannis posterizes defender with massive dunk',
    description: 'The Greek Freak shows no mercy on this thunderous slam!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    videoProvider: 'youtube',
    youtubeId: 'd8FYUdPPUy4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=450&fit=crop',
    context: {
      sport: 'basketball',
      league: 'NBA',
      teams: {
        home: {
          id: 'mil',
          name: 'Milwaukee Bucks',
          shortName: 'MIL',
          logo: '🦌',
          primaryColor: '#00471B'
        },
        away: {
          id: 'mia',
          name: 'Miami Heat',
          shortName: 'MIA',
          logo: '🔥',
          primaryColor: '#98002E'
        }
      },
      gameDate: new Date('2023-10-03'),
      gameType: 'Regular Season',
      quarter: 2,
      timeRemaining: '5:42'
    },
    stats: [
      {
        playerId: 'giannis',
        playerName: 'Giannis Antetokounmpo',
        team: 'MIL',
        position: 'PF',
        stats: {
          'Points': 35,
          'Rebounds': 14,
          'Assists': 6,
          'Blocks': 3,
          'FG%': '58.8%'
        }
      }
    ],
    author: mockUsers[5],
    votes: 2876,
    userVote: 'up',
    commentCount: 234,
    createdAt: new Date('2023-10-03T22:15:00'),
    updatedAt: new Date('2023-10-03T22:15:00')
  }
];

// Function to get posts sorted by different criteria
export const getSortedPosts = (posts: Post[], sortBy: 'hot' | 'top' | 'new') => {
  switch (sortBy) {
    case 'hot':
      // Hot algorithm: considers votes and recency
      return [...posts].sort((a, b) => {
        const aScore = a.votes * Math.pow(0.8, (Date.now() - a.createdAt.getTime()) / (1000 * 60 * 60 * 24));
        const bScore = b.votes * Math.pow(0.8, (Date.now() - b.createdAt.getTime()) / (1000 * 60 * 60 * 24));
        return bScore - aScore;
      });
    case 'top':
      return [...posts].sort((a, b) => b.votes - a.votes);
    case 'new':
      return [...posts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    default:
      return posts;
  }
}; 