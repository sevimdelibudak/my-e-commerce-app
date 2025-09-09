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
  return (
    <Link href={`/${locale}/products/${product.id}`}>
      <div className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center h-full">
        <div className="relative w-full h-48 mb-4">
          <Image 
            src={product.image} 
            alt={product.title} 
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2 flex-grow">{product.title}</h3>
        <p className="text-xl font-bold text-blue-600 mb-2">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500 capitalize">{t('category.' + product.category) || product.category}</p>
      </div>
    </Link>
  );
});

export default ProductCard;
