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

  // Development-specific optimizations
  ...(process.env.NODE_ENV === 'development' && {
    // Faster compilation
    swcMinify: false, // Disable minification in dev for speed
    // Reduce bundle analysis overhead
    webpack: (config, { dev }) => {
      if (dev) {
        // Faster builds
        config.watchOptions = {
          poll: 1000,
          aggregateTimeout: 300,
        };

        // Deduplicate yjs to avoid multiple module instances across chunks
        config.resolve = config.resolve || {};
        config.resolve.alias = {
          ...(config.resolve?.alias || {}),
          yjs: require.resolve('yjs'),
        };

        // Reduce memory usage
        config.optimization = {
          ...config.optimization,
          splitChunks: false, // Disable code splitting in dev for speed
        };
      } else {
        // Production webpack config
        config.resolve = config.resolve || {};
        config.resolve.alias = {
          ...(config.resolve?.alias || {}),
          yjs: require.resolve('yjs'),
        };
      }
      return config;
    },
  }),

  // Production webpack config (fallback)
  ...(process.env.NODE_ENV !== 'development' && {
    webpack: config => {
      config.resolve = config.resolve || {};
      config.resolve.alias = {
        ...(config.resolve?.alias || {}),
        yjs: require.resolve('yjs'),
      };
      return config;
    },
  }),
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
