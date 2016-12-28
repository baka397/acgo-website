'use strict';
//加载依赖
const webpack = require('webpack');

module.exports = {
  entry: './client/app.js',
  output: {
    path: './public/js/',
    filename: 'app.min.js',
    chunkFilename: '[name].chunk.min.js',
    publicPath: '/js/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  externals:{
      'react': 'React',
      'react-dom':'ReactDOM'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"' //开发环境设置为development,运营环境设置为production
      }
    })
  ]
}