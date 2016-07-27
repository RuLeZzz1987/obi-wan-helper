'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: {
		app: './src/index.js'
	},
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.css/,
				loader: 'style!css'
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.optimize.DedupePlugin()
	]
};