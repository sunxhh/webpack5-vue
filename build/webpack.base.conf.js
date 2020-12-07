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
        exclude: /node_modules/,
        enforce: 'pre',
        include: [],
        loader: ['eslint-loader']
      }
    ]
  },
  plugins: []
};
