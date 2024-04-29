/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')()

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })
    return config
  }
}

module.exports = process.env.ANALYZE === 'true' ? withBundleAnalyzer(nextConfig) : nextConfig
