import { type Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Sepet | E-Commerce App',
    description: 'Sepetinizi görüntüleyin, ürün adetlerini güncelleyin ve satın alma işlemini tamamlayın.',
  };
}


