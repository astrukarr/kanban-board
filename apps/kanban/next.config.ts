import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Development optimizations
  experimental: {
    // Enable faster builds in development
    optimizeCss: true,
    // Reduce memory usage
    memoryBasedWorkersCount: true,
  },

  // Webpack configuration for both dev and production
  webpack: (config, { dev }) => {
    // Deduplicate yjs to avoid multiple module instances across chunks
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve?.alias || {}),
      yjs: require.resolve('yjs'),
    };

    if (dev) {
      // Faster builds in development
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };

      // Reduce memory usage
      config.optimization = {
        ...config.optimization,
        splitChunks: false, // Disable code splitting in dev for speed
      };
    }

    return config;
  },
};

const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 16,
          maxAgeSeconds: 24 * 60 * 60, // 24 hours
        },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 32,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
        },
      },
    },
  ],
});

export default withBundleAnalyzer(pwaConfig(nextConfig as any));
