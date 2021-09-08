const path = require('path');
const fs = require('fs');
const cracoBabelLoader = require('craco-babel-loader');
const webpack = require('webpack');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePackage = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [resolvePackage('../shared')],
      },
    },
  ],
  webpack: {
    configure: webpackConfig => {
      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === 'ModuleScopePlugin',
      );

      webpackConfig.resolve.plugins[scopePluginIndex].appSrcs.push('../shared');

      const definePlugin = new webpack.DefinePlugin({
        TARGET_PLATFORM: JSON.stringify('web'),
      });

      webpackConfig.plugins.push(definePlugin);

      return webpackConfig;
    },
  },
};
