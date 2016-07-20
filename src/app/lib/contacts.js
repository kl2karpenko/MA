import $ from 'jquery';
import config from 'envConfig';

import diagnostic from './diagnostic';

module.exports = {
	getContactsStatus() {
		let deferred = $.Deferred();

		if(config.process.isProd()) {
			cordova.plugins.diagnostic.getContactsAuthorizationStatus((status) => {
				deferred.resolve(status);
			});
		} else {
			deferred.resolve("authorized");
		}

		return deferred;
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