const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  devtool: isProd ? '' : 'eval-source-map',
  output: {
    filename: isProd ? '[name].bundle.min.js' : '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    open: true,
    historyApiFallback: {
      index: 'index.html',
    },
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        })
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
       {
        test: /\.(woff|woff2|eot|ttf|otf|json)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          'image-webpack-loader'
        ],
      }
    ],
  },
  plugins: [
    require('autoprefixer'),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Main',
      template: './src/views/main.pug',
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Home',
      template: './src/views/home.pug',
      filename: 'home.html',
    }),
    new HtmlWebpackPlugin({
      title: 'About',
      template: './src/views/about.pug',
      filename: 'about.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Story',
      template: './src/views/story.pug',
      filename: 'story.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Test',
      template: './src/views/test.pug',
      filename: 'test.html',
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: !isProd
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
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
} else {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new StyleLintPlugin(),
  ])
}
