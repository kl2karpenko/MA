import Model from 'Model';

class Session extends Model {
	init() {
		this.managedResource = 'session';
	}

	_defaultSession() {
		return {
			"_id": "",
			"id": "",
			"username": "",
			"dialplan": {
				"id": ""
			}
		};
	}

	_getSessionData() {
		let userID = this.Model.user && this.Model.user.id || null;
		// here take data from authorize

		return this.load({
			id: userID
		});
	}
}

let session = new Session();

module.exports = (() => {
	return session;
})();