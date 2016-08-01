module.exports = {
	BUILD_APP: process.env.BUILD_APP || false,

	platforms: {
		active: process.env.platformName,
		ios: "ios",
		android: "android",
		"default": "android"
	},

	build: {
		web: 'web',
		mobile: 'mobile'
	},

	env: {
		PROD: 'production',
		DEV: 'development',
		LOCAL: 'local'
	},

	getActiveEnv: function () {
		switch(process.env.NODE_ENV) {
			case 'dev':
			case 'development':
				return this.env.DEV;
				break;

			case 'prod':
			case 'production':
				return this.env.PROD;
				break;

			default:
				return this.env.LOCAL;
		}
	},

	isIOSProd() {
		return this.isProd() && this.isIOS();
	},

	isProd() {
		return this.getActiveEnv() === this.env.PROD;
	},

	isDev() {
		return this.getActiveEnv() === this.env.DEV;
	},

	isLocal() {
		return this.getActiveEnv() === this.env.LOCAL;
	},

	getDestinationDir: function () {
		return this.isProd() ? 'www' : 'build';
	},

	getActivePlatform: function () {
		var platforms = this.platforms;

		return platforms[platforms.active] || platforms.default;
	},

	getIfBuildApp: function () {
		return this.BUILD_APP;
	},

	getAppConfig: function () {
		return this.BUILD_APP ? this.build.mobile :this.build.web;
	},

	isIOS: function () {
		return this.getActivePlatform() === "ios";
	},

	isAndroid: function () {
		return this.getActivePlatform() === "android";
	}
};
