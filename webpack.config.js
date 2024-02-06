const path = require("path");

module.exports = {
  // ... your existing webpack configuration

  resolve: {
    // ... other resolve options

    // Add the following fallback configuration
    fallback: {
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
      crypto: require.resolve("crypto-browserify"),
      os: require.resolve("os-browserify/browser"),
      dgram: require.resolve("dgram"),
      stream: require.resolve("stream-browserify"),
      timers: require.resolve("timers-browserify"),
    },
  },
};
