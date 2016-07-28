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

	_loadIfStatusNotDetermined() {
		return this.getCameraStatus().then(() => {
			return true;
		});
	},

	requestForAccess() {
		return this._loadIfStatusNotDetermined().then(() => {
			return "authorized";
		});
	},

	switchToSettings() {
		return true;
	}
};