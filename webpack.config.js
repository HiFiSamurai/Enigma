const autoprefixer = require('autoprefixer');
const path = require('path');

module.exports = {
  entry: {
    app: ['@babel/polyfill', './src/app.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [{
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
    }],
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
  },
};
