const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    cpus: 1,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.pinterest.com",
      },
    ],
  },
  webpack(config) {
    config.parallelism = 1;
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
