export interface UserProfile {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  walletAddress: string;
  tokenBalance: number;
  contributionPoints: number;
  level: number;
  badges: Badge[];
  uploads: Upload[];
  votes: Vote[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  type: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
  earnedAt: string;
}

export interface Upload {
  id: string;
  title: string;
  status: 'pending' | 'completed' | 'failed';
  score: number | null;
  date: string;
}

export interface Vote {
  id: string;
  title: string;
  choice: string;
  votedAt: string;
  rewardAmount: number;
}
