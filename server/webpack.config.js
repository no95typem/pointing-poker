const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: isDev ? 'source-map' : undefined,
  mode: isDev ? 'development' : 'production',
  target: 'node14.7',
  resolve: {
    fallback: { http: false },
    extensions: ['.js', '.ts'],
  },
  entry: './src/entry.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new ESLintPlugin(),
    new webpack.DefinePlugin({
      TARGET_PLATFORM: JSON.stringify('node'),
      IS_PROD: process.env.NODE_ENV === 'production',
    }),
    !isDev &&
      new CopyPlugin({
        patterns: [{ from: './src/package.json' }],
      }),
    isDev &&
      new NodemonPlugin({
        script: './build/server.js',
        watch: path.resolve('./build'),
        // args: ['demo'],
        // nodeArgs: ['--debug=9222'],
        ignore: ['*.js.map'],
        ext: 'js,njk,json',
        verbose: true,
        env: {
          NODE_ENV: 'development',
        },
      }),
  ].filter(Boolean),
  externals: [nodeExternals()],
};
