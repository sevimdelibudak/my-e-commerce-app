import { type Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = locale === 'en' ? '/en' : '/tr';
  return {
    title: {
      default: 'Ürünler | E-Commerce App',
      template: '%s | E-Commerce App'
    },
    description: 'Tüm ürünleri kategori ve fiyata göre filtreleyin. E-Ticaret uygulamamızda aradığınız ürünü kolayca bulun.',
    alternates: {
      canonical: `${base}/products`,
      languages: {
        en: '/en/products',
        tr: '/tr/products',
      }
    },
  };
}
