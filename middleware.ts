import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale} from './src/i18n/routing';

export default createMiddleware({
  locales: Array.from(locales),
  defaultLocale
});

export const config = {
  // Tüm uygulama yollarını (api, _next ve statik dosyalar hariç) yakala
  matcher: ['/((?!api|_next|.*\\..*).*)']
};