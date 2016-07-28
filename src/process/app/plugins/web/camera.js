import { diagnostic } from './diagnostic';

module.exports = {
	STATUSES: diagnostic.permissionStatus,

	getCameraStatus() {
		return new Promise((resolve, reject) => {
			resolve(1);
		});
	},

	requestForAccess() {
		return new Promise((resolve) => {
			diagnostic.requestCameraAuthorization((status) => {
				resolve(this.STATUSES.GRANTED === status);
			});
		});
	},

	switchToSettings() {
		return true;
	}
};