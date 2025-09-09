
import { NextIntlClientProvider } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function Layout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  let messages: any;
  try {
    messages = require(`@/messages/${locale}.json`);
  } catch {
    messages = require('@/messages/tr.json');
  }
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto p-4">{children}</main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  );
}