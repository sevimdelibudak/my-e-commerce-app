import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

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

async function fetchProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products?limit=4', { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

export default async function ProductList({ locale = 'tr' }: { locale?: string }) {
  let products: Product[] = [];
  let error = false;
  let t: any = (k: string) => k;
  try {
    products = await fetchProducts();
    t = await getTranslations({ locale, namespace: 'products' });
  } catch {
    error = true;
  }

  if (error) return (
    <div className="text-center py-8 text-red-600">
      <div className="text-lg">{t('error')}</div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
      {products.map((product, idx) => (
        <div key={product.id} className="border rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center h-full bg-white hover:-translate-y-1 hover:scale-[1.03]">
          <div className="relative w-full h-48 mb-4 flex items-center justify-center">
            {idx === 0 ? (
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            ) : (
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
          <h3 className="text-lg font-bold mb-2 flex-grow text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 min-h-[48px]">{product.title}</h3>
          <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold text-lg px-4 py-1 rounded-full shadow mb-2">
            ${product.price}
          </span>
          <span className="inline-block bg-gray-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-1 border border-blue-100 tracking-wide">
            {t('category.' + product.category) || product.category}
          </span>
          <Link 
            href={`/${locale}/products/${product.id}`}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors font-semibold shadow"
          >
            {t('viewDetails')}
          </Link>
        </div>
      ))}
    </div>
  );
}