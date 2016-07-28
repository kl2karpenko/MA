module.exports = {
	getCameraStatus() {
		return new Promise((resolve, reject) => {
			resolve("authorized");
		});
	},

	STATUSES: {},

	loadIfIsAvailable() {
		return this.getCameraStatus().then((status) => {
			return true;
		});
	},

	_loadIfCameraIsNotHaveBeenRequested() {
		return this.getCameraStatus().then((status) => {
			return false;
		});
	},

	_loadIfCameraIsDenied() {
		return this.getCameraStatus().then((status) => {
			return false;
		});
	},

	requestForAccess() {
		return new Promise((resolve) => {
			resolve("access granted");
		});
	},

	switchToSettings() {
		return true;
	}
};