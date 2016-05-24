import Model from 'mainModel';

class Session extends Model {
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

	_getSessionData(user) {
		let userID = user && user.id || null;
		// here take data from authorize
		return this.load(userID);
	}
}

let session = new Session();

module.exports = (() => {
	return session;
})();