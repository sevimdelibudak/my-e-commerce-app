// app/products/[productId]/ProductDetailClient.tsx
'use client';

import Image from "next/image";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/lib/store/cartSlice';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';

// Ürün için bir tip tanımı
type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string;
};

// Bu bileşen sadece etkileşimli kısımları içerecek.

export default function ProductDetailClient({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const t = useTranslations('products');

  const handleAddToCart = () => {
    const newCartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    dispatch(addItemToCart(newCartItem));
  toast.success(t('addedToCart', { title: product.title }));

    // Sepet sayfasına yönlendirme
    const locale = window.location.pathname.split('/')[1] || 'tr';
    router.push(`/${locale}/cart`);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
      <div className="w-full lg:w-1/2 relative h-80 sm:h-96 lg:h-[500px] bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="w-full lg:w-1/2 space-y-4 sm:space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 text-slate-800 dark:text-slate-200 leading-tight">
            {product.title}
          </h1>
          <div className="flex items-center space-x-2 mb-4">
            <span className="inline-block bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium px-3 py-1 rounded-full border border-slate-200 dark:border-slate-600">
              {t(`category.${product.category}`) !== `category.${product.category}`
                ? t(`category.${product.category}`)
                : product.category
              }
            </span>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 sm:p-6 rounded-2xl">
          <p className="text-2xl sm:text-3xl font-bold">${product.price}</p>
        </div>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
        >
          {t('addToCart')}
        </button>
      </div>
    </div>
  );
}