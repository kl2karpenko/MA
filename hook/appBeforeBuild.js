module.exports = function(context) {
	var androidIs = context.opts.platforms.indexOf('android') !== -1;

	// >>>>>>>>>>>>>>>>>>>>>> set env variable <<<<<<<<<<<<<<<<<<<<<<
	if (!process.env.NODE_ENV) {
		process.env.NODE_ENV = 'production';
	}
	if (!process.env.platformName) {
		process.env.platformName = androidIs ? 'android' : 'ios';
	}
	// >>>>>>>>>>>>>>>>>>>>>> set env variable <<<<<<<<<<<<<<<<<<<<<<

	var deferral = new context.requireCordovaModule('q').defer();

	var webpack = require("webpack");
	var config = require('../tools/webpack/' + (androidIs ? 'android' : 'ios') + '.js');

	webpack(config).run(function(err, stats) {
		if(err) {
			deferral.reject('Error', err);
		} else {
			deferral.resolve(stats.toString());
		}
		console.log("================================ BUILD ENDED SUCCESSFULLY =================================");

		return deferral.promise;
	});
};