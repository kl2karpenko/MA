import { switchToSettings, diagnostic } from './diagnostic';

module.exports = {
	getCameraStatus() {
		return new Promise((resolve, reject) => {
			diagnostic.getCameraAuthorizationStatus((status) => {
				resolve(status);
			});
		});
	},

	STATUSES: diagnostic.permissionStatus,

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
			return diagnostic.requestCameraAuthorization(function(d) {
				console.log(d);
			});
		});
	},

	switchToSettings() {
		return switchToSettings();
	}
};