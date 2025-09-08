import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params }: Props) {
  const resolvedParams = await params;
  const locale = (resolvedParams && resolvedParams.locale) ? resolvedParams.locale : 'tr';
  const messages = (await import(`@/messages/${locale}.json`)).default;
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}