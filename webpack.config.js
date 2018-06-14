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
      include: [
        path.resolve(__dirname, 'src/javascript'),
        path.resolve(__dirname, 'node_modules/@HiFiSamurai/ui-toolkit'),
      ],
      use: [{
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      }],
    }],
  },
};
