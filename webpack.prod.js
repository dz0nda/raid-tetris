const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');

const baseConfig = require('./webpack.base');

const CONFIG_ENV = 'production';

module.exports = merge(baseConfig, {
  mode: CONFIG_ENV,
  entry: './src/client/index.js',
  output: {
    publicPath: '/',
    path: path.resolve('dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new Dotenv({
      path: path.resolve('.env'),
      ignoreStub: true,
    }),
    new Dotenv({
      path: path.resolve(`.env.${CONFIG_ENV}`),
      ignoreStub: true,
    }),
  ],
  optimization: {
    minimizer: [],
  },
  devtool: 'source-map',
});
