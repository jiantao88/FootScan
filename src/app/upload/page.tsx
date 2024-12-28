'use client';
import AnalyzeSection from '@/components/AnalyzeSection';
import { useTranslation } from 'react-i18next';

export default function UploadPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('upload.title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('upload.subtitle')}
          </p>
        </div>
        
        <AnalyzeSection />
      </div>
    </div>
  );
}
