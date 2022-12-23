/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')(['@stripe/firestore-stripe-payments']);
const nextConfig = {
  reactStrictMode: true,
  // plugins: [
  //   require('flowbite/plugin')
  // ],
  // content: [
  //   "./node_modules/flowbite/**/*.js"
  // ],
  webpack: {
    configure: {
      experiments: {
        topLevelAwait: true,
      }
    }
  },
  images: {
    domains: ['fantsy-net.web.app', 'firebasestorage.googleapis.com'],
  }
}

module.exports = withTM(nextConfig)

