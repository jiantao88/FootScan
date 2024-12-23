import { UploadHistory as UploadHistoryType } from '@/types/profile';
import Link from 'next/link';
import { FaCheckCircle, FaExclamationTriangle, FaTimesCircle, FaUsers, FaExternalLinkAlt } from 'react-icons/fa';

interface UploadHistoryProps {
  uploads: UploadHistoryType[];
}

export default function UploadHistory({ uploads }: UploadHistoryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <FaCheckCircle className="text-green-500" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'danger':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'safe':
        return '安全';
      case 'warning':
        return '需注意';
      case 'danger':
        return '危险';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">上传历史</h2>
          <div className="space-y-4">
            {uploads.map((upload) => (
              <div
                key={upload.id}
                className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
              >
                <img
                  src={upload.imageUrl}
                  alt={upload.productName}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {upload.productName}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm">
                      {getStatusIcon(upload.status)}
                      <span
                        className={`
                          ${upload.status === 'safe' && 'text-green-700'}
                          ${upload.status === 'warning' && 'text-yellow-700'}
                          ${upload.status === 'danger' && 'text-red-700'}
                        `}
                      >
                        {getStatusText(upload.status)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="font-medium">{upload.score}</span>
                      <span className="ml-1">分</span>
                    </div>
                    <div className="flex items-center">
                      <FaUsers className="mr-1" />
                      <span>{upload.verificationCount}次验证</span>
                    </div>
                    <div>
                      {new Date(upload.uploadedAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/analysis/${upload.id}`}>
                    <button className="px-3 py-1 bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-100 transition-colors">
                      查看详情
                    </button>
                  </Link>
                  <a
                    href={`https://etherscan.io/tx/${upload.transactionHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
