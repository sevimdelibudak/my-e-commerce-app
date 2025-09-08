'use client';
import { useTranslations } from 'next-intl';
import ProductList from '../../components/ProductList';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import * as React from 'react';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const t = useTranslations('home');
  const pathname = usePathname();
  const { locale } = React.use(params);
  const currentLocale = locale || pathname.split('/')[1] || 'tr';

  return (
    <div className="container mx-auto px-4 py-8">
  {/* Dil değiştirici butonlar sadece Header'da olacak, buradan kaldırıldı */}
      <h1 className="text-4xl font-bold text-center mb-8">
        {t('title')}
      </h1>
      <p className="text-xl text-center text-gray-600 mb-12">
        {t('subtitle')}
      </p>
      <ProductList />
    </div>
  );
}