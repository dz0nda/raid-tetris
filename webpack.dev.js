const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const baseConfig = require('./webpack.config');

const OUTPUT_PATH = path.resolve('dist');
const CONFIG_ENV = 'development';

module.exports = merge(baseConfig, {
  mode: CONFIG_ENV,
  entry: './src/client/index.js',
  output: {
    path: OUTPUT_PATH,
    filename: '[name].bundle.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: path.resolve('.env'),
      ignoreStub: true,
    }),
    new Dotenv({
      path: path.resolve(`.env.${CONFIG_ENV}`),
      ignoreStub: true,
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 8080,
    open: true,
    // historyApiFallback: true
    historyApiFallback: {
      rewrites: [{ from: /.*/, to: '/index.html' }],
    },
  },
  optimization: {
    moduleIds: 'named',
  },
});
