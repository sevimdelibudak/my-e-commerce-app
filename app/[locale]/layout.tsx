
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const locale = (resolvedParams && resolvedParams.locale) ? resolvedParams.locale : 'tr';
  const messages = (await import(`@/messages/${locale}.json`)).default;
  console.log('LOCALE:', locale, 'MESSAGES:', messages);
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