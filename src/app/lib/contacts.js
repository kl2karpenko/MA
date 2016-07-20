import $ from 'jquery';
import config from 'envConfig';

import diagnostic from './diagnostic';

module.exports = {
	getContactsStatus() {
		return new Promise((resolve, reject) => {
			if(config.process.isProd()) {
				cordova.plugins.diagnostic.getContactsAuthorizationStatus((status) => {
					resolve(status);
				});
			} else {
				resolve("authorized");
			}
		});
	},

	STATUSES: config.process.isProd() ? cordova.plugins.diagnostic.permissionStatus : {},

	isAvailable() {
		return this.getContactsStatus().then((status) => {
			return this.STATUSES.GRANTED ? this.STATUSES.GRANTED === status : true;
		});
	},

	switchToSettings() {
		return diagnostic.switchToSettings();
	}
};