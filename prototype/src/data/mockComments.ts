import { Comment } from '../types';
import { mockUsers } from './mockUsers';

export const mockComments: Comment[] = [
  // Comments for post1 (LeBron James)
  {
    id: 'comment1',
    postId: 'post1',
    author: mockUsers[1],
    content: 'Clutch gene is real! LeBron always shows up when it matters most. That 3-pointer was ice cold 🥶',
    votes: 127,
    userVote: null,
    replies: [
      {
        id: 'comment1-1',
        postId: 'post1',
        parentId: 'comment1',
        author: mockUsers[6],
        content: 'Year 21 and he\'s still doing this. GOAT debate is over.',
        votes: 45,
        userVote: 'up',
        replies: [],
        createdAt: new Date('2023-10-15T22:35:00'),
        updatedAt: new Date('2023-10-15T22:35:00')
      }
    ],
    createdAt: new Date('2023-10-15T22:32:00'),
    updatedAt: new Date('2023-10-15T22:32:00')
  },
  {
    id: 'comment2',
    postId: 'post1',
    author: mockUsers[7],
    content: 'Warriors defense just couldn\'t handle the King in crunch time. What a shot!',
    votes: 89,
    userVote: 'up',
    replies: [],
    createdAt: new Date('2023-10-15T22:38:00'),
    updatedAt: new Date('2023-10-15T22:38:00')
  },
  
  // Comments for post2 (Mahomes)
  {
    id: 'comment3',
    postId: 'post2',
    author: mockUsers[3],
    content: 'How does he even see the receiver while looking the other way? Mahomes is not human 👽',
    votes: 234,
    userVote: null,
    replies: [
      {
        id: 'comment3-1',
        postId: 'post2',
        parentId: 'comment3',
        author: mockUsers[0],
        content: 'Peripheral vision and field awareness is insane. Best QB in the league right now.',
        votes: 78,
        userVote: null,
        replies: [],
        createdAt: new Date('2023-10-12T20:22:00'),
        updatedAt: new Date('2023-10-12T20:22:00')
      },
      {
        id: 'comment3-2',
        postId: 'post2',
        parentId: 'comment3',
        author: mockUsers[5],
        content: 'That arm strength though... threw it 40 yards without even looking. Ridiculous.',
        votes: 56,
        userVote: 'up',
        replies: [],
        createdAt: new Date('2023-10-12T20:25:00'),
        updatedAt: new Date('2023-10-12T20:25:00')
      }
    ],
    createdAt: new Date('2023-10-12T20:18:00'),
    updatedAt: new Date('2023-10-12T20:18:00')
  },
  
  // Comments for post3 (Messi)
  {
    id: 'comment4',
    postId: 'post3',
    author: mockUsers[4],
    content: 'Physics don\'t apply to Messi. That curve on the ball was perfect 🎯',
    votes: 312,
    userVote: 'up',
    replies: [],
    createdAt: new Date('2023-10-10T19:50:00'),
    updatedAt: new Date('2023-10-10T19:50:00')
  },
  {
    id: 'comment5',
    postId: 'post3',
    author: mockUsers[2],
    content: 'MLS is so lucky to have him. This level of skill is just unreal.',
    votes: 198,
    userVote: null,
    replies: [
      {
        id: 'comment5-1',
        postId: 'post3',
        parentId: 'comment5',
        author: mockUsers[7],
        content: 'Best thing to happen to MLS in years. The GOAT gracing our league 🐐',
        votes: 67,
        userVote: null,
        replies: [],
        createdAt: new Date('2023-10-10T19:58:00'),
        updatedAt: new Date('2023-10-10T19:58:00')
      }
    ],
    createdAt: new Date('2023-10-10T19:55:00'),
    updatedAt: new Date('2023-10-10T19:55:00')
  },
  
  // Comments for post4 (Curry)
  {
    id: 'comment6',
    postId: 'post4',
    author: mockUsers[6],
    content: 'FROM THE LOGO?! Steph has officially broken basketball 😤',
    votes: 445,
    userVote: 'up',
    replies: [
      {
        id: 'comment6-1',
        postId: 'post4',
        parentId: 'comment6',
        author: mockUsers[1],
        content: 'Dude really just casually pulled up from 35 feet like it was a layup',
        votes: 123,
        userVote: 'up',
        replies: [],
        createdAt: new Date('2023-10-08T21:28:00'),
        updatedAt: new Date('2023-10-08T21:28:00')
      }
    ],
    createdAt: new Date('2023-10-08T21:25:00'),
    updatedAt: new Date('2023-10-08T21:25:00')
  },
  
  // Comments for post5 (Judge)
  {
    id: 'comment7',
    postId: 'post5',
    author: mockUsers[5],
    content: 'That ball is still traveling. RIP baseball ⚾💀',
    votes: 178,
    userVote: null,
    replies: [],
    createdAt: new Date('2023-10-05T20:35:00'),
    updatedAt: new Date('2023-10-05T20:35:00')
  },
  
  // Comments for post6 (Giannis)
  {
    id: 'comment8',
    postId: 'post6',
    author: mockUsers[0],
    content: 'That defender has a family! Giannis with no regard for human life 💀',
    votes: 267,
    userVote: 'up',
    replies: [
      {
        id: 'comment8-1',
        postId: 'post6',
        parentId: 'comment8',
        author: mockUsers[4],
        content: 'Greek Freak living up to his nickname. That was NASTY',
        votes: 89,
        userVote: null,
        replies: [],
        createdAt: new Date('2023-10-03T22:22:00'),
        updatedAt: new Date('2023-10-03T22:22:00')
      }
    ],
    createdAt: new Date('2023-10-03T22:18:00'),
    updatedAt: new Date('2023-10-03T22:18:00')
  }
];

// Helper function to get comments for a specific post
export const getCommentsForPost = (postId: string): Comment[] => {
  return mockComments.filter(comment => comment.postId === postId && !comment.parentId);
}; 