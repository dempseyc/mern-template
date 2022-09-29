/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home/main',
        permanent: true,
      },
      {
        source: '/home',
        destination: '/home/main',
        permanent: true,
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/api/[...path]',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
  compress: false,
}

module.exports = nextConfig
