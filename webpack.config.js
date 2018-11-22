const autoprefixer = require('autoprefixer');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/].*\.js$/,
        },
      },
    },
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
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer()],
          },
        }, {
          loader: 'sass-loader',
          options: {
            includePaths: [path.resolve(__dirname, './node_modules')],
          },
        },
      ],
    },{
      test: /\.svg$/,
      use: [{
        loader: 'svg-sprite-loader',
        options: {
          symbolId: 'icon-[name]',
        },
      }],
    }],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      title: 'Enigma',
      favicon: 'favicon.png',
      template: 'index.html',
      meta: {
        'content-type': 'text-html; charset=utf-8',
        viewport: 'width=device-width, initial-scale=1',
      },
    }),
  ],
  stats: 'minimal',
};
