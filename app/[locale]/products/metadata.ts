import { type Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: 'Ürünler | E-Commerce App',
      template: '%s | E-Commerce App'
    },
    description: 'Tüm ürünleri kategori ve fiyata göre filtreleyin. E-Ticaret uygulamamızda aradığınız ürünü kolayca bulun.',
  };
}
