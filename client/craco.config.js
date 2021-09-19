const path = require('path');
const fs = require('fs');
const cracoBabelLoaderPlugin = require('craco-babel-loader-plugin');
const webpack = require('webpack');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePackage = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  plugins: [
    {
      plugin: cracoBabelLoaderPlugin,
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
        FE_ALONE: process.env.FE_ALONE,
        IS_PROD: process.env.NODE_ENV === 'production',
        BASENAME: process.env.BASENAME
          ? JSON.stringify(process.env.BASENAME)
          : JSON.stringify(''),
      });

      webpackConfig.plugins.push(definePlugin);

      return webpackConfig;
    },
  },
};
