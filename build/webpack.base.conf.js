const { resolve, getAssetsPath } = require('./helper');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  context: resolve('./'),
  entry: {
    main: [resolve('./main/main.js')]
  },
  resolve: {
    fallback: {
      path: require.resolve('path-browserify')
    },
    extensions: ['.vue', '.js', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      submodule: resolve('submodule'),
      config: resolve('config'),
      static: resolve('static'),
      utils: resolve('kiafBaseuiUtil')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      // {
      //   test: /\.js$/,
      //   exclude: [/node_modules/],
      //   use: {
      //     loader: 'babel-loader'
      //   }
      // },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              esModule: false
            }
          },
          {
            loader: 'sass-loader',
            options: {}
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader' // 可以把css放在页面上
          }, {
            loader: 'css-loader' // 放在后面的先被解析
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 10000,
            name: getAssetsPath('img/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 10000,
            name: getAssetsPath('media/[name].[hash:7].[ext]')
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            limit: 10000,
            name: getAssetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.CONTEXT_PATH': JSON.stringify(process.env.CONTEXT_PATH),
      'process.argv': JSON.stringify(process.argv)
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['main'],
      template: resolve('index.html'),
      inject: true
    })
  ]
};
