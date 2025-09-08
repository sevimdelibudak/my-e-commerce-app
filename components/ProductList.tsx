'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const t = useTranslations('products');
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'tr';

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=4')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="text-center py-8">
      <div className="text-lg">{t('loading')}</div>
    </div>
  );

  if (error) return (
    <div className="text-center py-8 text-red-600">
      <div className="text-lg">{t('error')}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div className="relative h-48">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
            />
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">${product.price}</span>
              <Link 
                href={`/${currentLocale}/products/${product.id}`}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                {t('viewDetails')}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}