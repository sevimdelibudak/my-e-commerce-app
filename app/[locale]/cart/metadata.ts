import { type Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = locale === 'en' ? '/en' : '/tr';
  return {
    title: 'Sepet | E-Commerce App',
    description:
      'Sepetinizi görüntüleyin, ürün adetlerini güncelleyin ve satın alma işlemini tamamlayın.',
    alternates: {
      canonical: `${base}/cart`,
      languages: {
        en: '/en/cart',
        tr: '/tr/cart',
      },
    },
    openGraph: {
      title: 'Sepet | E-Commerce App',
      description:
        'Sepetinizi görüntüleyin, ürün adetlerini güncelleyin ve satın alma işlemini tamamlayın.',
      url: `${base}/cart`,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: 'Sepet | E-Commerce App',
      description:
        'Sepetinizi görüntüleyin, ürün adetlerini güncelleyin ve satın alma işlemini tamamlayın.',
    },
  };
}


