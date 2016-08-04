import { diagnostic } from './diagnostic';
import config from "../../../config";

function requestPermissionsForContacts (callback, error) {
	if (config.isIOS()) {
		return diagnostic.getContactsAuthorizationStatus(callback, error);
	} else {
		return diagnostic.requestRuntimePermission(callback, function(error){
			console.error("The following error occurred: " + error);
		}, diagnostic.runtimePermission.READ_CONTACTS);
	}
}

module.exports = {
	getContactsStatus() {
		return new Promise((resolve, reject) => {
			requestPermissionsForContacts((status) => {
				console.log('requestPermissionsForContacts: ', status);

				switch(status){
					case this.STATUSES.GRANTED:
						console.log("Permission granted to use the contact list");
						resolve(1);
						break;
					case this.STATUSES.NOT_REQUESTED:
						console.log("Permission to use the contact list has not been requested yet");
						reject(2);
						break;
					case this.STATUSES.DENIED:
						console.log("Permission denied to use the contact list - ask again?");
						reject(3);
						break;
					case this.STATUSES.DENIED_ALWAYS:
						console.log("Permission permanently denied to use the contact list - guess we won't be using it then!");
						reject(3);
						break;
				}
			}, () => {
				console.log('permission to contacts denied');
			});
		});
	},

	STATUSES: diagnostic.permissionStatus,

	requestForAccess() {
		return new Promise((resolve, reject) => {
			diagnostic.requestContactsAuthorization((status) => {
				console.log(status);
				resolve(this.STATUSES.GRANTED === status);
			}, (err) => {
				reject(err);
			});
		});
	},

	switchToSettings() {
		return diagnostic.switchToSettings();
	}
};