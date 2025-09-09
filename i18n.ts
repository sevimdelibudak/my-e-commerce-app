import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => ({
  locale: locale || 'tr',
  messages: (await import(`./messages/${locale || 'tr'}.json`)).default
}));


