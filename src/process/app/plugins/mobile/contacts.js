import { switchToSettings, diagnostic }         from './diagnostic';
import config                 from "../../../config";
import { logError, logInfo }  from "lib/logger";

function requestPermissionsForContacts (callback, error) {
	if (config.isIOS()) {
		return diagnostic.getContactsAuthorizationStatus(callback, error);
	} else {
		return diagnostic.requestRuntimePermission(callback, (errorTextForRuntimePermissions) => {
			logError("requestRuntimePermission android", errorTextForRuntimePermissions);
		}, diagnostic.runtimePermission.READ_CONTACTS);
	}
}

module.exports = {
	getContactsStatus() {
		return new Promise((resolve, reject) => {
			requestPermissionsForContacts((status) => {
				switch(status){
					case this.STATUSES.GRANTED:
						logInfo("Permission granted to use the contact list");
						resolve(1);
						break;
					case this.STATUSES.NOT_REQUESTED:
						logInfo("Permission to use the contact list has not been requested yet");
						reject(2);
						break;
					case this.STATUSES.DENIED:
						logInfo("Permission denied to use the contact list - ask again?");
						reject(3);
						break;
					case this.STATUSES.DENIED_ALWAYS:
						logInfo("Permission permanently denied to use the contact list - guess we won't be using it then!");
						reject(3);
						break;
				}
			}, (errorForPermission) => {
				logError('Contacts', errorForPermission);

				$(document).trigger('system:loaded');
				reject(errorForPermission);
			});
		});
	},

	STATUSES: diagnostic.permissionStatus,

	requestForAccess() {
		return new Promise((resolve, reject) => {
			diagnostic.requestContactsAuthorization(
				// success
				(status) => {
					resolve(this.STATUSES.GRANTED === status);
				},
				// error
				(err) => {
					reject(err);
				}
			);
		});
	},

	switchToSettings() {
		return switchToSettings();
	}
};