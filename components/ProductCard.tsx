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
      className="block group"
    >
      <div className="border rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center h-full bg-white hover:-translate-y-1 hover:scale-[1.03]">
        <div className="relative w-full h-48 mb-4 flex items-center justify-center">
          <Image 
            src={product.image} 
            alt={translatedTitle || 'Product image'} 
            fill
            className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={product.id === 1}
          />
        </div>
        <h3 className="text-lg font-bold mb-2 flex-grow text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[48px]">{translatedTitle}</h3>
        <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg px-4 py-1 rounded-full shadow mb-2">
          ${product.price.toFixed(2)}
        </span>
        <span className="inline-block bg-gray-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-1 border border-blue-100 tracking-wide">
          {t('category.' + product.category) || product.category}
        </span>
      </div>
    </Link>
  );
});

export default ProductCard;
