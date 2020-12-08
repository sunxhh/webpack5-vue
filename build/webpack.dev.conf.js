const { merge } = require('webpack-merge');
const { resolve } = require('./helper');

const portfinder = require('portfinder');
const devConfig = require('./config/dev.env');
const baseWebpackConfig = require('./webpack.base.conf');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const packageJson = require('../package.json');

process.env.NODE_ENV = devConfig.NODE_ENV;

const devWebpackConfig = merge(baseWebpackConfig, {
  output: {
    path: resolve('../dist'),
    filename: '[name][hash].js',
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  devServer: {
    ...devConfig.devServer
  },
  mode: 'development',
  plugins: []
});

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || devConfig.devServer.port;
  portfinder.getPortPromise().then((port) => {
    let httpName = devWebpackConfig.devServer.https ? 'https' : 'http';
    let host = devWebpackConfig.devServer.host;
    if (host === '0.0.0.0') {
      host = 'localhost';
    }
    let url = `${httpName}://${host}:${port}`;

    process.env.PORT = port;
    devWebpackConfig.devServer.port = port;

    // Add FriendlyErrorsPlugin
    devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: ${url}`]
      },
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];

        const filename = error.file && error.file.split('!').pop();
        notifier.notify({
          title: packageJson.name,
          message: severity + ': ' + error.name,
          subtitle: filename || ''
        });
      }
    }));
    resolve(devWebpackConfig);
  }).catch((err) => {
    reject(err);
  });
});
