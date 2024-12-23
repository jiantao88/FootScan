import { UserProfile } from '@/types/profile';
import { FaWallet, FaCalendar } from 'react-icons/fa';

interface ProfileInfoProps {
  profile: UserProfile;
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  return (
    <div className="space-y-6">
      {/* 基本信息 */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex items-start space-x-6">
          <img
            src={profile.avatar}
            alt={profile.username}
            className="w-24 h-24 rounded-full"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{profile.username}</h2>
            <p className="mt-1 text-gray-500">{profile.bio}</p>
            <div className="mt-4 flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <FaWallet className="mr-2" />
                {profile.address}
              </div>
              <div className="flex items-center">
                <FaCalendar className="mr-2" />
                加入于 {new Date(profile.joinedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500">代币余额</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">
              {profile.tokenBalance}
            </span>
            <span className="ml-2 text-sm text-gray-500">FOOD</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500">贡献度</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">
              {profile.contributionPoints}
            </span>
            <span className="ml-2 text-sm text-gray-500">点</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500">等级</div>
          <div className="mt-2 flex items-baseline">
            <span className="text-3xl font-semibold text-gray-900">
              Lv.{profile.level}
            </span>
            <span className="ml-2 text-sm text-gray-500">安全卫士</span>
          </div>
        </div>
      </div>
    </div>
  );
}
