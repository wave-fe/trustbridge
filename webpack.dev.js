var prod = require('./webpack.prod');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...prod,
    devServer: {
        contentBase: __dirname,
        host: '0.0.0.0',
        port: 7000
    },
    plugins: [
        ...prod.plugins,
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './demo/index.html',
            inject: 'head',
            chunks: ['sdk']
        }),
        new HtmlWebpackPlugin({
            filename: 'sandbox.html',
            template: './demo/sandbox.html',
            inject: 'head',
            chunks: ['sandbox']
        })
    ]
};
