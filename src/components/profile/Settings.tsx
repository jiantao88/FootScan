import { UserProfile } from '@/types/profile';
import { useState } from 'react';
import { FaUser, FaLock, FaBell, FaShieldAlt } from 'react-icons/fa';

interface SettingsProps {
  profile: UserProfile;
}

export default function Settings({ profile }: SettingsProps) {
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [notifications, setNotifications] = useState({
    newAnalysis: true,
    communityUpdates: true,
    tokenRewards: true,
  });
  const [privacy, setPrivacy] = useState({
    showAddress: true,
    showHistory: true,
    showBadges: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 实现设置更新逻辑
    console.log('Settings updated');
  };

  return (
    <div className="space-y-6">
      {/* 个人资料设置 */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaUser className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">个人资料</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                用户名
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                个人简介
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              保存更改
            </button>
          </form>
        </div>
      </div>

      {/* 通知设置 */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaBell className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">通知设置</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700">
                  {key === 'newAnalysis'
                    ? '新的分析结果'
                    : key === 'communityUpdates'
                    ? '社区更新'
                    : '代币奖励'}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      setNotifications((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof typeof notifications],
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 隐私设置 */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaShieldAlt className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">隐私设置</h2>
          </div>
          <div className="space-y-4">
            {Object.entries(privacy).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-gray-700">
                  {key === 'showAddress'
                    ? '显示钱包地址'
                    : key === 'showHistory'
                    ? '显示分析历史'
                    : '显示勋章'}
                </span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      setPrivacy((prev) => ({
                        ...prev,
                        [key]: !prev[key as keyof typeof privacy],
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 安全设置 */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <FaLock className="text-gray-400" />
            <h2 className="text-lg font-semibold text-gray-900">安全设置</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-gray-700">连接的钱包</h3>
                <p className="text-sm text-gray-500">{profile.address}</p>
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                断开连接
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
