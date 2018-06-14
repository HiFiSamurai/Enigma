const autoprefixer = require('autoprefixer');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/app.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'node_modules/@HiFiSamurai/ui-toolkit'),
      ],
      use: [{
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      }],
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.s*css$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve(__dirname, 'node_modules')],
            },
          },
        ],
      }),
    }],
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
  ],
  resolve: {
    modules: [__dirname, 'node_modules'],
  },
};
