import { Metadata } from 'next';
import ProductList from '../../components/ProductList';
import HomePageClient from '../../components/HomePageClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const base = locale === 'en' ? '/en' : '/tr';
  return {
    title: 'My E-Commerce | Home',
    description: 'Modern, çok dilli ve hızlı bir e-ticaret uygulaması.',
    alternates: {
      canonical: base,
      languages: {
        en: '/en',
        tr: '/tr',
      },
    },
  };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <div className="container mx-auto px-4 py-8">
      <HomePageClient locale={locale} />
      <ProductList locale={locale} />
    </div>
  );
}