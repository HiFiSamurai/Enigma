const path = require('path');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/javascript/main.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    loaders: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      }],
    }],
  },
};
