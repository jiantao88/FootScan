'use client';

import { useState } from 'react';
import { mockUserProfile } from '@/mock/profileData';
import { FaUser, FaHistory, FaMedal, FaCog } from 'react-icons/fa';
import ProfileInfo from '@/components/profile/ProfileInfo';
import UploadHistory from '@/components/profile/UploadHistory';
import Contributions from '@/components/profile/Contributions';
import Settings from '@/components/profile/Settings';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('info');
  const profile = mockUserProfile;

  const tabs = [
    { id: 'info', name: '个人信息', icon: FaUser },
    { id: 'history', name: '上传历史', icon: FaHistory },
    { id: 'contributions', name: '贡献记录', icon: FaMedal },
    { id: 'settings', name: '设置', icon: FaCog },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                    ${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon
                    className={`
                      -ml-0.5 mr-2 h-5 w-5
                      ${
                        activeTab === tab.id
                          ? 'text-orange-500'
                          : 'text-gray-400 group-hover:text-gray-500'
                      }
                    `}
                  />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
        <div className="py-6">
          {activeTab === 'info' && <ProfileInfo profile={profile} />}
          {activeTab === 'history' && <UploadHistory uploads={profile.uploads} />}
          {activeTab === 'contributions' && (
            <Contributions
              badges={profile.badges}
              votes={profile.votes}
              tokenBalance={profile.tokenBalance}
              contributionPoints={profile.contributionPoints}
              level={profile.level}
            />
          )}
          {activeTab === 'settings' && <Settings profile={profile} />}
        </div>
      </div>
    </div>
  );
}
