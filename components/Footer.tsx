
'use client';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; {year} {t('appName')}. {t('rights')}</p>
      </div>
    </footer>
  );
};

export default Footer;