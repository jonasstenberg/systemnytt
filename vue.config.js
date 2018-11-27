const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new CleanPlugin(path.join(__dirname, 'dist')),
    ],
  },
};
