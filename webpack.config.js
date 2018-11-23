const autoprefixer = require('autoprefixer'),
  NODE_ENV = process.env.NODE_ENV || 'development',
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    'babel-polyfill',
    './src/js/entry.es6',
  ],

  output: {
    path: __dirname + '/build',
    filename: 'bundle.js'
  },

  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(NODE_ENV)
    }),
    new ExtractTextPlugin('main.css'),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise',
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],

  module: {
    rules: [
      {
        test: /\.es6$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          }
        },
      },
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: NODE_ENV == 'development',
                minimize: NODE_ENV == 'production'
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: NODE_ENV == 'development'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({
                    browsers: [
                      'last 2 versions',
                      'safari 8',
                      'ie 11',
                      'opera 12.1',
                      'ios 6',
                      'android 4'
                    ]
                  })
                ],
                sourceMap: 'inline-sourcemap'
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: NODE_ENV == 'development'
              }
            }
          ]
        })

      },
      {
        test: /\.(png|jpg|woff|woff2|eot|ttf|svg|gif)$/,
        loader: 'url-loader?limit=100000'
      },
    ]
  },

  devtool: NODE_ENV == 'development' ? 'inline-sourcemap' : false,
}