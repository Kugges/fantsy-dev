/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: {
    configure: {
      experiments: {
        topLevelAwait: true,
      }
    }
  },
  images: {
    domains: ['fantsy-net.web.app', 'firebasestorage.googleapis.com', 'europe-west3-fantsy-net.cloudfunctions.net'],
  }
}

module.exports = nextConfig

