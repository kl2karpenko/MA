module.exports = {
	BUILD_APP: (process.env.BUILD_APP && (process.env.BUILD_APP === "yes" || process.env.BUILD_APP === "true")) ? true : false,

	platforms: {
		active: process.env.PLATFORM,
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
		return this.isBuildApp() ? 'www' : 'build';
	},

	getActivePlatform: function () {
		var platforms = this.platforms;

		return platforms[platforms.active] || platforms.default;
	},

	isBuildApp: function () {
		return this.BUILD_APP;
	},

	getAppMode: function () {
		return this.isBuildApp() ? this.build.mobile :this.build.web;
	},

	isIOS: function () {
		return this.getActivePlatform() === this.platforms.ios;
	},

	isAndroid: function () {
		return this.getActivePlatform() === this.platforms.android;
	}
};
