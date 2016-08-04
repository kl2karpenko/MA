import { diagnostic } from './diagnostic';

module.exports = {
	getContactsStatus() {
		return new Promise((resolve, reject) => {
			reject(2);
		});
	},

	STATUSES: diagnostic.permissionStatus,

	requestForAccess() {
		return new Promise((resolve) => {
			resolve(true);
		});
	},

	switchToSettings() {
		return true;
	}
};