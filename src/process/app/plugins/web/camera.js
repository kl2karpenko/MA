import { diagnostic } from './diagnostic';

module.exports = {
	STATUSES: diagnostic.permissionStatus,

	getCameraStatus() {
		return new Promise((resolve) => {
			resolve(1);
		});
	},

	requestForAccess() {
		return new Promise((resolve) => {
			resolve(true);
		});
	},

	switchToSettings() {
		return true;
	}
};