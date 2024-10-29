const webpack = require("webpack");

module.exports = function override(config) {
  // Configure fallback for Node.js core modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    crypto: false,
    stream: false,
    assert: false,
    http: false,
    https: false,
    os: false,
    url: false,
    zlib: false,
    buffer: require.resolve("buffer/") // Add buffer polyfill here
  };

  // Provide polyfills for process and Buffer
  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
      React: "react",
    }),
  ];

  // Ignore warnings about source maps
  config.ignoreWarnings = [/Failed to parse source map/];

  // Add source-map-loader for JavaScript files
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });

  // Add Babel loader configuration for modern JavaScript and TypeScript features
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: "babel-loader",
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript" // Add TypeScript support
        ],
        plugins: [
          "@babel/plugin-proposal-optional-chaining" // Support for optional chaining
        ]
      }
    }
  });

  return config;
};
