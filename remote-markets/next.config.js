/** @type {import('next').NextConfig} */
const NextFederationPlugin = require('@module-federation/nextjs-mf');

const nextConfig = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'remoteMarkets',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './MarketComponent': './src/components/MarketComponent.js',
        },
        remotes: {},
        shared: {},
        extraOptions:{
          automaticAsyncBoundary: true
        }
      }),
    );

    return config;
  },
}

module.exports = nextConfig
