// app/products/[productId]/page.tsx
import { getProductById } from "@/lib/api";
import ProductDetailClient from "./ProductDetailClient";
import { Metadata } from 'next';
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

// Server Component: Metadata burada oluşturulur.
export async function generateMetadata({ params }: { params: Promise<{ productId: string }> }): Promise<Metadata> {
  const { productId } = await params;
  try {
    const product = await getProductById(Number(productId));
    return {
      title: product.title,
      description: product.description.substring(0, 150) + '...',
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductDetailsPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params;
  let product: Product | null = null;
  try {
    product = await getProductById(Number(productId));
  } catch (error) {
    console.error("Failed to fetch product on server:", error);
    // Hata durumunda bir fallback UI gösterebiliriz.
  }

  // Çeviri fonksiyonu (server component için)
  const t = (key: 'notFound') => {
    // Basit bir fallback, SSR için next-intl'ın server fonksiyonları kullanılabilir
    const tr: Record<'notFound', string> = {
      notFound: "Ürün bulunamadı."
    };
    const en: Record<'notFound', string> = {
      notFound: "Product not found."
    };
    // Locale'i URL'den çek
    const locale = typeof window === 'undefined' ? 'tr' : window.location.pathname.split('/')[1] || 'tr';
    return (locale === 'en' ? en[key] : tr[key]) || key;
  };

  if (!product) {
    return (
      <div className="container mx-auto p-4 text-center mt-10">
        {t('notFound')}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <ProductDetailClient product={product} />
    </div>
  );
}