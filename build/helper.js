const path = require('path');
const packageJson = require('../package.json');

let args = process.argv;
let contentPath = process.env.CONTEXT_PATH || packageJson.contentPath || '';
if (args[2] && args[2].indexOf('#') >= 0) {
  let params = args[2].split('#');
  if (params[1]) {
    contentPath = params[1];
    if (contentPath.indexOf('/') !== 0) {
      contentPath = '/' + contentPath;
    }
  }
}

exports.resolve = function (dir) {
  return path.join(__dirname, '..', dir);
};

exports.getContentPath = function () {
  return contentPath;
};

exports.getAssetsPath = function (_path) {
  const assetsSubDirectory = 'static';
  return path.posix.join(assetsSubDirectory, _path);
};
