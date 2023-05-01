const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname),
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: path.resolve('src/client'),
        exclude: path.resolve('node_modules'),
        loader: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        include: path.resolve('src/client'),
        exclude: path.resolve('node_modules'),
        loader: 'babel-loader',
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader?limit=1024&name=images/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/favicon.ico', to: './' }],
    }),
    new webpack.DefinePlugin({
      'process.env.REACT_APP_SOCKET_ID': JSON.stringify(process.SOCKET_ID),
      'process.env.REACT_APP_SOCKET_HOST': JSON.stringify(process.env.SOCKET_HOST),
      'process.env.REACT_APP_SOCKET_PORT': JSON.stringify(process.env.SOCKET_PORT),
      'process.env.REACT_APP_SOCKET_NAMESPACE': JSON.stringify(process.env.SOCKET_NAMESPACE),
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@/client': path.resolve(__dirname, 'src/client'),
    },
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true,
  },
};
