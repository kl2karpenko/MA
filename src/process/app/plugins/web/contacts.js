module.exports = {
	getContactsStatus() {
		return new Promise((resolve) => {
			resolve("authorized");
		});
	},

	STATUSES: {},

	isAvailable() {
		return this.getContactsStatus().then(() => {
			return true;
		});
	},

	switchToSettings() {
		return true;
	}
};