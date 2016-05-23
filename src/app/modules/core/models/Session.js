import Model from 'mainModel';

class Session extends Model {
	initialize() {
		return session;
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

	_checkIfAuthorize(user) {
		let userID = user && user.id || null;
		// here take data from authorize
		return this.load(userID);
	}
}

let session = new Session();

module.exports = session.initialize();