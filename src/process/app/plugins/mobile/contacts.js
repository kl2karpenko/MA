import { switchToSettings, diagnostic } from './diagnostic';

module.exports = {
	getContactsStatus() {
		return new Promise((resolve) => {
			diagnostic.getContactsAuthorizationStatus((status) => {
				resolve(status);
			});
		});
	},

	STATUSES: diagnostic.permissionStatus,

	isAvailable() {
		return this.getContactsStatus().then((status) => {
			if (this.STATUSES) {
				switch(status) {
					case this.STATUSES.GRANTED:
						return true;
						break;
					case this.STATUSES.NOT_DETERMINED:
						diagnostic.requestContactsAuthorization();
						return true;
						break;
					case this.STATUSES.DENIED:
					case this.STATUSES.DENIED_ALWAYS:
						return false;
						break;
					default:
						return true;
						break;
				}
			}
		});
	},

	switchToSettings() {
		return switchToSettings();
	}
};