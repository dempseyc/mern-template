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
  }
}

module.exports = nextConfig
