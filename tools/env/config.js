module.exports = {
	"dev": {
		filesPath: {
			"scripts": "/build/app.js",
			"additionalScripts": "/build/common.js",
			"styles": "/build/app.css"
		}
	},
	"prod": {
		filesPath: {
			"scripts": "app.js",
			"additionalScripts": "common.js",
			"styles": "app.css"
		}
	}
};
