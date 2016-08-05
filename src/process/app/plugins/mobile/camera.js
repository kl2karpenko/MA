import { switchToSettings, diagnostic } from './diagnostic';
import config                           from "../../../config";
import { logError, logInfo }            from "lib/logger";

function requestPermissionsForCamera (callback, error) {
	if (config.isIOS()) {
		return diagnostic.getCameraAuthorizationStatus(callback, error);
	} else {
		return diagnostic.requestRuntimePermission(callback, function(error){
			console.error("The following error occurred: " + error);
		}, diagnostic.runtimePermission.CAMERA);
	}
}

module.exports = {
	STATUSES: diagnostic.permissionStatus,

	getCameraStatus() {
		return new Promise((resolve, reject) => {
			return requestPermissionsForCamera((status) => {
				switch(status){
					case this.STATUSES.GRANTED:
						logInfo("Permission granted to use the camera");
						resolve(1);
						break;
					case this.STATUSES.NOT_REQUESTED:
						logInfo("Permission to use the camera has not been requested yet");
						reject(2);
						break;
					case this.STATUSES.DENIED:
						logInfo("Permission denied to use the camera - ask again?");
						reject(3);
						break;
					case this.STATUSES.DENIED_ALWAYS:
						logInfo("Permission permanently denied to use the camera - guess we won't be using it then!");
						reject(3);
						break;
				}
			}, (errorForPermission) => {
				logError('Camera', errorForPermission);
				reject(errorForPermission);
			});
		});
	},

	requestForAccess() {
		return new Promise((resolve, reject) => {
			diagnostic.requestCameraAuthorization(
				(status) => {
					resolve(this.STATUSES.GRANTED === status);
				},
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