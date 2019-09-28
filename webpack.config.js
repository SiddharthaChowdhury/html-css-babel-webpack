var path = require('path');
var webpack = require('webpack');
var hwp     = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins:[
        new hwp({template: './src/index.html'}),
    ],
    devServer: {
        historyApiFallback: true,
        stats: 'errors-only'
    },
};