import config from 'envConfig';

import diagnostic from './diagnostic';

let diagnosticPlugin = config.process.isProd() && cordova && cordova.plugins && cordova.plugins.diagnostic;

module.exports = {
	getContactsStatus() {
		return new Promise((resolve) => {
			if(config.process.isProd()) {
				diagnosticPlugin.getContactsAuthorizationStatus((status) => {
					resolve(status);
				});
			} else {
				resolve("authorized");
			}
		});
	},

	STATUSES: config.process.isProd() ? diagnosticPlugin.permissionStatus : {},

	isAvailable() {
		return this.getContactsStatus().then((status) => {
			if (this.STATUSES) {
				switch(status) {
					case this.STATUSES.GRANTED:
						return true;
					break;
					case this.STATUSES.NOT_DETERMINED:
						diagnosticPlugin.requestContactsAuthorization();
						return true;
					break;
					case this.STATUSES.DENIED:
					case this.STATUSES.DENIED_ALWAYS:
						return false;
					break;
					default:
						return true;
					break;
				}
			}
		});
	},

	switchToSettings() {
		return diagnostic.switchToSettings();
	}
};