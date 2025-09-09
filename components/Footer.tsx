
'use client';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-900 text-white mt-12 sm:mt-16">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">E</span>
            </div>
            <span className="text-xl font-bold">{t('appName')}</span>
          </div>
          <p className="text-slate-400 text-sm sm:text-base">
            &copy; {year} {t('appName')}. {t('rights')}
          </p>
          <div className="flex justify-center space-x-6 text-slate-400 text-sm">
            <span>🚀 Modern E-Commerce</span>
            <span>🌍 Multi-Language</span>
            <span>📱 Mobile Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;