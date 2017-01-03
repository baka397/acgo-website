'use strict';
//加载依赖
const webpack = require('webpack');

module.exports = {
    entry: './client/app.jsx',
    output: {
        path: './public/js/',
        filename: 'app.min.js',
        chunkFilename: '[name].chunk.min.js',
        publicPath: '/js/'
    },
    module: {
        loaders: [
        {
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015'],
                plugins: ['transform-object-assign']
            }
        },
        {
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                plugins: ['transform-object-assign']
            }
        }
        ]
    },
    externals:{
        'user':'user'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': '"development"' //开发环境设置为development,运营环境设置为production
            }
        })
    ]
}