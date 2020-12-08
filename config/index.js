const packageJson = require('../package.json');
const { getContentPath } = require('../build/helper');
module.exports = {
  app: {
    name: packageJson.name,
    layout: packageJson.layout,
    contentPath: getContentPath()
  }
};
