import $ from 'jquery';
import config from 'envConfig';

import diagnostic from './diagnostic';

module.exports = {
	getContactsStatus() {
		let deferred = $.Deferred();

		config.process.isProd() && cordova.plugins.diagnostic.getCameraAuthorizationStatus((status) => {
			deferred.resolve(status);
		});

		return deferred;
	},

	STATUSES: config.process.isProd() ? cordova.plugins.diagnostic.permissionStatus : {},

	isAvailable() {
		return this.getContactsStatus().then((status) => {
			console.log(status);

			return this.STATUSES.GRANTED === status;
		});
	},

	switchToSettings() {
		return diagnostic.switchToSettings();
	}
};