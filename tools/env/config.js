module.exports = {
	"dev": {
		filesPath: {
			"scripts": "/build/app.js",
			"connect": "/build/connect.js",
			"modernizr": "/build/modernizr.js",
			"styles": "/build/app.css"
		}
	},
	"prod": {
		filesPath: {
			"scripts": "app.js",
			"connect": "connect.js",
			"modernizr": "modernizr.js",
			"styles": "app.css"
		}
	}
};
