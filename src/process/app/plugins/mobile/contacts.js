import { diagnostic } from './diagnostic';
import config from "../../../config";

function requestPermissionsForContacts (callback) {
	if (config.isIOS()) {
		return diagnostic.getContactsAuthorizationStatus(callback);
	} else {
		return diagnostic.requestRuntimePermission(callback, function(error){
			console.error("The following error occurred: " + error);
		}, diagnostic.runtimePermission.READ_CONTACTS);
	}
}

module.exports = {
	getContactsStatus() {
		return new Promise((resolve) => {
			requestPermissionsForContacts((status) => {
				console.log('requestPermissionsForContacts: ', status);

				switch(status){
					case this.STATUSES.GRANTED:
						console.log("Permission granted to use the contact list");
						resolve(1);
						break;
					case this.STATUSES.NOT_REQUESTED:
						console.log("Permission to use the contact list has not been requested yet");
						resolve(2);
						break;
					case this.STATUSES.DENIED:
						console.log("Permission denied to use the contact list - ask again?");
						resolve(3);
						break;
					case this.STATUSES.DENIED_ALWAYS:
						console.log("Permission permanently denied to use the contact list - guess we won't be using it then!");
						resolve(3);
						break;
				}
			});
		});
	},

	STATUSES: diagnostic.permissionStatus,

	requestForAccess() {
		return new Promise((resolve) => {
			diagnostic.requestContactsAuthorization((status) => {
				resolve(this.STATUSES.GRANTED === status);
			});
		});
	},

	switchToSettings() {
		return diagnostic.switchToSettings();
	}
};