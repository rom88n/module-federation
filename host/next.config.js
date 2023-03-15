const NextFederationPlugin = require('@module-federation/nextjs-mf');
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = isServer => {
  const location = isServer ? 'ssr' : 'chunks';
  return {
    remote: `remote@http://localhost:3000/_next/static/${location}/remoteEntry.js`,
    remoteMarkets: `remoteMarkets@http://localhost:3001/_next/static/${location}/remoteEntry.js`,
  };
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host',
        filename: 'static/chunks/remoteEntry.js',
        exposes: {},
        remotes: remotes(options.isServer),
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
