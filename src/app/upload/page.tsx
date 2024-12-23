'use client';
import AnalyzeSection from '@/components/AnalyzeSection';

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            分析食品配料表
          </h1>
          <p className="text-xl text-gray-600">
            上传配料表图片或输入文字，获取 AI 分析报告
          </p>
        </div>
        
        <AnalyzeSection />
      </div>
    </div>
  );
}
