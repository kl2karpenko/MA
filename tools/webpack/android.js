var config = require('./config.js');
var extend = require('extend');

const webpack = require('webpack');

config.plugins.push(new webpack.DefinePlugin({
	'platformName': JSON.stringify('android')
}));

module.exports = extend(config, {

});