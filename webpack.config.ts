const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  plugins: [new NodePolyfillPlugin()],
  node: {
    global: false,
    __filename: false,
    __dirname: false,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      // Добавьте свои правила обработки здесь, если они есть
    ],
  },
  // resolve: {

  //   fallback: {
  //     stream: require.resolve("stream-browserify"),
  //     child_process: require.resolve("child_process"),
  //     fs: require.resolve("graceful-fs"),
  //     os: require.resolve("os-browserify/browser"),
  //     path: require.resolve("path-browserify"),
  //   },
  // },
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      path: false,
      zlib: false,
      http: false,
      https: false,
      stream: false,
      crypto: false,
      os: false,
      "crypto-browserify": require.resolve("crypto-browserify"), //if you want to use this module also don't forget npm i crypto-browserify
    },
  },
};
