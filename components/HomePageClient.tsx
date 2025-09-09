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
    <div className="w-full flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent drop-shadow-md break-words max-w-2xl w-full leading-tight">
        {t('title')}
      </h1>
      <p className="text-lg md:text-xl text-center text-gray-700 mb-10 max-w-xl font-normal">
        {t('subtitle')}
      </p>
    </div>
  );
}