import createNextIntlPlugin from 'next-intl/plugin';

// Point plugin to the request config file
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'fakestoreapi.com',
        pathname: '/**'
      }
    ]
  },
  turbopack: {
    root: __dirname
  }
};

export default withNextIntl(nextConfig);


