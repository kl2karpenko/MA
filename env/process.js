module.exports = {
	PRODUCTION: 'production',
	DEVELOPMENT: 'development',
	LOCAL: 'local',

	getActiveEnvironment: function () {
		switch(process.env.NODE_ENV) {
			case 'dev':
			case 'development':
				return this.DEVELOPMENT;
				break;

			case 'prod':
			case 'production':
				return this.PRODUCTION;
				break;

			default:
				return this.LOCAL;
		}
	},

	isProd() {
		return this.getActiveEnvironment() === this.PRODUCTION;
	},

	isDev() {
		return this.getActiveEnvironment() === this.DEVELOPMENT;
	},

	isLocal() {
		return this.getActiveEnvironment() === this.LOCAL;
	},

	getDestinationDir: function () {
		return this.isProd() ? 'www' : 'build';
	},

	getActivePlatform: function () {
		return process.env.platformName || "";
	},

	isIOS: function () {
		return this.getActivePlatform() === "ios";
	},

	isAndroid: function () {
		return this.getActivePlatform() === "android";
	}
};
