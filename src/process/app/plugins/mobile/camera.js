import { switchToSettings, diagnostic } from './diagnostic';

module.exports = {
	STATUSES: diagnostic.permissionStatus,

	getCameraStatus() {
		return new Promise((resolve, reject) => {
			diagnostic.requestRuntimePermission((status) => {
				switch(status){
					case this.STATUSES.GRANTED:
						console.log("Permission granted to use the camera");
						resolve(1);
						break;
					case this.STATUSES.NOT_REQUESTED:
						console.log("Permission to use the camera has not been requested yet");
						resolve(2);
						break;
					case this.STATUSES.DENIED:
						console.log("Permission denied to use the camera - ask again?");
						resolve(3);
						break;
					case this.STATUSES.DENIED_ALWAYS:
						console.log("Permission permanently denied to use the camera - guess we won't be using it then!");
						resolve(3);
						break;
				}
			}, function(error){
				console.error("The following error occurred: " + error);
			}, diagnostic.runtimePermission.CAMERA);
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
		return switchToSettings();
	}
};