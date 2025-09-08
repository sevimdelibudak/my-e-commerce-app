// app/products/[productId]/ProductDetailClient.tsx
'use client';

import Image from "next/image";
import { useDispatch } from 'react-redux';
import { addItemToCart } from '@/lib/store/cartSlice';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
    alert(t('addedToCart', { title: product.title }));

    // Sepet sayfasına yönlendirme
    const locale = window.location.pathname.split('/')[1] || 'tr';
    router.push(`/${locale}/cart`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center">
      <div className="w-full md:w-1/2 relative h-96">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="w-full md:w-1/2">
        <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
        <p className="text-xl text-gray-600 mb-2">{
          t(`category.${product.category}`) !== `category.${product.category}`
            ? t(`category.${product.category}`)
            : product.category
        }</p>
        <p className="text-3xl font-bold text-gray-800 mb-4">${product.price}</p>
        <p className="text-gray-700 mb-6">{product.description}</p>
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
        >
          {t('addToCart')}
        </button>
      </div>
    </div>
  );
}