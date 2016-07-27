'use strict';

const config = require('./webpack.config');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const compiler = webpack(config);

const server = new webpackDevServer(compiler, {
	hot: true,
	compress: true,
	stats: { colors: true },
	quiet: false,
	noInfo: false,
	filename: "bundle.js",
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	},
	publicPath: "/dist/"
});

server.listen(8000);