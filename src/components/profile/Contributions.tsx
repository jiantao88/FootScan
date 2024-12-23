'use client';

import { Badge, VoteHistory } from '@/types/profile';
import BadgeIcon from '../badges/BadgeIcon';
import { FaCoins, FaTrophy } from 'react-icons/fa';

interface ContributionsProps {
  badges: Badge[];
  votes: VoteHistory[];
  tokenBalance: number;
  contributionPoints: number;
  level: number;
}

export default function Contributions({
  badges,
  votes,
  tokenBalance,
  contributionPoints,
  level,
}: ContributionsProps) {
  return (
    <div className="space-y-6">
      {/* 统计数据 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">代币余额</h3>
          <p className="mt-2 text-3xl font-bold text-orange-500">{tokenBalance} FOOD</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">贡献度</h3>
          <p className="mt-2 text-3xl font-bold text-orange-500">{contributionPoints}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-medium text-gray-900">等级</h3>
          <p className="mt-2 text-3xl font-bold text-orange-500">Lv.{level}</p>
        </div>
      </div>

      {/* NFT勋章 */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">NFT 勋章</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <BadgeIcon type={badge.type as any} size={64} />
              <span className="mt-2 text-sm font-medium text-gray-700">{badge.name}</span>
              <span className="text-xs text-gray-500">{badge.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 投票历史 */}
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-4">投票历史</h3>
        <div className="space-y-4">
          {votes.map((vote) => (
            <div
              key={vote.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900">{vote.title}</h4>
                <p className="text-sm text-gray-500">{new Date(vote.votedAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  {vote.rewardAmount} FOOD
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
