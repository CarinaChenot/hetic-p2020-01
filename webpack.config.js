const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production')

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: isProd ? '[name].bundle.min.js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        enforce: 'pre',
        test: /\.scss$/,
        loader: 'import-glob-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env'],
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        }
      )
    }],
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: isProd ? 'Production' : 'Developement'
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: !isProd
    }),
  ],
};

if (isProd) {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ])
}
