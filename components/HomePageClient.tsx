"use client";
import { useTranslations } from 'next-intl';
import ProductList from './ProductList';
import { usePathname } from 'next/navigation';
import * as React from 'react';

export default function HomePageClient({ locale }: { locale: string }) {
  const t = useTranslations('home');
  const pathname = usePathname();
  const currentLocale = locale || pathname.split('/')[1] || 'tr';

  return (
    <div className="w-full flex flex-col items-center justify-center py-8 sm:py-12 px-4">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 bg-clip-text text-transparent drop-shadow-sm break-words leading-tight">
          {t('title')}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-center text-slate-600 dark:text-slate-300 mb-8 sm:mb-10 max-w-2xl mx-auto font-normal leading-relaxed">
          {t('subtitle')}
        </p>
      </div>
    </div>
  );
}