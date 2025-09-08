"use client";
import { useTranslations } from 'next-intl';
import ProductList from '@/components/ProductList';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="container mx-auto px-4 py-8">
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