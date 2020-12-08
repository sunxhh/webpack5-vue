const { resolve } = require('./helper');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: resolve('./'),
  entry: {
    main: [resolve('./main/main.js')]
  },
  resolve: {
    extensions: ['.vue', '.js', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      submodule: resolve('submodule')
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
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      chunks: ['main'],
      template: resolve('index.html'),
      inject: true
    })
  ]
};
