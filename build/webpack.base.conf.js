const { resolve } = require('./helper');

module.exports = {
  context: resolve(''),
  resolve: {
    extensions: [],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }
    ]
  },
  plugins: []
};
