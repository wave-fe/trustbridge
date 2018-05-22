var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var path = require('path');

module.exports = {
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env']
				}
			},
			{
				test: /\.(less|css)$/,

				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',

						options: {
							sourceMap: true
						}
					},
					{
						loader: 'less-loader',

						options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},

	plugins: [
		new UglifyJSPlugin(),
		new MiniCssExtractPlugin({ filename: 'style.css' })
	],

	entry: {
		sdk: './src/sdk.js',
		sandbox: './src/sandbox.js'
	},

	output: {
        // filename: '[name].[chunkhash:8].js',
        filename: '[name].js',
		path: path.resolve(__dirname, 'lib')
	},

	mode: 'production'
};
