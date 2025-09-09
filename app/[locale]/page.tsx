import { Metadata } from 'next';
import ProductList from '../../components/ProductList';
import HomePageClient from '../../components/HomePageClient';

export const metadata: Metadata = {
  title: 'My E-Commerce | Home',
  description: 'Modern, çok dilli ve hızlı bir e-ticaret uygulaması.',
};

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <HomePageClient locale={locale} />
      <ProductList locale={locale} />
    </div>
  );
}