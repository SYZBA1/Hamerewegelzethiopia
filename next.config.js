const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Temporarily disabled for build testing
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack(config) {
    config.parallelism = 1;
    // Disable webpack cache to prevent memory issues
    config.cache = false;
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
