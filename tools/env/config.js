const ENVIRONMENT = process.env.NODE_ENV && process.env.NODE_ENV === "production" ? "prod" : 'dev';
var conf = {
	"dev": {
		"isProd": false,
		"distDir": 'build',
		"filesPath": {
			"scripts": "app.js",
			"connect": "connect.js",
			"modernizr": "modernizr.js",
			"styles": "app.css"
		}
	},
	"prod": {
		"isProd": true,
		"distDir": 'www',
		"filesPath": {
			"scripts": "app.js",
			"connect": "connect.js",
			"modernizr": "modernizr.js",
			"styles": "app.css"
		}
	}
};

conf[ENVIRONMENT].ENVIRONMENT = ENVIRONMENT;

module.exports = conf[ENVIRONMENT];
