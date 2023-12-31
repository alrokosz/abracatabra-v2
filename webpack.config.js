/* eslint-disable @typescript-eslint/no-var-requires */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    content: './src/app/content.ts',
    background: './src/app/background.ts',
    popup: './src/ui/index.tsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  watchOptions: {
    ignored: /node_modules/
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'dist')
      // publicPath: '/'
    },
    headers: { 'Access-Control-Allow-Origin': '*' }
    // proxy: {
    //   '/api/**': {
    //     target: 'http://localhost:3000/',
    //     secure: false
    //   },
    //   '/assets/**': {
    //     target: 'http://localhost:3000/',
    //     secure: false
    //   }
    // }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/ui/popup.html',
      filename: 'popup.html',
      chunks: ['popup']
    })
  ]
};
