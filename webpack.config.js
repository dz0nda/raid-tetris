const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname),
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        include: path.resolve('src'),
        exclude: path.resolve('node_modules'),
        loader: 'babel-loader'
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader?limit=1024&name=images/[name].[ext]',
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/favicon.ico', to: './' }]
    })
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js', '.jsx']
  },
  node: {
    global: true,
    __filename: true,
    __dirname: true
  }
}
