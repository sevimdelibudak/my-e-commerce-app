import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};


import React from 'react';

const ProductCard = React.memo(function ProductCard({ product, locale }: { product: Product; locale: string }) {
  const t = useTranslations('products');
  // Ürün başlığı ve açıklamasını çeviri dosyasından göster, yoksa fallback olarak orijinalini kullan
  // Sadece orijinal başlık ve açıklama gösterilecek (fallback yok)
  const translatedTitle = product.title;
  const translatedDesc = product.description;
  return (
    <Link 
      href={`/${locale}/products/${product.id}`}
      aria-label={translatedTitle}
      className="block group h-full"
    >
      <div className="border border-slate-200 dark:border-slate-700 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center h-full bg-white dark:bg-slate-800 hover:-translate-y-1 hover:scale-[1.02]">
        <div className="relative w-full h-40 sm:h-48 mb-3 sm:mb-4 flex items-center justify-center bg-slate-50 dark:bg-slate-700 rounded-xl overflow-hidden">
          <Image 
            src={product.image} 
            alt={translatedTitle || 'Product image'} 
            fill
            className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={product.id === 1}
          />
        </div>
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex-grow text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[44px] sm:min-h-[48px] leading-tight">
          {translatedTitle}
        </h3>
        <div className="w-full space-y-2">
          <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex flex-col items-center space-y-1">
            <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium px-2 sm:px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600 tracking-wide">
              {t('category.' + product.category) || product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
});

export default ProductCard;
