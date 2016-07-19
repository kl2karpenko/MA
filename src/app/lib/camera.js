import $ from 'jquery';
import config from 'envConfig';

import diagnostic from './diagnostic';

module.exports = {
	getCameraStatus() {
		let deferred = $.Deferred();

		config.process.isProd() && cordova.plugins.diagnostic.getCameraAuthorizationStatus((status) => {
			deferred.resolve(status);
		});

		return deferred;
	},

	STATUSES: config.process.isProd() ? cordova.plugins.diagnostic.permissionStatus : {},

	loadIfIsAvailable() {
		return this.getCameraStatus().then((status) => {
			return this.STATUSES.GRANTED === status;
		});
	},

	_loadIfStatusNotDetermined() {
		return this.getCameraStatus().then((status) => {
			return this.STATUSES.NOT_DETERMINED === status;
		});
	},

	requestForAccess() {
		return this._loadIfStatusNotDetermined().then(() => {
			return config.process.isProd() && cordova.plugins.diagnostic.requestCameraAuthorization(function(d) { console.log(d) })
		});
	},

	switchToSettings() {
		return diagnostic.switchToSettings();
	}
};