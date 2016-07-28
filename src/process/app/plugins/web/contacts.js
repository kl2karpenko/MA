import { diagnostic } from './diagnostic';

module.exports = {
	getContactsStatus() {
		return new Promise((resolve) => {
			resolve(1);
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