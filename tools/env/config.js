const ProcessInfo = require('../../src/app/env/process');
var conf = {};

conf[ProcessInfo.LOCAL] = {
	"isProd": false,
	"distDir": 'build',
	"filesPath": {
		"scripts": "app.js",
		"connect": "connect.js",
		"modernizr": "modernizr.js",
		"styles": "app.css"
	}
};

conf[ProcessInfo.DEVELOPMENT] = {
	"isProd": false,
	"distDir": 'build',
	"filesPath": {
		"scripts": "app.js",
		"connect": "connect.js",
		"modernizr": "modernizr.js",
		"styles": "app.css"
	}
};

conf[ProcessInfo.PRODUCTION] = {
	"isProd": true,
	"distDir": 'www',
	"filesPath": {
		"scripts": "app.js",
		"connect": "connect.js",
		"modernizr": "modernizr.js",
		"styles": "app.css"
	}
};

module.exports = conf;
