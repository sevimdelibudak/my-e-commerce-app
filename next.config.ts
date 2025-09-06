/** @type {import('next').NextConfig} */
const nextConfig = {
  // Eski ve artık kullanılmayan yapılandırma
  // images: {
  //   domains: ['fakestoreapi.com'],
  // },

  // Yeni ve önerilen yapılandırma
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;