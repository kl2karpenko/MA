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

	_loadIfCameraIsNotHaveBeenRequested() {
		return this.getCameraStatus().then((status) => {
			return this.STATUSES.NOT_REQUESTED === status;
		});
	},

	_loadIfCameraIsDenied() {
		return this.getCameraStatus().then((status) => {
			return this.STATUSES.DENIED === status || this.STATUSES.DENIED_ALWAYS === status;
		});
	},

	requestForAccess() {
		return diagnostic.requestCameraAuthorization(function(d) {
			console.log(d, 'requestCameraAuthorization');
		});
	},

	switchToSettings() {
		return switchToSettings();
	}
};